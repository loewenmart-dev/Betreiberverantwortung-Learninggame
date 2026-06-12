import { useEffect, useMemo, useState } from 'react';
import { MAP_SIZE, DECORATIONS } from '../../lib/gameData';
import { adjacentBuilding, adjacentSidequest, isPath } from '../../lib/mapUtils';
import { useGameStore, isBuildingUnlocked } from '../../store/gameStore';
import { useQuests } from '../../hooks/useQuests';
import { usePlayer } from '../../hooks/usePlayer';
import Player from './Player';
import Building from './Building';
import Decoration from './Decoration';
import { de } from '../../i18n/de';

/**
 * Begehbare 20×20-Karte. Pure CSS Grid + absolute Positionierung –
 * bewusst kein Canvas/WebGL (Performance & Barrierefreiheit).
 */
export default function Map() {
  const { buildings, sidequests } = useQuests();
  const openQuest = useGameStore((s) => s.openQuest);
  const [viewport, setViewport] = useState({ w: window.innerWidth, h: window.innerHeight });
  const [toast, setToast] = useState<string | null>(null);

  useEffect(() => {
    const onResize = () => setViewport({ w: window.innerWidth, h: window.innerHeight });
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  const cellSize = Math.floor(Math.min(viewport.w, viewport.h) / MAP_SIZE);
  const mapPx = cellSize * MAP_SIZE;

  const showToast = (msg: string) => {
    setToast(msg);
    window.setTimeout(() => setToast(null), 2500);
  };

  const tryOpenBuilding = (id: string) => {
    const status = buildings.find((b) => b.building.id === id);
    if (!status) return;
    if (!status.unlocked) {
      const b = status.building;
      if (b.unlockSpecial === 'sidequest-hausmeister') showToast(de.game.lockedSidequest);
      else if (b.unlockSpecial === 'all-main-buildings') showToast(de.game.lockedAllBuildings);
      else showToast(de.game.lockedUntilLevel(b.unlockLevel));
      return;
    }
    openQuest({ kind: 'building', id });
  };

  usePlayer(() => {
    const state = useGameStore.getState();
    const sq = adjacentSidequest(state.position);
    if (sq) {
      const status = sidequests.find((s) => s.sidequest.id === sq.id);
      if (status?.visible) {
        openQuest({ kind: 'sidequest', id: sq.id });
        return;
      }
    }
    const b = adjacentBuilding(state.position);
    if (b) {
      if (
        isBuildingUnlocked(b, {
          totalXp: state.totalXp,
          libraryUnlocked: state.libraryUnlocked,
          buildingCompleted: state.buildingCompleted,
        })
      ) {
        openQuest({ kind: 'building', id: b.id });
      } else {
        tryOpenBuilding(b.id);
      }
    }
  });

  const tiles = useMemo(() => {
    const result: { x: number; y: number; path: boolean }[] = [];
    for (let y = 0; y < MAP_SIZE; y++) {
      for (let x = 0; x < MAP_SIZE; x++) {
        result.push({ x, y, path: isPath(x, y) });
      }
    }
    return result;
  }, []);

  return (
    <div className="w-full h-full flex items-center justify-center bg-grass-dark overflow-hidden">
      <div className="relative shadow-2xl" style={{ width: mapPx, height: mapPx }}>
        {/* Boden */}
        <div
          className="absolute inset-0 grid"
          style={{ gridTemplateColumns: `repeat(${MAP_SIZE}, ${cellSize}px)` }}
        >
          {tiles.map((t) => (
            <div
              key={`${t.x}-${t.y}`}
              className={t.path ? 'path-tile' : 'grass-tile'}
              style={{ width: cellSize, height: cellSize }}
            />
          ))}
        </div>

        {DECORATIONS.map((d, i) => (
          <Decoration key={i} deco={d} cellSize={cellSize} />
        ))}

        {buildings.map((status) => (
          <Building
            key={status.building.id}
            status={status}
            cellSize={cellSize}
            onClick={() => tryOpenBuilding(status.building.id)}
          />
        ))}

        {/* Sidequest-NPCs */}
        {sidequests
          .filter((s) => s.visible)
          .map(({ sidequest }) => (
            <button
              key={sidequest.id}
              onClick={() => openQuest({ kind: 'sidequest', id: sidequest.id })}
              title={sidequest.name}
              className="absolute z-10 flex flex-col items-center justify-center hover:scale-110 transition-transform"
              style={{
                left: sidequest.position.x * cellSize,
                top: sidequest.position.y * cellSize,
                width: cellSize,
                height: cellSize,
              }}
            >
              <span className="text-accent font-extrabold animate-bounce" style={{ fontSize: cellSize * 0.45 }}>
                !
              </span>
              <span style={{ fontSize: cellSize * 0.7, lineHeight: 1 }}>{sidequest.emoji}</span>
            </button>
          ))}

        <Player cellSize={cellSize} />

        {toast && (
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-40 bg-primary text-white text-sm px-4 py-2 rounded-lg shadow-lg">
            🔒 {toast}
          </div>
        )}
      </div>
    </div>
  );
}
