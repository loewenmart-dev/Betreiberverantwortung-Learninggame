import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { BuildingData, Direction, PlayerPosition, SkillBranch } from '../types/game.types';
import { BUILDINGS, BUILDING_BADGES, MAIN_BUILDINGS, PLAYER_START, SIDEQUESTS } from '../lib/gameData';
import { levelForXp, streakBonus, XP_REWARDS } from '../lib/xpSystem';
import { scheduleSync } from '../lib/syncService';

export type Screen = 'login' | 'menu' | 'game';

export interface ActiveQuest {
  kind: 'building' | 'sidequest';
  id: string;
}

interface GameState {
  // Session
  screen: Screen;
  userId: string | null;
  username: string;
  isOffline: boolean;

  // Spieler
  position: PlayerPosition;
  direction: Direction;

  // Fortschritt
  totalXp: number;
  /** Freigeschaltete Tiers pro Skill-Ast (0–3) */
  skills: Record<SkillBranch, number>;
  /** buildingId → IDs korrekt beantworteter Fragen */
  buildingAnswers: Record<string, string[]>;
  /** buildingId → abgeschlossen (Quest inkl. Fallstudie beendet) */
  buildingCompleted: Record<string, boolean>;
  sidequestsCompleted: string[];
  badges: string[];
  /** questionId → Anzahl Versuche */
  attempts: Record<string, number>;
  everFailedFirstTry: boolean;
  libraryUnlocked: boolean;
  loginStreak: number;
  lastLoginDate: string | null;

  // UI
  activeQuest: ActiveQuest | null;
  levelUpInfo: { level: number; unlockedBuildings: string[] } | null;
  badgeQueue: string[];
  streakMessage: string | null;

  // Actions
  setScreen: (s: Screen) => void;
  loginOnline: (userId: string, username: string) => void;
  loginOffline: (username: string) => void;
  logout: () => void;
  setPosition: (p: PlayerPosition, d: Direction) => void;
  openQuest: (q: ActiveQuest) => void;
  closeQuest: () => void;
  recordAnswer: (questionId: string, correct: boolean) => number;
  addXp: (amount: number) => void;
  completeBuilding: (buildingId: string) => void;
  completeSidequest: (sidequestId: string, elapsedSeconds?: number) => void;
  unlockSkillTier: (branch: SkillBranch) => void;
  awardBadge: (badgeId: string) => void;
  dismissLevelUp: () => void;
  dismissBadge: () => void;
  dismissStreak: () => void;
  applyDailyStreak: () => void;
  resetProgress: () => void;
  hydrateFromRemote: (data: Partial<GameState>) => void;
}

const initialProgress = {
  position: { ...PLAYER_START },
  direction: 'down' as Direction,
  totalXp: 0,
  skills: { jurist: 0, techniker: 0, manager: 0 } as Record<SkillBranch, number>,
  buildingAnswers: {} as Record<string, string[]>,
  buildingCompleted: {} as Record<string, boolean>,
  sidequestsCompleted: [] as string[],
  badges: [] as string[],
  attempts: {} as Record<string, number>,
  everFailedFirstTry: false,
  libraryUnlocked: false,
  loginStreak: 0,
  lastLoginDate: null as string | null,
};

export const useGameStore = create<GameState>()(
  persist(
    (set, get) => ({
      screen: 'login',
      userId: null,
      username: '',
      isOffline: true,
      ...initialProgress,
      activeQuest: null,
      levelUpInfo: null,
      badgeQueue: [],
      streakMessage: null,

      setScreen: (s) => set({ screen: s }),

      loginOnline: (userId, username) => {
        set({ userId, username, isOffline: false, screen: 'menu' });
        get().applyDailyStreak();
      },

      loginOffline: (username) => {
        set({ userId: null, username: username || 'Gast', isOffline: true, screen: 'menu' });
        get().applyDailyStreak();
      },

      logout: () => set({ screen: 'login', userId: null }),

      setPosition: (p, d) => set({ position: p, direction: d }),

      openQuest: (q) => set({ activeQuest: q }),
      closeQuest: () => set({ activeQuest: null }),

      /** Antwort verbuchen; liefert vergebene XP zurück */
      recordAnswer: (questionId, correct) => {
        const state = get();
        const prevAttempts = state.attempts[questionId] ?? 0;
        const attempt = prevAttempts + 1;
        let xp = 0;
        if (correct) {
          if (attempt === 1) xp = XP_REWARDS.correctFirstTry;
          else if (attempt === 2) xp = XP_REWARDS.correctSecondTry;
        }
        set({
          attempts: { ...state.attempts, [questionId]: attempt },
          everFailedFirstTry: state.everFailedFirstTry || (!correct && attempt === 1),
        });
        if (xp > 0) get().addXp(xp);
        scheduleSync();
        return xp;
      },

      addXp: (amount) => {
        const state = get();
        const before = levelForXp(state.totalXp);
        const totalXp = state.totalXp + amount;
        const after = levelForXp(totalXp);
        set({ totalXp });
        if (after > before) {
          const unlocked = BUILDINGS.filter(
            (b) => !b.unlockSpecial && b.unlockLevel > before && b.unlockLevel <= after && b.unlockLevel > 0
          ).map((b) => b.name);
          set({ levelUpInfo: { level: after, unlockedBuildings: unlocked } });
        }
        scheduleSync();
      },

      completeBuilding: (buildingId) => {
        const state = get();
        if (state.buildingCompleted[buildingId]) return;
        set({ buildingCompleted: { ...state.buildingCompleted, [buildingId]: true } });
        get().addXp(XP_REWARDS.questCompleted + XP_REWARDS.buildingCompletedBonus);

        const badge = BUILDING_BADGES[buildingId];
        if (badge) get().awardBadge(badge);

        // Alle Hauptgebäude fertig → "Verantwortlicher Betreiber"
        const completed = { ...get().buildingCompleted };
        if (MAIN_BUILDINGS.every((id) => completed[id])) {
          get().awardBadge('betreiber');
        }
        // Spiel komplett & nie beim ersten Versuch gescheitert → Perfektionist
        if (completed['buergermeisteramt'] && !get().everFailedFirstTry) {
          get().awardBadge('perfektionist');
        }
        scheduleSync();
      },

      completeSidequest: (sidequestId, elapsedSeconds) => {
        const state = get();
        if (state.sidequestsCompleted.includes(sidequestId)) return;
        set({ sidequestsCompleted: [...state.sidequestsCompleted, sidequestId] });
        const sq = SIDEQUESTS.find((s) => s.id === sidequestId);
        get().addXp(sq?.xpReward ?? XP_REWARDS.sidequestCompleted);
        if (sq?.badgeReward) get().awardBadge(sq.badgeReward);
        if (sidequestId === 'hausmeister') set({ libraryUnlocked: true });
        if (sidequestId === 'feuerwache-nacht' && elapsedSeconds !== undefined && elapsedSeconds < 150) {
          get().awardBadge('speedrunner');
        }
        scheduleSync();
      },

      unlockSkillTier: (branch) => {
        const state = get();
        const current = state.skills[branch];
        if (current >= 3) return;
        const level = levelForXp(state.totalXp);
        const spent = state.skills.jurist + state.skills.techniker + state.skills.manager;
        const available = Math.min(level - 1, 6) - spent;
        if (available <= 0) return;
        set({ skills: { ...state.skills, [branch]: current + 1 } });
        scheduleSync();
      },

      awardBadge: (badgeId) => {
        const state = get();
        if (state.badges.includes(badgeId)) return;
        set({ badges: [...state.badges, badgeId], badgeQueue: [...state.badgeQueue, badgeId] });
        scheduleSync();
      },

      dismissLevelUp: () => set({ levelUpInfo: null }),
      dismissBadge: () => set((s) => ({ badgeQueue: s.badgeQueue.slice(1) })),
      dismissStreak: () => set({ streakMessage: null }),

      applyDailyStreak: () => {
        const state = get();
        const today = new Date().toISOString().slice(0, 10);
        if (state.lastLoginDate === today) return;
        const yesterday = new Date(Date.now() - 86400000).toISOString().slice(0, 10);
        const streak = state.lastLoginDate === yesterday ? state.loginStreak + 1 : 1;
        const bonus = streakBonus(streak);
        set({ loginStreak: streak, lastLoginDate: today });
        if (state.lastLoginDate !== null) {
          get().addXp(bonus);
          set({ streakMessage: `+${bonus} XP – Tag ${streak} deiner Login-Serie!` });
        }
        scheduleSync();
      },

      resetProgress: () =>
        set({
          ...initialProgress,
          lastLoginDate: new Date().toISOString().slice(0, 10),
          loginStreak: 1,
          activeQuest: null,
          levelUpInfo: null,
          badgeQueue: [],
          streakMessage: null,
        }),

      hydrateFromRemote: (data) => set(data),
    }),
    {
      name: 'betreiberstadt-save',
      partialize: (state) => ({
        userId: state.userId,
        username: state.username,
        isOffline: state.isOffline,
        position: state.position,
        totalXp: state.totalXp,
        skills: state.skills,
        buildingAnswers: state.buildingAnswers,
        buildingCompleted: state.buildingCompleted,
        sidequestsCompleted: state.sidequestsCompleted,
        badges: state.badges,
        attempts: state.attempts,
        everFailedFirstTry: state.everFailedFirstTry,
        libraryUnlocked: state.libraryUnlocked,
        loginStreak: state.loginStreak,
        lastLoginDate: state.lastLoginDate,
      }),
    }
  )
);

// ── Abgeleitete Helfer ───────────────────────────────────────────

export function playerLevel(totalXp: number): number {
  return levelForXp(totalXp);
}

export function skillPointsAvailable(state: Pick<GameState, 'totalXp' | 'skills'>): number {
  const level = levelForXp(state.totalXp);
  const spent = state.skills.jurist + state.skills.techniker + state.skills.manager;
  return Math.max(0, Math.min(level - 1, 6) - spent);
}

export function isBuildingUnlocked(
  building: BuildingData,
  state: Pick<GameState, 'totalXp' | 'libraryUnlocked' | 'buildingCompleted'>
): boolean {
  if (building.unlockSpecial === 'sidequest-hausmeister') return state.libraryUnlocked;
  if (building.unlockSpecial === 'all-main-buildings') {
    return MAIN_BUILDINGS.every((id) => state.buildingCompleted[id]);
  }
  return levelForXp(state.totalXp) >= building.unlockLevel;
}

export function buildingCompletionPercent(
  building: BuildingData,
  buildingAnswers: Record<string, string[]>
): number {
  const answered = buildingAnswers[building.id] ?? [];
  // Bonusfragen (Skill-gebunden) zählen nicht zum Pflichtumfang
  const total =
    building.questions.filter((q) => !q.bonusSkill).length + (building.caseStudy?.questions.length ?? 0);
  if (total === 0) return 0;
  return Math.min(100, Math.round((answered.length / total) * 100));
}

export function markQuestionAnswered(buildingId: string, questionId: string) {
  const state = useGameStore.getState();
  const list = state.buildingAnswers[buildingId] ?? [];
  if (list.includes(questionId)) return;
  useGameStore.setState({
    buildingAnswers: { ...state.buildingAnswers, [buildingId]: [...list, questionId] },
  });
  scheduleSync();
}
