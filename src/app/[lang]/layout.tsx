import { languages } from "@/i18n/settings";

export async function generateStaticParams() {
  return languages.map((lng) => ({ lang: lng }));
}

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
