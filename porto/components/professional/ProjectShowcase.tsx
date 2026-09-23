"use client";

import type { CSSProperties } from "react";
import DecryptedText from "@/components/react-bits/DecryptedText";
import GradientText from "@/components/react-bits/GradientText";
import SpotlightCard from "@/components/react-bits/SpotlightCard";
import ScrollVelocity from "@/components/react-bits/ScrollVelocity";
import GlareHover from "@/components/react-bits/GlareHover";
import BlurText from "@/components/react-bits/BlurText";
import MediaPlaceholder from "@/components/professional/MediaPlaceholder";
import { projects } from "@/lib/professional-content";

/** Matches muhamad-rusdiana.vercel.app sticky stack: page scroll, no nested scrollbar */
const ITEM_DISTANCE = 88;
const STACK_DISTANCE = 22;
/** Clears sticky site header (~64px) + breathing room */
const STACK_BASE_TOP = 92;

export default function ProjectShowcase() {
  return (
    <div>
      <div
        className="mb-6 overflow-hidden border-y border-white/5 py-3 opacity-80"
        aria-hidden
      >
        <ScrollVelocity
          texts={["SELECTED WORK  ·  DESIGN, CODE & SHIP  ·  ", "FULLSTACK BUILDS  ·  SHIPPED LIVE  ·  "]}
          velocity={36}
          numCopies={3}
          className="font-display text-2xl font-semibold tracking-[0.08em] text-fuchsia-300/35 uppercase md:text-4xl"
          parallaxClassName="parallax py-1"
          scrollerClassName="scroller flex whitespace-nowrap"
        />
      </div>

      <div className="mx-auto max-w-6xl px-4 pt-10 sm:px-6 lg:px-8 lg:pt-16">
        <header className="max-w-2xl">
          <p className="font-mono text-[10px] tracking-[0.22em] text-fuchsia-400/70 uppercase sm:text-[11px]">
            04 — Selected projects
          </p>
          <BlurText
            text="Projects I have built. Explore the work."
            delay={90}
            animateBy="words"
            direction="top"
            className="mt-4 font-display text-3xl font-semibold tracking-tight text-white sm:text-4xl"
          />
          <p className="mt-4 text-base leading-relaxed text-white/55">
            Keep scrolling the page — each project pins and stacks over the last.
          </p>
        </header>

        <div
          className="scroll-stack relative mt-14 w-full"
          style={
            {
              "--item-distance": `${ITEM_DISTANCE}px`,
              "--stack-distance": `${STACK_DISTANCE}px`,
            } as CSSProperties
          }
        >
          <div className="scroll-stack-inner relative pb-1">
            {projects.map((project, index) => {
              const isLast = index === projects.length - 1;
              return (
                <div
                  key={project.id}
                  className="scroll-stack-card sticky w-full origin-top will-change-transform"
                  style={{
                    top: STACK_BASE_TOP + index * STACK_DISTANCE,
                    zIndex: index + 1,
                    marginBottom: isLast ? 0 : ITEM_DISTANCE,
                    backfaceVisibility: "hidden",
                  }}
                >
                  <SpotlightCard
                    className="!rounded-2xl !border-white/10 !bg-[#121018]/95 !p-5 shadow-[0_24px_60px_rgba(0,0,0,0.45)] backdrop-blur-sm sm:!p-7"
                    spotlightColor="rgba(199, 85, 247, 0.22)"
                  >
                    <article
                      id={project.slug}
                      className={[
                        "relative z-[1] grid gap-6 lg:grid-cols-2 lg:items-center lg:gap-8",
                        index % 2 === 1 ? "lg:[&>*:first-child]:order-2" : "",
                      ].join(" ")}
                    >
                      <div className="flex flex-col gap-3">
                        <GlareHover
                          glareColor="#e879f9"
                          glareOpacity={0.4}
                          glareSize={280}
                          borderRadius="0.75rem"
                          className="w-full"
                        >
                          <MediaPlaceholder
                            src={project.coverPath}
                            label={`${project.title} · Cover`}
                            hint={`public/projects/${project.slug}/cover.jpg`}
                            className="w-full overflow-hidden rounded-xl"
                          />
                        </GlareHover>
                        {project.liveUrl && (
                          <a
                            href={project.liveUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex w-full items-center justify-center gap-2 border border-fuchsia-400/35 bg-fuchsia-500/15 px-4 py-2.5 font-mono text-[10px] tracking-wider text-fuchsia-100 uppercase transition-colors hover:border-fuchsia-400/60 hover:bg-fuchsia-500/25 hover:text-white"
                          >
                            Visit live site
                            <span aria-hidden>↗</span>
                          </a>
                        )}
                      </div>
                      <div>
                        <p className="font-mono text-[10px] tracking-wider text-white/40 uppercase">
                          Project {project.index} / {projects.length} ·{" "}
                          {project.year}
                        </p>
                        <p className="mt-2 font-mono text-[10px] tracking-wider text-fuchsia-300/80 uppercase">
                          {project.category}
                        </p>
                        <h3 className="mt-2 font-display text-2xl font-semibold text-white sm:text-3xl">
                          <DecryptedText
                            text={project.title}
                            animateOn="view"
                            sequential
                            speed={35}
                            characters="ABCDEFGHIJKLMNOPQRSTUVWXYZ"
                            className="text-white"
                            encryptedClassName="text-fuchsia-700/70"
                          />
                        </h3>
                        <p className="mt-3 text-sm leading-relaxed text-white/60 sm:text-base">
                          {project.summary}
                        </p>
                        <ul className="mt-3 flex flex-col gap-1.5">
                          {project.highlights.slice(0, 3).map((point) => (
                            <li
                              key={point}
                              className="text-sm leading-relaxed text-white/50 before:mr-2 before:text-fuchsia-400/70 before:content-['·']"
                            >
                              {point}
                            </li>
                          ))}
                        </ul>
                        <ul className="mt-5 flex flex-wrap gap-2">
                          {project.stack.slice(0, 6).map((tech) => (
                            <li
                              key={tech}
                              className="border border-white/10 px-2.5 py-1 font-mono text-[9px] tracking-wider text-white/55 uppercase"
                            >
                              {tech}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </article>
                  </SpotlightCard>
                </div>
              );
            })}
            <div
              className="scroll-stack-end w-full"
              style={{ height: "12vh", minHeight: 90 }}
              aria-hidden
            />
          </div>
        </div>
      </div>
    </div>
  );
}
