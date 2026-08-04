"use client";

import React from "react";
import { ChevronRight, Zap, Flame, Radio, Atom, Compass } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

interface TopPicksProps {
  onSelectTopic: (chapterNum: number) => void;
}

export const TopPicks: React.FC<TopPicksProps> = ({ onSelectTopic }) => {
  const { t } = useLanguage();

  const categories = [
    {
      chapterNum: 2,
      name: t("catMekaniks"),
      sub: t("catMekaniksSub"),
      count: 12,
      gradient: "card-gradient-mekaniks",
      icon: Compass,
      borderColor: "border-indigo-500/40"
    },
    {
      chapterNum: 4,
      name: t("catHaba"),
      sub: t("catHabaSub"),
      count: 8,
      gradient: "card-gradient-haba",
      icon: Flame,
      borderColor: "border-teal-500/40"
    },
    {
      chapterNum: 3,
      name: t("catElektrik"),
      sub: t("catElektrikSub"),
      count: 15,
      gradient: "card-gradient-elektrik",
      icon: Zap,
      borderColor: "border-orange-500/40"
    },
    {
      chapterNum: 5,
      name: t("catGelombang"),
      sub: t("catGelombangSub"),
      count: 10,
      gradient: "card-gradient-gelombang",
      icon: Radio,
      borderColor: "border-purple-500/40"
    },
    {
      chapterNum: 6,
      name: t("catFizikModen"),
      sub: t("catFizikModenSub"),
      count: 7,
      gradient: "card-gradient-moden",
      icon: Atom,
      borderColor: "border-emerald-500/40"
    }
  ];

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-bold text-white tracking-tight">
          {t("topPicks")}
        </h3>
        <ChevronRight className="w-5 h-5 text-slate-400 cursor-pointer hover:text-white transition" />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {categories.map((cat, idx) => {
          const Icon = cat.icon;
          return (
            <div
              key={idx}
              onClick={() => onSelectTopic(cat.chapterNum)}
              className={`group cursor-pointer p-5 rounded-2xl ${cat.gradient} border ${cat.borderColor} hover:scale-105 transition duration-300 shadow-xl flex flex-col justify-between h-40 relative overflow-hidden`}
            >
              {/* Background ambient glow */}
              <div className="absolute -right-4 -bottom-4 w-24 h-24 bg-white/10 rounded-full blur-xl group-hover:scale-150 transition"></div>

              <div>
                <h4 className="text-base font-extrabold text-white tracking-tight">
                  {cat.name}
                </h4>
                <p className="text-[11px] text-white/80 font-medium leading-snug mt-0.5">
                  {cat.sub}
                </p>
              </div>

              <div className="flex items-center justify-between pt-2 z-10">
                <span className="px-2.5 py-1 text-[10px] font-bold text-white bg-black/40 border border-white/20 rounded-full backdrop-blur-sm">
                  {cat.count} {t("videosCount")}
                </span>
                <div className="w-9 h-9 rounded-xl bg-white/10 backdrop-blur-sm flex items-center justify-center text-white group-hover:bg-white/20 transition">
                  <Icon className="w-5 h-5" />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
