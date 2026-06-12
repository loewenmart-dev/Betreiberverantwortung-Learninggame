import { createClient, type SupabaseClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string | undefined;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined;

/**
 * Supabase ist optional: Ohne konfigurierte ENV-Variablen läuft das Spiel
 * im Offline-Modus (Fortschritt nur in localStorage).
 */
export const isSupabaseConfigured = Boolean(supabaseUrl && supabaseAnonKey);

export const supabase: SupabaseClient | null = isSupabaseConfigured
  ? createClient(supabaseUrl!, supabaseAnonKey!)
  : null;

export async function signInWithEmail(email: string, password: string) {
  if (!supabase) throw new Error('Supabase nicht konfiguriert');
  return supabase.auth.signInWithPassword({ email, password });
}

export async function signUpWithEmail(email: string, password: string, username: string) {
  if (!supabase) throw new Error('Supabase nicht konfiguriert');
  return supabase.auth.signUp({
    email,
    password,
    options: { data: { username } },
  });
}

export async function signInWithMagicLink(email: string) {
  if (!supabase) throw new Error('Supabase nicht konfiguriert');
  return supabase.auth.signInWithOtp({
    email,
    options: { emailRedirectTo: window.location.origin },
  });
}

/**
 * Google OAuth – vorbereitet, aber noch NICHT aktiv.
 * Aktivierung:
 *   1. Google-Provider im Supabase-Dashboard konfigurieren
 *   2. VITE_GOOGLE_CLIENT_ID in .env setzen
 *   3. Diesen Code-Block einkommentieren und den Button im LoginScreen aktivieren
 */
// export async function signInWithGoogle() {
//   if (!supabase) throw new Error('Supabase nicht konfiguriert');
//   return supabase.auth.signInWithOAuth({
//     provider: 'google',
//     options: { redirectTo: window.location.origin },
//   });
// }

export async function signOut() {
  if (!supabase) return;
  await supabase.auth.signOut();
}
