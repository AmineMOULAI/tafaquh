"use client";

import { useEffect, useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import IzkurCounter from "@/components/izkur/IzkurCounter";
import DhikrSelector from "@/components/izkur/DhikrSelector";
import TargetPresets from "@/components/izkur/TargetPresets";
import VoiceEngine from "@/components/izkur/VoiceEngine";
import StatsDashboard from "@/components/izkur/StatsDashboard";
import { DHIKR_PHRASES, DhikrPhraseId } from "@/utils/arabicSpeech";

interface IzkurClientViewProps {
  lng: string;
}

export default function IzkurClientView({ lng }: IzkurClientViewProps) {
  const [selectedPhraseId, setSelectedPhraseId] = useState<DhikrPhraseId>("subhanallah");
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
    if (typeof window === "undefined") return;
    try {
      const savedCounts = localStorage.getItem("izkur_phrase_counts");
      if (savedCounts) {
        setCounts(JSON.parse(savedCounts));
      }
      const savedTotal = localStorage.getItem("izkur_total_today");
      if (savedTotal) {
        setTotalToday(parseInt(savedTotal, 10));
      }
    } catch (e) {
      console.warn("LocalStorage loading error:", e);
    }
  }, []);

  // Save persistence
  const saveStats = (newCounts: Record<DhikrPhraseId, number>, newTotal: number) => {
    if (typeof window === "undefined") return;
    try {
      localStorage.setItem("izkur_phrase_counts", JSON.stringify(newCounts));
      localStorage.setItem("izkur_total_today", newTotal.toString());
    } catch (e) {
      console.warn("LocalStorage saving error:", e);
    }
  };

  const handleIncrement = (amount = 1) => {
    const currentVal = counts[selectedPhraseId] || 0;
    const newVal = currentVal + amount;
    const updatedCounts = { ...counts, [selectedPhraseId]: newVal };
    const updatedTotal = totalToday + amount;

    setCounts(updatedCounts);
    setTotalToday(updatedTotal);
    saveStats(updatedCounts, updatedTotal);

    // Audio & Haptic Feedback
    if (typeof window !== "undefined" && window.navigator && window.navigator.vibrate) {
      window.navigator.vibrate(40);
    }
  };

  const handleResetCurrent = () => {
    const updatedCounts = { ...counts, [selectedPhraseId]: 0 };
    setCounts(updatedCounts);
    saveStats(updatedCounts, totalToday);
  };

  const handleRecognizedMatch = (matchedPhraseId: DhikrPhraseId, amount: number) => {
    if (matchedPhraseId !== selectedPhraseId) {
      setSelectedPhraseId(matchedPhraseId);
    }
    handleIncrement(amount);
  };

  const currentCount = counts[selectedPhraseId] || 0;
  const isCompleted = currentCount >= targetGoal;

  return (
    <div className="min-h-screen bg-[#0A0D0B] text-[#FDFBF7] flex flex-col justify-between selection:bg-[#D4AF37] selection:text-[#0A0D0B]">
      <Header lng={lng} />

      <main className="container mx-auto px-4 py-24 flex flex-col items-center max-w-3xl">
        {/* Header Branding Banner */}
        <div className="text-center mb-6">
          <div className="inline-block px-4 py-1 rounded-full border border-[#D4AF37]/40 bg-[#0B3B2C]/40 backdrop-blur-md mb-3">
            <span className="text-xs font-calligraphy text-[#D4AF37] tracking-widest">
              أصالة • تجديد • أثر
            </span>
          </div>
          <h1 className="font-calligraphy text-4xl md:text-6xl text-[#D4AF37] font-bold tracking-tight mb-2 drop-shadow-md">
            اذْكُرْ (Izkur)
          </h1>
          <p className="font-amiri text-lg text-emerald-100/80 max-w-md mx-auto">
            العداد الصوتي الذكي للذكر والتسبيح المدمج في منصة تفقه
          </p>
        </div>

        {/* Phrase Selector */}
        <DhikrSelector
          selectedPhraseId={selectedPhraseId}
          onSelectPhrase={(id) => {
            setSelectedPhraseId(id);
            setTargetGoal(DHIKR_PHRASES[id].defaultGoal);
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
              بوت الذكر الجماعي على تيليجرام
            </h4>
            <p className="font-amiri text-xs text-emerald-100/80 mt-0.5">
              احسب ذكرك عبر الرسائل الصوتية في مجموعة @center_tafaquh
            </p>
          </div>
          <a
            href="https://t.me/izkur_tafaqquh_bot"
            target="_blank"
            rel="noopener noreferrer"
            className="px-3 py-1.5 rounded-lg bg-[#D4AF37] text-[#0A0D0B] font-bold text-xs hover:bg-[#F9E498] transition-colors"
          >
            فتح البوت
          </a>
        </div>
      </main>

      <Footer lng={lng} />
    </div>
  );
}
