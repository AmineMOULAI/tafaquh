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
      "سبحان الله", "سبحانك", "سبحانالله", "سبحان",
      "subhanallah", "subhan allah", "subhan-allah", "soubhanallah", "soubhan allah",
      "subhana allah", "sobhan allah", "glory to allah", "glory be to allah"
    ],
  },
  alhamdulillah: {
    id: "alhamdulillah",
    arabic: "الْحَمْدُ لِلَّهِ",
    transliteration: "Alhamdulillah",
    french: "Louange à Allah",
    defaultGoal: 33,
    patterns: [
      "الحمد لله", "الحمدلله", "حمد لله", "الحمد",
      "alhamdulillah", "alhamdoulillah", "al hamdu lillah", "al hamdulillah", "elhamdulillah",
      "alhamdu lillah", "praise be to allah", "praise to allah", "all praise to allah", "praise god", "thanks to allah"
    ],
  },
  allahuakbar: {
    id: "allahuakbar",
    arabic: "اللَّهُ أَكْبَرُ",
    transliteration: "Allahu Akbar",
    french: "Allah est le Plus Grand",
    defaultGoal: 33,
    patterns: [
      "الله اكبر", "الله أكبر", "اللهكبر", "الله الأكبر",
      "allahu akbar", "allahuakbar", "allah akbar", "allahou akbar", "allaahu akbar",
      "allah is greatest", "god is greatest", "allah is the greatest", "god is the greatest"
    ],
  },
  lailahaillallah: {
    id: "lailahaillallah",
    arabic: "لَا إِلَهَ إِلَّا اللَّهُ",
    transliteration: "La ilaha illallah",
    french: "Nul n'est digne d'adoration sauf Allah",
    defaultGoal: 100,
    patterns: [
      "لا اله الا الله", "لا إله إلا الله", "لااله الا الله", "لاإله إلا الله",
      "la ilaha illallah", "la ilaha illa allah", "la illaha illallah", "lailahaillallah",
      "there is no god but allah"
    ],
  },
  astaghfirullah: {
    id: "astaghfirullah",
    arabic: "أَسْتَغْفِرُ اللَّهَ",
    transliteration: "Astaghfirullah",
    french: "J'implore le pardon d'Allah",
    defaultGoal: 100,
    patterns: [
      "استغفر الله", "أستغفر الله", "استغفرالله", "استغفر",
      "astaghfirullah", "astagfirullah", "asteghfirullah",
      "i ask allah for forgiveness", "i seek forgiveness from allah", "forgive me allah"
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
 * Detect Dhikr phrase occurrence in spoken text.
 * Strictly locks to activePhraseId if provided!
 */
export function detectDhikrInText(
  transcript: string,
  activePhraseId?: DhikrPhraseId
): { matchedId: DhikrPhraseId | null; count: number } {
  const norm = normalizeText(transcript);
  if (!norm) return { matchedId: null, count: 0 };

  // STRICT TARGET LOCKING: If activePhraseId is provided, ONLY match that phrase
  if (activePhraseId) {
    const def = DHIKR_PHRASES[activePhraseId];
    for (const pattern of def.patterns) {
      const normPattern = normalizeText(pattern);
      if (norm.includes(normPattern)) {
        const matches = norm.split(normPattern).length - 1;
        return { matchedId: activePhraseId, count: Math.max(1, matches) };
      }
    }
    // Return null if spoken text does not match the active target phrase
    return { matchedId: null, count: 0 };
  }

  // Fallback check all phrases
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
