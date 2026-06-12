import { Lock, Check } from 'lucide-react';
import type { BuildingStatus } from '../../hooks/useQuests';

interface Props {
  status: BuildingStatus;
  cellSize: number;
  onClick: () => void;
}

/**
 * Stilisiertes Gebäude (CSS/SVG, keine externen Assets).
 * - Verfügbar + offene Quest: goldenes Blinken / pulsierendes Leuchten
 * - Gesperrt: ausgegraut mit Schloss
 * - Abgeschlossen: grüner Haken
 */
export default function Building({ status, cellSize, onClick }: Props) {
  const { building, unlocked, completed, percent, questReady } = status;
  const w = building.size.w * cellSize;
  const h = building.size.h * cellSize;

  return (
    <button
      onClick={onClick}
      title={building.name}
      className={`absolute z-10 group transition-transform focus:outline-none ${
        unlocked ? 'hover:scale-105 cursor-pointer' : 'cursor-not-allowed'
      } ${questReady ? 'animate-pulse-glow rounded-lg' : ''}`}
      style={{
        left: building.position.x * cellSize,
        top: building.position.y * cellSize,
        width: w,
        height: h,
      }}
    >
      <div
        className={`relative w-full h-full rounded-lg border-b-4 flex flex-col items-center justify-end overflow-visible ${
          unlocked ? '' : 'grayscale opacity-60'
        } ${questReady ? 'animate-blink-gold' : ''}`}
        style={{ backgroundColor: building.color, borderColor: 'rgba(0,0,0,0.3)' }}
      >
        {/* Dach */}
        <div
          className="absolute -top-2 left-1/2 -translate-x-1/2 w-[110%] rounded-t-md"
          style={{ height: h * 0.28, backgroundColor: 'rgba(0,0,0,0.25)' }}
        />
        {/* Emoji-Schild */}
        <div
          className="absolute left-1/2 -translate-x-1/2 z-10 select-none"
          style={{ top: -cellSize * 0.45, fontSize: cellSize * 0.9, lineHeight: 1 }}
        >
          {building.emoji}
        </div>
        {/* Fenster */}
        <div className="flex gap-1 mb-auto mt-[35%]">
          {Array.from({ length: Math.max(2, building.size.w) }).map((_, i) => (
            <div
              key={i}
              className="rounded-sm"
              style={{
                width: cellSize * 0.22,
                height: cellSize * 0.26,
                backgroundColor: unlocked ? '#FEF3C7' : '#94A3B8',
              }}
            />
          ))}
        </div>
        {/* Tür */}
        <div
          className="rounded-t-md"
          style={{ width: cellSize * 0.35, height: cellSize * 0.45, backgroundColor: 'rgba(0,0,0,0.35)' }}
        />
        {/* Statusanzeigen */}
        {!unlocked && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="bg-slate-800/80 rounded-full p-1.5">
              <Lock className="text-white" size={Math.max(14, cellSize * 0.4)} />
            </div>
          </div>
        )}
        {completed && (
          <div className="absolute -top-1 -right-1 bg-success rounded-full p-0.5 shadow">
            <Check className="text-white" size={Math.max(12, cellSize * 0.3)} strokeWidth={3} />
          </div>
        )}
        {unlocked && !completed && percent > 0 && (
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-black/30 rounded-b-lg overflow-hidden">
            <div className="h-full bg-accent" style={{ width: `${percent}%` }} />
          </div>
        )}
      </div>
      {/* Name beim Hover */}
      <div className="absolute left-1/2 -translate-x-1/2 -bottom-5 whitespace-nowrap text-[10px] font-semibold bg-primary text-white px-1.5 py-0.5 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-30">
        {building.name}
      </div>
    </button>
  );
}
