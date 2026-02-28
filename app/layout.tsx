import type { Metadata } from "next";
import { Space_Grotesk, Space_Mono, Source_Serif_4 } from "next/font/google";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import "./globals.css";

const sourceSerif = Source_Serif_4({
  variable: "--font-source-serif",
  subsets: ["latin"],
  weight: ["400", "600", "700"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const spaceMono = Space_Mono({
  variable: "--font-space-mono",
  subsets: ["latin"],
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  title: "THE AI FEED — Your Ground in the Age of AI",
  description:
    "AI news for humans. We translate the noise into understanding, so you can navigate the age of AI with confidence.",
  openGraph: {
    title: "THE AI FEED",
    description: "Human-first AI literacy. Understand AI, on your terms.",
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
      <body className={`${sourceSerif.variable} ${spaceGrotesk.variable} ${spaceMono.variable}`}>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
