"use client";

import ProfileCard from "@/components/react-bits/ProfileCard";

export default function HeroProfileCard() {
  return (
    <div className="w-full max-w-[380px] justify-self-start lg:justify-self-end">
      <ProfileCard
        name="F.W Sebayang"
        title="Fullstack Developer"
        handle="fatwa"
        status="Online"
        contactText="Contact Me"
        avatarUrl="/about/portrait.png"
        iconUrl="/about/icon-fatwa.svg"
        showUserInfo
        enableTilt
        enableMobileTilt={false}
        behindGlowEnabled
        behindGlowColor="rgba(199, 85, 247, 0.45)"
        behindGlowSize="55%"
        innerGradient="linear-gradient(160deg, #050208 0%, #12081c 35%, #3b0764 65%, #c755f7 100%)"
        onContactClick={() => {
          document
            .getElementById("contact")
            ?.scrollIntoView({ behavior: "smooth" });
        }}
      />
    </div>
  );
}
