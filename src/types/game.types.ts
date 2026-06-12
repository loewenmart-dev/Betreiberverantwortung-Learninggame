export type QuestionType =
  | 'multiple-choice'
  | 'true-false'
  | 'free-text'
  | 'order'
  | 'find-errors';

export interface QuestionOption {
  text: string;
  correct: boolean;
}

export interface Question {
  id: string;
  type: QuestionType;
  text: string;
  /** Multiple-Choice / Wahr-Falsch / Fehler-finden */
  options?: QuestionOption[];
  /** Reihenfolge-Aufgaben: Items in korrekter Reihenfolge */
  orderItems?: string[];
  /** Freitext: Schlüsselwörter, die Punkte geben */
  keywords?: string[];
  /** Fehler-finden: wie viele Optionen müssen ausgewählt werden */
  selectCount?: number;
  explanation: string;
  /** Hinweis (Skill: Techniker Tier 2) */
  hint?: string;
  /** Gesetzestext-Hinweis (Skill: Jurist Tier 1) */
  lawHint?: string;
  /** Zeitlimit in Sekunden (0 = kein Limit) */
  timeLimit?: number;
  /** Bonusfrage – nur mit entsprechendem Tier-3-Skill sichtbar */
  bonusSkill?: SkillBranch;
}

export interface CaseStudyData {
  scenario: string;
  questions: Question[];
}

export type BuildingId =
  | 'rathaus'
  | 'grundschule'
  | 'krankenhaus'
  | 'gerichtssaal'
  | 'fabrik'
  | 'feuerwache'
  | 'elektrowerk'
  | 'baustelle'
  | 'geheimbibliothek'
  | 'ruine'
  | 'buergermeisteramt';

export interface BuildingData {
  id: BuildingId;
  name: string;
  emoji: string;
  theme: string;
  description: string;
  /** Level ab dem das Gebäude offen ist (0 = Start) */
  unlockLevel: number;
  /** Spezialfälle: Sidequest- oder Abschluss-Freischaltung */
  unlockSpecial?: 'sidequest-hausmeister' | 'all-main-buildings';
  position: { x: number; y: number };
  size: { w: number; h: number };
  npcName: string;
  npcIntro: string;
  npcOutro: string;
  questions: Question[];
  caseStudy?: CaseStudyData;
  color: string;
}

export type SkillBranch = 'jurist' | 'techniker' | 'manager';

export interface SkillTier {
  tier: 1 | 2 | 3;
  name: string;
  description: string;
}

export interface SkillBranchData {
  id: SkillBranch;
  name: string;
  icon: string;
  tiers: SkillTier[];
}

export type QuestStatus = 'locked' | 'available' | 'active' | 'completed';

export interface SidequestData {
  id: string;
  name: string;
  description: string;
  /** Level-Voraussetzung */
  unlockLevel: number;
  /** Gebäude, das vorher abgeschlossen sein muss */
  requiresBuilding?: BuildingId;
  position: { x: number; y: number };
  npcName: string;
  npcIntro: string;
  questions: Question[];
  /** Gesamtzeitlimit in Sekunden (Timed Challenge) */
  totalTimeLimit?: number;
  xpReward: number;
  badgeReward?: string;
  emoji: string;
}

export interface BadgeData {
  id: string;
  emoji: string;
  name: string;
  condition: string;
}

export interface BuildingProgress {
  buildingId: BuildingId;
  isCompleted: boolean;
  completionPercentage: number;
  /** IDs der korrekt beantworteten Fragen */
  answeredCorrectly: string[];
}

export interface AnswerRecord {
  questionId: string;
  attempts: number;
  correct: boolean;
}

export interface PlayerPosition {
  x: number;
  y: number;
}

export type Direction = 'up' | 'down' | 'left' | 'right';

export interface DecorationData {
  type: 'tree' | 'lantern' | 'bench' | 'bush' | 'flowers';
  x: number;
  y: number;
}
