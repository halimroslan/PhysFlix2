"use client";

import React, { useState } from "react";
import { X, Search, BookOpen, Copy, Check } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

interface FormulaItem {
  categoryBm: string;
  categoryDlp: string;
  symbol: string;
  nameBm: string;
  nameDlp: string;
  variablesBm: string;
  variablesDlp: string;
}

const formulas: FormulaItem[] = [
  {
    categoryBm: "1. Daya dan Gerakan",
    categoryDlp: "1. Force and Motion",
    symbol: "v = u + at",
    nameBm: "Persamaan Gerakan Linear 1",
    nameDlp: "Linear Motion Equation 1",
    variablesBm: "v = halaju akhir, u = halaju awal, a = pecutan, t = masa",
    variablesDlp: "v = final velocity, u = initial velocity, a = acceleration, t = time"
  },
  {
    categoryBm: "1. Daya dan Gerakan",
    categoryDlp: "1. Force and Motion",
    symbol: "s = ut + ½at²",
    nameBm: "Persamaan Gerakan Linear 2",
    nameDlp: "Linear Motion Equation 2",
    variablesBm: "s = sesaran, u = halaju awal, a = pecutan, t = masa",
    variablesDlp: "s = displacement, u = initial velocity, a = acceleration, t = time"
  },
  {
    categoryBm: "1. Daya dan Gerakan",
    categoryDlp: "1. Force and Motion",
    symbol: "v² = u² + 2as",
    nameBm: "Persamaan Gerakan Linear 3",
    nameDlp: "Linear Motion Equation 3",
    variablesBm: "v = halaju akhir, u = halaju awal, a = pecutan, s = sesaran",
    variablesDlp: "v = final velocity, u = initial velocity, a = acceleration, s = displacement"
  },
  {
    categoryBm: "1. Daya dan Gerakan",
    categoryDlp: "1. Force and Motion",
    symbol: "F = ma",
    nameBm: "Hukum Newton Kedua",
    nameDlp: "Newton's Second Law",
    variablesBm: "F = daya paduan (N), m = jisim (kg), a = pecutan (m/s²)",
    variablesDlp: "F = resultant force (N), m = mass (kg), a = acceleration (m/s²)"
  },
  {
    categoryBm: "1. Daya dan Gerakan",
    categoryDlp: "1. Force and Motion",
    symbol: "p = mv",
    nameBm: "Momentum",
    nameDlp: "Momentum",
    variablesBm: "p = momentum (kg m/s), m = jisim (kg), v = halaju (m/s)",
    variablesDlp: "p = momentum (kg m/s), m = mass (kg), v = velocity (m/s)"
  },
  {
    categoryBm: "2. Kegravitian",
    categoryDlp: "2. Gravitation",
    symbol: "F = G(m₁m₂)/r²",
    nameBm: "Hukum Kegravitian Semesta Newton",
    nameDlp: "Newton's Law of Universal Gravitation",
    variablesBm: "G = 6.67 × 10⁻¹¹ N m²/kg², m₁,m₂ = jisim jasad, r = jarak antara pusat",
    variablesDlp: "G = 6.67 × 10⁻¹¹ N m²/kg², m₁,m₂ = masses, r = distance between centres"
  },
  {
    categoryBm: "2. Kegravitian",
    categoryDlp: "2. Gravitation",
    symbol: "F = mv²/r",
    nameBm: "Daya Memusat",
    nameDlp: "Centripetal Force",
    variablesBm: "m = jisim satelit, v = halaju linear, r = jejari orbit",
    variablesDlp: "m = satellite mass, v = linear velocity, r = orbital radius"
  },
  {
    categoryBm: "3. Haba",
    categoryDlp: "3. Heat",
    symbol: "Q = mcΔθ",
    nameBm: "Muatan Haba Tentu",
    nameDlp: "Specific Heat Capacity",
    variablesBm: "Q = tenaga haba (J), m = jisim (kg), c = muatan haba tentu, Δθ = perubahan suhu",
    variablesDlp: "Q = heat energy (J), m = mass (kg), c = specific heat capacity, Δθ = temp change"
  },
  {
    categoryBm: "3. Haba",
    categoryDlp: "3. Heat",
    symbol: "Q = mL",
    nameBm: "Haba Pendam Tentu",
    nameDlp: "Specific Latent Heat",
    variablesBm: "Q = tenaga haba (J), m = jisim (kg), L = haba pendam tentu (J/kg)",
    variablesDlp: "Q = heat energy (J), m = mass (kg), L = specific latent heat (J/kg)"
  },
  {
    categoryBm: "4. Gelombang",
    categoryDlp: "4. Waves",
    symbol: "v = fλ",
    nameBm: "Halaju Gelombang",
    nameDlp: "Wave Velocity",
    variablesBm: "v = laju gelombang (m/s), f = frekuensi (Hz), λ = panjang gelombang (m)",
    variablesDlp: "v = wave speed (m/s), f = frequency (Hz), λ = wavelength (m)"
  },
  {
    categoryBm: "4. Gelombang",
    categoryDlp: "4. Waves",
    symbol: "λ = ax / D",
    nameBm: "Formula Interferens (Young)",
    nameDlp: "Interference Formula (Young)",
    variablesBm: "a = jarak antara dwisela, x = pemisahan pinggir, D = jarak sela ke skrin",
    variablesDlp: "a = slit separation, x = fringe separation, D = distance to screen"
  },
  {
    categoryBm: "5. Cahaya & Optik",
    categoryDlp: "5. Light & Optics",
    symbol: "n = sin i / sin r",
    nameBm: "Hukum Snell",
    nameDlp: "Snell's Law",
    variablesBm: "n = indeks pembiasan, i = sudut tujuh, r = sudut pembiasan",
    variablesDlp: "n = refractive index, i = angle of incidence, r = angle of refraction"
  },
  {
    categoryBm: "5. Cahaya & Optik",
    categoryDlp: "5. Light & Optics",
    symbol: "1/f = 1/u + 1/v",
    nameBm: "Persamaan Kanta / Cermin",
    nameDlp: "Lens / Mirror Equation",
    variablesBm: "f = panjang fokus, u = jarak objek, v = jarak imej",
    variablesDlp: "f = focal length, u = object distance, v = image distance"
  }
];

export const FormulaSheetModal: React.FC<{ isOpen: boolean; onClose: () => void }> = ({
  isOpen,
  onClose
}) => {
  const { lang, t } = useLanguage();
  const [search, setSearch] = useState("");
  const [copiedSymbol, setCopiedSymbol] = useState<string | null>(null);

  if (!isOpen) return null;

  const filteredFormulas = formulas.filter((item) => {
    const term = search.toLowerCase();
    const name = lang === "bm" ? item.nameBm : item.nameDlp;
    const cat = lang === "bm" ? item.categoryBm : item.categoryDlp;
    return (
      name.toLowerCase().includes(term) ||
      item.symbol.toLowerCase().includes(term) ||
      cat.toLowerCase().includes(term)
    );
  });

  const handleCopy = (sym: string) => {
    navigator.clipboard.writeText(sym);
    setCopiedSymbol(sym);
    setTimeout(() => setCopiedSymbol(null), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4">
      <div className="relative w-full max-w-3xl max-h-[85vh] bg-[#111622] border border-slate-700/60 rounded-2xl shadow-2xl flex flex-col overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-[#0d101a]">
          <div className="flex items-center space-x-3">
            <div className="w-9 h-9 rounded-xl bg-red-600/20 border border-red-500/30 flex items-center justify-center text-red-500 font-bold text-xl">
              ∑
            </div>
            <div>
              <h2 className="text-lg font-bold text-white">
                {lang === "bm" ? "Helaian Formula Fizik SPM" : "SPM Physics Formula Sheet"}
              </h2>
              <p className="text-xs text-slate-400">
                {lang === "bm"
                  ? "Rujukan lengkap formula KSSM Tingkatan 4 & 5"
                  : "Complete KSSM Form 4 & 5 formula reference"}
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

        {/* Search */}
        <div className="p-4 border-b border-slate-800 bg-[#0d101a]/50">
          <div className="relative">
            <Search className="absolute left-3.5 top-3 w-4 h-4 text-slate-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder={
                lang === "bm"
                  ? "Cari formula (cth: F=ma, v=u+at, n=sini/sinr)..."
                  : "Search formula (e.g. F=ma, v=u+at)..."
              }
              className="w-full pl-10 pr-4 py-2.5 bg-[#181f30] border border-slate-700/60 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:border-red-500"
            />
          </div>
        </div>

        {/* Formula Cards List */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {filteredFormulas.map((item, idx) => (
            <div
              key={idx}
              className="p-4 rounded-xl bg-[#171d2b] border border-slate-800 hover:border-slate-700 transition flex flex-col md:flex-row md:items-center justify-between gap-4"
            >
              <div className="space-y-1.5 flex-1">
                <span className="inline-block px-2.5 py-0.5 text-[10px] font-semibold tracking-wide text-red-400 bg-red-950/40 border border-red-800/40 rounded-full">
                  {lang === "bm" ? item.categoryBm : item.categoryDlp}
                </span>
                <h3 className="text-sm font-semibold text-slate-200">
                  {lang === "bm" ? item.nameBm : item.nameDlp}
                </h3>
                <p className="text-xs text-slate-400">
                  {lang === "bm" ? item.variablesBm : item.variablesDlp}
                </p>
              </div>

              <div className="flex items-center space-x-3 bg-[#0c0f17] px-4 py-3 rounded-xl border border-slate-800 min-w-[200px] justify-between">
                <code className="text-base font-mono font-bold text-red-400">
                  {item.symbol}
                </code>
                <button
                  onClick={() => handleCopy(item.symbol)}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition"
                  title="Salin formula"
                >
                  {copiedSymbol === item.symbol ? (
                    <Check className="w-4 h-4 text-emerald-400" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
