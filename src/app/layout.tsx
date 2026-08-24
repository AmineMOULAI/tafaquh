import "@/styles/globals.css";
import { Metadata } from "next";
import {
  Noto_Kufi_Arabic,
  IBM_Plex_Sans_Arabic,
  Amiri,
  Aref_Ruqaa,
  EB_Garamond,
} from 'next/font/google';
import LanguageHandler from "@/components/LanguageHandler";

const titleFont = Noto_Kufi_Arabic({
  weight: ['400', '600', '700', '800'],
  subsets: ['arabic'],
  variable: '--font-title',
  display: 'swap',
});

const subtitleFont = IBM_Plex_Sans_Arabic({
  weight: ['400', '500', '600', '700'],
  subsets: ['arabic'],
  variable: '--font-subtitle',
  display: 'swap',
});

const essayFont = Amiri({
  weight: ['400', '700'],
  subsets: ['arabic', 'latin'],
  variable: '--font-essay',
  display: 'swap',
});

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

export const metadata: Metadata = {
  title: "تَفَقَّهْ — منصة التأصيل والوعي الإسلامي المعاصر",
  description: "نحو فهم أعمق للعلوم الشرعية والفكر الإسلامي الرصين، مع حلقات المدارسة وتطبيقات القرآن والذكر.",
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
      className={`${titleFont.variable} ${subtitleFont.variable} ${essayFont.variable} ${calligraphyFont.variable} ${garamondFont.variable}`}
    >
      <body className="antialiased font-subtitle selection:bg-gold/30 selection:text-gold">
        <LanguageHandler />
        {children}
      </body>
    </html>
  );
}
