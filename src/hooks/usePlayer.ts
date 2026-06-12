import { useEffect, useRef } from 'react';
import { useGameStore } from '../store/gameStore';
import { isWalkable } from '../lib/mapUtils';
import { inputState } from '../lib/inputState';
import type { Direction } from '../types/game.types';

const MOVE_INTERVAL_MS = 160;

/**
 * Spielersteuerung: WASD / Pfeiltasten (Desktop) und Touch-Joystick (Mobile).
 * E / Leertaste löst die Interaktion mit Gebäuden und NPCs aus.
 */
export function usePlayer(onInteract: () => void) {
  const pressed = useRef(new Set<string>());
  const interactRef = useRef(onInteract);
  interactRef.current = onInteract;

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      // Keine Bewegung, solange ein Quest-Dialog offen ist
      if (useGameStore.getState().activeQuest) return;
      const key = e.key.toLowerCase();
      if (['w', 'a', 's', 'd', 'arrowup', 'arrowdown', 'arrowleft', 'arrowright'].includes(key)) {
        e.preventDefault();
        pressed.current.add(key);
      }
      if (key === 'e' || key === ' ') {
        e.preventDefault();
        interactRef.current();
      }
    };
    const onKeyUp = (e: KeyboardEvent) => {
      pressed.current.delete(e.key.toLowerCase());
    };
    window.addEventListener('keydown', onKeyDown);
    window.addEventListener('keyup', onKeyUp);

    const timer = setInterval(() => {
      const state = useGameStore.getState();
      if (state.activeQuest || state.screen !== 'game') return;

      let dx = 0;
      let dy = 0;
      const keys = pressed.current;
      if (keys.has('w') || keys.has('arrowup')) dy = -1;
      else if (keys.has('s') || keys.has('arrowdown')) dy = 1;
      else if (keys.has('a') || keys.has('arrowleft')) dx = -1;
      else if (keys.has('d') || keys.has('arrowright')) dx = 1;

      if (dx === 0 && dy === 0) {
        const j = inputState.joystick;
        if (Math.abs(j.dx) > Math.abs(j.dy)) {
          if (Math.abs(j.dx) > 0.3) dx = Math.sign(j.dx);
        } else if (Math.abs(j.dy) > 0.3) {
          dy = Math.sign(j.dy);
        }
      }

      if (dx === 0 && dy === 0) return;

      const direction: Direction = dy < 0 ? 'up' : dy > 0 ? 'down' : dx < 0 ? 'left' : 'right';
      const nx = state.position.x + dx;
      const ny = state.position.y + dy;
      if (isWalkable(nx, ny)) {
        state.setPosition({ x: nx, y: ny }, direction);
      } else {
        state.setPosition(state.position, direction);
      }
    }, MOVE_INTERVAL_MS);

    return () => {
      window.removeEventListener('keydown', onKeyDown);
      window.removeEventListener('keyup', onKeyUp);
      clearInterval(timer);
    };
  }, []);
}
