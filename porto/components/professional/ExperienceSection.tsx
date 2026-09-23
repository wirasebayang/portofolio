"use client";

import { useEffect, useRef, useState } from "react";
import BlurText from "@/components/react-bits/BlurText";
import { experience } from "@/lib/professional-content";

const HIGHLIGHT_ICONS = [
  // ops — layers
  <svg key="ops" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden className="h-[18px] w-[18px]">
    <path d="M12 2 2 7l10 5 10-5-10-5Z" />
    <path d="m2 17 10 5 10-5" />
    <path d="m2 12 10 5 10-5" />
  </svg>,
  // kaizen — trending up
  <svg key="kaizen" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden className="h-[18px] w-[18px]">
    <path d="M16 7h5v5" />
    <path d="m21 7-9 9-4-4-6 6" />
  </svg>,
  // collab — users
  <svg key="collab" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden className="h-[18px] w-[18px]">
    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
  </svg>,
  // accuracy — check circle
  <svg key="accuracy" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden className="h-[18px] w-[18px]">
    <circle cx="12" cy="12" r="10" />
    <path d="m9 12 2 2 4-4" />
  </svg>,
];

export default function ExperienceSection() {
  const [activeId, setActiveId] = useState<string | null>(
    experience[0]?.highlights[0]?.id ?? null,
  );
  const itemRefs = useRef<Map<string, HTMLElement>>(new Map());

  useEffect(() => {
    const nodes = [...itemRefs.current.values()];
    if (!nodes.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        const top = visible[0]?.target as HTMLElement | undefined;
        const id = top?.dataset.highlightId;
        if (id) setActiveId(id);
      },
      { rootMargin: "-35% 0px -45% 0px", threshold: [0.2, 0.5, 0.8] },
    );

    nodes.forEach((n) => observer.observe(n));
    return () => observer.disconnect();
  }, []);

  return (
    <section id="experience" className="relative isolate overflow-hidden border-t border-white/5">
      <div className="mx-auto grid max-w-6xl gap-14 px-4 py-20 sm:px-6 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20 lg:px-8 lg:py-28">
        {/* Left: sticky heading */}
        <header className="lg:sticky lg:top-28 lg:self-start">
          <p className="font-mono text-[10px] tracking-[0.22em] text-fuchsia-400/70 uppercase sm:text-[11px]">
            05 — Experience
          </p>
          <BlurText
            text="Process ownership. Measurable results."
            delay={90}
            animateBy="words"
            direction="top"
            className="mt-4 font-display text-3xl font-semibold tracking-tight text-white sm:text-4xl lg:text-[2.75rem] lg:leading-[1.05]"
          />
          <p className="mt-5 max-w-md text-base leading-relaxed text-white/55">
            Before shipping product as a fullstack developer, I spent years
            owning operational systems — accuracy, handoffs, and continuous
            improvement under real production pressure.
          </p>
        </header>

        {/* Right: role + timeline */}
        <div className="flex flex-col gap-10 lg:pt-6">
          {experience.map((job) => (
            <div key={job.id} className="flex flex-col gap-8">
              <article className="flex flex-col gap-4 border border-white/10 bg-[#121018]/70 px-5 py-6 backdrop-blur-sm sm:flex-row sm:items-start sm:justify-between sm:gap-8 sm:px-6">
                <div>
                  <p className="font-mono text-[10px] tracking-wider text-fuchsia-300/80 uppercase">
                    {job.period}
                  </p>
                  <h3 className="mt-2 font-display text-xl font-semibold tracking-tight text-white sm:text-2xl">
                    {job.role}
                  </h3>
                  <p className="mt-1 text-sm text-white/55">
                    {job.org}
                  </p>
                </div>
                <span className="inline-flex shrink-0 items-center gap-2 self-start rounded-full border border-fuchsia-400/25 bg-fuchsia-500/10 px-3 py-1.5 font-mono text-[9px] tracking-wider text-fuchsia-200 uppercase">
                  <span className="h-1.5 w-1.5 rounded-full bg-fuchsia-400" aria-hidden />
                  {job.location}
                </span>
              </article>

              <div className="relative pl-1">
                <div
                  className="absolute top-2 bottom-2 left-[18px] w-px bg-gradient-to-b from-fuchsia-500 via-fuchsia-500/40 to-transparent"
                  aria-hidden
                />
                <ul className="flex flex-col">
                  {job.highlights.map((item, index) => {
                    const isActive = activeId === item.id;
                    return (
                      <li
                        key={item.id}
                        ref={(el) => {
                          if (el) itemRefs.current.set(item.id, el);
                          else itemRefs.current.delete(item.id);
                        }}
                        data-highlight-id={item.id}
                        className={[
                          "relative grid grid-cols-[38px_42px_1fr] items-start gap-3 border-b border-white/8 py-5 transition-colors duration-300 sm:gap-4",
                          isActive ? "border-fuchsia-400/25" : "",
                        ].join(" ")}
                      >
                        <span
                          className={[
                            "relative z-[1] flex h-6 w-9 items-center justify-center rounded-full border font-mono text-[9px] font-bold tracking-wider transition-all duration-300",
                            isActive
                              ? "scale-105 border-fuchsia-300/70 bg-fuchsia-500 text-white shadow-[0_0_20px_rgba(199,85,247,0.55)]"
                              : "border-white/10 bg-[#121018] text-white/40",
                          ].join(" ")}
                        >
                          {String(index + 1).padStart(2, "0")}
                        </span>
                        <span
                          className={[
                            "mt-0.5 flex h-8 w-8 items-center justify-center rounded-lg transition-all duration-300",
                            isActive
                              ? "translate-x-0.5 bg-fuchsia-500 text-white shadow-[0_0_18px_rgba(199,85,247,0.4)]"
                              : "bg-fuchsia-500/10 text-fuchsia-300/80",
                          ].join(" ")}
                        >
                          {HIGHLIGHT_ICONS[index] ?? HIGHLIGHT_ICONS[0]}
                        </span>
                        <div>
                          <h4
                            className={[
                              "font-display text-base font-semibold tracking-tight transition-colors sm:text-lg",
                              isActive ? "text-fuchsia-200" : "text-white",
                            ].join(" ")}
                          >
                            {item.title}
                          </h4>
                          <p className="mt-1.5 max-w-xl text-sm leading-relaxed text-white/50">
                            {item.body}
                          </p>
                        </div>
                      </li>
                    );
                  })}
                </ul>
              </div>

              <ul
                className="flex flex-wrap gap-2"
                aria-label="Skills from this role"
              >
                {job.skills.map((skill) => (
                  <li
                    key={skill}
                    className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5 font-mono text-[9px] tracking-wider text-white/60 uppercase"
                  >
                    {skill}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
