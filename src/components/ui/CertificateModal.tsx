import { lazy, Suspense, useState } from 'react';
import { motion } from 'framer-motion';
import { X, Lock } from 'lucide-react';
import { useGameStore } from '../../store/gameStore';
import { de } from '../../i18n/de';

// PDF-Renderer ist groß → nur laden, wenn das Zertifikat wirklich gebraucht wird
const CertificateDownload = lazy(() => import('./CertificatePDF'));

export default function CertificateModal({ onClose }: { onClose: () => void }) {
  const username = useGameStore((s) => s.username);
  const badges = useGameStore((s) => s.badges);
  const completed = useGameStore((s) => s.buildingCompleted);
  const [name, setName] = useState(username);

  const eligible = Boolean(completed['buergermeisteramt']);

  return (
    <div className="absolute inset-0 z-40 bg-black/50 flex items-center justify-center p-4" onClick={onClose}>
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-surface rounded-2xl shadow-2xl w-full max-w-sm p-6"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-extrabold text-primary">📜 {de.certificate.title}</h2>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600"><X /></button>
        </div>

        {eligible ? (
          <div className="space-y-3">
            <p className="text-sm text-slate-600">
              Herzlichen Glückwunsch! Du hast Betreiberstadt gemeistert. Lade dein persönliches Zertifikat herunter:
            </p>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder={de.certificate.namePlaceholder}
              className="w-full border-2 border-slate-200 rounded-xl px-3 py-2.5 text-sm focus:border-accent focus:outline-none"
            />
            <Suspense fallback={<div className="text-center text-sm text-slate-400 py-3 animate-pulse">Lade PDF-Modul…</div>}>
              {name.trim() && <CertificateDownload name={name.trim()} badgeIds={badges} />}
            </Suspense>
          </div>
        ) : (
          <div className="text-center py-6">
            <Lock className="mx-auto text-slate-300 mb-3" size={40} />
            <p className="text-sm text-slate-500">{de.certificate.notYet}</p>
          </div>
        )}
      </motion.div>
    </div>
  );
}
