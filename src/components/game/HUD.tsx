import { Award, BookOpen, LogOut, Menu, Sparkles } from 'lucide-react';
import { useGameState } from '../../hooks/useGameState';
import { useQuests } from '../../hooks/useQuests';
import { useGameStore } from '../../store/gameStore';
import { MAP_SIZE, BUILDINGS } from '../../lib/gameData';
import { de } from '../../i18n/de';

interface Props {
  onOpenSkills: () => void;
  onOpenBadges: () => void;
  onOpenQuestLog: () => void;
}

/** Heads-Up-Display: Level/XP oben links, Quests oben rechts, Mini-Map unten */
export default function HUD({ onOpenSkills, onOpenBadges, onOpenQuestLog }: Props) {
  const { level, progress, skillPoints, totalXp } = useGameState();
  const { buildings, sidequests } = useQuests();
  const position = useGameStore((s) => s.position);
  const setScreen = useGameStore((s) => s.setScreen);

  const nextQuest =
    buildings.find((b) => b.questReady)?.building.name ??
    sidequests.find((s) => s.visible)?.sidequest.name ??
    null;

  return (
    <>
      {/* Oben links: Level + XP */}
      <div className="absolute top-2 left-2 z-30 flex items-center gap-2 bg-primary/90 text-white rounded-xl px-3 py-2 shadow-lg">
        <div className="bg-accent text-primary font-extrabold rounded-full w-10 h-10 flex items-center justify-center text-lg shrink-0">
          {level}
        </div>
        <div className="w-32 sm:w-44">
          <div className="flex justify-between text-[10px] font-semibold uppercase tracking-wide">
            <span>{de.hud.level} {level}</span>
            <span>{totalXp} {de.hud.xp}</span>
          </div>
          <div className="h-2.5 bg-white/20 rounded-full overflow-hidden mt-0.5">
            <div className="h-full bg-accent transition-all duration-500" style={{ width: `${progress.ratio * 100}%` }} />
          </div>
        </div>
        {skillPoints > 0 && (
          <button
            onClick={onOpenSkills}
            className="flex items-center gap-1 bg-accent text-primary text-xs font-bold rounded-lg px-2 py-1 animate-pulse"
          >
            <Sparkles size={14} /> {skillPoints}
          </button>
        )}
      </div>

      {/* Oben rechts: aktive Quest + Buttons */}
      <div className="absolute top-2 right-2 z-30 flex flex-col items-end gap-2">
        <div className="flex gap-1.5">
          <HudButton onClick={onOpenQuestLog} title={de.hud.quest}><BookOpen size={18} /></HudButton>
          <HudButton onClick={onOpenSkills} title={de.skills.title}><Sparkles size={18} /></HudButton>
          <HudButton onClick={onOpenBadges} title={de.badges.title}><Award size={18} /></HudButton>
          <HudButton onClick={() => setScreen('menu')} title="Menü"><Menu size={18} /></HudButton>
          <HudButton onClick={() => useGameStore.getState().logout()} title={de.auth.logout}><LogOut size={18} /></HudButton>
        </div>
        <div className="bg-primary/90 text-white rounded-lg px-3 py-1.5 text-xs max-w-[220px] shadow-lg">
          <span className="font-bold text-accent">{de.hud.quest}: </span>
          {nextQuest ?? de.hud.noActiveQuest}
        </div>
      </div>

      {/* Unten rechts: Mini-Map */}
      <div className="absolute bottom-2 right-2 z-30 bg-primary/90 rounded-lg p-1.5 shadow-lg hidden sm:block">
        <div className="relative w-28 h-28 bg-grass rounded overflow-hidden">
          {BUILDINGS.map((b) => (
            <div
              key={b.id}
              className="absolute rounded-[1px]"
              style={{
                left: `${(b.position.x / MAP_SIZE) * 100}%`,
                top: `${(b.position.y / MAP_SIZE) * 100}%`,
                width: `${(b.size.w / MAP_SIZE) * 100}%`,
                height: `${(b.size.h / MAP_SIZE) * 100}%`,
                backgroundColor: b.color,
              }}
            />
          ))}
          <div
            className="absolute w-2 h-2 bg-danger rounded-full ring-2 ring-white -translate-x-1/2 -translate-y-1/2"
            style={{ left: `${((position.x + 0.5) / MAP_SIZE) * 100}%`, top: `${((position.y + 0.5) / MAP_SIZE) * 100}%` }}
          />
        </div>
        <div className="text-[9px] text-white/70 text-center mt-0.5 font-semibold uppercase">{de.hud.minimap}</div>
      </div>

      {/* Unten Mitte: Steuerungshinweis (Desktop) */}
      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 z-30 text-[11px] text-white bg-primary/70 px-3 py-1 rounded-full hidden md:block">
        {de.game.movementHint}
      </div>
    </>
  );
}

function HudButton({ children, onClick, title }: { children: React.ReactNode; onClick: () => void; title: string }) {
  return (
    <button
      onClick={onClick}
      title={title}
      className="bg-primary/90 hover:bg-primary text-white rounded-lg p-2 shadow-lg transition-colors"
    >
      {children}
    </button>
  );
}
