import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Brick Sans - Local Font for titles
const brickSans = localFont({
  src: "../public/fonts/NTBrickSans.ttf",
  variable: "--font-brick-sans",
  display: "swap",
  fallback: ["system-ui", "sans-serif"],
});

export const metadata: Metadata = {
  title: "Vibe-a-thon | Tech Bootcamp Registration",
  description: "Register for Vibe-a-thon, the ultimate tech bootcamp experience. Learn web development, AI/ML, cloud computing, and more in a fun, collaborative environment.",
  keywords: ["bootcamp", "tech", "coding", "hackathon", "web development", "programming", "vibe-a-thon"],
  authors: [{ name: "Vibe-a-thon Team" }],
  icons: {
    icon: "/logo.svg",
    shortcut: "/logo.svg",
    apple: "/logo.svg",
  },
  openGraph: {
    title: "Vibe-a-thon | Tech Bootcamp Registration",
    description: "Join the ultimate coding adventure and level up your skills!",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${brickSans.variable} antialiased font-sans`}
      >
        {children}
      </body>
    </html>
  );
}
