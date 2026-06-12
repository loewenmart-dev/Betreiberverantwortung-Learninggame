# 🏛️ BETREIBERSTADT – Die Stadt der Verantwortung

Ein Serious Game zur **Betreiberverantwortung technischer Anlagen**. Erkunde eine begehbare Stadt, schließe Quests in 11 Gebäuden ab, sammle XP, Skills und Badges – und verdiene dir am Ende dein PDF-Zertifikat.

## Features

- 🗺️ **Begehbare 20×20-Karte** (pure CSS/DOM, kein Canvas) mit WASD/Pfeiltasten (Desktop) und Touch-Joystick (Mobile)
- 🏠 **8 Hauptgebäude + 3 Geheim-/Spezialgebäude** mit Level-basiertem Lock/Unlock
- ❓ **5 Fragetypen**: Multiple Choice, Wahr/Falsch, Freitext (Schlüsselwörter), Reihenfolge, Fehler-finden
- 📖 **Fallstudien** mit realitätsnahen Szenarien pro Gebäude
- 💀 **Boss-Level „Die Ruine"**: Unfall-Analyse in 3 Akten (mit Zeitdruck)
- 🧩 **5 Sidequests** inkl. Timed-Challenge und Begehungs-Simulation
- ⭐ **XP- & Level-System** (7 Level), Login-Streak-Bonus
- 🌳 **Skill-Tree** mit 3 Spezialisierungen (Jurist / Techniker / Manager), max. 6 Punkte
- 🏅 **13 Badges** inkl. Speedrunner und Perfektionist
- 🏆 **Leaderboard** (Supabase)
- 📜 **PDF-Zertifikat-Export** (`@react-pdf/renderer`, lazy-loaded)
- 💾 **Auto-Save**: lokal (localStorage) + debounced Supabase-Sync (2 s)
- 📶 **Offline-fähig**: Spielinhalte funktionieren ohne Internet, Konto optional

## Tech Stack

React 18 · TypeScript · Tailwind CSS · Zustand · Framer Motion · Supabase (Auth + DB) · Vite · Cloudflare Pages

## Setup

```bash
npm install
cp .env.example .env   # Supabase-Daten eintragen (optional – ohne läuft der Offline-Modus)
npm run dev
```

### Supabase einrichten (optional, für Konten/Leaderboard)

1. Projekt auf [supabase.com](https://supabase.com) anlegen
2. SQL aus `supabase/schema.sql` im SQL-Editor ausführen
3. `VITE_SUPABASE_URL` und `VITE_SUPABASE_ANON_KEY` in `.env` setzen
4. Auth → E-Mail-Provider aktivieren (E-Mail/Passwort + Magic Link)

### Google OAuth (vorbereitet, nicht aktiv)

1. Google-Provider im Supabase-Dashboard konfigurieren
2. `VITE_GOOGLE_CLIENT_ID` in `.env` setzen
3. Code-Block in `src/lib/supabase.ts` einkommentieren und Button in `LoginScreen.tsx` aktivieren

## Deployment (Cloudflare Pages)

```bash
npm run build   # erzeugt dist/
```

Cloudflare Pages: Build command `npm run build`, Output directory `dist` (siehe `wrangler.toml`). ENV-Variablen `VITE_SUPABASE_URL` und `VITE_SUPABASE_ANON_KEY` im Pages-Dashboard hinterlegen.

## Steuerung

| Aktion | Desktop | Mobile |
|---|---|---|
| Bewegen | WASD / Pfeiltasten | Joystick unten links |
| Interagieren | E / Leertaste | Gebäude/NPC antippen |

## Projektstruktur

```
src/
  components/
    game/        Map, Player, Building, HUD, QuestLog, QuestFlow, Joystick
    ui/          LoginScreen, MainMenu, SkillTree, Badges, Leaderboard, Zertifikat
    questions/   QuestionCard (alle Fragetypen), CaseStudy
  hooks/         useGameState, usePlayer, useQuests, useSupabase
  lib/           supabase, gameData (alle Inhalte), xpSystem, syncService, mapUtils
  store/         gameStore (Zustand, persistiert)
  i18n/          de.ts (Mehrsprachigkeit vorbereitet)
  types/         game.types.ts
supabase/        schema.sql (Tabellen + RLS-Policies)
```

## Entscheidungen (Kurz-Doku)

- **Offline-Modus als Fallback**: Ohne Supabase-ENV läuft das Spiel vollständig lokal – so ist es ohne Backend sofort testbar.
- **Fragen-Wiederholung**: Falsch beantwortete Fragen können beim erneuten Gebäudebesuch nachgeholt werden; 100 % sind Voraussetzung für Gebäudeabschluss + Badge.
- **Bonusfragen** (Tier-3-Skills) zählen nicht zum Pflichtumfang, geben aber Extra-XP.
- **PDF-Chunk lazy**: `@react-pdf/renderer` (~1,4 MB) wird erst beim Öffnen des Zertifikats geladen.
