'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { MajlisSession, JalsaProject } from '@/data/jalsaData';
import MajlisAudioPlayer from './MajlisAudioPlayer';

interface MajlisViewerProps {
  lng: string;
  project: JalsaProject;
  majlis: MajlisSession;
}

export default function MajlisViewer({ lng, project, majlis }: MajlisViewerProps) {
  const [activeTab, setActiveTab] = useState<'matn' | 'sharh' | 'vocab' | 'fawaid' | 'quiz' | 'reflection'>('matn');
  const [currentSeekTimestamp, setCurrentSeekTimestamp] = useState<number | undefined>(undefined);
  const [quizAnswers, setQuizAnswers] = useState<Record<number, number>>({});
  const [submittedQuiz, setSubmittedQuiz] = useState<boolean>(false);

  const isAr = lng === 'ar';
  const isFr = lng === 'fr';

  const getLocalized = (obj?: { ar: string; en: string; fr: string }) => {
    if (!obj) return '';
    return isAr ? obj.ar : isFr ? obj.fr : obj.en;
  };

  const handleSelectQuizOption = (qIndex: number, oIndex: number) => {
    if (submittedQuiz) return;
    setQuizAnswers((prev) => ({ ...prev, [qIndex]: oIndex }));
  };

  const calculateScore = () => {
    let score = 0;
    majlis.quizQuestions.forEach((q, idx) => {
      if (quizAnswers[idx] === q.correctIndex) {
        score++;
      }
    });
    return score;
  };

  const tabs = [
    { id: 'matn', label: isAr ? '📖 المتن والنص' : isFr ? '📖 Le Texte & Matn' : '📖 Text & Matn' },
    { id: 'sharh', label: isAr ? '💡 الشرح والتفصيل' : isFr ? '💡 Explication Détaillée' : '💡 Detailed Commentary' },
    { id: 'vocab', label: isAr ? '🔍 غريب الألفاظ والبيان' : isFr ? '🔍 Vocabulaire & Éloquence' : '🔍 Vocabulary & Eloquence' },
    { id: 'fawaid', label: isAr ? '💎 الفوائد والفرائد' : isFr ? '💎 Perles & Enseignements' : '💎 Core Lessons' },
    { id: 'quiz', label: isAr ? '✍️ التقييم الذاتي' : isFr ? '✍️ Auto-Évaluation' : '✍️ Self-Quiz' },
    { id: 'reflection', label: isAr ? '🌱 وقفة تدبرية' : isFr ? '🌱 Méditation Spirituelle' : '🌱 Contemplation' },
  ] as const;

  return (
    <div className="w-full max-w-5xl mx-auto space-y-10">
      {/* Breadcrumb Navigation */}
      <nav className="flex flex-wrap items-center gap-2 text-sm text-gold/70 font-amiri pb-2 border-b border-gold/20">
        <Link href={`/${lng}`} className="hover:text-gold transition-colors">
          {isAr ? 'الرئيسية' : isFr ? 'Accueil' : 'Home'}
        </Link>
        <span>/</span>
        <Link href={`/${lng}/jalsa`} className="hover:text-gold transition-colors">
          {isAr ? 'جلسات تفقه (JALSA)' : 'Jalsa (مجالس تفقه)'}
        </Link>
        <span>/</span>
        <Link href={`/${lng}/jalsa/${project.slug}`} className="hover:text-gold transition-colors">
          {getLocalized(project.title)}
        </Link>
        <span>/</span>
        <span className="text-white font-bold">{getLocalized(majlis.title)}</span>
      </nav>

      {/* Session Title Header */}
      <div className="text-center space-y-4">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gold/10 border border-gold/40 text-gold text-xs font-bold uppercase tracking-widest">
          <span>{project.icon}</span>
          <span>{getLocalized(project.title)}</span>
          <span>•</span>
          <span>{isAr ? `المجلس ${majlis.sessionNumber}` : `Session ${majlis.sessionNumber}`}</span>
        </div>

        <h1 className={`text-3xl md:text-5xl lg:text-6xl font-bold text-white tracking-tight ${isAr ? 'font-calligraphy' : 'font-display'}`}>
          {getLocalized(majlis.title)}
        </h1>

        <p className="text-lg md:text-xl text-gold/80 max-w-3xl mx-auto font-amiri leading-relaxed">
          {getLocalized(majlis.subtitle)}
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4 text-xs text-emerald-200/80 pt-2 font-mono">
          <span className="flex items-center gap-1.5 bg-black/40 px-3 py-1.5 rounded-xl border border-white/10">
            ⏳ {majlis.duration}
          </span>
          <span className="flex items-center gap-1.5 bg-black/40 px-3 py-1.5 rounded-xl border border-white/10">
            📚 {getLocalized(project.scholarlySource)}
          </span>
          <span className="flex items-center gap-1.5 bg-black/40 px-3 py-1.5 rounded-xl border border-white/10">
            🎯 {getLocalized(majlis.theme)}
          </span>
        </div>
      </div>

      {/* Embedded Audio Player */}
      <MajlisAudioPlayer
        lng={lng}
        title={getLocalized(majlis.title)}
        subtitle={getLocalized(majlis.subtitle)}
        durationSeconds={majlis.durationSeconds}
        audioUrl={majlis.audioUrl}
        telegramPostUrl={majlis.telegramPostUrl}
        currentTimestamp={currentSeekTimestamp}
      />

      {/* Chapter Jump Shortcuts */}
      {majlis.sharhChapters.length > 0 && (
        <div className="bg-black/30 p-4 rounded-2xl border border-gold/20 flex flex-wrap items-center gap-2">
          <span className="text-xs font-bold text-gold/90 mr-2">
            {isAr ? '⏱️ الانتقال السريع للمحاور:' : '⏱️ Quick Chapter Timestamps:'}
          </span>
          {majlis.sharhChapters.map((ch, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentSeekTimestamp(ch.timestampSeconds || 0)}
              className="px-3 py-1 rounded-xl bg-gold/10 hover:bg-gold hover:text-primary text-gold text-xs font-amiri border border-gold/30 transition-all flex items-center gap-1.5 shadow-sm"
            >
              <span>▶</span>
              <span>{getLocalized(ch.title).split('.')[1] || getLocalized(ch.title)}</span>
            </button>
          ))}
        </div>
      )}

      {/* Interactive Tabs Header */}
      <div className="flex flex-wrap gap-2 border-b border-gold/30 pb-3">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as typeof activeTab)}
            className={`px-4 py-2.5 rounded-2xl font-bold text-sm transition-all relative ${
              activeTab === tab.id
                ? 'bg-gold text-primary shadow-[0_0_20px_rgba(212,175,55,0.4)]'
                : 'text-white/70 hover:text-gold hover:bg-gold/10'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Contents */}
      <div className="min-h-[400px]">
        <AnimatePresence mode="wait">
          {/* TAB 1: MATN */}
          {activeTab === 'matn' && (
            <motion.div
              key="matn"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="space-y-8"
            >
              {/* Islamic Parchment Card for Matn */}
              <div className="p-8 md:p-12 rounded-[36px] bg-gradient-to-b from-[#FDFBF7] to-[#F5EEDB] text-primary border-4 border-gold/60 shadow-2xl relative overflow-hidden">
                <div className="absolute top-4 left-4 w-12 h-12 border-t-2 border-l-2 border-gold" />
                <div className="absolute top-4 right-4 w-12 h-12 border-t-2 border-r-2 border-gold" />
                <div className="absolute bottom-4 left-4 w-12 h-12 border-b-2 border-l-2 border-gold" />
                <div className="absolute bottom-4 right-4 w-12 h-12 border-b-2 border-r-2 border-gold" />

                <div className="text-center space-y-6 relative z-10">
                  <div className="inline-block px-4 py-1 rounded-full bg-primary/10 border border-primary/20 text-xs font-bold text-primary tracking-widest uppercase">
                    {isAr ? 'النص والمتن الأصلي' : 'Original Text'}
                  </div>

                  <p className="font-amiri text-2xl md:text-4xl text-primary font-bold leading-[2.2] text-center whitespace-pre-line tracking-wide drop-shadow-sm select-text">
                    {majlis.matn.arabic}
                  </p>

                  <div className="pt-6 border-t border-primary/20 flex flex-col md:flex-row items-center justify-between gap-4 text-xs font-amiri text-primary/80">
                    <span className="font-bold">
                      {isAr ? 'المصدر والتخريج: ' : 'Source: '}
                      {getLocalized(majlis.matn.source)}
                    </span>
                    {majlis.matn.narrator && (
                      <span>
                        {isAr ? 'الراوي: ' : 'Narrator: '}
                        {getLocalized(majlis.matn.narrator)}
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Translation & Overview */}
              {majlis.matn.translation && (
                <div className="p-6 rounded-3xl bg-black/40 border border-gold/30 text-white/90 font-body leading-relaxed">
                  <h4 className="text-gold font-bold text-sm uppercase tracking-wider mb-2">
                    {isAr ? 'البيان والترجمة' : 'Translation & Context'}
                  </h4>
                  <p className="text-base text-gray-200 leading-relaxed font-amiri">
                    {getLocalized(majlis.matn.translation)}
                  </p>
                </div>
              )}
            </motion.div>
          )}

          {/* TAB 2: SHARH */}
          {activeTab === 'sharh' && (
            <motion.div
              key="sharh"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="space-y-6"
            >
              <div className="flex items-center justify-between pb-2 border-b border-gold/20">
                <h3 className={`text-2xl font-bold text-gold ${isAr ? 'font-calligraphy' : 'font-display'}`}>
                  {isAr ? 'تفصيل الشرح والمسائل المستفادة' : 'Detailed Scholarly Breakdown'}
                </h3>
                <span className="text-xs text-gold/60 font-mono">
                  {majlis.sharhChapters.length} {isAr ? 'محاور' : 'Chapters'}
                </span>
              </div>

              <div className="space-y-6">
                {majlis.sharhChapters.map((ch, idx) => (
                  <div
                    key={idx}
                    className="p-6 md:p-8 rounded-3xl bg-gradient-to-b from-[#0B3B2C]/70 to-[#0A261A]/80 border border-gold/30 shadow-xl space-y-4 hover:border-gold/60 transition-colors"
                  >
                    <div className="flex items-center justify-between">
                      <h4 className={`text-xl md:text-2xl font-bold text-gold ${isAr ? 'font-calligraphy' : 'font-display'}`}>
                        {getLocalized(ch.title)}
                      </h4>
                      {typeof ch.timestampSeconds === 'number' && (
                        <button
                          onClick={() => setCurrentSeekTimestamp(ch.timestampSeconds)}
                          className="px-3 py-1 rounded-xl bg-gold/10 hover:bg-gold hover:text-primary text-gold text-xs font-mono border border-gold/30 transition-all flex items-center gap-1"
                        >
                          <span>▶</span>
                          <span>{Math.floor(ch.timestampSeconds / 60)}:00</span>
                        </button>
                      )}
                    </div>

                    <p className="text-lg text-emerald-100/90 leading-[2] font-amiri whitespace-pre-line text-justify">
                      {getLocalized(ch.content)}
                    </p>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {/* TAB 3: VOCABULARY */}
          {activeTab === 'vocab' && (
            <motion.div
              key="vocab"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="space-y-6"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {majlis.vocabulary.map((v, idx) => (
                  <div
                    key={idx}
                    className="p-6 rounded-3xl bg-[#0B3B2C]/50 border border-gold/30 shadow-xl space-y-3 relative overflow-hidden"
                  >
                    <div className="flex items-center justify-between border-b border-gold/20 pb-3">
                      <span className="text-2xl font-bold text-gold font-amiri">{v.term}</span>
                      <span className="w-8 h-8 rounded-full bg-gold/10 border border-gold/20 flex items-center justify-center text-xs text-gold font-bold">
                        {idx + 1}
                      </span>
                    </div>

                    <p className="text-base text-gray-200 font-amiri leading-relaxed">
                      {getLocalized(v.meaning)}
                    </p>

                    {v.etymology && (
                      <div className="pt-2 text-xs text-gold/70 font-mono flex items-center gap-2">
                        <span>🌱</span>
                        <span>{getLocalized(v.etymology)}</span>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {/* TAB 4: FAWAID */}
          {activeTab === 'fawaid' && (
            <motion.div
              key="fawaid"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="space-y-6"
            >
              {majlis.fawaid.map((f, fIdx) => (
                <div key={fIdx} className="space-y-4">
                  <h3 className={`text-2xl font-bold text-gold ${isAr ? 'font-calligraphy' : 'font-display'}`}>
                    {getLocalized(f.title)}
                  </h3>

                  <div className="grid grid-cols-1 gap-4">
                    {f.points.map((pt, pIdx) => (
                      <div
                        key={pIdx}
                        className="p-5 rounded-2xl bg-black/40 border border-gold/30 flex items-start gap-4 shadow-md"
                      >
                        <div className="w-8 h-8 rounded-xl bg-gold text-primary font-bold flex items-center justify-center flex-shrink-0 text-sm mt-1">
                          {pIdx + 1}
                        </div>
                        <p className="text-lg text-emerald-100/90 font-amiri leading-relaxed">
                          {getLocalized(pt)}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </motion.div>
          )}

          {/* TAB 5: QUIZ */}
          {activeTab === 'quiz' && (
            <motion.div
              key="quiz"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="space-y-8"
            >
              <div className="p-6 rounded-3xl bg-gradient-to-r from-[#0B3B2C] to-[#14532D] border border-gold/40 flex flex-col md:flex-row items-center justify-between gap-4 shadow-xl">
                <div>
                  <h3 className={`text-2xl font-bold text-gold ${isAr ? 'font-calligraphy' : 'font-display'}`}>
                    {isAr ? 'اختبر استيعابك للمجلس' : 'Self-Assessment Quiz'}
                  </h3>
                  <p className="text-xs text-emerald-200/80 font-amiri mt-1">
                    {isAr
                      ? 'أجب عن الأسئلة التالية لتثبيت الفهم ومراجعة المسائل الدقيقة'
                      : 'Answer the following questions to test your comprehension and key rulings'}
                  </p>
                </div>

                {submittedQuiz && (
                  <div className="px-6 py-3 rounded-2xl bg-gold text-primary font-bold text-lg shadow-lg flex items-center gap-2">
                    <span>🏆</span>
                    <span>
                      {calculateScore()} / {majlis.quizQuestions.length}
                    </span>
                  </div>
                )}
              </div>

              <div className="space-y-6">
                {majlis.quizQuestions.map((q, qIdx) => {
                  const selected = quizAnswers[qIdx];
                  const isCorrect = submittedQuiz && selected === q.correctIndex;
                  const isWrong = submittedQuiz && selected !== undefined && selected !== q.correctIndex;

                  return (
                    <div
                      key={qIdx}
                      className={`p-6 rounded-3xl border transition-all ${
                        isCorrect
                          ? 'bg-emerald-950/60 border-emerald-500'
                          : isWrong
                          ? 'bg-red-950/40 border-red-500/60'
                          : 'bg-black/40 border-gold/30'
                      }`}
                    >
                      <h4 className="text-xl font-bold text-white font-amiri mb-4 flex items-center gap-3">
                        <span className="w-7 h-7 rounded-lg bg-gold/20 text-gold flex items-center justify-center text-sm font-mono">
                          {qIdx + 1}
                        </span>
                        <span>{getLocalized(q.question)}</span>
                      </h4>

                      <div className="space-y-2.5">
                        {q.options.map((opt, oIdx) => {
                          const isOptionSelected = selected === oIdx;
                          const isOptionCorrect = submittedQuiz && oIdx === q.correctIndex;

                          return (
                            <button
                              key={oIdx}
                              onClick={() => handleSelectQuizOption(qIdx, oIdx)}
                              className={`w-full p-4 rounded-2xl text-right font-amiri text-base transition-all flex items-center justify-between border ${
                                isOptionCorrect
                                  ? 'bg-emerald-600/30 text-emerald-200 border-emerald-400 font-bold'
                                  : isOptionSelected && !submittedQuiz
                                  ? 'bg-gold text-primary border-gold font-bold'
                                  : isOptionSelected && isWrong
                                  ? 'bg-red-600/30 text-red-200 border-red-400'
                                  : 'bg-white/5 text-gray-200 border-white/10 hover:bg-white/10'
                              }`}
                            >
                              <span>{getLocalized(opt)}</span>
                              {submittedQuiz && isOptionCorrect && <span>✅</span>}
                              {submittedQuiz && isOptionSelected && !isOptionCorrect && <span>❌</span>}
                            </button>
                          );
                        })}
                      </div>

                      {submittedQuiz && (
                        <div className="mt-4 p-4 rounded-2xl bg-black/60 border border-gold/20 text-xs font-amiri text-gold/90 space-y-1">
                          <span className="font-bold text-gold block">
                            {isAr ? '💡 التعليل والتوضيح:' : 'Explanation:'}
                          </span>
                          <p>{getLocalized(q.explanation)}</p>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              <div className="flex justify-center pt-4">
                {!submittedQuiz ? (
                  <button
                    onClick={() => setSubmittedQuiz(true)}
                    className="px-8 py-3.5 rounded-2xl bg-gold text-primary font-bold text-lg hover:bg-gold-light transition-all shadow-[0_0_25px_rgba(212,175,55,0.4)]"
                  >
                    {isAr ? 'اعتماد الإجابات ورؤية النتيجة' : 'Submit & Check Answers'}
                  </button>
                ) : (
                  <button
                    onClick={() => {
                      setSubmittedQuiz(false);
                      setQuizAnswers({});
                    }}
                    className="px-6 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-gold font-bold text-sm border border-gold/30 transition-all"
                  >
                    {isAr ? 'إعادة الاختبار' : 'Retry Quiz'}
                  </button>
                )}
              </div>
            </motion.div>
          )}

          {/* TAB 6: REFLECTION */}
          {activeTab === 'reflection' && (
            <motion.div
              key="reflection"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="space-y-6"
            >
              <div className="p-8 rounded-3xl bg-gradient-to-b from-[#0B3B2C]/80 via-[#0A261A] to-black/80 border-2 border-gold/50 shadow-2xl space-y-6">
                <div className="flex items-center gap-3">
                  <span className="text-3xl">🌱</span>
                  <h3 className={`text-2xl md:text-3xl font-bold text-gold ${isAr ? 'font-calligraphy' : 'font-display'}`}>
                    {isAr ? 'وقفة تدبرية وعملية' : 'Contemplative & Actionable Reflection'}
                  </h3>
                </div>

                <p className="text-xl md:text-2xl text-emerald-100 font-amiri leading-[2.2] italic border-r-4 border-gold pr-6">
                  {getLocalized(majlis.reflectionPrompt)}
                </p>

                {/* Telegram Group Voice Discussion Banner */}
                <div className="p-6 rounded-2xl bg-black/60 border border-gold/30 flex flex-col md:flex-row items-center justify-between gap-6">
                  <div>
                    <h4 className="text-gold font-bold text-base font-amiri">
                      {isAr ? 'شارك تأملاتك الصوتية في تفقه' : 'Share your voice reflection in Tafaqquh'}
                    </h4>
                    <p className="text-xs text-gray-300 font-amiri mt-1">
                      {isAr
                        ? 'انضم لمجموعة تفقه على تيليجرام وشارك خواطرك وأسئلتك مع طلاب العلم'
                        : 'Join the Tafaqquh Telegram group to share questions and voice notes'}
                    </p>
                  </div>
                  <a
                    href="https://t.me/center_tafaquh"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-6 py-3 rounded-xl bg-gold text-primary font-bold text-sm hover:bg-gold-light transition-all flex items-center gap-2 flex-shrink-0 shadow-lg"
                  >
                    <span>🎙️</span>
                    <span>{isAr ? 'فتح مجموعة تيليجرام' : 'Open Telegram Group'}</span>
                  </a>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Telegram Community Bottom Banner */}
      <div className="p-8 rounded-3xl bg-gradient-to-r from-[#0B3B2C] to-[#14532D] border border-gold/40 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-gold/10 border border-gold/40 flex items-center justify-center text-3xl text-gold">
            🕌
          </div>
          <div>
            <h4 className={`text-xl font-bold text-gold ${isAr ? 'font-calligraphy' : 'font-display'}`}>
              {isAr ? 'مجالس تفقه المباشرة والصوتية' : 'Tafaqquh Live Voice Majalis'}
            </h4>
            <p className="text-xs text-emerald-100/80 font-amiri mt-0.5 max-w-lg">
              {isAr
                ? 'تعقد مجالس المدارسة في مجموعة تفقه على تيليجرام مع بث صوتي ونقاشات تفاعلية مستمرة.'
                : 'Study circles are conducted in the Tafaqquh Telegram group with live audio broadcasts and active discussions.'}
            </p>
          </div>
        </div>

        <a
          href="https://t.me/center_tafaquh"
          target="_blank"
          rel="noopener noreferrer"
          className="px-6 py-3.5 rounded-2xl bg-gold text-primary font-bold text-sm hover:scale-105 transition-all shadow-[0_0_20px_rgba(212,175,55,0.5)] flex items-center gap-2 flex-shrink-0"
        >
          <span>💬</span>
          <span>{isAr ? 'انضم إلى @center_tafaquh' : 'Join @center_tafaquh'}</span>
        </a>
      </div>
    </div>
  );
}
