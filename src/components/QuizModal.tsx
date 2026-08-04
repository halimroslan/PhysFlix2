"use client";

import React, { useState } from "react";
import { X, CheckCircle2, AlertCircle, HelpCircle, Award } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

interface QuizQuestion {
  id: number;
  questionBm: string;
  questionDlp: string;
  optionsBm: string[];
  optionsDlp: string[];
  answer: number;
  explanationBm: string;
  explanationDlp: string;
}

const quizData: QuizQuestion[] = [
  {
    id: 1,
    questionBm: "Antara berikut, yang manakah merupakan kuantiti terbitan?",
    questionDlp: "Which of the following is a derived quantity?",
    optionsBm: ["Jisim", "Panjang", "Daya", "Masa"],
    optionsDlp: ["Mass", "Length", "Force", "Time"],
    answer: 2,
    explanationBm: "Daya (F = ma) ialah kuantiti terbitan kerana ia diterbitkan daripada gabungan kuantiti asas jisim, panjang, dan masa.",
    explanationDlp: "Force (F = ma) is a derived quantity as it is derived from base quantities mass, length, and time."
  },
  {
    questionBm: "Cahaya merambat dari air (n = 1.33) ke udara (n = 1.00). Apakah yang berlaku kepada laju cahaya?",
    questionDlp: "Light travels from water (n = 1.33) to air (n = 1.00). What happens to the speed of light?",
    id: 2,
    optionsBm: ["Berkurangan", "Bertambah", "Tidak berubah", "Menjadi sifar"],
    optionsDlp: ["Decreases", "Increases", "Remains unchanged", "Becomes zero"],
    answer: 1,
    explanationBm: "Medium kurang tumpat optik (udara) mempunyai indeks pembiasan lebih rendah, maka laju cahaya bertambah.",
    explanationDlp: "Less optically dense medium (air) has lower refractive index, so speed of light increases."
  },
  {
    id: 3,
    questionBm: "Seorang murid menolak dinding dengan daya 50 N tetapi dinding tidak bergerak. Berapakah kerja yang dilakukan?",
    questionDlp: "A student pushes a wall with a force of 50 N but the wall does not move. What is the work done?",
    optionsBm: ["50 J", "25 J", "0 J", "250 J"],
    optionsDlp: ["50 J", "25 J", "0 J", "250 J"],
    answer: 2,
    explanationBm: "Kerja (W = F × s). Kerana sesaran s = 0 m, maka kerja yang dilakukan ialah 0 J.",
    explanationDlp: "Work done (W = F × s). Since displacement s = 0 m, work done is 0 J."
  }
];

export const QuizModal: React.FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => {
  const { lang } = useLanguage();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);

  if (!isOpen) return null;

  const currentQ = quizData[currentIndex];

  const handleSelect = (idx: number) => {
    if (selectedOption !== null) return;
    setSelectedOption(idx);
    if (idx === currentQ.answer) {
      setScore((s) => s + 1);
    }
    setShowResult(true);
  };

  const handleNext = () => {
    if (currentIndex < quizData.length - 1) {
      setCurrentIndex((c) => c + 1);
      setSelectedOption(null);
      setShowResult(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4">
      <div className="relative w-full max-w-2xl bg-[#111622] border border-slate-700/60 rounded-2xl shadow-2xl flex flex-col overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-[#0d101a]">
          <div className="flex items-center space-x-3">
            <div className="w-9 h-9 rounded-xl bg-amber-600/20 border border-amber-500/30 flex items-center justify-center text-amber-400">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white">
                {lang === "bm" ? "Kuiz Interaktif Kertas 1 SPM" : "SPM Paper 1 Interactive Quiz"}
              </h2>
              <p className="text-xs text-slate-400">
                {lang === "bm"
                  ? `Soalan ${currentIndex + 1} daripada ${quizData.length}`
                  : `Question ${currentIndex + 1} of ${quizData.length}`}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          <div className="p-4 bg-[#171d2b] border border-slate-800 rounded-xl">
            <h3 className="text-base font-semibold text-slate-100">
              {lang === "bm" ? currentQ.questionBm : currentQ.questionDlp}
            </h3>
          </div>

          <div className="grid grid-cols-1 gap-3">
            {(lang === "bm" ? currentQ.optionsBm : currentQ.optionsDlp).map((opt, idx) => {
              let btnStyle = "bg-[#141926] border-slate-800 text-slate-300 hover:border-slate-600";
              if (selectedOption !== null) {
                if (idx === currentQ.answer) {
                  btnStyle = "bg-emerald-950/60 border-emerald-500 text-emerald-300 font-semibold";
                } else if (idx === selectedOption) {
                  btnStyle = "bg-red-950/60 border-red-500 text-red-300 font-semibold";
                }
              }

              return (
                <button
                  key={idx}
                  onClick={() => handleSelect(idx)}
                  disabled={selectedOption !== null}
                  className={`w-full p-3.5 rounded-xl border text-left text-sm transition flex items-center justify-between ${btnStyle}`}
                >
                  <span>
                    <strong className="mr-2">{String.fromCharCode(65 + idx)}.</strong>
                    {opt}
                  </span>
                  {selectedOption !== null && idx === currentQ.answer && (
                    <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                  )}
                  {selectedOption !== null && idx === selectedOption && idx !== currentQ.answer && (
                    <AlertCircle className="w-5 h-5 text-red-400" />
                  )}
                </button>
              );
            })}
          </div>

          {showResult && (
            <div className="p-4 bg-[#0e121d] border border-slate-800 rounded-xl space-y-2">
              <h4 className="text-xs font-bold text-amber-400 uppercase tracking-wider">
                {lang === "bm" ? "Penjelasan Fizik:" : "Physics Explanation:"}
              </h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                {lang === "bm" ? currentQ.explanationBm : currentQ.explanationDlp}
              </p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between px-6 py-4 border-t border-slate-800 bg-[#0d101a]">
          <span className="text-xs text-slate-400 font-medium">
            {lang === "bm" ? `Skor Semasa: ${score}` : `Current Score: ${score}`}
          </span>
          {currentIndex < quizData.length - 1 ? (
            <button
              onClick={handleNext}
              disabled={selectedOption === null}
              className="px-5 py-2 rounded-xl bg-red-600 hover:bg-red-500 disabled:opacity-50 text-white font-semibold text-xs transition"
            >
              {lang === "bm" ? "Soalan Seterusnya →" : "Next Question →"}
            </button>
          ) : (
            <button
              onClick={onClose}
              className="px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs transition"
            >
              {lang === "bm" ? "Selesai Kuiz" : "Complete Quiz"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
