"use client";

import React from "react";
import {
  Home,
  Bookmark,
  PlayCircle,
  Grid,
  BookOpen,
  GraduationCap,
  Target,
  FlaskConical,
  ListVideo,
  Radio,
  Sigma,
  Book,
  FileText,
  Calculator,
  ChevronRight
} from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

interface SidebarProps {
  currentTab: string;
  onTabChange: (tab: string) => void;
  onOpenFormula: () => void;
  onOpenDict: () => void;
  onOpenQuiz: () => void;
  onOpenCalc: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentTab,
  onTabChange,
  onOpenFormula,
  onOpenDict,
  onOpenQuiz,
  onOpenCalc
}) => {
  const { t } = useLanguage();

  const mainNav = [
    { id: "home", label: t("navHome"), icon: Home },
    { id: "mylist", label: t("navMyList"), icon: Bookmark },
    { id: "continue", label: t("navContinue"), icon: PlayCircle },
    { id: "topics", label: t("navBrowse"), icon: Grid },
    { id: "form4", label: t("navForm4"), icon: BookOpen, badge: "43 Videos" },
    { id: "form5", label: t("navForm5"), icon: GraduationCap },
    { id: "spm", label: t("navSPMRevision"), icon: Target },
    { id: "experiments", label: t("navExperiments"), icon: FlaskConical },
    { id: "playlists", label: t("navPlaylists"), icon: ListVideo },
    { id: "live", label: t("navLiveClasses"), icon: Radio, isLive: true }
  ];

  return (
    <aside className="w-64 hidden md:flex flex-col bg-[#0b0e17] border-r border-slate-800/80 p-4 space-y-6 h-[calc(100vh-4rem)] overflow-y-auto sticky top-16">
      {/* Brand logo if sidebar expanded */}
      <div className="flex items-center space-x-3 px-2">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-red-600 to-red-500 flex items-center justify-center font-black text-white text-2xl shadow-lg shadow-red-950">
          S
        </div>
        <div>
          <div className="text-lg font-black text-white tracking-tight leading-none">
            SHP<span className="text-red-500">Flix</span>
          </div>
          <span className="text-[10px] text-slate-400 font-medium">
            Physics. Anytime. Anywhere.
          </span>
        </div>
      </div>

      {/* Main Navigation */}
      <div className="space-y-1">
        {mainNav.map((item) => {
          const Icon = item.icon;
          const isActive = currentTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onTabChange(item.id)}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition ${
                isActive
                  ? "bg-gradient-to-r from-red-600 to-red-700 text-white shadow-lg shadow-red-950/60"
                  : "text-slate-400 hover:text-white hover:bg-slate-800/50"
              }`}
            >
              <div className="flex items-center space-x-3">
                <Icon className={`w-4 h-4 ${isActive ? "text-white" : "text-slate-400"}`} />
                <span>{item.label}</span>
              </div>
              {item.badge && (
                <span className="px-2 py-0.5 text-[9px] font-bold text-red-400 bg-red-950/60 rounded-full border border-red-800/50">
                  {item.badge}
                </span>
              )}
              {item.isLive && (
                <span className="w-2 h-2 rounded-full bg-red-500 animate-ping"></span>
              )}
            </button>
          );
        })}
      </div>

      {/* Quick Access */}
      <div className="pt-4 border-t border-slate-800/80">
        <h3 className="px-3 text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-2">
          {t("quickAccess")}
        </h3>
        <div className="space-y-1.5">
          <button
            onClick={onOpenFormula}
            className="w-full flex items-center justify-between px-3.5 py-2 rounded-xl text-xs font-medium text-slate-300 bg-[#121623] hover:bg-[#181e30] border border-slate-800 transition"
          >
            <div className="flex items-center space-x-2.5">
              <Sigma className="w-4 h-4 text-purple-400" />
              <span>{t("formulaSheet")}</span>
            </div>
            <ChevronRight className="w-3.5 h-3.5 text-slate-500" />
          </button>

          <button
            onClick={onOpenDict}
            className="w-full flex items-center justify-between px-3.5 py-2 rounded-xl text-xs font-medium text-slate-300 bg-[#121623] hover:bg-[#181e30] border border-slate-800 transition"
          >
            <div className="flex items-center space-x-2.5">
              <Book className="w-4 h-4 text-blue-400" />
              <span>{t("physicsDict")}</span>
            </div>
            <ChevronRight className="w-3.5 h-3.5 text-slate-500" />
          </button>

          <button
            onClick={onOpenQuiz}
            className="w-full flex items-center justify-between px-3.5 py-2 rounded-xl text-xs font-medium text-slate-300 bg-[#121623] hover:bg-[#181e30] border border-slate-800 transition"
          >
            <div className="flex items-center space-x-2.5">
              <FileText className="w-4 h-4 text-amber-400" />
              <span>{t("pastYear")}</span>
            </div>
            <ChevronRight className="w-3.5 h-3.5 text-slate-500" />
          </button>

          <button
            onClick={onOpenCalc}
            className="w-full flex items-center justify-between px-3.5 py-2 rounded-xl text-xs font-medium text-slate-300 bg-[#121623] hover:bg-[#181e30] border border-slate-800 transition"
          >
            <div className="flex items-center space-x-2.5">
              <Calculator className="w-4 h-4 text-emerald-400" />
              <span>{t("calculator")}</span>
            </div>
            <ChevronRight className="w-3.5 h-3.5 text-slate-500" />
          </button>
        </div>
      </div>

      {/* Profile Card Footer */}
      <div className="mt-auto pt-4 border-t border-slate-800/80">
        <div className="p-3 bg-[#131724] border border-slate-800 rounded-xl flex items-center space-x-3">
          <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-amber-500 to-red-600 flex items-center justify-center text-white font-bold text-xs ring-2 ring-red-500/20">
            SH
          </div>
          <div className="flex-1 overflow-hidden">
            <h4 className="text-xs font-bold text-white truncate">Sir Halim</h4>
            <p className="text-[10px] text-slate-400 truncate">{t("teacherRole")}</p>
          </div>
        </div>
      </div>
    </aside>
  );
};
