import { notFound } from 'next/navigation';
import JalsaProjectClientView from '@/components/jalsa/JalsaProjectClientView';
import { getProjectBySlug, JALSA_PROJECTS } from '@/data/jalsaData';
import { languages } from '@/i18n/settings';

export async function generateStaticParams() {
  const params: { lang: string; project: string }[] = [];
  for (const lang of languages) {
    for (const p of JALSA_PROJECTS) {
      params.push({ lang, project: p.slug });
    }
  }
  return params;
}

export default async function JalsaProjectPage({
  params,
}: {
  params: Promise<{ lang: string; project: string }>;
}) {
  const { lang, project: projectSlug } = await params;
  const project = getProjectBySlug(projectSlug);

  if (!project) {
    notFound();
  }

  return <JalsaProjectClientView lng={lang} project={project} />;
}
