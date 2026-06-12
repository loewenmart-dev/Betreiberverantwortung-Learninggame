export const XP_TABLE: Record<number, number> = {
  1: 0,
  2: 100,
  3: 250,
  4: 500,
  5: 900,
  6: 1400,
  7: 2000, // Max Level
};

export const MAX_LEVEL = 7;

export const XP_REWARDS = {
  correctFirstTry: 15,
  correctSecondTry: 7,
  questCompleted: 50,
  sidequestCompleted: 75,
  buildingCompletedBonus: 100,
  dailyStreakPerDay: 10,
  dailyStreakMax: 50,
} as const;

/** Level für gegebene Gesamt-XP berechnen */
export function levelForXp(totalXp: number): number {
  let level = 1;
  for (let lvl = MAX_LEVEL; lvl >= 1; lvl--) {
    if (totalXp >= XP_TABLE[lvl]) {
      level = lvl;
      break;
    }
  }
  return level;
}

/** XP-Fortschritt innerhalb des aktuellen Levels (0..1) */
export function levelProgress(totalXp: number): { current: number; needed: number; ratio: number } {
  const level = levelForXp(totalXp);
  if (level >= MAX_LEVEL) {
    return { current: 0, needed: 0, ratio: 1 };
  }
  const base = XP_TABLE[level];
  const next = XP_TABLE[level + 1];
  const current = totalXp - base;
  const needed = next - base;
  return { current, needed, ratio: Math.min(1, current / needed) };
}

/** XP für eine richtige Antwort abhängig vom Versuch */
export function xpForAnswer(attempt: number): number {
  if (attempt <= 1) return XP_REWARDS.correctFirstTry;
  if (attempt === 2) return XP_REWARDS.correctSecondTry;
  return 0;
}

/** Tages-Streak-Bonus (max. 50 XP) */
export function streakBonus(streakDays: number): number {
  return Math.min(streakDays * XP_REWARDS.dailyStreakPerDay, XP_REWARDS.dailyStreakMax);
}
