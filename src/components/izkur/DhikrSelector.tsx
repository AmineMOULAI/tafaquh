"use client";

import { DHIKR_PHRASES, DhikrPhraseId } from "@/utils/arabicSpeech";

interface DhikrSelectorProps {
  selectedPhraseId: DhikrPhraseId;
  onSelectPhrase: (id: DhikrPhraseId) => void;
}

export default function DhikrSelector({ selectedPhraseId, onSelectPhrase }: DhikrSelectorProps) {
  const phraseKeys = Object.keys(DHIKR_PHRASES) as DhikrPhraseId[];

  return (
    <div className="w-full flex items-center justify-center gap-2 flex-wrap my-4">
      {phraseKeys.map((id) => {
        const item = DHIKR_PHRASES[id];
        const isSelected = selectedPhraseId === id;

        return (
          <button
            key={id}
            onClick={() => onSelectPhrase(id)}
            className={`px-4 py-2 rounded-xl text-sm font-amiri font-bold transition-all border ${
              isSelected
                ? "bg-[#D4AF37] text-[#0A0D0B] border-[#D4AF37] shadow-lg scale-105"
                : "bg-[#0B3B2C]/50 text-emerald-100 border-[#D4AF37]/30 hover:border-[#D4AF37] hover:bg-[#0B3B2C]"
            }`}
          >
            {item.arabic}
          </button>
        );
      })}
    </div>
  );
}
