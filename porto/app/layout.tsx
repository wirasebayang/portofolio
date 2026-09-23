import type { Metadata } from "next";
import IrisTransitionProvider from "@/components/IrisTransition";
import { profile } from "@/lib/professional-content";
import "./globals.css";

const siteUrl = "https://portofolio.majubersamawira.xyz";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: profile.name,
  description: profile.tagline,
  openGraph: {
    title: profile.name,
    description: profile.tagline,
    url: siteUrl,
    siteName: profile.name,
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: profile.name,
    description: profile.tagline,
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className="h-full">
      <body className="min-h-full bg-[#05010a] font-sans text-[#f3e8ff] antialiased">
        <IrisTransitionProvider>{children}</IrisTransitionProvider>
      </body>
    </html>
  );
}
