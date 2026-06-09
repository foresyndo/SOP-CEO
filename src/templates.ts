import { CompanyInfo } from './types';

export function getSOPChapters(info: CompanyInfo) {
  const {
    namaPerusahaan,
    bidangUsaha,
    skalaPerusahaan,
    jumlahKaryawan,
    lokasiOperasional,
    bentukUsaha,
    visiPerusahaan,
    misiPerusahaan,
    nomorDokumen,
    nomorRevisi,
    tanggalBerlaku,
    disusunOleh,
    diperiksaOleh,
    disetujuiOleh
  } = info;

  return [
    {
      id: 1,
      title: "1. HALAMAN PENGESAHAN",
      content: `DOKUMEN STANDAR OPERASIONAL PROSEDUR (SOP)
DIREKTUR UTAMA (CHIEF EXECUTIVE OFFICER)
${bentukUsaha} ${namaPerusahaan}

==================================================
NO. DOKUMEN   : ${nomorDokumen}
NO. REVISI    : ${nomorRevisi}
TANGGAL       : ${tanggalBerlaku}
KLASIFIKASI   : SANGAT RAHASIA / EKSEKUTIF
==================================================

DOKUMEN INI TELAH DIKAJI, DIAMANDEMEN, DAN DISAHKAN UNTUK BERLAKU SECARA RESMI DI SELURUH UNIT OPERASIONAL ${bentukUsaha} ${namaPerusahaan}.

DISUSUN OLEH:
Jabatan   : ${disusunOleh}
Tanggal   : ${tanggalBerlaku}
Status    : Telah Ditandatangani Secara Digital (Digital Signature Authenticated)

DIPERIKSA OLEH:
Jabatan   : ${diperiksaOleh}
Tanggal   : ${tanggalBerlaku}
Status    : Lolos Verifikasi Komite Kebijakan GCG & Kepatuhan Internal

DISETUJUI & DISAHKAN OLEH:
Jabatan   : ${disetujuiOleh}
Tanggal   : ${tanggalBerlaku}
Status    : Disahkan dalam Rapat Umum Pemegang Saham (RUPS) / Dewan Komisaris

---
KETENTUAN HUKUM & HAK CIPTA:
Seluruh materi dalam dokumen Standard Operating Procedure (SOP) ini merupakan milik intelektual mutlak dari ${bentukUsaha} ${namaPerusahaan}. Dilarang keras menyalin, menyebarluaskan, atau mengutip sebagian atau seluruh isi dokumen ini tanpa persetujuan tertulis resmi dari Direktur Utama.`
    },
    {
      id: 2,
      title: "2. LATAR BELAKANG JABATAN CEO",
      content: `Sebagai pemimpin tertinggi sruktural pada ${bentukUsaha} ${namaPerusahaan} yang bergerak di bidang ${bidangUsaha} skala ${skalaPerusahaan}, jabatan Direktur Utama (CEO) mengemban amanah integratif untuk mengarahkan seluruh roda organisasi menuju target pertumbuhan jangka panjang yang berkesinambungan.

Dalam lanskap bisnis modern yang volatile, kompleks, dan kompetitif, seorang Direktur Utama bukan sekadar administrator tertinggi, melainkan "Chief Architect" pelaksana visi strategis pemegang saham. Jabatan ini diwajibkan untuk mensinergikan kapabilitas sumber daya internal dengan dinamika pasar global, sambil tetap memegang teguh tata kelola yang bersih serta kepatuhan penuh terhadap regulasi yang berlaku di Republik Indonesia.

Tantangan mengelola organisasi berukuran ${skalaPerusahaan} dengan total tenaga kerja mencapai ${jumlahKaryawan} karyawan menuntut kepemimpinan yang adaptif, transparan, dan visioner. Direktur Utama bertanggung jawab penuh atas penciptaan nilai (value creation) bagi pemegang saham (shareholders) serta kontribusi positif bagi seluruh pemangku kepentingan (stakeholders) di wilayah operasional ${lokasiOperasional} dan mitranya.`
    },
    {
      id: 3,
      title: "3. TUJUAN SOP",
      content: `Standard Operating Procedure (SOP) Direktur Utama ini disusun dengan tujuan-tujuan strategis sebagai berikut:

1. Standardisasi Kepemimpinan Eksekutif: Menjadikan pedoman baku dalam eksekusi kepemimpinan agar terhindar dari bias pengambilan keputusan yang emosional atau tidak berbasis data.
2. Kepastian Hukum & Kepatuhan: Menjamin setiap tindakan direksi senantiasa sejalan dengan anggaran dasar perusahaan dan peraturan perundang-undangan di Indonesia.
3. Kejelasan Batas Wewenang: Menentukan batasan wewenang keuangan, operasional, hukum, dan kepegawaian yang objektif antara Direktur Utama, Dewan Komisaris, dan jajaran Direksi lainnya.
4. Optimalisasi Manajemen Risiko: Menyediakan mekanisme preventif, detektif, dan korektif dalam mengelola volatilitas risiko finansial maupun reputational.
5. Akuntabilitas & Transparansi Kinerja: Meletakkan ukuran Key Performance Indexes (KPI) mutakhir untuk menilai kontribusi Direktur Utama secara objektif di hadapan para Pemegang Saham.`
    },
    {
      id: 4,
      title: "4. DASAR HUKUM DAN REGULASI",
      content: `Operasionalisasi wewenang dan tugas Direktur Utama pada ${bentukUsaha} ${namaPerusahaan} berpijak pada fondasi hukum formal yang mutlak dan mengikat, antara lain:

1. Undang-Undang No. 40 Tahun 2007 tentang Perseroan Terbatas (UU PT): Khususnya Bab VII mengenai Direksi dan Dewan Komisaris (Pasal 92 s.d. Pasal 107) yang menegaskan kewajiban Direksi mengurus Perseroan untuk kepentingan dan tujuan Perseroan serta bertindak selaku perwakilan sah Perseroan baik di dalam maupun di luar pengadilan.
2. Undang-Undang No. 13 Tahun 2003 tentang Ketenagakerjaan beserta peraturan perubahannya dalam UU Cipta Kerja: Mengatur tanggung jawab CEO dalam pembinaan hubungan industrial yang harmonis serta pemenuhan hak-hak normatif ${jumlahKaryawan} karyawan perusahaan.
3. Standar Manajemen Mutu ISO 9001:2015 Ref Klausa 5 (Leadership): Mengamanatkan komitmen manajemen puncak terhadap sistem manajemen mutu, penentuan fokus pelanggan, penyusunan kebijakan mutu, dan pembagian tanggung jawab operasional.
4. Prinsip-Prinsip Good Corporate Governance (GCG) dari KNKG (Komite Nasional Kebijakan Governance):
   - Transparansi (Transparency)
   - Akuntabilitas (Accountability)
   - Pertanggungjawaban (Responsibility)
   - Independensi (Independency)
   - Kewajaran (Fairness)
5. Anggaran Dasar (AD/ART) ${bentukUsaha} ${namaPerusahaan}: Ketentuan internal yang merinci modal disetor, pembatasan transaksi benturan kepentingan, serta mekanisme Rapat Umum Pemegang Saham (RUPS).`
    },
    {
      id: 5,
      title: "5. VISI DAN MISI CEO",
      content: `Dalam memimpin jalannya perusahaan, Direktur Utama menyusun Visi dan Misi Jabatan Eksekutif yang diselaraskan dengan Visi dan Misi Utama dari ${bentukUsaha} ${namaPerusahaan}:

VISI PERUSAHAAN:
"${visiPerusahaan}"

MISI PERUSAHAAN:
${misiPerusahaan}

VISI KEPEMIMPINAN CEO (CEO's Vision Matrix):
Menjadikan ${bentukUsaha} ${namaPerusahaan} sebagai pemimpin pasar kelas dunia di industri ${bidangUsaha} yang unggul dalam tata kelola, inovatif dalam teknologi, kokoh secara finansial, dan berorientasi pada kepuasan pelanggan serta keberlanjutan lingkungan.

MISI KEPEMIMPINAN CEO:
1. Akselerasi Pertumbuhan Nilai Korporasi: Mengupayakan peningkatan pangsa pasar dan profitabilitas berkelanjutan melalui efisiensi operasional tinggi.
2. Standardisasi GCG Berkelanjutan: Membangun kultur transparansi dan nihil-toleransi terhadap fraud/korupsi di semua lini.
3. Transformasi Human Capital: Membina dan mendidik ${jumlahKaryawan} karyawan sebagai aset intelektual utama melalui pelatihan kepemimpinan modern.
4. Sinergi Stakeholder: Menjalin kolaborasi strategis tingkat nasional dan internasional dengan para investor, pemerintah, masyarakat, dan asosiasi bisnis.`
    },
    {
      id: 6,
      title: "6. STRUKTUR KEDUDUKAN CEO DALAM ORGANISASI",
      content: `Direktur Utama (CEO) memegang posisi kepemimpinan struktural tertinggi dalam tata kelola operasional ${bentukUsaha} ${namaPerusahaan}.

GARIS REPORTING & AKUNTABILITAS:
1. Rapat Umum Pemegang Saham (RUPS): Pemegang kekuasaan tertinggi dalam perseroan. CEO mempertanggungjawabkan seluruh pencapaian strategis, kebijakan finansial, dan laporan tahunan pada forum RUPS.
2. Dewan Komisaris: Pengawas independen atas kebijakan kepengurusan yang dilakukan oleh Direksi. CEO melakukan pelaporan rutin berkala dan berkonsultasi mengenai rencana jangka panjang perusahaan.
3. Jajaran Direksi: CEO mengepalai secara langsung jajaran direktorat (misal: Direktur Keuangan/CFO, Direktur Operasional/COO, Direktur SDM/CHRO, Direktur Bisnis/CBDO). CEO memegang hak veto atas keputusan lintas-direktorat untuk menjaga keselarasan visi perusahaan.
4. Komite Audit & Manajemen Risiko: Berkoordinasi dekat dengan CEO untuk mengawal kepatuhan dan mendeteksi anomali operasional.`
    },
    {
      id: 7,
      title: "7. TUGAS POKOK CEO (DETAILED BREAKDOWN)",
      content: `Tugas pokok Direktur Utama dikelompokkan ke dalam 7 (tujuh) pilar kepemimpinan utama berorientasi hasil makro:

A. STRATEGIC LEADERSHIP
1. Formulasi Rencana Jangka Panjang Perusahaan (RJPP) berdurasi 5 (lima) tahun yang diturunkan menjadi Rencana Kerja dan Anggaran Perusahaan (RKAP) tahunan.
2. Menentukan arsitektur portofolio bisnis dan menentukan prioritas perluasan pasar domestik dan global.
3. Menetapkan kebijakan korporasi yang bersifat umum maupun khusus (Corporate Policy Guidelines) sebagai standar bertindak seluruh personel.

B. CORPORATE GOVERNANCE
1. Menjamin kepatuhan mutlak atas seluruh regulasi ketenagakerjaan, perpajakan, lingkungan, dan hukum industri terkait di Indonesia.
2. Mengembangkan Whistleblowing System (WBS) dan menerapkan sistem kendali internal antipenyuapan ISO 37001.
3. Mempertahankan skor GCG korporat di atas indeks minimal "Sangat Baik" melalui audit pihak ketiga independen.

C. FINANCIAL LEADERSHIP
1. Memvalidasi proyeksi keuangan tahunan dan menjamin kelangsungan rasio likuiditas, solvabilitas, dan rentabilitas perusahaan.
2. Menyetujui dan memonitor arus kas (Cashflow monitoring) mingguan serta mengendalikan tingkat belanja modal (CapEx) agar tidak melebihi anggaran disetujui.
3. Menandatangani keputusan investasi, divestasi, atau pembiayaan perbankan bernilai strategis.

D. OPERATIONAL LEADERSHIP
1. Memimpin Rapat Direksi mingguan guna mengevaluasi performa operasional seluruh direktorat struktural.
2. Membina sistem manajemen mutu terpadu untuk memastikan kualitas produk/layanan di bidang ${bidangUsaha} memenuhi ekspektasi klien global.
3. Mengawasi realisasi proyek strategis (Strategic Project Deliverables) agar selesai tepat waktu, tepat mutu, dan tepat anggaran.

E. HUMAN CAPITAL LEADERSHIP
1. Menetapkan strategi retensi talenta terbaik di tengah kompetisi industri yang ketat.
2. Memimpin komite nominasi dan remunerasi internal untuk jenjang kepangkatan manajerial ke atas.
3. Menyetujui proses rekrutmen, mutasi, promosi, demosi, dan terminasi pegawai pada level Manajer, Kepala Divisi, hingga Vice President.

F. BUSINESS DEVELOPMENT & INNOVATION
1. Merumuskan inisiatif Merger, Acquisition, and Joint Venture (M&A/JV) guna mempercepat pertumbuhan anorganik.
2. Mendorong riset dan pengembangan berbasis teknologi digital guna melahirkan model bisnis baru yang disrupsi-resisten.
3. Membuka jaringan kemitraan multinasional dan menginisiasi kerja sama lisensi atau ekspor teknologi.

G. STAKEHOLDER MANAGEMENT
1. Bertindak selaku pembicara utama (Key Spokesperson) perusahaan dalam forum resmi, konferensi pers, dan presentasi investor global.
2. Membangun hubungan diplomatik yang harmonis dengan regulator pembuat kebijakan pemerintah daerah maupun pusat.
3. Melaksanakan tanggung jawab sosial lingkungan (TJSL/CSR) yang berdampak langsung pada kesejahteraan komunitas lokal.`
    },
    {
      id: 8,
      title: "8. WEWENANG FORMAL DIREKTUR UTAMA",
      content: `Direktur Utama ${bentukUsaha} ${namaPerusahaan} dibekali dengan wewenang sah yang melekat secara yuridis guna memastikan ketangkasan organisasi:

1. Wewenang Kebijakan Finansial & Investasi (Authorization Matrix):
   - Persetujuan Belanja Operasional (OpEx) di luar Rencana Kerja Anggaran Perusahaan (RKAP) s.d limit Rp10.000.000.000 (Sepuluh Miliar Rupiah) per transaksi. Transaksi di atas limit wajib mendapatkan persetujuan tertulis Dewan Komisaris.
   - Penentuan dan persetujuan belanja modal (CapEx) strategis yang telah disetujui dalam RKAP tanpa batasan limit.
2. Wewenang Hukum & Perjanjian:
   - Penandatanganan nota kesepahaman (MoU), Memorandum of Agreement (MoA), dan kontrak kerja sama bisnis jangka panjang internasional.
   - Mewakili PT di dalam dan di luar pengadilan, termasuk memberikan kuasa khusus kepada tim legal atau penasihat hukum eksternal.
3. Wewenang Personalia & Struktur:
   - Menetapkan mutasi struktural dan promosi promotor internal tingkat Direktur Muda dan General Manager.
   - Menetapkan perubahan gaji berkala dan bonus insentif tahunan karyawan berdasarkan realisasi target korporasi.`
    },
    {
      id: 9,
      title: "9. KEY PERFORMANCE INDICATORS (KPI) MATRIKS",
      content: `Pencapaian kinerja Direktur Utama diukur dengan parameter Key Performance Indicators (KPI) kuantitatif yang dievaluasi secara berkala oleh Dewan Komisaris:

KPI MATRIKS DIREKTUR UTAMA:

1. Revenue Growth (Bobot: 15%)
   - Definisi: Persentase pertumbuhan pendapatan tahun-ke-tahun (YoY).
   - Target: Minimal tumbuh 15% - 25% sesuai skala perusahaan ${skalaPerusahaan}.
   - Pengukuran: Laporan Keuangan Teraudit (Audited Financial Reports).
   - Frekuensi: Triwulan & Tahunan.

2. Net Profit Margin Growth (Bobot: 15%)
   - Definisi: Skala kenaikan laba bersih setelah pajak dibanding periode sebelumnya.
   - Target: Kontribusi profit margin minimal 12% dari total omset.
   - Pengukuran: Laporan Rugi-Laba (Income Statement).
   - Frekuensi: Bulanan & Tahunan.

3. Free Cash Flow Health (Bobot: 10%)
   - Definisi: Ketersediaan sisa aliran kas bebas untuk ekspansi atau pembagian dividen.
   - Target: Rasio Cash Flow berkelanjutan positif di atas > 1.5x kewajiban lancar.
   - Pengukuran: Cash Flow Statement.
   - Frekuensi: Bulanan.

4. Market Expansion Index (Bobot: 10%)
   - Definisi: Penetrasi geografis baru atau peluncuran produk inovasi baru di sektor ${bidangUsaha}.
   - Target: Penambahan minimal 2 (dua) wilayah pasar baru atau 3 (tiga) produk andalan per tahun.
   - Pengukuran: Laporan Riset Pangsa Pasar (Market Share Study).
   - Frekuensi: Triwulan.

5. Customer Satisfaction Index / CSI (Bobot: 10%)
   - Definisi: Tingkat kepuasan mutlak pelanggan atas layanan/produk.
   - Target: CSI minimal mencapai skor > 88% pada skala survei terpercaya.
   - Pengukuran: Net Promoter Score (NPS) & Customer Survey.
   - Frekuensi: Semesteran.

6. Employee Engagement & Retensi (Bobot: 10%)
   - Definisi: Tingkat kebetahan dan produktivitas karyawan pasca-program retensi SDM.
   - Target: Tingkat turnover karyawan inti terkendali di bawah < 8% per tahun.
   - Pengukuran: Survei Keterikatan Karyawan Independen (HR Employee Engagement Survey).
   - Frekuensi: Tahunan.

7. Audit & Corporate Compliance GCG (Bobot: 10%)
   - Definisi: Kepatuhan tata kelola hukum perusahaan dan pelaporan tepat waktu.
   - Target: Nilai kepatuhan 100%, nihil denda dari regulator, opini Wajar Tanpa Pengecualian (WTP).
   - Pengukuran: Laporan Auditor Eksternal Kantor Akuntan Publik (KAP) Big 4 & Audit Hukum.
   - Frekuensi: Tahunan.

8. Strategic Projects Completion Rate (Bobot: 10%)
   - Definisi: Persentase penyelesaian milestone proyek prioritas tinggi.
   - Target: Realisasi penyelesaian proyek di angka > 95% sesuai jadwal (On-time Completion).
   - Pengukuran: Berita Acara Serah Terima (BAST) & Project Dashboard.
   - Frekuensi: Bulanan & Triwulan.

9. Corporate Risk Mitigation Index (Bobot: 10%)
   - Definisi: Pengendalian paparan risiko operasional, keuangan, dan hukum.
   - Target: Seluruh temuan mitigasi risiko dengan status tinggi/kritis diselesaikan dalam waktu kurang dari < 30 hari.
   - Pengukuran: Laporan Komite Manajemen Risiko.
   - Frekuensi: Triwulan.`
    },
    {
      id: 10,
      title: "10. SOP KEGIATAN HARIAN DIREKTUR UTAMA",
      content: `Setiap harinya, Direktur Utama wajib mengalokasikan waktu secara efektif dengan skedul terstruktur untuk menjamin efisiensi pengawasan kepemimpinan:

A. JAM 07.00 - 09.00: EVALUASI INTERNAL & REVIEW ANALITIS
- Review Executive Dashboard: Memeriksa ringkasan metrik kinerja korporasi secara real-time yang mencakup pendapatan harian, realisasi target penjualan, status utilisasi pabrik/layanan.
- Review Cashflow & Likuiditas: Memantau arus kas masuk dan keluar yang signifikan, saldo rekening utama bank, serta persetujuan pembayaran mendesak berisiko denda.
- Review Laporan Temuan Operasional: Membaca secara komprehensif nota laporan ringkas per hari yang dikirimkan oleh Asisten Eksekutif mengenai insiden keselamatan kerja, kendala teknis krusial di wilayah kerja ${lokasiOperasional}, serta aduan pelanggan besar.

B. JAM 09.00 - 12.00: INTERAKSI STRATEGIS & RAPAT DIREKSI/STAKEHOLDER
- Rapat Direksi Mingguan (Board of Directors Daily/Weekly Briefs): Mengadakan pertemuan koordinasi terbatas dengan CFO, COO, dan Unit Kerja untuk memantau status target taktis.
- Rapat Hubungan Investor: Menerima konsultasi investor eksisting atau uji kepatutan modal dengan calon investor eksternal baru dari global markets.
- Negosiasi Kemitraan Klien Strategis: Menghadiri penandatanganan kerja sama komersial atau penyelesaian keluhan klien berskala prioritas tinggi.

C. JAM 13.00 - 17.00: PENGAMBILAN KEPUTUSAN & PERSETUJUAN DOKUMEN
1. Pengkajian dan pembubuhan tanda tangan persetujuan atas memorandum pengeluaran anggaran investasi berskala menengah ke atas.
2. Rapat pembahasan revisi aturan kepegawaian bersama Direktur SDM guna menjaga iklim keterikatan karyawan tetap kondusif bagi ${jumlahKaryawan} karyawan.
3. Analisis dokumen kajian hukum yang disiapkan tim legal mengenai sengketa bisnis atau klaim kontraktual mitra usaha.
4. Refleksi individual & penyusunan pidato/rencana langkah strategis untuk tantangan hari esok.`
    },
    {
      id: 11,
      title: "11. SOP RAPAT DIREKSI (BOARD MEETINGS)",
      content: `Untuk memelihara harmoni operasional dan akuntabilitas pengambilan keputusan berkelanjutan, Rapat Direksi diatur dengan skema ketat sebagai berikut:

ALUR RAPAT DIREKSI:
1. Persiapan Agenda (T-5 Sebelum Rapat): Sekretaris Direksi menghimpun topik-topik prioritas tinggi dari seluruh direktorat dan menyebarkan agenda definitif kepada direksi.
2. Pengumpulan Data Pendukung (T-3 Sebelum Rapat): Seluruh direktur diwajibkan menyertakan bahan presentasi, laporan keuangan sementara, dan naskah alternatif analisis masalah yang relevan guna didistribusikan kepada peserta rapat.
3. Rapat Direksi (Hari H):
   - Dipimpin langsung oleh Direktur Utama.
   - Rapat sah hanya apabila sekurang-kurangnya dihadiri oleh lebih dari > 2/3 anggota Direksi lengkap.
   - Diskusi berfokus pada penyelesaian sumbatan operasional (unblocking bottlenecks) dan persetujuan kebijakan strategis.
4. Pengambilan Keputusan: Keputusan diutamakan tercapai berdasarkan musyawarah mufakat demi mewujudkan semangat kepemimpinan kolegial. Apabila gagal, keputusan ditentukan berdasarkan voting mayoritas di mana suara Direktur Utama memegang bobot penentu akhir.
5. Penulisan Risalah Rapat (Minutes of Meeting / MoM): Sekretariat wajib mencatat detail keputusan, narasi keberatan, serta penanggung jawab (PIC) eksekusi.
6. Penugasan & Eksekusi: Penerbitan Instruksi Direktur Utama formal kepada pihak internal.
7. Monitoring & Evaluasi: Pencapaian target tugas dipantau melalui dashboard operasional mingguan.`
    },
    {
      id: 12,
      title: "12. SOP PERSETUJUAN INVESTASI BARU DAN CAPEX",
      content: `Persetujuan alokasi dana investasi korporasi wajib meminimalkan potensi kegagalan modal (loss of capital) melalui tata kelola berlapis:

ALUR PROSEDUR PERSETUJUAN INVESTASI:
1. Usulan Prakarsa Investasi: Unit Kerja atau Tim Business Development menyusunan dokumen Proposal Inisiasi Investasi lengkap dengan studi kelayakan teknis awal.
2. Kajian Finansial Mendalam (Financial Due Diligence): Direktorat Keuangan melakukan simulasi parameter kelayakan finansial yang ketat:
   - Target Internal Rate of Return (IRR) minimal > 18% per tahun.
   - Payback Period di bawah < 4 Tahun.
   - Net Present Value (NPV) wajib bernilai Positif.
3. Kajian Risiko Terintegrasi: Komite Pengendali Risiko mengidentifikasi sensitivitas target terhadap fluktuasi pasar, ancaman geopolitik, dan inflasi biaya konstruksi/pengadaan.
4. Kajian Hukum Sektor Industri: Tim Corporate Legal membubuhkan paraf kepatuhan yang menjamin tidak adanya potensi jebakan sengketa lahan, legalitas pemilikan lisensi, serta ancaman regulasi antipencucian uang.
5. Verifikasi & Keputusan Direktur Utama: CEO meneliti dokumen telaah staf gabungan dari aspek komersial dan menyetujui, meminta tinjau ulang, atau menolak usulan.
6. Eksekusi & Penerbitan Surat Perintah Kerja: Tim pengadaan memulai proses tender terbuka berorientasi nilai terbaik (best value tender).
7. Monitoring & Audit Pasca-Investasi: Audit internal berkala tiap 6 bulan sekali untuk mengawal deviasi pengembalian modal sesungguhnya dibandingkan studi kelayakan awal.`
    },
    {
      id: 13,
      title: "13. SOP PENGAMBILAN KEPUTUSAN STRATEGIS",
      content: `Pengambilan keputusan yang berisiko mengubah model operasional bisnis wajib mengikuti metodologi berbasis ilmiah dan data (Data-Driven Decision Making Process):

SKEMA STRUKTUR LOGIKA PENGAMBILAN KEPUTUSAN:
1. Identifikasi Masalah: Menghindari kekeliruan analisis dengan mendefinisikan gejala vs akar masalah nyata melalui diagram tulang ikan (Ishikawa diagram) atau analisis "5-Whys".
2. Pengumpulan Data Kualitatif & Kuantitatif: Mengumpulkan laporan empiris, laporan tren industri eksternal, opini konsultan ahli terakreditasi, serta suara dari ${jumlahKaryawan} karyawan di lapangan.
3. Analisis Skenario Dampak & Kajian Risiko: Mensimulasikan alternatif skenario:
   - Skenario Optimis (Best Case Scenario)
   - Skenario Moderat (Base Case Scenario)
   - Skenario Pesimis (Worst Case Scenario)
4. Perumusan Solusi Alternatif: Merumuskan minimal 3 (tiga) opsi taktis lengkap dengan anggaran biaya, kebutuhan modal kerja, serta proyeksi kegagalan operasional.
5. Keputusan Direktur Utama: CEO menetapkan opsi terbaik secara tertulis dan mengomunikasikan instruksi tersebut dengan bahasa yang lugas, tak bersayap, dan penuh kepastian arah.
6. Komunikasi & Manajemen Perubahan: Penyesuaian organisasi dipandu secara humanis agar tidak memicu keresahan serikat pekerja atau mitra dagang.
7. Evaluasi Hasil: Peninjauan ulang indikator kesuksesan dalam Rapat Koordinasi Direksi 30 hari pasca-keputusan beroperasi.`
    },
    {
      id: 14,
      title: "14. SOP MANAJEMEN RISIKO DIREKTUR UTAMA",
      content: `Manajemen Risiko Korporat di bawah kendali komite khusus yang bertanggung jawab langsung menyampaikan mitigasi kepada Direktur Utama secara rutin:

A. MATRIKS RISIKO UTAMA PERUSAHAAN:

1. Risiko Keuangan (Volatilitas Arus Kas & Kurs Valuta Asing)
   - Mitigasi: Kebijakan lindung nilai (hedging) atas transaksi valas penting, pemeliharaan cadangan dana setara kas untuk operasional 6 (enam) bulan ke depan, dan diversifikasi penempatan perbankan.

2. Risiko Operasional (Hambatan Rantai Pasok & Kerusakan Aset Fisik)
   - Mitigasi: Standardisasi program pemeliharaan preventif (Planned Preventive Maintenance) pada infrastruktur IT dan peralatan produksi di ${lokasiOperasional}, serta sertifikasi pemasok cadangan (backup suppliers).

3. Risiko Hukum (Perselisihan Kontrak Bisnis & Perubahan Perda)
   - Mitigasi: Pelaksanaan Due Diligence komprehensif atas rekam jejak mitra baru dan memastikan tim legal mengamankan klausul penataan hukum (force majeure, arbitration clause) yang menguntungkan PT.

4. Risiko Reputasi (Disinformasi Media Sosial & Sentimen Negatif Publik)
   - Mitigasi: Penyusunan Corporate Communication crisis protocol, manajemen respons media searah oleh humas resmi, serta peluncuran berkala laporan dampak keberlanjutan yang kredibel.

5. Risiko Organisasi & SDM (Kelangkaan Talenta / Mogok Kerja Serikat Pekerja)
   - Mitigasi: Penyusunan paket remunerasi berorientasi meritokrasi bagi ${jumlahKaryawan} karyawan, program pembinaan karir yang adil, serta pembukaan jalur diskusi dua arah bipartit.

6. Risiko Keamanan Data & Teknologi (Bocornya Data Rahasia Bisnis / Siber-serangan)
   - Mitigasi: Penerapan standar ISO 27001 secara bertahap, enkripsi menyeluruh pada lalu lintas data eksekutif, pelatihan anti-phishing berkala bagi staf kantor, serta pemeliharaan server cadangan terpisah.`
    },
    {
      id: 15,
      title: "15. SOP HUBUNGAN PEMERINTAH DAN INVESTOR (GIR)",
      content: `Penciptaan iklim diplomasi bisnis yang kondusif menyyaratkan pembinaan hubungan profesional dengan regulator dan penyedia modal:

PROTOKOL HUBUNGAN DENGAN PEMERINTAH (GOVERNMENT RELATIONS):
1. Direktur Utama didampingi tim Legal/PR wajib memastikan kepemilikan seluruh izin usaha dasar (OSS-RBA, AMDAL, Sertifikat Laik Fungsi, Lisensi Sektoral) dalam keadaan lengkap dan aktif.
2. Setiap kali ada audit kunjungan dinas dari pejabat kementerian atau pemerintah daerah di lokasi operasional ${lokasiOperasional}, CEO bersikap kooperatif dan memaparkan kontribusi ketenargakerjaan berupa penciptaan lapangan kerja bagi ${jumlahKaryawan} warga setempat.
3. Menghindari segala bentuk lobi transaksional gelap dan selalu menyalurkan bantuan sosial melalui skema tanggung jawab sosial perusahaan formal (TJSL/CSR) yang transparan.

PROTOKOL HUBUNGAN DENGAN INVESTOR (INVESTOR RELATIONS):
1. Menggelar forum paparan publik (Public Expose) triwulanan secara inklusif dan profesional guna mempresentasikan perkembangan laporan keuangan terkini.
2. Menyajikan portal informasi digital hubungan investor yang mutakhir, transparan, dan mudah diunduh publik di situs resmi perusahaan.
3. Memberikan respons atas pertanyaan atau kuesioner dari lembaga analisis keuangan dalam tenggat waktu maksimal 3x24 jam kerja.`
    },
    {
      id: 16,
      title: "16. SOP PENANGANAN KRISIS KORPORASI",
      content: `Krisis didefinisikan sebagai peristiwa krusial yang dapat menghentikan operasi atau menghancurkan kredibilitas perusahaan dalam hitungan jam.

PROTOKOL TATA KELOLA KRISIS:
1. Status Siaga & Pembentukan Crisis Management Center (CMC):
   Apabila terjadi insiden fatal (cyber breach besar, sengketa pidana direksi, demo buruh anarkis, kecelakaan kerja fatal), Sekretaris Perusahaan mengaktifkan CMC dalam waktu < 60 menit sejak kejadian teridentifikasi.
2. Penunjukan Juru Bicara Tunggal:
   Direktur Utama bertindak sebagai Juru Bicara Utama atau menunjuk Kepala Unit Corporate Communication secara resmi. Anggota direksi lain dan karyawan biasa dilarang keras memberikan pernyataan berbau opini kepada jurnalis.
3. Pengisolasian Insiden & Investigasi Cepat:
   Tim Operasional segera mengamankan tempat kejadian perkara, menonaktifkan jaringan sistem yang terinfeksi malware, atau menghentikan lini produksi berisiko sementara waktu guna membatasi dampak kerugian material.
4. Publikasi Sikap Resmi yang Empatis (Communication Protocol):
   Mengakui fakta insiden secara terbuka, menghindari menyalahkan pihak luar di muka umum, menyampaikan belasungkawa/permohonan maaf yang tulus, serta menggarisbawahi komitmen bantuan medis/ganti rugi tuntas.
5. Perbaikan & Restorasi Kepercayaan:
   Melayangkan laporan berkala proses pemulihan operasional kepada publik dan mengajak regulator melakukan investigasi bersama guna membuktikan komitmen kepatuhan.`
    },
    {
      id: 17,
      title: "17. SOP PELAPORAN KEPADA DEWAN KOMISARIS",
      content: `Direktur Utama berkewajiban menjaga akuntabilitas vertikal melalui sirkulasi laporan berkala kepada Dewan Komisaris:

SIKLUS PELAPORAN DIREKSI KEPADA KOMISARIS:

1. Laporan Dashboard Mingguan (Weekly Flash Executive Summary)
   - Isi: Status kas bank gabungan, tren kecelakaan kerja, milestone sengketa hukum mendesak, serta progress fisik proyek utama. Disampaikan setiap Senin pagi via aplikasi aman enkripsi.

2. Laporan Operasional Bulanan (Monthly Execution Report)
   - Isi: Perbandingan realisasi pendapatan/biaya terhadap anggaran (RKAP), rasio likuiditas terkini, KPI departemen, serta laporan dari tim manajemen kualitas. Disampaikan maksimal tanggal 10 bulan berikutnya.

3. Laporan Kinerja Triwulanan (Quarterly Business Review)
   - Isi: Evaluasi portofolio bisnis, kondisi persaingan pasar di sektor ${bidangUsaha}, paparan mitigasi risiko tinggi, serta prognosis performa semester berikutnya. Disampaikan dalam forum rapat tatap muka resmi triwulanan.

4. Laporan Keuangan Tengah Tahun (Semi-Annual Financial Report)
   - Isi: Laporan audit terbatas dari KAP independen beserta laporan kepatuhan GCG menyeluruh.

5. Laporan Tahunan Terintegrasi (Annual Consolidated Report)
   - Isi: Dokumen pertanggungjawaban lengkap manajemen direksi selama 1 tahun buku berjalan yang meliputi tinjauan keuangan, tata kelola lingkungan (ESG), serta proyeksi tahun mendatang. Diajukan minimal 30 hari sebelum Rapat Umum Pemegang Saham (RUPS) Tahunan.`
    },
    {
      id: 18,
      title: "18. KODE ETIK DIREKTUR UTAMA (CEO CODE OF CONDUCT)",
      content: `Demi menjaga keluhuran martabat perusahaan, Direktur Utama wajib menjadi teladan utama (role model) dalam menegakkan norma etika profesional tertinggi:

1. Integritas Tanpa Kompromi: Mengutamakan kepentingan kemajuan perseroan di atas kepentingan ekonomi pribadi, golongan, atau afiliasi politik tertentu.
2. Transparansi & Kejujuran: Melaporkan kondisi keuangan dan hambatan bisnis apa adanya kepada pemegang saham tanpa adanya upaya manipulasi pembukuan (creative accounting).
3. Akuntabilitas & Tanggung Jawab: Tidak melemparkan kesalahan sanksi hukum atau kegagalan bisnis eksekusi taktis kepada bawahan.
4. Nihil-Toleransi Korupsi, Kolusi, & Nepotisme (No-KKN Policy):
   - Menerapkan larangan penerimaan uang pelicin, komisi terselubung, tiket dinas ilegal, dan gratifikasi dalam bentuk apa pun dari vendor/klien.
   - Pendaftaran secara periodik kekayaan atau keterlibatan aset pribadi dalam Laporan Harta Kekayaan Eksekutif Perusahaan.
5. Pencegahan Benturan Kepentingan (Conflict of Interest Prevention):
   - CEO dilarang ikut serta dalam pengambilan keputusan pengadaan barang/jasa apabila terdapat keterlibatan keluarga Inti atau modal pribadi pada perusahaan vendor terafiliasi.
   - Menyampaikan pernyataan deklarasi benturan kepentingan (Conflict of Interest Disclosure Statement) secara tertulis kepada Dewan Komisaris setiap tahun.`
    },
    {
      id: 19,
      title: "19. RACI MATRIX MATRIKS TATA KELOLA UTAMA",
      content: `RACI Matrix merinci peran fungsional dalam alur bisnis paling vital guna menihilkan tumpang tindih wewenang (R: Responsible, A: Accountable, C: Consulted, I: Informed):

| Aktivitas Korporat Vital | Direktur Utama (CEO) | Dewan Komisaris | Dir. Keuangan (CFO) | Dir. Operasional (COO) | Dir. SDM (CHRO) |
|-------------------------|----------------------|-----------------|---------------------|------------------------|-----------------|
| Penyusunan RJPP & RKAP  | A                    | C / I           | R                   | R                      | R               |
| Persetujuan CapEx Besar | A                    | A / C           | R                   | R                      | -               |
| Audit Laporan Keuangan  | A                    | C / I           | R                   | I                      | -               |
| Rekrutmen VP & Manager  | A                    | I               | C                   | C                      | R               |
| Hubungan Kehumasan & PR | R / A                | I               | C                   | C                      | C               |
| Penanganan Isu Krisis   | R / A                | I               | C                   | C                      | C               |
| Perubahan AD/ART & Modal| C                    | R / A           | C                   | -                      | -               |`
    },
    {
      id: 20,
      title: "20. FORMULIR PENDUKUNG STANDAR OPERASIONAL (TEMPLATES)",
      content: `Berikut adalah cetak biru template formulir yang wajib digunakan oleh unit kerja sebagai syarat kelayakan administratif pengajuan persetujuan eksekutif kepada Direktur Utama:

[FORMULIR SOP - 01: PERSETUJUAN INVESTASI BARU (INVESTMENT PROPOSAL & APPROVAL SHEET)]
Nomor Pengajuan  : [Generated by System]
Unit Pemrakarsa : ___________________________
Nilai Proyek     : Rp _______________________
Parameter Kelayakan Finansial:
- IRR            : ____ %
- NPV            : Rp _______________________
- Payback Period : ____ Tahun
Lampiran Kajian  : [ ] Teknis [ ] Finansial [ ] Hukum [ ] Risiko
Status Keputusan : [ ] DISETUJUI TUNTAS
                   [ ] DITOLAK SEPENUHNYA
                   [ ] DIKEMBALIKAN UNTUK TINJAUAN ULANG
Catatan Pengarah : __________________________________________________________________
Tanda Tangan Direktur Utama: ____________________

---

[FORMULIR SOP - 02: PERNYATAAN BENTURAN KEPENTINGAN NYata (CONFLICT OF INTEREST BI-ANNUAL DISCLOSURE)]
Nama Lengkap     : ___________________________
Jabatan Eksekutif: ___________________________
Pertanyaan Deklarasi:
Apakah Anda memiliki afiliasi dagang, kepemilikan saham, atau hubungan kekerabatan langsung dengan para vendor yang mengajukan tender aktif sepanjang semester berjalan?
[ ] TIDAK ADA hubungan sama sekali.
[ ] ADA hubungan (Sebutkan rincian korporasi terafiliasi & potensi nilai pengadaan):
Rincian: __________________________________________________________________________
Tanda Tangan Pelapor: ____________________

---

[FORMULIR SOP - 03: FORMULIR EVALUASI TAHUNAN DIREKSI (EXECUTIVE BOARD PERFORMANCE EVALUATION)]
Nama Direktur    : ___________________________
Posisi Jabatan   : ___________________________
Metrik Evaluasi  :
1. Kepemimpinan Tim & Budaya Kerja (Skala 1-5) : ____
2. Pencapaian KPI Direktorat Terkait (Skala 1-5): ____
3. Kepatuhan Berdasar Sistem Audit Mutu (Skala 1-5): ____
Ulasan Kualitatif : __________________________________________________________________
Rekomendasi Karir : [ ] Pertahankan Tanpa Syarat
                   [ ] Butuh Pembinaan Khusus & Evaluasi Ulang 3 Bulan
                   [ ] Demosi / Pembebasan Tugas
Tanda Tangan Penilai (CEO) : ____________________`
    },
    {
      id: 21,
      title: "21. EXECUTIVE DASHBOARD PERSYARATAN MINIMAL",
      content: `Persyaratan minimal sistem penayangan data eksekutif (Executive Dashboard System) Direktur Utama PT modern mencakup:

1. Visualisasi Real-Time Indikator Keuangan (Financial Indicators Widget):
   - Grafik garis perkembangan EBITDA harian.
   - Peta panas (Heatmap) pengeluaran anggaran CapEx per divisi.
   - Indikator jarum (Gauge indicator) Cash Burn Rate jangka menengah.
2. Pemantauan Proyek Prioritas (Strategic Projects Milestone Progress):
   - Diagram Gantt digital yang memuat persentase penyelesaian fisik versus target kalender.
   - Sinyal peringatan warna (RAG - Red, Amber, Green Status): Merah untuk kemacetan kritis, Kuning untuk waspada keterlambatan material, Hijau untuk aman sesuai jadwal.
3. Indeks Sektor Risiko Korporasi (Corporate Risk Index Dashboard):
   - Matriks 5x5 peta tingkat dampak vs probabilitas terjadinya bahaya operasional.
   - Log pelacakan denda regulasi, insiden keselamatan kerja, dan persentase keluhan pelanggan tertunda.`
    },
    {
      id: 22,
      title: "22. STANDAR KOMPETENSI EKSEKUTIF DIREKTUR UTAMA",
      content: `Seorang Direktur Utama pada ${bentukUsaha} ${namaPerusahaan} wajib memenuhi kualifikasi ketat kompetensi kepemimpinan internasional berikut:

KOMPETENSI INTI & PRASYARAT TEKNIS:
1. Strategic & Analytical Thinking (Bobot: 15%): Kemampuan menangkap peluang pasar mikro di industri ${bidangUsaha}, merajut tren disrupsi digital, dan menyusun peta jalan bisnis berdaya tahan tinggi.
2. Financial Astuteness & Literacy (Bobot: 15%): Pemahaman mendalam mengenai teknik rekayasa keuangan, struktur modal, merger dan akuisisi, optimalisasi pajak korporasi, serta pembacaan laporan terintegrasi kompleks.
3. Masterclass Negotiation Skills (Bobot: 15%): Kapabilitas melakukan diplomasi bisnis berskala global guna memenangkan konsesi kontrak besar dengan nilai komersial tinggi.
4. Corporate Governance & GCG Stewardship (Bobot: 15%): Memahami struktur hukum Indonesia yang berlaku untuk PT, kepabeanan, ketenagakerjaan, UU persaingan usaha tidak sehat, serta prinsip ISO 9001:2015.
5. High-Impact Public Speaking & Spokesmanship (Bobot: 15%): Karisma memotivasi ${jumlahKaryawan} karyawan, meyakinkan pemegang saham dalam kondisi suram, serta tampil elegan di hadapan sorotan media nasional.
6. Crisis Command & Resilience (Bobot: 15%): Tenang di bawah tekanan ekstrim, bertindak taktis menghalau krisis, bersikap ksatria mengambil tanggung jawab, serta tanggap merestorasi operasional.`
    },
    {
      id: 23,
      title: "23. TARGET KINERJA TAHUNAN DIREKTUR UTAMA (ANNUAL BUSINESS PLAN)",
      content: `Setiap awal tahun buku, Direktur Utama menetapkan resolusi target korporasi yang wajib disahkan oleh Dewan Komisaris:

TARGET TAHUNAN DIREKTUR UTAMA:
1. Target Pertumbuhan Pendapatan (Revenue Expansion Baseline): Mengamankan perluasan bisnis dengan nominal pertumbuhan senilai minimal Rp 50 Miliar hingga Rp 500 Miliar (menyesuaikan kondisi makroekonomi).
2. Efisiensi Biaya Operasional (Operational Cost Optimization): Memotong biaya non-baku dan pemborosan administrasi minimal sebanyal 12% melalui digitalisasi ERP terpadu.
3. Zero Fatal Accident Standards (K3): Menjaga tingkat kecelakaan nihil sepanjang 365 hari kalender penuh di seluruh kompleks kantor dan wilayah kerja ${lokasiOperasional}.
4. ESG Green Certification: Meraih peringkat minimal "SIAGA HIJAU" dalam penilaian pembuangan limbah korporasi serta minimal 1 (satu) program penyerapan karbon aktif mandiri per semester.`
    },
    {
      id: 24,
      title: "24. INDIKATOR KEBERHASILAN JABATAN (KEY SUCCESS INDICATORS)",
      content: `Keberhasilan jangka panjang Direktur Utama diukur secara holistik berdasarkan kriteria reputational dan finansial gabungan:

1. Kelangsungan Suksesi Kepemimpinan (Succession Readiness Index):
Sistem manajerial internal berhasil mematangkan minimal 3 (tiga) calon Direktur Utama masa depan (C-level candidates) dari internal talenta yang siap menjabat kapan saja tanpa memicu disintegrasi operasional.
2. Kematangan Hubungan Industrial (Industrial Peace Index):
Nihil sengketa ketenagakerjaan yang bergulir ke Pengadilan Hubungan Industrial (PHI) dan terjalinnya Perjanjian Kerja Bersama (PKB) yang disepakati secara sukarela oleh serikat pekerja.
3. Citra Merek Premium Terintegrasi (Brand Equity Score):
Peningkatan nilai valuasi merek dagang dan penilaian positif media arus utama yang menempatkan perusahaan sebagai salah satu tempat kerja terbaik (Best Places to Work) di Indonesia.`
    },
    {
      id: 25,
      title: "25. PENUTUP (CLOSING DECREE & COMMITMENT)",
      content: `Standard Operating Procedure (SOP) Direktur Utama ${bentukUsaha} ${namaPerusahaan} ini dirancang sebagai dokumen hidup (living document) yang memandu navigasi kepemimpinan eksekutif korporat moderen. Penguasaan menyeluruh atas seluruh pilar regulasi ini merupakan cerminan komitmen luhur manajemen puncak terpercaya.

Segala amandemen, penambahan klausul, atau pencabutan lampiran dokumen ini wajib didasarkan pada tinjauan formal Komite Kebijakan Tata Kelola Dewan Komisaris serta dilanjutkan dengan sosialisasi menyeluruh guna memastikan pemahaman seutuhnya hingga level staf terbawah.

Ditetapkan dan disahkan secara resmi di Jakarta, Indonesia.

Demi kepatuhan paripurna,
Direktur Utama (CEO)
${bentukUsaha} ${namaPerusahaan}`
    }
  ];
}
