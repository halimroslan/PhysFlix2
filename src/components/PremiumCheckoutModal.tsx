"use client";

import React, { useState } from "react";
import { 
  X, 
  Crown, 
  CheckCircle2, 
  ShieldCheck, 
  Building2, 
  QrCode, 
  ArrowRight, 
  Loader2, 
  Sparkles, 
  Lock, 
  Check, 
  Zap
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { useLanguage } from "@/context/LanguageContext";
import { motion } from "framer-motion";

interface PremiumCheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

interface BankOption {
  id: string;
  name: string;
  shortName: string;
  color: string;
  bgBadge: string;
}

const FPX_BANKS: BankOption[] = [
  { id: "MBB", name: "Maybank2u", shortName: "Maybank", color: "#facc15", bgBadge: "bg-yellow-500/20 text-yellow-300 border-yellow-500/40" },
  { id: "CIMB", name: "CIMB Clicks", shortName: "CIMB", color: "#ef4444", bgBadge: "bg-red-500/20 text-red-300 border-red-500/40" },
  { id: "BIMB", name: "Bank Islam", shortName: "Bank Islam", color: "#dc2626", bgBadge: "bg-rose-500/20 text-rose-300 border-rose-500/40" },
  { id: "RHB", name: "RHB Now", shortName: "RHB", color: "#3b82f6", bgBadge: "bg-blue-500/20 text-blue-300 border-blue-500/40" },
  { id: "PBB", name: "Public Bank", shortName: "Public Bank", color: "#f87171", bgBadge: "bg-red-500/20 text-red-300 border-red-500/40" },
  { id: "HLB", name: "Hong Leong Connect", shortName: "Hong Leong", color: "#60a5fa", bgBadge: "bg-sky-500/20 text-sky-300 border-sky-500/40" },
  { id: "BKRM", name: "Bank Rakyat", shortName: "Bank Rakyat", color: "#f97316", bgBadge: "bg-orange-500/20 text-orange-300 border-orange-500/40" },
  { id: "BSN", name: "myBSN", shortName: "BSN", color: "#14b8a6", bgBadge: "bg-teal-500/20 text-teal-300 border-teal-500/40" },
  { id: "AMB", name: "AmOnline", shortName: "AmBank", color: "#fbbf24", bgBadge: "bg-amber-500/20 text-amber-300 border-amber-500/40" },
  { id: "AFFIN", name: "Affin Always", shortName: "Affin Bank", color: "#38bdf8", bgBadge: "bg-cyan-500/20 text-cyan-300 border-cyan-500/40" },
];

export const PremiumCheckoutModal: React.FC<PremiumCheckoutModalProps> = ({
  isOpen,
  onClose,
  onSuccess
}) => {
  const { user, unlockPremium } = useAuth();
  const { lang } = useLanguage();
  
  const [paymentMethod, setPaymentMethod] = useState<"fpx" | "duitnow">("fpx");
  const [selectedBank, setSelectedBank] = useState<string>("MBB");
  const [duitNowRef, setDuitNowRef] = useState<string>("");
  
  // Processing States
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [processingStep, setProcessingStep] = useState<string>("");
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [transactionRef, setTransactionRef] = useState<string>("");

  if (!isOpen) return null;

  const currentBank = FPX_BANKS.find(b => b.id === selectedBank) || FPX_BANKS[0];

  const handlePay = async () => {
    setIsProcessing(true);
    const newRef = `PFX-${Date.now().toString().slice(-6)}`;
    setTransactionRef(newRef);

    try {
      if (paymentMethod === "fpx") {
        setProcessingStep(lang === "bm" ? `Menyambung ke ${currentBank.name} (FPX)...` : `Connecting to ${currentBank.name} (FPX)...`);
        await new Promise(r => setTimeout(r, 1200));

        setProcessingStep(lang === "bm" ? "Mengesahkan pertukaran token perbankan selamat..." : "Verifying secure banking token exchange...");
        await new Promise(r => setTimeout(r, 1300));

        setProcessingStep(lang === "bm" ? "Pemindahan berjaya! Mengaktifkan akses premium..." : "Transfer successful! Activating premium access...");
        await new Promise(r => setTimeout(r, 1000));
      } else {
        setProcessingStep(lang === "bm" ? "Menentusahkan rujukan transaksi DuitNow..." : "Verifying DuitNow transaction reference...");
        await new Promise(r => setTimeout(r, 1400));

        setProcessingStep(lang === "bm" ? "Pembayaran DuitNow disahkan! Membuka akses SPM..." : "DuitNow payment verified! Unlocking SPM access...");
        await new Promise(r => setTimeout(r, 1000));
      }

      // Unlock Premium in Auth Context and LocalStorage / Supabase
      if (unlockPremium) {
        await unlockPremium();
      }

      // Save receipt record
      const receiptData = {
        ref: newRef,
        amount: "RM30.00",
        date: new Date().toISOString(),
        method: paymentMethod === "fpx" ? `FPX (${currentBank.name})` : "DuitNow QR",
        buyerEmail: user?.email || "pelajar@physflix.com",
        plan: "Akses Penuh SPM Tingkatan 5 (Seumur Hidup)"
      };
      localStorage.setItem("physflix_last_receipt", JSON.stringify(receiptData));

      setIsProcessing(false);
      setIsSuccess(true);

      // Trigger success callback after 2 seconds
      setTimeout(() => {
        if (onSuccess) onSuccess();
        onClose();
      }, 2200);

    } catch (err) {
      console.error("Payment error:", err);
      setIsProcessing(false);
      alert(lang === "bm" ? "Terdapat masalah semasa memproses bayaran. Sila cuba lagi." : "Payment processing error. Please try again.");
    }
  };

  return (
    <div className="fixed inset-0 z-[250] flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md overflow-y-auto">
      <motion.div
        initial={{ opacity: 0, scale: 0.94, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.94, y: 15 }}
        transition={{ duration: 0.25, ease: "easeOut" }}
        className="relative w-full max-w-2xl rounded-3xl bg-[#0b0e17] border border-amber-500/30 shadow-[0_0_60px_rgba(245,158,11,0.2)] p-5 sm:p-7 md:p-8 space-y-6 text-left my-auto overflow-hidden"
      >
        {/* Ambient Top Glow */}
        <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none"></div>

        {/* Modal Header */}
        <div className="relative z-10 flex items-start justify-between gap-4 border-b border-slate-800/80 pb-4">
          <div className="flex items-center space-x-3">
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-amber-500 to-yellow-400 flex items-center justify-center shadow-lg shadow-amber-500/25 ring-2 ring-amber-300/30 shrink-0">
              <Crown className="w-6 h-6 text-slate-950 fill-slate-950" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full bg-amber-500/15 border border-amber-500/40 text-amber-300">
                  {lang === "bm" ? "LANGGANAN EKSKLUSIF" : "PREMIUM SUBSCRIPTION"}
                </span>
                <span className="text-[10px] font-bold text-emerald-400 flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>FPX & DuitNow Terjamin</span>
                </span>
              </div>
              <h2 className="text-lg sm:text-xl font-black text-white tracking-tight mt-0.5">
                {lang === "bm" ? "Langgan Akses Penuh Tingkatan 5 SPM" : "Unlock Full Form 5 SPM Access"}
              </h2>
            </div>
          </div>

          <button
            onClick={onClose}
            disabled={isProcessing}
            className="p-2 rounded-xl bg-slate-900/90 hover:bg-slate-800 text-slate-400 hover:text-white transition cursor-pointer border border-slate-800"
            aria-label="Tutup"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {isSuccess ? (
          /* SUCCESS STATE */
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="py-10 text-center space-y-5"
          >
            <div className="w-20 h-20 mx-auto rounded-full bg-emerald-500/20 border-2 border-emerald-400 flex items-center justify-center shadow-[0_0_40px_rgba(16,185,129,0.4)] ring-4 ring-emerald-500/10">
              <Check className="w-10 h-10 text-emerald-400 stroke-[3]" />
            </div>
            <div className="space-y-2">
              <h3 className="text-2xl font-black text-white">
                {lang === "bm" ? "Pembayaran Berjaya!" : "Payment Successful!"}
              </h3>
              <p className="text-sm text-slate-300 max-w-md mx-auto">
                {lang === "bm" 
                  ? "Tahniah! Akaun anda kini dinaik taraf ke Akses Penuh Tingkatan 5. Video modul ini dibuka serta-merta!"
                  : "Congratulations! Your account is now upgraded to Form 5 Full Access. Video unlocked instantly!"}
              </p>
              <div className="inline-block px-3 py-1 rounded-lg bg-slate-900 border border-slate-800 text-xs font-mono text-amber-300">
                Ref: {transactionRef}
              </div>
            </div>
            <div className="pt-2">
              <button
                onClick={() => {
                  if (onSuccess) onSuccess();
                  onClose();
                }}
                className="px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-lg shadow-emerald-950/80 cursor-pointer"
              >
                {lang === "bm" ? "Mula Menonton Sekarang" : "Start Watching Now"}
              </button>
            </div>
          </motion.div>
        ) : (
          /* CHECKOUT INTERFACE */
          <div className="space-y-5">
            {/* Plan Card */}
            <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-amber-950/40 via-slate-900 to-slate-900 border border-amber-500/30 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-inner">
              <div className="space-y-1">
                <span className="text-[10px] font-black text-amber-400 uppercase tracking-wider">
                  PAKEJ SPM PASS 2026/2027
                </span>
                <h3 className="text-base font-extrabold text-white">
                  Semua 29 Video Pengajaran Fizik T5 (Bab 1 - 7)
                </h3>
                <ul className="text-xs text-slate-300 space-y-1 pt-1">
                  <li className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span>Selaras DSKP Standard Pembelajaran (SP) KPM</span>
                  </li>
                  <li className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span>Akses Nota Rumusan SPM & AI Tutor Pintar</span>
                  </li>
                </ul>
              </div>

              <div className="text-left sm:text-right shrink-0 border-t sm:border-t-0 sm:border-l border-slate-800 pt-3 sm:pt-0 sm:pl-5">
                <span className="text-[11px] text-slate-400 line-through block">RM 80.00</span>
                <div className="flex items-baseline gap-1">
                  <span className="text-2xl sm:text-3xl font-black text-amber-400">RM 30</span>
                  <span className="text-xs text-slate-400 font-semibold">/ sekali bayar</span>
                </div>
                <span className="inline-block mt-1 px-2 py-0.5 text-[9px] font-black rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  JIMAT 62%
                </span>
              </div>
            </div>

            {/* Payment Method Selector */}
            <div className="space-y-2">
              <label className="text-xs font-black uppercase tracking-wider text-slate-300 block">
                {lang === "bm" ? "Pilih Kaedah Pemindahan Dalam Talian (Online Transfer)" : "Select Online Transfer Method"}
              </label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setPaymentMethod("fpx")}
                  className={`p-3.5 rounded-2xl border transition-all duration-200 flex items-center space-x-3 cursor-pointer ${
                    paymentMethod === "fpx"
                      ? "bg-amber-950/40 border-amber-500 text-white shadow-lg ring-1 ring-amber-500/40"
                      : "bg-slate-900/60 border-slate-800 text-slate-400 hover:border-slate-700"
                  }`}
                >
                  <Building2 className={`w-5 h-5 ${paymentMethod === "fpx" ? "text-amber-400" : "text-slate-400"}`} />
                  <div className="text-left">
                    <div className="text-xs font-extrabold text-white">FPX Online Banking</div>
                    <div className="text-[10px] text-slate-400">Maybank, CIMB, Bank Islam & lain-lain</div>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod("duitnow")}
                  className={`p-3.5 rounded-2xl border transition-all duration-200 flex items-center space-x-3 cursor-pointer ${
                    paymentMethod === "duitnow"
                      ? "bg-amber-950/40 border-amber-500 text-white shadow-lg ring-1 ring-amber-500/40"
                      : "bg-slate-900/60 border-slate-800 text-slate-400 hover:border-slate-700"
                  }`}
                >
                  <QrCode className={`w-5 h-5 ${paymentMethod === "duitnow" ? "text-amber-400" : "text-slate-400"}`} />
                  <div className="text-left">
                    <div className="text-xs font-extrabold text-white">DuitNow QR</div>
                    <div className="text-[10px] text-slate-400">Imbas melalui mana-mana e-Wallet / App Bank</div>
                  </div>
                </button>
              </div>
            </div>

            {/* FPX Banks Grid */}
            {paymentMethod === "fpx" ? (
              <div className="space-y-2">
                <span className="text-[11px] font-bold text-slate-400 block">
                  {lang === "bm" ? "Pilih Bank Anda:" : "Select Your Bank:"}
                </span>
                <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 max-h-48 overflow-y-auto pr-1">
                  {FPX_BANKS.map((bank) => {
                    const isSelected = selectedBank === bank.id;
                    return (
                      <button
                        key={bank.id}
                        type="button"
                        onClick={() => setSelectedBank(bank.id)}
                        className={`p-2.5 rounded-xl border text-center transition-all duration-150 cursor-pointer flex flex-col items-center justify-center space-y-1 ${
                          isSelected
                            ? "bg-amber-500/15 border-amber-400 ring-2 ring-amber-400/30 text-white"
                            : "bg-slate-900/80 border-slate-800/80 hover:bg-slate-800 text-slate-300"
                        }`}
                      >
                        <span className="text-[11px] font-black">{bank.shortName}</span>
                        <span className={`text-[9px] px-1.5 py-0.2 rounded border font-semibold ${bank.bgBadge}`}>
                          {bank.id}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            ) : (
              /* DuitNow QR View */
              <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-3">
                <div className="flex flex-col sm:flex-row items-center gap-4">
                  {/* Styled DuitNow QR Representation */}
                  <div className="w-32 h-32 rounded-2xl bg-white p-2.5 flex flex-col items-center justify-between shadow-xl shrink-0 border-2 border-rose-600">
                    <div className="text-[9px] font-black text-rose-600 uppercase tracking-widest text-center">
                      DuitNow QR
                    </div>
                    {/* QR Matrix SVG Mock */}
                    <svg viewBox="0 0 100 100" className="w-20 h-20 text-slate-950">
                      <rect width="100" height="100" fill="white" />
                      <path d="M10,10 h30 v30 h-30 z M15,15 v20 h20 v-20 z M20,20 h10 v10 h-10 z" fill="#0f172a" />
                      <path d="M60,10 h30 v30 h-30 z M65,15 v20 h20 v-20 z M70,20 h10 v10 h-10 z" fill="#0f172a" />
                      <path d="M10,60 h30 v30 h-30 z M15,65 v20 h20 v-20 z M20,70 h10 v10 h-10 z" fill="#0f172a" />
                      <circle cx="50" cy="50" r="12" fill="#e11d48" />
                      <path d="M45,45 L55,55 M45,55 L55,45" stroke="white" strokeWidth="2.5" />
                      <rect x="45" y="15" width="8" height="15" fill="#0f172a" />
                      <rect x="45" y="70" width="8" height="20" fill="#0f172a" />
                      <rect x="70" y="55" width="20" height="8" fill="#0f172a" />
                    </svg>
                    <span className="text-[8px] font-bold text-slate-700">Imbas Untuk Bayar</span>
                  </div>

                  <div className="space-y-1.5 text-xs text-slate-300">
                    <div className="text-white font-extrabold text-sm flex items-center gap-1.5">
                      <span>PhysFlix SPM (Sir Halim)</span>
                      <span className="px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-300 text-[9px] font-bold">Terverifikasi</span>
                    </div>
                    <p className="text-[11px] text-slate-400">
                      Imbas kod QR di atas menggunakan aplikasi perbankan (MAE, CIMB OCTO, Bank Islam, Touch &apos;n Go eWallet, GrabPay).
                    </p>
                    <div className="pt-1">
                      <label className="text-[10px] text-slate-400 block mb-1">
                        {lang === "bm" ? "No Rujukan Bayaran / Nama Pengirim:" : "Payment Ref No / Sender Name:"}
                      </label>
                      <input
                        type="text"
                        value={duitNowRef}
                        onChange={(e) => setDuitNowRef(e.target.value)}
                        placeholder="Cth: Ref 884920 atau Nama Anda"
                        className="w-full px-3 py-1.5 rounded-xl bg-slate-950 border border-slate-700 text-xs text-white focus:outline-none focus:border-amber-400"
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Buyer Account Confirmation */}
            <div className="flex items-center justify-between text-xs px-3.5 py-2 rounded-xl bg-slate-900/60 border border-slate-800 text-slate-400">
              <span>{lang === "bm" ? "Akaun yang akan diaktifkan:" : "Account to activate:"}</span>
              <strong className="text-slate-200 font-mono">{user?.email || "pelajar@gmail.com"}</strong>
            </div>

            {/* Submit Action Button */}
            <div className="pt-2">
              <button
                type="button"
                onClick={handlePay}
                disabled={isProcessing}
                className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-amber-500 via-amber-600 to-yellow-500 hover:from-amber-400 hover:via-amber-500 hover:to-yellow-400 text-slate-950 font-black text-sm sm:text-base transition-all duration-300 shadow-[0_0_35px_rgba(245,158,11,0.5)] hover:shadow-[0_0_50px_rgba(245,158,11,0.8)] active:scale-[0.98] flex items-center justify-center space-x-2.5 cursor-pointer ring-2 ring-amber-300/40 disabled:opacity-50"
              >
                {isProcessing ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin text-slate-950" />
                    <span>{processingStep || (lang === "bm" ? "Memproses Transaksi..." : "Processing Transaction...")}</span>
                  </>
                ) : (
                  <>
                    <Zap className="w-5 h-5 fill-slate-950 text-slate-950" />
                    <span>
                      {paymentMethod === "fpx"
                        ? (lang === "bm" ? `Bayar RM 30.00 Melalui ${currentBank.name} (FPX)` : `Pay RM 30.00 via ${currentBank.name} (FPX)`)
                        : (lang === "bm" ? "Sahkan Bayaran DuitNow & Buka Kunci" : "Confirm DuitNow & Unlock Access")}
                    </span>
                    <ArrowRight className="w-5 h-5 text-slate-950" />
                  </>
                )}
              </button>
              <p className="text-[10px] text-slate-400 text-center mt-2 flex items-center justify-center gap-1">
                <Lock className="w-3 h-3 text-slate-400" />
                <span>{lang === "bm" ? "Urus niaga selamat & akses premium diaktifkan serta-merta pada akaun anda." : "Secure transaction & instant premium activation on your account."}</span>
              </p>
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
};
