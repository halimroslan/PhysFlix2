"use client";

import React, { useState, useEffect } from "react";
import { Play, Info, Sparkles, Compass, Waves, Flame, Zap, Atom, CheckCircle2, X, Lock } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { useAuth } from "@/context/AuthContext";
import { VideoLesson } from "@/data/physicsData";
import { motion, AnimatePresence } from "framer-motion";

interface HeroSpotlightProps {
  onPlay: (lesson: VideoLesson) => void;
  featuredLessons: VideoLesson[];
}


export const FEATURED_T5_DRIVE_IDS = [
  "t5_m1_1_1",   // Bab 1: 1.1 Daya Paduan
  "t5_m9_2_6",   // Bab 2: 2.6 Prinsip Bernoulli
  "t5_m13_3_3",  // Bab 3: 3.3 DGE & Rintangan Dalam
  "t5_m17_4_2",  // Bab 4: 4.2 Induksi Elektromagnet
  "t5_m20_5_1",  // Bab 5: 5.1 Elektron
  "t5_m29_7_2",  // Bab 7: 7.2 Kesan Fotoelektrik
];

export type PhysicsCategory = "optics" | "mechanics" | "waves" | "heat" | "electricity" | "quantum";

export function getPhysicsTopicCategory(lesson: VideoLesson): PhysicsCategory {
  const text = `${lesson.chapterBm} ${lesson.titleBm} ${lesson.chapterDlp} ${lesson.titleDlp}`.toLowerCase();

  if (text.includes("optik") || text.includes("cahaya") || text.includes("kanta") || text.includes("cermin") || text.includes("optics") || text.includes("light")) {
    return "optics";
  }
  if (text.includes("nuklear") || text.includes("kuantum") || text.includes("quantum") || text.includes("nuclear") || text.includes("atom") || text.includes("fotoelektrik")) {
    return "quantum";
  }
  if (text.includes("elektrik") || text.includes("elektromagnet") || text.includes("elektronik") || text.includes("litar") || text.includes("magnet") || text.includes("kembangan") || text.includes("sinar katod") || text.includes("diod") || text.includes("transistor") || text.includes("d.g.e") || text.includes("induksi") || text.includes("transformer")) {
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
    badgeBm: "DAYA, GERAKAN & TEKANAN",
    badgeDlp: "FORCES, MOTION & PRESSURE",
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
    badgeBm: "ELEKTRIK & ELEKTRONIK",
    badgeDlp: "ELECTRICITY & ELECTRONICS",
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
  const { isSuperAdmin, isPremium } = useAuth();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showInfoModal, setShowInfoModal] = useState(false);

  // Helper to build curated list of Form 4 (6 chapters) and Form 5 (6 selected topics)
  const buildCuratedLessons = (lessons: VideoLesson[]) => {
    // 1. Curate Form 4: 1 per chapter
    const f4Filtered = (lessons || []).filter((lesson) => {
      if (lesson.form !== 4 || lesson.isPendingUpload) return false;
      const text = `${lesson.titleBm} ${lesson.titleDlp} ${lesson.week}`.toLowerCase();
      return !text.includes("ulangkaji") && !text.includes("homework") && !text.includes("tips");
    });
    const f4ChapterMap = new Map<string, VideoLesson>();
    f4Filtered.forEach((l) => {
      const key = `${l.form}-${l.chapterNum}`;
      if (!f4ChapterMap.has(key)) {
        f4ChapterMap.set(key, l);
      }
    });
    const f4Lessons = Array.from(f4ChapterMap.values());

    // 2. Curate Form 5: 6 premier selected topics
    const f5Lessons = (lessons || []).filter(
      (l) => l.form === 5 && !l.isPendingUpload && FEATURED_T5_DRIVE_IDS.includes(l.driveId)
    );

    // Fallback if specific driveIds not matched
    const finalF5 =
      f5Lessons.length > 0
        ? f5Lessons
        : (lessons || []).filter((l) => l.form === 5 && !l.isPendingUpload).slice(0, 6);

    // Interleave [T4 Bab 1, T5 Bab 1, T4 Bab 2, T5 Bab 2...] for a rich, alternating carousel
    const combined: VideoLesson[] = [];
    const maxLen = Math.max(f4Lessons.length, finalF5.length);
    for (let i = 0; i < maxLen; i++) {
      if (i < f4Lessons.length) combined.push(f4Lessons[i]);
      if (i < finalF5.length) combined.push(finalF5[i]);
    }

    return combined.length > 0 ? combined : lessons || [];
  };

  const [cleanLessons, setCleanLessons] = useState<VideoLesson[]>(() =>
    buildCuratedLessons(featuredLessons)
  );

  useEffect(() => {
    const updated = buildCuratedLessons(featuredLessons);
    if (updated.length > 0) {
      setCleanLessons(updated);
    }
  }, [featuredLessons]);

  useEffect(() => {
    if (cleanLessons.length <= 1 || showInfoModal) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % cleanLessons.length);
    }, 7000);
    return () => clearInterval(interval);
  }, [cleanLessons.length, showInfoModal]);

  if (cleanLessons.length === 0) return null;

  const currentLesson = cleanLessons[currentIndex % cleanLessons.length];
  const categoryKey = getPhysicsTopicCategory(currentLesson);
  const config = CategoryConfig[categoryKey] || CategoryConfig.mechanics;
  const CategoryIcon = config.icon;
  const isForm5 = currentLesson.form === 5;
  const isLockedForUser = isForm5 && !isSuperAdmin && !isPremium;

  return (
    <div
      className={`relative w-full h-[380px] md:h-[440px] rounded-3xl overflow-hidden bg-gradient-to-r ${config.gradientBg} border border-slate-800/80 shadow-2xl p-6 md:p-10 flex flex-col justify-between transition-all duration-700`}
    >
      {/* Immersive Thumbnail Backdrop Layer */}
      <AnimatePresence mode="wait">
        {currentLesson.thumbnailUrl ? (
          <motion.div
            key={currentLesson.id}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 0.35, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="absolute right-0 top-0 bottom-0 w-full md:w-3/5 pointer-events-none overflow-hidden"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={currentLesson.thumbnailUrl}
              alt={currentLesson.titleBm}
              onError={(e) => {
                const target = e.currentTarget;
                if (target.src.includes("maxresdefault.jpg")) {
                  target.src = target.src.replace("maxresdefault.jpg", "mqdefault.jpg");
                }
              }}
              className="w-full h-full object-cover object-center filter saturate-125 brightness-90"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#07090e] via-[#07090e]/80 to-transparent"></div>
          </motion.div>
        ) : (
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
        )}
      </AnimatePresence>

      {/* Floating HD Thumbnail Card on Desktop */}
      {currentLesson.thumbnailUrl && (
        <div
          onClick={() => onPlay(currentLesson)}
          className={`hidden lg:flex absolute right-10 top-1/2 -translate-y-1/2 w-80 md:w-96 aspect-video rounded-2xl overflow-hidden border ${
            isLockedForUser
              ? "border-amber-500/50 hover:border-amber-400"
              : "border-white/15 hover:border-red-500/60"
          } shadow-[0_12px_45px_rgba(0,0,0,0.85)] z-20 group cursor-pointer hover:scale-105 transition-all duration-300 bg-slate-950`}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={currentLesson.thumbnailUrl}
            alt={currentLesson.titleBm}
            onError={(e) => {
              const target = e.currentTarget;
              if (target.src.includes("maxresdefault.jpg")) {
                target.src = target.src.replace("maxresdefault.jpg", "mqdefault.jpg");
              }
            }}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors flex items-center justify-center">
            <div
              className={`w-12 h-12 rounded-full ${
                isLockedForUser ? "bg-amber-600/90 text-amber-100" : "bg-red-600/90 text-white"
              } flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform`}
            >
              {isLockedForUser ? (
                <Lock className="w-5 h-5 text-white" />
              ) : (
                <Play className="w-5 h-5 fill-white ml-0.5" />
              )}
            </div>
          </div>
          {isLockedForUser && (
            <span className="absolute top-2.5 left-2.5 px-2 py-0.5 text-[9px] font-black tracking-wide text-amber-300 bg-black/85 rounded backdrop-blur-md border border-amber-500/40 flex items-center gap-1 shadow-lg">
              <Lock className="w-2.5 h-2.5 text-amber-400" />
              <span>PREMIUM</span>
            </span>
          )}
          <span className="absolute bottom-2.5 right-2.5 px-2 py-0.5 text-[10px] font-bold text-white bg-black/80 rounded backdrop-blur-md border border-white/10">
            {currentLesson.duration}
          </span>
        </div>
      )}

      {/* Hero Badge */}
      <div className="relative z-10 flex items-center space-x-2.5 flex-wrap gap-y-2">
        <span
          className={`inline-flex items-center space-x-1.5 px-3.5 py-1.5 text-[11px] font-extrabold uppercase tracking-wider rounded-lg border shadow-lg backdrop-blur-md ${config.badgeStyle}`}
        >
          <CategoryIcon className="w-3.5 h-3.5" />
          <span>{lang === "bm" ? config.badgeBm : config.badgeDlp}</span>
        </span>
        <span
          className={`text-xs font-bold px-2.5 py-0.5 rounded border ${
            isForm5
              ? "text-amber-300 bg-amber-950/70 border-amber-600/40"
              : "text-slate-400 bg-slate-900/60 border-slate-800"
          }`}
        >
          {lang === "bm" ? `Tingkatan ${currentLesson.form}` : `Form ${currentLesson.form}`} • {currentLesson.week}
        </span>
        {isForm5 && (
          isSuperAdmin ? (
            <span className="px-2.5 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-[10px] font-black flex items-center space-x-1 shadow-sm">
              <span>👑</span>
              <span>{lang === "bm" ? "MOD PEMBANGUN" : "DEV ACCESS"}</span>
            </span>
          ) : (
            <span className="px-2.5 py-0.5 rounded bg-amber-500/20 border border-amber-500/50 text-amber-300 text-[10px] font-black flex items-center space-x-1 shadow-sm backdrop-blur-md">
              <Lock className="w-3 h-3 text-amber-400" />
              <span>PREMIUM</span>
            </span>
          )
        )}
      </div>

      {/* Main Content Info */}
      <div className="relative z-10 max-w-lg md:max-w-xl flex-1 flex flex-col justify-center overflow-hidden my-2">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentLesson.id}
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 40 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="space-y-3"
          >
            <span className="text-xs font-bold text-red-400 uppercase tracking-widest block">
              {lang === "bm"
                ? `Bab ${currentLesson.chapterNum}: ${currentLesson.chapterBm}`
                : `Ch ${currentLesson.chapterNum}: ${currentLesson.chapterDlp}`}
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight drop-shadow-md">
              {lang === "bm" ? currentLesson.titleBm : currentLesson.titleDlp}
            </h2>
            <p className="text-xs md:text-sm text-slate-300 line-clamp-2 leading-relaxed font-medium">
              {getLessonDescription(currentLesson, lang)}
            </p>

            {/* Buttons */}
            <div className="flex items-center space-x-4 pt-2">
              <button
                onClick={() => onPlay(currentLesson)}
                className={`flex items-center space-x-2 px-6 py-3 rounded-xl ${
                  isLockedForUser
                    ? "bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-500 hover:to-amber-600 text-white shadow-amber-950/80"
                    : "bg-red-600 hover:bg-red-500 text-white shadow-red-950/80"
                } font-bold text-xs md:text-sm transition shadow-lg active:scale-95 cursor-pointer`}
              >
                {isLockedForUser ? (
                  <Lock className="w-4 h-4 text-amber-200" />
                ) : (
                  <Play className="w-4 h-4 fill-white" />
                )}
                <span>
                  {isLockedForUser
                    ? lang === "bm"
                      ? "Tonton (Premium)"
                      : "Watch (Premium)"
                    : t("playNow")}
                </span>
              </button>

              <button
                onClick={() => setShowInfoModal(true)}
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
        <div className="flex items-center space-x-1.5 sm:space-x-2">
          {cleanLessons.map((lesson, idx) => {
            const isLessonF5 = lesson.form === 5;
            return (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                title={`${isLessonF5 ? "Tingkatan 5" : "Tingkatan 4"} • ${lesson.titleBm}`}
                className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                  idx === currentIndex
                    ? isLessonF5
                      ? "w-8 bg-amber-500 shadow-md shadow-amber-500/50"
                      : "w-8 bg-red-500 shadow-md shadow-red-500/50"
                    : isLessonF5
                    ? "w-2 bg-amber-700/60 hover:bg-amber-500/80"
                    : "w-2 bg-slate-700 hover:bg-slate-500"
                }`}
              />
            );
          })}
        </div>
        <span className="text-[11px] font-bold text-slate-400">
          {currentIndex + 1} / {cleanLessons.length}
        </span>
      </div>

      {/* "Apa Yang Akan Anda Pelajari" Pop-up Modal (Aligned with DSKP SP) */}
      <AnimatePresence>
        {showInfoModal && (
          <div
            className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
            onClick={() => setShowInfoModal(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.92, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: 15 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="relative w-full max-w-lg rounded-3xl bg-[#0e1320] border border-slate-700/70 shadow-2xl p-6 md:p-8 space-y-6 text-left"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="flex items-start justify-between gap-4 border-b border-slate-800/80 pb-4">
                <div className="space-y-1">
                  <div className="flex items-center space-x-2 flex-wrap gap-1">
                    <h3 className="text-xs font-black tracking-widest text-slate-400 uppercase">
                      {lang === "bm" ? "APA YANG AKAN ANDA PELAJARI" : "WHAT YOU'LL LEARN"}
                    </h3>
                    <span className="px-1.5 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-[9px] font-black">
                      DSKP KSSM SP
                    </span>
                    {isForm5 && (
                      <span className="px-1.5 py-0.5 rounded bg-amber-500/20 border border-amber-500/40 text-amber-300 text-[9px] font-black">
                        TINGKATAN 5
                      </span>
                    )}
                  </div>
                  <h4 className="text-base sm:text-lg font-extrabold text-white">
                    {lang === "bm" ? currentLesson.titleBm : currentLesson.titleDlp}
                  </h4>
                  <p className="text-xs text-red-400 font-semibold">
                    {lang === "bm"
                      ? `Bab ${currentLesson.chapterNum}: ${currentLesson.chapterBm}`
                      : `Chapter ${currentLesson.chapterNum}: ${currentLesson.chapterDlp}`}
                  </p>
                </div>

                <button
                  onClick={() => setShowInfoModal(false)}
                  className="p-2 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-400 hover:text-white transition cursor-pointer border border-slate-700/50"
                  aria-label="Tutup"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Form 5 Premium Notice in Modal if locked */}
              {isLockedForUser && (
                <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs flex items-center gap-2.5 shadow-sm">
                  <Lock className="w-4 h-4 text-amber-400 shrink-0" />
                  <span>
                    {lang === "bm"
                      ? "Modul Tingkatan 5 ini adalah kandungan premium eksklusif SPM PhysFlix."
                      : "This Form 5 module is exclusive SPM PhysFlix premium content."}
                  </span>
                </div>
              )}

              {/* Learning Points Checklist (With SP Badge Code) */}
              <div className="space-y-3 max-h-[50vh] overflow-y-auto pr-1">
                {(lang === "bm" ? currentLesson.learningPointsBm : currentLesson.learningPointsDlp).map(
                  (point, i) => {
                    const isSP = point.startsWith("SP ") || point.startsWith("LS ");
                    const colonIndex = point.indexOf(":");
                    const spCode = isSP && colonIndex !== -1 ? point.substring(0, colonIndex).trim() : null;
                    const spText = spCode ? point.substring(colonIndex + 1).trim() : point;

                    return (
                      <div
                        key={i}
                        className="flex items-start space-x-3 text-xs sm:text-sm text-slate-200 leading-relaxed group"
                      >
                        <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-400 shrink-0 mt-0.5" />
                        <div className="flex-1">
                          {spCode ? (
                            <>
                              <span className="inline-block px-1.5 py-0.5 mr-2 rounded bg-emerald-950/80 border border-emerald-500/40 text-emerald-300 font-mono text-[10px] font-bold shadow-sm">
                                {spCode}
                              </span>
                              <span className="text-slate-200 group-hover:text-white transition-colors">
                                {spText}
                              </span>
                            </>
                          ) : (
                            <span className="text-slate-200 group-hover:text-white transition-colors">
                              {point}
                            </span>
                          )}
                        </div>
                      </div>
                    );
                  }
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-end space-x-3 pt-2 border-t border-slate-800/80">
                <button
                  onClick={() => setShowInfoModal(false)}
                  className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold transition cursor-pointer"
                >
                  {lang === "bm" ? "Tutup" : "Close"}
                </button>
                <button
                  onClick={() => {
                    setShowInfoModal(false);
                    onPlay(currentLesson);
                  }}
                  className={`flex items-center space-x-2 px-5 py-2.5 rounded-xl ${
                    isLockedForUser
                      ? "bg-amber-600 hover:bg-amber-500 text-white shadow-amber-950/80"
                      : "bg-red-600 hover:bg-red-500 text-white shadow-red-950/80"
                  } font-bold text-xs transition shadow-lg active:scale-95 cursor-pointer`}
                >
                  {isLockedForUser ? (
                    <Lock className="w-3.5 h-3.5 text-amber-200" />
                  ) : (
                    <Play className="w-3.5 h-3.5 fill-white" />
                  )}
                  <span>
                    {isLockedForUser
                      ? lang === "bm"
                        ? "Tonton (Premium)"
                        : "Watch (Premium)"
                      : t("playNow")}
                  </span>
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
