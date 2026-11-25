import { useUserActivity } from "@/context/UserActivityContext";
import React, { useState } from "react";
import quizDataRaw from "../data/quizData.json";
import { CheckCircle, XCircle, ArrowRight, Brain } from "lucide-react";

// The shape of our quiz data json
type QuizQuestion = {
  id: string;
  number: number;
  chapter: string;
  sk: string;
  source: string;
  text: string;
  images: string[];
  options: string[];
  answer: string | null;
  ulasan: string | null;
};

type QuizDataMap = {
  [key: string]: QuizQuestion[];
};

const quizData = quizDataRaw as QuizDataMap;

interface QuizComponentProps {
  currentLesson: {
    id: string;
    week: string;
    titleBm: string;
  };
}

export default function QuizComponent({ currentLesson }: QuizComponentProps) {
  const { recordQuizResult } = useUserActivity();
  // Extract the standard kandungan title, e.g. "1.1 Kuantiti Fizik"
  const skKey = currentLesson.titleBm;
  const questions = quizData[skKey] || [];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [showAnswer, setShowAnswer] = useState(false);
  const [score, setScore] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  // State is automatically reset when remounted due to key prop in VideoPlayerView

  if (questions.length === 0) {
    return (
      <div className="p-8 rounded-2xl bg-[#111624] border border-slate-800 flex flex-col items-center justify-center text-center space-y-4">
        <div className="w-16 h-16 rounded-full bg-slate-800 flex items-center justify-center">
          <Brain className="w-8 h-8 text-slate-400" />
        </div>
        <div>
          <h3 className="text-lg font-bold text-white mb-2">Tiada Kuiz Tersedia</h3>
          <p className="text-sm text-slate-400 max-w-sm">
            Topik <span className="font-semibold text-slate-300">{skKey}</span> belum mempunyai soalan uji minda buat masa ini.
          </p>
        </div>
      </div>
    );
  }

  if (isFinished) {
    const percentage = Math.round((score / questions.length) * 100);
    let message = "Berusaha lagi!";
    if (percentage >= 80) message = "Cemerlang!";
    else if (percentage >= 50) message = "Baik, teruskan usaha!";

    return (
      <div className="p-8 rounded-2xl bg-[#111624] border border-slate-800 flex flex-col items-center justify-center text-center space-y-6">
        <div className="w-20 h-20 rounded-full bg-blue-500/10 flex items-center justify-center">
          <div className="text-3xl font-black text-blue-400">{percentage}%</div>
        </div>
        <div>
          <h3 className="text-xl font-bold text-white mb-2">Kuiz Tamat!</h3>
          <p className="text-sm text-slate-400">
            Anda berjaya menjawab <span className="font-bold text-white">{score}</span> daripada <span className="font-bold text-white">{questions.length}</span> soalan dengan betul.
          </p>
          <p className="text-sm font-semibold text-blue-400 mt-2">{message}</p>
        </div>
        <button
          onClick={() => {
            setCurrentIndex(0);
            setSelectedOption(null);
            setShowAnswer(false);
            setScore(0);
            setIsFinished(false);
          }}
          className="px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-xl transition-all"
        >
          Cuba Semula
        </button>
      </div>
    );
  }

  const q = questions[currentIndex];
  const isCorrect = selectedOption === q.answer;

  const handleSelectOption = (opt: string) => {
    if (showAnswer) return; // Prevent changing answer
    setSelectedOption(opt);
    setShowAnswer(true);
    if (opt === q.answer) {
      setScore(s => s + 1);
    }
  };

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(c => c + 1);
      setSelectedOption(null);
      setShowAnswer(false);
    } else {
      recordQuizResult(currentLesson.id, score, questions.length);
      setIsFinished(true);
    }
  };

  return (
    <div className="p-6 rounded-2xl bg-[#111624] border border-slate-800 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-800 pb-4">
        <div>
          <h3 className="text-sm font-bold text-white flex items-center gap-2">
            <Brain className="w-4 h-4 text-blue-400" />
            Uji Minda: {skKey}
          </h3>
          <p className="text-xs text-slate-400 mt-1">{q.source}</p>
        </div>
        <div className="text-xs font-semibold px-3 py-1 bg-slate-800 rounded-full text-slate-300">
          Soalan {currentIndex + 1} / {questions.length}
        </div>
      </div>

      {/* Question Text & Images */}
      <div className="space-y-4">
        <p className="text-sm text-slate-200 leading-relaxed whitespace-pre-wrap">
          {q.text}
        </p>
        {q.images && q.images.length > 0 && (
          <div className="flex flex-wrap gap-4 mt-4">
            {q.images.map((imgSrc, idx) => (
              <img
                key={idx}
                src={imgSrc}
                alt="Rajah Soalan"
                className="max-h-64 object-contain rounded-lg bg-white p-2"
              />
            ))}
          </div>
        )}
      </div>

      {/* Options */}
      <div className="space-y-3 pt-2">
        {q.options.map((opt, idx) => {
          let optClass = "border-slate-700 bg-slate-800/50 text-slate-300 hover:border-slate-500 hover:bg-slate-700/50 cursor-pointer";
          
          if (showAnswer) {
            optClass = "border-slate-800 bg-slate-800/20 text-slate-500 cursor-default opacity-50"; // Default for unselected and wrong
            if (opt === q.answer) {
              optClass = "border-emerald-500 bg-emerald-500/10 text-emerald-400 opacity-100 z-10 relative"; // Correct answer always highlights
            } else if (opt === selectedOption) {
              optClass = "border-red-500 bg-red-500/10 text-red-400 opacity-100 z-10 relative"; // Selected wrong answer highlights red
            }
          }

          return (
            <div
              key={idx}
              onClick={() => handleSelectOption(opt)}
              className={`p-4 rounded-xl border transition-all flex gap-3 ${optClass}`}
            >
              <div className="font-bold flex-shrink-0 mt-0.5">
                {String.fromCharCode(65 + idx)}.
              </div>
              <div className="text-sm flex-1 leading-relaxed whitespace-pre-wrap">{opt}</div>
              
              {showAnswer && opt === q.answer && (
                <CheckCircle className="w-5 h-5 text-emerald-400 flex-shrink-0" />
              )}
              {showAnswer && opt === selectedOption && opt !== q.answer && (
                <XCircle className="w-5 h-5 text-red-400 flex-shrink-0" />
              )}
            </div>
          );
        })}
      </div>

      {/* Answer Explanation & Next Button */}
      {showAnswer && (
        <div className="pt-6 border-t border-slate-800 animate-in fade-in slide-in-from-bottom-4 duration-300 space-y-4">
          <div className={`p-4 rounded-xl flex gap-4 ${isCorrect ? 'bg-emerald-500/10 border border-emerald-500/20' : 'bg-red-500/10 border border-red-500/20'}`}>
             <div className="flex-1">
               <h4 className={`text-sm font-bold mb-2 ${isCorrect ? 'text-emerald-400' : 'text-red-400'}`}>
                 {isCorrect ? 'Jawapan Tepat!' : 'Jawapan Kurang Tepat'}
               </h4>
               {q.ulasan ? (
                 <p className="text-xs text-slate-300 leading-relaxed">
                   <span className="font-semibold text-slate-400">Ulasan: </span>
                   {q.ulasan}
                 </p>
               ) : (
                 <p className="text-xs text-slate-400">Jawapan sebenar ialah {q.answer}.</p>
               )}
             </div>
          </div>
          
          <button
            onClick={handleNext}
            className="w-full py-4 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl flex items-center justify-center gap-2 transition-all shadow-[0_0_20px_rgba(37,99,235,0.3)]"
          >
            {currentIndex < questions.length - 1 ? 'Soalan Seterusnya' : 'Tamat Kuiz'}
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      )}
    </div>
  );
}
