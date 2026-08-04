"use client";

import React from "react";
import { FileText, Edit3, Folder, Zap, Sigma } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

interface RevisionCollectionsProps {
  onOpenQuiz: () => void;
  onOpenFormula: () => void;
}

export const RevisionCollections: React.FC<RevisionCollectionsProps> = ({
  onOpenQuiz,
  onOpenFormula
}) => {
  const { t } = useLanguage();

  const collections = [
    {
      title: t("kertas1Title"),
      desc: "Objektif",
      count: "320 Questions",
      icon: FileText,
      color: "bg-indigo-950/60 border-indigo-800/40 text-indigo-400",
      action: onOpenQuiz
    },
    {
      title: t("kertas2Title"),
      desc: "Struktur",
      count: "120 Questions",
      icon: Edit3,
      color: "bg-pink-950/60 border-pink-800/40 text-pink-400",
      action: onOpenQuiz
    },
    {
      title: t("topicalTitle"),
      desc: "Mengikut Topik",
      count: "58 Playlists",
      icon: Folder,
      color: "bg-teal-950/60 border-teal-800/40 text-teal-400",
      action: onOpenQuiz
    },
    {
      title: t("quickRevisionTitle"),
      desc: "Ringkasan Pantas",
      count: "25 Videos",
      icon: Zap,
      color: "bg-amber-950/60 border-amber-800/40 text-amber-400",
      action: onOpenQuiz
    },
    {
      title: t("formulaTitle"),
      desc: "Nota & Formula",
      count: "1 PDF",
      icon: Sigma,
      color: "bg-blue-950/60 border-blue-800/40 text-blue-400",
      action: onOpenFormula
    }
  ];

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-bold text-white tracking-tight">
        {t("revisionCollections")}
      </h3>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {collections.map((col, idx) => {
          const Icon = col.icon;
          return (
            <div
              key={idx}
              onClick={col.action}
              className="group cursor-pointer p-4 rounded-2xl bg-[#121622] border border-slate-800 hover:border-slate-700 transition duration-300 shadow-lg flex items-center justify-between"
            >
              <div className="space-y-1">
                <h4 className="text-xs font-bold text-white group-hover:text-red-400 transition">
                  {col.title}
                </h4>
                <p className="text-[10px] text-slate-400 font-medium">{col.desc}</p>
                <span className="inline-block text-[9px] font-bold text-slate-500">
                  {col.count}
                </span>
              </div>
              <div className={`w-10 h-10 rounded-xl ${col.color} border flex items-center justify-center`}>
                <Icon className="w-5 h-5" />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
