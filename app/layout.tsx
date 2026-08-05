import type { Metadata } from "next";
import {
  Cormorant_Garamond,
  EB_Garamond,
  IBM_Plex_Mono,
} from "next/font/google";
import "./globals.css";

/** Display / names — old-style high-contrast serif */
const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
});

/** Body + labels — classic book face */
const ebGaramond = EB_Garamond({
  variable: "--font-eb-garamond",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
});

const ibmPlexMono = IBM_Plex_Mono({
  variable: "--font-ibm-plex-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
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
        className={`${cormorant.variable} ${ebGaramond.variable} ${ibmPlexMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
