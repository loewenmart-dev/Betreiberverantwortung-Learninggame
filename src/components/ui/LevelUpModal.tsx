import { motion } from 'framer-motion';
import { useGameStore } from '../../store/gameStore';
import { de } from '../../i18n/de';

export default function LevelUpModal() {
  const levelUpInfo = useGameStore((s) => s.levelUpInfo);
  const dismissLevelUp = useGameStore((s) => s.dismissLevelUp);

  if (!levelUpInfo) return null;

  return (
    <div className="absolute inset-0 z-[60] bg-black/60 flex items-center justify-center p-4">
      <motion.div
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: 'spring', bounce: 0.5 }}
        className="bg-surface rounded-3xl shadow-2xl max-w-sm w-full p-8 text-center"
      >
        <motion.div
          animate={{ rotate: [0, -8, 8, 0], scale: [1, 1.15, 1] }}
          transition={{ duration: 0.8, repeat: 2 }}
          className="text-6xl mb-3"
        >
          ⬆️
        </motion.div>
        <h2 className="text-2xl font-extrabold text-accent">{de.levelUp.title}</h2>
        <p className="text-lg font-bold text-primary mt-1">{de.levelUp.nowLevel(levelUpInfo.level)}</p>
        <p className="text-sm text-slate-600 mt-2">✨ {de.levelUp.skillPointEarned}</p>
        {levelUpInfo.unlockedBuildings.length > 0 && (
          <div className="mt-4 bg-accent/10 border border-accent/30 rounded-xl p-3 text-sm">
            <b>{de.levelUp.newBuildings}</b>
            <ul className="mt-1">
              {levelUpInfo.unlockedBuildings.map((name) => (
                <li key={name}>🔓 {name}</li>
              ))}
            </ul>
          </div>
        )}
        <button
          onClick={dismissLevelUp}
          className="mt-6 w-full bg-primary text-white font-bold py-3 rounded-xl hover:bg-primary/90"
        >
          {de.levelUp.continue}
        </button>
      </motion.div>
    </div>
  );
}
