import IzkurClientView from "@/components/izkur/IzkurClientView";

export default async function IzkurPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  return <IzkurClientView lng={lang} />;
}
