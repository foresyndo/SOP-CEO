export interface CompanyInfo {
  namaPerusahaan: string;
  bidangUsaha: string;
  skalaPerusahaan: 'UMKM' | 'MENENGAH' | 'NASIONAL' | 'INTERNASIONAL';
  jumlahKaryawan: string;
  lokasiOperasional: string;
  bentukUsaha: string;
  visiPerusahaan: string;
  misiPerusahaan: string;
  nomorDokumen: string;
  nomorRevisi: string;
  tanggalBerlaku: string;
  disusunOleh: string;
  diperiksaOleh: string;
  disetujuiOleh: string;
}

export interface KPIItem {
  id: number;
  kpi: string;
  definisi: string;
  target: string;
  bobot: number; // percentage
  metodePengukuran: string;
  frekuensiEvaluasi: string;
  realisasi: number; // direct rating or percentage
}

export interface RiskItem {
  kategori: string;
  identifikasi: string;
  dampak: string;
  mitigasi: string;
  pemilik: string;
  level: 'RENDAH' | 'SEDANG' | 'TINGGI' | 'KRITIS';
}

export interface RACIRow {
  aktivitas: string;
  ceo: 'R' | 'A' | 'C' | 'I' | '-';
  komisaris: 'R' | 'A' | 'C' | 'I' | '-';
  direkturKeuangan: 'R' | 'A' | 'C' | 'I' | '-';
  direkturOperasional: 'R' | 'A' | 'C' | 'I' | '-';
  direkturSdm: 'R' | 'A' | 'C' | 'I' | '-';
}

export interface InvestasiForm {
  id: string;
  judulInvestasi: string;
  nilaiInvestasi: string;
  kajianFinansial: string;
  kajianRisiko: string;
  kajianHukum: string;
  status: 'Draft' | 'Diajukan' | 'Disetujui' | 'Ditolak';
  tanggalPengajuan: string;
}

export interface AnggaranForm {
  id: string;
  namaDivisi: string;
  alokasiAnggaran: string;
  keperluan: string;
  justifikasiBisnis: string;
  status: 'Draft' | 'Disetujui' | 'Butuh Revisi';
  tanggalPengajuan: string;
}

export interface EvaluasiDireksiForm {
  id: string;
  namaDirektur: string;
  posisi: string;
  nilaiKepemimpinan: number;
  nilaiKinerja: number;
  catatanKritis: string;
  tanggalEvaluasi: string;
}
