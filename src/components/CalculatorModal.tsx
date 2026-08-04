"use client";

import React, { useState } from "react";
import { X, Calculator } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export const CalculatorModal: React.FC<{ isOpen: boolean; onClose: () => void }> = ({
  isOpen,
  onClose
}) => {
  const { lang } = useLanguage();
  const [display, setDisplay] = useState("0");

  if (!isOpen) return null;

  const handleBtn = (val: string) => {
    if (val === "C") {
      setDisplay("0");
    } else if (val === "=") {
      try {
        const sanitized = display.replace(/×/g, "*").replace(/÷/g, "/");
        const res = eval(sanitized);
        setDisplay(String(res));
      } catch (err) {
        setDisplay("Error");
      }
    } else {
      setDisplay((prev) => (prev === "0" || prev === "Error" ? val : prev + val));
    }
  };

  const buttons = [
    ["C", "(", ")", "÷"],
    ["7", "8", "9", "×"],
    ["4", "5", "6", "-"],
    ["1", "2", "3", "+"],
    ["0", ".", "e", "="]
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4">
      <div className="relative w-full max-w-sm bg-[#111622] border border-slate-700/60 rounded-2xl shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-3.5 border-b border-slate-800 bg-[#0d101a]">
          <div className="flex items-center space-x-2 text-white">
            <Calculator className="w-5 h-5 text-emerald-400" />
            <h2 className="text-sm font-bold">
              {lang === "bm" ? "Kalkulator Saintifik Fizik" : "Scientific Physics Calculator"}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Display */}
        <div className="p-4 bg-[#0a0d14]">
          <div className="w-full p-4 bg-[#141926] border border-slate-800 rounded-xl text-right font-mono text-2xl font-bold text-emerald-400 overflow-x-auto">
            {display}
          </div>
        </div>

        {/* Buttons Grid */}
        <div className="p-4 grid grid-cols-4 gap-2 bg-[#0e121d]">
          {buttons.flat().map((btn, idx) => {
            let isOp = ["÷", "×", "-", "+", "="].includes(btn);
            let isClear = btn === "C";
            return (
              <button
                key={idx}
                onClick={() => handleBtn(btn)}
                className={`py-3 rounded-xl font-mono text-sm font-bold transition ${
                  isClear
                    ? "bg-red-950/60 text-red-400 hover:bg-red-900/60 border border-red-800/40"
                    : isOp
                    ? "bg-emerald-950/60 text-emerald-300 hover:bg-emerald-900/60 border border-emerald-800/40"
                    : "bg-[#181f30] text-slate-200 hover:bg-slate-800 border border-slate-800"
                }`}
              >
                {btn}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
