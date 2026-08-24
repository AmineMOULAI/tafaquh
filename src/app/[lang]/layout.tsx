import { languages } from "@/i18n/settings";
import { AppProvider } from "@/context/AppContext";
import { GlobalAudioProvider } from "@/context/GlobalAudioContext";
import Sidebar from "@/components/Sidebar";
import GlobalFloatingAudioPlayer from "@/components/jalsa/GlobalFloatingAudioPlayer";

export async function generateStaticParams() {
  return languages.map((lng) => ({ lang: lng }));
}

export default async function Layout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }> | { lang: string };
}) {
  const resolvedParams = await params;
  const lng = resolvedParams.lang;

  return (
    <AppProvider>
      <GlobalAudioProvider>
        <Sidebar lng={lng} />
        {children}
        <GlobalFloatingAudioPlayer lng={lng} />
      </GlobalAudioProvider>
    </AppProvider>
  );
}
