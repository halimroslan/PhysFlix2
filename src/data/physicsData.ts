import { dskpMappings } from './dskpData';
import { dskpLearningPointsBm, dskpLearningPointsDlp } from './dskpLearningPoints';

export interface VideoLesson {
  id: string;
  driveId: string;
  youtubeId?: string;
  isPendingUpload?: boolean;
  thumbnailUrl?: string;
  week: string;
  weekNum: number;
  titleBm: string;
  titleDlp: string;
  form: number;
  chapterNum: number;
  chapterBm: string;
  chapterDlp: string;
  duration: string;
  thumbnailBg: string;
  learningPointsBm: string[];
  learningPointsDlp: string[];
  keyConceptsBm: string[];
  keyConceptsDlp: string[];
  relatedFormulaIds?: string[];
  resources: {
    titleBm: string;
    titleDlp: string;
    type: "pdf" | "docx" | "pptx";
    size: string;
    url: string;
  }[];
  tavisPositions?: {
    top?: string;
    bottom?: string;
    left?: string;
    right?: string;
    width?: string;
    height?: string;
  }[];
  aliases?: string[];
}

export const rawForm4Videos = [
  {
    "driveId": "jylD8xsEUkE",
    "youtubeId": "jylD8xsEUkE",
    "aliases": ["HifOFbw3gDk"],
    "week": "T4 M1",
    "weekNum": 1,
    "titleBm": "1.1 Kuantiti Fizik",
    "titleDlp": "1.1 Physical Quantities",
    "form": 4,
    "chapterNum": 1,
    "chapterBm": "Pengukuran",
    "chapterDlp": "Measurement",
    "duration": "51:03",
    "keyConceptsBm": [
      "Kuantiti Fizik",
      "Kuantiti Asas",
      "Kuantiti Terbitan",
      "Kuantiti Skalar",
      "Kuantiti Vektor"
    ],
    "keyConceptsDlp": [
      "Physical Quantity",
      "Base Quantity",
      "Derived Quantity",
      "Scalar Quantity",
      "Vector Quantity"
    ],
    "thumbnailUrl": "/thumbnails/jylD8xsEUkE.webp",
    "relatedFormulaIds": []
  },
  {
    "driveId": "MrRD2TOnp54",
    "youtubeId": "MrRD2TOnp54",
    "week": "T4 M2",
    "weekNum": 2,
    "titleBm": "1.2a Penyiasatan Saintifik",
    "titleDlp": "1.2a Scientific Investigation",
    "form": 4,
    "chapterNum": 1,
    "chapterBm": "Pengukuran",
    "chapterDlp": "Measurement",
    "duration": "23:17",
    "keyConceptsBm": [
      "Kejituan",
      "Kepersisan",
      "Kepekaan",
      "Ralat rawak",
      "Ralat sistematik"
    ],
    "keyConceptsDlp": [
      "Accuracy",
      "Consistency / Precision",
      "Sensitivity",
      "Random error",
      "Systematic error"
    ],
    "thumbnailUrl": "/thumbnails/MrRD2TOnp54.webp",
    "relatedFormulaIds": []
  },
  {
    "driveId": "90mxEb59yZI",
    "youtubeId": "90mxEb59yZI",
    "week": "T4 M3",
    "weekNum": 3,
    "titleBm": "1.2b Penyiasatan Saintifik",
    "titleDlp": "1.2b Scientific Investigation Part 2",
    "form": 4,
    "chapterNum": 1,
    "chapterBm": "Pengukuran",
    "chapterDlp": "Measurement",
    "duration": "59:25",
    "keyConceptsBm": [
      "Kuantiti Fizik",
      "Kejituan",
      "Kepersisan"
    ],
    "keyConceptsDlp": [
      "Physical Quantity",
      "Accuracy",
      "Consistency / Precision"
    ],
    "thumbnailUrl": "/thumbnails/90mxEb59yZI.webp",
    "relatedFormulaIds": []
  },
  {
    "driveId": "2OeHdtXaeyM",
    "youtubeId": "2OeHdtXaeyM",
    "week": "T4 M5",
    "weekNum": 5,
    "titleBm": "2.2 Graf Gerakan Linear",
    "titleDlp": "2.2 Linear Motion Graphs",
    "form": 4,
    "chapterNum": 2,
    "chapterBm": "Daya dan Gerakan I",
    "chapterDlp": "Force and Motion I",
    "duration": "59:53",
    "keyConceptsBm": [
      "Gerakan linear",
      "Sesaran",
      "Laju",
      "Halaju",
      "Pecutan"
    ],
    "keyConceptsDlp": [
      "Linear motion",
      "Displacement",
      "Speed",
      "Velocity",
      "Acceleration"
    ],
    "thumbnailUrl": "/thumbnails/2OeHdtXaeyM.webp",
    "relatedFormulaIds": [
      "f-t4-2-1",
      "f-t4-2-2",
      "f-t4-2-3",
      "f-t4-2-4"
    ]
  },
  {
    "driveId": "l1aYWXec21Q",
    "youtubeId": "l1aYWXec21Q",
    "week": "T4 M6",
    "weekNum": 6,
    "titleBm": "2.3 Gerakan Jatuh Bebas",
    "titleDlp": "2.3 Free Fall Motion",
    "form": 4,
    "chapterNum": 2,
    "chapterBm": "Daya dan Gerakan I",
    "chapterDlp": "Force and Motion I",
    "duration": "58:34",
    "keyConceptsBm": [
      "Jatuh bebas",
      "Pecutan graviti",
      "Gerakan linear",
      "Halaju"
    ],
    "keyConceptsDlp": [
      "Free fall",
      "Gravitational acceleration",
      "Linear motion",
      "Velocity"
    ],
    "thumbnailUrl": "/thumbnails/l1aYWXec21Q.webp",
    "relatedFormulaIds": [
      "f-t4-2-5",
      "f-t4-2-6",
      "f-t4-2-7",
      "f-t4-2-8"
    ]
  },
  {
    "driveId": "uQwyU34HH28",
    "youtubeId": "uQwyU34HH28",
    "week": "T4 M7",
    "weekNum": 7,
    "titleBm": "2.4 Inersia",
    "titleDlp": "2.4 Inertia",
    "form": 4,
    "chapterNum": 2,
    "chapterBm": "Daya dan Gerakan I",
    "chapterDlp": "Force and Motion I",
    "duration": "54:04",
    "keyConceptsBm": [
      "Inersia",
      "Hukum Gerakan Newton Pertama",
      "Jisim"
    ],
    "keyConceptsDlp": [
      "Inertia",
      "Newton's First Law of Motion",
      "Mass"
    ],
    "thumbnailUrl": "/thumbnails/uQwyU34HH28.webp",
    "relatedFormulaIds": []
  },
  {
    "driveId": "gqbZ3grngvg",
    "youtubeId": "gqbZ3grngvg",
    "week": "T4 M8",
    "weekNum": 8,
    "titleBm": "2.5 Momentum",
    "titleDlp": "2.5 Momentum",
    "form": 4,
    "chapterNum": 2,
    "chapterBm": "Daya dan Gerakan I",
    "chapterDlp": "Force and Motion I",
    "duration": "51:48",
    "keyConceptsBm": [
      "Momentum",
      "Prinsip Keabadian Momentum",
      "Perlanggaran kenyal",
      "Perlanggaran tak kenyal",
      "Letupan"
    ],
    "keyConceptsDlp": [
      "Momentum",
      "Principle of Conservation of Momentum",
      "Elastic collision",
      "Inelastic collision",
      "Explosion"
    ],
    "thumbnailUrl": "/thumbnails/gqbZ3grngvg.webp",
    "relatedFormulaIds": [
      "f-t4-2-9",
      "f-t4-2-10",
      "f-t4-2-11",
      "f-t4-2-12"
    ]
  },
  {
    "driveId": "QZtocJnhel4",
    "youtubeId": "QZtocJnhel4",
    "week": "T4 M9",
    "weekNum": 9,
    "titleBm": "2.6 Daya",
    "titleDlp": "2.6 Force",
    "form": 4,
    "chapterNum": 2,
    "chapterBm": "Daya dan Gerakan I",
    "chapterDlp": "Force and Motion I",
    "duration": "57:22",
    "keyConceptsBm": [
      "Daya",
      "Hukum Gerakan Newton Kedua",
      "Pecutan",
      "Jisim"
    ],
    "keyConceptsDlp": [
      "Force",
      "Newton's Second Law of Motion",
      "Acceleration",
      "Mass"
    ],
    "thumbnailUrl": "/thumbnails/QZtocJnhel4.webp",
    "relatedFormulaIds": [
      "f-t4-2-13"
    ]
  },
  {
    "driveId": "m90zg3HyU_8",
    "youtubeId": "m90zg3HyU_8",
    "week": "T4 M10",
    "weekNum": 10,
    "titleBm": "2.7 Daya Impuls & 2.8 Berat",
    "titleDlp": "2.7 Impulsive Force & 2.8 Weight",
    "form": 4,
    "chapterNum": 2,
    "chapterBm": "Daya dan Gerakan I",
    "chapterDlp": "Force and Motion I",
    "duration": "55:28",
    "keyConceptsBm": [
      "Impuls",
      "Daya impuls",
      "Masa impak",
      "Berat",
      "Hukum Gerakan Newton Ketiga"
    ],
    "keyConceptsDlp": [
      "Impulse",
      "Impulsive force",
      "Impact time",
      "Weight",
      "Newton's Third Law of Motion"
    ],
    "thumbnailUrl": "/thumbnails/m90zg3HyU_8.webp",
    "relatedFormulaIds": [
      "f-t4-2-14",
      "f-t4-2-15",
      "f-t4-2-16"
    ]
  },
  {
    "driveId": "hsjQe4dnpl0",
    "youtubeId": "hsjQe4dnpl0",
    "week": "T4 M11",
    "weekNum": 11,
    "titleBm": "3.1a Hukum Kegravitian Semesta Newton",
    "titleDlp": "3.1a Newton's Universal Law of Gravitation",
    "form": 4,
    "chapterNum": 3,
    "chapterBm": "Kegravitian",
    "chapterDlp": "Gravitation",
    "duration": "52:42",
    "keyConceptsBm": [
      "Hukum Kegravitian Semesta Newton",
      "Daya graviti",
      "Pecutan graviti"
    ],
    "keyConceptsDlp": [
      "Newton's Universal Law of Gravitation",
      "Gravitational force",
      "Gravitational acceleration"
    ],
    "thumbnailUrl": "/thumbnails/hsjQe4dnpl0.webp",
    "relatedFormulaIds": [
      "f-t4-3-1",
      "f-t4-3-2",
      "f-t4-3-3"
    ]
  },
  {
    "driveId": "x-wilmj9cxE",
    "youtubeId": "x-wilmj9cxE",
    "week": "T4 M12",
    "weekNum": 12,
    "titleBm": "3.1b Hukum Kegravitian Semesta Newton",
    "titleDlp": "3.1b Newton's Universal Law of Gravitation Part 2",
    "form": 4,
    "chapterNum": 3,
    "chapterBm": "Kegravitian",
    "chapterDlp": "Gravitation",
    "duration": "59:39",
    "keyConceptsBm": [
      "Daya graviti",
      "Pecutan graviti",
      "Jejari Bumi"
    ],
    "keyConceptsDlp": [
      "Gravitational force",
      "Gravitational acceleration",
      "Earth radius"
    ],
    "thumbnailUrl": "/thumbnails/x-wilmj9cxE.webp",
    "relatedFormulaIds": [
      "f-t4-3-1",
      "f-t4-3-2"
    ]
  },
  {
    "driveId": "i4WgQ_Azegc",
    "youtubeId": "i4WgQ_Azegc",
    "week": "T4 M12",
    "weekNum": 12.5,
    "titleBm": "3.1c Daya Memusat & Gerakan Membulat",
    "titleDlp": "3.1c Centripetal Force & Circular Motion",
    "form": 4,
    "chapterNum": 3,
    "chapterBm": "Kegravitian",
    "chapterDlp": "Gravitation",
    "duration": "58:06",
    "keyConceptsBm": [
      "Daya memusat",
      "Gerakan membulat seragam",
      "Laju linear"
    ],
    "keyConceptsDlp": [
      "Centripetal force",
      "Uniform circular motion",
      "Linear speed"
    ],
    "thumbnailUrl": "/thumbnails/i4WgQ_Azegc.webp",
    "relatedFormulaIds": [
      "f-t4-3-4",
      "f-t4-3-5",
      "f-t4-3-6"
    ]
  },
  {
    "driveId": "snbt6GpD0C4",
    "youtubeId": "snbt6GpD0C4",
    "week": "T4 M13",
    "weekNum": 13,
    "titleBm": "3.2 Hukum Kepler",
    "titleDlp": "3.2 Kepler's Laws",
    "form": 4,
    "chapterNum": 3,
    "chapterBm": "Kegravitian",
    "chapterDlp": "Gravitation",
    "duration": "57:02",
    "keyConceptsBm": [
      "Hukum Kepler Pertama",
      "Hukum Kepler Kedua",
      "Hukum Kepler Ketiga"
    ],
    "keyConceptsDlp": [
      "Kepler's First Law",
      "Kepler's Second Law",
      "Kepler's Third Law"
    ],
    "thumbnailUrl": "/thumbnails/snbt6GpD0C4.webp",
    "relatedFormulaIds": [
      "f-t4-3-7"
    ]
  },
  {
    "driveId": "09jX9qGHwSQ",
    "youtubeId": "09jX9qGHwSQ",
    "week": "T4 M14",
    "weekNum": 14,
    "titleBm": "3.3a Satelit Buatan Manusia",
    "titleDlp": "3.3a Man-made Satellites",
    "form": 4,
    "chapterNum": 3,
    "chapterBm": "Kegravitian",
    "chapterDlp": "Gravitation",
    "duration": "56:55",
    "keyConceptsBm": [
      "Satelit geopegun",
      "Satelit bukan geopegun",
      "Laju linear",
      "Tempoh orbit"
    ],
    "keyConceptsDlp": [
      "Geostationary satellite",
      "Non-geostationary satellite",
      "Linear speed",
      "Orbital period"
    ],
    "thumbnailUrl": "/thumbnails/09jX9qGHwSQ.webp",
    "relatedFormulaIds": [
      "f-t4-3-6",
      "f-t4-3-8"
    ]
  },
  {
    "driveId": "sn7_SSzSURM",
    "youtubeId": "sn7_SSzSURM",
    "thumbnailUrl": "/thumbnails/sn7_SSzSURM.webp",
    "week": "T4 M15",
    "weekNum": 15,
    "titleBm": "3.3b Satelit Buatan Manusia",
    "titleDlp": "3.3b Man-made Satellites Part 2",
    "form": 4,
    "chapterNum": 3,
    "chapterBm": "Kegravitian",
    "chapterDlp": "Gravitation",
    "duration": "56:14",
    "keyConceptsBm": [
      "Tenaga keupayaan graviti",
      "Halaju lepas",
      "Ketinggian satelit"
    ],
    "keyConceptsDlp": [
      "Gravitational potential energy",
      "Escape velocity",
      "Satellite height"
    ],
    "relatedFormulaIds": [
      "f-t4-3-9",
      "f-t4-3-10"
    ]
  },
  {
    "driveId": "XzSTapojxMU",
    "youtubeId": "XzSTapojxMU",
    "week": "T4 M16",
    "weekNum": 16,
    "titleBm": "4.1 Keseimbangan Terma",
    "titleDlp": "4.1 Thermal Equilibrium",
    "form": 4,
    "chapterNum": 4,
    "chapterBm": "Haba",
    "chapterDlp": "Heat",
    "duration": "56:57",
    "keyConceptsBm": [
      "Suhu",
      "Haba",
      "Keseimbangan terma",
      "Sifat termometrik",
      "Penentu ukuran"
    ],
    "keyConceptsDlp": [
      "Temperature",
      "Heat",
      "Thermal equilibrium",
      "Thermometric property",
      "Calibration"
    ],
    "thumbnailUrl": "/thumbnails/XzSTapojxMU.webp",
    "relatedFormulaIds": [
      "f-t4-4-1"
    ]
  },
  {
    "driveId": "GK4PZO-9hos",
    "youtubeId": "GK4PZO-9hos",
    "week": "T4 M17",
    "weekNum": 17,
    "titleBm": "4.2a Muatan Haba Tentu",
    "titleDlp": "4.2a Specific Heat Capacity",
    "form": 4,
    "chapterNum": 4,
    "chapterBm": "Haba",
    "chapterDlp": "Heat",
    "duration": "58:43",
    "keyConceptsBm": [
      "Muatan haba",
      "Muatan haba tentu",
      "Keseimbangan terma"
    ],
    "keyConceptsDlp": [
      "Heat capacity",
      "Specific heat capacity",
      "Thermal equilibrium"
    ],
    "thumbnailUrl": "/thumbnails/GK4PZO-9hos.webp",
    "relatedFormulaIds": [
      "f-t4-4-2",
      "f-t4-4-3"
    ]
  },
  {
    "driveId": "BSKVOMr_NWU",
    "youtubeId": "BSKVOMr_NWU",
    "week": "T4 M18",
    "weekNum": 18,
    "titleBm": "4.2b Muatan Haba Tentu",
    "titleDlp": "4.2b Specific Heat Capacity Part 2",
    "form": 4,
    "chapterNum": 4,
    "chapterBm": "Haba",
    "chapterDlp": "Heat",
    "duration": "57:34",
    "keyConceptsBm": [
      "Muatan haba tentu",
      "Suhu",
      "Haba"
    ],
    "keyConceptsDlp": [
      "Specific heat capacity",
      "Temperature",
      "Heat"
    ],
    "thumbnailUrl": "/thumbnails/BSKVOMr_NWU.webp",
    "relatedFormulaIds": [
      "f-t4-4-3"
    ]
  },
  {
    "driveId": "nLaJH-EH3Ko",
    "youtubeId": "nLaJH-EH3Ko",
    "week": "T4 M19",
    "weekNum": 19,
    "titleBm": "4.3a Haba Pendam Tentu",
    "titleDlp": "4.3a Specific Latent Heat",
    "form": 4,
    "chapterNum": 4,
    "chapterBm": "Haba",
    "chapterDlp": "Heat",
    "duration": "56:29",
    "keyConceptsBm": [
      "Haba pendam tentu",
      "Haba pendam tentu pelakuran",
      "Haba pendam tentu pengewapan"
    ],
    "keyConceptsDlp": [
      "Specific latent heat",
      "Specific latent heat of fusion",
      "Specific latent heat of vaporisation"
    ],
    "thumbnailUrl": "/thumbnails/nLaJH-EH3Ko.webp",
    "relatedFormulaIds": [
      "f-t4-4-4"
    ]
  },
  {
    "driveId": "BqZIb-bVYk0",
    "youtubeId": "BqZIb-bVYk0",
    "week": "T4 M20",
    "weekNum": 20,
    "titleBm": "4.3b Haba Pendam Tentu",
    "titleDlp": "4.3b Specific Latent Heat Applications",
    "form": 4,
    "chapterNum": 4,
    "chapterBm": "Haba",
    "chapterDlp": "Heat",
    "duration": "58:37",
    "keyConceptsBm": [
      "Haba pendam tentu",
      "Peleburan",
      "Pendidihan"
    ],
    "keyConceptsDlp": [
      "Specific latent heat",
      "Melting",
      "Boiling"
    ],
    "thumbnailUrl": "/thumbnails/BqZIb-bVYk0.webp",
    "relatedFormulaIds": [
      "f-t4-4-4"
    ]
  },
  {
    "driveId": "Lrq-a0624Y8",
    "youtubeId": "Lrq-a0624Y8",
    "week": "T4 M21",
    "weekNum": 21,
    "titleBm": "4.4 Hukum-hukum Gas",
    "titleDlp": "4.4 Gas Laws",
    "form": 4,
    "chapterNum": 4,
    "chapterBm": "Haba",
    "chapterDlp": "Heat",
    "duration": "1:01:20",
    "keyConceptsBm": [
      "Hukum Boyle",
      "Hukum Charles",
      "Hukum Gay-Lussac",
      "Sifar mutlak"
    ],
    "keyConceptsDlp": [
      "Boyle's law",
      "Charles's law",
      "Gay-Lussac's law",
      "Absolute zero"
    ],
    "thumbnailUrl": "/thumbnails/Lrq-a0624Y8.webp",
    "relatedFormulaIds": [
      "f-t4-4-5",
      "f-t4-4-6",
      "f-t4-4-7",
      "f-t4-4-8"
    ]
  },
  {
    "driveId": "FoOtEc3jlts",
    "youtubeId": "FoOtEc3jlts",
    "week": "T4 M22",
    "weekNum": 22,
    "titleBm": "5.1 Asas Gelombang",
    "titleDlp": "5.1 Fundamentals of Waves",
    "form": 4,
    "chapterNum": 5,
    "chapterBm": "Gelombang",
    "chapterDlp": "Waves",
    "duration": "58:28",
    "keyConceptsBm": [
      "Gelombang progresif",
      "Gelombang pegun",
      "Gelombang melintang",
      "Gelombang membujur",
      "Amplitud",
      "Panjang gelombang"
    ],
    "keyConceptsDlp": [
      "Progressive wave",
      "Stationary wave",
      "Transverse wave",
      "Longitudinal wave",
      "Amplitude",
      "Wavelength"
    ],
    "thumbnailUrl": "/thumbnails/FoOtEc3jlts.webp",
    "relatedFormulaIds": [
      "f-t4-5-1",
      "f-t4-5-2"
    ]
  },
  {
    "driveId": "LwJhb5ey-q8",
    "youtubeId": "LwJhb5ey-q8",
    "week": "T4 M23",
    "weekNum": 23,
    "titleBm": "5.2 Pelembapan & Resonans",
    "titleDlp": "5.2 Damping & Resonance",
    "form": 4,
    "chapterNum": 5,
    "chapterBm": "Gelombang",
    "chapterDlp": "Waves",
    "duration": "57:25",
    "keyConceptsBm": [
      "Pelembapan",
      "Resonans",
      "Frekuensi asli",
      "Amplitud"
    ],
    "keyConceptsDlp": [
      "Damping",
      "Resonance",
      "Natural frequency",
      "Amplitude"
    ],
    "thumbnailUrl": "/thumbnails/LwJhb5ey-q8.webp",
    "relatedFormulaIds": []
  },
  {
    "driveId": "Y7yT4-9R6do",
    "youtubeId": "Y7yT4-9R6do",
    "week": "T4 M24",
    "weekNum": 24,
    "titleBm": "5.3 Pantulan Gelombang",
    "titleDlp": "5.3 Reflection of Waves",
    "form": 4,
    "chapterNum": 5,
    "chapterBm": "Gelombang",
    "chapterDlp": "Waves",
    "duration": "56:59",
    "keyConceptsBm": [
      "Pantulan gelombang",
      "Muka gelombang",
      "Gema",
      "Sudut tuju",
      "Sudut pantulan"
    ],
    "keyConceptsDlp": [
      "Reflection of wave",
      "Wavefront",
      "Echo",
      "Angle of incidence",
      "Angle of reflection"
    ],
    "thumbnailUrl": "/thumbnails/Y7yT4-9R6do.webp",
    "relatedFormulaIds": [
      "f-t4-5-3"
    ]
  },
  {
    "driveId": "GIbs4ZhEPVY",
    "youtubeId": "GIbs4ZhEPVY",
    "week": "T4 M25",
    "weekNum": 25,
    "titleBm": "5.4 Pembiasan Gelombang",
    "titleDlp": "5.4 Refraction of Waves",
    "form": 4,
    "chapterNum": 5,
    "chapterBm": "Gelombang",
    "chapterDlp": "Waves",
    "duration": "58:24",
    "keyConceptsBm": [
      "Pembiasan gelombang",
      "Laju gelombang",
      "Panjang gelombang",
      "Frekuensi gelombang"
    ],
    "keyConceptsDlp": [
      "Refraction of wave",
      "Wave speed",
      "Wavelength",
      "Wave frequency"
    ],
    "thumbnailUrl": "/thumbnails/GIbs4ZhEPVY.webp",
    "relatedFormulaIds": [
      "f-t4-5-4"
    ]
  },
  {
    "driveId": "jbBMpSkhVbE",
    "youtubeId": "jbBMpSkhVbE",
    "week": "T4 M26",
    "weekNum": 26,
    "titleBm": "5.5 Pembelauan Gelombang",
    "titleDlp": "5.5 Diffraction of Waves",
    "form": 4,
    "chapterNum": 5,
    "chapterBm": "Gelombang",
    "chapterDlp": "Waves",
    "duration": "57:05",
    "keyConceptsBm": [
      "Pembelauan gelombang",
      "Kesan pembelauan",
      "Muka gelombang"
    ],
    "keyConceptsDlp": [
      "Diffraction of wave",
      "Diffraction effect",
      "Wavefront"
    ],
    "thumbnailUrl": "/thumbnails/jbBMpSkhVbE.webp",
    "relatedFormulaIds": []
  },
  {
    "driveId": "hgnSRVa-lcY",
    "youtubeId": "hgnSRVa-lcY",
    "week": "T4 M27",
    "weekNum": 27,
    "titleBm": "5.6a Interferens Gelombang",
    "titleDlp": "5.6a Interference of Waves",
    "form": 4,
    "chapterNum": 5,
    "chapterBm": "Gelombang",
    "chapterDlp": "Waves",
    "duration": "55:53",
    "keyConceptsBm": [
      "Prinsip superposisi",
      "Interferens membina",
      "Interferens membinasa",
      "Punca koheren",
      "Antinod",
      "Nod"
    ],
    "keyConceptsDlp": [
      "Principle of superposition",
      "Constructive interference",
      "Destructive interference",
      "Coherent sources",
      "Antinode",
      "Node"
    ],
    "thumbnailUrl": "/thumbnails/hgnSRVa-lcY.webp",
    "relatedFormulaIds": [
      "f-t4-5-5"
    ]
  },
  {
    "driveId": "oyweI4GDIsM",
    "youtubeId": "oyweI4GDIsM",
    "week": "T4 M28",
    "weekNum": 28,
    "titleBm": "5.6b Interferens Gelombang",
    "titleDlp": "5.6b Interference of Waves Part 2",
    "form": 4,
    "chapterNum": 5,
    "chapterBm": "Gelombang",
    "chapterDlp": "Waves",
    "duration": "57:04",
    "keyConceptsBm": [
      "Interferens membina",
      "Interferens membinasa",
      "Panjang gelombang"
    ],
    "keyConceptsDlp": [
      "Constructive interference",
      "Destructive interference",
      "Wavelength"
    ],
    "thumbnailUrl": "/thumbnails/oyweI4GDIsM.webp",
    "relatedFormulaIds": [
      "f-t4-5-5"
    ]
  },
  {
    "driveId": "4v3ygAyaP68",
    "youtubeId": "4v3ygAyaP68",
    "week": "T4 M29",
    "weekNum": 29,
    "titleBm": "5.7 Gelombang EM",
    "titleDlp": "5.7 Electromagnetic Waves",
    "form": 4,
    "chapterNum": 5,
    "chapterBm": "Gelombang",
    "chapterDlp": "Waves",
    "duration": "58:33",
    "keyConceptsBm": [
      "Spektrum elektromagnet",
      "Gelombang melintang",
      "Laju cahaya"
    ],
    "keyConceptsDlp": [
      "Electromagnetic spectrum",
      "Transverse wave",
      "Speed of light"
    ],
    "thumbnailUrl": "/thumbnails/4v3ygAyaP68.webp",
    "relatedFormulaIds": [
      "f-t4-5-1"
    ]
  },
  {
    "driveId": "3Wy8-kNGrcc",
    "youtubeId": "3Wy8-kNGrcc",
    "week": "T4 M30",
    "weekNum": 30,
    "titleBm": "6.1 Pembiasan Cahaya",
    "titleDlp": "6.1 Refraction of Light",
    "form": 4,
    "chapterNum": 6,
    "chapterBm": "Cahaya dan Optik",
    "chapterDlp": "Light and Optics",
    "duration": "58:17",
    "keyConceptsBm": [
      "Pembiasan cahaya",
      "Ketumpatan optik",
      "Indeks biasan",
      "Hukum Snell",
      "Dalam nyata",
      "Dalam ketara"
    ],
    "keyConceptsDlp": [
      "Refraction of light",
      "Optical density",
      "Refractive index",
      "Snell's law",
      "Real depth",
      "Apparent depth"
    ],
    "thumbnailUrl": "/thumbnails/3Wy8-kNGrcc.webp",
    "relatedFormulaIds": [
      "f-t4-6-1",
      "f-t4-6-2",
      "f-t4-6-3"
    ]
  },
  {
    "driveId": "bViYGWMIHoI",
    "youtubeId": "bViYGWMIHoI",
    "week": "T4 M31",
    "weekNum": 31,
    "titleBm": "6.2 Pantulan Dalam Penuh",
    "titleDlp": "6.2 Total Internal Reflection",
    "form": 4,
    "chapterNum": 6,
    "chapterBm": "Cahaya dan Optik",
    "chapterDlp": "Light and Optics",
    "duration": "56:54",
    "keyConceptsBm": [
      "Pantulan dalam penuh",
      "Sudut genting",
      "Gentian optik",
      "Logamaya"
    ],
    "keyConceptsDlp": [
      "Total internal reflection",
      "Critical angle",
      "Optical fibre",
      "Mirage"
    ],
    "thumbnailUrl": "/thumbnails/bViYGWMIHoI.webp",
    "relatedFormulaIds": [
      "f-t4-6-4"
    ]
  },
  {
    "driveId": "9sJ9a5rToVs",
    "youtubeId": "9sJ9a5rToVs",
    "week": "T4 M32",
    "weekNum": 32,
    "titleBm": "6.3 Pembentukan Imej oleh Kanta",
    "titleDlp": "6.3 Image Formation by Lenses",
    "form": 4,
    "chapterNum": 6,
    "chapterBm": "Cahaya dan Optik",
    "chapterDlp": "Light and Optics",
    "duration": "46:59",
    "keyConceptsBm": [
      "Kanta cembung",
      "Kanta cekung",
      "Pusat optik",
      "Titik fokus",
      "Panjang fokus"
    ],
    "keyConceptsDlp": [
      "Convex lens",
      "Concave lens",
      "Optical centre",
      "Focal point",
      "Focal length"
    ],
    "thumbnailUrl": "/thumbnails/9sJ9a5rToVs.webp",
    "relatedFormulaIds": [
      "f-t4-6-6"
    ]
  },
  {
    "driveId": "BRgIHlXbr_k",
    "youtubeId": "BRgIHlXbr_k",
    "week": "T4 M33",
    "weekNum": 33,
    "titleBm": "6.4 Pembentukan Imej oleh Kanta",
    "titleDlp": "6.4 Lens Formula & Magnification",
    "form": 4,
    "chapterNum": 6,
    "chapterBm": "Cahaya dan Optik",
    "chapterDlp": "Light and Optics",
    "duration": "57:15",
    "keyConceptsBm": [
      "Pembesaran linear",
      "Formula kanta nipis",
      "Kuasa kanta",
      "Imej nyata",
      "Imej maya"
    ],
    "keyConceptsDlp": [
      "Linear magnification",
      "Thin lens formula",
      "Power of lens",
      "Real image",
      "Virtual image"
    ],
    "thumbnailUrl": "/thumbnails/BRgIHlXbr_k.webp",
    "relatedFormulaIds": [
      "f-t4-6-5",
      "f-t4-6-6",
      "f-t4-6-7"
    ]
  },
  {
    "driveId": "yuY1N9zgEEc",
    "youtubeId": "yuY1N9zgEEc",
    "week": "T4 M34",
    "weekNum": 34,
    "titleBm": "6.5 Peralatan Optik",
    "titleDlp": "6.5 Optical Instruments",
    "form": 4,
    "chapterNum": 6,
    "chapterBm": "Cahaya dan Optik",
    "chapterDlp": "Light and Optics",
    "duration": "55:43",
    "keyConceptsBm": [
      "Kanta pembesar",
      "Mikroskop majmuk",
      "Teleskop astronomi",
      "Pelarasan normal"
    ],
    "keyConceptsDlp": [
      "Magnifying glass",
      "Compound microscope",
      "Astronomical telescope",
      "Normal adjustment"
    ],
    "thumbnailUrl": "/thumbnails/yuY1N9zgEEc.webp",
    "relatedFormulaIds": [
      "f-t4-6-8",
      "f-t4-6-9"
    ]
  },
  {
    "driveId": "AceZCzCckqc",
    "youtubeId": "AceZCzCckqc",
    "week": "T4 M36",
    "weekNum": 36,
    "titleBm": "6.6a Pembentukan Imej Oleh Cermin Sfera",
    "titleDlp": "6.6a Image Formation by Spherical Mirrors",
    "form": 4,
    "chapterNum": 6,
    "chapterBm": "Cahaya dan Optik",
    "chapterDlp": "Light and Optics",
    "duration": "57:10",
    "keyConceptsBm": [
      "Cermin cekung",
      "Cermin cembung",
      "Pusat kelengkungan",
      "Titik fokus"
    ],
    "keyConceptsDlp": [
      "Concave mirror",
      "Convex mirror",
      "Centre of curvature",
      "Focal point"
    ],
    "thumbnailUrl": "/thumbnails/AceZCzCckqc.webp",
    "relatedFormulaIds": []
  },
  {
    "driveId": "8Ci_wF-Pvps",
    "youtubeId": "8Ci_wF-Pvps",
    "week": "T4 M36",
    "weekNum": 36.5,
    "titleBm": "6.6b Pembentukan Imej Oleh Cermin Sfera",
    "titleDlp": "6.6b Image Formation by Spherical Mirrors Part 2",
    "form": 4,
    "chapterNum": 6,
    "chapterBm": "Cahaya dan Optik",
    "chapterDlp": "Light and Optics",
    "duration": "58:19",
    "keyConceptsBm": [
      "Cermin cekung",
      "Cermin cembung",
      "Imej nyata",
      "Imej maya"
    ],
    "keyConceptsDlp": [
      "Concave mirror",
      "Convex mirror",
      "Real image",
      "Virtual image"
    ],
    "thumbnailUrl": "/thumbnails/8Ci_wF-Pvps.webp",
    "relatedFormulaIds": []
  }
];

export const rawForm5Videos = [
  {
    "driveId": "t5_m1_1_1",
    "week": "T5 M1",
    "weekNum": 1,
    "titleBm": "1.1 Daya Paduan",
    "titleDlp": "1.1 Resultant Force",
    "form": 5,
    "chapterNum": 1,
    "chapterBm": "Daya dan Gerakan II",
    "chapterDlp": "Force and Motion II",
    "duration": "51:08",
    "youtubeId": "OJBQJ3ZSLi0",
    "thumbnailUrl": "https://img.youtube.com/vi/OJBQJ3ZSLi0/maxresdefault.jpg",
    "isPendingUpload": false,
    "keyConceptsBm": [
      "Daya Paduan",
      "Gambar rajah jasad bebas",
      "Hukum Gerakan Newton Kedua"
    ],
    "keyConceptsDlp": [
      "Resultant Force",
      "Free body diagram",
      "Newton's Second Law of Motion"
    ],
    "relatedFormulaIds": [
      "f-t5-1-1"
    ]
  },
  {
    "driveId": "t5_m2_1_3",
    "week": "T5 M2",
    "weekNum": 2,
    "titleBm": "1.3 Keseimbangan Daya",
    "titleDlp": "1.3 Forces in Equilibrium",
    "form": 5,
    "chapterNum": 1,
    "chapterBm": "Daya dan Gerakan II",
    "chapterDlp": "Force and Motion II",
    "duration": "57:29",
    "youtubeId": "goiFRALUbFk",
    "thumbnailUrl": "https://img.youtube.com/vi/goiFRALUbFk/maxresdefault.jpg",
    "isPendingUpload": false,
    "keyConceptsBm": [
      "Leraian Daya",
      "Keseimbangan Daya",
      "Segi tiga daya"
    ],
    "keyConceptsDlp": [
      "Resolution of Forces",
      "Equilibrium of Forces",
      "Triangle of forces"
    ],
    "relatedFormulaIds": [
      "f-t5-1-2",
      "f-t5-1-3",
      "f-t5-1-4"
    ]
  },
  {
    "driveId": "t5_m4_1_4",
    "week": "T5 M4",
    "weekNum": 4,
    "titleBm": "1.4 Kekenyalan",
    "titleDlp": "1.4 Elasticity",
    "form": 5,
    "chapterNum": 1,
    "chapterBm": "Daya dan Gerakan II",
    "chapterDlp": "Force and Motion II",
    "duration": "59:50",
    "youtubeId": "1N6H3F9MxNY",
    "thumbnailUrl": "https://img.youtube.com/vi/1N6H3F9MxNY/maxresdefault.jpg",
    "isPendingUpload": false,
    "keyConceptsBm": [
      "Kekenyalan",
      "Had kenyal",
      "Hukum Hooke",
      "Pemalar spring",
      "Tenaga keupayaan kenyal"
    ],
    "keyConceptsDlp": [
      "Elasticity",
      "Elastic limit",
      "Hooke's Law",
      "Spring constant",
      "Elastic potential energy"
    ],
    "relatedFormulaIds": [
      "f-t5-1-5",
      "f-t5-1-6",
      "f-t5-1-7"
    ]
  },
  {
    "driveId": "t5_m6_2_2",
    "week": "T5 M6",
    "weekNum": 6,
    "titleBm": "2.2 Tekanan Atmosfera",
    "titleDlp": "2.2 Atmospheric Pressure",
    "form": 5,
    "chapterNum": 2,
    "chapterBm": "Tekanan",
    "chapterDlp": "Pressure",
    "duration": "56:44",
    "youtubeId": "eHYyqw-JuPA",
    "thumbnailUrl": "https://img.youtube.com/vi/eHYyqw-JuPA/maxresdefault.jpg",
    "isPendingUpload": false,
    "keyConceptsBm": [
      "Tekanan atmosfera",
      "Tekanan cecair",
      "Barometer Fortin",
      "Barometer Aneroid"
    ],
    "keyConceptsDlp": [
      "Atmospheric pressure",
      "Liquid pressure",
      "Fortin barometer",
      "Aneroid barometer"
    ],
    "relatedFormulaIds": [
      "f-t5-2-1",
      "f-t5-2-2",
      "f-t5-2-3",
      "f-t5-2-4"
    ]
  },
  {
    "driveId": "t5_m7_2_3",
    "week": "T5 M7",
    "weekNum": 7,
    "titleBm": "2.3 Tekanan Gas & 2.4 Prinsip Pascal",
    "titleDlp": "2.3 Gas Pressure & 2.4 Pascal's Principle",
    "form": 5,
    "chapterNum": 2,
    "chapterBm": "Tekanan",
    "chapterDlp": "Pressure",
    "duration": "1:00:09",
    "youtubeId": "ak8wrDWz628",
    "thumbnailUrl": "https://img.youtube.com/vi/ak8wrDWz628/maxresdefault.jpg",
    "isPendingUpload": false,
    "keyConceptsBm": [
      "Manometer",
      "Tekanan gas",
      "Prinsip Pascal",
      "Sistem hidraulik"
    ],
    "keyConceptsDlp": [
      "Manometer",
      "Gas pressure",
      "Pascal's principle",
      "Hydraulic system"
    ],
    "relatedFormulaIds": [
      "f-t5-2-5",
      "f-t5-2-6"
    ]
  },
  {
    "driveId": "t5_m8_2_5",
    "week": "T5 M8",
    "weekNum": 8,
    "titleBm": "2.5 Prinsip Archimedes",
    "titleDlp": "2.5 Archimedes' Principle",
    "form": 5,
    "chapterNum": 2,
    "chapterBm": "Tekanan",
    "chapterDlp": "Pressure",
    "duration": "57:42",
    "youtubeId": "70UPEjlVl9Y",
    "thumbnailUrl": "https://img.youtube.com/vi/70UPEjlVl9Y/maxresdefault.jpg",
    "isPendingUpload": false,
    "keyConceptsBm": [
      "Prinsip Archimedes",
      "Daya apungan",
      "Isipadu bendalir tersesar",
      "Hidrometer"
    ],
    "keyConceptsDlp": [
      "Archimedes' principle",
      "Buoyant force",
      "Displaced fluid volume",
      "Hydrometer"
    ],
    "relatedFormulaIds": [
      "f-t5-2-7"
    ]
  },
  {
    "driveId": "t5_m9_2_6",
    "week": "T5 M9",
    "weekNum": 9,
    "titleBm": "2.6 Prinsip Bernoulli",
    "titleDlp": "2.6 Bernoulli's Principle",
    "form": 5,
    "chapterNum": 2,
    "chapterBm": "Tekanan",
    "chapterDlp": "Pressure",
    "duration": "53:28",
    "youtubeId": "qbOMdYqJ76c",
    "thumbnailUrl": "https://img.youtube.com/vi/qbOMdYqJ76c/maxresdefault.jpg",
    "isPendingUpload": false,
    "keyConceptsBm": [
      "Prinsip Bernoulli",
      "Kesan Venturi",
      "Daya angkat",
      "Aerofoil"
    ],
    "keyConceptsDlp": [
      "Bernoulli's principle",
      "Venturi effect",
      "Lift force",
      "Aerofoil"
    ],
    "relatedFormulaIds": []
  },
  {
    "driveId": "t5_m10_3_1",
    "week": "T5 M10",
    "weekNum": 10,
    "titleBm": "3.1 Arus & Beza Keupayaan",
    "titleDlp": "3.1 Current & Potential Difference",
    "form": 5,
    "chapterNum": 3,
    "chapterBm": "Elektrik",
    "chapterDlp": "Electricity",
    "duration": "56:29",
    "youtubeId": "5SZ5FIJdobc",
    "thumbnailUrl": "https://img.youtube.com/vi/5SZ5FIJdobc/maxresdefault.jpg",
    "isPendingUpload": false,
    "keyConceptsBm": [
      "Medan Elektrik",
      "Kekuatan Medan Elektrik",
      "Arus elektrik",
      "Beza keupayaan elektrik"
    ],
    "keyConceptsDlp": [
      "Electric Field",
      "Electric Field Strength",
      "Electric current",
      "Electric potential difference"
    ],
    "relatedFormulaIds": [
      "f-t5-3-1",
      "f-t5-3-2",
      "f-t5-3-3"
    ]
  },
  {
    "driveId": "t5_m11_3_2a",
    "week": "T5 M11",
    "weekNum": 11,
    "titleBm": "3.2a Rintangan",
    "titleDlp": "3.2a Resistance",
    "form": 5,
    "chapterNum": 3,
    "chapterBm": "Elektrik",
    "chapterDlp": "Electricity",
    "duration": "1:10:19",
    "youtubeId": "pWWsFgU9-H4",
    "thumbnailUrl": "https://img.youtube.com/vi/pWWsFgU9-H4/maxresdefault.jpg",
    "isPendingUpload": false,
    "keyConceptsBm": [
      "Hukum Ohm",
      "Konduktor Ohm",
      "Konduktor bukan Ohm",
      "Rintangan"
    ],
    "keyConceptsDlp": [
      "Ohm's Law",
      "Ohmic conductor",
      "Non-ohmic conductor",
      "Resistance"
    ],
    "relatedFormulaIds": [
      "f-t5-3-4",
      "f-t5-3-5",
      "f-t5-3-6"
    ]
  },
  {
    "driveId": "t5_m12_3_2b",
    "week": "T5 M12",
    "weekNum": 12,
    "titleBm": "3.2b Rintangan",
    "titleDlp": "3.2b Resistance in Circuits",
    "form": 5,
    "chapterNum": 3,
    "chapterBm": "Elektrik",
    "chapterDlp": "Electricity",
    "duration": "1:10:19",
    "youtubeId": "pWWsFgU9-H4",
    "thumbnailUrl": "https://img.youtube.com/vi/pWWsFgU9-H4/maxresdefault.jpg",
    "isPendingUpload": false,
    "keyConceptsBm": [
      "Kerintangan dawai",
      "Superkonduktor",
      "Suhu genting",
      "Rintangan"
    ],
    "keyConceptsDlp": [
      "Wire resistivity",
      "Superconductor",
      "Critical temperature",
      "Resistance"
    ],
    "relatedFormulaIds": [
      "f-t5-3-7"
    ]
  },
  {
    "driveId": "t5_m13_3_3",
    "week": "T5 M13",
    "weekNum": 13,
    "titleBm": "3.3 DGE & Rintangan Dalam",
    "titleDlp": "3.3 EMF & Internal Resistance",
    "form": 5,
    "chapterNum": 3,
    "chapterBm": "Elektrik",
    "chapterDlp": "Electricity",
    "duration": "1:00:40",
    "youtubeId": "So04Qkj6UcY",
    "thumbnailUrl": "https://img.youtube.com/vi/So04Qkj6UcY/maxresdefault.jpg",
    "isPendingUpload": false,
    "keyConceptsBm": [
      "Daya gerak elektrik (d.g.e.)",
      "Rintangan dalam",
      "Voltan susut"
    ],
    "keyConceptsDlp": [
      "Electromotive force (e.m.f.)",
      "Internal resistance",
      "Voltage drop"
    ],
    "relatedFormulaIds": [
      "f-t5-3-8"
    ]
  },
  {
    "driveId": "t5_m14_3_4",
    "week": "T5 M14",
    "weekNum": 14,
    "titleBm": "3.4 Tenaga & Kuasa Elektrik",
    "titleDlp": "3.4 Electrical Energy & Power",
    "form": 5,
    "chapterNum": 3,
    "chapterBm": "Elektrik",
    "chapterDlp": "Electricity",
    "duration": "55:20",
    "youtubeId": "3gFfwX_kO1E",
    "thumbnailUrl": "https://img.youtube.com/vi/3gFfwX_kO1E/maxresdefault.jpg",
    "isPendingUpload": false,
    "keyConceptsBm": [
      "Tenaga elektrik",
      "Kuasa elektrik",
      "Kecekapan tenaga elektrik"
    ],
    "keyConceptsDlp": [
      "Electrical energy",
      "Electric power",
      "Energy efficiency"
    ],
    "relatedFormulaIds": [
      "f-t5-3-9",
      "f-t5-3-10",
      "f-t5-3-11"
    ]
  },
  {
    "driveId": "t5_m15_4_1a",
    "week": "T5 M15",
    "weekNum": 15,
    "titleBm": "4.1a Fleming Kiri",
    "titleDlp": "4.1a Fleming's Left Hand Rule",
    "form": 5,
    "chapterNum": 4,
    "chapterBm": "Keelektromagnetan",
    "chapterDlp": "Electromagnetism",
    "duration": "55:58",
    "youtubeId": "SWpDdWWz694",
    "thumbnailUrl": "https://img.youtube.com/vi/SWpDdWWz694/maxresdefault.jpg",
    "isPendingUpload": false,
    "keyConceptsBm": [
      "Medan lastik",
      "Petua tangan kiri Fleming",
      "Daya magnet"
    ],
    "keyConceptsDlp": [
      "Catapult field",
      "Fleming's left-hand rule",
      "Magnetic force"
    ],
    "relatedFormulaIds": []
  },
  {
    "driveId": "t5_m16_4_1b",
    "week": "T5 M16",
    "weekNum": 16,
    "titleBm": "4.1b Fleming Kiri",
    "titleDlp": "4.1b Fleming's Left Hand Applications",
    "form": 5,
    "chapterNum": 4,
    "chapterBm": "Keelektromagnetan",
    "chapterDlp": "Electromagnetism",
    "duration": "58:44",
    "youtubeId": "eIXYPy4y1iw",
    "thumbnailUrl": "https://img.youtube.com/vi/eIXYPy4y1iw/maxresdefault.jpg",
    "isPendingUpload": false,
    "keyConceptsBm": [
      "Motor arus terus/ ulang-alik",
      "Petua tangan kiri Fleming",
      "Komutator"
    ],
    "keyConceptsDlp": [
      "Direct / alternating current motor",
      "Fleming's left-hand rule",
      "Commutator"
    ],
    "relatedFormulaIds": []
  },
  {
    "driveId": "t5_m17_4_2",
    "week": "T5 M17",
    "weekNum": 17,
    "titleBm": "4.2 Induksi Elektromagnet",
    "titleDlp": "4.2 Electromagnetic Induction",
    "form": 5,
    "chapterNum": 4,
    "chapterBm": "Keelektromagnetan",
    "chapterDlp": "Electromagnetism",
    "duration": "55:41",
    "youtubeId": "Z8c2bJ0iCCE",
    "thumbnailUrl": "https://img.youtube.com/vi/Z8c2bJ0iCCE/maxresdefault.jpg",
    "isPendingUpload": false,
    "keyConceptsBm": [
      "Aruhan elektromagnet",
      "Fluks magnet",
      "Hukum Faraday",
      "Hukum Lenz",
      "Petua tangan kanan Fleming"
    ],
    "keyConceptsDlp": [
      "Electromagnetic induction",
      "Magnetic flux",
      "Faraday's Law",
      "Lenz's Law",
      "Fleming's right-hand rule"
    ],
    "relatedFormulaIds": []
  },
  {
    "driveId": "t5_m18_4_3a",
    "week": "T5 M18",
    "weekNum": 18,
    "titleBm": "4.3a Transformer",
    "titleDlp": "4.3a Transformer",
    "form": 5,
    "chapterNum": 4,
    "chapterBm": "Keelektromagnetan",
    "chapterDlp": "Electromagnetism",
    "duration": "59:42",
    "youtubeId": "Tdx-xIytvx0",
    "thumbnailUrl": "https://img.youtube.com/vi/Tdx-xIytvx0/maxresdefault.jpg",
    "isPendingUpload": false,
    "keyConceptsBm": [
      "Transformer injak naik",
      "Transformer injak turun",
      "Teras besi lembut berlamina"
    ],
    "keyConceptsDlp": [
      "Step-up transformer",
      "Step-down transformer",
      "Laminated soft iron core"
    ],
    "relatedFormulaIds": [
      "f-t5-4-1"
    ]
  },
  {
    "driveId": "t5_m19_4_3b",
    "week": "T5 M19",
    "weekNum": 19,
    "titleBm": "4.3b Transformer",
    "titleDlp": "4.3b Transformer Efficiency",
    "form": 5,
    "chapterNum": 4,
    "chapterBm": "Keelektromagnetan",
    "chapterDlp": "Electromagnetism",
    "duration": "57:02",
    "youtubeId": "Jn1W27ZHvGU",
    "thumbnailUrl": "https://img.youtube.com/vi/Jn1W27ZHvGU/maxresdefault.jpg",
    "isPendingUpload": false,
    "keyConceptsBm": [
      "Kecekapan transformer",
      "Transformer unggul",
      "Kehilangan tenaga dalam transformer"
    ],
    "keyConceptsDlp": [
      "Transformer efficiency",
      "Ideal transformer",
      "Energy loss in transformer"
    ],
    "relatedFormulaIds": [
      "f-t5-4-2",
      "f-t5-4-3"
    ]
  },
  {
    "driveId": "t5_m20_5_1",
    "week": "T5 M20",
    "weekNum": 20,
    "titleBm": "5.1 Elektron",
    "titleDlp": "5.1 Electrons & Thermionic Emission",
    "form": 5,
    "chapterNum": 5,
    "chapterBm": "Elektronik",
    "chapterDlp": "Electronics",
    "duration": "55:39",
    "youtubeId": "vYUJ_INFkL0",
    "thumbnailUrl": "https://img.youtube.com/vi/vYUJ_INFkL0/maxresdefault.jpg",
    "isPendingUpload": false,
    "keyConceptsBm": [
      "Pancaran termion",
      "Sinar katod",
      "Tiub sinar katod"
    ],
    "keyConceptsDlp": [
      "Thermionic emission",
      "Cathode rays",
      "Cathode-ray tube"
    ],
    "relatedFormulaIds": [
      "f-t5-5-1",
      "f-t5-5-2"
    ]
  },
  {
    "driveId": "t5_m21_5_2",
    "week": "T5 M21",
    "weekNum": 21,
    "titleBm": "5.2 Diod Semikonduktor",
    "titleDlp": "5.2 Semiconductor Diode",
    "form": 5,
    "chapterNum": 5,
    "chapterBm": "Elektronik",
    "chapterDlp": "Electronics",
    "duration": "53:32",
    "youtubeId": "zc3ZJJdgzNk",
    "thumbnailUrl": "https://img.youtube.com/vi/zc3ZJJdgzNk/maxresdefault.jpg",
    "isPendingUpload": false,
    "keyConceptsBm": [
      "Diod semikonduktor",
      "Pendopan",
      "Semikonduktor jenis-n",
      "Semikonduktor jenis-p",
      "Pincang depan",
      "Rektifikasi gelombang penuh"
    ],
    "keyConceptsDlp": [
      "Semiconductor diode",
      "Doping",
      "n-type semiconductor",
      "p-type semiconductor",
      "Forward bias",
      "Full-wave rectification"
    ],
    "relatedFormulaIds": []
  },
  {
    "driveId": "t5_m22_5_3",
    "week": "T5 M22",
    "weekNum": 22,
    "titleBm": "5.3 Transistor",
    "titleDlp": "5.3 Transistor",
    "form": 5,
    "chapterNum": 5,
    "chapterBm": "Elektronik",
    "chapterDlp": "Electronics",
    "duration": "55:22",
    "youtubeId": "8Ij0pG4wcIg",
    "thumbnailUrl": "https://img.youtube.com/vi/8Ij0pG4wcIg/maxresdefault.jpg",
    "isPendingUpload": false,
    "keyConceptsBm": [
      "Transistor npn/pnp",
      "Arus tapak",
      "Arus pengumpul",
      "Transistor sebagai suis automatik",
      "Transistor sebagai amplifier arus"
    ],
    "keyConceptsDlp": [
      "npn / pnp transistor",
      "Base current",
      "Collector current",
      "Transistor as automatic switch",
      "Transistor as current amplifier"
    ],
    "relatedFormulaIds": [
      "f-t5-5-3",
      "f-t5-5-4"
    ]
  },
  {
    "driveId": "t5_m23_6_1a",
    "week": "T5 M23",
    "weekNum": 23,
    "titleBm": "6.1a Reputan Radioaktif",
    "titleDlp": "6.1a Radioactive Decay",
    "form": 5,
    "chapterNum": 6,
    "chapterBm": "Fizik Nuklear",
    "chapterDlp": "Nuclear Physics",
    "duration": "50:58",
    "youtubeId": "egTaExkpdbs",
    "thumbnailUrl": "https://img.youtube.com/vi/egTaExkpdbs/maxresdefault.jpg",
    "isPendingUpload": false,
    "keyConceptsBm": [
      "Reputan alfa",
      "Reputan beta",
      "Reputan gama"
    ],
    "keyConceptsDlp": [
      "Alpha decay",
      "Beta decay",
      "Gamma decay"
    ],
    "relatedFormulaIds": []
  },
  {
    "driveId": "t5_m24_6_1b",
    "week": "T5 M24",
    "weekNum": 24,
    "titleBm": "6.1b Reputan Radioaktif & Separuh Hayat",
    "titleDlp": "6.1b Half-life & Decay Curve",
    "form": 5,
    "chapterNum": 6,
    "chapterBm": "Fizik Nuklear",
    "chapterDlp": "Nuclear Physics",
    "duration": "57:34",
    "youtubeId": "kvmkaV_z7b8",
    "thumbnailUrl": "https://img.youtube.com/vi/kvmkaV_z7b8/maxresdefault.jpg",
    "isPendingUpload": false,
    "keyConceptsBm": [
      "Separuh hayat",
      "Keaktifan",
      "Radioisotop"
    ],
    "keyConceptsDlp": [
      "Half-life",
      "Activity",
      "Radioisotope"
    ],
    "relatedFormulaIds": [
      "f-t5-6-1"
    ]
  },
  {
    "driveId": "t5_m25_6_2a",
    "week": "T5 M25",
    "weekNum": 25,
    "titleBm": "6.2a Tenaga Nuklear",
    "titleDlp": "6.2a Nuclear Energy",
    "form": 5,
    "chapterNum": 6,
    "chapterBm": "Fizik Nuklear",
    "chapterDlp": "Nuclear Physics",
    "duration": "57:24",
    "youtubeId": "zSEV0Fc6nbA",
    "thumbnailUrl": "https://img.youtube.com/vi/zSEV0Fc6nbA/maxresdefault.jpg",
    "isPendingUpload": false,
    "keyConceptsBm": [
      "Pembelahan nukleus",
      "Tindak balas berantai",
      "Cacat jisim",
      "Persamaan kesetaraan jisim-tenaga Einstein"
    ],
    "keyConceptsDlp": [
      "Nuclear fission",
      "Chain reaction",
      "Mass defect",
      "Einstein's mass-energy equivalence"
    ],
    "relatedFormulaIds": [
      "f-t5-6-2",
      "f-t5-6-3"
    ]
  },
  {
    "driveId": "t5_m26_6_2b",
    "week": "T5 M26",
    "weekNum": 26,
    "titleBm": "6.2b Tenaga Nuklear & Pelakuran",
    "titleDlp": "6.2b Nuclear Fusion & Reactor",
    "form": 5,
    "chapterNum": 6,
    "chapterBm": "Fizik Nuklear",
    "chapterDlp": "Nuclear Physics",
    "duration": "57:39",
    "youtubeId": "eIMR3w8zgXo",
    "thumbnailUrl": "https://img.youtube.com/vi/eIMR3w8zgXo/maxresdefault.jpg",
    "isPendingUpload": false,
    "keyConceptsBm": [
      "Pelakuran nukleus",
      "Reaktor nuklear",
      "Tenaga nuklear"
    ],
    "keyConceptsDlp": [
      "Nuclear fusion",
      "Nuclear reactor",
      "Nuclear energy"
    ],
    "relatedFormulaIds": [
      "f-t5-6-2",
      "f-t5-6-3"
    ]
  },
  {
    "driveId": "t5_m27_7_1a",
    "week": "T5 M27",
    "weekNum": 27,
    "titleBm": "7.1a Teori Kuantum Cahaya",
    "titleDlp": "7.1a Quantum Theory of Light",
    "form": 5,
    "chapterNum": 7,
    "chapterBm": "Fizik Kuantum",
    "chapterDlp": "Quantum Physics",
    "duration": "58:44",
    "youtubeId": "Ps7VQetqxjE",
    "thumbnailUrl": "https://img.youtube.com/vi/Ps7VQetqxjE/maxresdefault.jpg",
    "isPendingUpload": false,
    "keyConceptsBm": [
      "Jasad hitam",
      "Sinaran termal",
      "Spektrum selanjar",
      "Kuantum tenaga"
    ],
    "keyConceptsDlp": [
      "Black body",
      "Thermal radiation",
      "Continuous spectrum",
      "Quantum of energy"
    ],
    "relatedFormulaIds": [
      "f-t5-7-1"
    ]
  },
  {
    "driveId": "t5_m28_7_1b",
    "week": "T5 M28",
    "weekNum": 28,
    "titleBm": "7.1b Teori Kuantum Cahaya",
    "titleDlp": "7.1b Duality of Light & Wave-Particle",
    "form": 5,
    "chapterNum": 7,
    "chapterBm": "Fizik Kuantum",
    "chapterDlp": "Quantum Physics",
    "duration": "58:08",
    "youtubeId": "f1WVnayam58",
    "thumbnailUrl": "https://img.youtube.com/vi/f1WVnayam58/maxresdefault.jpg",
    "isPendingUpload": false,
    "keyConceptsBm": [
      "Duaan gelombang-zarah",
      "Panjang gelombang de Broglie",
      "Foton"
    ],
    "keyConceptsDlp": [
      "Wave-particle duality",
      "de Broglie wavelength",
      "Photon"
    ],
    "relatedFormulaIds": [
      "f-t5-7-1",
      "f-t5-7-2",
      "f-t5-7-3"
    ]
  },
  {
    "driveId": "t5_m29_7_2",
    "week": "T5 M29",
    "weekNum": 29,
    "titleBm": "7.2 Kesan Fotoelektrik",
    "titleDlp": "7.2 Photoelectric Effect",
    "form": 5,
    "chapterNum": 7,
    "chapterBm": "Fizik Kuantum",
    "chapterDlp": "Quantum Physics",
    "duration": "55:14",
    "youtubeId": "IbKXC8a5LUU",
    "thumbnailUrl": "https://img.youtube.com/vi/IbKXC8a5LUU/maxresdefault.jpg",
    "isPendingUpload": false,
    "keyConceptsBm": [
      "Kesan fotoelektrik",
      "Fotoelektron",
      "Frekuensi ambang"
    ],
    "keyConceptsDlp": [
      "Photoelectric effect",
      "Photoelectron",
      "Threshold frequency"
    ],
    "relatedFormulaIds": [
      "f-t5-7-4",
      "f-t5-7-6"
    ]
  },
  {
    "driveId": "t5_m30_7_3a",
    "week": "T5 M30",
    "weekNum": 30,
    "titleBm": "7.3a Fotoelektrik Einstein",
    "titleDlp": "7.3a Einstein's Photoelectric Equation",
    "form": 5,
    "chapterNum": 7,
    "chapterBm": "Fizik Kuantum",
    "chapterDlp": "Quantum Physics",
    "duration": "58:46",
    "youtubeId": "nPDKutIaM8k",
    "thumbnailUrl": "https://img.youtube.com/vi/nPDKutIaM8k/maxresdefault.jpg",
    "isPendingUpload": false,
    "keyConceptsBm": [
      "Persamaan fotoelektrik Einstein",
      "Fungsi kerja",
      "Tenaga kinetik maksimum fotoelektron"
    ],
    "keyConceptsDlp": [
      "Einstein's photoelectric equation",
      "Work function",
      "Maximum kinetic energy of photoelectron"
    ],
    "relatedFormulaIds": [
      "f-t5-7-5",
      "f-t5-7-6"
    ]
  },
  {
    "driveId": "t5_m31_7_3b",
    "week": "T5 M31",
    "weekNum": 31,
    "titleBm": "7.3b Fotoelektrik Einstein & Aplikasi",
    "titleDlp": "7.3b Photoelectric Applications",
    "form": 5,
    "chapterNum": 7,
    "chapterBm": "Fizik Kuantum",
    "chapterDlp": "Quantum Physics",
    "duration": "57:56",
    "youtubeId": "wiuGphZ5eGA",
    "thumbnailUrl": "https://img.youtube.com/vi/wiuGphZ5eGA/maxresdefault.jpg",
    "isPendingUpload": false,
    "keyConceptsBm": [
      "Voltan pemati",
      "Sel suria",
      "Kesan fotoelektrik"
    ],
    "keyConceptsDlp": [
      "Stopping potential",
      "Solar cell",
      "Photoelectric effect"
    ],
    "relatedFormulaIds": [
      "f-t5-7-5"
    ]
  }
];

const generateLearningPointsBm = (title: string, concepts: string[], form: number): string[] => {
  const points: string[] = [
    `Memahami konsep asas ${title} mengikut Sukatan Pelajaran KSSM Tingkatan ${form}`,
    `Menguasai teknik penyelesaian masalah dan pengiraan standard SPM berkaitan ${title}`
  ];
  
  if (concepts.length > 0) {
    points.push(`Menganalisis dan mengaplikasikan konsep ${concepts[0]} dalam Kertas 1 & Kertas 2 SPM`);
  } else {
    points.push(`Menganalisis prinsip-prinsip fizik penting serta aplikasinya dalam kehidupan harian`);
  }
  
  if (concepts.length > 1) {
    points.push(`Menghubungkaitkan ${concepts[1]} dengan fenomena fizik yang berkaitan`);
  } else {
    points.push(`Menjawab soalan KBAT SPM mengikut skema pemarkahan Lembaga Peperiksaan`);
  }

  return points;
};

const generateLearningPointsDlp = (title: string, concepts: string[]): string[] => {
  const points: string[] = [
    `Understand fundamental concepts of ${title} according to KSSM SPM syllabus`,
    `Master standard SPM problem-solving and calculation techniques for ${title}`
  ];
  
  if (concepts.length > 0) {
    points.push(`Analyze the concept of ${concepts[0]} in detail for Paper 1 & 2`);
  } else {
    points.push(`Analyze fundamental physics principles and their applications`);
  }
  
  if (concepts.length > 1) {
    points.push(`Master SPM problem-solving techniques involving ${concepts[1]}`);
  } else {
    points.push(`Practice answering HOTS questions according to SPM marking scheme`);
  }

  return points;
};

const getRawId = (obfuscated: string) => {
  try {
    if (typeof atob !== 'undefined') return atob(obfuscated).split('').reverse().join('');
    if (typeof Buffer !== 'undefined') return Buffer.from(obfuscated, 'base64').toString('utf8').split('').reverse().join('');
    return obfuscated;
  } catch (e) {
    return obfuscated;
  }
};

export const form4VideoLessons: VideoLesson[] = rawForm4Videos.map((v, index) => {
  const learningBm = dskpLearningPointsBm[v.driveId] || dskpLearningPointsBm[v.titleBm] || generateLearningPointsBm(v.titleBm, v.keyConceptsBm, 4);
  const learningDlp = dskpLearningPointsDlp[v.driveId] || dskpLearningPointsDlp[v.titleDlp] || generateLearningPointsDlp(v.titleDlp, v.keyConceptsDlp);
  
  return {
    ...v,
    id: v.driveId,
    thumbnailUrl: (v as any).thumbnailUrl || (v.youtubeId ? `https://img.youtube.com/vi/${v.youtubeId}/maxresdefault.jpg` : `/thumbnails/${v.driveId}.webp`),
    thumbnailBg: index % 5 === 0 ? "from-purple-900 via-indigo-950 to-slate-900" :
                 index % 5 === 1 ? "from-blue-950 via-slate-900 to-indigo-950" :
                 index % 5 === 2 ? "from-red-950 via-slate-900 to-amber-950" :
                 index % 5 === 3 ? "from-emerald-950 via-teal-900 to-slate-900" :
                                   "from-slate-900 via-purple-950 to-blue-950",
    learningPointsBm: learningBm,
    learningPointsDlp: learningDlp,
    resources: [
      {
        titleBm: `Nota Ringkas - ${v.titleBm}.pdf`,
        titleDlp: `Summary Notes - ${v.titleDlp}.pdf`,
        type: "pdf",
        size: "1.2 MB",
        url: `https://drive.google.com/file/d/${getRawId(v.driveId)}/view`
      },
      {
        titleBm: `Latihan Pengukuhan SPM - ${v.chapterBm}.docx`,
        titleDlp: `SPM Practice Worksheet - ${v.chapterDlp}.docx`,
        type: "docx",
        size: "850 KB",
        url: `https://drive.google.com/file/d/${getRawId(v.driveId)}/view`
      },
      {
        titleBm: `Slaid Pembentangan ${v.chapterBm}.pptx`,
        titleDlp: `Presentation Deck ${v.chapterDlp}.pptx`,
        type: "pptx",
        size: "3.4 MB",
        url: `https://drive.google.com/file/d/${getRawId(v.driveId)}/view`
      }
    ]
  };
});

export const form5VideoLessons: VideoLesson[] = rawForm5Videos.map((v, index) => {
  const learningBm = dskpLearningPointsBm[v.driveId] || dskpLearningPointsBm[v.titleBm] || generateLearningPointsBm(v.titleBm, v.keyConceptsBm, 5);
  const learningDlp = dskpLearningPointsDlp[v.driveId] || dskpLearningPointsDlp[v.titleDlp] || generateLearningPointsDlp(v.titleDlp, v.keyConceptsDlp);

  return {
    ...v,
    id: v.driveId,
    thumbnailUrl: (v as any).thumbnailUrl || `/thumbnails/${v.driveId}.webp`,
    thumbnailBg: index % 5 === 0 ? "from-amber-950 via-red-950 to-slate-900" :
                 index % 5 === 1 ? "from-teal-950 via-emerald-900 to-slate-900" :
                 index % 5 === 2 ? "from-indigo-950 via-purple-900 to-slate-900" :
                 index % 5 === 3 ? "from-blue-950 via-slate-900 to-cyan-950" :
                                   "from-slate-900 via-rose-950 to-purple-950",
    learningPointsBm: learningBm,
    learningPointsDlp: learningDlp,
    resources: [
      {
        titleBm: `Nota Ringkas T5 - ${v.titleBm}.pdf`,
        titleDlp: `F5 Summary Notes - ${v.titleDlp}.pdf`,
        type: "pdf",
        size: "1.4 MB",
        url: `https://drive.google.com/file/d/${getRawId(v.driveId)}/view`
      },
      {
        titleBm: `Latihan Pengukuhan T5 - ${v.chapterBm}.docx`,
        titleDlp: `F5 SPM Practice Worksheet - ${v.chapterDlp}.docx`,
        type: "docx",
        size: "920 KB",
        url: `https://drive.google.com/file/d/${getRawId(v.driveId)}/view`
      },
      {
        titleBm: `Slaid Pembentangan T5 ${v.chapterBm}.pptx`,
        titleDlp: `F5 Presentation Deck ${v.chapterDlp}.pptx`,
        type: "pptx",
        size: "3.8 MB",
        url: `https://drive.google.com/file/d/${getRawId(v.driveId)}/view`
      }
    ]
  };
});

export const allVideoLessons: VideoLesson[] = [...form4VideoLessons, ...form5VideoLessons];
