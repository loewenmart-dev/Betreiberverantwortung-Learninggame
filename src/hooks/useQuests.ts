import { useGameStore, isBuildingUnlocked, buildingCompletionPercent } from '../store/gameStore';
import { BUILDINGS, SIDEQUESTS } from '../lib/gameData';
import { levelForXp } from '../lib/xpSystem';
import type { BuildingData, SidequestData } from '../types/game.types';

export interface BuildingStatus {
  building: BuildingData;
  unlocked: boolean;
  completed: boolean;
  percent: number;
  questReady: boolean;
}

export interface SidequestStatus {
  sidequest: SidequestData;
  visible: boolean;
  completed: boolean;
}

/** Status aller Gebäude und Sidequests für Karte und Quest-Log */
export function useQuests(): { buildings: BuildingStatus[]; sidequests: SidequestStatus[] } {
  const totalXp = useGameStore((s) => s.totalXp);
  const libraryUnlocked = useGameStore((s) => s.libraryUnlocked);
  const buildingCompleted = useGameStore((s) => s.buildingCompleted);
  const buildingAnswers = useGameStore((s) => s.buildingAnswers);
  const sidequestsCompleted = useGameStore((s) => s.sidequestsCompleted);

  const level = levelForXp(totalXp);
  const state = { totalXp, libraryUnlocked, buildingCompleted };

  const buildings: BuildingStatus[] = BUILDINGS.map((building) => {
    const unlocked = isBuildingUnlocked(building, state);
    const completed = Boolean(buildingCompleted[building.id]);
    return {
      building,
      unlocked,
      completed,
      percent: completed ? 100 : buildingCompletionPercent(building, buildingAnswers),
      questReady: unlocked && !completed,
    };
  });

  const sidequests: SidequestStatus[] = SIDEQUESTS.map((sidequest) => {
    const completed = sidequestsCompleted.includes(sidequest.id);
    const levelOk = level >= sidequest.unlockLevel;
    const buildingOk = !sidequest.requiresBuilding || Boolean(buildingCompleted[sidequest.requiresBuilding]);
    return { sidequest, visible: levelOk && buildingOk && !completed, completed };
  });

  return { buildings, sidequests };
}
