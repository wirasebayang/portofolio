"use client";

import { type FormEvent, useState } from "react";

const fieldClass =
  "w-full rounded-lg border border-white/10 bg-white/[0.04] px-3.5 py-2.5 text-sm text-white outline-none transition-[border-color,box-shadow] placeholder:text-white/30 focus:border-fuchsia-400/50 focus:shadow-[0_0_0_1px_rgba(199,85,247,0.25)]";

const labelClass =
  "mb-1.5 block font-mono text-[9px] tracking-wider text-white/45 uppercase";

type Status = "idle" | "loading" | "success" | "error";

export default function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("loading");
    setError("");

    const form = event.currentTarget;
    const data = new FormData(form);

    const payload = {
      name: String(data.get("name") ?? ""),
      email: String(data.get("email") ?? ""),
      subject: String(data.get("subject") ?? ""),
      message: String(data.get("message") ?? ""),
      website: String(data.get("website") ?? ""),
    };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const json = (await res.json()) as { ok?: boolean; error?: string };

      if (!res.ok) {
        setStatus("error");
        setError(json.error ?? "Something went wrong.");
        return;
      }

      setStatus("success");
      form.reset();
    } catch {
      setStatus("error");
      setError("Network error. Please try again.");
    }
  }

  if (status === "success") {
    return (
      <div className="rounded-xl border border-emerald-400/25 bg-emerald-400/10 p-6 sm:p-8">
        <p className="font-mono text-[10px] tracking-wider text-emerald-300 uppercase">
          Message sent
        </p>
        <p className="mt-3 font-display text-xl font-semibold text-white">
          Thanks — I&apos;ll get back to you soon.
        </p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="mt-6 font-mono text-[10px] tracking-wider text-white/55 uppercase underline-offset-4 hover:text-white hover:underline"
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={onSubmit}
      className="rounded-xl border border-white/10 bg-[#121018] p-5 sm:p-6"
      noValidate
    >
      <p className="font-mono text-[9px] tracking-wider text-fuchsia-300/75 uppercase">
        01 / Direct message
      </p>
      <h3 className="mt-3 font-display text-xl font-semibold tracking-tight text-white sm:text-2xl">
        Let&apos;s make it happen.
      </h3>
      <p className="mt-2 text-sm leading-relaxed text-white/50">
        Have a project or opportunity? Send a note and I&apos;ll reply by email.
      </p>

      {/* Honeypot */}
      <input
        type="text"
        name="website"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden
        className="pointer-events-none absolute left-[-9999px] h-0 w-0 opacity-0"
      />

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="contact-name" className={labelClass}>
            Name
          </label>
          <input
            id="contact-name"
            name="name"
            type="text"
            required
            maxLength={120}
            autoComplete="name"
            placeholder="Your name"
            className={fieldClass}
          />
        </div>
        <div>
          <label htmlFor="contact-email" className={labelClass}>
            Email
          </label>
          <input
            id="contact-email"
            name="email"
            type="email"
            required
            maxLength={200}
            autoComplete="email"
            placeholder="you@example.com"
            className={fieldClass}
          />
        </div>
      </div>

      <div className="mt-4">
        <label htmlFor="contact-subject" className={labelClass}>
          Subject
        </label>
        <input
          id="contact-subject"
          name="subject"
          type="text"
          maxLength={200}
          placeholder="Opportunity, collab, hello…"
          className={fieldClass}
        />
      </div>

      <div className="mt-4">
        <label htmlFor="contact-message" className={labelClass}>
          Message
        </label>
        <textarea
          id="contact-message"
          name="message"
          required
          minLength={10}
          maxLength={5000}
          rows={7}
          placeholder="Tell me a bit about what you have in mind…"
          className={`${fieldClass} min-h-[10rem] resize-y`}
        />
      </div>

      {status === "error" && error ? (
        <p className="mt-4 font-mono text-[10px] tracking-wide text-rose-300">
          {error}
        </p>
      ) : null}

      <div className="mt-6 flex justify-end">
        <button
          type="submit"
          disabled={status === "loading"}
          className="inline-flex items-center justify-center gap-1.5 border border-fuchsia-400/35 bg-fuchsia-500/15 px-5 py-2.5 font-mono text-[10px] tracking-wider text-fuchsia-100 uppercase transition-colors hover:border-fuchsia-400/60 hover:bg-fuchsia-500/25 hover:text-white disabled:cursor-not-allowed disabled:opacity-60"
        >
          {status === "loading" ? "Sending…" : "Send message"}
          {status !== "loading" ? <span aria-hidden>↗</span> : null}
        </button>
      </div>
    </form>
  );
}
