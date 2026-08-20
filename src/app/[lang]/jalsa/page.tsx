import JalsaClientView from '@/components/jalsa/JalsaClientView';
import { languages } from '@/i18n/settings';

export async function generateStaticParams() {
  return languages.map((lang) => ({ lang }));
}

export default async function JalsaPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  return <JalsaClientView lng={lang} />;
}
