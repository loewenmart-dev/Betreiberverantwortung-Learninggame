import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { X, Trophy } from 'lucide-react';
import { supabase } from '../../lib/supabase';
import { useGameStore } from '../../store/gameStore';
import { de } from '../../i18n/de';

interface Entry {
  player_id: string;
  username: string;
  total_xp: number;
  badges_count: number;
  completed_buildings: number;
}

export default function Leaderboard({ onClose }: { onClose: () => void }) {
  const isOffline = useGameStore((s) => s.isOffline);
  const userId = useGameStore((s) => s.userId);
  const [entries, setEntries] = useState<Entry[] | null>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!supabase || isOffline) return;
    supabase
      .from('leaderboard')
      .select('*')
      .order('total_xp', { ascending: false })
      .limit(50)
      .then(({ data, error }) => {
        if (error) setError(true);
        else setEntries(data ?? []);
      });
  }, [isOffline]);

  return (
    <div className="absolute inset-0 z-40 bg-black/50 flex items-center justify-center p-4" onClick={onClose}>
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-surface rounded-2xl shadow-2xl w-full max-w-md max-h-[85vh] overflow-y-auto p-5"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-extrabold text-primary flex items-center gap-2">
            <Trophy className="text-accent" /> {de.leaderboard.title}
          </h2>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600"><X /></button>
        </div>

        {isOffline || !supabase ? (
          <p className="text-sm text-slate-500 text-center py-8">{de.leaderboard.offline}</p>
        ) : error ? (
          <p className="text-sm text-danger text-center py-8">Bestenliste konnte nicht geladen werden.</p>
        ) : entries === null ? (
          <p className="text-sm text-slate-400 text-center py-8 animate-pulse">Lade…</p>
        ) : entries.length === 0 ? (
          <p className="text-sm text-slate-500 text-center py-8">{de.leaderboard.empty}</p>
        ) : (
          <table className="w-full text-sm">
            <thead>
              <tr className="text-[11px] uppercase text-slate-400 text-left">
                <th className="py-1">{de.leaderboard.rank}</th>
                <th>{de.leaderboard.player}</th>
                <th className="text-right">{de.leaderboard.xp}</th>
                <th className="text-right">🏅</th>
                <th className="text-right">🏠</th>
              </tr>
            </thead>
            <tbody>
              {entries.map((e, i) => (
                <tr
                  key={e.player_id}
                  className={`border-t border-slate-100 ${e.player_id === userId ? 'bg-accent/10 font-bold' : ''}`}
                >
                  <td className="py-2">{i === 0 ? '🥇' : i === 1 ? '🥈' : i === 2 ? '🥉' : `${i + 1}.`}</td>
                  <td className="truncate max-w-[140px]">{e.username}</td>
                  <td className="text-right">{e.total_xp}</td>
                  <td className="text-right">{e.badges_count}</td>
                  <td className="text-right">{e.completed_buildings}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </motion.div>
    </div>
  );
}
