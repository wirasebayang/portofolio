import type { ReactNode } from "react";
import Link from "next/link";
import MediaPlaceholder from "@/components/professional/MediaPlaceholder";
import TechIndex from "@/components/professional/TechIndex";
import HeroProfileCard from "@/components/professional/HeroProfileCard";
import PersistedShipCursor from "@/components/PersistedShipCursor";
import { IrisLink } from "@/components/IrisTransition";
import {
  certificates,
  education,
  experience,
  navLinks,
  profile,
  projects,
} from "@/lib/professional-content";

function SectionLabel({ children }: { children: ReactNode }) {
  return (
    <p className="font-mono text-[10px] tracking-[0.22em] text-fuchsia-400/70 uppercase sm:text-[11px]">
      {children}
    </p>
  );
}

export default function ProfessionalPage() {
  return (
    <div className="professional-page min-h-dvh bg-[#08060c] text-[#efeaf6]">
      <PersistedShipCursor />

      {/* Soft atmosphere — not a purple mesh hero */}
      <div
        className="pointer-events-none fixed inset-0 -z-10 bg-[radial-gradient(ellipse_80%_50%_at_50%_-10%,rgba(199,85,247,0.12),transparent_55%),radial-gradient(ellipse_60%_40%_at_100%_50%,rgba(88,28,135,0.08),transparent_50%)]"
        aria-hidden
      />

      <header className="sticky top-0 z-40 border-b border-white/5 bg-[#08060c]/80 backdrop-blur-md">
        <div className="mx-auto flex h-14 max-w-6xl items-center justify-between gap-4 px-4 sm:h-16 sm:px-6 lg:px-8">
          <Link
            href="/professional#top"
            className="font-display text-sm font-semibold tracking-wide text-white sm:text-base"
          >
            {profile.shortName}
            <span className="text-fuchsia-400">.</span>
          </Link>
          <nav
            className="hidden items-center gap-5 md:flex"
            aria-label="Page sections"
          >
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="font-mono text-[9px] tracking-wider text-white/50 uppercase transition-colors hover:text-fuchsia-300"
              >
                {link.label}
              </a>
            ))}
          </nav>
          <IrisLink
            href="/"
            className="font-mono text-[9px] tracking-wider text-white/45 uppercase transition-colors hover:text-white"
          >
            ← Arcade
          </IrisLink>
        </div>
      </header>

      <main>
        {/* 01 Hero */}
        <section
          id="top"
          className="mx-auto flex max-w-6xl flex-col gap-8 px-4 pt-16 pb-20 sm:px-6 sm:pt-24 sm:pb-28 lg:px-8"
        >
          <div className="flex flex-wrap items-center gap-3">
            <span className="inline-flex items-center gap-2 rounded-full border border-emerald-400/25 bg-emerald-400/10 px-3 py-1 font-mono text-[9px] tracking-wider text-emerald-300 uppercase">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" aria-hidden />
              {profile.availability}
            </span>
            <span className="font-mono text-[9px] tracking-wider text-white/40 uppercase">
              {profile.location}
            </span>
          </div>

          <div className="grid gap-10 lg:grid-cols-[1.4fr_0.8fr] lg:items-end">
            <div>
              <SectionLabel>01 — Introduction</SectionLabel>
              <h1 className="mt-4 font-display text-4xl leading-[1.05] font-bold tracking-tight text-white sm:text-5xl md:text-6xl lg:text-[4.25rem]">
                {profile.name}
              </h1>
              <p className="mt-4 font-display text-lg text-fuchsia-200/90 sm:text-xl">
                {profile.role}
              </p>
              <p className="mt-6 max-w-xl text-base leading-relaxed text-white/60 sm:text-lg">
                {profile.tagline}
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <a
                  href="#projects"
                  className="inline-flex items-center bg-fuchsia-500 px-5 py-3 font-mono text-[10px] tracking-wider text-white uppercase transition-colors hover:bg-fuchsia-400"
                >
                  View projects
                </a>
                <a
                  href="#contact"
                  className="inline-flex items-center border border-white/15 px-5 py-3 font-mono text-[10px] tracking-wider text-white/80 uppercase transition-colors hover:border-fuchsia-400/40 hover:text-white"
                >
                  Contact
                </a>
              </div>
            </div>

            <HeroProfileCard />
          </div>
        </section>

        {/* 02 About */}
        <section
          id="about"
          className="border-t border-white/5 bg-[#0c0a10]"
        >
          <div className="mx-auto grid max-w-6xl gap-12 px-4 py-20 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16 lg:px-8 lg:py-28">
            <div>
              <SectionLabel>02 — About</SectionLabel>
              <h2 className="mt-4 font-display text-3xl font-semibold tracking-tight text-white sm:text-4xl">
                From material control to fullstack — disciplined delivery,
                modern web.
              </h2>
            </div>
            <div className="flex flex-col gap-10">
              <p className="text-base leading-relaxed text-white/65 sm:text-lg">
                {profile.about}
              </p>
              <dl className="grid grid-cols-3 gap-4 border-t border-white/10 pt-8">
                {profile.stats.map((stat) => (
                  <div key={stat.label}>
                    <dt className="font-display text-2xl font-bold text-white sm:text-3xl">
                      {stat.value}
                    </dt>
                    <dd className="mt-1 font-mono text-[9px] leading-snug tracking-wider text-white/40 uppercase">
                      {stat.label}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </section>

        {/* 03 Stack */}
        <section id="stack" className="border-t border-white/5">
          <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
            <TechIndex />
          </div>
        </section>

        {/* 04 Projects */}
        <section
          id="projects"
          className="border-t border-white/5 bg-[#0c0a10]"
        >
          <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
            <SectionLabel>04 — Selected projects</SectionLabel>
            <h2 className="mt-4 max-w-2xl font-display text-3xl font-semibold tracking-tight text-white sm:text-4xl">
              Projects I have built. Explore the work.
            </h2>

            <div className="mt-14 flex flex-col gap-20">
              {projects.map((project) => (
                <article
                  key={project.id}
                  id={project.slug}
                  className="grid gap-8 lg:grid-cols-2 lg:items-center lg:gap-12"
                >
                  <MediaPlaceholder
                    src={project.coverPath}
                    label={`${project.title} · Cover`}
                    hint={`public/projects/${project.slug}/cover.jpg`}
                    className="w-full"
                  />
                  <div>
                    <p className="font-mono text-[10px] tracking-wider text-white/40 uppercase">
                      Project {project.index} / {projects.length} · {project.year}
                    </p>
                    <p className="mt-3 font-mono text-[10px] tracking-wider text-fuchsia-300/80 uppercase">
                      {project.category}
                    </p>
                    <h3 className="mt-2 font-display text-3xl font-semibold text-white sm:text-4xl">
                      {project.title}
                    </h3>
                    <p className="mt-4 text-base leading-relaxed text-white/60">
                      {project.summary}
                    </p>
                    <ul className="mt-4 flex flex-col gap-2">
                      {project.highlights.map((point) => (
                        <li
                          key={point}
                          className="text-sm leading-relaxed text-white/50 before:mr-2 before:text-fuchsia-400/70 before:content-['·']"
                        >
                          {point}
                        </li>
                      ))}
                    </ul>
                    <ul className="mt-6 flex flex-wrap gap-2">
                      {project.stack.map((tech) => (
                        <li
                          key={tech}
                          className="border border-white/10 px-2.5 py-1 font-mono text-[9px] tracking-wider text-white/55 uppercase"
                        >
                          {tech}
                        </li>
                      ))}
                    </ul>
                    <p className="mt-6 font-mono text-[9px] text-white/30">
                      Video placeholder:{" "}
                      <span className="text-white/45">{project.demoPath}</span>
                    </p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* 05 Experience */}
        <section id="experience" className="border-t border-white/5">
          <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
            <SectionLabel>05 — Experience</SectionLabel>
            <h2 className="mt-4 font-display text-3xl font-semibold tracking-tight text-white sm:text-4xl">
              Operations discipline. Software craft.
            </h2>
            <div className="mt-12 flex flex-col gap-10">
              {experience.map((job) => (
                <article
                  key={job.id}
                  className="grid gap-4 border-t border-white/10 pt-8 sm:grid-cols-[12rem_1fr] sm:gap-10"
                >
                  <p className="font-mono text-[10px] tracking-wider text-white/40 uppercase">
                    {job.period}
                  </p>
                  <div>
                    <h3 className="font-display text-xl font-semibold text-white">
                      {job.role}
                    </h3>
                    <p className="mt-1 text-sm text-fuchsia-200/70">
                      {job.org} · {job.location}
                    </p>
                    <ul className="mt-4 flex flex-col gap-2">
                      {job.points.map((point) => (
                        <li
                          key={point}
                          className="text-sm leading-relaxed text-white/60"
                        >
                          {point}
                        </li>
                      ))}
                    </ul>
                  </div>
                </article>
              ))}
            </div>

            <div className="mt-16">
              <SectionLabel>Education</SectionLabel>
              <div className="mt-8 flex flex-col gap-8">
                {education.map((ed) => (
                  <article
                    key={ed.id}
                    className="grid gap-4 border-t border-white/10 pt-8 sm:grid-cols-[12rem_1fr] sm:gap-10"
                  >
                    <p className="font-mono text-[10px] tracking-wider text-white/40 uppercase">
                      {ed.period}
                    </p>
                    <div>
                      <h3 className="font-display text-xl font-semibold text-white">
                        {ed.school}
                      </h3>
                      <p className="mt-2 text-sm leading-relaxed text-white/60">
                        {ed.detail}
                      </p>
                      <p className="mt-2 font-mono text-[9px] tracking-wider text-fuchsia-300/60 uppercase">
                        {ed.meta}
                      </p>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* 06 Certificates */}
        <section
          id="certificates"
          className="border-t border-white/5 bg-[#0c0a10]"
        >
          <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
            <SectionLabel>06 — Certificates</SectionLabel>
            <h2 className="mt-4 font-display text-3xl font-semibold tracking-tight text-white sm:text-4xl">
              Proof of progress.
            </h2>
            <ul className="mt-12 grid gap-4 sm:grid-cols-2">
              {certificates.map((cert) => (
                <li
                  key={cert.id}
                  className="border border-white/8 bg-[#121018] px-5 py-5"
                >
                  <p className="font-mono text-[9px] tracking-wider text-fuchsia-300/70 uppercase">
                    {cert.org} · {cert.date}
                  </p>
                  <p className="mt-2 font-display text-lg font-semibold text-white">
                    {cert.title}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* 07 Contact */}
        <section id="contact" className="border-t border-white/5">
          <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
            <SectionLabel>07 — Contact</SectionLabel>
            <h2 className="mt-4 max-w-xl font-display text-3xl font-semibold tracking-tight text-white sm:text-4xl">
              Have something in mind?
            </h2>
            <p className="mt-4 max-w-lg text-base leading-relaxed text-white/60">
              I&apos;m open to fullstack opportunities, collaborations, and
              thoughtful product ideas. Feel free to reach out.
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <a
                href={`mailto:${profile.email}`}
                className="inline-flex items-center bg-fuchsia-500 px-5 py-3 font-mono text-[10px] tracking-wider text-white uppercase transition-colors hover:bg-fuchsia-400"
              >
                Email me
              </a>
              <a
                href={profile.phoneHref}
                className="inline-flex items-center border border-white/15 px-5 py-3 font-mono text-[10px] tracking-wider text-white/80 uppercase transition-colors hover:border-fuchsia-400/40 hover:text-white"
              >
                Call / WA
              </a>
              <a
                href={profile.github}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center border border-white/15 px-5 py-3 font-mono text-[10px] tracking-wider text-white/80 uppercase transition-colors hover:border-fuchsia-400/40 hover:text-white"
              >
                GitHub
              </a>
              <a
                href={profile.linkedin}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center border border-white/15 px-5 py-3 font-mono text-[10px] tracking-wider text-white/80 uppercase transition-colors hover:border-fuchsia-400/40 hover:text-white"
              >
                LinkedIn
              </a>
            </div>
            <p className="mt-6 font-mono text-[10px] text-white/35">
              {profile.email} · {profile.phone} · {profile.location}
            </p>
          </div>
        </section>
      </main>

      <footer className="border-t border-white/5">
        <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-3 px-4 py-8 sm:flex-row sm:items-center sm:px-6 lg:px-8">
          <p className="font-mono text-[9px] tracking-wider text-white/35 uppercase">
            © {new Date().getFullYear()} · {profile.name}
          </p>
          <IrisLink
            href="/"
            className="font-mono text-[9px] tracking-wider text-white/45 uppercase hover:text-fuchsia-300"
          >
            Back to arcade menu
          </IrisLink>
        </div>
      </footer>
    </div>
  );
}
