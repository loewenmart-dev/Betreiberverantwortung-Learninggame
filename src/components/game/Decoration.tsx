import type { DecorationData } from '../../types/game.types';

/** Nicht-interaktive Dekoration: Bäume, Laternen, Bänke, Büsche, Blumen */
export default function Decoration({ deco, cellSize }: { deco: DecorationData; cellSize: number }) {
  const emoji = { tree: '🌳', lantern: '🏮', bench: '🪑', bush: '🌿', flowers: '🌷' }[deco.type];
  const scale = deco.type === 'tree' ? 1 : 0.7;
  return (
    <div
      className="absolute z-[5] pointer-events-none select-none flex items-center justify-center"
      style={{
        left: deco.x * cellSize,
        top: deco.y * cellSize,
        width: cellSize,
        height: cellSize,
        fontSize: cellSize * scale,
        lineHeight: 1,
        filter: 'drop-shadow(1px 2px 1px rgba(0,0,0,0.3))',
      }}
    >
      {emoji}
    </div>
  );
}
