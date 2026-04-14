import "@/styles/globals.css";
import { Reem_Kufi, Noto_Naskh_Arabic, Aref_Ruqaa } from 'next/font/google'
import LanguageHandler from "@/components/LanguageHandler";

const displayFont = Reem_Kufi({ weight: ['400', '700'], subsets: ['arabic'], variable: '--font-display' })
const bodyFont = Noto_Naskh_Arabic({ weight: ['400', '700'], subsets: ['arabic'], variable: '--font-body' })
const calligraphyFont = Aref_Ruqaa({ weight: ['400', '700'], subsets: ['arabic'], variable: '--font-calligraphy' })

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html className={`${displayFont.variable} ${bodyFont.variable} ${calligraphyFont.variable}`}>
      <body className="antialiased font-body">
        <LanguageHandler />
        {children}
      </body>
    </html>
  );
}
