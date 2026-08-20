'use client';

import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import MajlisViewer from './MajlisViewer';
import { MajlisSession, JalsaProject } from '@/data/jalsaData';

interface JalsaMajlisClientViewProps {
  lng: string;
  project: JalsaProject;
  majlis: MajlisSession;
}

export default function JalsaMajlisClientView({ lng, project, majlis }: JalsaMajlisClientViewProps) {
  return (
    <div className="min-h-screen bg-[#0A0D0B] text-[#FDFBF7] flex flex-col justify-between selection:bg-gold selection:text-primary">
      <Header lng={lng} />

      <main className="container mx-auto px-4 pt-32 pb-24 max-w-5xl flex-1">
        <MajlisViewer lng={lng} project={project} majlis={majlis} />
      </main>

      <Footer lng={lng} />
    </div>
  );
}
