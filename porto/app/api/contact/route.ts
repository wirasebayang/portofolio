import { Resend } from "resend";
import { NextResponse } from "next/server";

export const runtime = "nodejs";

const emailOk = (value: string) =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

type ContactBody = {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
  website?: string; // honeypot
};

export async function POST(request: Request) {
  let body: ContactBody;

  try {
    body = (await request.json()) as ContactBody;
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  // Honeypot — bots fill this; humans leave it empty
  if (body.website?.trim()) {
    return NextResponse.json({ ok: true });
  }

  const name = body.name?.trim() ?? "";
  const email = body.email?.trim() ?? "";
  const subject = body.subject?.trim() || "Portfolio contact";
  const message = body.message?.trim() ?? "";

  if (!name || name.length > 120) {
    return NextResponse.json({ error: "Please enter a valid name." }, { status: 400 });
  }
  if (!email || !emailOk(email) || email.length > 200) {
    return NextResponse.json({ error: "Please enter a valid email." }, { status: 400 });
  }
  if (!message || message.length < 10 || message.length > 5000) {
    return NextResponse.json(
      { error: "Message should be between 10 and 5000 characters." },
      { status: 400 },
    );
  }
  if (subject.length > 200) {
    return NextResponse.json({ error: "Subject is too long." }, { status: 400 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL ?? "fatwawiratama23@gmail.com";

  if (!apiKey) {
    return NextResponse.json(
      { error: "Email service is not configured." },
      { status: 500 },
    );
  }

  const resend = new Resend(apiKey);

  try {
    const { error } = await resend.emails.send({
      from: "Portfolio Contact <onboarding@resend.dev>",
      to: [to],
      replyTo: email,
      subject: `[Portfolio] ${subject}`,
      text: [
        `Name: ${name}`,
        `Email: ${email}`,
        `Subject: ${subject}`,
        "",
        message,
      ].join("\n"),
      html: `
        <div style="font-family: ui-sans-serif, system-ui, sans-serif; line-height: 1.5; color: #111;">
          <p><strong>Name:</strong> ${escapeHtml(name)}</p>
          <p><strong>Email:</strong> ${escapeHtml(email)}</p>
          <p><strong>Subject:</strong> ${escapeHtml(subject)}</p>
          <hr style="border: none; border-top: 1px solid #e5e5e5; margin: 16px 0;" />
          <p style="white-space: pre-wrap;">${escapeHtml(message)}</p>
        </div>
      `,
    });

    if (error) {
      console.error("[contact]", error);
      return NextResponse.json(
        { error: "Failed to send message. Please try again." },
        { status: 502 },
      );
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[contact]", err);
    return NextResponse.json(
      { error: "Failed to send message. Please try again." },
      { status: 502 },
    );
  }
}

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}
