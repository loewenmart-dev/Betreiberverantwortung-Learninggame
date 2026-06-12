import { useEffect, useMemo, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, XCircle, Timer, Scale, Wrench } from 'lucide-react';
import type { Question } from '../../types/game.types';
import { useGameStore } from '../../store/gameStore';
import { de } from '../../i18n/de';

interface Props {
  question: Question;
  /** Kontext für Skill-Effekte (z. B. 'gerichtssaal' → Jurist-Zeitbonus) */
  buildingId?: string;
  /** Hinweise unterdrücken (Sidequest „Der alte Hausmeister") */
  noHints?: boolean;
  onDone: (correct: boolean, xpEarned: number) => void;
}

type Phase = 'answering' | 'retry' | 'solved' | 'failed';

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

/** Quiz-Komponente für alle Stationen: MC, Wahr/Falsch, Freitext, Reihenfolge, Fehler-finden */
export default function QuestionCard({ question, buildingId, noHints, onDone }: Props) {
  const recordAnswer = useGameStore((s) => s.recordAnswer);
  const skills = useGameStore((s) => s.skills);

  const [phase, setPhase] = useState<Phase>('answering');
  const [selected, setSelected] = useState<number | null>(null);
  const [multiSelected, setMultiSelected] = useState<number[]>([]);
  const [orderSequence, setOrderSequence] = useState<number[]>([]);
  const [freeText, setFreeText] = useState('');
  const [xpEarned, setXpEarned] = useState(0);

  // Skill-Effekte: Jurist T2 = +50 % Zeit bei Rechtsfragen, Manager T2 = +30 % bei Zeitlimit-Fragen
  const timeLimit = useMemo(() => {
    if (!question.timeLimit) return 0;
    let t = question.timeLimit;
    if (skills.manager >= 2) t *= 1.3;
    if (skills.jurist >= 2 && buildingId === 'gerichtssaal') t *= 1.5;
    return Math.round(t);
  }, [question, skills, buildingId]);

  const [timeLeft, setTimeLeft] = useState(timeLimit);
  const phaseRef = useRef(phase);
  phaseRef.current = phase;

  useEffect(() => {
    if (!timeLimit) return;
    setTimeLeft(timeLimit);
    const t = setInterval(() => {
      setTimeLeft((s) => {
        if (s <= 1) {
          clearInterval(t);
          if (phaseRef.current === 'answering' || phaseRef.current === 'retry') {
            recordAnswer(question.id, false);
            recordAnswer(question.id, false);
            setPhase('failed');
          }
          return 0;
        }
        return s - 1;
      });
    }, 1000);
    return () => clearInterval(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [question.id, timeLimit]);

  const shuffledOrder = useMemo(
    () => (question.orderItems ? shuffle(question.orderItems.map((_, i) => i)) : []),
    [question]
  );

  const evaluate = (): boolean => {
    switch (question.type) {
      case 'multiple-choice':
      case 'true-false':
        return selected !== null && Boolean(question.options?.[selected]?.correct);
      case 'find-errors': {
        const correctIdx = (question.options ?? [])
          .map((o, i) => (o.correct ? i : -1))
          .filter((i) => i >= 0);
        return (
          multiSelected.length === correctIdx.length && correctIdx.every((i) => multiSelected.includes(i))
        );
      }
      case 'order':
        return orderSequence.every((origIdx, pos) => origIdx === pos);
      case 'free-text': {
        const text = freeText.toLowerCase();
        const hits = (question.keywords ?? []).filter((k) => text.includes(k.toLowerCase()));
        return hits.length >= Math.min(2, question.keywords?.length ?? 1);
      }
    }
  };

  const handleCheck = () => {
    const correct = evaluate();
    const xp = recordAnswer(question.id, correct);
    if (correct) {
      setXpEarned(xp);
      setPhase('solved');
    } else if (phase === 'answering') {
      setPhase('retry');
      setSelected(null);
      setMultiSelected([]);
      setOrderSequence([]);
    } else {
      setPhase('failed');
    }
  };

  const hasInput =
    (question.type === 'multiple-choice' || question.type === 'true-false') ? selected !== null
    : question.type === 'find-errors' ? multiSelected.length === (question.selectCount ?? 0)
    : question.type === 'order' ? orderSequence.length === (question.orderItems?.length ?? 0)
    : freeText.trim().length > 2;

  const finished = phase === 'solved' || phase === 'failed';
  const showLawHint = !noHints && skills.jurist >= 1 && question.lawHint;
  const showHint = !noHints && (skills.techniker >= 1 || skills.manager >= 1) && question.hint;

  return (
    <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} className="space-y-4">
      {timeLimit > 0 && !finished && (
        <div className={`flex items-center gap-2 font-bold text-sm ${timeLeft <= 10 ? 'text-danger' : 'text-primary'}`}>
          <Timer size={16} />
          {de.quest.timeLeft}: {Math.floor(timeLeft / 60)}:{String(timeLeft % 60).padStart(2, '0')}
        </div>
      )}

      <p className="font-semibold text-primary text-base leading-snug">
        {question.bonusSkill && (
          <span className="inline-block bg-accent/20 text-accent text-[10px] font-bold uppercase px-1.5 py-0.5 rounded mr-2">
            {de.quest.bonusQuestion}
          </span>
        )}
        {question.text}
      </p>

      {showLawHint && (
        <div className="flex gap-2 items-start text-xs bg-indigo-50 border border-indigo-200 text-indigo-800 rounded-lg p-2.5">
          <Scale size={14} className="shrink-0 mt-0.5" />
          <div><b>{de.quest.lawHintLabel}:</b> {question.lawHint}</div>
        </div>
      )}
      {showHint && (
        <div className="flex gap-2 items-start text-xs bg-amber-50 border border-amber-200 text-amber-800 rounded-lg p-2.5">
          <Wrench size={14} className="shrink-0 mt-0.5" />
          <div><b>{de.quest.hintLabel}:</b> {question.hint}</div>
        </div>
      )}

      {/* Antwort-Eingabe je nach Fragetyp */}
      {(question.type === 'multiple-choice' || question.type === 'true-false') && (
        <div className="space-y-2">
          {question.options?.map((opt, i) => (
            <button
              key={i}
              disabled={finished}
              onClick={() => setSelected(i)}
              className={`w-full text-left px-4 py-2.5 rounded-xl border-2 text-sm transition-colors ${
                finished && opt.correct
                  ? 'border-success bg-success/10 font-semibold'
                  : finished && selected === i && !opt.correct
                    ? 'border-danger bg-danger/10'
                    : selected === i
                      ? 'border-accent bg-accent/10 font-semibold'
                      : 'border-slate-200 bg-white hover:border-accent/50'
              }`}
            >
              {opt.text}
            </button>
          ))}
        </div>
      )}

      {question.type === 'find-errors' && (
        <div className="space-y-2">
          <p className="text-xs text-slate-500">{de.quest.findErrorsHint(question.selectCount ?? 0)}</p>
          {question.options?.map((opt, i) => {
            const isSel = multiSelected.includes(i);
            return (
              <button
                key={i}
                disabled={finished}
                onClick={() =>
                  setMultiSelected((cur) =>
                    isSel
                      ? cur.filter((x) => x !== i)
                      : cur.length < (question.selectCount ?? 99)
                        ? [...cur, i]
                        : cur
                  )
                }
                className={`w-full text-left px-4 py-2.5 rounded-xl border-2 text-sm transition-colors ${
                  finished && opt.correct
                    ? 'border-success bg-success/10 font-semibold'
                    : finished && isSel && !opt.correct
                      ? 'border-danger bg-danger/10'
                      : isSel
                        ? 'border-accent bg-accent/10 font-semibold'
                        : 'border-slate-200 bg-white hover:border-accent/50'
                }`}
              >
                {isSel ? '☑ ' : '☐ '}{opt.text}
              </button>
            );
          })}
          <p className="text-xs font-semibold text-slate-400">
            {multiSelected.length}/{question.selectCount} ausgewählt
          </p>
        </div>
      )}

      {question.type === 'order' && (
        <div className="space-y-2">
          <p className="text-xs text-slate-500">{de.quest.orderHint}</p>
          {orderSequence.length > 0 && (
            <ol className="space-y-1">
              {orderSequence.map((origIdx, pos) => (
                <li key={origIdx} className={`text-sm px-3 py-2 rounded-lg border ${
                  finished
                    ? origIdx === pos
                      ? 'border-success bg-success/10'
                      : 'border-danger bg-danger/10'
                    : 'border-accent/40 bg-accent/5'
                }`}>
                  <b>{pos + 1}.</b> {question.orderItems?.[origIdx]}
                </li>
              ))}
            </ol>
          )}
          {!finished && (
            <>
              <div className="space-y-1.5">
                {shuffledOrder
                  .filter((i) => !orderSequence.includes(i))
                  .map((i) => (
                    <button
                      key={i}
                      onClick={() => setOrderSequence((cur) => [...cur, i])}
                      className="w-full text-left px-4 py-2 rounded-xl border-2 border-slate-200 bg-white hover:border-accent/50 text-sm"
                    >
                      {question.orderItems?.[i]}
                    </button>
                  ))}
              </div>
              {orderSequence.length > 0 && (
                <button onClick={() => setOrderSequence([])} className="text-xs text-slate-500 underline">
                  Zurücksetzen
                </button>
              )}
            </>
          )}
          {phase === 'failed' && question.orderItems && (
            <div className="text-xs bg-slate-100 rounded-lg p-2.5">
              <b>Richtige Reihenfolge:</b>
              <ol className="list-decimal ml-4 mt-1 space-y-0.5">
                {question.orderItems.map((item, i) => <li key={i}>{item}</li>)}
              </ol>
            </div>
          )}
        </div>
      )}

      {question.type === 'free-text' && (
        <textarea
          value={freeText}
          disabled={finished}
          onChange={(e) => setFreeText(e.target.value)}
          placeholder={de.quest.freeTextPlaceholder}
          rows={3}
          className="w-full border-2 border-slate-200 rounded-xl p-3 text-sm focus:border-accent focus:outline-none"
        />
      )}

      {/* Feedback */}
      {phase === 'retry' && (
        <div className="flex items-center gap-2 text-danger font-semibold text-sm">
          <XCircle size={18} /> {de.quest.wrong} {de.quest.tryAgain}
        </div>
      )}
      {phase === 'solved' && (
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-success font-bold">
            <CheckCircle2 size={20} /> {de.quest.correct} {xpEarned > 0 && <span className="text-accent">+{xpEarned} XP</span>}
          </div>
          <div className="text-sm bg-success/10 border border-success/30 rounded-lg p-3 text-slate-700">
            <b>{de.quest.explanation}:</b> {question.explanation}
          </div>
        </div>
      )}
      {phase === 'failed' && (
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-danger font-bold">
            <XCircle size={20} /> {timeLeft === 0 && timeLimit > 0 ? de.quest.timeUp : de.quest.wrong}
          </div>
          <div className="text-sm bg-slate-100 border border-slate-200 rounded-lg p-3 text-slate-700">
            <b>{de.quest.explanation}:</b> {question.explanation}
          </div>
        </div>
      )}

      {/* Aktionen */}
      {!finished ? (
        <button
          onClick={handleCheck}
          disabled={!hasInput}
          className="w-full bg-primary text-white font-bold py-3 rounded-xl disabled:opacity-40 hover:bg-primary/90 transition-colors"
        >
          {de.quest.check}
        </button>
      ) : (
        <button
          onClick={() => onDone(phase === 'solved', xpEarned)}
          className="w-full bg-accent text-primary font-bold py-3 rounded-xl hover:bg-accent/90 transition-colors"
        >
          {de.quest.next} →
        </button>
      )}
    </motion.div>
  );
}
