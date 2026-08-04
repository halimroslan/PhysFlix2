"use client";

import React, { useState } from "react";
import { X, Search, Book, ArrowRightLeft } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

interface DictTerm {
  bm: string;
  dlp: string;
  defBm: string;
  defDlp: string;
}

const terms: DictTerm[] = [
  {
    bm: "Kuantiti Asas",
    dlp: "Base Quantity",
    defBm: "Kuantiti fizik yang tidak boleh ditakrifkan dalam sebutan kuantiti fizik yang lain.",
    defDlp: "A physical quantity which cannot be defined in terms of other physical quantities."
  },
  {
    bm: "Inersia",
    dlp: "Inertia",
    defBm: "Sifat suatu objek yang cenderung menentang sebarang perubahan kepada keadaan asalnya.",
    defDlp: "The tendency of an object to resist any change in its original state of motion or rest."
  },
  {
    bm: "Keseimbangan Terma",
    dlp: "Thermal Equilibrium",
    defBm: "Keadaan di mana kadar pemindahan haba bersih antara dua jasad yang bersentuhan adalah sifar.",
    defDlp: "Condition where the net rate of heat transfer between two touching bodies is zero."
  },
  {
    bm: "Muatan Haba Tentu",
    dlp: "Specific Heat Capacity",
    defBm: "Kuantiti haba yang diperlukan untuk menaikkan suhu 1 kg bahan sebanyak 1 °C.",
    defDlp: "The amount of heat energy required to raise the temperature of 1 kg mass by 1 °C."
  },
  {
    bm: "Pembiasan Cahaya",
    dlp: "Refraction of Light",
    defBm: "Pembengkokan sinar cahaya apabila merambat dari satu medium ke medium lain yang berbeza ketumpatan optik.",
    defDlp: "The bending of a light ray as it travels from one medium to another with different optical density."
  },
  {
    bm: "Pantulan Dalam Penuh",
    dlp: "Total Internal Reflection",
    defBm: "Fenomena pantulan cahaya sepenuhnya apabila sudut tujuh melebihi sudut genting.",
    defDlp: "Phenomenon where light ray is completely reflected inside medium when incident angle exceeds critical angle."
  },
  {
    bm: "Resonans",
    dlp: "Resonance",
    defBm: "Sistem berayun pada frekuensi aslinya dengan amplitud maksimum apabila dikenakan daya luar.",
    defDlp: "System oscillating at its natural frequency with maximum amplitude when driven by periodic force."
  },
  {
    bm: "Interferens Membina",
    dlp: "Constructive Interference",
    defBm: "Superposisi dua gelombang sefasa yang menghasilkan gelombang bertambah amplitud.",
    defDlp: "Superposition of two in-phase waves producing a resultant wave of increased amplitude."
  }
];

export const DictionaryModal: React.FC<{ isOpen: boolean; onClose: () => void }> = ({
  isOpen,
  onClose
}) => {
  const { lang } = useLanguage();
  const [search, setSearch] = useState("");

  if (!isOpen) return null;

  const filteredTerms = terms.filter((item) => {
    const term = search.toLowerCase();
    return (
      item.bm.toLowerCase().includes(term) ||
      item.dlp.toLowerCase().includes(term) ||
      item.defBm.toLowerCase().includes(term) ||
      item.defDlp.toLowerCase().includes(term)
    );
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4">
      <div className="relative w-full max-w-3xl max-h-[85vh] bg-[#111622] border border-slate-700/60 rounded-2xl shadow-2xl flex flex-col overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-[#0d101a]">
          <div className="flex items-center space-x-3">
            <div className="w-9 h-9 rounded-xl bg-blue-600/20 border border-blue-500/30 flex items-center justify-center text-blue-400">
              <Book className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white">
                {lang === "bm" ? "Kamus Fizik SPM (BM ↔ DLP)" : "SPM Physics Dictionary (BM ↔ DLP)"}
              </h2>
              <p className="text-xs text-slate-400">
                {lang === "bm"
                  ? "Glosari istilah fizikal Dwibahasa KSSM"
                  : "Bilingual physical terms glossary for KSSM"}
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

        {/* Search Input */}
        <div className="p-4 border-b border-slate-800 bg-[#0d101a]/50">
          <div className="relative">
            <Search className="absolute left-3.5 top-3 w-4 h-4 text-slate-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder={
                lang === "bm"
                  ? "Cari istilah fizik (cth: Inersia, Resonans, Total Internal Reflection)..."
                  : "Search physics terms..."
              }
              className="w-full pl-10 pr-4 py-2.5 bg-[#181f30] border border-slate-700/60 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
            />
          </div>
        </div>

        {/* List */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {filteredTerms.map((item, idx) => (
            <div
              key={idx}
              className="p-5 rounded-xl bg-[#171d2b] border border-slate-800 hover:border-slate-700 transition space-y-3"
            >
              <div className="flex items-center space-x-2 text-base font-bold">
                <span className="text-red-400">{item.bm}</span>
                <ArrowRightLeft className="w-4 h-4 text-slate-500" />
                <span className="text-blue-400">{item.dlp}</span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2 text-xs border-t border-slate-800/80">
                <div className="bg-[#0e121d] p-3 rounded-lg border border-slate-800">
                  <span className="font-semibold text-slate-300 block mb-1">BM:</span>
                  <p className="text-slate-400 leading-relaxed">{item.defBm}</p>
                </div>
                <div className="bg-[#0e121d] p-3 rounded-lg border border-slate-800">
                  <span className="font-semibold text-slate-300 block mb-1">DLP (English):</span>
                  <p className="text-slate-400 leading-relaxed">{item.defDlp}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
