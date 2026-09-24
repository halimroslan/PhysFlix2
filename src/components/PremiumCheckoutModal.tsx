"use client";

import React, { useState } from "react";
import { 
  X, 
  Crown, 
  CheckCircle2, 
  ShieldCheck, 
  Building2, 
 
  ArrowRight, 
  Loader2, 
  Sparkles, 
  Lock, 
  Check, 
  Zap,
  ExternalLink
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


export const DEV_TEST_EMAILS = [
  "ahalimroslan@gmail.com",
  "abdulhalimroslan@gmail.com",
  "g-41192875@moe-dl.edu.my",
  "aimkmb@gmail.com"
];

export const PremiumCheckoutModal: React.FC<PremiumCheckoutModalProps> = ({
  isOpen,
  onClose,
  onSuccess
}) => {
  const { user, unlockPremium } = useAuth();
  const { lang } = useLanguage();
  
  const userEmailClean = (user?.email || "").toLowerCase().trim();
  const isDev = DEV_TEST_EMAILS.includes(userEmailClean);
  const priceDisplay = isDev ? "RM 1.99" : "RM 30.00";
  const priceAmount = isDev ? "1.99" : "30";
  
  const [selectedBank, setSelectedBank] = useState<string>("MBB");
  
  // Processing States
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [processingStep, setProcessingStep] = useState<string>("");
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [transactionRef, setTransactionRef] = useState<string>("");

  if (!isOpen) return null;

  const currentBank = FPX_BANKS.find(b => b.id === selectedBank) || FPX_BANKS[0];

  // 1. Live ToyyibPay FPX Redirection
  const handleToyyibPayCheckout = async () => {
    setIsProcessing(true);
    setProcessingStep(lang === "bm" ? "Menghubungkan ke Gerbang FPX ToyyibPay..." : "Connecting to ToyyibPay FPX Gateway...");

    try {
      const res = await fetch("/api/payment/toyyibpay/create-bill", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: user?.id || user?.uid || "",
          userEmail: user?.email || "pelajar@physflix.com",
          userName: user?.displayName || "Pelajar SPM Fizik",
          isDevTest: isDev,
        }),
      });

      const data = await res.json();
      if (data?.paymentUrl) {
        setProcessingStep(lang === "bm" ? "Membuka halaman perbankan selamat FPX..." : "Redirecting to secure FPX banking page...");
        // Redirect to ToyyibPay official FPX portal
        window.location.href = data.paymentUrl;
      } else {
        throw new Error(data?.error || "Gagal mencipta pautan bayaran FPX");
      }
    } catch (err: any) {
      console.error("ToyyibPay Error:", err);
      setIsProcessing(false);
      alert(err.message || "Ralat menyambung ke ToyyibPay. Sila cuba lagi.");
    }
  };

  // 2. Developer Instant Unlock Simulation
  const handleInstantUnlock = async () => {
    setIsProcessing(true);
    const newRef = `PFX-${Date.now().toString().slice(-6)}`;
    setTransactionRef(newRef);

    try {
      setProcessingStep(lang === "bm" ? "Menentusahkan transaksi dan mengaktifkan akses..." : "Verifying transaction and activating access...");
      await new Promise(r => setTimeout(r, 1200));

      if (unlockPremium) {
        await unlockPremium();
      }

      setIsProcessing(false);
      setIsSuccess(true);

      setTimeout(() => {
        if (onSuccess) onSuccess();
        onClose();
      }, 2000);
    } catch (e) {
      setIsProcessing(false);
      alert("Ralat mengaktifkan akaun. Sila cuba lagi.");
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
                  {lang === "bm" ? "FPX TOYYIBPAY RASMI" : "OFFICIAL TOYYIBPAY FPX"}
                </span>
                <span className="text-[10px] font-bold text-emerald-400 flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>FPX Perbankan Dalam Talian</span>
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
                  ? "Tahniah! Akaun anda kini mempunyai Akses Penuh Tingkatan 5 (Langganan 1 Tahun). Semua 29 video modul SPM dibuka serta-merta!"
                  : "Congratulations! Your account now has Full Form 5 Access (1-Year Subscription). All 29 SPM modules unlocked!"}
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
                  PAKEJ SPM T5 (1 TAHUN)
                </span>
                <h3 className="text-base font-extrabold text-white">
                  Semua 29 Video Pengajaran Fizik T5 (Bab 1 - 7)
                </h3>
                <ul className="text-xs text-slate-300 space-y-1 pt-1">
                  <li className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span>Akses penuh 365 hari mengikut DSKP Standard Pembelajaran (SP) KPM</span>
                  </li>
                  <li className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span>Dikuasakan oleh gerbang FPX selamat ToyyibPay</span>
                  </li>
                </ul>
              </div>

              <div className="text-left sm:text-right shrink-0 border-t sm:border-t-0 sm:border-l border-slate-800 pt-3 sm:pt-0 sm:pl-5">
                <span className="text-[11px] text-slate-400 line-through block">{isDev ? "RM 30.00" : "RM 80.00"}</span>
                <div className="flex items-baseline gap-1">
                  <span className="text-2xl sm:text-3xl font-black text-amber-400">RM {priceAmount}</span>
                  <span className="text-xs text-slate-400 font-semibold">{isDev ? "/ ujian dev" : "/ setahun"}</span>
                </div>
                <span className={`inline-block mt-1 px-2 py-0.5 text-[9px] font-black rounded border ${
                  isDev 
                    ? "bg-amber-500/20 text-amber-300 border-amber-500/40" 
                    : "bg-emerald-500/20 text-emerald-300 border-emerald-500/30"
                }`}>
                  {isDev ? "👑 KADAR UJIAN PEMBANGUN (RM 1.99)" : "JIMAT 62%"}
                </span>
              </div>
            </div>

            {/* FPX Banks Details */}
            <div className="p-4 sm:p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-3.5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Building2 className="w-4 h-4 text-amber-400" />
                  <span className="text-xs font-extrabold text-slate-200">
                    {lang === "bm" ? "Perbankan Dalam Talian FPX (Semua Bank Utama Disokong):" : "FPX Online Banking (All Major Banks Supported):"}
                  </span>
                </div>
                <span className="text-[10px] text-amber-300 font-semibold flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>ToyyibPay FPX</span>
                </span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-1.5">
                {FPX_BANKS.map((bank) => (
                  <div
                    key={bank.id}
                    className="p-2 rounded-xl bg-slate-950 border border-slate-800/80 text-center flex flex-col items-center justify-center space-y-0.5"
                  >
                    <span className="text-[11px] font-black text-slate-200">{bank.shortName}</span>
                    <span className={`text-[8px] px-1 py-0.2 rounded border font-semibold ${bank.bgBadge}`}>
                      {bank.id}
                    </span>
                  </div>
                ))}
              </div>
              <p className="text-[11px] text-slate-400 leading-relaxed">
                {lang === "bm" 
                  ? `Anda akan dialihkan terus ke portal rasmi ToyyibPay FPX untuk memilih bank kegemaran anda (Maybank, CIMB, Bank Islam dll.) dan melengkapkan pembayaran ${priceDisplay}${isDev ? " (Kadar Khas Ujian Pembangun)" : ""}.`
                  : `You will be redirected to the official ToyyibPay FPX portal to select your bank (Maybank, CIMB, Bank Islam etc.) and complete the ${priceDisplay} payment${isDev ? " (Special Dev Test Rate)" : ""}.`}
              </p>
            </div>

            {/* Buyer Account Confirmation */}
            <div className="flex items-center justify-between text-xs px-3.5 py-2 rounded-xl bg-slate-900/60 border border-slate-800 text-slate-400">
              <span>{lang === "bm" ? "Akaun yang akan diaktifkan:" : "Account to activate:"}</span>
              <strong className="text-slate-200 font-mono">{user?.email || "pelajar@gmail.com"}</strong>
            </div>

            {/* Action Buttons */}
            <div className="space-y-2 pt-1">
              <button
                type="button"
                onClick={handleToyyibPayCheckout}
                disabled={isProcessing}
                className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-amber-500 via-amber-600 to-yellow-500 hover:from-amber-400 hover:via-amber-500 hover:to-yellow-400 text-slate-950 font-black text-sm sm:text-base transition-all duration-300 shadow-[0_0_35px_rgba(245,158,11,0.5)] hover:shadow-[0_0_50px_rgba(245,158,11,0.8)] active:scale-[0.98] flex items-center justify-center space-x-2.5 cursor-pointer ring-2 ring-amber-300/40 disabled:opacity-50"
              >
                {isProcessing ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin text-slate-950" />
                    <span>{processingStep}</span>
                  </>
                ) : (
                  <>
                    <Zap className="w-5 h-5 fill-slate-950 text-slate-950" />
                    <span>{lang === "bm" ? `Bayar ${priceDisplay} Melalui FPX ToyyibPay${isDev ? " (Ujian)" : ""}` : `Pay ${priceDisplay} via ToyyibPay FPX${isDev ? " (Dev Test)" : ""}`}</span>
                    <ExternalLink className="w-4 h-4 text-slate-950" />
                  </>
                )}
              </button>

              {/* Developer Test Mode Button */}
              <div className="pt-2 text-center">
                <button
                  type="button"
                  onClick={handleInstantUnlock}
                  disabled={isProcessing}
                  className="text-[11px] text-amber-400/80 hover:text-amber-300 underline cursor-pointer"
                >
                  {lang === "bm" ? "⚡ Ujian Pembangun: Buka Kunci Serta-Merta (Simulasi)" : "⚡ Developer Test: Instant Unlock Simulation"}
                </button>
              </div>

              <p className="text-[10px] text-slate-400 text-center flex items-center justify-center gap-1">
                <Lock className="w-3 h-3 text-slate-400" />
                <span>{lang === "bm" ? "Urus niaga dilindungi secara selamat oleh ToyyibPay & KPM-compliant." : "Transaction securely processed by ToyyibPay & KPM-compliant."}</span>
              </p>
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
};
