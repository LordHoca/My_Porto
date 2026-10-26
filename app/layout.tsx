import type { Metadata, Viewport } from "next";
import { Instrument_Serif, Manrope } from "next/font/google";
import "./globals.css";

const instrument = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-instrument",
  display: "swap",
});

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Fauzan Fadhilah — Portofolio",
  description:
    "Portofolio Fauzan Fadhilah, mahasiswa Informatika yang mengerjakan machine learning, deep learning, dan front-end development.",
  openGraph: {
    title: "Fauzan Fadhilah — Portofolio",
    description:
      "Mahasiswa Informatika: machine learning, deep learning, dan front-end development.",
    type: "website",
    locale: "id_ID",
  },
};

export const viewport: Viewport = {
  themeColor: "#0e1a2b",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id" className={`${instrument.variable} ${manrope.variable}`}>
      <body>{children}</body>
    </html>
  );
}
