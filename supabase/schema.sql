-- BETREIBERSTADT – Supabase Schema
-- Spieler-Profil
CREATE TABLE players (
  id UUID PRIMARY KEY REFERENCES auth.users(id),
  username TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  last_login TIMESTAMPTZ,
  login_streak INTEGER DEFAULT 0
);

-- Spielstand
CREATE TABLE game_progress (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  player_id UUID REFERENCES players(id),
  current_level INTEGER DEFAULT 1,
  total_xp INTEGER DEFAULT 0,
  skill_points_available INTEGER DEFAULT 0,
  skill_tree JSONB DEFAULT '{"jurist": 0, "techniker": 0, "manager": 0}',
  player_position JSONB DEFAULT '{"x": 10, "y": 10}',
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(player_id)
);

-- Gebäude-Fortschritt
CREATE TABLE building_progress (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  player_id UUID REFERENCES players(id),
  building_id TEXT NOT NULL,
  is_unlocked BOOLEAN DEFAULT FALSE,
  is_completed BOOLEAN DEFAULT FALSE,
  completion_percentage INTEGER DEFAULT 0,
  questions_answered JSONB DEFAULT '[]',
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(player_id, building_id)
);

-- Quests
CREATE TABLE quest_progress (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  player_id UUID REFERENCES players(id),
  quest_id TEXT NOT NULL,
  status TEXT DEFAULT 'locked', -- locked, available, active, completed
  answers JSONB DEFAULT '[]',
  started_at TIMESTAMPTZ,
  completed_at TIMESTAMPTZ,
  UNIQUE(player_id, quest_id)
);

-- Badges
CREATE TABLE player_badges (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  player_id UUID REFERENCES players(id),
  badge_id TEXT NOT NULL,
  earned_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(player_id, badge_id)
);

-- Leaderboard
CREATE TABLE leaderboard (
  player_id UUID REFERENCES players(id) PRIMARY KEY,
  username TEXT,
  total_xp INTEGER DEFAULT 0,
  badges_count INTEGER DEFAULT 0,
  completed_buildings INTEGER DEFAULT 0,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Row Level Security aktivieren für alle Tabellen
ALTER TABLE players ENABLE ROW LEVEL SECURITY;
ALTER TABLE game_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE building_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE quest_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE player_badges ENABLE ROW LEVEL SECURITY;
ALTER TABLE leaderboard ENABLE ROW LEVEL SECURITY;

-- RLS Policies (Spieler sehen nur ihre eigenen Daten)
CREATE POLICY "Players see own data" ON players FOR ALL USING (auth.uid() = id) WITH CHECK (auth.uid() = id);
CREATE POLICY "Players see own progress" ON game_progress FOR ALL USING (auth.uid() = player_id) WITH CHECK (auth.uid() = player_id);
CREATE POLICY "Players see own buildings" ON building_progress FOR ALL USING (auth.uid() = player_id) WITH CHECK (auth.uid() = player_id);
CREATE POLICY "Players see own quests" ON quest_progress FOR ALL USING (auth.uid() = player_id) WITH CHECK (auth.uid() = player_id);
CREATE POLICY "Players see own badges" ON player_badges FOR ALL USING (auth.uid() = player_id) WITH CHECK (auth.uid() = player_id);
CREATE POLICY "Leaderboard is public read" ON leaderboard FOR SELECT USING (true);
CREATE POLICY "Players update own leaderboard" ON leaderboard FOR INSERT WITH CHECK (auth.uid() = player_id);
CREATE POLICY "Players modify own leaderboard" ON leaderboard FOR UPDATE USING (auth.uid() = player_id) WITH CHECK (auth.uid() = player_id);

-- Automatisches Anlegen des Spieler-Profils bei Registrierung
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.players (id, username, last_login, login_streak)
  VALUES (NEW.id, COALESCE(NEW.raw_user_meta_data->>'username', split_part(NEW.email, '@', 1)), NOW(), 1)
  ON CONFLICT (id) DO NOTHING;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
