import { useEffect, useMemo, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Timer } from 'lucide-react';
import { useGameStore, markQuestionAnswered, buildingCompletionPercent } from '../../store/gameStore';
import { BUILDINGS, SIDEQUESTS } from '../../lib/gameData';
import QuestionCard from '../questions/QuestionCard';
import CaseStudy from '../questions/CaseStudy';
import { de } from '../../i18n/de';

type Phase = 'intro' | 'questions' | 'casestudy' | 'outro' | 'failed';

/** Dialog-/Quiz-Ablauf für Hauptquests (Gebäude) und Sidequests */
export default function QuestFlow() {
  const activeQuest = useGameStore((s) => s.activeQuest);
  const closeQuest = useGameStore((s) => s.closeQuest);

  if (!activeQuest) return null;
  return (
    <div className="absolute inset-0 z-50 bg-black/60 flex items-center justify-center p-3 sm:p-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-surface rounded-2xl shadow-2xl w-full max-w-xl max-h-[92vh] overflow-y-auto"
      >
        {activeQuest.kind === 'building' ? (
          <BuildingQuest buildingId={activeQuest.id} onClose={closeQuest} />
        ) : (
          <SidequestRun sidequestId={activeQuest.id} onClose={closeQuest} />
        )}
      </motion.div>
    </div>
  );
}

function Header({ emoji, title, subtitle, onClose }: { emoji: string; title: string; subtitle?: string; onClose: () => void }) {
  return (
    <div className="sticky top-0 bg-primary text-white px-5 py-3.5 rounded-t-2xl flex items-center gap-3 z-10">
      <span className="text-2xl">{emoji}</span>
      <div className="flex-1 min-w-0">
        <h2 className="font-extrabold leading-tight">{title}</h2>
        {subtitle && <p className="text-xs text-white/70 truncate">{subtitle}</p>}
      </div>
      <button onClick={onClose} className="text-white/70 hover:text-white" title={de.quest.abort}>
        <X />
      </button>
    </div>
  );
}

function NpcDialog({ npcName, text, buttonLabel, onNext }: { npcName: string; text: string; buttonLabel: string; onNext: () => void }) {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
      <div className="flex items-start gap-3">
        <div className="w-12 h-12 rounded-full bg-accent/20 flex items-center justify-center text-2xl shrink-0">🧑‍💼</div>
        <div className="bg-white border border-slate-200 rounded-2xl rounded-tl-none p-4 shadow-sm">
          <div className="text-xs font-bold text-accent mb-1">{npcName}</div>
          <p className="text-sm text-slate-700 leading-relaxed">{text}</p>
        </div>
      </div>
      <button onClick={onNext} className="w-full bg-primary text-white font-bold py-3 rounded-xl hover:bg-primary/90">
        {buttonLabel}
      </button>
    </motion.div>
  );
}

// ── Hauptquest (Gebäude) ─────────────────────────────────────────

function BuildingQuest({ buildingId, onClose }: { buildingId: string; onClose: () => void }) {
  const building = BUILDINGS.find((b) => b.id === buildingId)!;
  const skills = useGameStore((s) => s.skills);
  const buildingAnswers = useGameStore((s) => s.buildingAnswers);
  const completeBuilding = useGameStore((s) => s.completeBuilding);

  // Bereits korrekt beantwortete Fragen werden beim erneuten Besuch übersprungen,
  // Bonusfragen nur mit Tier-3-Skill angezeigt
  const answered = useMemo(() => buildingAnswers[buildingId] ?? [], [buildingAnswers, buildingId]);
  const openQuestions = useMemo(
    () =>
      building.questions.filter(
        (q) => !answered.includes(q.id) && (!q.bonusSkill || skills[q.bonusSkill] >= 3)
      ),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [building]
  );
  const openCaseQuestions = useMemo(
    () => (building.caseStudy ? building.caseStudy.questions.filter((q) => !answered.includes(q.id)) : []),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [building]
  );

  const [phase, setPhase] = useState<Phase>('intro');
  const [qIndex, setQIndex] = useState(0);

  const finishRun = () => {
    const state = useGameStore.getState();
    const percent = buildingCompletionPercent(building, state.buildingAnswers);
    if (percent >= 100) completeBuilding(buildingId);
    setPhase('outro');
  };

  const handleQuestionDone = (questionId: string, correct: boolean) => {
    if (correct) markQuestionAnswered(buildingId, questionId);
    if (qIndex + 1 < openQuestions.length) {
      setQIndex(qIndex + 1);
    } else if (openCaseQuestions.length > 0) {
      setPhase('casestudy');
    } else {
      finishRun();
    }
  };

  const percentNow = buildingCompletionPercent(building, useGameStore.getState().buildingAnswers);

  return (
    <>
      <Header emoji={building.emoji} title={building.name} subtitle={building.theme} onClose={onClose} />
      <div className="p-5">
        <AnimatePresence mode="wait">
          {phase === 'intro' && (
            <NpcDialog
              key="intro"
              npcName={building.npcName}
              text={building.npcIntro}
              buttonLabel={
                openQuestions.length + openCaseQuestions.length === 0
                  ? de.quest.close
                  : answered.length > 0
                    ? de.quest.continue
                    : de.quest.start
              }
              onNext={() => {
                if (openQuestions.length > 0) setPhase('questions');
                else if (openCaseQuestions.length > 0) setPhase('casestudy');
                else onClose();
              }}
            />
          )}

          {phase === 'questions' && (
            <div key={openQuestions[qIndex].id}>
              <div className="text-xs font-bold uppercase tracking-wide text-slate-400 mb-3">
                {de.quest.question} {qIndex + 1} {de.quest.of} {openQuestions.length}
              </div>
              <QuestionCard
                question={openQuestions[qIndex]}
                buildingId={buildingId}
                onDone={(correct) => handleQuestionDone(openQuestions[qIndex].id, correct)}
              />
            </div>
          )}

          {phase === 'casestudy' && building.caseStudy && (
            <CaseStudy
              key="case"
              caseStudy={{ ...building.caseStudy, questions: openCaseQuestions }}
              buildingId={buildingId}
              onQuestionDone={(qid, correct) => {
                if (correct) markQuestionAnswered(buildingId, qid);
              }}
              onComplete={finishRun}
            />
          )}

          {phase === 'outro' && (
            <motion.div key="outro" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
              {percentNow >= 100 ? (
                <>
                  <div className="text-center text-5xl">🎉</div>
                  <h3 className="text-center text-xl font-extrabold text-success">{de.quest.buildingComplete}</h3>
                  <NpcDialog
                    npcName={building.npcName}
                    text={building.npcOutro}
                    buttonLabel={de.quest.close}
                    onNext={onClose}
                  />
                </>
              ) : (
                <>
                  <h3 className="text-center text-lg font-extrabold text-primary">{de.quest.questComplete}</h3>
                  <p className="text-sm text-slate-600 text-center">
                    Fortschritt: <b>{percentNow}%</b> – Komm zurück und beantworte die offenen Fragen richtig, um
                    das Gebäude zu 100&nbsp;% abzuschließen!
                  </p>
                  <button onClick={onClose} className="w-full bg-primary text-white font-bold py-3 rounded-xl">
                    {de.quest.close}
                  </button>
                </>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
}

// ── Sidequest ────────────────────────────────────────────────────

function SidequestRun({ sidequestId, onClose }: { sidequestId: string; onClose: () => void }) {
  const sidequest = SIDEQUESTS.find((s) => s.id === sidequestId)!;
  const completeSidequest = useGameStore((s) => s.completeSidequest);

  const [phase, setPhase] = useState<Phase>('intro');
  const [qIndex, setQIndex] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const startTime = useRef<number>(0);
  const [timeLeft, setTimeLeft] = useState(sidequest.totalTimeLimit ?? 0);
  const phaseRef = useRef(phase);
  phaseRef.current = phase;

  // Gesamt-Timer für Timed-Challenges („Nachts in der Feuerwache")
  useEffect(() => {
    if (!sidequest.totalTimeLimit || phase !== 'questions') return;
    const t = setInterval(() => {
      setTimeLeft((s) => {
        if (s <= 1) {
          clearInterval(t);
          if (phaseRef.current === 'questions') setPhase('failed');
          return 0;
        }
        return s - 1;
      });
    }, 1000);
    return () => clearInterval(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phase === 'questions']);

  const requiredCorrect = sidequestId === 'hausmeister' ? sidequest.questions.length : Math.ceil(sidequest.questions.length * 0.7);

  const handleDone = (correct: boolean) => {
    const newCorrect = correctCount + (correct ? 1 : 0);
    setCorrectCount(newCorrect);
    // Beim Hausmeister bedeutet jeder Fehler das sofortige Aus
    if (sidequestId === 'hausmeister' && !correct) {
      setPhase('failed');
      return;
    }
    if (qIndex + 1 < sidequest.questions.length) {
      setQIndex(qIndex + 1);
    } else if (newCorrect >= requiredCorrect) {
      const elapsed = (Date.now() - startTime.current) / 1000;
      completeSidequest(sidequestId, elapsed);
      setPhase('outro');
    } else {
      setPhase('failed');
    }
  };

  return (
    <>
      <Header emoji={sidequest.emoji} title={sidequest.name} subtitle="Sidequest" onClose={onClose} />
      <div className="p-5">
        {sidequest.totalTimeLimit && phase === 'questions' && (
          <div className={`flex items-center gap-2 font-extrabold mb-3 ${timeLeft <= 30 ? 'text-danger' : 'text-primary'}`}>
            <Timer size={18} /> {Math.floor(timeLeft / 60)}:{String(timeLeft % 60).padStart(2, '0')}
          </div>
        )}
        <AnimatePresence mode="wait">
          {phase === 'intro' && (
            <NpcDialog
              key="intro"
              npcName={sidequest.npcName}
              text={sidequest.npcIntro}
              buttonLabel={de.quest.start}
              onNext={() => {
                startTime.current = Date.now();
                setPhase('questions');
              }}
            />
          )}

          {phase === 'questions' && (
            <div key={sidequest.questions[qIndex].id}>
              <div className="text-xs font-bold uppercase tracking-wide text-slate-400 mb-3">
                {de.quest.question} {qIndex + 1} {de.quest.of} {sidequest.questions.length}
              </div>
              <QuestionCard
                question={sidequest.questions[qIndex]}
                noHints={sidequestId === 'hausmeister'}
                onDone={handleDone}
              />
            </div>
          )}

          {phase === 'outro' && (
            <motion.div key="outro" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4 text-center">
              <div className="text-5xl">🏅</div>
              <h3 className="text-xl font-extrabold text-success">{de.quest.questComplete}</h3>
              <p className="text-sm text-slate-600">
                {de.quest.reward}: <b className="text-accent">+{sidequest.xpReward} XP</b>
                {sidequestId === 'hausmeister' && <span> · 🗝️ Die Geheimbibliothek ist nun zugänglich!</span>}
              </p>
              <button onClick={onClose} className="w-full bg-accent text-primary font-bold py-3 rounded-xl">
                {de.quest.close}
              </button>
            </motion.div>
          )}

          {phase === 'failed' && (
            <motion.div key="failed" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4 text-center">
              <div className="text-5xl">😞</div>
              <h3 className="text-xl font-extrabold text-danger">
                {sidequest.totalTimeLimit && timeLeft === 0 ? de.quest.timeUp : 'Nicht bestanden!'}
              </h3>
              <p className="text-sm text-slate-600">
                {correctCount} von {sidequest.questions.length} richtig (benötigt: {requiredCorrect}). Versuch es erneut!
              </p>
              <button onClick={onClose} className="w-full bg-primary text-white font-bold py-3 rounded-xl">
                {de.quest.close}
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
}
