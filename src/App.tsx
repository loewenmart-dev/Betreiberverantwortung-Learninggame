import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useGameStore } from './store/gameStore';
import { useSupabase } from './hooks/useSupabase';
import LoginScreen from './components/ui/LoginScreen';
import MainMenu from './components/ui/MainMenu';
import Map from './components/game/Map';
import HUD from './components/game/HUD';
import QuestLog from './components/game/QuestLog';
import QuestFlow from './components/game/QuestFlow';
import Joystick from './components/game/Joystick';
import LevelUpModal from './components/ui/LevelUpModal';
import { BadgeToast, BadgeOverview } from './components/ui/BadgeModal';
import SkillTree from './components/ui/SkillTree';
import Leaderboard from './components/ui/Leaderboard';
import CertificateModal from './components/ui/CertificateModal';

type Overlay = 'skills' | 'badges' | 'leaderboard' | 'certificate' | 'questlog' | null;

export default function App() {
  useSupabase();
  const screen = useGameStore((s) => s.screen);
  const streakMessage = useGameStore((s) => s.streakMessage);
  const dismissStreak = useGameStore((s) => s.dismissStreak);
  const [overlay, setOverlay] = useState<Overlay>(null);

  const close = () => setOverlay(null);

  return (
    <div className="relative w-full h-full overflow-hidden">
      {screen === 'login' && <LoginScreen />}

      {screen === 'menu' && (
        <MainMenu
          onOpenLeaderboard={() => setOverlay('leaderboard')}
          onOpenSkills={() => setOverlay('skills')}
          onOpenBadges={() => setOverlay('badges')}
          onOpenCertificate={() => setOverlay('certificate')}
        />
      )}

      {screen === 'game' && (
        <>
          <Map />
          <HUD
            onOpenSkills={() => setOverlay('skills')}
            onOpenBadges={() => setOverlay('badges')}
            onOpenQuestLog={() => setOverlay('questlog')}
          />
          <Joystick />
          <QuestFlow />
        </>
      )}

      {/* Overlays (über Spiel und Menü) */}
      {overlay === 'skills' && <SkillTree onClose={close} />}
      {overlay === 'badges' && <BadgeOverview onClose={close} />}
      {overlay === 'leaderboard' && <Leaderboard onClose={close} />}
      {overlay === 'certificate' && <CertificateModal onClose={close} />}
      {overlay === 'questlog' && <QuestLog onClose={close} />}

      <LevelUpModal />
      <BadgeToast />

      {/* Login-Streak-Hinweis */}
      <AnimatePresence>
        {streakMessage && (
          <motion.button
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            onClick={dismissStreak}
            className="absolute top-16 left-1/2 -translate-x-1/2 z-[70] bg-success text-white text-sm font-bold px-4 py-2 rounded-full shadow-lg"
          >
            🔥 {streakMessage}
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}
