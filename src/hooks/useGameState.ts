import { useGameStore, skillPointsAvailable } from '../store/gameStore';
import { levelForXp, levelProgress } from '../lib/xpSystem';

/** Abgeleiteter Spielzustand für HUD & UI */
export function useGameState() {
  const totalXp = useGameStore((s) => s.totalXp);
  const skills = useGameStore((s) => s.skills);
  const badges = useGameStore((s) => s.badges);
  const username = useGameStore((s) => s.username);

  const level = levelForXp(totalXp);
  const progress = levelProgress(totalXp);
  const skillPoints = skillPointsAvailable({ totalXp, skills });

  return { totalXp, level, progress, skillPoints, skills, badges, username };
}
