import type { Metadata } from "next";
import IrisTransitionProvider from "@/components/IrisTransition";
import "./globals.css";

export const metadata: Metadata = {
  title: "Welcome to my Portofolio",
  description: "Interactive portfolio — pick a theme and press start.",
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
