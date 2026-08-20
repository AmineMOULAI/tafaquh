'use client';

import { useEffect, useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import IzkurCounter from '@/components/izkur/IzkurCounter';
import DhikrSelector from '@/components/izkur/DhikrSelector';
import TargetPresets from '@/components/izkur/TargetPresets';
import VoiceEngine from '@/components/izkur/VoiceEngine';
import StatsDashboard from '@/components/izkur/StatsDashboard';
import { DHIKR_PHRASES, DhikrPhraseId } from '@/utils/arabicSpeech';
import { useApp } from '@/context/AppContext';

interface IzkurClientViewProps {
  lng: string;
}

export default function IzkurClientView({ lng }: IzkurClientViewProps) {
  const { theme, navLayout } = useApp();
  const [selectedPhraseId, setSelectedPhraseId] = useState<DhikrPhraseId>('subhanallah');
  const [counts, setCounts] = useState<Record<DhikrPhraseId, number>>({
    subhanallah: 0,
    alhamdulillah: 0,
    allahuakbar: 0,
    lailahaillallah: 0,
    astaghfirullah: 0,
  });
  const [targetGoal, setTargetGoal] = useState<number>(33);
  const [isListening, setIsListening] = useState<boolean>(false);

  const [totalToday, setTotalToday] = useState<number>(0);
  const [streakDays, setStreakDays] = useState<number>(1);

  // Load persistence
  useEffect(() => {
    if (typeof window === 'undefined') return;
    try {
      const savedCounts = localStorage.getItem('izkur_phrase_counts');
      if (savedCounts) {
        setCounts(JSON.parse(savedCounts));
      }
      const savedTotal = localStorage.getItem('izkur_total_today');
      if (savedTotal) {
        setTotalToday(parseInt(savedTotal, 10));
      }
    } catch (e) {
      console.warn('LocalStorage loading error:', e);
    }
  }, []);

  // Save persistence
  const saveStats = (newCounts: Record<DhikrPhraseId, number>, newTotal: number) => {
    if (typeof window === 'undefined') return;
    try {
      localStorage.setItem('izkur_phrase_counts', JSON.stringify(newCounts));
      localStorage.setItem('izkur_total_today', newTotal.toString());
    } catch (e) {
      console.warn('LocalStorage saving error:', e);
    }
  };

  const handleIncrement = (amount = 1, overridePhraseId?: DhikrPhraseId) => {
    const targetId = overridePhraseId || selectedPhraseId;

    setCounts((prevCounts) => {
      const currentVal = prevCounts[targetId] || 0;
      const newVal = currentVal + amount;
      const updatedCounts = { ...prevCounts, [targetId]: newVal };

      setTotalToday((prevTotal) => {
        const newTotal = prevTotal + amount;
        saveStats(updatedCounts, newTotal);
        return newTotal;
      });

      return updatedCounts;
    });

    if (typeof window !== 'undefined' && window.navigator && window.navigator.vibrate) {
      window.navigator.vibrate(40);
    }
  };

  const handleResetCurrent = () => {
    setCounts((prevCounts) => {
      const updatedCounts = { ...prevCounts, [selectedPhraseId]: 0 };
      saveStats(updatedCounts, totalToday);
      return updatedCounts;
    });
  };

  const handleRecognizedMatch = (matchedPhraseId: DhikrPhraseId, amount: number) => {
    // STRICT MODE: Only increment if matched phrase matches currently selected phrase
    if (matchedPhraseId === selectedPhraseId) {
      handleIncrement(amount, matchedPhraseId);
    }
  };

  const currentCount = counts[selectedPhraseId] || 0;
  const isCompleted = currentCount >= targetGoal;
  const isAr = lng === 'ar';
  const isSidebar = navLayout === 'sidebar';

  // Language Texts
  const titleText = isAr ? 'اذْكُرْ' : 'Izkur (اذْكُرْ)';
  const subtitleText = isAr
    ? 'العداد الصوتي الرقمي للذكـر والتسبيح المدمج في منصة تفقه'
    : lng === 'fr'
    ? 'Compagnon vocal numérique pour le Dhikr & le Tasbih dans l\'écosystème Tafaqquh'
    : 'Voice-activated digital Dhikr & Tasbih companion integrated in Tafaqquh';

  const sloganText = isAr
    ? 'أصالة • تجديد • أثر'
    : lng === 'fr'
    ? 'Authenticité • Innovation • Impact'
    : 'Authenticity • Innovation • Impact';

  const botTitle = isAr
    ? 'بوت الذكر الجماعي على تيليجرام'
    : lng === 'fr'
    ? 'Bot Telegram de Dhikr Collectif'
    : 'Group Dhikr Telegram Bot';

  const botDesc = isAr
    ? 'احسب ذكرك عبر الرسائل الصوتية في مجموعة @center_tafaqquh'
    : lng === 'fr'
    ? 'Comptabilisez votre Dhikr via notes vocales dans le groupe @center_tafaqquh'
    : 'Track your Dhikr via voice notes in @center_tafaqquh group';

  const botBtn = isAr ? 'فتح البوت' : lng === 'fr' ? 'Ouvrir le Bot' : 'Open Bot';

  return (
    <div
      className={`min-h-screen flex flex-col justify-between selection:bg-[#D4AF37] selection:text-[#0A0D0B] transition-all duration-300 ${
        theme === 'light' ? 'bg-[#FAF8F5] text-[#123326]' : 'bg-[#0A0D0B] text-[#FDFBF7]'
      } ${isSidebar ? (isAr ? 'lg:pr-72' : 'lg:pl-72') : ''}`}
    >
      <Header lng={lng} />

      <main className="container mx-auto px-4 py-28 flex flex-col items-center max-w-3xl flex-1">
        {/* Header Branding Banner */}
        <div className="text-center mb-6">
          <div className="inline-block px-4 py-1 rounded-full border border-[#D4AF37]/40 bg-[#0B3B2C]/40 backdrop-blur-md mb-3">
            <span className="text-xs font-calligraphy text-[#D4AF37] tracking-widest">
              {sloganText}
            </span>
          </div>
          <h1 className="font-calligraphy text-4xl md:text-6xl text-[#D4AF37] font-bold tracking-tight mb-2 drop-shadow-md">
            {titleText}
          </h1>
          <p
            className={`font-amiri text-lg max-w-md mx-auto ${
              theme === 'light' ? 'text-[#2D5A46]' : 'text-emerald-100/80'
            }`}
          >
            {subtitleText}
          </p>
        </div>

        {/* Phrase Selector */}
        <DhikrSelector
          selectedPhraseId={selectedPhraseId}
          onSelectPhrase={(id) => {
            setSelectedPhraseId(id);
            setTargetGoal(DHIRK_GOAL_MAP(id));
          }}
        />

        {/* Target Goal Presets */}
        <TargetPresets
          currentTargetGoal={targetGoal}
          onSelectGoal={(g) => setTargetGoal(g)}
        />

        {/* Main Counter Display */}
        <IzkurCounter
          currentPhraseId={selectedPhraseId}
          count={currentCount}
          targetGoal={targetGoal}
          isListening={isListening}
          onIncrement={() => handleIncrement(1)}
          onReset={handleResetCurrent}
          isCompleted={isCompleted}
        />

        {/* Voice Engine Controls */}
        <VoiceEngine
          lng={lng}
          activePhraseId={selectedPhraseId}
          isListening={isListening}
          onToggleListening={(state) => setIsListening(state !== undefined ? state : !isListening)}
          onRecognizedMatch={handleRecognizedMatch}
        />

        {/* Stats Dashboard */}
        <StatsDashboard
          totalToday={totalToday}
          streakDays={streakDays}
          phraseCounts={counts}
        />

        {/* Telegram Bot Callout Banner */}
        <div className="w-full max-w-md mt-6 p-4 rounded-2xl bg-gradient-to-r from-[#0B3B2C] to-[#1F4D36] border border-[#D4AF37]/40 flex items-center justify-between text-right shadow-xl">
          <div>
            <h4 className="font-calligraphy text-[#D4AF37] text-sm font-bold">
              {botTitle}
            </h4>
            <p className="font-amiri text-xs text-emerald-100/80 mt-0.5">
              {botDesc}
            </p>
          </div>
          <a
            href="https://t.me/izkur_tafaqquh_bot"
            target="_blank"
            rel="noopener noreferrer"
            className="px-3 py-1.5 rounded-lg bg-[#D4AF37] text-[#0A0D0B] font-bold text-xs hover:bg-[#F9E498] transition-colors"
          >
            {botBtn}
          </a>
        </div>
      </main>

      <Footer lng={lng} />
    </div>
  );
}

function DHIRK_GOAL_MAP(id: DhikrPhraseId) {
  return DHIKR_PHRASES[id]?.defaultGoal || 33;
}
