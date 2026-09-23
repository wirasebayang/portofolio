"use client";

import { type CSSProperties, type FormEvent, useState } from "react";
import { IrisLink } from "@/components/IrisTransition";
import {
  certificates,
  education,
  experience,
  profile,
  projects,
  technologies,
} from "@/lib/professional-content";

type Status = "idle" | "loading" | "success" | "error";

const page: CSSProperties = {
  fontFamily: '"Times New Roman", Times, serif',
  fontSize: 16,
  lineHeight: 1.35,
  color: "#000",
  background: "#fff",
  minHeight: "100dvh",
};

const comic: CSSProperties = {
  fontFamily: '"Comic Sans MS", "Comic Sans", cursive',
};

const monoGreen: CSSProperties = {
  margin: "0 0 4px",
  color: "#090",
  fontFamily: '"Courier New", monospace',
  fontSize: 12,
};

const linkBlue = "text-[#00c] underline";

const dashedHr: CSSProperties = {
  border: "none",
  borderTop: "1px dashed #999",
  margin: "16px 0",
};

/** Intentionally low-effort. Satire, not a design system. */
export default function LazyPage() {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");
  const [showSecret, setShowSecret] = useState(false);

  const skillNames = technologies.map((t) => t.name).join(", ");

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("loading");
    setError("");

    const form = event.currentTarget;
    const data = new FormData(form);
    const payload = {
      name: String(data.get("name") ?? ""),
      email: String(data.get("email") ?? ""),
      subject: String(data.get("subject") ?? "") || "lazy mode contact (sorry)",
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
        setError(json.error ?? "idk it broke");
        return;
      }
      setStatus("success");
      form.reset();
    } catch {
      setStatus("error");
      setError("network died. not my problem probably.");
    }
  }

  return (
    <div className="lazy-page" style={page}>
      <style>{`
        @keyframes lazy-marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @keyframes lazy-blink {
          0%, 49% { opacity: 1; }
          50%, 100% { opacity: 0; }
        }
        .lazy-marquee-track {
          display: inline-block;
          white-space: nowrap;
          animation: lazy-marquee 18s linear infinite;
        }
        .lazy-blink {
          animation: lazy-blink 1s step-end infinite;
          color: red;
          font-weight: bold;
        }
      `}</style>

      <div
        style={{
          background: "#ffff00",
          borderBottom: "3px solid red",
          padding: "6px 8px",
          ...comic,
          fontSize: 14,
          textAlign: "center",
          overflow: "hidden",
        }}
      >
        🚧 UNDER CONSTRUCTION 🚧 please hire me anyway 🚧
        <div style={{ marginTop: 4, overflow: "hidden" }}>
          <div className="lazy-marquee-track">
            best viewed in netscape navigator · resolution 800×600 · last
            updated: idk · TODO: add design · TODO: sleep · TODO: become
            employable&nbsp;&nbsp;&nbsp;best viewed in netscape navigator ·
            resolution 800×600 · last updated: idk · TODO: add design · TODO:
            sleep · TODO: become employable&nbsp;&nbsp;&nbsp;
          </div>
        </div>
      </div>

      <div style={{ padding: "12px 16px", maxWidth: 720 }}>
        <p style={{ margin: "0 0 8px", color: "#666", fontSize: 13 }}>
          <IrisLink href="/" className={linkBlue}>
            ← back to the fancy menu (the one i actually tried on)
          </IrisLink>
        </p>

        <p style={monoGreen}>{"<!-- TODO: make this look professional. nah. -->"}</p>
        <p style={{ ...monoGreen, marginBottom: 16 }}>
          {"<!-- ship cursor? aurora? nah too much work -->"}
        </p>

        <h1
          style={{
            ...comic,
            fontSize: 32,
            margin: "0 0 4px",
            color: "#000080",
          }}
        >
          {profile.name}&apos;s Portofolio
        </h1>
        <p style={{ margin: "0 0 2px", fontStyle: "italic", color: "#333" }}>
          {profile.role} (i think)
        </p>
        <p style={{ margin: "0 0 12px", color: "#555", fontSize: 14 }}>
          {profile.location} · {profile.availability.toLowerCase()} · typed this
          in notepad energy
        </p>

        <p style={{ margin: "0 0 16px" }}>
          hi. welcome to my website. i got tired so this is the lazy mode.
          <br />
          real content below. fake effort above.{" "}
          <span className="lazy-blink">NEW!!!</span>
        </p>

        <hr style={dashedHr} />

        <h2
          style={{
            fontSize: 20,
            margin: "0 0 8px",
            background: "#eee",
            display: "inline",
          }}
        >
          about me
        </h2>
        <div
          style={{
            display: "flex",
            gap: 16,
            alignItems: "flex-start",
            marginTop: 8,
          }}
        >
          <div style={{ flex: 1, minWidth: 0 }}>
            <p style={{ margin: "0 0 8px" }}>{profile.about}</p>
            <p style={{ margin: "0 0 8px", color: "#666", fontStyle: "italic" }}>
              also: lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
              do eiusmod… wait no that&apos;s placeholder. i left it in on
              purpose. satire.
            </p>
            <p style={{ margin: 0 }}>{profile.tagline}</p>
          </div>
          <div style={{ flexShrink: 0, textAlign: "center" }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/about/portrait.png"
              alt={profile.name}
              width={140}
              height={180}
              style={{
                width: 140,
                height: "auto",
                border: "2px solid #999",
                display: "block",
                background: "#f5f5f5",
              }}
            />
            <p
              style={{
                margin: "4px 0 0",
                fontSize: 11,
                color: "#888",
                fontFamily: "Arial, sans-serif",
              }}
            >
              me.jpg (ok this one works)
            </p>
          </div>
        </div>

        <hr style={dashedHr} />

        <h2 style={{ fontSize: 20, margin: "0 0 8px" }}>
          skills (copy pasted from cv)
        </h2>
        <p style={{ margin: "0 0 8px", fontSize: 14 }}>{skillNames}</p>
        <p style={{ margin: 0, fontSize: 12, color: "#888" }}>
          no icons. icons take time. time is sleep.
        </p>

        <hr style={dashedHr} />

        <h2 style={{ fontSize: 20, margin: "0 0 8px" }}>
          projects i made (screenshots later)
        </h2>
        <ol style={{ paddingLeft: 24, margin: "8px 0" }}>
          {projects.map((p, i) => {
            const showCover = p.id === "mediflow" || p.id === "dolan";
            return (
            <li key={p.id} style={{ marginBottom: 18 }}>
              <strong style={{ fontSize: 17 }}>{p.title}</strong>{" "}
              <span style={{ color: "#666", fontSize: 13 }}>
                ({p.year} · {p.category})
              </span>
              <br />
              {showCover ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={p.coverPath}
                  alt={`${p.title} cover`}
                  width={200}
                  height={120}
                  style={{
                    margin: "6px 0",
                    width: 200,
                    height: 120,
                    objectFit: "cover",
                    border: "1px solid #999",
                    display: "block",
                  }}
                />
              ) : (
                <div
                  style={{
                    margin: "6px 0",
                    width: 200,
                    height: 120,
                    border: "1px solid #999",
                    background: "#f0f0f0",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#666",
                    fontSize: 12,
                    fontFamily: "Arial, sans-serif",
                    textAlign: "center",
                    padding: 8,
                    lineHeight: 1.4,
                  }}
                  title={p.coverPath}
                >
                  <span>
                    🖼️
                    <br />
                    {p.slug}/cover.jpg
                    <br />
                    <span style={{ color: "#c00" }}>
                      failed to load (i&apos;ll fix it later)
                    </span>
                  </span>
                </div>
              )}
              <span>{p.summary}</span>
              <br />
              <span style={{ fontSize: 13, color: "#444" }}>
                stack: {p.stack.join(", ")}
              </span>
              <br />
              {p.liveUrl ? (
                <a
                  href={p.liveUrl}
                  target="_blank"
                  rel="noreferrer"
                  className={linkBlue}
                >
                  live link
                </a>
              ) : (
                <span style={{ color: "#999" }}>no live link yet lol</span>
              )}
              {p.repoUrl ? (
                <>
                  {" · "}
                  <a
                    href={p.repoUrl}
                    target="_blank"
                    rel="noreferrer"
                    className={linkBlue}
                  >
                    github
                  </a>
                </>
              ) : null}
              {i === 1 ? (
                <p
                  style={{
                    margin: "6px 0 0",
                    fontSize: 12,
                    color: "#090",
                    fontFamily: '"Courier New", monospace',
                  }}
                >
                  {"// TODO: write better description. shipping this."}
                </p>
              ) : null}
            </li>
            );
          })}
        </ol>

        <hr style={dashedHr} />

        <h2 style={{ fontSize: 20, margin: "0 0 8px" }}>work history</h2>
        {experience.map((job) => (
          <div key={job.id} style={{ marginBottom: 12 }}>
            <p style={{ margin: "0 0 4px" }}>
              <strong>{job.role}</strong> @ {job.org}
              <br />
              <span style={{ fontSize: 13, color: "#555" }}>
                {job.period} · {job.location}
              </span>
            </p>
            <ul style={{ margin: "4px 0", paddingLeft: 22 }}>
              {job.highlights.map((h) => (
                <li key={h.id} style={{ marginBottom: 4 }}>
                  <u>{h.title}</u>: {h.body}
                </li>
              ))}
            </ul>
            <p style={{ margin: 0, fontSize: 13 }}>
              skills from that job: {job.skills.join(" / ")}
            </p>
          </div>
        ))}

        <hr style={dashedHr} />

        <h2 style={{ fontSize: 20, margin: "0 0 8px" }}>school stuff</h2>
        <ul style={{ paddingLeft: 22, margin: "8px 0" }}>
          {education.map((ed) => (
            <li key={ed.id} style={{ marginBottom: 10 }}>
              <strong>{ed.school}</strong> — {ed.program}
              <br />
              <span style={{ fontSize: 13, color: "#555" }}>
                {ed.period}
                {ed.current ? " (still going)" : ""} · {ed.statValue}
                {ed.statLabel}
              </span>
              <br />
              {ed.detail}
              {"links" in ed && ed.links ? (
                <p style={{ margin: "4px 0 0" }}>
                  {ed.links.map((link, idx) => (
                    <span key={link.href}>
                      {idx > 0 ? " · " : null}
                      <a
                        href={link.href}
                        target="_blank"
                        rel="noreferrer"
                        className={linkBlue}
                      >
                        {link.label.toLowerCase()}
                      </a>
                    </span>
                  ))}
                </p>
              ) : (
                <p style={{ margin: "4px 0 0", fontSize: 12, color: "#888" }}>
                  logo? i forgot to upload it here. check the other mode.
                </p>
              )}
            </li>
          ))}
        </ul>

        <hr style={dashedHr} />

        <h2 style={{ fontSize: 20, margin: "0 0 8px" }}>
          certificates (click if u want)
        </h2>
        <ul style={{ paddingLeft: 22, margin: "8px 0" }}>
          {certificates.map((c) => (
            <li key={c.id} style={{ marginBottom: 4 }}>
              <a
                href={c.href}
                target="_blank"
                rel="noreferrer"
                className={linkBlue}
              >
                {c.org} — {c.title}
              </a>{" "}
              <span style={{ color: "#888", fontSize: 13 }}>({c.date})</span>
            </li>
          ))}
        </ul>

        <hr style={dashedHr} />

        <h2 style={{ fontSize: 20, margin: "0 0 8px" }}>contact me i guess</h2>
        <p style={{ margin: "0 0 8px", fontSize: 14 }}>
          email:{" "}
          <a href={`mailto:${profile.email}`} className={linkBlue}>
            {profile.email}
          </a>
          <br />
          phone:{" "}
          <a href={profile.phoneHref} className={linkBlue}>
            {profile.phone}
          </a>
          <br />
          github:{" "}
          <a
            href={profile.github}
            target="_blank"
            rel="noreferrer"
            className={linkBlue}
          >
            {profile.github.replace("https://", "")}
          </a>
          <br />
          linkedin:{" "}
          <a
            href={profile.linkedin}
            target="_blank"
            rel="noreferrer"
            className={linkBlue}
          >
            click here (too lazy to style a button)
          </a>
        </p>

        {status === "success" ? (
          <p style={{ color: "green", fontWeight: "bold" }}>
            ok message sent. i&apos;ll reply when i wake up.
            <br />
            <button
              type="button"
              onClick={() => setStatus("idle")}
              style={{ marginTop: 8 }}
            >
              send another
            </button>
          </p>
        ) : (
          <form onSubmit={onSubmit} style={{ marginTop: 8 }} noValidate>
            <p style={{ margin: "0 0 6px", fontSize: 13, color: "#666" }}>
              or use this form. default browser widgets. chef&apos;s kiss.
            </p>
            <div style={{ marginBottom: 6 }}>
              <label htmlFor="lazy-name">name: </label>
              <input id="lazy-name" name="name" required maxLength={120} />
            </div>
            <div style={{ marginBottom: 6 }}>
              <label htmlFor="lazy-email">email: </label>
              <input
                id="lazy-email"
                name="email"
                type="email"
                required
                maxLength={200}
              />
            </div>
            <div style={{ marginBottom: 6 }}>
              <label htmlFor="lazy-subject">subject (optional): </label>
              <input id="lazy-subject" name="subject" maxLength={160} />
            </div>
            <div style={{ marginBottom: 6 }}>
              <label htmlFor="lazy-message" style={{ display: "block" }}>
                message:
              </label>
              <textarea
                id="lazy-message"
                name="message"
                required
                rows={5}
                cols={40}
                maxLength={5000}
                placeholder="say something. or don't. whatever."
              />
            </div>
            <input
              type="text"
              name="website"
              tabIndex={-1}
              autoComplete="off"
              aria-hidden
              style={{ position: "absolute", left: -9999, opacity: 0 }}
            />
            <button type="submit" disabled={status === "loading"}>
              {status === "loading" ? "sending…" : "Submit"}
            </button>
            {status === "error" ? (
              <p style={{ color: "red", margin: "6px 0 0" }}>{error}</p>
            ) : null}
          </form>
        )}

        <hr style={{ ...dashedHr, marginTop: 24, marginBottom: 12 }} />

        <p style={{ fontSize: 12, color: "#888", margin: "0 0 8px" }}>
          visitor counter:{" "}
          <span style={{ fontFamily: '"Courier New", monospace', color: "#000" }}>
            000042
          </span>{" "}
          (hardcoded. analytics is hard.)
        </p>

        <button
          type="button"
          onClick={() => setShowSecret((v) => !v)}
          style={{ fontSize: 12, marginBottom: 12 }}
        >
          {showSecret ? "hide easter egg" : "secret button (do not press)"}
        </button>
        {showSecret ? (
          <pre
            style={{
              background: "#111",
              color: "#0f0",
              padding: 10,
              fontSize: 12,
              overflow: "auto",
              fontFamily: '"Courier New", monospace',
            }}
          >
            {`if (effort > 0) {
  throw new Error("wrong mode buddy");
}
// see /professional for the version where i tried
console.log("you found the joke. hire me.");`}
          </pre>
        ) : null}

        <p
          style={{
            margin: "16px 0 8px",
            ...comic,
            fontSize: 13,
            color: "#666",
          }}
        >
          © {new Date().getFullYear()} {profile.shortName} · made in like 10
          minutes · no rights reserved honestly
        </p>
        <p style={{ margin: 0, fontSize: 12 }}>
          <IrisLink href="/" className={linkBlue}>
            escape to arcade
          </IrisLink>
          {" · "}
          <IrisLink href="/professional" className={linkBlue}>
            see the try-hard mode
          </IrisLink>
        </p>
      </div>
    </div>
  );
}
