import type { Metadata } from "next";
import LazyPage from "@/components/lazy/LazyPage";
import { profile } from "@/lib/professional-content";

export const metadata: Metadata = {
  title: `${profile.name}'s Portofolio (lazy)`,
  description: "under construction. hire me anyway.",
};

export default function LazyRoutePage() {
  return <LazyPage />;
}
