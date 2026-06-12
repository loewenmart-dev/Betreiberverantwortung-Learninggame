import { motion } from 'framer-motion';
import { Play, RotateCcw, Trophy, Award, Sparkles, FileBadge, LogOut } from 'lucide-react';
import { useGameStore } from '../../store/gameStore';
import { useGameState } from '../../hooks/useGameState';
import { de } from '../../i18n/de';

interface Props {
  onOpenLeaderboard: () => void;
  onOpenSkills: () => void;
  onOpenBadges: () => void;
  onOpenCertificate: () => void;
}

export default function MainMenu({ onOpenLeaderboard, onOpenSkills, onOpenBadges, onOpenCertificate }: Props) {
  const setScreen = useGameStore((s) => s.setScreen);
  const resetProgress = useGameStore((s) => s.resetProgress);
  const logout = useGameStore((s) => s.logout);
  const { level, totalXp, badges, username } = useGameState();

  return (
    <div className="min-h-full flex items-center justify-center bg-gradient-to-br from-primary via-primary to-slate-900 p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-surface rounded-3xl shadow-2xl w-full max-w-md p-8"
      >
        <div className="text-center mb-6">
          <div className="text-5xl mb-2">🏛️</div>
          <h1 className="text-3xl font-extrabold text-primary tracking-tight">{de.app.title}</h1>
          <p className="text-sm text-slate-500 mt-2">
            👷 <b>{username}</b> · {de.hud.level} {level} · {totalXp} XP · {badges.length} 🏅
          </p>
        </div>

        <div className="space-y-2.5">
          <MenuButton primary icon={<Play size={18} />} label={de.menu.continue} onClick={() => setScreen('game')} />
          <MenuButton icon={<Sparkles size={18} />} label={de.menu.skillTree} onClick={onOpenSkills} />
          <MenuButton icon={<Award size={18} />} label={de.menu.badges} onClick={onOpenBadges} />
          <MenuButton icon={<Trophy size={18} />} label={de.menu.leaderboard} onClick={onOpenLeaderboard} />
          <MenuButton icon={<FileBadge size={18} />} label={de.menu.certificate} onClick={onOpenCertificate} />
          <MenuButton
            icon={<RotateCcw size={18} />}
            label={de.menu.newGame}
            onClick={() => {
              if (window.confirm(de.menu.confirmReset)) resetProgress();
            }}
          />
          <MenuButton icon={<LogOut size={18} />} label={de.auth.logout} onClick={logout} />
        </div>
      </motion.div>
    </div>
  );
}

function MenuButton({
  icon,
  label,
  onClick,
  primary,
}: {
  icon: React.ReactNode;
  label: string;
  onClick: () => void;
  primary?: boolean;
}) {
  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold transition-colors ${
        primary
          ? 'bg-accent text-primary hover:bg-accent/90 text-lg'
          : 'bg-white text-primary border border-slate-200 hover:border-accent'
      }`}
    >
      {icon} {label}
    </button>
  );
}
