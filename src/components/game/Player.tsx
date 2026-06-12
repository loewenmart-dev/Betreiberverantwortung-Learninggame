import { motion } from 'framer-motion';
import { useGameStore } from '../../store/gameStore';
import type { Direction } from '../../types/game.types';

/**
 * Top-Down-Spielfigur als SVG (32×32), vier Blickrichtungen.
 * Die Richtung steuert Kopf-/Fuß-Details, framer-motion animiert die Bewegung.
 */
export default function Player({ cellSize }: { cellSize: number }) {
  const position = useGameStore((s) => s.position);
  const direction = useGameStore((s) => s.direction);

  return (
    <motion.div
      className="absolute z-20 pointer-events-none"
      animate={{ left: position.x * cellSize, top: position.y * cellSize }}
      transition={{ type: 'tween', duration: 0.15, ease: 'linear' }}
      style={{ width: cellSize, height: cellSize }}
    >
      <div className="player-walking w-full h-full flex items-center justify-center">
        <PlayerSprite direction={direction} size={cellSize * 0.85} />
      </div>
    </motion.div>
  );
}

function PlayerSprite({ direction, size }: { direction: Direction; size: number }) {
  const rotation = { down: 0, left: -25, right: 25, up: 0 }[direction];
  const showFace = direction !== 'up';
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" style={{ transform: `rotate(${rotation * 0.2}deg)` }}>
      {/* Schatten */}
      <ellipse cx="16" cy="29" rx="9" ry="2.5" fill="rgba(0,0,0,0.25)" />
      {/* Beine */}
      <rect x="11" y="22" width="4" height="7" rx="2" fill="#1E3A5F" />
      <rect x="17" y="22" width="4" height="7" rx="2" fill="#1E3A5F" />
      {/* Körper (Warnweste!) */}
      <rect x="8" y="12" width="16" height="12" rx="4" fill="#F59E0B" />
      <rect x="14.5" y="12" width="3" height="12" fill="#FBBF24" />
      {/* Arme */}
      <rect x="5" y="13" width="4" height="9" rx="2" fill="#F59E0B" transform={direction === 'left' ? 'rotate(-12 7 13)' : undefined} />
      <rect x="23" y="13" width="4" height="9" rx="2" fill="#F59E0B" transform={direction === 'right' ? 'rotate(12 25 13)' : undefined} />
      {/* Kopf */}
      <circle cx="16" cy="8" r="6" fill="#FCD7B6" />
      {/* Schutzhelm */}
      <path d="M 10 7.5 A 6 6 0 0 1 22 7.5 L 22 6.5 A 6 5 0 0 0 10 6.5 Z" fill="#FFFFFF" />
      <rect x="9.5" y="6.8" width="13" height="2" rx="1" fill="#E5E7EB" />
      {/* Gesicht */}
      {showFace && (
        <>
          <circle cx={direction === 'left' ? 12.5 : direction === 'right' ? 15.5 : 13.5} cy="9.5" r="0.9" fill="#1F2937" />
          <circle cx={direction === 'left' ? 16.5 : direction === 'right' ? 19.5 : 18.5} cy="9.5" r="0.9" fill="#1F2937" />
        </>
      )}
    </svg>
  );
}
