import type { Metadata } from "next";
import { Barlow, Instrument_Serif, Work_Sans } from "next/font/google";
import "./globals.css";

const barlow = Barlow({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--font-barlow",
});

const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-instrument-serif",
  adjustFontFallback: false,
});

const workSans = Work_Sans({
  subsets: ["latin"],
  weight: ["500"],
  variable: "--font-work-sans",
});

export const metadata: Metadata = {
  title: "Aetheris Calculator",
  description: "A professional-grade scientific calculator that merges Skeuomorphic Hardware Design with Antigravity UI.",
};

import { PwaInstallPopup } from "@/components/PwaInstallPopup";
import Script from "next/script";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" rel="stylesheet" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#00e639" />
      </head>
      <body className={`${barlow.variable} ${instrumentSerif.variable} ${workSans.variable} bg-background text-on-surface selection:bg-tertiary selection:text-on-tertiary min-h-screen flex items-center justify-center p-4`}>
        {/* Google Analytics */}
        <Script async src="https://www.googletagmanager.com/gtag/js?id=G-LJ3QJ7YC7Q" strategy="afterInteractive" />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-LJ3QJ7YC7Q');
          `}
        </Script>
        {children}
        <PwaInstallPopup />
        <div className="fixed inset-0 -z-10 bg-[radial-gradient(circle_at_center,_#1e2020_0%,_#0c0f0f_100%)]"></div>
      </body>
    </html>
  );
}
