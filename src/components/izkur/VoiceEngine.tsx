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
  const [modeNotice, setModeNotice] = useState<string | null>(null);

  const audioCtxRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const micStreamRef = useRef<MediaStream | null>(null);
  const animFrameRef = useRef<number | null>(null);
  const lastMatchTimeRef = useRef<number>(0);

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

  const startLocalMic = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      micStreamRef.current = stream;
      setMicActive(true);

      const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      const audioCtx = new AudioContextClass();
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
        // Update visual equalizer level ONLY (no incrementing on background volume)
        setAudioLevel(Math.min(100, Math.round(average * 2.5)));

        animFrameRef.current = requestAnimationFrame(checkVolume);
      };

      checkVolume();
    } catch (err) {
      console.warn("Mic access error:", err);
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
        } catch {
          // ignore error
        }
      }
      audioCtxRef.current = null;
    }
    setMicActive(false);
    setAudioLevel(0);
  };

  // 1. Web Speech API Setup (Only increments when actual phrase text is recognized)
  useEffect(() => {
    if (typeof window === "undefined") return;

    const SpeechRecognitionClass =
      (window as unknown as { SpeechRecognition?: any; webkitSpeechRecognition?: any }).SpeechRecognition ||
      (window as unknown as { webkitSpeechRecognition?: any }).webkitSpeechRecognition;

    if (!SpeechRecognitionClass) {
      setSupported(false);
      return;
    }

    const rec = new SpeechRecognitionClass();
    rec.continuous = true;
    rec.interimResults = true;
    rec.lang = getLanguageCode(lng);

    rec.onresult = (event: any) => {
      let currentTranscript = "";
      for (let i = event.resultIndex; i < event.results.length; i++) {
        currentTranscript += event.results[i][0].transcript + " ";
      }

      const trimmed = currentTranscript.trim();
      setLatestTranscript(trimmed);

      // Match recognized spoken text against Dhikr dictionary
      const { matchedId, count } = detectDhikrInText(trimmed, activePhraseId);
      if (matchedId && count > 0) {
        const now = Date.now();
        // Debounce 1.2s between phrase increments
        if (now - lastMatchTimeRef.current > 1200) {
          lastMatchTimeRef.current = now;
          onRecognizedMatch(matchedId, count);
        }
      }
    };

    rec.onerror = (event: any) => {
      if (event.error === "network") {
        setModeNotice(
          lng === "ar"
            ? "خدمة الصوت تتطلب شبكة متصلة. يمكنك التجربة عبر النقر المباشر أو الأزرار أدناه."
            : lng === "fr"
            ? "Le service vocal nécessite une connexion réseau."
            : "Voice service requires a network connection."
        );
      }
    };

    rec.onend = () => {
      if (isListeningRef.current && recognitionRef.current) {
        try {
          rec.start();
        } catch {
          // ignore error
        }
      }
    };

    recognitionRef.current = rec;

    return () => {
      if (recognitionRef.current) {
        try {
          recognitionRef.current.stop();
        } catch {
          // ignore error
        }
      }
    };
  }, [lng, activePhraseId]);

  // 2. Microphone Level Meter ONLY (Visual indicator, NO automatic noise incrementing)
  useEffect(() => {
    if (!isListening) {
      stopLocalMic();
      if (recognitionRef.current) {
        try {
          recognitionRef.current.stop();
        } catch {
          // ignore error
        }
      }
      return;
    }

    if (recognitionRef.current) {
      try {
        recognitionRef.current.start();
      } catch {
        // ignore error
      }
    }

    startLocalMic();

    return () => {
      stopLocalMic();
    };
  }, [isListening]);

  const handleSimulatedRecitation = (phraseId: DhikrPhraseId) => {
    const text = DHIKR_PHRASES[phraseId].arabic;
    setLatestTranscript(text);
    onRecognizedMatch(phraseId, 1);
  };

  const buttonLabel = isListening
    ? lng === "ar"
      ? "إيقاف التعرف الصوتي"
      : lng === "fr"
      ? "Mettre en Pause"
      : "Pause Voice Counter"
    : lng === "ar"
    ? "تشغيل التعرف الصوتي الذكي"
    : lng === "fr"
    ? "Activer le Compteur Vocal"
    : "Start Smart Voice Counter";

  const listeningStatus = lng === "ar"
    ? "جاري الاستماع للذكر..."
    : lng === "fr"
    ? "Écoute de votre récitation..."
    : "Listening for recitation...";

  return (
    <div className="flex flex-col items-center justify-center my-4 w-full">
      <button
        onClick={() => onToggleListening()}
        className={`px-6 py-3 rounded-full font-bold text-sm flex items-center gap-3 shadow-xl transition-all border ${
          isListening
            ? "bg-red-600/80 text-[#FDFBF7] border-red-400 animate-pulse"
            : "bg-[#D4AF37] text-[#0A0D0B] border-[#D4AF37] hover:scale-105"
        }`}
      >
        <span className="text-lg">🎙️</span>
        <span>{buttonLabel}</span>
      </button>

      {/* Live Mic Volume Level Meter & Spoken Text Feed */}
      {isListening && (
        <div className="mt-3 w-full max-w-xs flex flex-col items-center gap-2">
          <div className="w-full px-4 py-2 rounded-lg bg-black/40 border border-[#D4AF37]/20 text-xs font-amiri text-emerald-200/90 text-center">
            {latestTranscript ? `"${latestTranscript}"` : listeningStatus}
          </div>

          {/* Visual Equalizer / Mic Volume Level */}
          <div className="w-full bg-black/50 h-2 rounded-full overflow-hidden border border-[#D4AF37]/30">
            <div
              className="bg-gradient-to-r from-emerald-500 via-[#D4AF37] to-amber-400 h-full transition-all duration-75"
              style={{ width: `${audioLevel}%` }}
            />
          </div>
        </div>
      )}

      {/* Voice Recitation Test Buttons */}
      <div className="mt-4 p-4 rounded-2xl bg-[#0B3B2C]/40 border border-[#D4AF37]/30 text-center max-w-sm shadow-lg">
        <span className="text-xs font-amiri text-[#D4AF37] font-bold block mb-2">
          {lng === "ar"
            ? "اختبار التلاوة الصوتية المباشرة (انقر للتجربة):"
            : lng === "fr"
            ? "Test de récitation vocale directe :"
            : "Direct Voice Recitation Test:"}
        </span>
        <div className="flex flex-wrap gap-2 justify-center">
          {(Object.keys(DHIKR_PHRASES) as DhikrPhraseId[]).map((id) => (
            <button
              key={id}
              onClick={() => handleSimulatedRecitation(id)}
              className="px-3 py-1.5 rounded-lg bg-[#D4AF37]/20 hover:bg-[#D4AF37] hover:text-[#0A0D0B] text-[#D4AF37] text-xs font-amiri font-bold border border-[#D4AF37]/40 transition-all shadow-sm"
            >
              🗣️ {DHIKR_PHRASES[id].arabic}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
