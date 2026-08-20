import HomeClientView from "@/components/HomeClientView";

export default async function Page({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  return <HomeClientView lng={lang} />;
}
