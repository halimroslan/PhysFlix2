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
    { id: "topics", label: t("navBrowse"), icon: Grid },
    { id: "form4", label: t("navForm4"), icon: BookOpen, badge: "43 Videos" },
    { id: "form5", label: t("navForm5"), icon: GraduationCap, badge: "38 Videos" },
    { id: "spm", label: t("navSPMRevision"), icon: Target },
    { id: "experiments", label: "MyHomePhysics Lab", icon: FlaskConical },
    { id: "playlists", label: t("navPlaylists"), icon: ListVideo }
  ];

  return (
    <aside className="w-64 hidden md:flex flex-col bg-[#0b0e17] border-r border-slate-800/80 p-4 space-y-6 h-[calc(100vh-7rem)] overflow-y-auto sticky top-28 select-none">
      {/* Main Navigation */}
      <div className="space-y-1">
        {mainNav.map((item) => {
          const Icon = item.icon;
          const isActive = currentTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => {
                if (item.id === "experiments") {
                  window.open("https://myphysicstutor2.vercel.app/#myhomephysicslab", "_blank");
                } else {
                  onTabChange(item.id);
                }
              }}
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


    </aside>
  );
};
