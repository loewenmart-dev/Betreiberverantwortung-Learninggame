import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, KeyRound, User, Wand2, WifiOff } from 'lucide-react';
import { isSupabaseConfigured, signInWithEmail, signInWithMagicLink, signUpWithEmail } from '../../lib/supabase';
import { useGameStore } from '../../store/gameStore';
import { de } from '../../i18n/de';

type Mode = 'login' | 'register';

export default function LoginScreen() {
  const loginOffline = useGameStore((s) => s.loginOffline);
  const [mode, setMode] = useState<Mode>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [message, setMessage] = useState<{ text: string; error: boolean } | null>(null);
  const [busy, setBusy] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);
    setMessage(null);
    try {
      if (mode === 'login') {
        const { error } = await signInWithEmail(email, password);
        if (error) throw error;
        // Weiterleitung übernimmt der Auth-Listener in useSupabase
      } else {
        const { error } = await signUpWithEmail(email, password, username || email.split('@')[0]);
        if (error) throw error;
        setMessage({ text: de.auth.confirmEmail, error: false });
      }
    } catch (err) {
      setMessage({ text: err instanceof Error ? err.message : 'Fehler bei der Anmeldung', error: true });
    } finally {
      setBusy(false);
    }
  };

  const handleMagicLink = async () => {
    if (!email) {
      setMessage({ text: 'Bitte zuerst E-Mail-Adresse eingeben.', error: true });
      return;
    }
    setBusy(true);
    try {
      const { error } = await signInWithMagicLink(email);
      if (error) throw error;
      setMessage({ text: de.auth.magicLinkSent, error: false });
    } catch (err) {
      setMessage({ text: err instanceof Error ? err.message : 'Fehler', error: true });
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="min-h-full flex items-center justify-center bg-gradient-to-br from-primary via-primary to-slate-900 p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-surface rounded-3xl shadow-2xl w-full max-w-md p-8"
      >
        <div className="text-center mb-6">
          <div className="text-5xl mb-2">🏛️</div>
          <h1 className="text-3xl font-extrabold text-primary tracking-tight">{de.app.title}</h1>
          <p className="text-accent font-semibold">{de.app.subtitle}</p>
          <p className="text-xs text-slate-400 mt-1">{de.app.tagline}</p>
        </div>

        {isSupabaseConfigured ? (
          <form onSubmit={handleSubmit} className="space-y-3">
            {mode === 'register' && (
              <Field icon={<User size={16} />}>
                <input
                  type="text"
                  placeholder={de.auth.username}
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="flex-1 bg-transparent outline-none text-sm"
                />
              </Field>
            )}
            <Field icon={<Mail size={16} />}>
              <input
                type="email"
                required
                placeholder={de.auth.email}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 bg-transparent outline-none text-sm"
              />
            </Field>
            <Field icon={<KeyRound size={16} />}>
              <input
                type="password"
                required
                minLength={6}
                placeholder={de.auth.password}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="flex-1 bg-transparent outline-none text-sm"
              />
            </Field>

            <button
              type="submit"
              disabled={busy}
              className="w-full bg-primary text-white font-bold py-3 rounded-xl hover:bg-primary/90 disabled:opacity-50"
            >
              {mode === 'login' ? de.auth.login : de.auth.register}
            </button>

            <button
              type="button"
              onClick={handleMagicLink}
              disabled={busy}
              className="w-full flex items-center justify-center gap-2 border-2 border-primary text-primary font-bold py-2.5 rounded-xl hover:bg-primary/5 disabled:opacity-50"
            >
              <Wand2 size={16} /> {de.auth.magicLink}
            </button>

            {/*
              Google OAuth – vorbereitet, Aktivierung siehe src/lib/supabase.ts:
              <button type="button" onClick={() => signInWithGoogle()} className="w-full ...">
                {de.auth.loginWithGoogle}
              </button>
            */}

            <p className="text-center text-xs text-slate-500">
              {mode === 'login' ? de.auth.noAccount : de.auth.hasAccount}{' '}
              <button
                type="button"
                className="text-accent font-bold"
                onClick={() => setMode(mode === 'login' ? 'register' : 'login')}
              >
                {mode === 'login' ? de.auth.register : de.auth.login}
              </button>
            </p>
          </form>
        ) : (
          <p className="text-xs text-center text-slate-500 bg-slate-100 rounded-lg p-3 mb-3">
            {de.auth.supabaseNotConfigured}
          </p>
        )}

        <div className="mt-4 pt-4 border-t border-slate-200">
          <button
            onClick={() => loginOffline(username || 'Gast')}
            className="w-full flex items-center justify-center gap-2 bg-accent text-primary font-bold py-3 rounded-xl hover:bg-accent/90"
          >
            <WifiOff size={16} /> {de.auth.playOffline}
          </button>
          <p className="text-[11px] text-center text-slate-400 mt-2">{de.auth.offlineHint}</p>
        </div>

        {message && (
          <p className={`mt-4 text-sm text-center font-semibold ${message.error ? 'text-danger' : 'text-success'}`}>
            {message.text}
          </p>
        )}
      </motion.div>
    </div>
  );
}

function Field({ icon, children }: { icon: React.ReactNode; children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-2 border-2 border-slate-200 rounded-xl px-3 py-2.5 bg-white focus-within:border-accent">
      <span className="text-slate-400">{icon}</span>
      {children}
    </div>
  );
}
