import { X, CheckCircle2, Circle, Lock } from 'lucide-react';
import { motion } from 'framer-motion';
import { useQuests } from '../../hooks/useQuests';
import { de } from '../../i18n/de';

/** Übersicht aller Haupt- und Sidequests */
export default function QuestLog({ onClose }: { onClose: () => void }) {
  const { buildings, sidequests } = useQuests();

  return (
    <div className="absolute inset-0 z-40 bg-black/50 flex items-center justify-center p-4" onClick={onClose}>
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-surface rounded-2xl shadow-2xl w-full max-w-md max-h-[85vh] overflow-y-auto p-5"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-extrabold text-primary">📜 Quest-Log</h2>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600"><X /></button>
        </div>

        <h3 className="font-bold text-sm uppercase tracking-wide text-slate-500 mb-2">Hauptquests</h3>
        <ul className="space-y-1.5 mb-5">
          {buildings.map(({ building, unlocked, completed, percent }) => (
            <li key={building.id} className="flex items-center gap-2 bg-white rounded-lg px-3 py-2 shadow-sm">
              {completed ? (
                <CheckCircle2 className="text-success shrink-0" size={18} />
              ) : unlocked ? (
                <Circle className="text-accent shrink-0" size={18} />
              ) : (
                <Lock className="text-slate-300 shrink-0" size={18} />
              )}
              <span className="mr-1">{building.emoji}</span>
              <div className="flex-1 min-w-0">
                <div className={`text-sm font-semibold ${unlocked ? 'text-primary' : 'text-slate-400'}`}>
                  {building.name}
                </div>
                <div className="text-[11px] text-slate-400 truncate">{building.theme}</div>
              </div>
              <span className="text-xs font-bold text-slate-500">{completed ? '100%' : unlocked ? `${percent}%` : '🔒'}</span>
            </li>
          ))}
        </ul>

        <h3 className="font-bold text-sm uppercase tracking-wide text-slate-500 mb-2">Sidequests</h3>
        <ul className="space-y-1.5">
          {sidequests.map(({ sidequest, visible, completed }) => (
            <li key={sidequest.id} className="flex items-center gap-2 bg-white rounded-lg px-3 py-2 shadow-sm">
              {completed ? (
                <CheckCircle2 className="text-success shrink-0" size={18} />
              ) : visible ? (
                <Circle className="text-accent shrink-0" size={18} />
              ) : (
                <Lock className="text-slate-300 shrink-0" size={18} />
              )}
              <span className="mr-1">{sidequest.emoji}</span>
              <div className="flex-1 min-w-0">
                <div className={`text-sm font-semibold ${visible || completed ? 'text-primary' : 'text-slate-400'}`}>
                  {visible || completed ? sidequest.name : '???'}
                </div>
                {(visible || completed) && (
                  <div className="text-[11px] text-slate-400 truncate">{sidequest.description}</div>
                )}
              </div>
              <span className="text-xs font-bold text-accent">+{sidequest.xpReward} XP</span>
            </li>
          ))}
        </ul>
        <button
          onClick={onClose}
          className="mt-5 w-full bg-primary text-white font-bold py-2.5 rounded-xl hover:bg-primary/90"
        >
          {de.quest.close}
        </button>
      </motion.div>
    </div>
  );
}
