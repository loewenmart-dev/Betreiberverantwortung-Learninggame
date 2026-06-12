import { useState } from 'react';
import { motion } from 'framer-motion';
import { FileText } from 'lucide-react';
import type { CaseStudyData } from '../../types/game.types';
import QuestionCard from './QuestionCard';
import { de } from '../../i18n/de';

interface Props {
  caseStudy: CaseStudyData;
  buildingId: string;
  onQuestionDone: (questionId: string, correct: boolean) => void;
  onComplete: () => void;
}

/** Fallstudie: Szenario-Text + Folgefragen */
export default function CaseStudy({ caseStudy, buildingId, onQuestionDone, onComplete }: Props) {
  const [step, setStep] = useState(-1); // -1 = Szenario lesen

  if (step === -1) {
    return (
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
        <div className="flex items-center gap-2 text-primary font-extrabold text-lg">
          <FileText /> {de.quest.caseStudy}
        </div>
        <p className="text-xs text-slate-500">{de.quest.caseStudyIntro}</p>
        <div className="bg-amber-50 border-l-4 border-accent rounded-r-xl p-4 text-sm leading-relaxed text-slate-800 italic">
          {caseStudy.scenario}
        </div>
        <button
          onClick={() => setStep(0)}
          className="w-full bg-primary text-white font-bold py-3 rounded-xl hover:bg-primary/90"
        >
          {de.quest.next} →
        </button>
      </motion.div>
    );
  }

  const question = caseStudy.questions[step];
  return (
    <div className="space-y-3">
      <details className="text-xs text-slate-500 bg-slate-50 rounded-lg p-2">
        <summary className="cursor-pointer font-semibold">📄 Szenario erneut lesen</summary>
        <p className="mt-2 italic leading-relaxed">{caseStudy.scenario}</p>
      </details>
      <div className="text-xs font-bold uppercase tracking-wide text-slate-400">
        {de.quest.caseStudy} – {de.quest.question} {step + 1} {de.quest.of} {caseStudy.questions.length}
      </div>
      <QuestionCard
        key={question.id}
        question={question}
        buildingId={buildingId}
        onDone={(correct) => {
          onQuestionDone(question.id, correct);
          if (step + 1 < caseStudy.questions.length) setStep(step + 1);
          else onComplete();
        }}
      />
    </div>
  );
}
