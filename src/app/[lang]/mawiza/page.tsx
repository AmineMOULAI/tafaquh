import MawizaClientView from "@/components/mawiza/MawizaClientView";
import { languages } from "@/i18n/settings";

export async function generateStaticParams() {
  return languages.map((lng) => ({ lang: lng }));
}

export default async function MawizaPage({
  params,
}: {
  params: Promise<{ lang: string }> | { lang: string };
}) {
  const resolvedParams = await params;
  const lng = resolvedParams.lang;

  return <MawizaClientView lng={lng} />;
}
