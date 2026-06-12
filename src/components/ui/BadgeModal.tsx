import { motion } from 'framer-motion';
import { X } from 'lucide-react';
import { useGameStore } from '../../store/gameStore';
import { BADGES } from '../../lib/gameData';
import { de } from '../../i18n/de';

/** Toast für frisch verdiente Badges (Queue) */
export function BadgeToast() {
  const badgeQueue = useGameStore((s) => s.badgeQueue);
  const dismissBadge = useGameStore((s) => s.dismissBadge);
  const badge = BADGES.find((b) => b.id === badgeQueue[0]);

  if (!badge) return null;
  return (
    <div className="absolute inset-0 z-[60] bg-black/50 flex items-center justify-center p-4">
      <motion.div
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: 'spring', bounce: 0.4 }}
        className="bg-surface rounded-3xl shadow-2xl max-w-xs w-full p-7 text-center"
      >
        <motion.div
          animate={{ scale: [1, 1.3, 1] }}
          transition={{ duration: 0.6, repeat: 1 }}
          className="text-6xl mb-2"
        >
          {badge.emoji}
        </motion.div>
        <p className="text-accent font-bold text-sm uppercase tracking-wide">{de.badges.newBadge}</p>
        <h3 className="text-xl font-extrabold text-primary mt-1">{badge.name}</h3>
        <p className="text-xs text-slate-500 mt-1">{badge.condition}</p>
        <button
          onClick={dismissBadge}
          className="mt-5 w-full bg-accent text-primary font-bold py-2.5 rounded-xl"
        >
          {de.quest.close}
        </button>
      </motion.div>
    </div>
  );
}

/** Übersicht aller Badges */
export function BadgeOverview({ onClose }: { onClose: () => void }) {
  const badges = useGameStore((s) => s.badges);

  return (
    <div className="absolute inset-0 z-40 bg-black/50 flex items-center justify-center p-4" onClick={onClose}>
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-surface rounded-2xl shadow-2xl w-full max-w-md max-h-[85vh] overflow-y-auto p-5"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-extrabold text-primary">🏅 {de.badges.title} ({badges.length}/{BADGES.length})</h2>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600"><X /></button>
        </div>
        <div className="grid grid-cols-3 gap-3">
          {BADGES.map((badge) => {
            const earned = badges.includes(badge.id);
            return (
              <div
                key={badge.id}
                title={badge.condition}
                className={`rounded-xl p-3 text-center border-2 ${
                  earned ? 'bg-accent/10 border-accent' : 'bg-slate-100 border-slate-200 grayscale opacity-50'
                }`}
              >
                <div className="text-3xl">{badge.emoji}</div>
                <div className="text-[10px] font-bold text-primary mt-1 leading-tight">{badge.name}</div>
                <div className="text-[9px] text-slate-400 mt-0.5 leading-tight">
                  {earned ? `✓ ${de.badges.earned}` : badge.condition}
                </div>
              </div>
            );
          })}
        </div>
      </motion.div>
    </div>
  );
}
