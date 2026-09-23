import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { getRedis } from "@/lib/redis";
import {
  VISITOR_COOKIE,
  VISITOR_COOKIE_MAX_AGE,
  VISITOR_COUNT_KEY,
} from "@/lib/visitors";

export const runtime = "nodejs";

async function readCount(redis: NonNullable<ReturnType<typeof getRedis>>) {
  const value = await redis.get<number | string>(VISITOR_COUNT_KEY);
  const n = typeof value === "number" ? value : Number(value ?? 0);
  return Number.isFinite(n) && n >= 0 ? n : 0;
}

/** Current total — does not increment. */
export async function GET() {
  const redis = getRedis();
  if (!redis) {
    return NextResponse.json(
      { count: 0, configured: false },
      { status: 200 },
    );
  }

  try {
    const count = await readCount(redis);
    return NextResponse.json({ count, configured: true });
  } catch {
    return NextResponse.json(
      { error: "Failed to read visitor count." },
      { status: 500 },
    );
  }
}

/**
 * Record one unique visit (cookie dedupe).
 * Returns updated count; `counted` true only when this request incremented.
 */
export async function POST() {
  const redis = getRedis();
  if (!redis) {
    return NextResponse.json(
      { count: 0, counted: false, configured: false },
      { status: 200 },
    );
  }

  try {
    const jar = await cookies();
    const already = jar.get(VISITOR_COOKIE)?.value === "1";

    if (already) {
      const count = await readCount(redis);
      return NextResponse.json({ count, counted: false, configured: true });
    }

    const count = await redis.incr(VISITOR_COUNT_KEY);

    const res = NextResponse.json({
      count,
      counted: true,
      configured: true,
    });
    res.cookies.set(VISITOR_COOKIE, "1", {
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      maxAge: VISITOR_COOKIE_MAX_AGE,
      path: "/",
    });
    return res;
  } catch {
    return NextResponse.json(
      { error: "Failed to update visitor count." },
      { status: 500 },
    );
  }
}
