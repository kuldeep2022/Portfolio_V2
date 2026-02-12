import type { Metadata } from "next";
import { Space_Grotesk, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-display",
});

const jetBrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
});

export const metadata: Metadata = {
  title: "Kuldeep Dave | Software Engineer",
  description: "Portfolio of Kuldeep Dave, Software Engineer at Meta. Expert in Full-Stack Development, Cloud Computing, and DevOps.",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "KD Portfolio",
  },
};

export const viewport = {
  themeColor: "#000000",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${spaceGrotesk.variable} ${jetBrainsMono.variable} bg-background text-foreground antialiased`}
      >
        <div className="fx-backdrop" aria-hidden="true">
          <div className="fx-orb fx-orb-1" />
          <div className="fx-orb fx-orb-2" />
          <div className="fx-orb fx-orb-3" />
          <div className="fx-grid" />
          <div className="fx-scanline" />
          <div className="fx-noise" />
        </div>
        {children}
      </body>
    </html>
  );
}
