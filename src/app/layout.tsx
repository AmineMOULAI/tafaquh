import "@/styles/globals.css";
import { Metadata } from "next";
import {
  Tajawal,
  Noto_Naskh_Arabic,
  Amiri_Quran,
  Aref_Ruqaa,
  EB_Garamond,
  Dancing_Script,
} from 'next/font/google';
import LanguageHandler from "@/components/LanguageHandler";

// 1. Tajawal (Medium / Bold) - Titres, navigation, boutons, cartes et UI
const tajawalFont = Tajawal({
  weight: ['500', '700'],
  subsets: ['arabic', 'latin'],
  variable: '--font-tajawal',
  display: 'swap',
});

// 2. Noto Naskh Arabic (Regular / Medium / Bold) - Corps de texte principal, articles, descriptions (Défaut global)
const notoNaskhFont = Noto_Naskh_Arabic({
  weight: ['400', '500', '700'],
  subsets: ['arabic'],
  variable: '--font-noto-naskh',
  display: 'swap',
});

// 3. Amiri Quran (Regular) - Citations du Coran, Hadiths et textes juridiques classiques (fiqh)
const amiriQuranFont = Amiri_Quran({
  weight: ['400'],
  subsets: ['arabic'],
  variable: '--font-amiri-quran',
  display: 'swap',
});

// Polices secondaires d'ornement / latin
const calligraphyFont = Aref_Ruqaa({
  weight: ['400', '700'],
  subsets: ['arabic'],
  variable: '--font-calligraphy',
  display: 'swap',
});
const garamondFont = EB_Garamond({
  weight: ['400', '500', '600', '700'],
  subsets: ['latin'],
  variable: '--font-garamond',
  display: 'swap',
});
const handwritingFont = Dancing_Script({
  weight: ['400', '700'],
  subsets: ['latin'],
  variable: '--font-handwriting',
  display: 'swap',
});

export const metadata: Metadata = {
  title: "TAFAQUH",
  description: "Towards a deeper understanding of knowledge and faith",
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/images/logo-tafaquh.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [
      { url: "/images/logo-tafaquh.png", sizes: "180x180", type: "image/png" },
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      className={`${notoNaskhFont.variable} ${tajawalFont.variable} ${amiriQuranFont.variable} ${calligraphyFont.variable} ${garamondFont.variable} ${handwritingFont.variable}`}
    >
      <body className="antialiased font-body">
        <LanguageHandler />
        {children}
      </body>
    </html>
  );
}
