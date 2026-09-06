/**
 * RINGKASAN NOTA FIZIK SPM KSSM
 * Sumber Rasmi:
 * 1. CHEATNOTE T4 & CHEATNOTE T5 oleh Sir Halim
 * 2. Modul TasFiz (Tasmik Fizik)
 * 3. DSKP KSSM Fizik Tingkatan 4 & 5 (KPM)
 */

export interface LessonCheatNote {
  lessonId: string;
  titleBm: string;
  titleDlp: string;
  chapterBm: string;
  chapterDlp: string;
  form: number;
  dskpStandard: string;
  summaryPointsBm: string[];
  summaryPointsDlp: string[];
  spmTipsBm: string[];
  spmTipsDlp: string[];
}

export const allLessonCheatNotes: Record<string, LessonCheatNote> = {
  "jylD8xsEUkE": {
    "lessonId": "jylD8xsEUkE",
    "titleBm": "1.1 Kuantiti Fizik",
    "titleDlp": "1.1 Physical Quantities",
    "chapterBm": "Pengukuran",
    "chapterDlp": "Measurement",
    "form": 4,
    "dskpStandard": "SK 1.1 Kuantiti Fizik",
    "summaryPointsBm": [
      "Kuantiti fizik ialah kuantiti yang boleh diukur. Terbahagi kepada 7 Kuantiti Asas: Panjang (m), Jisim (kg), Masa (s), Suhu termodinamik (K), Arus elektrik (A), Keamatan berluminositi (cd), dan Kuantiti bahan (mol).",
      "Kuantiti Terbitan ialah kuantiti fizik yang diterbitkan daripada gabungan kuantiti asas melalui pendaraban, pembahagian atau kedua-duanya (cth: Ketumpatan = kg m⁻³, Daya = kg m s⁻² atau N).",
      "Kuantiti Skalar hanya mempunyai magnitud sahaja (cth: laju, jarak, jisim, masa, suhu, kerja, tenaga).",
      "Kuantiti Vektor mempunyai magnitud dan arah (cth: sesaran, halaju, pecutan, daya, momentum, berat)."
    ],
    "summaryPointsDlp": [
      "Physical quantities are measurable quantities. Divided into 7 Base Quantities: Length (m), Mass (kg), Time (s), Thermodynamic temperature (K), Electric current (A), Luminous intensity (cd), and Amount of substance (mol).",
      "Derived Quantities are derived from base quantities via multiplication, division, or both (e.g., Density = kg m⁻³, Force = kg m s⁻² or N).",
      "Scalar Quantities have magnitude only (e.g., speed, distance, mass, time, temperature, work, energy).",
      "Vector Quantities have both magnitude and direction (e.g., displacement, velocity, acceleration, force, momentum, weight)."
    ],
    "spmTipsBm": [
      "Wajib hafal 7 kuantiti asas beserta simbol dan unit S.I. piawai.",
      "Soalan Kertas 1 SPM kerap menguji penukaran unit berimbuhan (Giga, Mega, Kilo, Desi, Senti, Mili, Mikro, Nano)."
    ],
    "spmTipsDlp": [
      "Memorize all 7 base quantities along with standard S.I. units and symbols.",
      "SPM Paper 1 frequently examines prefix conversions (Giga, Mega, Kilo, Deci, Centi, Milli, Micro, Nano)."
    ]
  },
  "HifOFbw3gDk": {
    "lessonId": "HifOFbw3gDk",
    "titleBm": "1.1 Kuantiti Fizik",
    "titleDlp": "1.1 Physical Quantities",
    "chapterBm": "Pengukuran",
    "chapterDlp": "Measurement",
    "form": 4,
    "dskpStandard": "SK 1.1 Kuantiti Fizik",
    "summaryPointsBm": [
      "Kuantiti fizik ialah kuantiti yang boleh diukur. Terbahagi kepada 7 Kuantiti Asas: Panjang (m), Jisim (kg), Masa (s), Suhu termodinamik (K), Arus elektrik (A), Keamatan berluminositi (cd), dan Kuantiti bahan (mol).",
      "Kuantiti Terbitan ialah kuantiti fizik yang diterbitkan daripada gabungan kuantiti asas melalui pendaraban, pembahagian atau kedua-duanya (cth: Ketumpatan = kg m⁻³, Daya = kg m s⁻² atau N).",
      "Kuantiti Skalar hanya mempunyai magnitud sahaja (cth: laju, jarak, jisim, masa, suhu, kerja, tenaga).",
      "Kuantiti Vektor mempunyai magnitud dan arah (cth: sesaran, halaju, pecutan, daya, momentum, berat)."
    ],
    "summaryPointsDlp": [
      "Physical quantities are measurable quantities. Divided into 7 Base Quantities: Length (m), Mass (kg), Time (s), Thermodynamic temperature (K), Electric current (A), Luminous intensity (cd), and Amount of substance (mol).",
      "Derived Quantities are derived from base quantities via multiplication, division, or both (e.g., Density = kg m⁻³, Force = kg m s⁻² or N).",
      "Scalar Quantities have magnitude only (e.g., speed, distance, mass, time, temperature, work, energy).",
      "Vector Quantities have both magnitude and direction (e.g., displacement, velocity, acceleration, force, momentum, weight)."
    ],
    "spmTipsBm": [
      "Wajib hafal 7 kuantiti asas beserta simbol dan unit S.I. piawai.",
      "Soalan Kertas 1 SPM kerap menguji penukaran unit berimbuhan (Giga, Mega, Kilo, Desi, Senti, Mili, Mikro, Nano)."
    ],
    "spmTipsDlp": [
      "Memorize all 7 base quantities along with standard S.I. units and symbols.",
      "SPM Paper 1 frequently examines prefix conversions (Giga, Mega, Kilo, Deci, Centi, Milli, Micro, Nano)."
    ]
  },
  "MrRD2TOnp54": {
    "lessonId": "MrRD2TOnp54",
    "titleBm": "1.2a Penyiasatan Saintifik",
    "titleDlp": "1.2a Scientific Investigation",
    "chapterBm": "Pengukuran",
    "chapterDlp": "Measurement",
    "form": 4,
    "dskpStandard": "SK 1.2 Penyiasatan Saintifik",
    "summaryPointsBm": [
      "Kejituan: Darjah kehampiran nilai ukuran dengan nilai sebenar.",
      "Kepersisan: Kebolehan alat memberikan bacaan yang konsisten/serupa apabila pengukuran diulang.",
      "Kepekaan: Keupayaan alat mengesan perubahan nilai yang sangat kecil dalam kuantiti yang diukur.",
      "Ralat Rawak: Ketidakpastian akibat pemerhati (ralat paralaks) atau persekitaran — dikurangkan dengan mengira nilai purata bacaan berulang.",
      "Ralat Sistematik: Ralat tetap akibat ketidaksempurnaan alat (ralat sifar) — dibetulkan melalui penentukuran alat."
    ],
    "summaryPointsDlp": [
      "Accuracy: Closeness of measured value to the actual/true value.",
      "Precision: Consistency of readings obtained under repeated measurements under same conditions.",
      "Sensitivity: Ability to detect minute changes in the measured physical quantity.",
      "Random Error: Fluctuations from observer (parallax error) or ambient factors — minimized by taking average of multiple readings.",
      "Systematic Error: Constant offset from instrument flaw (zero error) — corrected via recalibration."
    ],
    "spmTipsBm": [
      "Ralat paralaks berlaku jika garis penglihatan pemerhati tidak berserenjang (90°) dengan skala alat pengukur.",
      "Ralat sifar positif: Bacaan sebenar = Bacaan tercatat – Ralat sifar. Ralat sifar negatif: Bacaan sebenar = Bacaan tercatat + Ralat sifar."
    ],
    "spmTipsDlp": [
      "Parallax error is prevented by aligning the line of sight strictly perpendicular (90°) to the measurement scale.",
      "Positive zero error: Actual = Reading – Zero error. Negative zero error: Actual = Reading + Zero error."
    ]
  },
  "90mxEb59yZI": {
    "lessonId": "90mxEb59yZI",
    "titleBm": "1.2b Penyiasatan Saintifik",
    "titleDlp": "1.2b Scientific Investigation Part 2",
    "chapterBm": "Pengukuran",
    "chapterDlp": "Measurement",
    "form": 4,
    "dskpStandard": "SK 1.2 Analisis Graf & Kaedah Saintifik",
    "summaryPointsBm": [
      "Bentuk hubungan graf garis lurus: y berkadar terus dengan x (garis lurus melalui asalan (0,0)), y bertambah secara linear (garis lurus dengan pintasan-y positif c > 0).",
      "Kecerunan graf garis lurus m = (y₂ - y₁) / (x₂ - x₁) mewakili kuantiti fizik tertentu bersama unit yang sepadan.",
      "Luas di bawah graf mewakili hasil darab kuantiti paksi-y dan paksi-x (cth: luas graf v-t mewakili sesaran s)."
    ],
    "summaryPointsDlp": [
      "Linear graph relationships: y directly proportional to x (line passes through origin (0,0)), y increases linearly with x (line with positive y-intercept c > 0).",
      "Gradient m = (y₂ - y₁) / (x₂ - x₁) represents specific physical constants or quantities with corresponding derived units.",
      "Area under graph represents the product of y-axis and x-axis physical quantities (e.g., area under v-t graph = displacement s)."
    ],
    "spmTipsBm": [
      "SPM Amali & Kertas 2: Segi tiga kecerunan MESTI bersaiz sekurang-kurangnya 50% daripada saiz graf untuk markah penuh.",
      "Pastikan skala graf seragam, titik diplot dengan tanda pangkah halus (×) dan dilukis garis lurus penyuaian terbaik (best fit line)."
    ],
    "spmTipsDlp": [
      "SPM Practical & Paper 2: Gradient triangle MUST be at least 50% of the plotted graph area.",
      "Ensure uniform scales, plot points clearly with small crosses (×), and draw the line of best fit."
    ]
  },
  "2OeHdtXaeyM": {
    "lessonId": "2OeHdtXaeyM",
    "titleBm": "2.2 Graf Gerakan Linear",
    "titleDlp": "2.2 Linear Motion Graphs",
    "chapterBm": "Daya dan Gerakan I",
    "chapterDlp": "Force and Motion I",
    "form": 4,
    "dskpStandard": "SK 2.1 & 2.2 Gerakan Linear & Graf Gerakan",
    "summaryPointsBm": [
      "Graf Sesaran-Masa (s-t): Kecerunan graf = Halaju (v). Garis mendatar bermaksud objek pegun. Garis condong lurus bermaksud halaju seragam.",
      "Graf Halaju-Masa (v-t): Kecerunan graf = Pecutan (a). Luas di bawah graf = Sesaran (s). Garis mendatar bermaksud halaju seragam (pecutan sifar).",
      "Pita Detik: 1 detik = sela masa antara 2 titik berturutan = 0.02 s (pada frekuensi jangka masa detik 50 Hz). Jarak titik rapat = laju rendah; jarak titik renggang = laju tinggi.",
      "Masa perubahan halaju bagi carta pita: t = (n - 1) × 0.02 s (di mana n ialah bilangan detik bagi setiap keratan pita)."
    ],
    "summaryPointsDlp": [
      "Displacement-Time Graph (s-t): Gradient = Velocity (v). Horizontal line = object at rest. Straight slanted line = uniform velocity.",
      "Velocity-Time Graph (v-t): Gradient = Acceleration (a). Area under graph = Displacement (s). Horizontal line = uniform velocity (zero acceleration).",
      "Ticker Tape: 1 tick = time interval between 2 consecutive dots = 0.02 s (at 50 Hz ticker timer frequency). Closely spaced dots = low speed; widely spaced dots = high speed.",
      "Time interval for tape strips: t = (n - 1) × 0.02 s (where n is number of ticks per tape strip)."
    ],
    "spmTipsBm": [
      "SPM 2021 K2BS9: Berhati-hati mengira bilangan detik pada carta pita detik: n = bilangan titik – 1.",
      "Nyahpecutan (pecutan negatif) berlaku apabila kecerunan graf v-t adalah negatif (kelajuan objek semakin berkurang)."
    ],
    "spmTipsDlp": [
      "SPM 2021 K2BS9: Be careful counting ticks on ticker charts: n = number of dots – 1.",
      "Deceleration (negative acceleration) occurs when v-t gradient is negative (speed is decreasing)."
    ]
  },
  "l1aYWXec21Q": {
    "lessonId": "l1aYWXec21Q",
    "titleBm": "2.3 Gerakan Jatuh Bebas",
    "titleDlp": "2.3 Free Fall Motion",
    "chapterBm": "Daya dan Gerakan I",
    "chapterDlp": "Force and Motion I",
    "form": 4,
    "dskpStandard": "SK 2.3 Gerakan Jatuh Bebas",
    "summaryPointsBm": [
      "Jatuh bebas berlaku apabila suatu objek jatuh di bawah pengaruh daya tarikan graviti sahaja tanpa sebarang rintangan udara.",
      "Dalam vakum, semua objek jatuh dengan pecutan graviti yang sama (g = 9.81 m s⁻²) tanpa dipengaruhi oleh jisim, saiz, atau bentuk objek.",
      "4 Persamaan Gerakan Linear ('VUSAT'): v = u + at, s = ½(u + v)t, s = ut + ½at², v² = u² + 2as.",
      "Bagi gerakan jatuh ke bawah: a = +g (+9.81 m s⁻²). Bagi lontaran menegak ke atas: a = -g (-9.81 m s⁻²)."
    ],
    "summaryPointsDlp": [
      "Free fall occurs when an object falls exclusively under gravitational force without air resistance.",
      "In vacuum, all objects fall with identical gravitational acceleration (g = 9.81 m s⁻²) regardless of mass, size, or shape.",
      "4 Linear Motion Equations ('VUSAT'): v = u + at, s = ½(u + v)t, s = ut + ½at², v² = u² + 2as.",
      "For downward motion: a = +g (+9.81 m s⁻²). For vertical upward projection: a = -g (-9.81 m s⁻²)."
    ],
    "spmTipsBm": [
      "SPM 2021 K2BS9(c): Pada titik tertinggi lontaran menegak, halaju akhir objek v = 0 m s⁻¹.",
      "Masa untuk naik ke puncak adalah sama dengan masa untuk turun semula ke aras pelepasan asal."
    ],
    "spmTipsDlp": [
      "SPM 2021 K2BS9(c): At peak height of vertical trajectory, final velocity v = 0 m s⁻¹.",
      "Ascent time to peak height equals descent time back to original launch position."
    ]
  },
  "uQwyU34HH28": {
    "lessonId": "uQwyU34HH28",
    "titleBm": "2.4 Inersia",
    "titleDlp": "2.4 Inertia",
    "chapterBm": "Daya dan Gerakan I",
    "chapterDlp": "Force and Motion I",
    "form": 4,
    "dskpStandard": "SK 2.4 Inersia & Hukum Newton Pertama",
    "summaryPointsBm": [
      "Hukum Gerakan Newton Pertama: Suatu objek akan kekal dalam keadaan pegun atau bergerak dengan halaju seragam dalam garis lurus jika tiada daya bersih bertindak ke atasnya.",
      "Inersia ialah kecenderungan semula jadi suatu objek untuk menentang sebarang perubahan terhadap keadaan asal gerakannya.",
      "Jisim ialah ukuran inersia: semakin besar jisim suatu objek, semakin besar inersianya dan semakin sukar untuk digerakkan atau dihentikan."
    ],
    "summaryPointsDlp": [
      "Newton's First Law of Motion: An object continues in state of rest or uniform velocity in straight line unless acted upon by net external force.",
      "Inertia is the natural tendency of an object to resist changes in its state of rest or motion.",
      "Mass is the measure of inertia: larger mass corresponds to greater inertia and higher resistance to velocity changes."
    ],
    "spmTipsBm": [
      "Inersia bukan sejenis daya dan tidak mempunyai unit S.I.",
      "Aplikasi keselamatan kenderaan: Tali pinggang keledar dan beg udara mengatasi inersia penumpang ke hadapan semasa membrek mendadak."
    ],
    "spmTipsDlp": [
      "Inertia is a physical property, not a force, and possesses no S.I. unit.",
      "Automotive safety: Seatbelts and airbags counteract passenger forward inertia during rapid deceleration."
    ]
  },
  "gqbZ3grngvg": {
    "lessonId": "gqbZ3grngvg",
    "titleBm": "2.5 Momentum",
    "titleDlp": "2.5 Momentum",
    "chapterBm": "Daya dan Gerakan I",
    "chapterDlp": "Force and Motion I",
    "form": 4,
    "dskpStandard": "SK 2.5 Momentum & Keabadian Momentum",
    "summaryPointsBm": [
      "Momentum (p = mv) ialah hasil darab jisim dan halaju (vektor, unit S.I.: kg m s⁻¹ atau N s).",
      "Prinsip Keabadian Momentum: Jumlah momentum sebelum perlanggaran/letupan adalah sama dengan jumlah momentum selepas jika tiada daya luar bertindak.",
      "Perlanggaran Kenyal: Objek melantun berasingan, jumlah momentum dan tenaga kinetik diabadikan (m₁u₁ + m₂u₂ = m₁v₁ + m₂v₂).",
      "Perlanggaran Tak Kenyal: Objek melekat bersama selepas perlanggaran (m₁u₁ + m₂u₂ = (m₁ + m₂)v), tenaga kinetik tidak diabadikan.",
      "Letupan: Jumlah momentum awal sifar (0 = m₁v₁ + m₂v₂ ⇒ m₁v₁ = -m₂v₂)."
    ],
    "summaryPointsDlp": [
      "Momentum (p = mv) is the product of mass and velocity (vector, S.I. unit: kg m s⁻¹ or N s).",
      "Principle of Conservation of Momentum: Total momentum before collision/explosion equals total momentum after in absence of external net force.",
      "Elastic Collision: Objects separate after impact; both total momentum and kinetic energy are conserved (m₁u₁ + m₂u₂ = m₁v₁ + m₂v₂).",
      "Inelastic Collision: Objects stick together after collision (m₁u₁ + m₂u₂ = (m₁ + m₂)v); kinetic energy is partially converted into heat/sound.",
      "Explosion: Total initial momentum is zero (0 = m₁v₁ + m₂v₂ ⇒ m₁v₁ = -m₂v₂)."
    ],
    "spmTipsBm": [
      "Momentum adalah kuantiti vektor. Arah ke kiri atau bertentangan MESTI diberi tanda negatif (-).",
      "Aplikasi letupan: Enjin roket menolak gas panas berkelajuan tinggi ke belakang untuk menghasilkan momentum roket memecut ke hadapan."
    ],
    "spmTipsDlp": [
      "Momentum is a vector quantity. Velocities directed backwards / to the left MUST be assigned negative (-) sign.",
      "Explosion application: Rocket engines expel high-speed exhaust gases backwards to generate forward momentum."
    ]
  },
  "QZtocJnhel4": {
    "lessonId": "QZtocJnhel4",
    "titleBm": "2.6 Daya",
    "titleDlp": "2.6 Force",
    "chapterBm": "Daya dan Gerakan I",
    "chapterDlp": "Force and Motion I",
    "form": 4,
    "dskpStandard": "SK 2.6 Daya & Hukum Newton Kedua",
    "summaryPointsBm": [
      "Hukum Gerakan Newton Kedua: Kadar perubahan momentum berkadar terus dengan daya paduan dan bertindak pada arah tindakan daya: F = ma.",
      "1 Newton (N) ditakrifkan sebagai daya yang menghasilkan pecutan 1 m s⁻² apabila bertindak ke atas jisim 1 kg.",
      "Jika daya seimbang (F_net = 0), objek pegun atau bergerak dengan halaju malar (pecutan a = 0).",
      "Jika daya tidak seimbang (F_net > 0), objek mengalami pecutan a = F_net / m mengikut arah tindakan daya paduan."
    ],
    "summaryPointsDlp": [
      "Newton's Second Law of Motion: Rate of change of momentum is directly proportional to resultant force and acts in direction of net force: F = ma.",
      "1 Newton (N) is defined as force producing acceleration of 1 m s⁻² on 1 kg mass.",
      "Balanced forces (F_net = 0): Object is stationary or moving at constant velocity (acceleration a = 0).",
      "Unbalanced forces (F_net > 0): Object accelerates at a = F_net / m in direction of net force."
    ],
    "spmTipsBm": [
      "SPM 2021 K2BS9(a): Jangan lupa tolak daya geseran! Daya Paduan F_net = Daya Tarikan/Tujah – Daya Geseran = ma.",
      "Bagi daya tarikan condong pada sudut θ: Komponen daya mengufuk ialah F cos θ."
    ],
    "spmTipsDlp": [
      "SPM 2021 K2BS9(a): Subtract frictional resistance! Net Force F_net = Applied Pull/Thrust – Friction = ma.",
      "For forces applied at angle θ: Horizontal pulling component is F cos θ."
    ]
  },
  "m90zg3HyU_8": {
    "lessonId": "m90zg3HyU_8",
    "titleBm": "2.7 Daya Impuls & 2.8 Berat",
    "titleDlp": "2.7 Impulsive Force & 2.8 Weight",
    "chapterBm": "Daya dan Gerakan I",
    "chapterDlp": "Force and Motion I",
    "form": 4,
    "dskpStandard": "SK 2.7 & 2.8 Impuls, Daya Impuls & Berat",
    "summaryPointsBm": [
      "Impuls (J = Ft = mv - mu) ialah perubahan momentum (vektor, unit S.I.: N s atau kg m s⁻¹).",
      "Daya Impuls (F = (mv - mu) / t) ialah kadar perubahan momentum semasa perlanggaran dalam sela masa impak yang pendek.",
      "Hubungan: Masa impak (t) bertambah ⇒ Daya impuls (F) berkurang (hubungan berkadar songsang).",
      "Berat (W = mg) ialah daya tarikan graviti ke atas objek (vektor, unit N). Jisim (m) ialah kuantiti jirim (skalar, unit kg).",
      "Hukum Gerakan Newton Ketiga: Untuk setiap daya tindakan, terdapat daya tindak balas yang sama magnitud tetapi bertentangan arah."
    ],
    "summaryPointsDlp": [
      "Impulse (J = Ft = mv - mu) is change in momentum (vector, S.I. unit: N s or kg m s⁻¹).",
      "Impulsive Force (F = (mv - mu) / t) is rate of change of momentum during collision over brief impact time.",
      "Relationship: Longer impact time (t) ⇒ Lower impulsive force (F) (inversely proportional).",
      "Weight (W = mg) is gravitational force acting on mass (vector, unit N). Mass (m) is quantity of matter (scalar, unit kg).",
      "Newton's Third Law of Motion: Every action force has an equal and opposite reaction force."
    ],
    "spmTipsBm": [
      "Ciri keselamatan kenderaan (zon remuk, beg udara, bumper mudah kemek) memanjangkan masa impak (t ↑) untuk mengurangkan daya impuls (F ↓) ke atas pemandu.",
      "Dalam sukan (lompat tinggi, tilam pendaratan), tilam tebal memanjangkan masa hentaman bagi mengurangkan daya impuls dan mengelakkan kecederaan tulang."
    ],
    "spmTipsDlp": [
      "Vehicle safety (crumple zones, airbags, soft bumpers) extends collision duration (t ↑) to reduce impulsive force (F ↓) on passengers.",
      "Sports safety: High jump crash mats extend deceleration time to reduce impact force and prevent bone injury."
    ]
  },
  "hsjQe4dnpl0": {
    "lessonId": "hsjQe4dnpl0",
    "titleBm": "3.1a Hukum Kegravitian Semesta Newton",
    "titleDlp": "3.1a Newton's Universal Law of Gravitation",
    "chapterBm": "Kegravitian",
    "chapterDlp": "Gravitation",
    "form": 4,
    "dskpStandard": "SK 3.1 Hukum Kegravitian Semesta Newton",
    "summaryPointsBm": [
      "Hukum Kegravitian Semesta Newton: Daya tarikan graviti antara dua jasad berkadar terus dengan hasil darab jisim kedua-duanya dan berkadar songsang dengan kuasa dua jarak antara pusat jasad: F = G m₁ m₂ / r².",
      "Pemalar Kegravitian Semesta: G = 6.67 × 10⁻¹¹ N m² kg⁻².",
      "Pecutan graviti pada permukaan planet: g = GM / R².",
      "Pecutan graviti pada ketinggian h dari permukaan: g = GM / (R + h)² (di mana r = R + h ialah jarak dari pusat planet)."
    ],
    "summaryPointsDlp": [
      "Newton's Universal Law of Gravitation: Gravitational attraction between two masses is directly proportional to product of masses and inversely proportional to square of distance between centres: F = G m₁ m₂ / r².",
      "Universal Gravitational Constant: G = 6.67 × 10⁻¹¹ N m² kg⁻².",
      "Gravitational acceleration at planet surface: g = GM / R².",
      "Gravitational acceleration at altitude h above surface: g = GM / (R + h)² (where r = R + h is radius from center)."
    ],
    "spmTipsBm": [
      "SPM 2021 K2AS3: Jarak r MESTI diukur dari PUSAT Bumi ke PUSAT objek, iaitu r = R + h.",
      "Nilai pecutan graviti g berkurang secara eksponen apabila ketinggian h dari permukaan bertambah."
    ],
    "spmTipsDlp": [
      "SPM 2021 K2AS3: Distance r MUST be measured from Earth's CENTRE: r = R + h.",
      "Gravitational acceleration g decreases exponentially as orbital altitude h increases."
    ]
  },
  "x-wilmj9cxE": {
    "lessonId": "x-wilmj9cxE",
    "titleBm": "3.1b Hukum Kegravitian Semesta Newton",
    "titleDlp": "3.1b Newton's Universal Law of Gravitation Part 2",
    "chapterBm": "Kegravitian",
    "chapterDlp": "Gravitation",
    "form": 4,
    "dskpStandard": "SK 3.1 Variasi Medan Graviti Bumi",
    "summaryPointsBm": [
      "Kekuatan medan graviti g ialah daya graviti per unit jisim yang bertindak ke atas suatu jasad: g = F / m.",
      "Nilai piawai pecutan graviti di permukaan Bumi diambil sebagai g = 9.81 m s⁻² (atau N kg⁻¹).",
      "Jisim Bumi M = 5.97 × 10²⁴ kg, Jejari Bumi R = 6.37 × 10⁶ m."
    ],
    "summaryPointsDlp": [
      "Gravitational field strength g is gravitational force per unit mass acting on a body: g = F / m.",
      "Standard gravitational acceleration at Earth's surface is g = 9.81 m s⁻² (or N kg⁻¹).",
      "Earth Mass M = 5.97 × 10²⁴ kg, Earth Radius R = 6.37 × 10⁶ m."
    ],
    "spmTipsBm": [
      "Unit pecutan graviti (m s⁻²) adalah setara dengan unit kekuatan medan graviti (N kg⁻¹).",
      "Jisim objek m adalah malar di mana-mana ruang angkasa, tetapi berat objek W berubah mengikut nilai kekuatan medan graviti g."
    ],
    "spmTipsDlp": [
      "Gravitational acceleration unit (m s⁻²) is equivalent to gravitational field strength (N kg⁻¹).",
      "Mass m is invariant throughout space, but weight W varies based on gravitational field strength g."
    ]
  },
  "i4WgQ_Azegc": {
    "lessonId": "i4WgQ_Azegc",
    "titleBm": "3.1c Daya Memusat & Gerakan Membulat",
    "titleDlp": "3.1c Centripetal Force & Circular Motion",
    "chapterBm": "Kegravitian",
    "chapterDlp": "Gravitation",
    "form": 4,
    "dskpStandard": "SK 3.1 Daya Memusat & Gerakan Membulat",
    "summaryPointsBm": [
      "Gerakan Membulat Seragam: Objek bergerak dalam bulatan dengan laju linear malar tetapi arah halaju sentiasa berubah, menghasilkan pecutan memusat a = v² / r.",
      "Daya Memusat (F = m v² / r) ialah daya yang sentiasa bertindak berserenjang dengan arah halaju menghala ke pusat bulatan.",
      "Bagi satelit mengorbit Bumi: Daya tarikan graviti bertindak sebagai daya memusat: G M m / r² = m v² / r ⇒ Laju linear orbit v = √(GM / r)."
    ],
    "summaryPointsDlp": [
      "Uniform Circular Motion: An object moving in circular path at constant linear speed undergoes continuous direction change, producing centripetal acceleration a = v² / r.",
      "Centripetal Force (F = m v² / r) acts perpendicularly to velocity directed towards circular centre.",
      "For orbital satellites: Gravitational attraction provides centripetal force: G M m / r² = m v² / r ⇒ Orbital linear speed v = √(GM / r)."
    ],
    "spmTipsBm": [
      "Laju linear satelit v hanya bergantung kepada jisim planet M dan jejari orbit r, BUKAN jisim satelit m.",
      "Jika daya memusat terputus secara tiba-tiba (cth: tali putus), objek akan bergerak lurus mengikut garis tangen bulatan."
    ],
    "spmTipsDlp": [
      "Satellite linear speed v depends strictly on central planet mass M and orbital radius r, NOT satellite mass m.",
      "If centripetal force ceases abruptly, the object flies off tangentially in straight line."
    ]
  },
  "snbt6GpD0C4": {
    "lessonId": "snbt6GpD0C4",
    "titleBm": "3.2 Hukum Kepler",
    "titleDlp": "3.2 Kepler's Laws",
    "chapterBm": "Kegravitian",
    "chapterDlp": "Gravitation",
    "form": 4,
    "dskpStandard": "SK 3.2 Hukum Kepler",
    "summaryPointsBm": [
      "Hukum Kepler Pertama (Hukum Orbit): Semua planet bergerak dalam orbit elips dengan Matahari berada di salah satu daripada dua fokusnya.",
      "Hukum Kepler Kedua (Hukum Luas): Garis yang menyambungkan planet ke Matahari menyapu luas yang sama dalam sela masa yang sama (planet bergerak lebih laju di perihelion/dekat Matahari dan lebih perlahan di afelion/jauh dari Matahari).",
      "Hukum Kepler Ketiga (Hukum Tempoh): Kuasa dua tempoh orbit planet berkadar terus dengan kuasa tiga jejari orbitnya: T² ∝ r³ ⇒ T₁² / T₂² = r₁³ / r₂³."
    ],
    "summaryPointsDlp": [
      "Kepler's First Law (Law of Orbits): All planets orbit the Sun in elliptical paths with the Sun at one focal point.",
      "Kepler's Second Law (Law of Areas): A line segment joining planet and Sun sweeps equal areas during equal time intervals (faster at perihelion, slower at aphelion).",
      "Kepler's Third Law (Law of Periods): Square of orbital period is directly proportional to cube of orbital semi-major axis: T² ∝ r³ ⇒ T₁² / T₂² = r₁³ / r₂³."
    ],
    "spmTipsBm": [
      "Rumus Kepler 3 (T₁² / T₂² = r₁³ / r₂³) membolehkan pengiraan nisbah tanpa perlu menukar unit jika unit kedua-dua pembolehubah adalah sama (cth: T dalam tahun, r dalam AU).",
      "Kecerunan graf T² melawan r³ ialah k = 4π² / (GM)."
    ],
    "spmTipsDlp": [
      "Kepler's 3rd Law ratio (T₁² / T₂² = r₁³ / r₂³) allows direct proportionality calculation if matching units are maintained.",
      "The gradient of T² against r³ graph is k = 4π² / (GM)."
    ]
  },
  "09jX9qGHwSQ": {
    "lessonId": "09jX9qGHwSQ",
    "titleBm": "3.3a Satelit Buatan Manusia",
    "titleDlp": "3.3a Man-made Satellites",
    "chapterBm": "Kegravitian",
    "chapterDlp": "Gravitation",
    "form": 4,
    "dskpStandard": "SK 3.3 Satelit Buatan Manusia",
    "summaryPointsBm": [
      "Satelit Geopegun: Mengorbit pada satah khatulistiwa, arah gerakan sama dengan putaran Bumi (Barat ke Timur), tempoh orbit T = 24 jam (T = tempoh putaran Bumi), kekal di atas kedudukan geografi yang sama di Bumi (cth: MEASAT untuk telekomunikasi dan siaran TV).",
      "Satelit Bukan Geopegun: Tempoh orbit boleh lebih pendek atau lebih panjang daripada 24 jam, satah orbit condong atau melintasi kutub (cth: TiungSAT, ISS, GPS untuk penderiaan jauh, navigasi, dan kaji cuaca).",
      "Tempoh orbit satelit: T = √((4π² r³) / (GM))."
    ],
    "summaryPointsDlp": [
      "Geostationary Satellite: Equatorial orbit, rotates in synchronization with Earth (West to East), orbital period T = 24 hours, stationary relative to surface coordinate (e.g., MEASAT for telecommunication/broadcasting).",
      "Non-Geostationary Satellite: Variable orbital period (< or > 24 hours), polar or inclined orbits (e.g., TiungSAT, ISS, GPS for weather forecasting, remote sensing, reconnaissance).",
      "Satellite orbital period formula: T = √((4π² r³) / (GM))."
    ],
    "spmTipsBm": [
      "Perbandingan ciri Satelit Geopegun vs Bukan Geopegun adalah soalan esei struktur popular Bahagian B/C SPM.",
      "Semakin tinggi orbit satelit (r ↑), semakin rendah laju linear satelit (v ↓) dan semakin panjang tempoh orbit (T ↑)."
    ],
    "spmTipsDlp": [
      "Geostationary vs Non-geostationary comparison is a classic SPM Section B/C structural essay prompt.",
      "Higher orbital altitude (r ↑) results in lower orbital velocity (v ↓) and longer orbital period (T ↑)."
    ]
  },
  "sn7_SSzSURM": {
    "lessonId": "sn7_SSzSURM",
    "titleBm": "3.3b Satelit Buatan Manusia",
    "titleDlp": "3.3b Man-made Satellites Part 2",
    "chapterBm": "Kegravitian",
    "chapterDlp": "Gravitation",
    "form": 4,
    "dskpStandard": "SK 3.3 Halaju Lepas & Tenaga Keupayaan Graviti",
    "summaryPointsBm": [
      "Halaju Lepas (v = √(2GM / R)) ialah kelajuan minimum yang diperlukan oleh suatu objek di permukaan planet untuk mengatasi tarikan graviti dan terlepas ke angkasa lepas.",
      "Tenaga Keupayaan Graviti: U = - (G M m) / r (tenaga keupayaan pada infiniti adalah sifar, nilai U sentiasa negatif).",
      "Halaju lepas dari permukaan Bumi ialah kira-kira 11.2 km s⁻¹ (11,200 m s⁻¹).",
      "Bumi dapat mengekalkan lapisan atmosfera kerana laju molekul udara (O₂, N₂) jauh lebih rendah daripada halaju lepas Bumi."
    ],
    "summaryPointsDlp": [
      "Escape Velocity (v = √(2GM / R)) is the minimum initial speed required for an object on a planetary surface to overcome gravitational pull and escape to infinity.",
      "Gravitational Potential Energy: U = - (G M m) / r (zero at infinity, strictly negative within gravitational field).",
      "Earth's escape velocity is approximately 11.2 km s⁻¹ (11,200 m s⁻¹).",
      "Atmosphere retention: Atmospheric gas molecules have mean thermal speeds substantially lower than Earth's escape velocity."
    ],
    "spmTipsBm": [
      "Halaju lepas tidak bergantung kepada jisim objek yang dilancarkan m, hanya bergantung kepada jisim planet M dan jejari planet R.",
      "Bulan tidak mempunyai atmosfera kerana jisim Bulan yang kecil menghasilkan halaju lepas yang sangat rendah (~2.4 km s⁻¹), menyebabkan gas mudah terbebas."
    ],
    "spmTipsDlp": [
      "Escape velocity is independent of projectile mass m; governed solely by planetary mass M and radius R.",
      "The Moon lacks atmosphere because its small mass yields a low escape velocity (~2.4 km s⁻¹), causing gases to escape."
    ]
  },
  "XzSTapojxMU": {
    "lessonId": "XzSTapojxMU",
    "titleBm": "4.1 Keseimbangan Terma",
    "titleDlp": "4.1 Thermal Equilibrium",
    "chapterBm": "Haba",
    "chapterDlp": "Heat",
    "form": 4,
    "dskpStandard": "SK 4.1 Keseimbangan Terma",
    "summaryPointsBm": [
      "Suhu ialah darjah kepanasan suatu objek. Haba ialah pemindahan tenaga terma dari kawasan bersuhu tinggi ke kawasan bersuhu rendah.",
      "Keseimbangan Terma tercapai apabila: (1) Kadar pemindahan haba bersih antara dua objek bersentuhan adalah sifar, dan (2) Kedua-dua objek mencapai suhu akhir yang sama.",
      "Sifat Termometrik: Sifat fizikal bahan yang berubah secara seragam dengan perubahan suhu (cth: panjang turus merkuri).",
      "Penentukuran Termometer: θ = (L_θ - L₀) / (L₁₀₀ - L₀) × 100 °C."
    ],
    "summaryPointsDlp": [
      "Temperature is degree of hotness of an object. Heat is thermal energy transfer from high temperature to low temperature regions.",
      "Thermal Equilibrium occurs when: (1) Net rate of heat transfer between two touching objects is zero, and (2) Both objects reach the same final temperature.",
      "Thermometric Property: A physical property that changes uniformly with temperature (e.g., length of mercury column).",
      "Thermometer Calibration: θ = (L_θ - L₀) / (L₁₀₀ - L₀) × 100 °C."
    ],
    "spmTipsBm": [
      "SPM 2021 K2AS1: Ciri cecair termometer yang baik: takat didih tinggi, takat beku rendah, mengembang seragam, tidak melekat pada dinding kaca, legap.",
      "Semasa termometer menyukat suhu cecair, termometer dan cecair mesti mencapai keseimbangan terma terlebih dahulu."
    ],
    "spmTipsDlp": [
      "SPM 2021 K2AS1: Desirable thermometric liquid properties: high boiling point, low freezing point, uniform expansion, non-sticking to glass, opaque.",
      "A thermometer must attain thermal equilibrium with liquid before accurate reading is registered."
    ]
  },
  "GK4PZO-9hos": {
    "lessonId": "GK4PZO-9hos",
    "titleBm": "4.2a Muatan Haba Tentu",
    "titleDlp": "4.2a Specific Heat Capacity",
    "chapterBm": "Haba",
    "chapterDlp": "Heat",
    "form": 4,
    "dskpStandard": "SK 4.2 Muatan Haba Tentu",
    "summaryPointsBm": [
      "Muatan Haba (C = Q / Δθ): Kuantiti haba yang diperlukan untuk menaikkan suhu suatu objek sebanyak 1 °C (unit S.I.: J °C⁻¹).",
      "Muatan Haba Tentu (c = Q / (m Δθ)): Kuantiti haba yang diperlukan untuk menaikkan suhu 1 kg bahan sebanyak 1 °C atau 1 K (unit S.I.: J kg⁻¹ °C⁻¹ atau J kg⁻¹ K⁻¹).",
      "Pemanas elektrik: Tenaga Elektrik = Haba Diserap ⇒ Pt = mcΔθ.",
      "Bahan dengan nilai c kecil (cth: logam) cepat panas dan cepat sejuk (konduktor haba baik). Bahan dengan nilai c besar (cth: air c = 4200 J kg⁻¹ °C⁻¹) lambat panas dan lambat sejuk (ejen penyejuk unggul)."
    ],
    "summaryPointsDlp": [
      "Heat Capacity (C = Q / Δθ): Heat energy required to raise object's temperature by 1 °C (S.I. unit: J °C⁻¹).",
      "Specific Heat Capacity (c = Q / (m Δθ)): Heat energy required to raise temperature of 1 kg substance by 1 °C or 1 K (S.I. unit: J kg⁻¹ °C⁻¹ or J kg⁻¹ K⁻¹).",
      "Electric Heating: Electrical Energy = Heat Absorbed ⇒ Pt = mcΔθ.",
      "Low c material (e.g., metals) heats up and cools down quickly (good heat conductor). High c material (e.g., water c = 4200 J kg⁻¹ °C⁻¹) heats up and cools down slowly (excellent coolant)."
    ],
    "spmTipsBm": [
      "Dalam pengiraan pemanas elektrik, pastikan kuasa P dalam Watt dan masa t dalam saat (s).",
      "Anggapan penting: Tiada haba hilang ke persekitaran (penebatan sempurna)."
    ],
    "spmTipsDlp": [
      "In electrical heating calculations, ensure power P is in Watts and time t is in seconds (s).",
      "Key assumption: No heat loss to surroundings (perfect thermal insulation)."
    ]
  },
  "BSKVOMr_NWU": {
    "lessonId": "BSKVOMr_NWU",
    "titleBm": "4.2b Muatan Haba Tentu",
    "titleDlp": "4.2b Specific Heat Capacity Part 2",
    "chapterBm": "Haba",
    "chapterDlp": "Heat",
    "form": 4,
    "dskpStandard": "SK 4.2 Aplikasi Muatan Haba Tentu",
    "summaryPointsBm": [
      "Bayu Laut (Siang): Daratan (c kecil) cepat panas berbanding laut (c besar air). Udara panas di atas darat naik, udara sejuk dari laut bertiup ke darat.",
      "Bayu Darat (Malam): Daratan cepat sejuk berbanding laut. Udara di atas laut lebih panas dan naik, udara sejuk dari darat bertiup ke laut.",
      "Sistem Penyejuk Radiator Kereta: Menggunakan air kerana muatan haba tentu air yang sangat tinggi membolehkannya menyerap kuantiti haba yang banyak dengan kenaikan suhu kecil.",
      "Peralatan Memasak: Dasar periuk menggunakan kuprum (c rendah – cepat panas), pemegang menggunakan kayu/bakelit (c tinggi & penebat haba)."
    ],
    "summaryPointsDlp": [
      "Sea Breeze (Day): Land (low c) heats faster than sea (high c water). Warm air rises over land; cool sea air blows inland.",
      "Land Breeze (Night): Land cools faster than sea. Warmer air over sea rises; cool air blows from land to sea.",
      "Car Radiator Cooling: Uses water due to high specific heat capacity, absorbing immense heat with minimal temperature rise.",
      "Cooking Utensils: Base uses copper (low c – rapid heating), handle uses wood/bakelite (high c & thermal insulator)."
    ],
    "spmTipsBm": [
      "Soalan Modifikasi SPM: Nyatakan ciri bahan dasar periuk (c rendah), pemegang (c tinggi/penebat), dan berikan sebab saintifik yang jelas.",
      "Air digunakan sebagai radiator kerana mudah didapati, murah, dan mempunyai nilai c yang sangat tinggi."
    ],
    "spmTipsDlp": [
      "SPM Modification Questions: Specify base material property (low c), handle property (high c/insulator), with clear scientific justifications.",
      "Water is utilized as radiator coolant because it is abundant, cheap, and possesses exceptionally high c."
    ]
  },
  "nLaJH-EH3Ko": {
    "lessonId": "nLaJH-EH3Ko",
    "titleBm": "4.3a Haba Pendam Tentu",
    "titleDlp": "4.3a Specific Latent Heat",
    "chapterBm": "Haba",
    "chapterDlp": "Heat",
    "form": 4,
    "dskpStandard": "SK 4.3 Haba Pendam Tentu",
    "summaryPointsBm": [
      "Haba Pendam ialah haba yang diserap atau dibebaskan semasa perubahan fasa jirim pada suhu malar.",
      "Haba Pendam Tentu (L = Q / m): Kuantiti haba yang diserap atau dibebaskan oleh 1 kg bahan semasa perubahan fasa tanpa perubahan suhu (unit S.I.: J kg⁻¹).",
      "Haba Pendam Tentu Pelakuran (L_f): Perubahan pepejal ↔ cecair pada takat lebur.",
      "Haba Pendam Tentu Pengewapan (L_v): Perubahan cecair ↔ gas pada takat didih.",
      "Semasa peleburan/pendidihan: Haba diserap untuk mengatasi daya tarikan antara molekul (tenaga keupayaan zarah bertambah, tenaga kinetik malar ⇒ suhu malar)."
    ],
    "summaryPointsDlp": [
      "Latent Heat is thermal energy absorbed or released during phase transition at constant temperature.",
      "Specific Latent Heat (L = Q / m): Heat absorbed/released by 1 kg substance during phase transition without temperature change (S.I. unit: J kg⁻¹).",
      "Specific Latent Heat of Fusion (L_f): Solid ↔ liquid transition at melting point.",
      "Specific Latent Heat of Vaporisation (L_v): Liquid ↔ gas transition at boiling point.",
      "During melting/boiling: Heat breaks intermolecular bonds (potential energy increases, kinetic energy remains constant ⇒ constant temperature)."
    ],
    "spmTipsBm": [
      "Graf pemanasan/penyejukan: Pada bahagian garis mendatar (perubahan fasa), suhu adalah malar kerana tenaga kinetik zarah tidak berubah.",
      "Pemanas elektrik untuk perubahan fasa: Pt = mL."
    ],
    "spmTipsDlp": [
      "Heating/cooling curve: On plateau regions (phase change), temperature remains constant because kinetic energy is unchanged.",
      "Electrical heating for phase change: Pt = mL."
    ]
  },
  "BqZIb-bVYk0": {
    "lessonId": "BqZIb-bVYk0",
    "titleBm": "4.3b Haba Pendam Tentu",
    "titleDlp": "4.3b Specific Latent Heat Applications",
    "chapterBm": "Haba",
    "chapterDlp": "Heat",
    "form": 4,
    "dskpStandard": "SK 4.3 Aplikasi Haba Pendam Tentu",
    "summaryPointsBm": [
      "Penyejukan Minuman oleh Ais: Ais menyerap haba pendam tentu pelakuran yang besar (3.34 × 10⁵ J kg⁻¹) dari minuman apabila melebur.",
      "Pengukusan Makanan: Stim membebaskan haba pendam tentu pengewapan yang sangat tinggi (2.26 × 10⁶ J kg⁻¹) apabila terkondensasi pada makanan, memasaknya lebih cepat daripada merebus.",
      "Peluh Menyejukkan Badan: Penyejatan peluh menyerap haba pendam pengewapan dari kulit badan, menurunkan suhu badan."
    ],
    "summaryPointsDlp": [
      "Drink Cooling with Ice: Ice absorbs large specific latent heat of fusion (3.34 × 10⁵ J kg⁻¹) from drink upon melting.",
      "Food Steaming: Steam releases huge latent heat of vaporisation (2.26 × 10⁶ J kg⁻¹) upon condensing on food surface, cooking faster than boiling.",
      "Sweat Cooling: Sweat evaporation extracts latent heat of vaporisation from skin, reducing body temperature."
    ],
    "spmTipsBm": [
      "Melecur terkena stim lebih parah daripada air mendidih pada 100 °C kerana stim membebaskan haba pendam tentu pengewapan tambahan semasa kondensasi.",
      "Pengiraan gabungan suhu dan fasa: Q_total = mcΔθ + mL."
    ],
    "spmTipsDlp": [
      "Steam burns at 100 °C are more severe than boiling water burns because steam releases extra latent heat of vaporisation during condensation.",
      "Combined heating and phase change calculation: Q_total = mcΔθ + mL."
    ]
  },
  "Lrq-a0624Y8": {
    "lessonId": "Lrq-a0624Y8",
    "titleBm": "4.4 Hukum-hukum Gas",
    "titleDlp": "4.4 Gas Laws",
    "chapterBm": "Haba",
    "chapterDlp": "Heat",
    "form": 4,
    "dskpStandard": "SK 4.4 Hukum-hukum Gas",
    "summaryPointsBm": [
      "Hukum Boyle: Tekanan gas P berkadar songsang dengan isi padu V pada suhu T malar: P₁V₁ = P₂V₂.",
      "Hukum Charles: Isi padu gas V berkadar terus dengan suhu mutlak T pada tekanan P malar: V₁ / T₁ = V₂ / T₂.",
      "Hukum Gay-Lussac: Tekanan gas P berkadar terus dengan suhu mutlak T pada isi padu V malar: P₁ / T₁ = P₂ / T₂.",
      "Sifar Mutlak: 0 K = -273 °C ialah suhu terendah secara teori di mana tekanan dan isi padu gas menjadi sifar dan zarah gas berhenti bergerak.",
      "Penukaran suhu Celcius ke Kelvin: T (K) = θ (°C) + 273."
    ],
    "summaryPointsDlp": [
      "Boyle's Law: Gas pressure P is inversely proportional to volume V at constant temperature T: P₁V₁ = P₂V₂.",
      "Charles's Law: Gas volume V is directly proportional to absolute temperature T at constant pressure P: V₁ / T₁ = V₂ / T₂.",
      "Gay-Lussac's Law: Gas pressure P is directly proportional to absolute temperature T at constant volume V: P₁ / T₁ = P₂ / T₂.",
      "Absolute Zero: 0 K = -273 °C is the theoretical minimum temperature where gas pressure and volume become zero and particle kinetic energy ceases.",
      "Celsius to Kelvin conversion: T (K) = θ (°C) + 273."
    ],
    "spmTipsBm": [
      "PERINGATAN SPM KRITIKAL: Suhu T MESTI sentiasa ditukar ke unit Kelvin (K) sebelum memasukkan nilai ke dalam rumus Hukum Charles atau Gay-Lussac!",
      "Kecerunan graf P melawan T atau V melawan T mengekstrapolasi pintasan paksi suhu tepat pada -273 °C."
    ],
    "spmTipsDlp": [
      "CRITICAL SPM REMINDER: Temperature T MUST ALWAYS be converted to Kelvin (K) before computing in Charles's or Gay-Lussac's equations!",
      "Extrapolated P-T or V-T graphs intersect the temperature axis precisely at -273 °C."
    ]
  },
  "FoOtEc3jlts": {
    "lessonId": "FoOtEc3jlts",
    "titleBm": "5.1 Asas Gelombang",
    "titleDlp": "5.1 Fundamentals of Waves",
    "chapterBm": "Gelombang",
    "chapterDlp": "Waves",
    "form": 4,
    "dskpStandard": "SK 5.1 Asas Gelombang",
    "summaryPointsBm": [
      "Gelombang Progresif: Profil gelombang merambat dengan masa memindahkan tenaga tanpa memindahkan jirim.",
      "Gelombang Pegun: Profil gelombang tidak merambat dengan masa (cth: tali gitar bergetar).",
      "Gelombang Melintang: Zarah medium bergetar pada arah berserenjang dengan arah perambatan gelombang (cth: gelombang air, gelombang cahaya, gelombang elektromagnet). Terdiri daripada puncak dan lembangan.",
      "Gelombang Membujur: Zarah medium bergetar pada arah selari dengan arah perambatan gelombang (cth: gelombang bunyi). Terdiri daripada siri mampatan dan renggangan.",
      "Hubungan asas gelombang: v = f λ dan f = 1 / T."
    ],
    "summaryPointsDlp": [
      "Progressive Wave: Wave profile propagates through space over time, transferring energy without transferring matter.",
      "Stationary Wave: Wave profile does not propagate through medium (e.g., vibrating guitar string).",
      "Transverse Wave: Medium particles vibrate perpendicularly to wave propagation direction (e.g., water waves, light, EM waves). Consists of crests and troughs.",
      "Longitudinal Wave: Medium particles vibrate parallel to wave propagation direction (e.g., sound waves). Consists of compressions and rarefactions.",
      "Fundamental wave equations: v = f λ and f = 1 / T."
    ],
    "spmTipsBm": [
      "Amplitud (A) menentukan tenaga gelombang (kekuatan/kenyaringan bunyi, kecerahan cahaya).",
      "Frekuensi (f) ditentukan oleh sumber getaran dan tidak berubah apabila gelombang merambat ke medium lain."
    ],
    "spmTipsDlp": [
      "Amplitude (A) determines wave energy (sound loudness, light intensity).",
      "Frequency (f) is fixed by wave source and remains unchanged across different media."
    ]
  },
  "LwJhb5ey-q8": {
    "lessonId": "LwJhb5ey-q8",
    "titleBm": "5.2 Pelembapan & Resonans",
    "titleDlp": "5.2 Damping & Resonance",
    "chapterBm": "Gelombang",
    "chapterDlp": "Waves",
    "form": 4,
    "dskpStandard": "SK 5.2 Pelembapan & Resonans",
    "summaryPointsBm": [
      "Pelembapan: Pengurangan amplitud ayunan secara beransur-ansur akibat kehilangan tenaga ke persekitaran (pelembapan luaran: geseran udara; pelembapan dalaman: regangan molekul). Frekuensi ayunan kekal malar.",
      "Resonans berlaku apabila suatu sistem ayunan dikenakan daya luar yang mempunyai frekuensi sama dengan frekuensi asli sistem tersebut.",
      "Kesan Resonans: Sistem berayun dengan amplitud maksimum dan memindahkan tenaga maksimum.",
      "Contoh fenomena resonans: Tala bunyi bergetar secara simpati, jambatan gantung berayun kuat ditiup angin, gelombang mikro memanaskan makanan pada frekuensi molekul air."
    ],
    "summaryPointsDlp": [
      "Damping: Gradual decrease in oscillation amplitude due to energy dissipation (external damping: air drag; internal damping: molecular friction). Frequency remains constant.",
      "Resonance occurs when an oscillating system is driven by an external periodic force matching its natural frequency.",
      "Resonance Effect: System oscillates with maximum amplitude and absorbs maximum energy.",
      "Resonance examples: Tuning fork sympathetic vibration, suspension bridge collapse by wind gusts, microwave ovens matching water molecule natural resonance."
    ],
    "spmTipsBm": [
      "Dalam graf sesaran-masa pelembapan: Amplitud semakin berkurang, tetapi tempoh T dan frekuensi f adalah MALAR.",
      "Bangunan tinggi dipasang penala jisim (tuned mass damper) untuk menyerap resonans akibat gempa bumi atau angin kencang."
    ],
    "spmTipsDlp": [
      "In damped displacement-time graphs: Amplitude decays over time, while period T and frequency f remain STRICTLY CONSTANT.",
      "Skyscrapers incorporate tuned mass dampers to mitigate resonance oscillations from earthquakes or gale-force winds."
    ]
  },
  "Y7yT4-9R6do": {
    "lessonId": "Y7yT4-9R6do",
    "titleBm": "5.3 Pantulan Gelombang",
    "titleDlp": "5.3 Reflection of Waves",
    "chapterBm": "Gelombang",
    "chapterDlp": "Waves",
    "form": 4,
    "dskpStandard": "SK 5.3 Pantulan Gelombang",
    "summaryPointsBm": [
      "Hukum Pantulan: Sudut tuju i = Sudut pantulan r (i = r). Sinar tuju, garis normal, dan sinar pantulan berada pada satah yang sama.",
      "Ciri gelombang terpantul: Laju (v), panjang gelombang (λ), dan frekuensi (f) adalah TIDAK BERUBAH. Arah perambatan gelombang sahaja yang berubah.",
      "Muka gelombang satah yang memantul pada satah lurus akan kekal sebagai muka gelombang satah.",
      "Pantulan Gelombang Bunyi (Gema / Sonar): Jarak d = v t / 2 (di mana t ialah sela masa pergi dan balik)."
    ],
    "summaryPointsDlp": [
      "Law of Reflection: Angle of incidence i = Angle of reflection r (i = r). Incident ray, normal, and reflected ray lie in the same plane.",
      "Reflected wave characteristics: Wave speed (v), wavelength (λ), and frequency (f) remain UNCHANGED. Only direction of propagation changes.",
      "Plane wavefronts reflecting off flat barrier remain plane wavefronts.",
      "Sound Reflection (Echo / Sonar): Distance d = v t / 2 (where t is two-way transit time)."
    ],
    "spmTipsBm": [
      "Dalam pengiraan sonar/radar kedalaman laut: Jangan lupa bahagi masa t dengan 2 kerana gelombang menempuh dua kali jarak (pergi dan balik).",
      "Muka gelombang sentiasa berserenjang (90°) dengan arah perambatan gelombang."
    ],
    "spmTipsDlp": [
      "In sonar / depth echo calculations: Divide transit time t by 2 because signals traverse round-trip distance.",
      "Wavefronts are always perpendicular (90°) to wave propagation ray direction."
    ]
  },
  "GIbs4ZhEPVY": {
    "lessonId": "GIbs4ZhEPVY",
    "titleBm": "5.4 Pembiasan Gelombang",
    "titleDlp": "5.4 Refraction of Waves",
    "chapterBm": "Gelombang",
    "chapterDlp": "Waves",
    "form": 4,
    "dskpStandard": "SK 5.4 Pembiasan Gelombang",
    "summaryPointsBm": [
      "Pembiasan gelombang berlaku kerana perubahan kelajuan gelombang apabila merambat antara dua kawasan yang berbeza kedalaman.",
      "Gelombang air dari kawasan Dalam → Cetek: Laju v berkurang (v ↓), panjang gelombang λ berkurang (λ ↓), frekuensi f MALAR, terbias MENDEKATI garis normal.",
      "Gelombang air dari kawasan Cetek → Dalam: Laju v bertambah (v ↑), panjang gelombang λ bertambah (λ ↑), terbias MENJAUHI garis normal.",
      "Hubungan pembiasan: v₁ / λ₁ = v₂ / λ₂ (kerana f = v / λ malar).",
      "Di Tanjung: Muka gelombang menumpu (amplitud tinggi ⇒ tenaga tinggi ⇒ hakisan aktif). Di Teluk: Muka gelombang mencapah (amplitud rendah ⇒ air tenang ⇒ pemendapan)."
    ],
    "summaryPointsDlp": [
      "Wave Refraction occurs due to changes in wave velocity when propagating between regions of differing depth.",
      "Deep → Shallow water transition: Speed decreases (v ↓), wavelength shortens (λ ↓), frequency f CONSTANT, refracts TOWARDS normal.",
      "Shallow → Deep water transition: Speed increases (v ↑), wavelength lengthens (λ ↑), refracts AWAY from normal.",
      "Refraction ratio: v₁ / λ₁ = v₂ / λ₂ (since f = v / λ remains constant).",
      "At Headlands: Wavefronts converge (high amplitude ⇒ intense wave energy ⇒ erosion). At Bays: Wavefronts diverge (low amplitude ⇒ calm water ⇒ deposition)."
    ],
    "spmTipsBm": [
      "Frekuensi gelombang tidak pernah berubah semasa pembiasan kerana ia ditentukan oleh punca penggetar.",
      "Muka gelombang air laut sentiasa mengikut bentuk garis pantai apabila menghampiri pantai akibat pembiasan."
    ],
    "spmTipsDlp": [
      "Wave frequency NEVER changes during refraction because it is solely determined by oscillation source.",
      "Coastal wave crests bend to align parallel to shoreline geometry due to shallow-water refraction."
    ]
  },
  "jbBMpSkhVbE": {
    "lessonId": "jbBMpSkhVbE",
    "titleBm": "5.5 Pembelauan Gelombang",
    "titleDlp": "5.5 Diffraction of Waves",
    "chapterBm": "Gelombang",
    "chapterDlp": "Waves",
    "form": 4,
    "dskpStandard": "SK 5.5 Pembelauan Gelombang",
    "summaryPointsBm": [
      "Pembelauan gelombang ialah penyebaran muka gelombang apabila merambat melalui suatu bukaan celah kecil atau mengelilingi tepi suatu halangan.",
      "Syarat Pembelauan Ketara: Saiz celah a mestilah lebih kecil atau sama dengan panjang gelombang (a ≤ λ) ⇒ muka gelombang menjadi membulat sempurna.",
      "Jika saiz celah a > λ: Pembelauan kurang ketara (hanya tepi gelombang melengkung sedikit, bahagian tengah kekal lurus).",
      "Ciri gelombang terbelau: Laju (v), frekuensi (f), dan panjang gelombang (λ) TIDAK BERUBAH. Amplitud berkurang kerana tenaga gelombang disebarkan ke kawasan yang lebih luas."
    ],
    "summaryPointsDlp": [
      "Wave Diffraction is the spreading of wavefronts when passing through a narrow aperture or around edges of an obstacle.",
      "Significant Diffraction Condition: Aperture width a must be smaller than or comparable to wavelength (a ≤ λ) ⇒ circular wavefronts formed.",
      "If aperture width a > λ: Diffraction is negligible (curving only at edges, straight in centre).",
      "Diffracted wave parameters: Speed (v), frequency (f), and wavelength (λ) remain UNCHANGED. Amplitude decreases as energy spreads over broader area."
    ],
    "spmTipsBm": [
      "Gelombang bunyi lebih mudah dibelaukan berbanding gelombang cahaya kerana panjang gelombang bunyi (~1 m) jauh lebih besar daripada panjang gelombang cahaya (~500 nm).",
      "Benteng pemecah ombak di pelabuhan mempunyai bukaan kecil untuk membelaukan ombak laut supaya air di dalam pelabuhan tenang."
    ],
    "spmTipsDlp": [
      "Sound waves diffract around corners easily compared to light because sound wavelength (~1 m) is vastly larger than light (~500 nm).",
      "Harbour breakwaters utilize narrow openings to diffract oceanic swells, ensuring calm waters inside."
    ]
  },
  "hgnSRVa-lcY": {
    "lessonId": "hgnSRVa-lcY",
    "titleBm": "5.6a Interferens Gelombang",
    "titleDlp": "5.6a Interference of Waves",
    "chapterBm": "Gelombang",
    "chapterDlp": "Waves",
    "form": 4,
    "dskpStandard": "SK 5.6 Interferens Gelombang",
    "summaryPointsBm": [
      "Prinsip Superposisi: Apabila dua gelombang bertindih, sesaran paduan pada sebarang titik ialah hasil tambah sesaran individu bagi kedua-dua gelombang tersebut.",
      "Punca Koheren: Dua punca gelombang yang menghasilkan gelombang dengan frekuensi sama dan beza fasa yang malar.",
      "Interferens Membina: Puncak bertemu puncak atau lembangan bertemu lembangan ⇒ menghasilkan Antinod (amplitud maksimum).",
      "Interferens Membinasa: Puncak bertemu lembangan ⇒ menghasilkan Nod (amplitud sifar).",
      "Formula Dwicelah Young: λ = a x / D (di mana a = jarak antara dua punca, x = jarak pemisahan dua pinggir berturutan, D = jarak dari punca ke skrin)."
    ],
    "summaryPointsDlp": [
      "Principle of Superposition: When two waves overlap, the resultant displacement at any point equals the vector sum of individual displacements.",
      "Coherent Sources: Two wave sources producing identical frequency and constant phase difference.",
      "Constructive Interference: Crest meets crest or trough meets trough ⇒ produces Antinodes (maximum amplitude).",
      "Destructive Interference: Crest meets trough ⇒ produces Nodes (zero amplitude).",
      "Young's Double-Slit Formula: λ = a x / D (where a = slit separation, x = fringe separation, D = distance from slits to screen)."
    ],
    "spmTipsBm": [
      "SPM 2021 K2AS5: Hubungan pemisahan pinggir x: Jika a berkurang (a ↓), maka jarak pinggir x bertambah (x ↑). Jika D bertambah (D ↑), maka x bertambah (x ↑).",
      "Cahaya monokromatik merah (λ merah paling panjang) menghasilkan jarak pinggir x yang paling lebar berbanding warna lain."
    ],
    "spmTipsDlp": [
      "SPM 2021 K2AS5: Fringe separation relationships: Smaller slit spacing (a ↓) yields wider fringe spacing (x ↑). Greater distance (D ↑) yields wider spacing (x ↑).",
      "Monochromatic red light (longest visible λ) produces widest fringe spacing x compared to other colors."
    ]
  },
  "oyweI4GDIsM": {
    "lessonId": "oyweI4GDIsM",
    "titleBm": "5.6b Interferens Gelombang",
    "titleDlp": "5.6b Interference of Waves Part 2",
    "chapterBm": "Gelombang",
    "chapterDlp": "Waves",
    "form": 4,
    "dskpStandard": "SK 5.6 Corak Interferens Gelombang",
    "summaryPointsBm": [
      "Interferens Gelombang Bunyi: Bunyi kuat (antinod / interferens membina) dan bunyi perlahan (nod / interferens membinasa) berselang-seli.",
      "Interferens Gelombang Cahaya: Pinggir cerah (antinod) dan pinggir gelap (nod) berselang-seli pada skrin.",
      "Formula pengiraan panjang gelombang: λ = a x / D. Pengiraan jarak pinggir: x = λ D / a."
    ],
    "summaryPointsDlp": [
      "Sound Wave Interference: Alternating loud sounds (antinodes / constructive) and soft/silent nodes (destructive).",
      "Light Wave Interference: Alternating bright fringes (antinodes) and dark fringes (nodes) on screen.",
      "Wavelength calculation: λ = a x / D. Fringe spacing calculation: x = λ D / a."
    ],
    "spmTipsBm": [
      "Jarak x diukur antara pusat pinggir cerah ke pusat pinggir cerah bersebelahan (atau nod ke nod bersebelahan).",
      "Gunakan pembesar suara koheren yang disambung kepada satu penjana isyarat audio yang sama untuk eksperimen bunyi."
    ],
    "spmTipsDlp": [
      "Fringe spacing x is measured from centre of one bright fringe to centre of adjacent bright fringe.",
      "Coherent audio speakers must connect to single signal generator for audible sound interference."
    ]
  },
  "4v3ygAyaP68": {
    "lessonId": "4v3ygAyaP68",
    "titleBm": "5.7 Gelombang EM",
    "titleDlp": "5.7 Electromagnetic Waves",
    "chapterBm": "Gelombang",
    "chapterDlp": "Waves",
    "form": 4,
    "dskpStandard": "SK 5.7 Gelombang Elektromagnet",
    "summaryPointsBm": [
      "Gelombang Elektromagnet terdiri daripada ayunan medan elektrik dan medan magnet yang saling berserenjang antara satu sama lain dan berserenjang dengan arah perambatan gelombang (gelombang melintang).",
      "Semua gelombang EM merambat pada kelajuan cahaya dalam vakum: c = 3.00 × 10⁸ m s⁻¹.",
      "Spektrum Elektromagnet (urutan frekuensi f meningkat / panjang gelombang λ menurun): Gelombang Radio → Gelombang Mikro → Sinaran Inframerah → Cahaya Nampak → Sinaran Ultraungu → Sinar-X → Sinar Gama.",
      "Hubungan gelombang EM: c = f λ."
    ],
    "summaryPointsDlp": [
      "Electromagnetic Waves consist of oscillating electric and magnetic fields perpendicular to each other and to wave propagation direction (transverse wave).",
      "All EM waves travel at speed of light in vacuum: c = 3.00 × 10⁸ m s⁻¹.",
      "Electromagnetic Spectrum (increasing frequency f / decreasing wavelength λ): Radio waves → Microwaves → Infrared radiation → Visible light → Ultraviolet → X-rays → Gamma rays.",
      "EM wave relationship: c = f λ."
    ],
    "spmTipsBm": [
      "Sinar Gama: Frekuensi tertinggi, tenaga foton tertinggi, kuasa penembusan tertinggi (digunakan untuk radioterapi kanser).",
      "Gelombang Radio: Panjang gelombang terpanjang, paling mudah dibelaukan melintasi bukit dan bangunan (digunakan untuk penyiaran radio/TV)."
    ],
    "spmTipsDlp": [
      "Gamma Rays: Highest frequency, greatest photon energy, highest penetration power (cancer radiotherapy).",
      "Radio Waves: Longest wavelength, diffracts easily around obstacles/terrain (radio & TV telecommunication)."
    ]
  },
  "3Wy8-kNGrcc": {
    "lessonId": "3Wy8-kNGrcc",
    "titleBm": "6.1 Pembiasan Cahaya",
    "titleDlp": "6.1 Refraction of Light",
    "chapterBm": "Cahaya dan Optik",
    "chapterDlp": "Light and Optics",
    "form": 4,
    "dskpStandard": "SK 6.1 Pembiasan Cahaya & Indeks Biasan",
    "summaryPointsBm": [
      "Pembiasan cahaya berlaku kerana perubahan halaju cahaya apabila merambat melalui medium berlainan ketumpatan optik.",
      "Kurang tumpat → Lebih tumpat optik: Laju cahaya berkurang, sinar terbias MENDEKATI garis normal (sudut tuju i > sudut biasan r).",
      "Lebih tumpat → Kurang tumpat optik: Laju cahaya bertambah, sinar terbias MENJAUHI garis normal (sudut tuju i < sudut biasan r).",
      "Indeks Biasan: n = c / v = sin i / sin r = H / h (di mana H = dalam nyata, h = dalam ketara).",
      "Hukum Snell: n₁ sin θ₁ = n₂ sin θ₂."
    ],
    "summaryPointsDlp": [
      "Light Refraction occurs due to changes in light velocity across media of differing optical densities.",
      "Less dense → Denser medium: Light speed decreases, ray bends TOWARDS normal (incident angle i > refracted angle r).",
      "Denser → Less dense medium: Light speed increases, ray bends AWAY from normal (incident angle i < refracted angle r).",
      "Refractive Index: n = c / v = sin i / sin r = H / h (where H = real depth, h = apparent depth).",
      "Snell's Law: n₁ sin θ₁ = n₂ sin θ₂."
    ],
    "spmTipsBm": [
      "SPM 2022 Amali: Nilai indeks biasan n sentiasa lebih besar atau sama dengan 1.00 (n ≥ 1.00).",
      "Dalam pengiraan Dalam Nyata vs Dalam Ketara: n = H / h ⇒ Dalam Ketara h = H / n (kolam kelihatan lebih cetek daripada kedalaman sebenar)."
    ],
    "spmTipsDlp": [
      "SPM 2022 Practical: Refractive index is dimensionless and always n ≥ 1.00.",
      "Real vs Apparent depth: n = H / h ⇒ Apparent depth h = H / n (swimming pools appear shallower than actual depth)."
    ]
  },
  "bViYGWMIHoI": {
    "lessonId": "bViYGWMIHoI",
    "titleBm": "6.2 Pantulan Dalam Penuh",
    "titleDlp": "6.2 Total Internal Reflection",
    "chapterBm": "Cahaya dan Optik",
    "chapterDlp": "Light and Optics",
    "form": 4,
    "dskpStandard": "SK 6.2 Pantulan Dalam Penuh",
    "summaryPointsBm": [
      "Pantulan Dalam Penuh berlaku apabila cahaya memantul sepenuhnya ke dalam medium asal tanpa sebarang pembiasan.",
      "Dua Syarat Wajib Pantulan Dalam Penuh: (1) Cahaya merambat dari medium lebih tumpat optik ke medium kurang tumpat optik, dan (2) Sudut tuju lebih besar daripada sudut genting (i > c).",
      "Sudut Genting (c): Sudut tuju dalam medium lebih tumpat apabila sudut biasan dalam medium kurang tumpat bersamaan 90° (r = 90°).",
      "Formula Sudut Genting: sin c = 1 / n ⇒ c = sin⁻¹(1 / n).",
      "Aplikasi: Gentian optik (kabel endoskop/internet), prisma kaca (periskop & binokular), pemantul jalan, fenomena logamaya (mirage)."
    ],
    "summaryPointsDlp": [
      "Total Internal Reflection (TIR) occurs when light is completely reflected back into the denser medium with zero refraction.",
      "Two Mandatory Conditions for TIR: (1) Light propagates from optically denser to less dense medium, and (2) Angle of incidence exceeds critical angle (i > c).",
      "Critical Angle (c): Incident angle in denser medium for which angle of refraction in less dense medium is 90° (r = 90°).",
      "Critical Angle Formula: sin c = 1 / n ⇒ c = sin⁻¹(1 / n).",
      "Applications: Optical fibres (endoscopy, high-speed broadband), glass prisms (periscopes, binoculars), road reflectors, mirages."
    ],
    "spmTipsBm": [
      "Kabel gentian optik terdiri daripada teras dalam berketumpatan optik tinggi disalut oleh lapisan luar berketumpatan optik rendah supaya cahaya mengalami pantulan dalam penuh berulang kali.",
      "Prisma 45°-90°-45° lebih baik daripada cermin satah kerana menghasilkan imej lebih terang tanpa imej berganda."
    ],
    "spmTipsDlp": [
      "Optical fibre structure: High-density inner core coated with lower-density cladding ensures repeated internal reflection.",
      "45°-90°-45° prisms outperform plane mirrors by eliminating multiple ghost reflections and silvering degradation."
    ]
  },
  "9sJ9a5rToVs": {
    "lessonId": "9sJ9a5rToVs",
    "titleBm": "6.3 Pembentukan Imej oleh Kanta",
    "titleDlp": "6.3 Image Formation by Lenses",
    "chapterBm": "Cahaya dan Optik",
    "chapterDlp": "Light and Optics",
    "form": 4,
    "dskpStandard": "SK 6.3 Pembentukan Imej oleh Kanta",
    "summaryPointsBm": [
      "Kanta Cembung (Kanta Penumpu): Menumpukan sinar cahaya selari pada titik fokus F di belakang kanta. Panjang fokus f adalah positif (+).",
      "Kanta Cekung (Kanta Pencapah): Mencapahkan sinar cahaya selari seolah-olah berasal dari titik fokus F di hadapan kanta. Panjang fokus f adalah negatif (-).",
      "Titik Fokus (F): Titik penumpuan sinar cahaya selari selepas melalui kanta.",
      "Panjang Fokus (f): Jarak antara pusat optik O dengan titik fokus F."
    ],
    "summaryPointsDlp": [
      "Convex Lens (Converging): Converges parallel rays to focal point F behind lens. Focal length f is positive (+).",
      "Concave Lens (Diverging): Diverges parallel rays as if originating from focal point F in front of lens. Focal length f is negative (-).",
      "Focal Point (F): Point where parallel rays converge after passing through lens.",
      "Focal Length (f): Distance between optical centre O and focal point F."
    ],
    "spmTipsBm": [
      "3 Sinar Utama Kanta Cembung: (1) Selari paksi utama terbias melalui F, (2) Melalui pusat optik O terus tanpa terbias, (3) Melalui F terbias selari paksi utama.",
      "Kanta cekung SENTIASA menghasilkan imej Maya, Tegak, Mengecil (M-T-M) untuk semua kedudukan objek."
    ],
    "spmTipsDlp": [
      "3 Ray Rules for Convex Lenses: (1) Parallel to principal axis refracts through F, (2) Passing optical centre O continues undeviated, (3) Through F refracts parallel.",
      "Concave lenses ALWAYS produce Virtual, Upright, Diminished (V-U-D) images for any object distance."
    ]
  },
  "BRgIHlXbr_k": {
    "lessonId": "BRgIHlXbr_k",
    "titleBm": "6.4 Pembentukan Imej oleh Kanta",
    "titleDlp": "6.4 Lens Formula & Magnification",
    "chapterBm": "Cahaya dan Optik",
    "chapterDlp": "Light and Optics",
    "form": 4,
    "dskpStandard": "SK 6.4 Formula Kanta Nipis & Pembesaran",
    "summaryPointsBm": [
      "Formula Kanta Nipis: 1 / f = 1 / u + 1 / v (di mana f = panjang fokus, u = jarak objek, v = jarak imej).",
      "Pembesaran Linear: m = v / u = h_i / h_o (ketinggian imej / ketinggian objek).",
      "Kuasa Kanta: P = 1 / f (f MESTI dalam unit meter, unit kuasa ialah Diopter, D).",
      "Peraturan Tanda (Sign Convention): f positif (+) bagi kanta cembung, f negatif (-) bagi kanta cekung; v positif (+) bagi imej nyata (belakang kanta), v negatif (-) bagi imej maya (hadapan kanta)."
    ],
    "summaryPointsDlp": [
      "Thin Lens Formula: 1 / f = 1 / u + 1 / v (where f = focal length, u = object distance, v = image distance).",
      "Linear Magnification: m = v / u = h_i / h_o (image height / object height).",
      "Lens Power: P = 1 / f (f MUST be in metres, unit is Dioptres, D).",
      "Sign Convention: f positive (+) for convex, negative (-) for concave; v positive (+) for real image, negative (-) for virtual image."
    ],
    "spmTipsBm": [
      "Dalam pengiraan kuasa kanta P = 1 / f, jangan lupa tukar nilai panjang fokus f dari cm kepada meter (m).",
      "Jika m > 1: imej dibesarkan. Jika m = 1: imej sama saiz. Jika m < 1: imej dikecilkan."
    ],
    "spmTipsDlp": [
      "In lens power P = 1 / f calculation, convert focal length f from centimetres to metres (m).",
      "If m > 1: magnified image. If m = 1: same size. If m < 1: diminished image."
    ]
  },
  "yuY1N9zgEEc": {
    "lessonId": "yuY1N9zgEEc",
    "titleBm": "6.5 Peralatan Optik",
    "titleDlp": "6.5 Optical Instruments",
    "chapterBm": "Cahaya dan Optik",
    "chapterDlp": "Light and Optics",
    "form": 4,
    "dskpStandard": "SK 6.5 Peralatan Optik",
    "summaryPointsBm": [
      "Kanta Pembesar: Menggunakan kanta cembung dengan objek diletakkan pada u < f untuk menghasilkan imej Maya, Tegak, Dibesarkan.",
      "Mikroskop Majmuk: Terdiri daripada 2 kanta cembung berkuasa tinggi (f_o < f_e). Kanta objektif menghasilkan imej nyata, songsang, dibesarkan (f_o < u < 2f_o). Kanta mata bertindak sebagai kanta pembesar menghasilkan imej akhir maya, songsang, dibesarkan.",
      "Pelarasan Normal Mikroskop Majmuk: Jarak antara kanta d > f_o + f_e; imej kedua I₂ terbentuk pada titik dekat mata (25 cm).",
      "Teleskop Astronomi: Terdiri daripada 2 kanta cembung (f_o > f_e). Pelarasan normal: Jarak antara kanta d = f_o + f_e, Pembesaran M = f_o / f_e, imej akhir terbentuk pada infiniti."
    ],
    "summaryPointsDlp": [
      "Magnifying Glass: Single convex lens with object distance u < f producing Virtual, Upright, Magnified image.",
      "Compound Microscope: 2 high-power convex lenses (f_o < f_e). Objective lens produces real, inverted, magnified image. Eyepiece produces final virtual, inverted, magnified image.",
      "Normal Adjustment of Microscope: Lens separation d > f_o + f_e; final image formed at near point (25 cm).",
      "Astronomical Telescope: 2 convex lenses (f_o > f_e). Normal adjustment: Lens separation d = f_o + f_e, Magnification M = f_o / f_e, final image at infinity."
    ],
    "spmTipsBm": [
      "SPM 2021 K2AS8: Perbandingan susunan kanta: Mikroskop Majmuk f_o < f_e manakala Teleskop Astronomi f_o > f_e.",
      "Pada pelarasan normal teleskop astronomi, panjang tiub teleskop d = f_o + f_e."
    ],
    "spmTipsDlp": [
      "SPM 2021 K2AS8: Lens focal length comparison: Microscope f_o < f_e whereas Telescope f_o > f_e.",
      "At normal adjustment of telescope, barrel length d = f_o + f_e."
    ]
  },
  "AceZCzCckqc": {
    "lessonId": "AceZCzCckqc",
    "titleBm": "6.6a Pembentukan Imej Oleh Cermin Sfera",
    "titleDlp": "6.6a Image Formation by Spherical Mirrors",
    "chapterBm": "Cahaya dan Optik",
    "chapterDlp": "Light and Optics",
    "form": 4,
    "dskpStandard": "SK 6.6 Pembentukan Imej Cermin Sfera",
    "summaryPointsBm": [
      "Cermin Cekung (Cermin Penumpu): Menumpukan sinar cahaya ke titik fokus F di hadapan cermin. Panjang fokus f = r / 2 (di mana r ialah jejari kelengkungan).",
      "Cermin Cembung (Cermin Pencapah): Mencapahkan sinar cahaya seolah-olah berasal dari titik fokus F di belakang cermin.",
      "Cermin Cekung boleh menghasilkan imej nyata (apabila u > f) atau imej maya dibesarkan (apabila u < f, seperti cermin pergigian/solek).",
      "Cermin Cembung SENTIASA menghasilkan imej Maya, Tegak, Mengecil dengan medan penglihatan yang sangat luas."
    ],
    "summaryPointsDlp": [
      "Concave Mirror (Converging): Converges light rays to focal point F in front of mirror surface. Focal length f = r / 2 (where r is radius of curvature).",
      "Convex Mirror (Diverging): Diverges light rays as if originating from focal point F behind mirror.",
      "Concave Mirror produces real inverted images (for u > f) or virtual magnified images (for u < f, e.g., dental/makeup mirrors).",
      "Convex Mirror ALWAYS produces Virtual, Upright, Diminished images with an extensive wide field of view."
    ],
    "spmTipsBm": [
      "Aplikasi Cermin Cembung: Cermin keselamatan selekoh jalan dan cermin cembung pasar raya kerana memberikan medan penglihatan luas.",
      "Aplikasi Cermin Cekung: Pemantul lampu depan kereta dan piring satelit Astro kerana menumpukan gelombang ke titik fokus."
    ],
    "spmTipsDlp": [
      "Convex Mirror Applications: Blind corner road safety mirrors and supermarket anti-theft mirrors for wide angular vision.",
      "Concave Mirror Applications: Car headlights and parabolic satellite dishes to concentrate incoming signals at focus."
    ]
  },
  "8Ci_wF-Pvps": {
    "lessonId": "8Ci_wF-Pvps",
    "titleBm": "6.6b Pembentukan Imej Oleh Cermin Sfera",
    "titleDlp": "6.6b Image Formation by Spherical Mirrors Part 2",
    "chapterBm": "Cahaya dan Optik",
    "chapterDlp": "Light and Optics",
    "form": 4,
    "dskpStandard": "SK 6.6 Aplikasi Cermin Sfera",
    "summaryPointsBm": [
      "Ciri imej cermin cekung pada u < f: Maya, Tegak, Dibesarkan (sesuai untuk cermin pencukur dan cermin pergigian).",
      "Ciri imej cermin cekung pada u = f: Imej terbentuk pada infiniti (menghasilkan alur cahaya selari berkeamatan tinggi pada lampu suluh).",
      "Ciri imej cermin cembung untuk semua kedudukan objek: Maya, Tegak, Dikecilkan dengan medan penglihatan yang luas (cermin pandang belakang kenderaan)."
    ],
    "summaryPointsDlp": [
      "Concave mirror image for u < f: Virtual, Upright, Magnified (ideal for shaving and dental inspection).",
      "Concave mirror image for u = f: Image at infinity (generates parallel beam for torches and searchlights).",
      "Convex mirror image for all object positions: Virtual, Upright, Diminished with wide field of view (rearview vehicle mirrors)."
    ],
    "spmTipsBm": [
      "Soalan Esei SPM kerap meminta membandingkan ciri cermin cembung vs cermin satah untuk cermin pandang belakang kereta.",
      "Cermin cembung dipilih kerana medan pandangan lebih luas walaupun objek kelihatan lebih jauh daripada jarak sebenar."
    ],
    "spmTipsDlp": [
      "SPM essay questions frequently compare convex vs plane mirrors for automotive rearview mirror selection.",
      "Convex mirror is chosen for wider field of view despite slight distance distortion."
    ]
  },
  "t5_m1_1_1": {
    "lessonId": "t5_m1_1_1",
    "titleBm": "1.1 Daya Paduan",
    "titleDlp": "1.1 Resultant Force",
    "chapterBm": "Daya dan Gerakan II",
    "chapterDlp": "Force and Motion II",
    "form": 5,
    "dskpStandard": "SK 1.1 Daya Paduan",
    "summaryPointsBm": [
      "Daya Paduan (F_net) ialah daya tunggal yang mewakili jumlah vektor bagi dua atau lebih daya yang bertindak ke atas suatu objek.",
      "Hukum Gerakan Newton Kedua: F_net = ma.",
      "Objek di dalam Lif: Lif pegun atau bergerak dengan halaju seragam (Tindak balas normal R = mg), Lif memecut ke atas (R = m(g + a)), Lif memecut ke bawah (R = m(g - a)), Tali lif putus/jatuh bebas (R = 0 ⇒ ketandusan berat).",
      "Daya Paduan bagi dua daya berserenjang (90°): F_net = √(F₁² + F₂²), arah tan θ = F_y / F_x."
    ],
    "summaryPointsDlp": [
      "Resultant Force (F_net) is single vector sum representing combined effect of multiple forces acting on a body.",
      "Newton's Second Law of Motion: F_net = ma.",
      "Apparent Weight in Lifts: Stationary / constant velocity (Normal reaction R = mg), Accelerating upwards (R = m(g + a)), Accelerating downwards (R = m(g - a)), Free falling lift (R = 0 ⇒ apparent weightlessness).",
      "Resultant of two perpendicular forces (90°): F_net = √(F₁² + F₂²), direction tan θ = F_y / F_x."
    ],
    "spmTipsBm": [
      "Gambar rajah jasad bebas (Free-body diagram) MESTI dilukis dengan melabelkan semua anak panah vektor daya yang bertindak pada pusat jisim objek.",
      "Bacaan penimbang berat di dalam lif yang memecut ke atas akan bertambah (R > mg)."
    ],
    "spmTipsDlp": [
      "Free-body diagrams MUST label all force vectors originating from the object's centre of mass.",
      "Weighing scale reading increases in an upward accelerating lift (R > mg)."
    ]
  },
  "t5_m2_1_3": {
    "lessonId": "t5_m2_1_3",
    "titleBm": "1.3 Keseimbangan Daya",
    "titleDlp": "1.3 Forces in Equilibrium",
    "chapterBm": "Daya dan Gerakan II",
    "chapterDlp": "Force and Motion II",
    "form": 5,
    "dskpStandard": "SK 1.2 & 1.3 Leraian Daya & Keseimbangan Daya",
    "summaryPointsBm": [
      "Leraian Daya: Menguraikan satu daya condong F pada sudut θ kepada dua komponen berserenjang: Komponen Mengufuk F_x = F cos θ, Komponen Menegak F_y = F sin θ.",
      "Keseimbangan Daya berlaku apabila daya paduan adalah sifar (F_net = 0, pecutan a = 0). Tiga daya dalam keseimbangan boleh dilukis membentuk Segi Tiga Daya Tertutup mengikut arah pusingan yang sama.",
      "Objek pada Satah Condong bersudut θ: Komponen berat selari satah W_x = mg sin θ (menolak ke bawah satah), Komponen berat berserenjang satah W_y = mg cos θ (ditentang oleh tindak balas normal R = mg cos θ).",
      "Hukum Sinus untuk 3 daya seimbang: T / sin α = W / sin β."
    ],
    "summaryPointsDlp": [
      "Resolution of Forces: Splitting inclined force F at angle θ into two perpendicular components: Horizontal F_x = F cos θ, Vertical F_y = F sin θ.",
      "Equilibrium of Forces occurs when resultant force is zero (F_net = 0, a = 0). Three coplanar equilibrium forces form a Closed Triangle of Forces in same sequential direction.",
      "Object on Inclined Plane at angle θ: Component parallel to slope W_x = mg sin θ (downslope force), Component perpendicular to slope W_y = mg cos θ (balanced by normal reaction R = mg cos θ).",
      "Sine Rule for 3 equilibrium forces: T / sin α = W / sin β."
    ],
    "spmTipsBm": [
      "SPM 2021 K2BS9(b,d): Bagi objek pegun yang tergantung pada dua tali bersudut, gunakan kaedah leraian daya paksi-x (T₁ cos θ₁ = T₂ cos θ₂) dan paksi-y (T₁ sin θ₁ + T₂ sin θ₂ = W).",
      "Objek menuruni satah condong tanpa geseran memecut dengan a = g sin θ."
    ],
    "spmTipsDlp": [
      "SPM 2021 K2BS9(b,d): For stationary suspended hanging loads, apply component resolution along x-axis and y-axis.",
      "An object sliding down a frictionless incline accelerates at a = g sin θ."
    ]
  },
  "t5_m4_1_4": {
    "lessonId": "t5_m4_1_4",
    "titleBm": "1.4 Kekenyalan",
    "titleDlp": "1.4 Elasticity",
    "chapterBm": "Daya dan Gerakan II",
    "chapterDlp": "Force and Motion II",
    "form": 5,
    "dskpStandard": "SK 1.4 Kekenyalan & Hukum Hooke",
    "summaryPointsBm": [
      "Kekenyalan ialah sifat bahan untuk kembali ke bentuk dan saiz asalnya selepas daya yang dikenakan dialihkan.",
      "Hukum Hooke: Pemanjangan spring x berkadar terus dengan daya regangan F yang bertindak, dengan syarat tidak melebihi had kenyal: F = kx.",
      "Pemalar Spring (k = F / x): Kecerunan graf F melawan x (unit S.I.: N m⁻¹ atau N cm⁻¹). Nilai k lebih besar bermaksud spring lebih keras/sukar diregang.",
      "Tenaga Keupayaan Kenyal: E_p = ½ F x = ½ k x² (luas di bawah graf F melawan x).",
      "Susunan Spring: Bersiri (pemanjangan bertambah x_total = n x, k_berkesan = k / n), Selari (pemanjangan berkurang x_total = x / n, k_berkesan = n k)."
    ],
    "summaryPointsDlp": [
      "Elasticity is property of material to restore original shape and dimensions upon removal of applied deforming force.",
      "Hooke's Law: Extension x is directly proportional to stretching force F, provided elastic limit is not exceeded: F = kx.",
      "Spring Constant (k = F / x): Gradient of F against x graph (S.I. unit: N m⁻¹). Higher k indicates stiffer spring.",
      "Elastic Potential Energy: E_p = ½ F x = ½ k x² (area under F against x graph).",
      "Spring Configurations: Series (greater extension x_total = n x, k_eff = k / n), Parallel (lesser extension x_total = x / n, k_eff = n k)."
    ],
    "spmTipsBm": [
      "Faktor mempengaruhi pemalar spring k: (1) Panjang spring pendek (k ↑), (2) Diameter dawai tebal (k ↑), (3) Diameter gegelung kecil (k ↑), (4) Bahan keluli lebih keras daripada kuprum.",
      "Jika graf melepasi Had Kenyal, spring mengalami ubah bentuk kekal (tidak kembali ke panjang asal)."
    ],
    "spmTipsDlp": [
      "Factors increasing spring stiffness k: (1) Shorter length (k ↑), (2) Thicker wire diameter (k ↑), (3) Smaller coil diameter (k ↑), (4) Steel vs copper.",
      "Exceeding Elastic Limit causes permanent deformation (plastic deformation)."
    ]
  },
  "t5_m6_2_2": {
    "lessonId": "t5_m6_2_2",
    "titleBm": "2.2 Tekanan Atmosfera",
    "titleDlp": "2.2 Atmospheric Pressure",
    "chapterBm": "Tekanan",
    "chapterDlp": "Pressure",
    "form": 5,
    "dskpStandard": "SK 2.1 & 2.2 Tekanan Cecair & Tekanan Atmosfera",
    "summaryPointsBm": [
      "Tekanan: P = F / A (unit Pascal, Pa atau N m⁻²).",
      "Tekanan Cecair: P = h ρ g (h = kedalaman cecair, ρ = ketumpatan cecair, g = pecutan graviti). Tekanan cecair bertindak sama rata ke semua arah pada kedalaman yang sama dan TIDAK bergantung kepada luas atau bentuk bekas.",
      "Tekanan Sebenar pada kedalaman h: P_sebenar = P_atm + h ρ g.",
      "Tekanan Atmosfera: Tekanan akibat berat lapisan udara yang menyelubungi Bumi. Nilai piawai: 1 atm = 76 cmHg = 101,300 Pa = 10.3 m air.",
      "Barometer Fortin / Merkuri: Ruang di atas turus merkuri ialah ruang vakum (tekanan sifar). Ketinggian menegak merkuri h = 76 cmHg pada aras laut."
    ],
    "summaryPointsDlp": [
      "Pressure: P = F / A (S.I. unit: Pascal, Pa or N m⁻²).",
      "Liquid Pressure: P = h ρ g (h = depth, ρ = liquid density, g = gravitational acceleration). Acts equally in all directions at given depth, independent of container cross-sectional area or shape.",
      "Actual Pressure at depth h: P_actual = P_atm + h ρ g.",
      "Atmospheric Pressure: Weight of atmospheric column per unit surface area. Standard value: 1 atm = 76 cmHg = 101,300 Pa = 10.3 m water.",
      "Mercury Barometer: Space above mercury column is vacuum (Torricellian vacuum, zero pressure). Vertical height h = 76 cmHg at sea level."
    ],
    "spmTipsBm": [
      "Jika tiub barometer disengetkan, panjang turus merkuri bertambah tetapi KETINGGIAN MENEGAK h tetap sama (76 cmHg).",
      "Di puncak gunung, tekanan atmosfera berkurang kerana lapisan udara di atasnya lebih nipis dan kurang tumpat."
    ],
    "spmTipsDlp": [
      "Tilting a barometer tube increases mercury column length along tube, but VERTICAL HEIGHT h remains constant at 76 cmHg.",
      "Atmospheric pressure decreases with altitude because overlying air column is shorter and less dense."
    ]
  },
  "t5_m7_2_3": {
    "lessonId": "t5_m7_2_3",
    "titleBm": "2.3 Tekanan Gas & 2.4 Prinsip Pascal",
    "titleDlp": "2.3 Gas Pressure & 2.4 Pascal's Principle",
    "chapterBm": "Tekanan",
    "chapterDlp": "Pressure",
    "form": 5,
    "dskpStandard": "SK 2.3 & 2.4 Tekanan Gas & Prinsip Pascal",
    "summaryPointsBm": [
      "Manometer Tiub-U mengukur tekanan gas: Jika paras cecair sebelah gas lebih rendah daripada sebelah terbuka: P_gas = P_atm + h ρ g.",
      "Prinsip Pascal: Tekanan yang dikenakan ke atas suatu bendalir tertutup akan dipindahkan secara seragam ke seluruh bahagian bendalir pada semua arah.",
      "Sistem Hidraulik: F₁ / A₁ = F₂ / A₂ (di mana F₁ / A₁ ialah tekanan pada omboh kecil, F₂ = F₁ × (A₂ / A₁) ialah daya output yang digandakan pada omboh besar).",
      "Pemuliharaan Isi Padu Cecair Hidraulik: A₁ d₁ = A₂ d₂ (omboh kecil bergerak lebih jauh d₁ berbanding omboh besar d₂)."
    ],
    "summaryPointsDlp": [
      "U-Tube Manometer measures gas pressure: If liquid level on gas side is lower than open side: P_gas = P_atm + h ρ g.",
      "Pascal's Principle: Pressure applied to an enclosed fluid is transmitted undiminished throughout the fluid in all directions.",
      "Hydraulic System: F₁ / A₁ = F₂ / A₂ (where F₁ / A₁ is input pressure, F₂ = F₁ × (A₂ / A₁) is multiplied output force on large piston).",
      "Incompressible Fluid Conservation: A₁ d₁ = A₂ d₂ (small piston moves larger displacement d₁ compared to large piston d₂)."
    ],
    "spmTipsBm": [
      "Ciri bendalir hidraulik yang baik: Tidak boleh dimampatkan (incompressible), takat didih tinggi, tidak mudah berbuih, kelikatan sesuai, tidak menghakis.",
      "Sistem brek hidraulik kereta dan jek hidraulik menggunakan Prinsip Pascal sebagai pengganda daya."
    ],
    "spmTipsDlp": [
      "Ideal hydraulic fluid properties: Incompressible, high boiling point, low foaming tendency, non-corrosive.",
      "Hydraulic car brakes and hydraulic jacks utilize Pascal's Principle for force multiplication."
    ]
  },
  "t5_m8_2_5": {
    "lessonId": "t5_m8_2_5",
    "titleBm": "2.5 Prinsip Archimedes",
    "titleDlp": "2.5 Archimedes' Principle",
    "chapterBm": "Tekanan",
    "chapterDlp": "Pressure",
    "form": 5,
    "dskpStandard": "SK 2.5 Prinsip Archimedes",
    "summaryPointsBm": [
      "Prinsip Archimedes: Suatu objek yang terendam sebahagian atau sepenuhnya di dalam suatu bendalir mengalami Daya Apungan (F_b) yang sama dengan berat bendalir yang disesarkan oleh objek tersebut.",
      "Formula Daya Apungan: F_b = ρ V g (di mana ρ = ketumpatan bendalir, V = isi padu bendalir yang disesarkan / isi padu bahagian objek yang terendam, g = 9.81 m s⁻²).",
      "Kehilangan Berat Ketara: F_b = Berat Sebenar di udara – Berat Ketara di dalam cecair = W_sebenar – W_ketara.",
      "Hukum Keapungan: Objek terapung apabila Daya Apungan = Berat Objek (F_b = W).",
      "Aplikasi: Garis Plimsoll pada kapal laut, kapal selam (tangki balast), belon udara panas, hidrometer."
    ],
    "summaryPointsDlp": [
      "Archimedes' Principle: An object partially or fully immersed in a fluid experiences a Buoyant Force (F_b) equal to weight of displaced fluid.",
      "Buoyant Force Formula: F_b = ρ V g (where ρ = fluid density, V = volume of displaced fluid / submerged volume, g = 9.81 m s⁻²).",
      "Apparent Weight Loss: F_b = Actual Weight in air – Apparent Weight in fluid = W_actual – W_apparent.",
      "Law of Floatation: An object floats when Buoyant Force equals Total Weight (F_b = W).",
      "Applications: Plimsoll line on cargo ships, submarines (ballast tanks), hot air balloons, hydrometers."
    ],
    "spmTipsBm": [
      "SPM 2021 K2BS11(a): Isi padu cecair tersesar V adalah tepat sama dengan isi padu bahagian objek yang berada di bawah paras cecair.",
      "Kapal selam menyelam dengan mengisi air ke dalam tangki balast (berat > daya apungan) dan timbul dengan mengepam keluar air menggunakan udara termampat (daya apungan > berat)."
    ],
    "spmTipsDlp": [
      "SPM 2021 K2BS11(a): Displaced liquid volume V matches exactly the volume of the submerged portion of object.",
      "Submarines dive by flooding ballast tanks (weight > buoyant force) and surface by expelling water with compressed air (buoyant force > weight)."
    ]
  },
  "t5_m9_2_6": {
    "lessonId": "t5_m9_2_6",
    "titleBm": "2.6 Prinsip Bernoulli",
    "titleDlp": "2.6 Bernoulli's Principle",
    "chapterBm": "Tekanan",
    "chapterDlp": "Pressure",
    "form": 5,
    "dskpStandard": "SK 2.6 Prinsip Bernoulli",
    "summaryPointsBm": [
      "Prinsip Bernoulli: Apabila halaju pengaliran suatu bendalir (cecair atau gas) bertambah, tekanan dalam bendalir tersebut akan berkurang (dan sebaliknya).",
      "Kesan Venturi: Pengaliran bendalir melalui bahagian tiub yang sempit mengalami kelajuan tinggi dan tekanan rendah.",
      "Penjanaan Daya Angkat (Aerofoil): Bentuk aerofoil pada sayap kapal terbang menghasilkan aliran udara berkelajuan tinggi di bahagian atas (tekanan rendah) dan kelajuan rendah di bahagian bawah (tekanan tinggi) ⇒ Beza tekanan menghasilkan Daya Angkat (Lift Force) ke atas.",
      "Aplikasi: Penunu Bunsen (gas laju menyedut udara masuk), karburetor, botol penyembur racun/minyak wangi, spoiler kereta lumba (menghasilkan daya ke bawah / downforce), hidrofoil."
    ],
    "summaryPointsDlp": [
      "Bernoulli's Principle: As velocity of a moving fluid (liquid or gas) increases, internal pressure within fluid decreases.",
      "Venturi Effect: Fluid flow through constricted tube section experiences high speed and low static pressure.",
      "Generation of Aerofoil Lift: Curved upper surface creates higher air speed (low pressure) compared to flat lower surface (high pressure) ⇒ Pressure differential generates upward Lift Force.",
      "Applications: Bunsen burner (high-speed gas draws ambient air), carburetors, atomizer spray bottles, race car inverted spoilers (downforce generation), hydrofoils."
    ],
    "spmTipsBm": [
      "SPM 2021 K2BS11(b,c,d): Dua bot laju yang bergerak selari bersebelahan akan tertarik antara satu sama lain kerana kelajuan air di celah bot tinggi ⇒ tekanan air menurun berbanding bahagian luar.",
      "Dalam tiub Venturi: Paras turus cecair paling rendah di bahagian tiub yang paling sempit kerana tekanan paling rendah."
    ],
    "spmTipsDlp": [
      "SPM 2021 K2BS11(b,c,d): Two fast boats moving closely parallel are drawn together because narrow channel water velocity is high ⇒ lower water pressure.",
      "In Venturi tubes: Liquid column height is lowest at narrowest constriction due to lowest pressure."
    ]
  },
  "t5_m10_3_1": {
    "lessonId": "t5_m10_3_1",
    "titleBm": "3.1 Arus & Beza Keupayaan",
    "titleDlp": "3.1 Current & Potential Difference",
    "chapterBm": "Elektrik",
    "chapterDlp": "Electricity",
    "form": 5,
    "dskpStandard": "SK 3.1 Arus & Beza Keupayaan",
    "summaryPointsBm": [
      "Medan Elektrik ialah kawasan di mana cas elektrik mengalami daya elektrik. Garis medan elektrik keluar dari cas positif (+) dan masuk ke cas negatif (-).",
      "Kekuatan Medan Elektrik (E): Daya elektrik per unit cas E = F / q (N C⁻¹) atau E = V / d (V m⁻¹) bagi dua plat selari berjarak d.",
      "Arus Elektrik (I): Kadar pengaliran cas elektrik: I = Q / t (unit Ampere, A = C s⁻¹).",
      "Beza Keupayaan (V): Kerja yang dilakukan W untuk menggerakkan satu unit cas Q antara dua titik dalam medan elektrik: V = W / Q (unit Volt, V = J C⁻¹)."
    ],
    "summaryPointsDlp": [
      "Electric Field is a region where an electric charge experiences an electrostatic force. Field lines direct away from positive (+) and terminate on negative (-).",
      "Electric Field Strength (E): Electrostatic force per unit charge E = F / q (N C⁻¹) or E = V / d (V m⁻¹) for parallel plates separated by distance d.",
      "Electric Current (I): Rate of flow of electric charge: I = Q / t (unit Ampere, A = C s⁻¹).",
      "Potential Difference (V): Work done W to move one unit of electric charge Q between two points in electric field: V = W / Q (unit Volt, V = J C⁻¹)."
    ],
    "spmTipsBm": [
      "Zarah bercas positif akan memecut mengikut arah garis medan elektrik, manakala zarah bercas negatif (elektron) memecut menentang arah garis medan elektrik.",
      "Corak nyalaan lilin dalam medan elektrik plat selari: Nyalaan lilin terbelah dua dengan bahagian menghala ke plat negatif (-) lebih besar kerana ion positif lebih berat daripada ion negatif."
    ],
    "spmTipsDlp": [
      "Positive charges accelerate in direction of electric field lines; negative charges (electrons) accelerate opposite to field lines.",
      "Candle flame in parallel-plate electric field: Flame spreads towards both plates with larger portion towards negative (-) plate because positive ions are heavier."
    ]
  },
  "t5_m11_3_2a": {
    "lessonId": "t5_m11_3_2a",
    "titleBm": "3.2a Rintangan",
    "titleDlp": "3.2a Resistance",
    "chapterBm": "Elektrik",
    "chapterDlp": "Electricity",
    "form": 5,
    "dskpStandard": "Tingkatan 5 Bab 3: Elektrik",
    "summaryPointsBm": [
      "Memahami konsep penting 3.2a Rintangan mengikut sukatan DSKP."
    ],
    "summaryPointsDlp": [
      "Understand key concepts of 3.2a Resistance according to DSKP."
    ],
    "spmTipsBm": [
      "Fahami kata kunci pemarkahan SPM dan formula yang terlibat."
    ],
    "spmTipsDlp": [
      "Master SPM marking keywords and associated formulas."
    ]
  },
  "t5_m12_3_2b": {
    "lessonId": "t5_m12_3_2b",
    "titleBm": "3.2b Rintangan",
    "titleDlp": "3.2b Resistance in Circuits",
    "chapterBm": "Elektrik",
    "chapterDlp": "Electricity",
    "form": 5,
    "dskpStandard": "Tingkatan 5 Bab 3: Elektrik",
    "summaryPointsBm": [
      "Memahami konsep penting 3.2b Rintangan mengikut sukatan DSKP."
    ],
    "summaryPointsDlp": [
      "Understand key concepts of 3.2b Resistance in Circuits according to DSKP."
    ],
    "spmTipsBm": [
      "Fahami kata kunci pemarkahan SPM dan formula yang terlibat."
    ],
    "spmTipsDlp": [
      "Master SPM marking keywords and associated formulas."
    ]
  },
  "t5_m13_3_3": {
    "lessonId": "t5_m13_3_3",
    "titleBm": "3.3 DGE & Rintangan Dalam",
    "titleDlp": "3.3 EMF & Internal Resistance",
    "chapterBm": "Elektrik",
    "chapterDlp": "Electricity",
    "form": 5,
    "dskpStandard": "SK 3.3 Daya Gerak Elektrik & Rintangan Dalam",
    "summaryPointsBm": [
      "Daya Gerak Elektrik (d.g.e., ε): Tenaga yang dibekalkan oleh sumber kuasa elektrik untuk menggerakkan 1 Coulomb cas mengelilingi satu litar lengkap (unit Volt, V atau J C⁻¹).",
      "Rintangan Dalam (r): Rintangan terhadap pengaliran cas di dalam punca elektrik (bateri/sel).",
      "Persamaan d.g.e.: ε = V + Ir = I(R + r) (di mana V = beza keupayaan terminal, Ir = voltan susut merentasi rintangan dalam).",
      "Graf V melawan I: Pintasan paksi-V mewakili nilai d.g.e. (ε), Kecerunan graf mewakili nilai negatif rintangan dalam (-r)."
    ],
    "summaryPointsDlp": [
      "Electromotive Force (e.m.f., ε): Total energy supplied by electrical source to drive 1 Coulomb charge around complete circuit (unit Volt, V or J C⁻¹).",
      "Internal Resistance (r): Opposition to charge flow within chemical/physical structure of the power source itself.",
      "e.m.f. Equation: ε = V + Ir = I(R + r) (where V = terminal potential difference, Ir = internal voltage drop).",
      "V against I Graph: Y-intercept equals e.m.f. (ε), Gradient equals negative internal resistance (-r)."
    ],
    "spmTipsBm": [
      "SPM 2021 K2BS10(b): Dalam litar tertutup (arus mengalir), bacaan voltmeter merentasi terminal bateri V sentiasa lebih rendah daripada nilai d.g.e. ε bateri kerana berlaku voltan susut (V = ε – Ir).",
      "Dalam litar terbuka (tiada arus I = 0), bacaan voltmeter terminal adalah tepat sama dengan nilai d.g.e. ε."
    ],
    "spmTipsDlp": [
      "SPM 2021 K2BS10(b): In closed circuits (current flowing), terminal voltage V is lower than e.m.f. ε due to internal drop (V = ε – Ir).",
      "In open circuits (current I = 0), terminal voltage precisely measures battery e.m.f. ε."
    ]
  },
  "t5_m14_3_4": {
    "lessonId": "t5_m14_3_4",
    "titleBm": "3.4 Tenaga & Kuasa Elektrik",
    "titleDlp": "3.4 Electrical Energy & Power",
    "chapterBm": "Elektrik",
    "chapterDlp": "Electricity",
    "form": 5,
    "dskpStandard": "SK 3.4 Tenaga & Kuasa Elektrik",
    "summaryPointsBm": [
      "Tenaga Elektrik: E = V I t = I² R t = (V² / R) t = P t (unit Joule, J).",
      "Kuasa Elektrik: P = V I = I² R = V² / R (unit Watt, W = J s⁻¹).",
      "Kecekapan Tenaga: η = (Kuasa Output / Kuasa Input) × 100%.",
      "Pengiraan Kos Elektrik: Bilangan unit (kWj) = [Kuasa (W) / 1000] × Masa (jam). Kos Penggunaan = Bilangan unit (kWj) × Kadar Tarif.",
      "Ciri Keselamatan Elektrik: Fius (dawai plumbum-timah takat lebur rendah), Dawai Bumi (menyalurkan arus bocor ke bumi), Pemutus Litar (MCB & ELCB/RCCB)."
    ],
    "summaryPointsDlp": [
      "Electrical Energy: E = V I t = I² R t = (V² / R) t = P t (unit Joule, J).",
      "Electrical Power: P = V I = I² R = V² / R (unit Watt, W = J s⁻¹).",
      "Energy Efficiency: η = (Output Power / Input Power) × 100%.",
      "Electricity Cost Calculation: Units consumed (kWh) = [Power (W) / 1000] × Time (hours). Total Cost = Units (kWh) × Tariff rate.",
      "Electrical Safety: Fuses (low melting point lead-tin wire), Earth Wire (routes leakage current to ground), Circuit Breakers (MCB & ELCB)."
    ],
    "spmTipsBm": [
      "Kadaran Fius MESTI dipilih sedikit lebih tinggi daripada arus operasi normal perkakas elektrik (cth: arus operasi 4.2 A ⇒ guna fius 5 A).",
      "Fius dan suis MESTI sentiasa dipasang pada Dawai Hidup (Live wire) untuk keselamatan."
    ],
    "spmTipsDlp": [
      "Fuse rating MUST be slightly higher than normal appliance operating current (e.g., 4.2 A current ⇒ 5 A fuse).",
      "Fuses and switches MUST ALWAYS be installed on the Live Wire for user safety."
    ]
  },
  "t5_m15_4_1a": {
    "lessonId": "t5_m15_4_1a",
    "titleBm": "4.1a Fleming Kiri",
    "titleDlp": "4.1a Fleming's Left Hand Rule",
    "chapterBm": "Keelektromagnetan",
    "chapterDlp": "Electromagnetism",
    "form": 5,
    "dskpStandard": "Tingkatan 5 Bab 4: Keelektromagnetan",
    "summaryPointsBm": [
      "Memahami konsep penting 4.1a Fleming Kiri mengikut sukatan DSKP."
    ],
    "summaryPointsDlp": [
      "Understand key concepts of 4.1a Fleming's Left Hand Rule according to DSKP."
    ],
    "spmTipsBm": [
      "Fahami kata kunci pemarkahan SPM dan formula yang terlibat."
    ],
    "spmTipsDlp": [
      "Master SPM marking keywords and associated formulas."
    ]
  },
  "t5_m16_4_1b": {
    "lessonId": "t5_m16_4_1b",
    "titleBm": "4.1b Fleming Kiri",
    "titleDlp": "4.1b Fleming's Left Hand Applications",
    "chapterBm": "Keelektromagnetan",
    "chapterDlp": "Electromagnetism",
    "form": 5,
    "dskpStandard": "Tingkatan 5 Bab 4: Keelektromagnetan",
    "summaryPointsBm": [
      "Memahami konsep penting 4.1b Fleming Kiri mengikut sukatan DSKP."
    ],
    "summaryPointsDlp": [
      "Understand key concepts of 4.1b Fleming's Left Hand Applications according to DSKP."
    ],
    "spmTipsBm": [
      "Fahami kata kunci pemarkahan SPM dan formula yang terlibat."
    ],
    "spmTipsDlp": [
      "Master SPM marking keywords and associated formulas."
    ]
  },
  "t5_m17_4_2": {
    "lessonId": "t5_m17_4_2",
    "titleBm": "4.2 Induksi Elektromagnet",
    "titleDlp": "4.2 Electromagnetic Induction",
    "chapterBm": "Keelektromagnetan",
    "chapterDlp": "Electromagnetism",
    "form": 5,
    "dskpStandard": "SK 4.2 Aruhan Elektromagnet & Fleming Kanan",
    "summaryPointsBm": [
      "Aruhan Elektromagnet ialah penghasilan d.g.e. aruhan merentasi suatu konduktor apabila terdapat pemotongan garis fluks magnet atau perubahan fluks magnet yang memaut konduktor.",
      "Hukum Faraday: Magnitud d.g.e. aruhan berkadar terus dengan kadar pemotongan fluks magnet (atau kadar perubahan pautan fluks magnet).",
      "Hukum Lenz: Arah arus aruhan sentiasa mengalir pada arah yang menentang perubahan fluks magnet yang menghasilkannya.",
      "Petua Tangan Kanan Fleming (Penjana): Menentukan arah arus aruhan bagi dawai lurus yang bergerak merentasi medan magnet.",
      "Penjana Elektrik: Menukarkan tenaga mekanikal kepada tenaga elektrik. Penjana a.u. menggunakan gelang gelincir, penjana a.t. menggunakan komutator gelang terbelah."
    ],
    "summaryPointsDlp": [
      "Electromagnetic Induction is production of induced e.m.f. across conductor when there is relative cutting or change of magnetic flux linkage.",
      "Faraday's Law: Magnitude of induced e.m.f. is directly proportional to rate of cutting of magnetic flux linkage.",
      "Lenz's Law: Direction of induced current opposes the change in magnetic flux that produces it.",
      "Fleming's Right-Hand Rule (Generators): Determines induced current direction for straight conductor moving through magnetic field.",
      "Electric Generators: Convert mechanical energy into electrical energy. A.C. generator uses slip rings; D.C. generator uses split-ring commutator."
    ],
    "spmTipsBm": [
      "Aplikasi Hukum Lenz: Apabila kutub Utara magnet ditolak mendekati solenoid, hujung solenoid menjadi kutub Utara (menolak). Apabila ditarik menjauh, hujung tersebut menjadi kutub Selatan (menarik).",
      "Gunakan Petua Genggaman Tangan Kanan untuk menentukan arah arus aruhan pada solenoid."
    ],
    "spmTipsDlp": [
      "Lenz's Law in Action: Pushing North pole into solenoid induces North pole (repulsion). Pulling North pole away induces South pole (attraction).",
      "Use Right-Hand Grip Rule to determine induced current circulation around solenoid."
    ]
  },
  "t5_m18_4_3a": {
    "lessonId": "t5_m18_4_3a",
    "titleBm": "4.3a Transformer",
    "titleDlp": "4.3a Transformer",
    "chapterBm": "Keelektromagnetan",
    "chapterDlp": "Electromagnetism",
    "form": 5,
    "dskpStandard": "Tingkatan 5 Bab 4: Keelektromagnetan",
    "summaryPointsBm": [
      "Memahami konsep penting 4.3a Transformer mengikut sukatan DSKP."
    ],
    "summaryPointsDlp": [
      "Understand key concepts of 4.3a Transformer according to DSKP."
    ],
    "spmTipsBm": [
      "Fahami kata kunci pemarkahan SPM dan formula yang terlibat."
    ],
    "spmTipsDlp": [
      "Master SPM marking keywords and associated formulas."
    ]
  },
  "t5_m19_4_3b": {
    "lessonId": "t5_m19_4_3b",
    "titleBm": "4.3b Transformer",
    "titleDlp": "4.3b Transformer Efficiency",
    "chapterBm": "Keelektromagnetan",
    "chapterDlp": "Electromagnetism",
    "form": 5,
    "dskpStandard": "Tingkatan 5 Bab 4: Keelektromagnetan",
    "summaryPointsBm": [
      "Memahami konsep penting 4.3b Transformer mengikut sukatan DSKP."
    ],
    "summaryPointsDlp": [
      "Understand key concepts of 4.3b Transformer Efficiency according to DSKP."
    ],
    "spmTipsBm": [
      "Fahami kata kunci pemarkahan SPM dan formula yang terlibat."
    ],
    "spmTipsDlp": [
      "Master SPM marking keywords and associated formulas."
    ]
  },
  "t5_m20_5_1": {
    "lessonId": "t5_m20_5_1",
    "titleBm": "5.1 Elektron",
    "titleDlp": "5.1 Electrons & Thermionic Emission",
    "chapterBm": "Elektronik",
    "chapterDlp": "Electronics",
    "form": 5,
    "dskpStandard": "SK 5.1 Pancaran Termion & Tiub Sinar Katod",
    "summaryPointsBm": [
      "Pancaran Termion: Proses pemancaran elektron bebas daripada permukaan logam yang dipanaskan oleh filamen.",
      "Sinar Katod: Alur elektron berhalaju tinggi yang memecut dari katod (-) ke anod (+) di dalam tiub vakum di bawah beza keupayaan voltan lampau tinggi (V.L.T.).",
      "Ciri Sinar Katod: (1) Bergerak dalam garis lurus, (2) Mempunyai jisim dan momentum, (3) Bercas negatif, (4) Terpesong ke arah plat positif dalam medan elektrik dan terpesong mengikut Petua Tangan Kiri Fleming dalam medan magnet, (5) Menghasilkan pendarcahayaan pada skrin berpendarflour.",
      "Penukaran Tenaga: Tenaga Keupayaan Elektrik = Tenaga Kinetik Maksimum ⇒ E = e V = ½ m v_maks² ⇒ Halaju Maksimum v_maks = √(2eV / m)."
    ],
    "summaryPointsDlp": [
      "Thermionic Emission: Emission of free electrons from heated metal surface by electric filament.",
      "Cathode Rays: High-speed electron beam accelerating from cathode (-) to anode (+) inside evacuated vacuum tube under Extra High Tension (E.H.T.).",
      "Cathode Ray Properties: (1) Travels in straight lines, (2) Possesses mass and momentum, (3) Negatively charged, (4) Deflects towards positive plate in electric fields and follows Fleming's Left-Hand Rule in magnetic fields, (5) Causes fluorescence on phosphor screens.",
      "Energy Conversion: Electrical Potential Energy = Maximum Kinetic Energy ⇒ E = e V = ½ m v_max² ⇒ Maximum Velocity v_max = √(2eV / m)."
    ],
    "spmTipsBm": [
      "Nilai pemalar cas elektron e = 1.6 × 10⁻¹⁹ C dan jisim elektron m_e = 9.11 × 10⁻³¹ kg.",
      "Tiub sinar katod MESTI berada dalam keadaan vakum tinggi untuk mengelakkan perlanggaran elektron dengan molekul udara."
    ],
    "spmTipsDlp": [
      "Fundamental constants: Electron charge e = 1.6 × 10⁻¹⁹ C and electron mass m_e = 9.11 × 10⁻³¹ kg.",
      "Cathode-ray tubes MUST be highly evacuated to prevent electron collisions with gas molecules."
    ]
  },
  "t5_m21_5_2": {
    "lessonId": "t5_m21_5_2",
    "titleBm": "5.2 Diod Semikonduktor",
    "titleDlp": "5.2 Semiconductor Diode",
    "chapterBm": "Elektronik",
    "chapterDlp": "Electronics",
    "form": 5,
    "dskpStandard": "SK 5.2 Diod Semikonduktor & Rektifikasi",
    "summaryPointsBm": [
      "Diod Semikonduktor: Komponen elektronik simpang p-n yang membenarkan arus mengalir dalam satu arah sahaja.",
      "Pendopan Semikonduktor: Proses menambah atom bendasing ke dalam semikonduktor intrinsik (Silikon/Germanium) untuk meningkatkan kekonduksian elektriknya.",
      "Semikonduktor Jenis-n: Didopkan dengan atom pentavalen (Fosforus/Arsenik) ⇒ Pembawa cas majoriti: Elektron bebas.",
      "Semikonduktor Jenis-p: Didopkan dengan atom trivalen (Boron/Indium) ⇒ Pembawa cas majoriti: Lohong (holes).",
      "Pincang Depan (Forward Bias): Anod p disambung ke terminal positif (+) bateri dan Katod n ke terminal negatif (-) ⇒ Lapisan susutan menipis ⇒ Arus mengalir.",
      "Rektifikasi: Proses menukar arus ulang-alik (a.u.) kepada arus terus (a.t.). Rektifikasi gelombang separuh (1 diod), Rektifikasi gelombang penuh (jambatan 4 diod). Kapasitor bertindak sebagai perata arus (smoothing capacitor)."
    ],
    "summaryPointsDlp": [
      "Semiconductor Diode: A p-n junction electronic device permitting current flow in one forward direction only.",
      "Semiconductor Doping: Adding impurity atoms into intrinsic semiconductors (Silicon/Germanium) to enhance electrical conductivity.",
      "n-type Semiconductor: Doped with pentavalent atoms (Phosphorus/Arsenic) ⇒ Majority carriers: Free electrons.",
      "p-type Semiconductor: Doped with trivalent atoms (Boron/Indium) ⇒ Majority carriers: Holes.",
      "Forward Bias: p-anode connected to battery (+), n-cathode to (-) ⇒ Depletion layer narrows ⇒ Current flows.",
      "Rectification: Converting alternating current (a.c.) into direct current (d.c.). Half-wave rectification (1 diode), Full-wave bridge rectification (4 diodes). Smoothing capacitor levels voltage ripples."
    ],
    "spmTipsBm": [
      "Pincang Songsang (Reverse Bias): Katod n disambung ke (+) dan Anod p ke (-) ⇒ Lapisan susutan melebar ⇒ Tiada arus mengalir.",
      "Kapasitor disambungkan secara SELARI dengan perintang beban untuk menghasilkan arus terus yang licin dan rata."
    ],
    "spmTipsDlp": [
      "Reverse Bias: n-cathode to (+) and p-anode to (-) ⇒ Depletion layer expands ⇒ Zero current conduction.",
      "Smoothing capacitor connects in PARALLEL with load resistor to smooth out rectified d.c. output ripples."
    ]
  },
  "t5_m22_5_3": {
    "lessonId": "t5_m22_5_3",
    "titleBm": "5.3 Transistor",
    "titleDlp": "5.3 Transistor",
    "chapterBm": "Elektronik",
    "chapterDlp": "Electronics",
    "form": 5,
    "dskpStandard": "SK 5.3 Transistor sebagai Suis & Amplifier",
    "summaryPointsBm": [
      "Transistor mempunyai 3 terminal: Pengeluar (Emitter, E), Tapak (Base, B), dan Pengumpul (Collector, C). Jenis: npn dan pnp (anak panah terminal E sentiasa menghala mengikut arah arus konvensional).",
      "Hubungan Arus: I_e = I_b + I_c (di mana I_b sangat kecil, I_c besar).",
      "Transistor sebagai Penguat Arus (Amplifier): Perubahan kecil pada arus tapak I_b menghasilkan perubahan besar pada arus pengumpul I_c. Faktor gandaan arus: β = I_c / I_b.",
      "Transistor sebagai Suis Automatik: Berfungsi berdasarkan litar pembahagi voltan: V_B = [R_B / (R₁ + R_B)] × V_total. Transistor HIDUP (ON) apabila voltan tapak V_B ≥ 0.7 V (bagi transistor silikon).",
      "Aplikasi Suis Automatik: Suis kawalan cahaya gelap (LDR / Perintang Peka Cahaya di kedudukan R_B), Suis kawalan suhu / penggera kebakaran (Termistor di kedudukan R₁)."
    ],
    "summaryPointsDlp": [
      "Transistors feature 3 terminals: Emitter (E), Base (B), and Collector (C). Types: npn and pnp (emitter arrow denotes conventional current flow).",
      "Current Relationship: I_e = I_b + I_c (where I_b is microamps, I_c is milliamps).",
      "Transistor as Current Amplifier: Small input base current I_b controls large collector current I_c. Amplification factor: β = I_c / I_b.",
      "Transistor as Automatic Switch: Governed by potential divider equation: V_B = [R_B / (R₁ + R_B)] × V_total. Transistor switches ON when base voltage V_B ≥ 0.7 V (silicon).",
      "Automatic Switch Applications: Darkness-activated streetlights (LDR at R_B position), Fire/heat alarm circuits (Thermistor at R₁ position)."
    ],
    "spmTipsBm": [
      "SPM 2021 K2AS4: Dalam litar suis kawalan cahaya automatik waktu malam, rintangan LDR bertambah tinggi apabila gelap ⇒ voltan tapak V_B meningkat melepasi 0.7 V ⇒ arus tapak I_b mengalir ⇒ transistor ON ⇒ lampu menyala.",
      "Perintang siri perlindungan tapak dipasang untuk mengehadkan arus I_b supaya transistor tidak rosak terbakar."
    ],
    "spmTipsDlp": [
      "SPM 2021 K2AS4: In automatic night streetlight switch, LDR resistance surges in darkness ⇒ base voltage V_B exceeds 0.7 V ⇒ base current I_b flows ⇒ transistor turns ON ⇒ lamp lights up.",
      "Base series resistor protects transistor from excessive base current burn-out."
    ]
  },
  "t5_m23_6_1a": {
    "lessonId": "t5_m23_6_1a",
    "titleBm": "6.1a Reputan Radioaktif",
    "titleDlp": "6.1a Radioactive Decay",
    "chapterBm": "Fizik Nuklear",
    "chapterDlp": "Nuclear Physics",
    "form": 5,
    "dskpStandard": "Tingkatan 5 Bab 6: Fizik Nuklear",
    "summaryPointsBm": [
      "Memahami konsep penting 6.1a Reputan Radioaktif mengikut sukatan DSKP."
    ],
    "summaryPointsDlp": [
      "Understand key concepts of 6.1a Radioactive Decay according to DSKP."
    ],
    "spmTipsBm": [
      "Fahami kata kunci pemarkahan SPM dan formula yang terlibat."
    ],
    "spmTipsDlp": [
      "Master SPM marking keywords and associated formulas."
    ]
  },
  "t5_m24_6_1b": {
    "lessonId": "t5_m24_6_1b",
    "titleBm": "6.1b Reputan Radioaktif & Separuh Hayat",
    "titleDlp": "6.1b Half-life & Decay Curve",
    "chapterBm": "Fizik Nuklear",
    "chapterDlp": "Nuclear Physics",
    "form": 5,
    "dskpStandard": "Tingkatan 5 Bab 6: Fizik Nuklear",
    "summaryPointsBm": [
      "Memahami konsep penting 6.1b Reputan Radioaktif & Separuh Hayat mengikut sukatan DSKP."
    ],
    "summaryPointsDlp": [
      "Understand key concepts of 6.1b Half-life & Decay Curve according to DSKP."
    ],
    "spmTipsBm": [
      "Fahami kata kunci pemarkahan SPM dan formula yang terlibat."
    ],
    "spmTipsDlp": [
      "Master SPM marking keywords and associated formulas."
    ]
  },
  "t5_m25_6_2a": {
    "lessonId": "t5_m25_6_2a",
    "titleBm": "6.2a Tenaga Nuklear",
    "titleDlp": "6.2a Nuclear Energy",
    "chapterBm": "Fizik Nuklear",
    "chapterDlp": "Nuclear Physics",
    "form": 5,
    "dskpStandard": "Tingkatan 5 Bab 6: Fizik Nuklear",
    "summaryPointsBm": [
      "Memahami konsep penting 6.2a Tenaga Nuklear mengikut sukatan DSKP."
    ],
    "summaryPointsDlp": [
      "Understand key concepts of 6.2a Nuclear Energy according to DSKP."
    ],
    "spmTipsBm": [
      "Fahami kata kunci pemarkahan SPM dan formula yang terlibat."
    ],
    "spmTipsDlp": [
      "Master SPM marking keywords and associated formulas."
    ]
  },
  "t5_m26_6_2b": {
    "lessonId": "t5_m26_6_2b",
    "titleBm": "6.2b Tenaga Nuklear & Pelakuran",
    "titleDlp": "6.2b Nuclear Fusion & Reactor",
    "chapterBm": "Fizik Nuklear",
    "chapterDlp": "Nuclear Physics",
    "form": 5,
    "dskpStandard": "Tingkatan 5 Bab 6: Fizik Nuklear",
    "summaryPointsBm": [
      "Memahami konsep penting 6.2b Tenaga Nuklear & Pelakuran mengikut sukatan DSKP."
    ],
    "summaryPointsDlp": [
      "Understand key concepts of 6.2b Nuclear Fusion & Reactor according to DSKP."
    ],
    "spmTipsBm": [
      "Fahami kata kunci pemarkahan SPM dan formula yang terlibat."
    ],
    "spmTipsDlp": [
      "Master SPM marking keywords and associated formulas."
    ]
  },
  "t5_m27_7_1a": {
    "lessonId": "t5_m27_7_1a",
    "titleBm": "7.1a Teori Kuantum Cahaya",
    "titleDlp": "7.1a Quantum Theory of Light",
    "chapterBm": "Fizik Kuantum",
    "chapterDlp": "Quantum Physics",
    "form": 5,
    "dskpStandard": "Tingkatan 5 Bab 7: Fizik Kuantum",
    "summaryPointsBm": [
      "Memahami konsep penting 7.1a Teori Kuantum Cahaya mengikut sukatan DSKP."
    ],
    "summaryPointsDlp": [
      "Understand key concepts of 7.1a Quantum Theory of Light according to DSKP."
    ],
    "spmTipsBm": [
      "Fahami kata kunci pemarkahan SPM dan formula yang terlibat."
    ],
    "spmTipsDlp": [
      "Master SPM marking keywords and associated formulas."
    ]
  },
  "t5_m28_7_1b": {
    "lessonId": "t5_m28_7_1b",
    "titleBm": "7.1b Teori Kuantum Cahaya",
    "titleDlp": "7.1b Duality of Light & Wave-Particle",
    "chapterBm": "Fizik Kuantum",
    "chapterDlp": "Quantum Physics",
    "form": 5,
    "dskpStandard": "Tingkatan 5 Bab 7: Fizik Kuantum",
    "summaryPointsBm": [
      "Memahami konsep penting 7.1b Teori Kuantum Cahaya mengikut sukatan DSKP."
    ],
    "summaryPointsDlp": [
      "Understand key concepts of 7.1b Duality of Light & Wave-Particle according to DSKP."
    ],
    "spmTipsBm": [
      "Fahami kata kunci pemarkahan SPM dan formula yang terlibat."
    ],
    "spmTipsDlp": [
      "Master SPM marking keywords and associated formulas."
    ]
  },
  "t5_m29_7_2": {
    "lessonId": "t5_m29_7_2",
    "titleBm": "7.2 Kesan Fotoelektrik",
    "titleDlp": "7.2 Photoelectric Effect",
    "chapterBm": "Fizik Kuantum",
    "chapterDlp": "Quantum Physics",
    "form": 5,
    "dskpStandard": "SK 7.2 Kesan Fotoelektrik",
    "summaryPointsBm": [
      "Kesan Fotoelektrik: Pembebasan elektron (fotoelektron) daripada permukaan logam apabila disinari oleh alur cahaya yang mempunyai frekuensi mencukupi.",
      "Frekuensi Ambang (f₀): Frekuensi minimum foton cahaya yang diperlukan untuk membebaskan fotoelektron daripada permukaan logam.",
      "Panjang Gelombang Ambang (λ₀): Panjang gelombang maksimum foton cahaya yang boleh membebaskan fotoelektron: λ₀ = c / f₀.",
      "Fungsi Kerja (W = h f₀): Tenaga minimum yang diperlukan oleh fotoelektron untuk terlepas daripada ikatan permukaan logam.",
      "3 Ciri Utama Kesan Fotoelektrik: (1) Fotoelektron dipancarkan serta-merta tanpa lengah masa jika f ≥ f₀, (2) Tenaga kinetik maksimum fotoelektron bergantung kepada frekuensi cahaya f, BUKAN keamatan cahaya, (3) Keamatan cahaya hanya meningkatkan bilangan fotoelektron yang terpancar sesaat (arus fotoelektrik), bukan tenaga elektron."
    ],
    "summaryPointsDlp": [
      "Photoelectric Effect: Emission of electrons (photoelectrons) from metal surface when illuminated by light of sufficient frequency.",
      "Threshold Frequency (f₀): Minimum photon frequency required to liberate photoelectrons from metal surface.",
      "Threshold Wavelength (λ₀): Maximum photon wavelength capable of liberating photoelectrons: λ₀ = c / f₀.",
      "Work Function (W = h f₀): Minimum energy required to liberate photoelectrons from metal surface binding forces.",
      "3 Fundamental Properties: (1) Photoelectron emission occurs instantaneously without delay when f ≥ f₀, (2) Maximum kinetic energy depends on light frequency f, NOT light intensity, (3) Light intensity increases number of emitted photoelectrons per second (photoelectric current), not individual electron energy."
    ],
    "spmTipsBm": [
      "Jika frekuensi cahaya f < f₀: Tiada fotoelektron terpancar sama sekali walau sekuat mana pun keamatan cahaya ditingkatkan!",
      "Logam dengan fungsi kerja W rendah (cth: Sesium, Kalium) memerlukan tenaga ambang yang lebih rendah untuk memancarkan fotoelektron."
    ],
    "spmTipsDlp": [
      "If light frequency f < f₀: Zero photoelectrons are emitted regardless of light intensity!",
      "Alkali metals with low work function W (e.g., Caesium, Potassium) require lower threshold energies for photoemission."
    ]
  },
  "t5_m30_7_3a": {
    "lessonId": "t5_m30_7_3a",
    "titleBm": "7.3a Fotoelektrik Einstein",
    "titleDlp": "7.3a Einstein's Photoelectric Equation",
    "chapterBm": "Fizik Kuantum",
    "chapterDlp": "Quantum Physics",
    "form": 5,
    "dskpStandard": "Tingkatan 5 Bab 7: Fizik Kuantum",
    "summaryPointsBm": [
      "Memahami konsep penting 7.3a Fotoelektrik Einstein mengikut sukatan DSKP."
    ],
    "summaryPointsDlp": [
      "Understand key concepts of 7.3a Einstein's Photoelectric Equation according to DSKP."
    ],
    "spmTipsBm": [
      "Fahami kata kunci pemarkahan SPM dan formula yang terlibat."
    ],
    "spmTipsDlp": [
      "Master SPM marking keywords and associated formulas."
    ]
  },
  "t5_m31_7_3b": {
    "lessonId": "t5_m31_7_3b",
    "titleBm": "7.3b Fotoelektrik Einstein & Aplikasi",
    "titleDlp": "7.3b Photoelectric Applications",
    "chapterBm": "Fizik Kuantum",
    "chapterDlp": "Quantum Physics",
    "form": 5,
    "dskpStandard": "Tingkatan 5 Bab 7: Fizik Kuantum",
    "summaryPointsBm": [
      "Memahami konsep penting 7.3b Fotoelektrik Einstein & Aplikasi mengikut sukatan DSKP."
    ],
    "summaryPointsDlp": [
      "Understand key concepts of 7.3b Photoelectric Applications according to DSKP."
    ],
    "spmTipsBm": [
      "Fahami kata kunci pemarkahan SPM dan formula yang terlibat."
    ],
    "spmTipsDlp": [
      "Master SPM marking keywords and associated formulas."
    ]
  }
};

export const getLessonCheatNote = (lessonId: string): LessonCheatNote | undefined => {
  return allLessonCheatNotes[lessonId];
};
