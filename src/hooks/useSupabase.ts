import { useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { loadRemoteProgress } from '../lib/syncService';
import { useGameStore } from '../store/gameStore';

/**
 * Lauscht auf Supabase-Auth-Änderungen (z. B. Magic-Link-Redirect)
 * und lädt nach Login den Remote-Spielstand.
 */
export function useSupabase() {
  useEffect(() => {
    if (!supabase) return;
    const { data } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        const username =
          (session.user.user_metadata?.username as string | undefined) ||
          session.user.email?.split('@')[0] ||
          'Spieler';
        useGameStore.getState().loginOnline(session.user.id, username);
        void loadRemoteProgress(session.user.id);
      }
    });
    return () => data.subscription.unsubscribe();
  }, []);
}
