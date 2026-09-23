"use client";

import BlurText from "@/components/react-bits/BlurText";
import SpotlightCard from "@/components/react-bits/SpotlightCard";
import { education } from "@/lib/professional-content";

export default function EducationSection() {
  return (
    <section id="education" className="border-t border-white/5">
      <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
        <header className="max-w-2xl">
          <p className="font-mono text-[10px] tracking-[0.22em] text-fuchsia-400/70 uppercase sm:text-[11px]">
            06 — Education
          </p>
          <BlurText
            text="Study hard. Ship harder."
            delay={90}
            animateBy="words"
            direction="top"
            className="mt-4 font-display text-3xl font-semibold tracking-tight text-white sm:text-4xl"
          />
          <p className="mt-4 text-base leading-relaxed text-white/55">
            Immersive training and an ongoing CS degree — the foundation behind
            the apps I build.
          </p>
        </header>

        <ul className="mt-14 grid items-stretch gap-5 lg:grid-cols-2">
          {education.map((ed) => (
            <li key={ed.id} className="h-full">
              <SpotlightCard
                className={[
                  "h-full !rounded-xl !border-white/10 !bg-[#121018] !p-0",
                  ed.current ? "!border-fuchsia-400/30" : "",
                ].join(" ")}
                spotlightColor="rgba(199, 85, 247, 0.18)"
              >
                <article className="relative z-[1] flex h-full flex-col p-5 sm:p-6">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <span className="font-mono text-[9px] tracking-wider text-fuchsia-300/75 uppercase">
                      {ed.index} · {ed.kind}
                    </span>
                    <time className="font-mono text-[9px] tracking-wider text-white/40 uppercase">
                      {ed.period}
                    </time>
                  </div>

                  <div className="mt-6">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={ed.logo}
                      alt={ed.logoAlt}
                      width={180}
                      height={48}
                      className="h-9 w-auto max-w-[11rem] object-contain object-left sm:h-10 sm:max-w-[12.5rem]"
                    />
                  </div>

                  <p className="mt-5 font-mono text-[10px] tracking-wider text-white/45 uppercase">
                    {ed.school}
                  </p>
                  <h3 className="mt-2 font-display text-xl font-semibold tracking-tight text-white sm:text-2xl">
                    {ed.program}
                  </h3>
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-white/55">
                    {ed.detail}
                  </p>

                  <div className="mt-6 flex flex-wrap items-end justify-between gap-3 border-t border-white/10 pt-4">
                    <div>
                      <p className="font-display text-2xl font-bold text-white">
                        {ed.statValue}
                      </p>
                      <p className="mt-0.5 font-mono text-[9px] tracking-wider text-white/40 uppercase">
                        {ed.statLabel}
                      </p>
                    </div>

                    {"links" in ed && ed.links.length > 0 ? (
                      <div className="flex flex-wrap justify-end gap-2">
                        {ed.links.map((link) => (
                          <a
                            key={link.href}
                            href={link.href}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center justify-center gap-1.5 border border-fuchsia-400/35 bg-fuchsia-500/15 px-3 py-2 font-mono text-[9px] tracking-wider text-fuchsia-100 uppercase transition-colors hover:border-fuchsia-400/60 hover:bg-fuchsia-500/25 hover:text-white"
                          >
                            {link.label}
                            <span aria-hidden>↗</span>
                          </a>
                        ))}
                      </div>
                    ) : ed.current ? (
                      <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-400/25 bg-emerald-400/10 px-2.5 py-1 font-mono text-[8px] tracking-wider text-emerald-300 uppercase">
                        <span
                          className="h-1.5 w-1.5 rounded-full bg-emerald-400"
                          aria-hidden
                        />
                        In progress
                      </span>
                    ) : null}
                  </div>
                </article>
              </SpotlightCard>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
