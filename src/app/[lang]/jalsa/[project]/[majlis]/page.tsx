import { notFound } from 'next/navigation';
import JalsaMajlisClientView from '@/components/jalsa/JalsaMajlisClientView';
import { getMajlisBySlug, JALSA_PROJECTS } from '@/data/jalsaData';
import { languages } from '@/i18n/settings';

export async function generateStaticParams() {
  const params: { lang: string; project: string; majlis: string }[] = [];
  for (const lang of languages) {
    for (const p of JALSA_PROJECTS) {
      for (const m of p.majalis) {
        params.push({ lang, project: p.slug, majlis: m.slug });
      }
    }
  }
  return params;
}

export default async function JalsaMajlisPage({
  params,
}: {
  params: Promise<{ lang: string; project: string; majlis: string }>;
}) {
  const { lang, project: projectSlug, majlis: majlisSlug } = await params;
  const { project, majlis } = getMajlisBySlug(projectSlug, majlisSlug);

  if (!project || !majlis) {
    notFound();
  }

  return <JalsaMajlisClientView lng={lang} project={project} majlis={majlis} />;
}
