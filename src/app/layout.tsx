import "@/styles/globals.css";
import { Metadata } from "next";
import { Reem_Kufi, Noto_Naskh_Arabic, Aref_Ruqaa, Amiri, EB_Garamond } from 'next/font/google'
import LanguageHandler from "@/components/LanguageHandler";

const displayFont = Reem_Kufi({ weight: ['400', '700'], subsets: ['arabic'], variable: '--font-display' })
const bodyFont = Noto_Naskh_Arabic({ weight: ['400', '700'], subsets: ['arabic'], variable: '--font-body' })
const calligraphyFont = Aref_Ruqaa({ weight: ['400', '700'], subsets: ['arabic'], variable: '--font-calligraphy' })
const amiriFont = Amiri({ weight: ['400', '700'], subsets: ['arabic', 'latin'], variable: '--font-amiri' })
const garamondFont = EB_Garamond({ weight: ['400', '500', '600', '700'], subsets: ['latin'], variable: '--font-garamond' })

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
    <html className={`${displayFont.variable} ${bodyFont.variable} ${calligraphyFont.variable} ${amiriFont.variable} ${garamondFont.variable}`}>
      <body className="antialiased font-body">
        <LanguageHandler />
        {children}
      </body>
    </html>
  );
}
