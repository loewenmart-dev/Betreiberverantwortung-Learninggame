import { motion } from 'framer-motion';
import { X, Lock, Check } from 'lucide-react';
import { useGameStore, skillPointsAvailable } from '../../store/gameStore';
import { SKILL_TREE } from '../../lib/gameData';
import { de } from '../../i18n/de';

/**
 * Skill-Tree mit 3 Ästen (Jurist/Techniker/Manager) à 3 Tiers.
 * Max. 6 Punkte (Level 2–7) – vollständiges Maxen ist unmöglich,
 * der Spieler muss sich spezialisieren.
 */
export default function SkillTree({ onClose }: { onClose: () => void }) {
  const skills = useGameStore((s) => s.skills);
  const totalXp = useGameStore((s) => s.totalXp);
  const unlockSkillTier = useGameStore((s) => s.unlockSkillTier);
  const available = skillPointsAvailable({ totalXp, skills });

  return (
    <div className="absolute inset-0 z-40 bg-black/50 flex items-center justify-center p-4" onClick={onClose}>
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-surface rounded-2xl shadow-2xl w-full max-w-2xl max-h-[85vh] overflow-y-auto p-5"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-1">
          <h2 className="text-xl font-extrabold text-primary">🌳 {de.skills.title}</h2>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600"><X /></button>
        </div>
        <p className={`text-sm font-bold mb-4 ${available > 0 ? 'text-accent' : 'text-slate-400'}`}>
          ✨ {de.skills.available(available)}
        </p>

        <div className="grid sm:grid-cols-3 gap-4">
          {SKILL_TREE.map((branch) => (
            <div key={branch.id} className="bg-white rounded-xl border border-slate-200 p-3">
              <h3 className="font-extrabold text-primary text-center mb-3">
                {branch.icon} {branch.name}
              </h3>
              <div className="space-y-2">
                {branch.tiers.map((tier) => {
                  const unlocked = skills[branch.id] >= tier.tier;
                  const isNext = skills[branch.id] === tier.tier - 1;
                  const canUnlock = isNext && available > 0;
                  return (
                    <div
                      key={tier.tier}
                      className={`rounded-lg border-2 p-2.5 ${
                        unlocked
                          ? 'border-success bg-success/10'
                          : canUnlock
                            ? 'border-accent bg-accent/5'
                            : 'border-slate-200 bg-slate-50 opacity-70'
                      }`}
                    >
                      <div className="flex items-center gap-1.5 text-sm font-bold text-primary">
                        {unlocked ? (
                          <Check size={14} className="text-success" />
                        ) : (
                          <Lock size={14} className="text-slate-400" />
                        )}
                        {tier.name}
                        <span className="ml-auto text-[10px] text-slate-400">T{tier.tier}</span>
                      </div>
                      <p className="text-[11px] text-slate-500 mt-1">{tier.description}</p>
                      {canUnlock && (
                        <button
                          onClick={() => unlockSkillTier(branch.id)}
                          className="mt-2 w-full bg-accent text-primary text-xs font-bold py-1.5 rounded-lg hover:bg-accent/90"
                        >
                          {de.skills.unlock}
                        </button>
                      )}
                      {!unlocked && !isNext && (
                        <p className="text-[10px] text-slate-400 mt-1">{de.skills.requiresPrevious}</p>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
