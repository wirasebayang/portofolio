"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import TechIndex from "@/components/professional/TechIndex";
import HeroProfileCard from "@/components/professional/HeroProfileCard";
import ProfessionalAtmosphere from "@/components/professional/ProfessionalAtmosphere";
import ProjectShowcase from "@/components/professional/ProjectShowcase";
import ExperienceSection from "@/components/professional/ExperienceSection";
import EducationSection from "@/components/professional/EducationSection";
import ContactForm from "@/components/professional/ContactForm";
import PersistedShipCursor from "@/components/PersistedShipCursor";
import { IrisLink } from "@/components/IrisTransition";
import ClickSpark from "@/components/react-bits/ClickSpark";
import DecryptedText from "@/components/react-bits/DecryptedText";
import GradientText from "@/components/react-bits/GradientText";
import SpotlightCard from "@/components/react-bits/SpotlightCard";
import CountUp from "@/components/react-bits/CountUp";
import BlurText from "@/components/react-bits/BlurText";
import {
  certificates,
  navLinks,
  profile,
} from "@/lib/professional-content";

function SectionLabel({ children }: { children: ReactNode }) {
  return (
    <p className="font-mono text-[10px] tracking-[0.22em] text-fuchsia-400/70 uppercase sm:text-[11px]">
      {children}
    </p>
  );
}

const ctaPrimary =
  "inline-flex items-center bg-fuchsia-500 px-5 py-3 font-mono text-[10px] tracking-wider text-white uppercase transition-colors hover:bg-fuchsia-400";
const ctaGhost =
  "inline-flex items-center border border-white/15 px-5 py-3 font-mono text-[10px] tracking-wider text-white/80 uppercase transition-colors hover:border-fuchsia-400/40 hover:text-white";
/** Lightweight CSS glow — replaces always-on ElectricBorder canvas */
const ctaPrimaryGlow =
  "inline-flex items-center bg-fuchsia-500 px-5 py-3 font-mono text-[10px] tracking-wider text-white uppercase shadow-[0_0_0_1px_rgba(232,121,249,0.35),0_0_24px_rgba(199,85,247,0.35)] transition-[box-shadow,background-color] hover:bg-fuchsia-400 hover:shadow-[0_0_0_1px_rgba(232,121,249,0.55),0_0_32px_rgba(199,85,247,0.5)]";

export default function ProfessionalPage() {
  return (
    <ClickSpark
      sparkColor="#e879f9"
      sparkCount={6}
      sparkRadius={16}
      sparkSize={8}
      duration={320}
      className="!h-auto min-h-dvh w-full"
    >
      <div className="professional-page relative min-h-dvh bg-transparent text-[#efeaf6]">
        <PersistedShipCursor />
        <ProfessionalAtmosphere />
        {/* Static CSS grain — no animated Noise canvas */}
        <div
          className="professional-grain pointer-events-none fixed inset-0 z-[25] opacity-[0.04] mix-blend-overlay"
          aria-hidden
        />

        <header className="sticky top-0 z-40 border-b border-white/5 bg-[#08060c]/75 backdrop-blur-md">
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
                <span
                  className="h-1.5 w-1.5 rounded-full bg-emerald-400"
                  aria-hidden
                />
                {profile.availability}
              </span>
              <span className="font-mono text-[9px] tracking-wider text-white/40 uppercase">
                {profile.location}
              </span>
            </div>

            <div className="grid gap-10 lg:grid-cols-[1.4fr_0.8fr] lg:items-end">
              <div>
                <SectionLabel>01 — Introduction</SectionLabel>
                <h1 className="mt-4 font-display text-4xl leading-[1.05] font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-[4.25rem]">
                  <GradientText
                    className="!inline !justify-start text-left"
                    colors={["#f5d0fe", "#e879f9", "#c755f7", "#a78bfa"]}
                    animationSpeed={8}
                    direction="horizontal"
                  >
                    {profile.name}
                  </GradientText>
                </h1>
                <p className="mt-4 font-display text-lg text-fuchsia-200/90 sm:text-xl">
                  <DecryptedText
                    text={profile.role}
                    animateOn="view"
                    sequential
                    speed={28}
                    characters="ABCDEFGHIJKLMNOPQRSTUVWXYZ "
                    className="text-fuchsia-200"
                    encryptedClassName="text-fuchsia-700/80"
                  />
                </p>
                <p className="mt-6 max-w-xl text-base leading-relaxed text-white/60 sm:text-lg">
                  {profile.tagline}
                </p>
                <div className="mt-8 flex flex-wrap gap-3">
                  <a href="#projects" className={ctaPrimary}>
                    View projects
                  </a>
                  <a href="#contact" className={ctaGhost}>
                    Contact
                  </a>
                </div>
              </div>

              <HeroProfileCard />
            </div>
          </section>

          {/* 02 About */}
          <section id="about" className="border-t border-white/5">
            <div className="mx-auto grid max-w-6xl gap-12 px-4 py-20 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16 lg:px-8 lg:py-28">
              <div>
                <SectionLabel>02 — About</SectionLabel>
                <BlurText
                  text="Building modern web apps — from interface to API."
                  delay={80}
                  animateBy="words"
                  direction="top"
                  className="mt-4 font-display text-3xl font-semibold tracking-tight text-white sm:text-4xl"
                />
              </div>
              <div className="flex flex-col gap-10">
                <p className="text-base leading-relaxed text-white/65 sm:text-lg">
                  {profile.about}
                </p>
                <dl className="grid grid-cols-3 gap-4 border-t border-white/10 pt-8">
                  <div>
                    <dt className="font-display text-2xl font-bold text-white sm:text-3xl">
                      <CountUp to={4} duration={1.4} className="text-white" />
                    </dt>
                    <dd className="mt-1 font-mono text-[9px] leading-snug tracking-wider text-white/40 uppercase">
                      Selected projects
                    </dd>
                  </div>
                  <div>
                    <dt className="font-display text-2xl font-bold text-white sm:text-3xl">
                      <CountUp to={4} duration={1.6} className="text-white" />
                      <span> yrs</span>
                    </dt>
                    <dd className="mt-1 font-mono text-[9px] leading-snug tracking-wider text-white/40 uppercase">
                      Material control ops
                    </dd>
                  </div>
                  <div>
                    <dt className="font-display text-2xl font-bold text-white sm:text-3xl">
                      <DecryptedText
                        text="H8"
                        animateOn="view"
                        sequential
                        speed={40}
                        characters="0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ"
                        className="text-white"
                        encryptedClassName="text-fuchsia-600/70"
                      />
                    </dt>
                    <dd className="mt-1 font-mono text-[9px] leading-snug tracking-wider text-white/40 uppercase">
                      Hacktiv8 graduate
                    </dd>
                  </div>
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

          {/* 04 Projects — ScrollStack stage */}
          <section id="projects" className="border-t border-white/5 pb-20 lg:pb-28">
            <ProjectShowcase />
          </section>

          {/* 05 Experience */}
          <ExperienceSection />

          <EducationSection />

          {/* 07 Certificates */}
          <section id="certificates" className="border-t border-white/5">
            <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
              <SectionLabel>07 — Certificates</SectionLabel>
              <h2 className="mt-4 font-display text-3xl font-semibold tracking-tight text-white sm:text-4xl">
                <DecryptedText
                  text="Proof of progress."
                  animateOn="view"
                  sequential
                  speed={32}
                  characters="ABCDEFGHIJKLMNOPQRSTUVWXYZ. "
                  className="text-white"
                  encryptedClassName="text-fuchsia-700/70"
                />
              </h2>
              <ul className="mt-12 grid gap-5 sm:grid-cols-2">
                {certificates.map((cert) => (
                  <li key={cert.id}>
                    <SpotlightCard
                      className="h-full !rounded-xl !border-white/10 !bg-[#121018] !p-0"
                      spotlightColor="rgba(199, 85, 247, 0.22)"
                    >
                      <article className="relative z-[1] flex h-full flex-col p-5">
                        <div className="flex items-start justify-between gap-3">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src="/logos/hackerrank.png"
                            alt="HackerRank"
                            width={140}
                            height={28}
                            className="h-5 w-auto max-w-[9rem] object-contain object-left sm:h-6"
                          />
                          <time className="shrink-0 font-mono text-[9px] tracking-wider text-white/40 uppercase">
                            {cert.date}
                          </time>
                        </div>
                        <p className="mt-5 font-display text-lg font-semibold tracking-tight text-white">
                          {cert.title}
                        </p>
                        <div className="mt-auto flex justify-end pt-5">
                          <a
                            href={cert.href}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center justify-center gap-1.5 border border-fuchsia-400/35 bg-fuchsia-500/15 px-3 py-2 font-mono text-[9px] tracking-wider text-fuchsia-100 uppercase transition-colors hover:border-fuchsia-400/60 hover:bg-fuchsia-500/25 hover:text-white"
                          >
                            View certificate
                            <span aria-hidden>↗</span>
                          </a>
                        </div>
                      </article>
                    </SpotlightCard>
                  </li>
                ))}
              </ul>
            </div>
          </section>

          {/* 08 Contact */}
          <section id="contact" className="border-t border-white/5">
            <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
              <SectionLabel>08 — Contact</SectionLabel>
              <h2 className="mt-4 max-w-xl font-display text-3xl font-semibold tracking-tight sm:text-4xl">
                <GradientText
                  className="!inline !justify-start text-left"
                  colors={["#f5d0fe", "#e879f9", "#c755f7", "#a78bfa"]}
                  animationSpeed={6}
                >
                  Have something in mind?
                </GradientText>
              </h2>
              <p className="mt-4 max-w-lg text-base leading-relaxed text-white/60">
                I&apos;m open to fullstack opportunities, collaborations, and
                thoughtful product ideas. Feel free to reach out.
              </p>

              <div className="mt-12 space-y-6">
                <ContactForm />

                <div className="rounded-xl border border-white/10 bg-[#121018] p-5 sm:p-6">
                  <p className="font-mono text-[9px] tracking-wider text-fuchsia-300/75 uppercase">
                    Other channels
                  </p>
                  <div className="mt-5 flex flex-wrap gap-3">
                    <a
                      href={profile.whatsapp}
                      target="_blank"
                      rel="noreferrer"
                      className={ctaPrimaryGlow}
                    >
                      WhatsApp
                    </a>
                    <a
                      href={profile.instagram}
                      target="_blank"
                      rel="noreferrer"
                      className={ctaGhost}
                    >
                      Instagram
                    </a>
                    <a
                      href={profile.linkedin}
                      target="_blank"
                      rel="noreferrer"
                      className={ctaGhost}
                    >
                      LinkedIn
                    </a>
                    <a
                      href={profile.github}
                      target="_blank"
                      rel="noreferrer"
                      className={ctaGhost}
                    >
                      GitHub
                    </a>
                  </div>
                  <p className="mt-6 font-mono text-[10px] text-white/35">
                    {profile.email} · {profile.phone} · {profile.location}
                  </p>
                </div>
              </div>
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
    </ClickSpark>
  );
}
