"use client";

import React, { useState, useEffect } from "react";
import { Play, Info, Sparkles, Compass, Waves, Flame, Zap, Atom } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { VideoLesson } from "@/data/physicsData";
import { motion, AnimatePresence } from "framer-motion";

interface HeroSpotlightProps {
  onPlay: (lesson: VideoLesson) => void;
  featuredLessons: VideoLesson[];
}

export type PhysicsCategory = "optics" | "mechanics" | "waves" | "heat" | "electricity" | "quantum";

export function getPhysicsTopicCategory(lesson: VideoLesson): PhysicsCategory {
  const text = `${lesson.chapterBm} ${lesson.titleBm} ${lesson.chapterDlp} ${lesson.titleDlp}`.toLowerCase();

  if (text.includes("optik") || text.includes("cahaya") || text.includes("kanta") || text.includes("cermin") || text.includes("optics") || text.includes("light")) {
    return "optics";
  }
  if (text.includes("nuklear") || text.includes("kuantum") || text.includes("quantum") || text.includes("nuclear") || text.includes("atom")) {
    return "quantum";
  }
  if (text.includes("elektrik") || text.includes("elektromagnet") || text.includes("elektronik") || text.includes("litar") || text.includes("tekanan") || text.includes("pressure") || text.includes("magnet") || text.includes("kembangan")) {
    return "electricity";
  }
  if (text.includes("gelombang") || text.includes("wave") || text.includes("bunyi") || text.includes("suara")) {
    return "waves";
  }
  if (text.includes("haba") || text.includes("heat") || text.includes("suhu") || text.includes("thermal")) {
    return "heat";
  }
  return "mechanics";
}

const CategoryConfig: Record<
  PhysicsCategory,
  {
    badgeBm: string;
    badgeDlp: string;
    badgeStyle: string;
    gradientBg: string;
    icon: React.ElementType;
    renderSvg: () => React.ReactNode;
  }
> = {
  optics: {
    badgeBm: "CAHAYA & OPTIK",
    badgeDlp: "LIGHT & OPTICS",
    badgeStyle: "text-amber-400 bg-amber-950/80 border-amber-500/50",
    gradientBg: "from-[#1a0818] via-[#2d0e26] to-[#0a1226]",
    icon: Compass,
    renderSvg: () => (
      <svg viewBox="0 0 800 500" fill="none" className="w-full h-full object-cover">
        {/* Glass Prism & Dispersion */}
        <polygon points="500,70 660,390 340,390" stroke="rgba(245, 158, 11, 0.5)" strokeWidth="3" fill="rgba(255, 255, 255, 0.04)" />
        <polygon points="500,70 660,390 340,390" fill="url(#prismGlow)" />
        <defs>
          <radialGradient id="prismGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="rgba(245,158,11,0.15)" />
            <stop offset="100%" stopColor="rgba(0,0,0,0)" />
          </radialGradient>
        </defs>

        {/* Incident beam */}
        <line x1="80" y1="260" x2="420" y2="230" stroke="#ffffff" strokeWidth="5" filter="drop-shadow(0 0 8px rgba(255,255,255,0.8))" />

        {/* Rainbow spectrum dispersion */}
        <line x1="420" y1="230" x2="570" y2="190" stroke="#ef4444" strokeWidth="3" />
        <line x1="570" y1="190" x2="790" y2="110" stroke="#ef4444" strokeWidth="4" />

        <line x1="420" y1="230" x2="575" y2="225" stroke="#f59e0b" strokeWidth="3" />
        <line x1="575" y1="225" x2="790" y2="190" stroke="#f59e0b" strokeWidth="4" />

        <line x1="420" y1="230" x2="580" y2="260" stroke="#10b981" strokeWidth="3" />
        <line x1="580" y1="260" x2="790" y2="270" stroke="#10b981" strokeWidth="4" />

        <line x1="420" y1="230" x2="585" y2="295" stroke="#3b82f6" strokeWidth="3" />
        <line x1="585" y1="295" x2="790" y2="350" stroke="#3b82f6" strokeWidth="4" />

        <line x1="420" y1="230" x2="590" y2="330" stroke="#a855f7" strokeWidth="3" />
        <line x1="590" y1="330" x2="790" y2="430" stroke="#a855f7" strokeWidth="4" />

        {/* Lens Convex Focal Rays */}
        <path d="M 180 80 Q 220 250 180 420 Q 140 250 180 80 Z" fill="rgba(255,255,255,0.06)" stroke="rgba(255,255,255,0.3)" strokeWidth="2" />
        <line x1="60" y1="250" x2="320" y2="250" stroke="rgba(255,255,255,0.2)" strokeDasharray="6,6" />

        {/* Formulas */}
        <text x="630" y="60" fill="rgba(245, 158, 11, 0.4)" fontSize="26" fontWeight="bold" fontFamily="monospace">n = c / v</text>
        <text x="140" y="440" fill="rgba(255, 255, 255, 0.3)" fontSize="22" fontFamily="serif">1/f = 1/u + 1/v</text>
        <text x="460" y="450" fill="rgba(239, 68, 68, 0.4)" fontSize="24" fontFamily="serif">n = sin i / sin r</text>
      </svg>
    ),
  },
  mechanics: {
    badgeBm: "DAYA, GERAKAN & GRAVITI",
    badgeDlp: "FORCES, MOTION & GRAVITY",
    badgeStyle: "text-blue-400 bg-blue-950/80 border-blue-500/50",
    gradientBg: "from-[#081226] via-[#0f2142] to-[#07192e]",
    icon: Sparkles,
    renderSvg: () => (
      <svg viewBox="0 0 800 500" fill="none" className="w-full h-full object-cover">
        {/* Orbital Gravity Ring */}
        <ellipse cx="560" cy="250" rx="200" ry="120" stroke="rgba(59, 130, 246, 0.4)" strokeWidth="2" strokeDasharray="8,8" />
        <circle cx="560" cy="250" r="45" fill="url(#planetGlow)" stroke="#60a5fa" strokeWidth="3" />
        <circle cx="720" cy="180" r="14" fill="#38bdf8" filter="drop-shadow(0 0 12px #38bdf8)" />

        <defs>
          <radialGradient id="planetGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#3b82f6" />
            <stop offset="70%" stopColor="#1d4ed8" />
            <stop offset="100%" stopColor="#0f172a" />
          </radialGradient>
        </defs>

        {/* Projectile Arc Vector */}
        <path d="M 100 400 Q 320 80 540 400" stroke="#38bdf8" strokeWidth="4" fill="none" strokeDasharray="6,4" />
        {/* Force Vectors */}
        <line x1="320" y1="240" x2="320" y2="120" stroke="#ef4444" strokeWidth="4" />
        <polygon points="320,105 312,125 328,125" fill="#ef4444" />
        <text x="335" y="130" fill="#ef4444" fontSize="20" fontWeight="bold">F_net = ma</text>

        <line x1="320" y1="240" x2="440" y2="240" stroke="#10b981" strokeWidth="4" />
        <polygon points="455,240 435,232 435,248" fill="#10b981" />
        <text x="410" y="270" fill="#10b981" fontSize="20" fontWeight="bold">v = u + at</text>

        {/* Equations */}
        <text x="600" y="80" fill="rgba(56, 189, 248, 0.4)" fontSize="26" fontWeight="bold" fontFamily="monospace">g = GM / r²</text>
        <text x="120" y="120" fill="rgba(255, 255, 255, 0.3)" fontSize="24" fontFamily="serif">p = mv</text>
        <text x="100" y="440" fill="rgba(255, 255, 255, 0.3)" fontSize="22" fontFamily="serif">s = ut + ½at²</text>
      </svg>
    ),
  },
  waves: {
    badgeBm: "GELOMBANG & BUNYI",
    badgeDlp: "WAVES & ACOUSTICS",
    badgeStyle: "text-emerald-400 bg-emerald-950/80 border-emerald-500/50",
    gradientBg: "from-[#051c18] via-[#0b3830] to-[#0a1829]",
    icon: Waves,
    renderSvg: () => (
      <svg viewBox="0 0 800 500" fill="none" className="w-full h-full object-cover">
        {/* Double-slit interference circular ripples */}
        <circle cx="350" cy="250" r="80" stroke="rgba(16, 185, 129, 0.25)" strokeWidth="2" />
        <circle cx="350" cy="250" r="140" stroke="rgba(16, 185, 129, 0.25)" strokeWidth="2" />
        <circle cx="350" cy="250" r="200" stroke="rgba(16, 185, 129, 0.25)" strokeWidth="2" />

        <circle cx="350" cy="150" r="80" stroke="rgba(52, 211, 153, 0.3)" strokeWidth="2" />
        <circle cx="350" cy="150" r="140" stroke="rgba(52, 211, 153, 0.3)" strokeWidth="2" />

        {/* Sinusoidal Wave Plot */}
        <path
          d="M 100 320 Q 180 200 260 320 T 420 320 T 580 320 T 740 320"
          stroke="#34d399"
          strokeWidth="5"
          fill="none"
          filter="drop-shadow(0 0 10px rgba(52, 211, 153, 0.8))"
        />
        <path
          d="M 100 320 Q 180 440 260 320 T 420 320 T 580 320 T 740 320"
          stroke="rgba(52, 211, 153, 0.4)"
          strokeWidth="3"
          fill="none"
          strokeDasharray="4,4"
        />

        {/* Wavelength λ marker */}
        <line x1="180" y1="200" x2="500" y2="200" stroke="#f59e0b" strokeWidth="2" strokeDasharray="4,4" />
        <text x="330" y="190" fill="#f59e0b" fontSize="22" fontWeight="bold">λ (Wavelength)</text>

        {/* Equations */}
        <text x="600" y="80" fill="rgba(52, 211, 153, 0.5)" fontSize="28" fontWeight="bold" fontFamily="monospace">v = f λ</text>
        <text x="120" y="120" fill="rgba(255, 255, 255, 0.3)" fontSize="24" fontFamily="serif">T = 1 / f</text>
        <text x="560" y="440" fill="rgba(255, 255, 255, 0.3)" fontSize="22" fontFamily="serif">λ = ax / D</text>
      </svg>
    ),
  },
  heat: {
    badgeBm: "HABA & TERMODINAMIK",
    badgeDlp: "HEAT & THERMODYNAMICS",
    badgeStyle: "text-rose-400 bg-rose-950/80 border-rose-500/50",
    gradientBg: "from-[#24080e] via-[#3a0e16] to-[#150921]",
    icon: Flame,
    renderSvg: () => (
      <svg viewBox="0 0 800 500" fill="none" className="w-full h-full object-cover">
        {/* Thermal Glow Particle Collision Vectors */}
        <circle cx="450" cy="220" r="28" fill="#f43f5e" filter="drop-shadow(0 0 20px #f43f5e)" />
        <line x1="450" y1="220" x2="550" y2="150" stroke="#fb7185" strokeWidth="4" />
        <polygon points="560,143 540,148 548,162" fill="#fb7185" />

        <circle cx="600" cy="300" r="22" fill="#fb923c" filter="drop-shadow(0 0 15px #fb923c)" />
        <line x1="600" y1="300" x2="680" y2="380" stroke="#fdba74" strokeWidth="3" />

        <circle cx="340" cy="340" r="20" fill="#e11d48" opacity="0.8" />
        <circle cx="520" cy="380" r="25" fill="#f43f5e" opacity="0.7" />

        {/* Thermometer Gauge */}
        <rect x="180" y="100" width="30" height="280" rx="15" fill="rgba(255,255,255,0.08)" stroke="rgba(255,255,255,0.3)" strokeWidth="2" />
        <rect x="186" y="220" width="18" height="155" rx="9" fill="url(#heatLiquid)" />
        <circle cx="195" cy="380" r="30" fill="#f43f5e" filter="drop-shadow(0 0 15px #f43f5e)" />

        <defs>
          <linearGradient id="heatLiquid" x1="0" y1="1" x2="0" y2="0">
            <stop offset="0%" stopColor="#f43f5e" />
            <stop offset="100%" stopColor="#fb923c" />
          </linearGradient>
        </defs>

        {/* Equations */}
        <text x="560" y="80" fill="rgba(244, 63, 94, 0.5)" fontSize="28" fontWeight="bold" fontFamily="monospace">Q = mcΔT</text>
        <text x="240" y="140" fill="rgba(255, 255, 255, 0.3)" fontSize="24" fontFamily="serif">P₁V₁ = P₂V₂</text>
        <text x="440" y="450" fill="rgba(255, 255, 255, 0.3)" fontSize="22" fontFamily="serif">Q = mL</text>
      </svg>
    ),
  },
  electricity: {
    badgeBm: "ELEKTRIK & ELEKTROMAGNET",
    badgeDlp: "ELECTRICITY & MAGNETISM",
    badgeStyle: "text-cyan-400 bg-cyan-950/80 border-cyan-500/50",
    gradientBg: "from-[#07162b] via-[#0d2a4a] to-[#120a2b]",
    icon: Zap,
    renderSvg: () => (
      <svg viewBox="0 0 800 500" fill="none" className="w-full h-full object-cover">
        {/* Solenoid Coil Magnetic Field Loops */}
        <ellipse cx="500" cy="250" rx="220" ry="80" stroke="rgba(6, 182, 212, 0.4)" strokeWidth="3" strokeDasharray="6,6" />
        <ellipse cx="500" cy="250" rx="160" ry="50" stroke="rgba(6, 182, 212, 0.6)" strokeWidth="3" />
        <ellipse cx="500" cy="250" rx="100" ry="25" stroke="#22d3ee" strokeWidth="4" filter="drop-shadow(0 0 10px #22d3ee)" />

        {/* Circuit grid glow */}
        <path d="M 100 200 L 260 200 L 260 350 L 400 350" stroke="#38bdf8" strokeWidth="4" fill="none" />
        <circle cx="260" cy="200" r="8" fill="#38bdf8" filter="drop-shadow(0 0 10px #38bdf8)" />

        {/* Resistor symbol */}
        <path d="M 140 200 L 150 180 L 170 220 L 190 180 L 210 220 L 230 180 L 240 200" stroke="#f59e0b" strokeWidth="4" fill="none" />

        {/* Equations */}
        <text x="560" y="70" fill="rgba(34, 211, 238, 0.5)" fontSize="28" fontWeight="bold" fontFamily="monospace">V = IR</text>
        <text x="100" y="120" fill="rgba(255, 255, 255, 0.3)" fontSize="24" fontFamily="serif">F = B I L</text>
        <text x="480" y="440" fill="rgba(255, 255, 255, 0.3)" fontSize="22" fontFamily="serif">Vₚ / Vₛ = Nₚ / Nₛ</text>
      </svg>
    ),
  },
  quantum: {
    badgeBm: "FIZIK NUKLEAR & KUANTUM",
    badgeDlp: "NUCLEAR & QUANTUM PHYSICS",
    badgeStyle: "text-fuchsia-400 bg-fuchsia-950/80 border-fuchsia-500/50",
    gradientBg: "from-[#17062b] via-[#2a0b47] to-[#0c0921]",
    icon: Atom,
    renderSvg: () => (
      <svg viewBox="0 0 800 500" fill="none" className="w-full h-full object-cover">
        {/* Atomic Nucleus */}
        <circle cx="520" cy="250" r="35" fill="#e879f9" filter="drop-shadow(0 0 25px #e879f9)" />

        {/* Elliptical Electron Orbitals */}
        <ellipse cx="520" cy="250" rx="220" ry="70" stroke="rgba(232, 121, 249, 0.5)" strokeWidth="2.5" transform="rotate(-30 520 250)" />
        <ellipse cx="520" cy="250" rx="220" ry="70" stroke="rgba(192, 132, 252, 0.5)" strokeWidth="2.5" transform="rotate(45 520 250)" />
        <ellipse cx="520" cy="250" rx="220" ry="70" stroke="rgba(56, 189, 248, 0.5)" strokeWidth="2.5" transform="rotate(105 520 250)" />

        {/* Electron Particles */}
        <circle cx="340" cy="180" r="10" fill="#38bdf8" filter="drop-shadow(0 0 10px #38bdf8)" />
        <circle cx="680" cy="300" r="10" fill="#c084fc" filter="drop-shadow(0 0 10px #c084fc)" />

        {/* Photon Wave Packet */}
        <path d="M 80 250 Q 120 200 160 250 T 240 250 T 320 250" stroke="#f43f5e" strokeWidth="4" fill="none" />
        <polygon points="335,250 315,240 315,260" fill="#f43f5e" />
        <text x="160" y="190" fill="#f43f5e" fontSize="20" fontWeight="bold">hf (Photon)</text>

        {/* Equations */}
        <text x="600" y="70" fill="rgba(232, 121, 249, 0.5)" fontSize="28" fontWeight="bold" fontFamily="monospace">E = hf</text>
        <text x="100" y="100" fill="rgba(255, 255, 255, 0.3)" fontSize="26" fontFamily="serif">E = mc²</text>
        <text x="480" y="440" fill="rgba(255, 255, 255, 0.3)" fontSize="22" fontFamily="serif">λ = h / p</text>
      </svg>
    ),
  },
};

export function getLessonDescription(lesson: VideoLesson, lang: "bm" | "en" | string): string {
  const isBm = lang !== "en";
  const concepts = isBm ? lesson.keyConceptsBm : lesson.keyConceptsDlp;
  const chapter = isBm ? lesson.chapterBm : lesson.chapterDlp;
  const title = isBm ? lesson.titleBm : lesson.titleDlp;

  const titleLower = title.toLowerCase();
  const chapterLower = chapter.toLowerCase();
  const includesChapter = titleLower.includes(chapterLower);

  const locationInfo = includesChapter
    ? (isBm ? `Tingkatan ${lesson.form}` : `Form ${lesson.form}`)
    : (isBm ? `Bab ${lesson.chapterNum}: ${chapter}` : `Chapter ${lesson.chapterNum}: ${chapter}`);

  if (concepts && concepts.length > 0) {
    const conceptsText = concepts.slice(0, 3).join(", ");
    if (isBm) {
      return `Pelajari tajuk ${title} (${locationInfo}). Kuasai Standard Pembelajaran DSKP Fizik KSSM merangkumi ${conceptsText} melalui simulasi interaktif.`;
    } else {
      return `Master subtopic ${title} (${locationInfo}). Learn KSSM DSKP Physics Learning Standards including ${conceptsText} via interactive simulations.`;
    }
  }

  const cat = getPhysicsTopicCategory(lesson);
  if (isBm) {
    switch (cat) {
      case "optics":
        return `Kuasai ${title} (${locationInfo}), pembiasan cahaya, kanta serta pembentukan imej mengikut DSKP Fizik KSSM.`;
      case "mechanics":
        return `Fahami hukum gerakan Newton, daya, momentum dan analisis graf bagi ${title} (${locationInfo}) mengikut DSKP KSSM.`;
      case "waves":
        return `Terokai sifat gelombang, pelembapan, resonans, dan interferensi gelombang bagi ${title} (${locationInfo}).`;
      case "heat":
        return `Kuasai Keseimbangan Terma, Muatan Haba Tentu, dan Hukum Gas bagi ${title} (${locationInfo}) secara visual.`;
      case "electricity":
        return `Fahami Hukum Ohm, Rintangan, Keelektromagnetan dan Induksi Elektromagnet bagi ${title} (${locationInfo}).`;
      case "quantum":
        return `Terokai Teori Kuantum Cahaya, Kesan Fotoelektrik dan Fizik Nuklear bagi ${title} (${locationInfo}) secara mendalam.`;
    }
  } else {
    switch (cat) {
      case "optics":
        return `Master ${title} (${locationInfo}), light refraction, lenses, and image formation according to the KSSM Physics DSKP.`;
      case "mechanics":
        return `Understand Newton's laws of motion, force vectors, momentum, and graph analysis for ${title} (${locationInfo}).`;
      case "waves":
        return `Explore wave fundamentals, damping, resonance, and wave interference in ${title} (${locationInfo}).`;
      case "heat":
        return `Master Thermal Equilibrium, Specific Heat Capacity, and Gas Laws for ${title} (${locationInfo}) visually.`;
      case "electricity":
        return `Understand Ohm's Law, Resistance, Electromagnetism, and Electromagnetic Induction for ${title} (${locationInfo}).`;
      case "quantum":
        return `Discover Quantum Theory of Light, Photoelectric Effect, and Nuclear Physics for ${title} (${locationInfo}).`;
    }
  }
}

export const HeroSpotlight: React.FC<HeroSpotlightProps> = ({ onPlay, featuredLessons }) => {
  const { lang, t } = useLanguage();
  const [currentIndex, setCurrentIndex] = useState(0);

  // Filter out any video containing "Ulangkaji", "Homework", "Tips"
  const cleanLessons = (featuredLessons || []).filter((lesson) => {
    const text = `${lesson.titleBm} ${lesson.titleDlp} ${lesson.week}`.toLowerCase();
    return !text.includes("ulangkaji") && !text.includes("homework") && !text.includes("tips");
  });

  useEffect(() => {
    if (cleanLessons.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % cleanLessons.length);
    }, 7000);
    return () => clearInterval(interval);
  }, [cleanLessons.length]);

  if (cleanLessons.length === 0) return null;

  const currentLesson = cleanLessons[currentIndex % cleanLessons.length];
  const categoryKey = getPhysicsTopicCategory(currentLesson);
  const config = CategoryConfig[categoryKey] || CategoryConfig.mechanics;
  const CategoryIcon = config.icon;

  return (
    <div
      className={`relative w-full h-[380px] md:h-[420px] rounded-3xl overflow-hidden bg-gradient-to-r ${config.gradientBg} border border-slate-800/80 shadow-2xl p-6 md:p-10 flex flex-col justify-between transition-all duration-700`}
    >
      {/* Dynamic Physics Vector Backdrop Art */}
      <AnimatePresence mode="wait">
        <motion.div
          key={categoryKey}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 0.75, scale: 1 }}
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="absolute right-0 top-0 bottom-0 w-full md:w-2/3 pointer-events-none overflow-hidden"
        >
          {config.renderSvg()}
        </motion.div>
      </AnimatePresence>

      {/* Hero Badge */}
      <div className="relative z-10 flex items-center space-x-3">
        <span
          className={`inline-flex items-center space-x-1.5 px-3.5 py-1.5 text-[11px] font-extrabold uppercase tracking-wider rounded-lg border shadow-lg backdrop-blur-md ${config.badgeStyle}`}
        >
          <CategoryIcon className="w-3.5 h-3.5" />
          <span>{lang === "bm" ? config.badgeBm : config.badgeDlp}</span>
        </span>
        <span className="text-xs text-slate-400 font-bold px-2 py-0.5 rounded bg-slate-900/60 border border-slate-800">
          {lang === "bm" ? `Tingkatan ${currentLesson.form}` : `Form ${currentLesson.form}`} • {currentLesson.week}
        </span>
      </div>

      {/* Main Content Info */}
      <div className="relative z-10 max-w-xl flex-1 flex flex-col justify-center overflow-hidden my-2">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentLesson.id}
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -40 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="space-y-3"
          >
            <span className="text-xs font-bold text-red-400 uppercase tracking-widest block">
              {lang === "bm" ? `Bab ${currentLesson.chapterNum}: ${currentLesson.chapterBm}` : `Ch ${currentLesson.chapterNum}: ${currentLesson.chapterDlp}`}
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-5xl font-black text-white tracking-tight leading-tight drop-shadow-md">
              {lang === "bm" ? currentLesson.titleBm : currentLesson.titleDlp}
            </h2>
            <p className="text-xs md:text-sm text-slate-300 line-clamp-2 leading-relaxed font-medium">
              {getLessonDescription(currentLesson, lang)}
            </p>

            {/* Buttons */}
            <div className="flex items-center space-x-4 pt-2">
              <button
                onClick={() => onPlay(currentLesson)}
                className="flex items-center space-x-2 px-6 py-3 rounded-xl bg-red-600 hover:bg-red-500 text-white font-bold text-xs md:text-sm transition shadow-lg shadow-red-950/80 active:scale-95 cursor-pointer"
              >
                <Play className="w-4 h-4 fill-white" />
                <span>{t("playNow")}</span>
              </button>

              <button
                onClick={() => onPlay(currentLesson)}
                className="flex items-center space-x-2 px-5 py-3 rounded-xl bg-slate-900/80 hover:bg-slate-800/80 text-slate-200 border border-slate-700/60 font-semibold text-xs md:text-sm transition active:scale-95 cursor-pointer"
              >
                <Info className="w-4 h-4" />
                <span>{t("moreInfo")}</span>
              </button>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Carousel dots & navigation */}
      <div className="relative z-10 flex items-center justify-between pt-2">
        <div className="flex items-center space-x-2">
          {cleanLessons.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                idx === currentIndex ? "w-7 bg-red-500 shadow-md shadow-red-500/50" : "w-2 bg-slate-700 hover:bg-slate-500"
              }`}
            />
          ))}
        </div>
        <span className="text-[11px] font-bold text-slate-400">
          {currentIndex + 1} / {cleanLessons.length}
        </span>
      </div>
    </div>
  );
};
