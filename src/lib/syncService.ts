import { supabase } from './supabase';

/**
 * Auto-Save: Spielstand wird nach jeder Änderung debounced (2 s) zu
 * Supabase synchronisiert – nur wenn online eingeloggt. Offline läuft
 * alles über den localStorage-Persist des Zustand-Stores.
 */
let timer: ReturnType<typeof setTimeout> | null = null;

export function scheduleSync() {
  if (!supabase) return;
  if (timer) clearTimeout(timer);
  timer = setTimeout(() => void syncNow(), 2000);
}

async function syncNow() {
  if (!supabase) return;
  // Dynamischer Import vermeidet einen Zyklus gameStore ↔ syncService
  const { useGameStore, playerLevel, skillPointsAvailable } = await import('../store/gameStore');
  const state = useGameStore.getState();
  if (state.isOffline || !state.userId) return;

  const level = playerLevel(state.totalXp);

  try {
    await supabase.from('game_progress').upsert(
      {
        player_id: state.userId,
        current_level: level,
        total_xp: state.totalXp,
        skill_points_available: skillPointsAvailable(state),
        skill_tree: state.skills,
        player_position: state.position,
        updated_at: new Date().toISOString(),
      },
      { onConflict: 'player_id' }
    );

    const buildingRows = Object.keys(state.buildingAnswers).map((buildingId) => ({
      player_id: state.userId,
      building_id: buildingId,
      is_unlocked: true,
      is_completed: Boolean(state.buildingCompleted[buildingId]),
      completion_percentage: state.buildingCompleted[buildingId] ? 100 : 0,
      questions_answered: state.buildingAnswers[buildingId],
      updated_at: new Date().toISOString(),
    }));
    if (buildingRows.length > 0) {
      await supabase.from('building_progress').upsert(buildingRows, { onConflict: 'player_id,building_id' });
    }

    if (state.badges.length > 0) {
      await supabase.from('player_badges').upsert(
        state.badges.map((badgeId) => ({ player_id: state.userId, badge_id: badgeId })),
        { onConflict: 'player_id,badge_id', ignoreDuplicates: true }
      );
    }

    await supabase.from('leaderboard').upsert(
      {
        player_id: state.userId,
        username: state.username,
        total_xp: state.totalXp,
        badges_count: state.badges.length,
        completed_buildings: Object.values(state.buildingCompleted).filter(Boolean).length,
        updated_at: new Date().toISOString(),
      },
      { onConflict: 'player_id' }
    );
  } catch (err) {
    // Offline-Fähigkeit: Sync-Fehler sind nicht fatal, localStorage bleibt Quelle der Wahrheit
    console.warn('Supabase-Sync fehlgeschlagen', err);
  }
}

/** Spielstand beim Login aus Supabase laden (Remote gewinnt bei mehr XP) */
export async function loadRemoteProgress(userId: string) {
  if (!supabase) return;
  const { useGameStore } = await import('../store/gameStore');
  try {
    const { data: progress } = await supabase
      .from('game_progress')
      .select('*')
      .eq('player_id', userId)
      .maybeSingle();
    if (!progress) return;
    const local = useGameStore.getState();
    if (progress.total_xp > local.totalXp) {
      const { data: buildings } = await supabase
        .from('building_progress')
        .select('*')
        .eq('player_id', userId);
      const { data: badges } = await supabase.from('player_badges').select('badge_id').eq('player_id', userId);

      const buildingAnswers: Record<string, string[]> = {};
      const buildingCompleted: Record<string, boolean> = {};
      for (const row of buildings ?? []) {
        buildingAnswers[row.building_id] = row.questions_answered ?? [];
        buildingCompleted[row.building_id] = row.is_completed;
      }
      useGameStore.getState().hydrateFromRemote({
        totalXp: progress.total_xp,
        skills: progress.skill_tree,
        position: progress.player_position,
        buildingAnswers,
        buildingCompleted,
        badges: (badges ?? []).map((b) => b.badge_id),
      });
    }
  } catch (err) {
    console.warn('Laden des Remote-Spielstands fehlgeschlagen', err);
  }
}
