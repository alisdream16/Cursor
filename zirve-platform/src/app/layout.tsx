import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";

const geist = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "ZİRVE | İşletmenizi Zirveye Taşıyın",
  description:
    "Türkiye'nin en kapsamlı pazarlama ve satış platformu. CRM, Funnel, Otomasyon, Yapay Zeka Ajanları ve daha fazlası — tek bir platformda.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="tr">
      <body
        className={`${geist.variable} antialiased`}
        style={{ background: "#030712", color: "#fff", fontFamily: "var(--font-geist-sans), system-ui, sans-serif" }}
      >
        {children}
      </body>
    </html>
  );
}
