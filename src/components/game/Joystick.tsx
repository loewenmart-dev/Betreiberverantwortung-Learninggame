import { useRef, useState } from 'react';
import { inputState } from '../../lib/inputState';

const RADIUS = 48;

/** Virtueller Touch-Joystick (Mobile, unten links) */
export default function Joystick() {
  const baseRef = useRef<HTMLDivElement>(null);
  const [knob, setKnob] = useState({ x: 0, y: 0 });
  const activeTouch = useRef<number | null>(null);

  const update = (clientX: number, clientY: number) => {
    const base = baseRef.current;
    if (!base) return;
    const rect = base.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    let dx = clientX - cx;
    let dy = clientY - cy;
    const dist = Math.hypot(dx, dy);
    if (dist > RADIUS) {
      dx = (dx / dist) * RADIUS;
      dy = (dy / dist) * RADIUS;
    }
    setKnob({ x: dx, y: dy });
    inputState.joystick = { dx: dx / RADIUS, dy: dy / RADIUS };
  };

  const reset = () => {
    activeTouch.current = null;
    setKnob({ x: 0, y: 0 });
    inputState.joystick = { dx: 0, dy: 0 };
  };

  return (
    <div
      ref={baseRef}
      className="absolute bottom-6 left-6 z-30 md:hidden touch-none select-none"
      style={{ width: RADIUS * 2 + 24, height: RADIUS * 2 + 24 }}
      onTouchStart={(e) => {
        const t = e.changedTouches[0];
        activeTouch.current = t.identifier;
        update(t.clientX, t.clientY);
      }}
      onTouchMove={(e) => {
        for (const t of Array.from(e.changedTouches)) {
          if (t.identifier === activeTouch.current) update(t.clientX, t.clientY);
        }
      }}
      onTouchEnd={reset}
      onTouchCancel={reset}
    >
      <div className="absolute inset-0 rounded-full bg-primary/30 backdrop-blur-sm border-2 border-white/40" />
      <div
        className="absolute rounded-full bg-accent shadow-lg border-2 border-white/70"
        style={{
          width: 52,
          height: 52,
          left: `calc(50% - 26px + ${knob.x}px)`,
          top: `calc(50% - 26px + ${knob.y}px)`,
        }}
      />
    </div>
  );
}
