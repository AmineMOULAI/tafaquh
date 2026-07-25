export type DhikrPhraseId = "subhanallah" | "alhamdulillah" | "allahuakbar" | "lailahaillallah" | "astaghfirullah";

export interface DhikrPhraseDef {
  id: DhikrPhraseId;
  arabic: string;
  transliteration: string;
  defaultGoal: number;
  patterns: string[];
}

export const DHIKR_PHRASES: Record<DhikrPhraseId, DhikrPhraseDef> = {
  subhanallah: {
    id: "subhanallah",
    arabic: "سُبْحَانَ اللَّهِ",
    transliteration: "SubhanAllah",
    defaultGoal: 33,
    patterns: ["سبحان الله", "سبحانك", "سبحان"],
  },
  alhamdulillah: {
    id: "alhamdulillah",
    arabic: "الْحَمْدُ لِلَّهِ",
    transliteration: "Alhamdulillah",
    defaultGoal: 33,
    patterns: ["الحمد لله", "الحمدلله", "حمد لله"],
  },
  allahuakbar: {
    id: "allahuakbar",
    arabic: "اللَّهُ أَكْبَرُ",
    transliteration: "Allahu Akbar",
    defaultGoal: 33,
    patterns: ["الله اكبر", "الله أكبر", "اللهكبر"],
  },
  lailahaillallah: {
    id: "lailahaillallah",
    arabic: "لَا إِلَهَ إِلَّا اللَّهُ",
    transliteration: "La ilaha illallah",
    defaultGoal: 100,
    patterns: ["لا اله الا الله", "لا إله إلا الله", "لااله الا الله"],
  },
  astaghfirullah: {
    id: "astaghfirullah",
    arabic: "أَسْتَغْفِرُ اللَّهَ",
    transliteration: "Astaghfirullah",
    defaultGoal: 100,
    patterns: ["استغفر الله", "أستغفر الله", "استغفرالله"],
  },
};

/**
 * Remove diacritics (tashkeel), normalize alefs and teh marbuta
 */
export function normalizeArabicText(text: string): string {
  if (!text) return "";
  return text
    .replace(/[\u064B-\u0652\u0670]/g, "") // remove tashkeel & dagger alef
    .replace(/[أإآ]/g, "ا")               // normalize alefs
    .replace(/ة/g, "ه")                   // normalize teh marbuta
    .replace(/\s+/g, " ")                 // normalize spaces
    .trim()
    .toLowerCase();
}

/**
 * Count occurrence of specific Dhikr phrase or match any occurrence in spoken text
 */
export function detectDhikrInText(transcript: string, activePhraseId?: DhikrPhraseId): { matchedId: DhikrPhraseId | null; count: number } {
  const norm = normalizeArabicText(transcript);
  if (!norm) return { matchedId: null, count: 0 };

  // If activePhraseId is provided, check its patterns first
  if (activePhraseId) {
    const def = DHIKR_PHRASES[activePhraseId];
    for (const pattern of def.patterns) {
      const normPattern = normalizeArabicText(pattern);
      if (norm.includes(normPattern)) {
        // Count how many times the pattern appears in transcript
        const matches = norm.split(normPattern).length - 1;
        return { matchedId: activePhraseId, count: Math.max(1, matches) };
      }
    }
  }

  // Check all phrases
  for (const [id, def] of Object.entries(DHIKR_PHRASES)) {
    for (const pattern of def.patterns) {
      const normPattern = normalizeArabicText(pattern);
      if (norm.includes(normPattern)) {
        const matches = norm.split(normPattern).length - 1;
        return { matchedId: id as DhikrPhraseId, count: Math.max(1, matches) };
      }
    }
  }

  return { matchedId: null, count: 0 };
}
