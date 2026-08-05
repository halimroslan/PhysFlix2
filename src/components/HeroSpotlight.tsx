"use client";

import React, { useState, useEffect } from "react";
import { Play, Info } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { VideoLesson } from "@/data/physicsData";
import { motion, AnimatePresence } from "framer-motion";

interface HeroSpotlightProps {
  onPlay: (lesson: VideoLesson) => void;
  featuredLessons: VideoLesson[];
}

export const HeroSpotlight: React.FC<HeroSpotlightProps> = ({ onPlay, featuredLessons }) => {
  const { lang, t } = useLanguage();
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (!featuredLessons || featuredLessons.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % featuredLessons.length);
    }, 7000);
    return () => clearInterval(interval);
  }, [featuredLessons]);

  if (!featuredLessons || featuredLessons.length === 0) return null;

  const currentLesson = featuredLessons[currentIndex];

  return (
    <div className="relative w-full h-[360px] md:h-[400px] rounded-3xl overflow-hidden bg-gradient-to-r from-[#0d0914] via-[#161226] to-[#0a1526] border border-slate-800/80 shadow-2xl p-6 md:p-10 flex flex-col justify-between">
      {/* Dynamic Physics Optics Prism Backdrop Art */}
      <div className="absolute right-0 top-0 bottom-0 w-full md:w-2/3 opacity-30 md:opacity-75 pointer-events-none overflow-hidden">
        <svg
          viewBox="0 0 800 500"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full object-cover"
        >
          {/* Prism triangle */}
          <polygon
            points="500,80 650,380 350,380"
            stroke="rgba(255, 255, 255, 0.4)"
            strokeWidth="3"
            fill="rgba(255, 255, 255, 0.03)"
          />
          {/* Incident white ray */}
          <line x1="100" y1="260" x2="425" y2="230" stroke="#ffffff" strokeWidth="4" />
          {/* Refracted spectrum rays inside & out */}
          <line x1="425" y1="230" x2="575" y2="200" stroke="#ef4444" strokeWidth="3" />
          <line x1="575" y1="200" x2="780" y2="120" stroke="#ef4444" strokeWidth="4" />

          <line x1="425" y1="230" x2="580" y2="230" stroke="#f59e0b" strokeWidth="3" />
          <line x1="580" y1="230" x2="780" y2="200" stroke="#f59e0b" strokeWidth="4" />

          <line x1="425" y1="230" x2="585" y2="260" stroke="#10b981" strokeWidth="3" />
          <line x1="585" y1="260" x2="780" y2="280" stroke="#10b981" strokeWidth="4" />

          <line x1="425" y1="230" x2="590" y2="290" stroke="#3b82f6" strokeWidth="3" />
          <line x1="590" y1="290" x2="780" y2="360" stroke="#3b82f6" strokeWidth="4" />

          <line x1="425" y1="230" x2="595" y2="320" stroke="#8b5cf6" strokeWidth="3" />
          <line x1="595" y1="320" x2="780" y2="440" stroke="#8b5cf6" strokeWidth="4" />

          {/* Physics equation background overlay */}
          <text x="650" y="70" fill="rgba(255,255,255,0.15)" fontSize="28" fontFamily="sans-serif">
            E = mc²
          </text>
          <text x="250" y="120" fill="rgba(255,255,255,0.12)" fontSize="24" fontFamily="sans-serif">
            F = ma
          </text>
          <text x="150" y="420" fill="rgba(255,255,255,0.15)" fontSize="26" fontFamily="sans-serif">
            n = c / v
          </text>
        </svg>
      </div>

      {/* Hero Badge */}
      <div className="relative z-10">
        <span className="inline-block px-3 py-1 text-[10px] font-extrabold uppercase tracking-widest text-red-500 bg-red-950/60 border border-red-800/60 rounded-md">
          {t("spotlightBadge")}
        </span>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-xl flex-1 flex flex-col justify-center overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentLesson.id}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="space-y-4"
          >
            <h2 className="text-3xl md:text-5xl font-black text-white tracking-tight leading-none">
              {lang === "bm" ? currentLesson.titleBm : currentLesson.titleDlp}
            </h2>
            <p className="text-xs md:text-sm text-slate-300 line-clamp-3 leading-relaxed font-medium">
              {t("heroDesc")}
            </p>

            {/* Buttons */}
            <div className="flex items-center space-x-4 pt-2">
              <button
                onClick={() => onPlay(currentLesson)}
                className="flex items-center space-x-2 px-6 py-3 rounded-xl bg-red-600 hover:bg-red-500 text-white font-bold text-xs md:text-sm transition shadow-lg shadow-red-950/80 active:scale-95"
              >
                <Play className="w-4 h-4 fill-white" />
                <span>{t("playNow")}</span>
              </button>

              <button className="flex items-center space-x-2 px-5 py-3 rounded-xl bg-slate-800/80 hover:bg-slate-700/80 text-slate-200 border border-slate-700/60 font-semibold text-xs md:text-sm transition active:scale-95">
                <Info className="w-4 h-4" />
                <span>{t("moreInfo")}</span>
              </button>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Carousel dots */}
      <div className="relative z-10 flex items-center space-x-2 mt-4">
        {featuredLessons.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentIndex(idx)}
            className={`h-2 rounded-full transition-all duration-300 ${
              idx === currentIndex ? "w-6 bg-red-600" : "w-2 bg-slate-700 hover:bg-slate-500"
            }`}
          />
        ))}
      </div>
    </div>
  );
};
