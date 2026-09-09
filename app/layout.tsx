import type { Metadata } from "next";
import { Silkscreen, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const silkscreen = Silkscreen({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--font-silkscreen",
  display: "swap",
});

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
  display: "swap",
});

export const metadata: Metadata = {
  title: "A Space for the Unbound — Showcase",
  description: "Dua remaja, satu kota kecil, dan kekuatan yang bisa menembus ingatan.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <body
        className={`${silkscreen.variable} ${plusJakartaSans.variable} font-body bg-bg-primary text-text-main antialiased selection:bg-brand-primary selection:text-bg-primary`}
      >
        {children}
      </body>
    </html>
  );
}
