import { BUILDINGS, DECORATIONS, MAP_SIZE, SIDEQUESTS } from './gameData';
import type { BuildingData, PlayerPosition, SidequestData } from '../types/game.types';

/** Belegte Zellen (Gebäude + blockierende Deko) für Kollisionsprüfung */
const blockedCells = new Set<string>();

for (const b of BUILDINGS) {
  for (let dx = 0; dx < b.size.w; dx++) {
    for (let dy = 0; dy < b.size.h; dy++) {
      blockedCells.add(`${b.position.x + dx},${b.position.y + dy}`);
    }
  }
}
for (const d of DECORATIONS) {
  if (d.type === 'tree') blockedCells.add(`${d.x},${d.y}`);
}

export function isWalkable(x: number, y: number): boolean {
  if (x < 0 || y < 0 || x >= MAP_SIZE || y >= MAP_SIZE) return false;
  return !blockedCells.has(`${x},${y}`);
}

/** Gebäude, neben dem der Spieler steht (Chebyshev-Distanz ≤ 1 zum Gebäuderand) */
export function adjacentBuilding(pos: PlayerPosition): BuildingData | null {
  for (const b of BUILDINGS) {
    const nearX = pos.x >= b.position.x - 1 && pos.x <= b.position.x + b.size.w;
    const nearY = pos.y >= b.position.y - 1 && pos.y <= b.position.y + b.size.h;
    if (nearX && nearY) return b;
  }
  return null;
}

/** Sidequest-NPC, neben dem der Spieler steht */
export function adjacentSidequest(pos: PlayerPosition): SidequestData | null {
  for (const sq of SIDEQUESTS) {
    if (Math.abs(pos.x - sq.position.x) <= 1 && Math.abs(pos.y - sq.position.y) <= 1) return sq;
  }
  return null;
}

/** Wege: einfache Kreuz-Achsen durch die Stadt für die Optik */
export function isPath(x: number, y: number): boolean {
  const v = x === 9 || x === 10;
  const h = y === 7 || y === 13;
  return (v || h) && !blockedCells.has(`${x},${y}`);
}
