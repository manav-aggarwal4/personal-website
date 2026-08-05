import type { Metadata } from "next";
import {
  Instrument_Serif,
  IBM_Plex_Mono,
  Plus_Jakarta_Sans,
  Cinzel,
} from "next/font/google";
import "./globals.css";

const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument-serif",
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
});

const ibmPlexMono = IBM_Plex_Mono({
  variable: "--font-ibm-plex-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
});

const plusJakarta = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
});

const cinzel = Cinzel({
  variable: "--font-cinzel",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  title: "Manav Aggarwal",
  description:
    "EECS student at UC Berkeley. Systems, machine learning, and full-stack engineering.",
  icons: {
    icon: "/favicon.svg",
  },
  keywords: [
    "Manav Aggarwal",
    "UC Berkeley",
    "EECS",
    "Software Engineer",
    "Machine Learning",
    "AI",
  ],
  authors: [{ name: "Manav Aggarwal" }],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${instrumentSerif.variable} ${ibmPlexMono.variable} ${plusJakarta.variable} ${cinzel.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
