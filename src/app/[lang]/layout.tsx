import type { Metadata } from "next";
import { languages } from "@/i18n/settings";

export async function generateStaticParams() {
  return languages.map((lng) => ({ lang: lng }));
}

export const metadata: Metadata = {
  title: "TAFAQUH",
  description: "Vers une compréhension profonde du savoir et de la religion",
};

export default async function Layout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}>) {
  return (
    <>
      {children}
    </>
  );
}
