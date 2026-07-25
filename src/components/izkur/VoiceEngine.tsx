"use client";

import { useEffect, useRef, useState } from "react";
import { detectDhikrInText, DhikrPhraseId } from "@/utils/arabicSpeech";

interface VoiceEngineProps {
  activePhraseId: DhikrPhraseId;
  isListening: boolean;
  onToggleListening: (state?: boolean) => void;
  onRecognizedMatch: (phraseId: DhikrPhraseId, count: number) => void;
}

export default function VoiceEngine({
  activePhraseId,
  isListening,
  onToggleListening,
  onRecognizedMatch,
}: VoiceEngineProps) {
  const [supported, setSupported] = useState<boolean>(true);
  const [latestTranscript, setLatestTranscript] = useState<string>("");
  const recognitionRef = useRef<any>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (!SpeechRecognition) {
      setSupported(false);
      return;
    }

    const rec = new SpeechRecognition();
    rec.continuous = true;
    rec.interimResults = true;
    rec.lang = "ar-SA";

    rec.onresult = (event: any) => {
      let currentTranscript = "";
      for (let i = event.resultIndex; i < event.results.length; i++) {
        currentTranscript += event.results[i][0].transcript;
      }
      setLatestTranscript(currentTranscript);

      const { matchedId, count } = detectDhikrInText(currentTranscript, activePhraseId);
      if (matchedId && count > 0) {
        onRecognizedMatch(matchedId, count);
      }
    };

    rec.onerror = (event: any) => {
      console.warn("Speech recognition error:", event.error);
    };

    rec.onend = () => {
      // Auto restart if still marked active
      if (isListening && recognitionRef.current) {
        try {
          rec.start();
        } catch (e) {
          // ignore already started error
        }
      }
    };

    recognitionRef.current = rec;

    return () => {
      if (recognitionRef.current) {
        try {
          recognitionRef.current.stop();
        } catch (e) {}
      }
    };
  }, [activePhraseId]);

  useEffect(() => {
    if (!recognitionRef.current) return;

    if (isListening) {
      try {
        recognitionRef.current.start();
      } catch (e) {
        // already active
      }
    } else {
      try {
        recognitionRef.current.stop();
      } catch (e) {}
    }
  }, [isListening]);

  return (
    <div className="flex flex-col items-center justify-center my-4">
      <button
        onClick={() => onToggleListening()}
        className={`px-6 py-3 rounded-full font-bold text-sm flex items-center gap-3 shadow-xl transition-all border ${
          isListening
            ? "bg-red-600/80 text-white border-red-400 animate-pulse"
            : "bg-[#D4AF37] text-[#0A0D0B] border-[#D4AF37] hover:scale-105"
        }`}
      >
        <span className="text-lg">{isListening ? "🎙️" : "🎙️"}</span>
        <span>{isListening ? "إيقاف التعرف الصوتي" : "تشغيل التعرف الصوتي الذكي"}</span>
      </button>

      {/* Spoken Text Display Feed */}
      {isListening && (
        <div className="mt-3 px-4 py-2 rounded-lg bg-black/40 border border-[#D4AF37]/20 text-xs font-amiri text-emerald-200/90 text-center max-w-sm">
          {latestTranscript ? `"${latestTranscript}"` : "جاري الاستماع للذكر..."}
        </div>
      )}

      {!supported && (
        <p className="mt-2 text-xs text-amber-400 text-center">
          ملاحظة: محرك الصوت يعتمد على متصفح يدعم Web Speech API. يمكنك استخدام اللمس المباشر في أي وقت.
        </p>
      )}
    </div>
  );
}
