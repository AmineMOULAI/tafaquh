import KhatmahClientView from "@/components/khatmah/KhatmahClientView";
import { languages } from "@/i18n/settings";

export async function generateStaticParams() {
  return languages.map((lng) => ({ lang: lng }));
}

export default async function KhatmahPage({
  params,
}: {
  params: Promise<{ lang: string }> | { lang: string };
}) {
  const resolvedParams = await params;
  const lng = resolvedParams.lang;

  return <KhatmahClientView lng={lng} />;
}
