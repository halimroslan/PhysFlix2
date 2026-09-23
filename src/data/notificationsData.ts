export interface SystemNotification {
  id: string;
  titleBm: string;
  titleDlp: string;
  category: "kamus" | "formula" | "cheatnote" | "general" | "premium";
  badgeBm: string;
  badgeDlp: string;
  badgeColor: "emerald" | "cyan" | "amber" | "red" | "purple";
  descriptionBm: string;
  descriptionDlp: string;
  timestampBm: string;
  timestampDlp: string;
  actionType: "openDict" | "openFormula" | "openCheatNote" | "openSubscribe" | "none";
  actionLabelBm?: string;
  actionLabelDlp?: string;
  icon: "Book" | "Sigma" | "FileText" | "Sparkles" | "Bell" | "Crown" | "Video";
  isImportant?: boolean;
}

export const initialNotifications: SystemNotification[] = [
  {
    id: "notif-t5-premium-launch",
    titleBm: "Pengumuman: Video Fizik Tingkatan 5 SPM Kini Tersedia Secara Langganan!",
    titleDlp: "Announcement: Form 5 SPM Physics Videos Now Available via Subscription!",
    category: "premium",
    badgeBm: "Tingkatan 5 SPM",
    badgeDlp: "Form 5 SPM",
    badgeColor: "amber",
    descriptionBm: "Semua 29 modul video pengajaran lengkap Fizik Tingkatan 5 KSSM (Bab 1 Daya & Gerakan II hingga Bab 7 Fizik Nuklear) kini sedia diakses secara langganan tahunan melalui perbankan internet FPX ToyyibPay.",
    descriptionDlp: "All 29 complete Form 5 KSSM Physics video modules (Chapter 1 Force & Motion II to Chapter 7 Nuclear Physics) are now available via annual subscription through ToyyibPay FPX online banking.",
    timestampBm: "Pengumuman Baharu",
    timestampDlp: "New Announcement",
    actionType: "openSubscribe",
    actionLabelBm: "Langgan / Buka Akses T5 Sekarang ↗",
    actionLabelDlp: "Subscribe / Unlock Form 5 Now ↗",
    icon: "Crown",
    isImportant: true,
  },
  {
    id: "notif-kamus-t4-t5",
    titleBm: "Kamus Fizik SPM (Definisi Keseluruhan T4 & T5)",
    titleDlp: "Complete SPM Physics Dictionary (T4 & T5)",
    category: "kamus",
    badgeBm: "Kamus Rasmi",
    badgeDlp: "Official Dictionary",
    badgeColor: "emerald",
    descriptionBm: "100% Definisi, Hukum, Prinsip, Konsep & Simbol fizik Tingkatan 4 dan Tingkatan 5 daripada Modul TasFiz & DSKP KSSM kini sedia diakses dengan carian dwi-bahasa (BM & DLP).",
    descriptionDlp: "100% Definitions, Laws, Principles, Concepts & Physics Symbols for Form 4 & Form 5 from Modul TasFiz & KSSM DSKP are now available with bilingual search (BM & DLP).",
    timestampBm: "Ciri Terkini",
    timestampDlp: "Latest Feature",
    actionType: "openDict",
    actionLabelBm: "Buka Kamus Fizik ↗",
    actionLabelDlp: "Open Physics Dictionary ↗",
    icon: "Book",
    isImportant: true,
  },
  {
    id: "notif-formula-t4-t5",
    titleBm: "Helaian Formula Fizik SPM (Formula T4 & T5)",
    titleDlp: "SPM Physics Formula Sheet (T4 & T5)",
    category: "formula",
    badgeBm: "Formula KaTeX",
    badgeDlp: "KaTeX Formula",
    badgeColor: "cyan",
    descriptionBm: "Semua formula fizik Tingkatan 4 dan 5 kini disusun 100% mengikut format peperiksaan SPM Modul TasFiz berserta simbol matematik tepat (KaTeX), unit S.I., dan huraian pembolehubah.",
    descriptionDlp: "All Form 4 & 5 physics formulas are now structured 100% according to SPM Modul TasFiz with accurate mathematical KaTeX notation, S.I. units, and variable breakdowns.",
    timestampBm: "Ciri Terkini",
    timestampDlp: "Latest Feature",
    actionType: "openFormula",
    actionLabelBm: "Lihat Formula SPM ↗",
    actionLabelDlp: "View SPM Formulas ↗",
    icon: "Sigma",
    isImportant: true,
  },
  {
    id: "notif-cheatnote-video",
    titleBm: "Ringkasan Nota CheatNote Bagi Setiap Video",
    titleDlp: "CheatNotes & SPM Tips for Every Video",
    category: "cheatnote",
    badgeBm: "Nota & Tip SPM",
    badgeDlp: "Notes & SPM Tips",
    badgeColor: "amber",
    descriptionBm: "Setiap 65 video kini dilengkapi 'Ringkasan Nota' 100% daripada Modul CheatNote T4 & T5, Standard Kandungan DSKP, Tip Perangkap SPM, serta kata kunci (Kamus) interaktif yang boleh diklik.",
    descriptionDlp: "All 65 videos now include 'Ringkasan Nota' 100% sourced from CheatNote T4 & T5, DSKP Content Standards, SPM Trap Tips, and interactive clickable dictionary keywords.",
    timestampBm: "Ciri Terkini",
    timestampDlp: "Latest Feature",
    actionType: "openCheatNote",
    actionLabelBm: "Semak Nota Pengajaran ↗",
    actionLabelDlp: "Check Lesson Notes ↗",
    icon: "FileText",
    isImportant: true,
  },
];
