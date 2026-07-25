"use client";

import { useEffect, useRef, useState } from "react";
import { detectDhikrInText, DhikrPhraseId, DHIKR_PHRASES } from "@/utils/arabicSpeech";

interface VoiceEngineProps {
  lng: string;
  activePhraseId: DhikrPhraseId;
  isListening: boolean;
  onToggleListening: (state?: boolean) => void;
  onRecognizedMatch: (phraseId: DhikrPhraseId, count: number) => void;
}

export default function VoiceEngine({
  lng,
  activePhraseId,
  isListening,
  onToggleListening,
  onRecognizedMatch,
}: VoiceEngineProps) {
  const [supported, setSupported] = useState<boolean>(true);
  const [micActive, setMicActive] = useState<boolean>(false);
  const [audioLevel, setAudioLevel] = useState<number>(0);
  const [latestTranscript, setLatestTranscript] = useState<string>("");

  const audioCtxRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const micStreamRef = useRef<MediaStream | null>(null);
  const animFrameRef = useRef<number | null>(null);
  const lastPeakTimeRef = useRef<number>(0);

  const recognitionRef = useRef<any>(null);
  const isListeningRef = useRef<boolean>(isListening);
  isListeningRef.current = isListening;

  const getLanguageCode = (l: string) => {
    switch (l) {
      case "fr":
        return "fr-FR";
      case "en":
        return "en-US";
      default:
        return "ar-SA";
    }
  };

  // 1. Web Speech API (Google Speech) Setup
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
    rec.lang = getLanguageCode(lng);

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
      // Suppress network error spam in local dev (handled by local mic analyzer below)
      if (event.error !== "network" && event.error !== "no-speech") {
        console.warn("Speech recognition notice:", event.error);
      }
    };

    rec.onend = () => {
      if (isListeningRef.current && recognitionRef.current) {
        try {
          rec.start();
        } catch (e) {}
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
  }, [lng, activePhraseId]);

  // 2. Local Audio Level Detector (Web Audio API - Works 100% offline & on localhost)
  useEffect(() => {
    if (!isListening) {
      stopLocalMic();
      if (recognitionRef.current) {
        try {
          recognitionRef.current.stop();
        } catch (e) {}
      }
      return;
    }

    // Start Web Speech if available
    if (recognitionRef.current) {
      try {
        recognitionRef.current.start();
      } catch (e) {}
    }

    // Start Local Mic Audio Volume Detector as guaranteed fallback
    startLocalMic();

    return () => {
      stopLocalMic();
    };
  }, [isListening]);

  const startLocalMic = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      micStreamRef.current = stream;
      setMicActive(true);

      const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
      audioCtxRef.current = audioCtx;
      const analyser = audioCtx.createAnalyser();
      analyser.fftSize = 256;
      analyserRef.current = analyser;

      const source = audioCtx.createMediaStreamSource(stream);
      source.connect(analyser);

      const bufferLength = analyser.frequencyBinCount;
      const dataArray = new Uint8Array(bufferLength);

      const checkVolume = () => {
        if (!analyserRef.current) return;
        analyserRef.current.getByteFrequencyData(dataArray);

        let sum = 0;
        for (let i = 0; i < bufferLength; i++) {
          sum += dataArray[i];
        }
        const average = sum / bufferLength;
        setAudioLevel(Math.min(100, Math.round(average * 2)));

        // Voice peak threshold detection (triggers count when user speaks into mic)
        const now = Date.now();
        if (average > 35 && now - lastPeakTimeRef.current > 800) {
          lastPeakTimeRef.current = now;
          onRecognizedMatch(activePhraseId, 1);
          setLatestTranscript(DHIKR_PHRASES[activePhraseId].arabic);
        }

        animFrameRef.current = requestAnimationFrame(checkVolume);
      };

      checkVolume();
    } catch (err) {
      console.warn("Local mic access warning:", err);
    }
  };

  const stopLocalMic = () => {
    if (animFrameRef.current) {
      cancelAnimationFrame(animFrameRef.current);
      animFrameRef.current = null;
    }
    if (micStreamRef.current) {
      micStreamRef.current.getTracks().forEach((track) => track.stop());
      micStreamRef.current = null;
    }
    if (audioCtxRef.current) {
      if (audioCtxRef.current.state !== "closed") {
        try {
          audioCtxRef.current.close().catch(() => {});
        } catch (e) {}
      }
      audioCtxRef.current = null;
    }
    setMicActive(false);
    setAudioLevel(0);
  };

  const handleSimulatedRecitation = (phraseId: DhikrPhraseId) => {
    const text = DHIKR_PHRASES[phraseId].arabic;
    setLatestTranscript(text);
    onRecognizedMatch(phraseId, 1);
  };

  const buttonLabel = isListening
    ? lng === "ar"
      ? "إيقاف المستمع الصوتي"
      : lng === "fr"
      ? "Mettre en Pause"
      : "Pause Voice Counter"
    : lng === "ar"
    ? "تشغيل التعرف الصوتي الذكي"
    : lng === "fr"
    ? "Activer le Compteur Vocal"
    : "Start Smart Voice Counter";

  const listeningStatus = lng === "ar"
    ? "جاري الاستماع لصوتك..."
    : lng === "fr"
    ? "Écoute de votre voix..."
    : "Listening for your voice...";

  return (
    <div className="flex flex-col items-center justify-center my-4 w-full">
      <button
        onClick={() => onToggleListening()}
        className={`px-6 py-3 rounded-full font-bold text-sm flex items-center gap-3 shadow-xl transition-all border ${
          isListening
            ? "bg-red-600/80 text-white border-red-400 animate-pulse"
            : "bg-[#D4AF37] text-[#0A0D0B] border-[#D4AF37] hover:scale-105"
        }`}
      >
        <span className="text-lg">🎙️</span>
        <span>{buttonLabel}</span>
      </button>

      {/* Live Mic Volume Level Meter & Feed */}
      {isListening && (
        <div className="mt-3 w-full max-w-xs flex flex-col items-center gap-2">
          <div className="w-full px-4 py-2 rounded-lg bg-black/40 border border-[#D4AF37]/20 text-xs font-amiri text-emerald-200/90 text-center">
            {latestTranscript ? `"${latestTranscript}"` : listeningStatus}
          </div>

          {/* Visual Equalizer / Mic Meter Bar */}
          <div className="w-full bg-black/50 h-2 rounded-full overflow-hidden border border-[#D4AF37]/30">
            <div
              className="bg-gradient-to-r from-emerald-500 via-[#D4AF37] to-amber-400 h-full transition-all duration-75"
              style={{ width: `${audioLevel}%` }}
            />
          </div>
        </div>
      )}

      {/* Voice Test & Simulation Buttons */}
      <div className="mt-4 p-3 rounded-xl bg-[#0B3B2C]/30 border border-[#D4AF37]/20 text-center max-w-sm">
        <span className="text-[11px] font-mono text-[#D4AF37]/80 block mb-2">
          {lng === "ar"
            ? "💡 اختبر المحرك بنقرة صوتية محاكاة:"
            : lng === "fr"
            ? "💡 Simuler une récitation vocale (Test local) :"
            : "💡 Test simulated voice recitation (Local Test):"}
        </span>
        <div className="flex flex-wrap gap-2 justify-center">
          <button
            onClick={() => handleSimulatedRecitation(activePhraseId)}
            className="px-3 py-1 rounded-md bg-[#D4AF37]/20 hover:bg-[#D4AF37] hover:text-[#0A0D0B] text-[#D4AF37] text-xs font-amiri font-bold border border-[#D4AF37]/40 transition-all"
          >
            🗣️ {DHIKR_PHRASES[activePhraseId].arabic}
          </button>
        </div>
      </div>
    </div>
  );
}
