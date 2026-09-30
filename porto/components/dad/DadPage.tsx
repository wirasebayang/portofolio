"use client";

import { type CSSProperties, useEffect, useState } from "react";
import { IrisLink } from "@/components/IrisTransition";
import {
  CornerFlowers,
  DadSky,
  DadStyles,
  bigButton,
  comic,
  impact,
  script,
} from "@/components/dad/DadDecor";
import { formatVisitCount } from "@/lib/visitors";
import {
  certificates,
  education,
  experience,
  profile,
  projects,
  technologies,
} from "@/lib/professional-content";

const dadSays: Record<string, string> = {
  shelter:
    "Ini toko online. Ada robot pintarnya yang bisa kasih saran barang, katanya pakai Google. Bisa bayar pakai HP juga. Canggih sekali!!",
  mediflow:
    "Ini aplikasi rumah sakit. Antriannya bisa dilihat dari rumah, jadi tidak perlu nunggu lama. Kemarin Om Darto nanya, saya bilang anak saya yang bikin (bareng temannya).",
  sereporsea:
    "Ini toko jam tangan mahal. Bapak belum sanggup beli jamnya, tapi websitenya bagus sekali. Cepat, tidak lemot.",
  dolan:
    "Ini aplikasi buat jalan-jalan dan cari teman jalan. Bagus buat anak muda. Bapak sama Ibu juga mau coba kalau pensiun nanti.",
};

const card: CSSProperties = {
  background: "#fffbe6",
  border: "6px ridge #d4a017",
  borderRadius: 18,
  padding: "18px 18px 20px",
  boxShadow: "6px 6px 0 #8b0000",
  position: "relative",
};

const sectionTitle: CSSProperties = {
  fontFamily: impact,
  fontSize: "clamp(1.6rem, 5vw, 2.4rem)",
  textAlign: "center",
  margin: "0 0 14px",
  letterSpacing: 1,
  color: "#ffea00",
  WebkitTextStroke: "1.5px #b00000",
  textShadow: "3px 3px 0 #0033cc, 5px 5px 0 #000",
};

const dadVoice: CSSProperties = {
  fontFamily: comic,
  fontSize: 17,
  lineHeight: 1.55,
  color: "#1a1a8c",
  margin: 0,
};

const dadNote: CSSProperties = {
  fontFamily: comic,
  fontSize: 14,
  lineHeight: 1.5,
  color: "#5a3e00",
  background: "#fff59d",
  border: "2px dashed #ff9d00",
  padding: "8px 12px",
  margin: "12px 0 0",
  transform: "rotate(-0.5deg)",
};

/** Satire: the page my dad would make about me. Content stays real. */
export default function DadPage() {
  const topSkills = technologies.slice(0, 18);
  const job = experience[0];
  const [visits, setVisits] = useState("------");

  useEffect(() => {
    let cancelled = false;
    fetch("/api/visitors")
      .then((res) => res.json() as Promise<{ count?: number }>)
      .then((json) => {
        if (!cancelled) setVisits(formatVisitCount(Number(json.count ?? 0)));
      })
      .catch(() => {
        if (!cancelled) setVisits("000127");
      });
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <div className="dad-page min-h-dvh">
      <DadStyles />
      <DadSky />
      <CornerFlowers />

      <div
        style={{
          position: "relative",
          zIndex: 2,
          background: "#ff0000",
          color: "#ffff00",
          fontFamily: comic,
          fontWeight: 700,
          fontSize: 15,
          padding: "6px 0",
          overflow: "hidden",
          borderBottom: "4px solid #ffd700",
        }}
      >
        <div className="dad-marquee">
          Assalamualaikum Bapak Ibu sekalian 🙏 ini website tentang anak saya
          FATWA 🌹 mohon di share ke grup keluarga 🙏🙏 JANGAN LUPA KLIK LIKE 👍
          · Semoga bermanfaat · Salam sehat selalu 🌺&nbsp;&nbsp;&nbsp;&nbsp;
          Assalamualaikum Bapak Ibu sekalian 🙏 ini website tentang anak saya
          FATWA 🌹 mohon di share ke grup keluarga 🙏🙏 JANGAN LUPA KLIK LIKE 👍
          · Semoga bermanfaat · Salam sehat selalu 🌺&nbsp;&nbsp;&nbsp;&nbsp;
        </div>
      </div>

      <main
        style={{
          position: "relative",
          zIndex: 2,
          maxWidth: 860,
          margin: "0 auto",
          padding: "28px 52px 40px",
          display: "flex",
          flexDirection: "column",
          gap: 36,
        }}
      >
        <p
          style={{
            margin: 0,
            fontFamily: comic,
            fontSize: 14,
            display: "flex",
            flexWrap: "wrap",
            gap: 10,
            justifyContent: "space-between",
          }}
        >
          <IrisLink
            href="/"
            className="bg-[#ffff00] px-1.5 py-0.5 text-[#0000cc] underline"
          >
            ← Kembali ke menu awal
          </IrisLink>
          <IrisLink
            href="/professional"
            className="bg-[#ffff00] px-1.5 py-0.5 text-[#0000cc] underline"
          >
            Bapak tidak ngerti istilah komputernya. Versi lengkap buatan Wira
            ada di sini →
          </IrisLink>
        </p>

        <header style={{ textAlign: "center" }}>
          <p
            style={{
              margin: "0 0 6px",
              fontFamily: script,
              fontSize: "clamp(1.4rem, 4vw, 2rem)",
              color: "#8b0000",
              textShadow: "2px 2px 0 #fff",
            }}
          >
            ~ Selamat Datang ~
          </p>
          <h1
            className="dad-rainbow"
            style={{
              margin: 0,
              fontFamily: impact,
              fontSize: "clamp(2.2rem, 8vw, 4.6rem)",
              lineHeight: 1.05,
              letterSpacing: 1,
            }}
          >
            WEBSITE ANAK SAYA
          </h1>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/dad/garland.webp"
            alt=""
            aria-hidden
            width={900}
            height={300}
            className="dad-garland"
          />
          <p
            className="dad-wobble"
            style={{
              margin: "10px 0 0",
              fontFamily: comic,
              fontSize: "clamp(1.1rem, 3vw, 1.5rem)",
              fontWeight: 700,
              color: "#fff",
              background: "#ff00c8",
              border: "3px dashed #ffff00",
              padding: "4px 14px",
            }}
          >
            🌹 {profile.name.toUpperCase()} 🌹
          </p>
          <p
            style={{
              margin: "12px 0 0",
              fontFamily: '"Courier New", monospace',
              fontSize: 14,
              color: "#fff",
              textShadow: "1px 1px 0 #000",
            }}
          >
            Anda pengunjung ke-{" "}
            <span
              style={{
                background: "#000",
                color: "#0f0",
                padding: "2px 6px",
                letterSpacing: 3,
              }}
            >
              {visits}
            </span>
          </p>
        </header>

        <section style={card} aria-labelledby="dad-kenalan">
          <h2 id="dad-kenalan" style={sectionTitle}>
            PERKENALAN
          </h2>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: 20,
              alignItems: "flex-start",
              justifyContent: "center",
            }}
          >
            <figure style={{ margin: 0, textAlign: "center" }}>
              <div
                style={{
                  position: "relative",
                  padding: 10,
                  background:
                    "repeating-linear-gradient(45deg, #ff5fa2 0 10px, #ffd700 10px 20px)",
                  borderRadius: "50% 50% 12px 12px",
                  boxShadow: "0 0 0 4px #8b0000",
                }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/about/portrait.png"
                  alt={profile.name}
                  width={170}
                  height={210}
                  style={{
                    width: 170,
                    height: 210,
                    objectFit: "cover",
                    display: "block",
                    borderRadius: "50% 50% 8px 8px",
                    background: "#fff",
                  }}
                />
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/dad/roses-pink.webp"
                  alt=""
                  aria-hidden
                  className="dad-photo-rose"
                  style={{ width: 96, top: -34, left: -44, transform: "rotate(-18deg)" }}
                />
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/dad/roses-red.webp"
                  alt=""
                  aria-hidden
                  className="dad-photo-rose"
                  style={{ width: 104, bottom: 4, left: -46 }}
                />
              </div>
              <figcaption
                style={{
                  marginTop: 8,
                  fontFamily: script,
                  fontSize: 18,
                  color: "#8b0000",
                }}
              >
                Foto waktu masih ganteng
                <br />
                <span style={{ fontFamily: comic, fontSize: 12 }}>
                  (sekarang juga masih)
                </span>
              </figcaption>
            </figure>

            <div style={{ flex: "1 1 300px", minWidth: 0 }}>
              <p style={dadVoice}>
                Perkenalkan, ini anak saya <b>{profile.name}</b>. Biasa
                dipanggil <b>Wira</b>. Tinggal di <b>{profile.location}</b>.
              </p>
              <p style={{ ...dadVoice, marginTop: 10 }}>
                Sekarang kerjanya bikin aplikasi di komputer, namanya{" "}
                <i style={{ color: "#c00" }}>{profile.role}</i> (Bapak juga
                kurang paham, tapi katanya bagus). Dulu 4 tahun kerja di gudang
                bagian material, sekarang pindah ke komputer.{" "}
                <b>Alhamdulillah.</b> 🙏
              </p>
              <p style={{ ...dadVoice, marginTop: 10 }}>
                Anaknya rajin, sopan, dan tidak merokok. Kalau di rumah suka
                begadang depan laptop, katanya lagi &quot;ngoding&quot;.
              </p>
            </div>
          </div>
        </section>

        <section aria-labelledby="dad-angka">
          <h2 id="dad-angka" style={sectionTitle}>
            PRESTASI ANAK SAYA
          </h2>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
              gap: 16,
            }}
          >
            {[
              { big: projects.length, text: "aplikasi sudah jadi (Bapak hitung sendiri)", bg: "#ff4d4d" },
              { big: "4 THN", text: "kerja di gudang, tidak pernah bolos", bg: "#0077ff" },
              { big: "86", text: "nilai di Hacktiv8, sekolah komputer yang mahal itu", bg: "#9b30ff" },
            ].map((s) => (
              <div
                key={s.text}
                style={{
                  background: s.bg,
                  border: "5px double #ffff00",
                  borderRadius: 14,
                  padding: 16,
                  textAlign: "center",
                  color: "#fff",
                  boxShadow: "4px 4px 0 #000",
                }}
              >
                <div
                  style={{
                    fontFamily: impact,
                    fontSize: 46,
                    lineHeight: 1,
                    color: "#ffff00",
                    textShadow: "3px 3px 0 #000",
                  }}
                >
                  {s.big}
                </div>
                <div style={{ fontFamily: comic, fontSize: 15, marginTop: 6 }}>
                  {s.text}
                </div>
              </div>
            ))}
          </div>
        </section>

        <section aria-labelledby="dad-karya">
          <h2 id="dad-karya" style={sectionTitle}>
            HASIL KARYA ANAK SAYA
          </h2>
          <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
            {projects.map((p, i) => (
              <article
                key={p.id}
                style={{
                  ...card,
                  transform: `rotate(${i % 2 === 0 ? -0.8 : 0.8}deg)`,
                }}
              >
                <span
                  aria-hidden
                  className="dad-blink"
                  style={{
                    position: "absolute",
                    top: -16,
                    right: 14,
                    background: "#ff0000",
                    color: "#ffff00",
                    fontFamily: impact,
                    fontSize: 14,
                    padding: "4px 10px",
                    borderRadius: 999,
                    border: "2px solid #fff",
                  }}
                >
                  BARU!!!
                </span>
                <div
                  style={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: 16,
                    alignItems: "flex-start",
                  }}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={p.coverPath}
                    alt={`${p.title} cover`}
                    width={240}
                    height={150}
                    style={{
                      width: 240,
                      maxWidth: "100%",
                      height: 150,
                      objectFit: "cover",
                      border: "5px solid #fff",
                      outline: "3px solid #ff5fa2",
                      boxShadow: "4px 4px 0 #000",
                    }}
                  />
                  <div style={{ flex: "1 1 260px", minWidth: 0 }}>
                    <h3
                      style={{
                        margin: "0 0 6px",
                        fontFamily: impact,
                        fontSize: 28,
                        color: "#0033cc",
                        textShadow: "2px 2px 0 #ffd700",
                      }}
                    >
                      {i + 1}. {p.title}{" "}
                      <span
                        style={{
                          fontFamily: comic,
                          fontSize: 13,
                          color: "#555",
                          textShadow: "none",
                        }}
                      >
                        ({p.year})
                      </span>
                    </h3>
                    <p style={dadVoice}>&quot;{dadSays[p.id] ?? p.summary}&quot;</p>
                    <p style={{ ...dadVoice, marginTop: 6, fontSize: 13, color: "#8b0000" }}>
                      — Bapaknya Wira
                    </p>
                  </div>
                </div>
                <p style={dadNote}>
                  📝 Katanya pakai: <b>{p.stack.join(", ")}</b>. Bapak catat
                  saja biar tidak lupa.
                </p>
                {p.liveUrl ? (
                  <p style={{ margin: "14px 0 0", textAlign: "center" }}>
                    <a
                      href={p.liveUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="dad-glow"
                      style={bigButton("#ff00c8")}
                    >
                      👉 KLIK DISINI UNTUK LIHAT!!! 👈
                    </a>
                  </p>
                ) : null}
              </article>
            ))}
          </div>
        </section>

        <section style={card} aria-labelledby="dad-bisa">
          <h2 id="dad-bisa" style={sectionTitle}>
            KEAHLIAN
          </h2>
          <p style={{ ...dadVoice, textAlign: "center", marginBottom: 14 }}>
            Anak saya bisa semua ini. Bapak tidak tahu itu apa, tapi
            kedengarannya susah. 👍
          </p>
          <ul
            style={{
              listStyle: "none",
              margin: 0,
              padding: 0,
              display: "flex",
              flexWrap: "wrap",
              gap: 8,
              justifyContent: "center",
            }}
          >
            {topSkills.map((t, i) => (
              <li
                key={t.name}
                style={{
                  fontFamily: comic,
                  fontWeight: 700,
                  fontSize: 14,
                  padding: "6px 12px",
                  borderRadius: 999,
                  color: "#fff",
                  background: ["#ff4d4d", "#ff9d00", "#00b300", "#0077ff", "#9b30ff", "#ff00c8"][i % 6],
                  border: "2px solid #ffd700",
                  textShadow: "1px 1px 0 #000",
                }}
              >
                ⭐ {t.name}
              </li>
            ))}
            <li style={{ fontFamily: comic, fontSize: 14, padding: "6px 12px" }}>
              dan {technologies.length - topSkills.length} lainnya...
            </li>
          </ul>
        </section>

        <section style={card} aria-labelledby="dad-kerja">
          <h2 id="dad-kerja" style={sectionTitle}>
            RIWAYAT KERJA &amp; SEKOLAH
          </h2>
          <p style={dadVoice}>
            🏭 <b>{job.org}</b> ({job.period}) — jadi {job.role}. Pernah bikin
            cara kerja baru yang bikin prosesnya <b>57% lebih cepat</b>.
            Atasannya pasti senang. Bapak juga senang.
          </p>
          <div style={{ marginTop: 16, display: "flex", flexDirection: "column", gap: 10 }}>
            {education.map((ed) => (
              <p key={ed.id} style={dadVoice}>
                🎓 <b>{ed.school}</b> — {ed.program} ({ed.period})
                {ed.current ? " — masih kuliah sambil kerja, hebat kan." : ""}{" "}
                <span style={{ color: "#c00" }}>
                  Nilai: {ed.statValue} {ed.statLabel}
                </span>
              </p>
            ))}
          </div>
        </section>

        <section style={card} aria-labelledby="dad-piagam">
          <h2 id="dad-piagam" style={sectionTitle}>
            PIAGAM PENGHARGAAN
          </h2>
          <p style={{ ...dadVoice, textAlign: "center", marginBottom: 14 }}>
            Ini sertifikat-sertifikatnya. Rencananya mau Bapak laminating terus
            dipajang di ruang tamu.
          </p>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
              gap: 12,
            }}
          >
            {certificates.map((c) => (
              <a
                key={c.id}
                href={c.href}
                target="_blank"
                rel="noreferrer"
                style={{
                  display: "block",
                  textAlign: "center",
                  textDecoration: "none",
                  background: "#fff",
                  border: "8px double #d4a017",
                  padding: "12px 10px",
                  color: "#000",
                  boxShadow: "3px 3px 0 #8b0000",
                }}
              >
                <div style={{ fontSize: 28 }} aria-hidden>
                  🏆
                </div>
                <div style={{ fontFamily: script, fontSize: 20, color: "#8b0000" }}>
                  Piagam
                </div>
                <div style={{ fontFamily: comic, fontSize: 13, fontWeight: 700 }}>
                  {c.title}
                </div>
                <div style={{ fontFamily: comic, fontSize: 12, color: "#555" }}>
                  {c.org} · {c.date}
                </div>
              </a>
            ))}
          </div>
        </section>

        <section
          aria-labelledby="dad-hubungi"
          style={{
            ...card,
            background: "#fff200",
            border: "8px ridge #ff0000",
            textAlign: "center",
          }}
        >
          <h2 id="dad-hubungi" style={sectionTitle}>
            HUBUNGI ANAK SAYA
          </h2>
          <p style={{ ...dadVoice, fontSize: 18 }}>
            Kalau Bapak/Ibu ada <b>lowongan kerja</b>, silakan hubungi anak
            saya. Anaknya sopan, rajin, dan cepat belajar. Bapak jamin. 🙏
          </p>
          <div
            style={{
              marginTop: 18,
              display: "flex",
              flexWrap: "wrap",
              gap: 12,
              justifyContent: "center",
            }}
          >
            <a href={profile.whatsapp} target="_blank" rel="noreferrer" style={bigButton("#25a244")}>
              📱 WHATSAPP
            </a>
            <a href={`mailto:${profile.email}`} style={bigButton("#d93025")}>
              ✉️ EMAIL
            </a>
            <a href={profile.linkedin} target="_blank" rel="noreferrer" style={bigButton("#0a66c2")}>
              💼 LINKEDIN
            </a>
            <a href={profile.github} target="_blank" rel="noreferrer" style={bigButton("#333")}>
              💻 GITHUB
            </a>
          </div>
          <p style={{ ...dadNote, textAlign: "center" }}>
            Email: <b>{profile.email}</b> · HP/WA: <b>{profile.phone}</b>
            <br />
            (ini nomor anak saya, bukan nomor Bapak)
          </p>
        </section>

        <p
          style={{
            margin: 0,
            textAlign: "center",
            fontFamily: script,
            fontSize: "clamp(1.4rem, 4vw, 2rem)",
            color: "#fff",
            textShadow: "2px 2px 0 #8b0000",
          }}
        >
          Bapak bangga sama kamu, Nak. ❤️
        </p>

        <footer
          style={{
            textAlign: "center",
            fontFamily: comic,
            fontSize: 13,
            color: "#fff",
            textShadow: "1px 1px 0 #000",
          }}
        >
          <p style={{ margin: 0 }}>
            Website ini dibuat oleh Bapaknya Wira. Semoga bermanfaat. 🙏🌹
          </p>
          <p style={{ margin: "4px 0 0" }}>
            Copyright © {new Date().getFullYear()}. Dilarang copy paste tanpa
            izin.
          </p>
          <p style={{ margin: "4px 0 0", fontSize: 11, opacity: 0.8 }}>
            (sebenarnya dibuat Wira sendiri)
          </p>
          <p style={{ margin: "12px 0 0" }}>
            <IrisLink
              href="/professional"
              className="bg-[#ffff00] px-1.5 py-0.5 text-[#0000cc] underline"
            >
              Lihat versi serius →
            </IrisLink>
          </p>
        </footer>
      </main>
    </div>
  );
}
