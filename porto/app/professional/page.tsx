import type { Metadata } from "next";
import ProfessionalPage from "@/components/professional/ProfessionalPage";
import { profile } from "@/lib/professional-content";

export const metadata: Metadata = {
  title: `${profile.name} | ${profile.role}`,
  description: profile.tagline,
};

export default function ProfessionalRoutePage() {
  return <ProfessionalPage />;
}
