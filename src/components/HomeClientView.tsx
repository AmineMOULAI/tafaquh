'use client';

import React from 'react';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Axes from '@/components/Axes';
import JalsaSection from '@/components/JalsaSection';
import ContactForm from '@/components/ContactForm';
import Footer from '@/components/Footer';
import LoadingAnimation from '@/components/LoadingAnimation';
import { useApp } from '@/context/AppContext';

export default function HomeClientView({ lng }: { lng: string }) {
  const { theme, navLayout } = useApp();
  const isAr = lng === 'ar';
  const isSidebar = navLayout === 'sidebar';

  return (
    <div
      className={`min-h-screen transition-all duration-300 ${
        theme === 'light' ? 'bg-[#FAF8F5] text-[#123326]' : 'bg-[#0A0D0B] text-[#FDFBF7]'
      } ${isSidebar ? (isAr ? 'lg:pr-72' : 'lg:pl-72') : ''}`}
    >
      <LoadingAnimation lng={lng} />
      <Header lng={lng} />
      <Hero lng={lng} />
      <About lng={lng} />
      <Axes lng={lng} />
      <JalsaSection lng={lng} />
      <ContactForm lng={lng} />
      <Footer lng={lng} />
    </div>
  );
}
