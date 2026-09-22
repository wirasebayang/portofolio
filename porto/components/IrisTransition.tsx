"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { usePathname, useRouter } from "next/navigation";

type IrisContextValue = {
  /** Navigate with iris out → route change → iris in */
  irisTo: (href: string) => void;
  busy: boolean;
};

const IrisContext = createContext<IrisContextValue | null>(null);

const OUT_MS = 520;
const IN_MS = 520;

export function useIrisNavigate() {
  const ctx = useContext(IrisContext);
  if (!ctx) {
    throw new Error("useIrisNavigate must be used within IrisTransitionProvider");
  }
  return ctx;
}

/**
 * Full-viewport circular wipe: iris out (cover) → navigate → iris in (reveal).
 */
export default function IrisTransitionProvider({
  children,
}: {
  children: ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const [radius, setRadius] = useState("0%");
  const [visible, setVisible] = useState(false);
  const [duration, setDuration] = useState(OUT_MS);
  const [busy, setBusy] = useState(false);
  const pendingIn = useRef(false);
  const busyRef = useRef(false);

  const irisTo = useCallback(
    (href: string) => {
      if (busyRef.current) return;

      const url = new URL(href, window.location.origin);
      const nextPath = url.pathname;
      if (nextPath === pathname && !url.hash) return;
      if (nextPath === pathname) {
        window.location.hash = url.hash;
        return;
      }

      busyRef.current = true;
      setBusy(true);
      setDuration(OUT_MS);
      setVisible(true);
      setRadius("0%");

      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setRadius("150%");
        });
      });

      window.setTimeout(() => {
        pendingIn.current = true;
        router.push(href);
      }, OUT_MS);
    },
    [pathname, router],
  );

  useEffect(() => {
    if (!pendingIn.current) return;
    pendingIn.current = false;

    setDuration(IN_MS);
    setVisible(true);
    setRadius("150%");

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        setRadius("0%");
      });
    });

    const done = window.setTimeout(() => {
      setVisible(false);
      setBusy(false);
      busyRef.current = false;
    }, IN_MS);

    return () => window.clearTimeout(done);
  }, [pathname]);

  return (
    <IrisContext.Provider value={{ irisTo, busy }}>
      {children}
      <div
        aria-hidden
        className={[
          "fixed inset-0 z-[9998]",
          visible ? "pointer-events-auto" : "pointer-events-none opacity-0",
        ].join(" ")}
        style={{
          background: "#05010a",
          clipPath: `circle(${radius} at 50% 50%)`,
          transition: visible
            ? `clip-path ${duration}ms cubic-bezier(0.65, 0, 0.35, 1)`
            : "none",
        }}
      />
    </IrisContext.Provider>
  );
}

type IrisLinkProps = {
  href: string;
  className?: string;
  children: ReactNode;
};

/** Drop-in for route Links that should iris-wipe. */
export function IrisLink({ href, className, children }: IrisLinkProps) {
  const { irisTo, busy } = useIrisNavigate();

  return (
    <a
      href={href}
      className={className}
      onClick={(e) => {
        e.preventDefault();
        if (!busy) irisTo(href);
      }}
    >
      {children}
    </a>
  );
}
