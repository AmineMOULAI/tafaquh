export type DhikrPhraseId = "subhanallah" | "alhamdulillah" | "allahuakbar" | "lailahaillallah" | "astaghfirullah";

export interface DhikrPhraseDef {
  id: DhikrPhraseId;
  arabic: string;
  transliteration: string;
  french: string;
  defaultGoal: number;
  patterns: string[];
}

export const DHIKR_PHRASES: Record<DhikrPhraseId, DhikrPhraseDef> = {
  subhanallah: {
    id: "subhanallah",
    arabic: "سُبْحَانَ اللَّهِ",
    transliteration: "SubhanAllah",
    french: "Gloire à Allah",
    defaultGoal: 33,
    patterns: [
      "سبحان الله", "سبحانك", "سبحان",
      "subhanallah", "subhan allah", "subhan-allah", "soubhanallah", "soubhan allah"
    ],
  },
  alhamdulillah: {
    id: "alhamdulillah",
    arabic: "الْحَمْدُ لِلَّهِ",
    transliteration: "Alhamdulillah",
    french: "Louange à Allah",
    defaultGoal: 33,
    patterns: [
      "الحمد لله", "الحمدلله", "حمد لله",
      "alhamdulillah", "alhamdoulillah", "al hamdu lillah", "al hamdulillah", "elhamdulillah"
    ],
  },
  allahuakbar: {
    id: "allahuakbar",
    arabic: "اللَّهُ أَكْبَرُ",
    transliteration: "Allahu Akbar",
    french: "Allah est le Plus Grand",
    defaultGoal: 33,
    patterns: [
      "الله اكبر", "الله أكبر", "اللهكبر",
      "allahu akbar", "allahuakbar", "allah akbar", "allahou akbar"
    ],
  },
  lailahaillallah: {
    id: "lailahaillallah",
    arabic: "لَا إِلَهَ إِلَّا اللَّهُ",
    transliteration: "La ilaha illallah",
    french: "Nul n'est digne d'adoration sauf Allah",
    defaultGoal: 100,
    patterns: [
      "لا اله الا الله", "لا إله إلا الله", "لااله الا الله",
      "la ilaha illallah", "la ilaha illa allah", "la illaha illallah"
    ],
  },
  astaghfirullah: {
    id: "astaghfirullah",
    arabic: "أَسْتَغْفِرُ اللَّهَ",
    transliteration: "Astaghfirullah",
    french: "J'implore le pardon d'Allah",
    defaultGoal: 100,
    patterns: [
      "استغفر الله", "أستغفر الله", "استغفرالله",
      "astaghfirullah", "astagfirullah", "asteghfirullah"
    ],
  },
};

/**
 * Remove diacritics (tashkeel), normalize alefs, teh marbuta, and latin punctuation
 */
export function normalizeText(text: string): string {
  if (!text) return "";
  return text
    .replace(/[\u064B-\u0652\u0670]/g, "") // remove tashkeel & dagger alef
    .replace(/[أإآ]/g, "ا")               // normalize alefs
    .replace(/ة/g, "ه")                   // normalize teh marbuta
    .replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, "") // remove punctuation
    .replace(/\s+/g, " ")                 // normalize spaces
    .trim()
    .toLowerCase();
}

/**
 * Detect Dhikr phrase occurrence in spoken text
 */
export function detectDhikrInText(transcript: string, activePhraseId?: DhikrPhraseId): { matchedId: DhikrPhraseId | null; count: number } {
  const norm = normalizeText(transcript);
  if (!norm) return { matchedId: null, count: 0 };

  // Check activePhraseId patterns first
  if (activePhraseId) {
    const def = DHIKR_PHRASES[activePhraseId];
    for (const pattern of def.patterns) {
      const normPattern = normalizeText(pattern);
      if (norm.includes(normPattern)) {
        const matches = norm.split(normPattern).length - 1;
        return { matchedId: activePhraseId, count: Math.max(1, matches) };
      }
    }
  }

  // Check all phrases
  for (const [id, def] of Object.entries(DHIKR_PHRASES)) {
    for (const pattern of def.patterns) {
      const normPattern = normalizeText(pattern);
      if (norm.includes(normPattern)) {
        const matches = norm.split(normPattern).length - 1;
        return { matchedId: id as DhikrPhraseId, count: Math.max(1, matches) };
      }
    }
  }

  return { matchedId: null, count: 0 };
}
