import type { Metadata } from "next";
import DadPage from "@/components/dad/DadPage";
import { profile } from "@/lib/professional-content";

export const metadata: Metadata = {
  title: `Website Anak Saya — ${profile.name}`,
  description: "Dibuat oleh Bapaknya. Semoga bermanfaat. 🙏🌹",
};

export default function DadRoutePage() {
  return <DadPage />;
}
