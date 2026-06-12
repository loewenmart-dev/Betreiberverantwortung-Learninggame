/**
 * Gemeinsamer Eingabe-Zustand für Tastatur und Touch-Joystick.
 * Der Bewegungs-Loop in usePlayer liest hieraus.
 */
export const inputState = {
  joystick: { dx: 0, dy: 0 },
};
