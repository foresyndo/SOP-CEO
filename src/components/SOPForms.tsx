import React, { useState } from 'react';
import { InvestasiForm, AnggaranForm, EvaluasiDireksiForm, CompanyInfo } from '../types';
import { Clipboard, Printer, CheckCircle, Plus, FileText, Landmark, User, LayoutGrid, Check, ArrowRight, QrCode, ShieldCheck, Lock, ExternalLink, X, Key, RefreshCw } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface SOPFormsProps {
  companyInfo: CompanyInfo;
}

export default function SOPForms({ companyInfo }: SOPFormsProps) {
  const [activeFormTab, setActiveFormTab] = useState<'investasi' | 'anggaran' | 'evaluasi'>('investasi');
  const [printPreview, setPrintPreview] = useState<boolean>(false);
  const [submittedAlert, setSubmittedAlert] = useState<boolean>(false);
  
  // QR code verification modal state
  const [selectedQRDoc, setSelectedQRDoc] = useState<{
    id: string;
    tipe: string;
    tanggal: string;
    detail: string;
    hash: string;
    qrString: string;
  } | null>(null);

  // Helper code to generate QR e-Signature data string
  const getQRDataFor = (type: 'investasi' | 'anggaran' | 'evaluasi') => {
    let rawText = '';
    if (type === 'investasi') {
      rawText = `DOKUMEN UTAMA E-SIGN SECURE (GCG VERIFIED)
PT ${companyInfo.namaPerusahaan}
ID Dokumen : ${investasi.id}
Tipe Form  : SOP-01 (Persetujuan Investasi CapEx)
Judul      : ${investasi.judulInvestasi}
Nilai      : ${investasi.nilaiInvestasi}
Otorisator : Direktur Utama (CEO)
Tanggal    : ${investasi.tanggalPengajuan}
Sertifikat : ISO 9001:2015 Ref No #SYS-EQR-ISO9001
Status     : SAH & TERCATAT POSITIF`;
    } else if (type === 'anggaran') {
      rawText = `DOKUMEN UTAMA E-SIGN SECURE (GCG VERIFIED)
PT ${companyInfo.namaPerusahaan}
ID Dokumen : ${anggaran.id}
Tipe Form  : SOP-02 (Alokasi Anggaran OpEx)
Divisi     : ${anggaran.namaDivisi}
Nilai      : ${anggaran.alokasiAnggaran}
Otorisator : Direktur Utama (CEO)
Tanggal    : ${anggaran.tanggalPengajuan}
Sertifikat : ISO 9001:2015 Ref No #SYS-EQR-ISO9001
Status     : APPROVAL DISETUJUI PENUH`;
    } else {
      rawText = `DOKUMEN UTAMA E-SIGN SECURE (GCG VERIFIED)
PT ${companyInfo.namaPerusahaan}
ID Dokumen : ${evaluasi.id}
Tipe Form  : SOP-03 (Evaluasi Kinerja Direksi)
Direktur   : ${evaluasi.namaDirektur} (${evaluasi.posisi})
Skor       : Kepemimpinan Lvl ${evaluasi.nilaiKepemimpinan}, KPI ${evaluasi.nilaiKinerja}
Otorisator : Direktur Utama (CEO)
Tanggal    : ${evaluasi.tanggalEvaluasi}
Status     : TERARSIP DI CLOUD GCG`;
    }
    return encodeURIComponent(rawText);
  };

  // Form states initialized with realistic, premium, pre-filled values
  const [investasi, setInvestasi] = useState<InvestasiForm>({
    id: 'INV-2026-004',
    judulInvestasi: 'Akuisisi Lisensi Otomasi Kecepatan Produksi Sektor ' + companyInfo.bidangUsaha,
    nilaiInvestasi: 'Rp 6.500.000.000',
    kajianFinansial: 'IRR diestimasikan sebesar 21.4%, NPV bernilai positif Rp 1.2M, Payback period 3.2 tahun buku.',
    kajianRisiko: 'Risiko kegagalan penyerapan software rendah, diantisipasi dengan training terpadu bagi staff.',
    kajianHukum: 'Tim Legal menyatakan draf kesepakatan lisensi bebas dari sengketa sanksi eksternal.',
    status: 'Diajukan',
    tanggalPengajuan: '2026-06-09'
  });

  const [anggaran, setAnggaran] = useState<AnggaranForm>({
    id: 'BGR-2026-089',
    namaDivisi: 'Direktorat Operasi & Infrastruktur K3',
    alokasiAnggaran: 'Rp 1.800.000.000',
    keperluan: 'Penyediaan Alat Pelindung Diri Premium & Sertifikasi Ulang ISO Kelayakan Kerja',
    justifikasiBisnis: 'Menjamin nihil kecelakaan kerja (Zero Fatal Accidents) sebagai kriteria evaluasi Komisaris.',
    status: 'Draft',
    tanggalPengajuan: '2026-06-09'
  });

  const [evaluasi, setEvaluasi] = useState<EvaluasiDireksiForm>({
    id: 'EVL-2026-012',
    namaDirektur: 'Faisal Basri, M.B.A.',
    posisi: 'Direktur Keuangan & Pengendali Investasi (CFO)',
    nilaiKepemimpinan: 5,
    nilaiKinerja: 4,
    catatanKritis: 'Sangat andal mengompilasi anggaran di luar dugaan, direkomendasikan opsi promosi perluasan jabatan.',
    tanggalEvaluasi: '2026-06-09'
  });

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmittedAlert(true);
    setTimeout(() => {
      setSubmittedAlert(false);
      setPrintPreview(true);
    }, 1200);
  };

  const handlePrintForm = () => {
    const printWindow = window.open('', '_blank');
    if (printWindow) {
      let content = '';
      if (activeFormTab === 'investasi') {
        content = `
          <h2>[FORMULIR SOP - 01: PERSETUJUAN INVESTASI BARU]</h2>
          <p><strong>Nomor Pengajuan:</strong> ${investasi.id}</p>
          <p><strong>Tanggal Pengajuan:</strong> ${investasi.tanggalPengajuan}</p>
          <p><strong>Judul Usulan Investasi:</strong> ${investasi.judulInvestasi}</p>
          <p><strong>Estimasi Nilai Investasi:</strong> ${investasi.nilaiInvestasi}</p>
          <hr/>
          <h3>Kajian Penilaian Tiga Pilar:</h3>
          <p><strong>1. Kajian Profitabilitas Finansial:</strong> ${investasi.kajianFinansial}</p>
          <p><strong>2. Kajian Mitigasi Risiko:</strong> ${investasi.kajianRisiko}</p>
          <p><strong>3. Kajian Legalitas Hukum PT:</strong> ${investasi.kajianHukum}</p>
          <hr/>
          <p><strong>Status Keputusan Direktur Utama:</strong> DISETUJUI TUNTAS (AUTHORIZED)</p>
          
          <div style="margin-top: 40px; border-top: 1px solid #cbd5e1; padding-top: 20px; display: flex; justify-content: space-between; align-items: center;">
            <div style="display: flex; align-items: center; gap: 12px; border: 1px solid #cbd5e1; padding: 10px; border-radius: 6px; background-color: #f8fafc; max-width: 320px;">
              <img src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${getQRDataFor('investasi')}" style="width: 75px; height: 75px;" referrerPolicy="no-referrer" />
              <div style="font-family: 'Inter', sans-serif;">
                <p style="margin: 0; font-size: 10px; font-weight: bold; color: #1e3a8a;">QR E-SIGN SECURE BSR/GCG</p>
                <p style="margin: 3px 0 0 0; font-size: 9px; font-family: monospace; color: #475569;">UUID: ${investasi.id}</p>
                <p style="margin: 3px 0 0 0; font-size: 9px; color: #16a34a; font-weight: bold;">✓ VERIFIED GCG COMPLIANT</p>
              </div>
            </div>
            <div style="text-align: center; font-family: 'Inter', sans-serif; font-size: 11px;">
              <p style="margin: 0;">Jakarta, ${investasi.tanggalPengajuan}</p>
              <p style="margin: 5px 0 0 0; font-weight: bold; color: #000;">Direktur Utama (CEO)</p>
              <br/><br/>
              <p style="margin: 0; font-weight: bold; font-family: monospace;">PT ${companyInfo.namaPerusahaan}</p>
            </div>
          </div>
        `;
      } else if (activeFormTab === 'anggaran') {
        content = `
          <h2>[FORMULIR SOP - 02: PERSETUJUAN ALOKASI ANGGARAN]</h2>
          <p><strong>Nomor Alokasi:</strong> ${anggaran.id}</p>
          <p><strong>Tanggal Pengajuan:</strong> ${anggaran.tanggalPengajuan}</p>
          <p><strong>Divisi Pemohon:</strong> ${anggaran.namaDivisi}</p>
          <p><strong>Jumlah Alokasi Diajukan:</strong> ${anggaran.alokasiAnggaran}</p>
          <p><strong>Perincian Kebutuhan:</strong> ${anggaran.keperluan}</p>
          <p><strong>Justifikasi Strategis Bisnis:</strong> ${anggaran.justifikasiBisnis}</p>
          <hr/>
          <p><strong>Status Penandatanganan CEO:</strong> DISETUJUI PENUH (STAMPED VERIFIED)</p>
          
          <div style="margin-top: 40px; border-top: 1px solid #cbd5e1; padding-top: 20px; display: flex; justify-content: space-between; align-items: center;">
            <div style="display: flex; align-items: center; gap: 12px; border: 1px solid #cbd5e1; padding: 10px; border-radius: 6px; background-color: #f8fafc; max-width: 320px;">
              <img src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${getQRDataFor('anggaran')}" style="width: 75px; height: 75px;" referrerPolicy="no-referrer" />
              <div style="font-family: 'Inter', sans-serif;">
                <p style="margin: 0; font-size: 10px; font-weight: bold; color: #1e3a8a;">QR E-SIGN SECURE BSR/GCG</p>
                <p style="margin: 3px 0 0 0; font-size: 9px; font-family: monospace; color: #475569;">UUID: ${anggaran.id}</p>
                <p style="margin: 3px 0 0 0; font-size: 9px; color: #16a34a; font-weight: bold;">✓ VERIFIED BUDGET OK</p>
              </div>
            </div>
            <div style="text-align: center; font-family: 'Inter', sans-serif; font-size: 11px;">
              <p style="margin: 0;">Jakarta, ${anggaran.tanggalPengajuan}</p>
              <p style="margin: 5px 0 0 0; font-weight: bold; color: #000;">Direktur Utama (CEO)</p>
              <br/><br/>
              <p style="margin: 0; font-weight: bold; font-family: monospace;">PT ${companyInfo.namaPerusahaan}</p>
            </div>
          </div>
        `;
      } else {
        content = `
          <h2>[FORMULIR SOP - 03: EVALUASI KINERJA DIREKSI (C-LEVEL REVIEW)]</h2>
          <p><strong>Nomor Evaluasi:</strong> ${evaluasi.id}</p>
          <p><strong>Tanggal Evaluasi:</strong> ${evaluasi.tanggalEvaluasi}</p>
          <p><strong>Nama Direktur Dinilai:</strong> ${evaluasi.namaDirektur}</p>
          <p><strong>Posisi Jabatan:</strong> ${evaluasi.posisi}</p>
          <hr/>
          <p><strong>Skor Kompetensi Kepemimpinan (Skala 1-5):</strong> ${evaluasi.nilaiKepemimpinan} / 5</p>
          <p><strong>Skor Pencapaian KPI Divisi (Skala 1-5):</strong> ${evaluasi.nilaiKinerja} / 5</p>
          <p><strong>Ulasan Penilai Direktur Utama:</strong> ${evaluasi.catatanKritis}</p>
          <hr/>
          
          <div style="margin-top: 40px; border-top: 1px solid #cbd5e1; padding-top: 20px; display: flex; justify-content: space-between; align-items: center;">
            <div style="display: flex; align-items: center; gap: 12px; border: 1px solid #cbd5e1; padding: 10px; border-radius: 6px; background-color: #f8fafc; max-width: 320px;">
              <img src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${getQRDataFor('evaluasi')}" style="width: 75px; height: 75px;" referrerPolicy="no-referrer" />
              <div style="font-family: 'Inter', sans-serif;">
                <p style="margin: 0; font-size: 10px; font-weight: bold; color: #1e3a8a;">QR E-SIGN SECURE BSR/GCG</p>
                <p style="margin: 3px 0 0 0; font-size: 9px; font-family: monospace; color: #475569;">UUID: ${evaluasi.id}</p>
                <p style="margin: 3px 0 0 0; font-size: 9px; color: #16a34a; font-weight: bold;">✓ VERIFIED C-LEVEL RECORD</p>
              </div>
            </div>
            <div style="text-align: center; font-family: 'Inter', sans-serif; font-size: 11px;">
              <p style="margin: 0;">Jakarta, ${evaluasi.tanggalEvaluasi}</p>
              <p style="margin: 5px 0 0 0; font-weight: bold; color: #000;">Direktur Utama (CEO)</p>
              <br/><br/>
              <p style="margin: 0; font-weight: bold; font-family: monospace;">PT ${companyInfo.namaPerusahaan}</p>
            </div>
          </div>
        `;
      }

      printWindow.document.write(`
        <html>
          <head>
            <title>Cetak Formulir SOP - PT ${companyInfo.namaPerusahaan}</title>
            <style>
              body { font-family: 'Inter', sans-serif; padding: 40px; color: #1e293b; line-height: 1.6; }
              h2 { font-size: 18px; font-weight: bold; border-bottom: 2px solid #000; padding-bottom: 8px; text-transform: uppercase; }
              hr { border: 0; border-top: 1px solid #ddd; margin: 20px 0; }
            </style>
          </head>
          <body onload="window.print()">
            <div style="max-width: 600px; margin: 0 auto; border: 1px solid #ccc; padding: 30px; border-radius: 8px; box-shadow: 0 4px 6px rgba(0,0,0,0.05);">
              <h1 style="text-align: center; font-size: 20px; font-weight: 850; margin-bottom: 5px;">PT ${companyInfo.namaPerusahaan}</h1>
              <p style="text-align: center; font-size: 11px; color: #555; margin-top: 0; text-transform: uppercase;">Standard Operating Procedure (SOP) Dokumen Lampiran</p>
              ${content}
            </div>
          </body>
        </html>
      `);
      printWindow.document.close();
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm h-[calc(100vh-220px)] min-h-[550px] overflow-y-auto flex flex-col font-sans" id="sop_forms_root_container">
      {/* Tab Selectors */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-100 pb-5 mb-6">
        <div>
          <h2 className="text-lg font-bold text-slate-900 leading-tight">Formulir Pendukung & Templat Otorisasi (Chapter 20)</h2>
          <p className="text-xs text-slate-500 mt-1">Gunakan formulir legal siap pakai ini untuk sirkulasi bukti tertulis kepatuhan perseroan.</p>
        </div>

        <div className="flex bg-slate-100 p-1 rounded">
          <button
            onClick={() => { setActiveFormTab('investasi'); setPrintPreview(false); }}
            className={`px-4 py-2 rounded text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer flex items-center gap-1.5 ${
              activeFormTab === 'investasi' ? 'bg-indigo-900 text-white shadow-sm' : 'text-slate-500 hover:text-indigo-900'
            }`}
            id="tab_form_investasi"
          >
            <Landmark className="h-3.5 w-3.5" />
            <span>Persetujuan Investasi</span>
          </button>
          <button
            onClick={() => { setActiveFormTab('anggaran'); setPrintPreview(false); }}
            className={`px-4 py-2 rounded text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer flex items-center gap-1.5 ${
              activeFormTab === 'anggaran' ? 'bg-indigo-900 text-white shadow-sm' : 'text-slate-500 hover:text-indigo-900'
            }`}
            id="tab_form_budget"
          >
            <Clipboard className="h-3.5 w-3.5" />
            <span>Alokasi Anggaran</span>
          </button>
          <button
            onClick={() => { setActiveFormTab('evaluasi'); setPrintPreview(false); }}
            className={`px-4 py-2 rounded text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer flex items-center gap-1.5 ${
              activeFormTab === 'evaluasi' ? 'bg-indigo-900 text-white shadow-sm' : 'text-slate-500 hover:text-indigo-900'
            }`}
            id="tab_form_evaluation"
          >
            <User className="h-3.5 w-3.5" />
            <span>Evaluasi Direksi</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 flex-1 min-h-0">
        {/* Left Side: Standard Form Inputs */}
        <div className="bg-slate-50/50 rounded-2xl p-6 border border-slate-200/50 h-full flex flex-col justify-between overflow-y-auto" id="form_fillup_box">
          <form onSubmit={handleFormSubmit} className="space-y-4">
            <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider border-b border-slate-200/60 pb-2">
              {activeFormTab === 'investasi' && 'FORM-01: PERSYARATAN INVESTASI BARU'}
              {activeFormTab === 'anggaran' && 'FORM-02: ALOKASI ANGGARAN OPERASIONAL'}
              {activeFormTab === 'evaluasi' && 'FORM-03: PENILAIAN PERFORMA EXECUTIVE'}
            </h3>

            {activeFormTab === 'investasi' && (
              <div className="space-y-4 font-sans text-xs">
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="font-bold text-slate-600 block">Nomor Usulan</label>
                    <input
                      type="text"
                      className="w-full p-2.5 bg-white border border-slate-300 rounded-lg text-slate-800 font-mono font-medium focus:outline-none focus:ring-1 focus:ring-indigo-500"
                      value={investasi.id}
                      onChange={(e) => setInvestasi({ ...investasi, id: e.target.value })}
                      id="input_inv_id"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="font-bold text-slate-600 block">Tanggal Usulan</label>
                    <input
                      type="date"
                      className="w-full p-2.5 bg-white border border-slate-300 rounded-lg text-slate-800 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                      value={investasi.tanggalPengajuan}
                      onChange={(e) => setInvestasi({ ...investasi, tanggalPengajuan: e.target.value })}
                      id="input_inv_date"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-slate-600 block">Judul Usulan Investasi</label>
                  <input
                    type="text"
                    className="w-full p-2.5 bg-white border border-slate-300 rounded-lg text-slate-800 font-semibold focus:outline-none focus:ring-1 focus:ring-indigo-500"
                    value={investasi.judulInvestasi}
                    onChange={(e) => setInvestasi({ ...investasi, judulInvestasi: e.target.value })}
                    id="input_inv_title"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-slate-600 block">Estimasi Nilai Investasi (CapEx)</label>
                  <input
                    type="text"
                    className="w-full p-2.5 bg-white border border-slate-300 rounded-lg text-slate-800 font-mono font-bold text-indigo-700 focus:outline-none"
                    value={investasi.nilaiInvestasi}
                    onChange={(e) => setInvestasi({ ...investasi, nilaiInvestasi: e.target.value })}
                    id="input_inv_value"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-slate-600 block">Kajian Kelayakan Finansial (NPV / IRR / Payback)</label>
                  <textarea
                    rows={2}
                    className="w-full p-2.5 bg-white border border-slate-300 rounded-lg text-slate-800 leading-relaxed focus:outline-none"
                    value={investasi.kajianFinansial}
                    onChange={(e) => setInvestasi({ ...investasi, kajianFinansial: e.target.value })}
                    id="input_inv_fin"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-slate-600 block">Kajian K3 & Kendala Risiko Sektoral</label>
                  <textarea
                    rows={2}
                    className="w-full p-2.5 bg-white border border-slate-300 rounded-lg text-slate-800 leading-relaxed focus:outline-none"
                    value={investasi.kajianRisiko}
                    onChange={(e) => setInvestasi({ ...investasi, kajianRisiko: e.target.value })}
                    id="input_inv_risk"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-slate-600 block">Penelaahan Legalitas Hukum Kontrak (Yuridis)</label>
                  <input
                    type="text"
                    className="w-full p-2.5 bg-white border border-slate-300 rounded-lg text-slate-800 focus:outline-none"
                    value={investasi.kajianHukum}
                    onChange={(e) => setInvestasi({ ...investasi, kajianHukum: e.target.value })}
                    id="input_inv_legal"
                  />
                </div>
              </div>
            )}

            {activeFormTab === 'anggaran' && (
              <div className="space-y-4 font-sans text-xs">
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="font-bold text-slate-600 block">Nomor Alokasi Anggaran</label>
                    <input
                      type="text"
                      className="w-full p-2.5 bg-white border border-slate-300 rounded-lg text-slate-800 font-mono font-medium focus:outline-none focus:ring-1 focus:ring-indigo-500"
                      value={anggaran.id}
                      onChange={(e) => setAnggaran({ ...anggaran, id: e.target.value })}
                      id="input_ang_id"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="font-bold text-slate-600 block">Tanggal Pengajuan</label>
                    <input
                      type="date"
                      className="w-full p-2.5 bg-white border border-slate-300 rounded-lg text-slate-800 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                      value={anggaran.tanggalPengajuan}
                      onChange={(e) => setAnggaran({ ...anggaran, tanggalPengajuan: e.target.value })}
                      id="input_ang_date"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-slate-600 block">Nama Divisi Pemohon</label>
                  <input
                    type="text"
                    className="w-full p-2.5 bg-white border border-slate-300 rounded-lg text-slate-800 font-semibold focus:outline-none focus:ring-1 focus:ring-indigo-500"
                    value={anggaran.namaDivisi}
                    onChange={(e) => setAnggaran({ ...anggaran, namaDivisi: e.target.value })}
                    id="input_ang_dept"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-slate-600 block">Jumlah Anggaran Diajukan (OpEx)</label>
                  <input
                    type="text"
                    className="w-full p-2.5 bg-white border border-slate-300 rounded-lg text-slate-800 font-mono font-bold text-indigo-700 focus:outline-none"
                    value={anggaran.alokasiAnggaran}
                    onChange={(e) => setAnggaran({ ...anggaran, alokasiAnggaran: e.target.value })}
                    id="input_ang_value"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-slate-600 block">Detail Keperluan Belanja Operasional</label>
                  <textarea
                    rows={3}
                    className="w-full p-2.5 bg-white border border-slate-300 rounded-lg text-slate-800 leading-relaxed focus:outline-none font-sans"
                    value={anggaran.keperluan}
                    onChange={(e) => setAnggaran({ ...anggaran, keperluan: e.target.value })}
                    id="input_ang_detail"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-slate-600 block">Justifikasi Prioritas Bisnis Korporasi</label>
                  <textarea
                    rows={2}
                    className="w-full p-2.5 bg-white border border-slate-300 rounded-lg text-slate-800 leading-relaxed focus:outline-none font-sans"
                    value={anggaran.justifikasiBisnis}
                    onChange={(e) => setAnggaran({ ...anggaran, justifikasiBisnis: e.target.value })}
                    id="input_ang_just"
                  />
                </div>
              </div>
            )}

            {activeFormTab === 'evaluasi' && (
              <div className="space-y-4 font-sans text-xs">
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="font-bold text-slate-600 block">Nomor Berkas Evaluasi</label>
                    <input
                      type="text"
                      className="w-full p-2.5 bg-white border border-slate-300 rounded-lg text-slate-800 font-mono font-medium focus:outline-none focus:ring-1 focus:ring-indigo-500"
                      value={evaluasi.id}
                      onChange={(e) => setEvaluasi({ ...evaluasi, id: e.target.value })}
                      id="input_ev_id"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="font-bold text-slate-600 block">Tanggal Penilaian</label>
                    <input
                      type="date"
                      className="w-full p-2.5 bg-white border border-slate-300 rounded-lg text-slate-800 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                      value={evaluasi.tanggalEvaluasi}
                      onChange={(e) => setEvaluasi({ ...evaluasi, tanggalEvaluasi: e.target.value })}
                      id="input_ev_date"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-slate-600 block">Nama Anggota Direksi Terkait</label>
                  <input
                    type="text"
                    className="w-full p-2.5 bg-white border border-slate-300 rounded-lg text-slate-800 font-semibold focus:outline-none focus:ring-1 focus:ring-indigo-500"
                    value={evaluasi.namaDirektur}
                    onChange={(e) => setEvaluasi({ ...evaluasi, namaDirektur: e.target.value })}
                    id="input_ev_name"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-slate-600 block">Posisi Jabatan Direksi</label>
                  <input
                    type="text"
                    className="w-full p-2.5 bg-white border border-slate-300 rounded-lg text-slate-800 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                    value={evaluasi.posisi}
                    onChange={(e) => setEvaluasi({ ...evaluasi, posisi: e.target.value })}
                    id="input_ev_role"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="font-bold text-slate-600 block">Skor Leadership (Skala 1 - 5)</label>
                    <select
                      className="w-full p-2.5 bg-white border border-slate-300 rounded-lg text-slate-800 font-bold focus:outline-none"
                      value={evaluasi.nilaiKepemimpinan}
                      onChange={(e) => setEvaluasi({ ...evaluasi, nilaiKepemimpinan: Number(e.target.value) })}
                      id="select_ev_ldr"
                    >
                      <option value="1">1 - Kurang Memuaskan</option>
                      <option value="2">2 - Butuh Pembimbingan</option>
                      <option value="3">3 - Sesuai Ekspektasi</option>
                      <option value="4">4 - Sangat Bagus</option>
                      <option value="5">5 - Istimewa (Masterclass)</option>
                    </select>
                  </div>

                  <div className="space-y-1">
                    <label className="font-bold text-slate-600 block">Pencapaian KPI Divisi (1 - 5)</label>
                    <select
                      className="w-full p-2.5 bg-white border border-slate-300 rounded-lg text-slate-800 font-bold focus:outline-none"
                      value={evaluasi.nilaiKinerja}
                      onChange={(e) => setEvaluasi({ ...evaluasi, nilaiKinerja: Number(e.target.value) })}
                      id="select_ev_kpi"
                    >
                      <option value="1">1 - Kurang Dari 60% Target</option>
                      <option value="2">2 - 70% Target Tercapai</option>
                      <option value="3">3 - 85% Target Tercapai</option>
                      <option value="4">4 - 100% Selesai Tepat Waktu</option>
                      <option value="5">5 - Melampaui Target (&gt; 110%)</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-slate-600 block">Komentar & Catatan Pengarah Direktur Utama</label>
                  <textarea
                    rows={3}
                    className="w-full p-2.5 bg-white border border-slate-300 rounded-lg text-slate-800 leading-relaxed focus:outline-none font-sans"
                    value={evaluasi.catatanKritis}
                    onChange={(e) => setEvaluasi({ ...evaluasi, catatanKritis: e.target.value })}
                    id="input_ev_notes"
                  />
                </div>
              </div>
            )}

            <div className="pt-4 flex items-center justify-between gap-4">
              <AnimatePresence>
                {submittedAlert && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    className="bg-emerald-50 text-emerald-700 text-xs px-2.5 py-2 rounded-lg border border-emerald-200/60 font-semibold flex items-center gap-1.5"
                  >
                    <Check className="h-4 w-4 text-emerald-600 shrink-0" />
                    <span>Lolos Verifikasi Kepatuhan!</span>
                  </motion.div>
                )}
              </AnimatePresence>

              <button
                type="submit"
                className="bg-indigo-900 hover:bg-indigo-950 text-white px-5 py-2.5 rounded text-xs font-bold shadow-md cursor-pointer transition-all flex items-center gap-1.5 ml-auto"
                id="btn_submit_form"
              >
                <span>Sahkan & Tanda Tangani</span>
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </form>
        </div>

        {/* Right Side: Virtual Document Print Preview */}
        <div className="bg-slate-950 border border-slate-800 rounded-2xl p-6 flex flex-col justify-between h-full text-slate-300 overflow-y-auto" id="form_print_preview">
          <div>
            <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-6">
              <span className="text-[10px] bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 px-2 py-0.5 rounded font-mono font-bold uppercase tracking-wider">
                PRINTER PREVIEW TERMINAL
              </span>
              <button
                onClick={handlePrintForm}
                className="text-xs text-white hover:text-indigo-300 flex items-center gap-1 font-semibold"
                id="btn_print_form"
              >
                <Printer className="h-3.5 w-3.5" />
                <span>Cetak Lembar Resmi</span>
              </button>
            </div>

            {/* Virtual A4 Card representation */}
            <div className="bg-white border text-slate-800 p-6 sm:p-8 rounded-xl shadow-lg border-slate-200 aspect-[1/1.41] relative select-text" id="virtual_a4_paper_container">
              {/* Header Letterhead */}
              <div className="text-center border-b-2 border-slate-900 pb-4 mb-4 font-sans select-none">
                <h3 className="text-sm font-extrabold text-slate-900 tracking-tight uppercase">PT {companyInfo.namaPerusahaan}</h3>
                <p className="text-[10px] text-slate-500 font-semibold tracking-wider uppercase mt-1">Gedung Pusat Operasi Wilayah • {companyInfo.lokasiOperasional}, INDONESIA</p>
                <p className="text-[9px] text-slate-400 font-mono uppercase mt-0.5">STANDARD OPERATING PROCEDURE ISO 9001:2015 IMPLEMENTATION SHEET</p>
              </div>

              {activeFormTab === 'investasi' && (
                <div className="space-y-4 font-sans text-xs">
                  <div className="text-center bg-slate-100 py-1.5 border border-slate-300 rounded font-bold uppercase tracking-wider text-[10px]">
                    SOP-01: USULAN PERSETUJUAN INVESTASI BARU (CAPEX)
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-[10px]">
                    <div><strong>No. Pengisian:</strong> <span className="font-mono font-bold text-slate-700">{investasi.id}</span></div>
                    <div><strong>Tanggal Usulan:</strong> <span className="font-mono text-slate-700">{investasi.tanggalPengajuan}</span></div>
                  </div>

                  <div className="space-y-1.5 text-[10px]">
                    <div><strong>Nama Proyek Investasi:</strong></div>
                    <div className="p-2 border border-slate-200 bg-slate-50 rounded font-semibold text-slate-900">{investasi.judulInvestasi}</div>
                  </div>

                  <div className="space-y-1.5 text-[10px]">
                    <div><strong>Nilai Maksimal Proyeksi Belanja Modal:</strong></div>
                    <div className="text-sm font-mono font-bold text-indigo-700">{investasi.nilaiInvestasi}</div>
                  </div>

                  <div className="space-y-2 border-t border-slate-100 pt-2 text-[9.5px]">
                    <div><strong>1. Kelayakan Finansial:</strong> {investasi.kajianFinansial}</div>
                    <div><strong>2. Kelayakan Risiko K3:</strong> {investasi.kajianRisiko}</div>
                    <div><strong>3. Kepatuhan Yuridis Hukum PT:</strong> {investasi.kajianHukum}</div>
                  </div>

                  {/* Stamp & Sign blocks + QR e-Signature details */}
                  <div className="pt-4 flex items-center justify-between border-t border-slate-100 mt-2">
                    {/* QR e-Sign verification trigger */}
                    <button
                      type="button"
                      onClick={() => setSelectedQRDoc({
                        id: investasi.id,
                        tipe: 'Persetujuan Investasi Baru (CapEx)',
                        tanggal: investasi.tanggalPengajuan,
                        detail: `Proyek: ${investasi.judulInvestasi} | Nilai: ${investasi.nilaiInvestasi}`,
                        hash: 'SHA256-' + Math.random().toString(36).substring(2, 12).toUpperCase(),
                        qrString: decodeURIComponent(getQRDataFor('investasi'))
                      })}
                      className="flex items-center gap-2 bg-slate-50 hover:bg-indigo-50 border border-slate-200/80 hover:border-indigo-200 p-1.5 rounded-lg text-left transition-all group scale-95 cursor-pointer"
                      title="Klik untuk memverifikasi Tanda Tangan QR"
                    >
                      <img 
                        src={`https://api.qrserver.com/v1/create-qr-code/?size=100x100&data=${getQRDataFor('investasi')}`} 
                        alt="QR Code Tanda Tangan" 
                        className="h-12 w-12 border border-slate-200 rounded shrink-0 bg-white group-hover:scale-105 transition-transform animate-none"
                        referrerPolicy="no-referrer"
                      />
                      <div className="text-[7.5px] leading-tight text-slate-500">
                        <div className="font-bold text-indigo-950 flex items-center gap-0.5">
                          <span>E-SIGN QR</span>
                          <ShieldCheck className="h-2 w-2 text-emerald-600 shrink-0" />
                        </div>
                        <div className="font-mono scale-90 origin-left truncate max-w-[80px]">{investasi.id}</div>
                        <div className="text-indigo-600 group-hover:underline font-semibold flex items-center gap-0.5">Verifikasi Asli</div>
                      </div>
                    </button>

                    <div className="text-center text-[10px] font-sans">
                      <p>Jakarta, {investasi.tanggalPengajuan}</p>
                      <p className="font-bold text-slate-900">Direktur Utama (CEO)</p>
                      {/* Interactive visual wet stamp */}
                      <div className="my-1 border border-indigo-600/70 text-indigo-600/70 border-double text-[8px] font-bold py-0.5 px-2 rounded-full uppercase inline-block rotate-[-5deg] select-none mx-auto leading-none">
                        AUTHORIZED PT {companyInfo.namaPerusahaan.substring(0, 10)}
                      </div>
                      <p className="font-mono text-[8px] font-bold text-slate-400">SIGN OK // ISO COMPLIANT</p>
                    </div>
                  </div>
                </div>
              )}

              {activeFormTab === 'anggaran' && (
                <div className="space-y-4 font-sans text-xs">
                  <div className="text-center bg-slate-100 py-1.5 border border-slate-300 rounded font-bold uppercase tracking-wider text-[10px]">
                    SOP-02: USULAN ANGGARAN OPERASIONAL BARU (OPEX)
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-[10px]">
                    <div><strong>No. Pengisian:</strong> <span className="font-mono font-bold text-slate-700">{anggaran.id}</span></div>
                    <div><strong>Tanggal Usulan:</strong> <span className="font-mono text-slate-700">{anggaran.tanggalPengajuan}</span></div>
                  </div>

                  <div className="space-y-1.5 text-[10px]">
                    <div><strong>Nama Divisi Pemrakarsa:</strong></div>
                    <div className="p-2 border border-slate-200 bg-slate-50 rounded font-semibold text-slate-900">{anggaran.namaDivisi}</div>
                  </div>

                  <div className="space-y-1.5 text-[10px]">
                    <div><strong>Nilai Belanja Operasional Diajukan:</strong></div>
                    <div className="text-sm font-mono font-bold text-indigo-700">{anggaran.alokasiAnggaran}</div>
                  </div>

                  <div className="space-y-2 border-t border-slate-100 pt-2 text-[9.5px]">
                    <div><strong>Tujuan Detail Belanja:</strong> {anggaran.keperluan}</div>
                    <div><strong>Justifikasi Strategis Bisnis:</strong> {anggaran.justifikasiBisnis}</div>
                  </div>

                  {/* Stamp & Sign blocks + QR e-Signature details */}
                  <div className="pt-4 flex items-center justify-between border-t border-slate-100 mt-2">
                    {/* QR e-Sign verification trigger */}
                    <button
                      type="button"
                      onClick={() => setSelectedQRDoc({
                        id: anggaran.id,
                        tipe: 'Persetujuan Alokasi Anggaran (OpEx)',
                        tanggal: anggaran.tanggalPengajuan,
                        detail: `Pemohon: ${anggaran.namaDivisi} | Nilai: ${anggaran.alokasiAnggaran}`,
                        hash: 'SHA256-' + Math.random().toString(36).substring(2, 12).toUpperCase(),
                        qrString: decodeURIComponent(getQRDataFor('anggaran'))
                      })}
                      className="flex items-center gap-2 bg-slate-50 hover:bg-emerald-50 border border-slate-200/80 hover:border-emerald-200 p-1.5 rounded-lg text-left transition-all group scale-95 cursor-pointer"
                      title="Klik untuk memverifikasi Tanda Tangan QR"
                    >
                      <img 
                        src={`https://api.qrserver.com/v1/create-qr-code/?size=100x100&data=${getQRDataFor('anggaran')}`} 
                        alt="QR Code Tanda Tangan" 
                        className="h-12 w-12 border border-slate-200 rounded shrink-0 bg-white group-hover:scale-105 transition-transform animate-none"
                        referrerPolicy="no-referrer"
                      />
                      <div className="text-[7.5px] leading-tight text-slate-500">
                        <div className="font-bold text-[8px] text-emerald-800 flex items-center gap-0.5">
                          <span>BUDGET SIGN QR</span>
                          <ShieldCheck className="h-2 w-2 text-emerald-600 shrink-0" />
                        </div>
                        <div className="font-mono scale-90 origin-left truncate max-w-[80px]">{anggaran.id}</div>
                        <div className="text-emerald-700 group-hover:underline font-semibold flex items-center gap-0.5">Verifikasi Asli</div>
                      </div>
                    </button>

                    <div className="text-center text-[10px] font-sans">
                      <p>Jakarta, {anggaran.tanggalPengajuan}</p>
                      <p className="font-bold text-slate-900">Direktur Utama (CEO)</p>
                      <div className="my-1 border border-emerald-600/70 text-emerald-600/70 border-double text-[8px] font-bold py-0.5 px-2 rounded-full uppercase inline-block rotate-[-3deg] select-none mx-auto leading-none">
                        BUDGET APPROVED 2026
                      </div>
                      <p className="font-mono text-[8px] font-bold text-slate-400">SIGN OK // FUNDS GRANTED</p>
                    </div>
                  </div>
                </div>
              )}

              {activeFormTab === 'evaluasi' && (
                <div className="space-y-4 font-sans text-xs">
                  <div className="text-center bg-slate-100 py-1.5 border border-slate-300 rounded font-bold uppercase tracking-wider text-[10px]">
                    SOP-03: FORMAT EVALUASI KINERJA TAHUNAN DIREKSI
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-[10px]">
                    <div><strong>No. Pengisian:</strong> <span className="font-mono font-bold text-slate-700">{evaluasi.id}</span></div>
                    <div><strong>Tanggal Review:</strong> <span className="font-mono text-slate-700">{evaluasi.tanggalEvaluasi}</span></div>
                  </div>

                  <div className="space-y-1 pb-1 text-[10px]">
                    <div><strong>Nama Direktur Dinilai:</strong></div>
                    <div className="p-2 border border-slate-200 bg-slate-50 rounded font-semibold text-slate-900">{evaluasi.namaDirektur}</div>
                    <div className="text-[9px] text-slate-400 font-medium">Jabatan: {evaluasi.posisi}</div>
                  </div>

                  <div className="grid grid-cols-2 gap-3 text-[10.5px] border-y border-slate-200 py-2">
                    <div>
                      <strong>Leadership:</strong>
                      <span className="block font-mono font-bold text-indigo-700 text-sm mt-0.5">{evaluasi.nilaiKepemimpinan} / 5</span>
                    </div>
                    <div>
                      <strong>Target KPI Divisi:</strong>
                      <span className="block font-mono font-bold text-indigo-700 text-sm mt-0.5">{evaluasi.nilaiKinerja} / 5</span>
                    </div>
                  </div>

                  <div className="space-y-1.5 text-[9.5px]">
                    <div><strong>Catatan Komparatif & Taktis CEO:</strong></div>
                    <div className="p-2.5 border border-slate-200 bg-slate-50 rounded italic text-slate-700 line-clamp-3">"{evaluasi.catatanKritis}"</div>
                  </div>

                  {/* Stamp & Sign blocks + QR e-Signature details */}
                  <div className="pt-4 flex items-center justify-between border-t border-slate-100 mt-2">
                    {/* QR e-Sign verification trigger */}
                    <button
                      type="button"
                      onClick={() => setSelectedQRDoc({
                        id: evaluasi.id,
                        tipe: 'Evaluasi Kinerja Tahunan Direksi',
                        tanggal: evaluasi.tanggalEvaluasi,
                        detail: `Direktur Dinilai: ${evaluasi.namaDirektur} | Jabatan: ${evaluasi.posisi}`,
                        hash: 'SHA256-' + Math.random().toString(36).substring(2, 12).toUpperCase(),
                        qrString: decodeURIComponent(getQRDataFor('evaluasi'))
                      })}
                      className="flex items-center gap-2 bg-slate-50 hover:bg-slate-100 border border-slate-200/80 p-1.5 rounded-lg text-left transition-all group scale-95 cursor-pointer"
                      title="Klik untuk memverifikasi Tanda Tangan QR"
                    >
                      <img 
                        src={`https://api.qrserver.com/v1/create-qr-code/?size=100x100&data=${getQRDataFor('evaluasi')}`} 
                        alt="QR Code Tanda Tangan" 
                        className="h-12 w-12 border border-slate-200 rounded shrink-0 bg-white group-hover:scale-105 transition-transform animate-none"
                        referrerPolicy="no-referrer"
                      />
                      <div className="text-[7.5px] leading-tight text-slate-500">
                        <div className="font-bold text-slate-900 flex items-center gap-0.5">
                          <span>E-SIGN QR</span>
                          <ShieldCheck className="h-2 w-2 text-indigo-600 shrink-0" />
                        </div>
                        <div className="font-mono scale-90 origin-left truncate max-w-[80px]">{evaluasi.id}</div>
                        <div className="text-slate-600 group-hover:underline font-semibold flex items-center gap-0.5">Verifikasi Asli</div>
                      </div>
                    </button>

                    <div className="text-center text-[10px] font-sans">
                      <p>Jakarta, {evaluasi.tanggalEvaluasi}</p>
                      <p className="font-bold text-slate-900">Direktur Utama (CEO)</p>
                      <div className="my-1 border border-indigo-600/70 text-indigo-600/70 border-double text-[8px] font-bold py-0.5 px-2 rounded-full uppercase inline-block rotate-[-5deg] select-none mx-auto leading-none">
                        HR-BOARD REVIEWED
                      </div>
                      <p className="font-mono text-[8px] font-bold text-slate-400">EVAL RECORDED // ARCHIVED</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="mt-4 text-center text-slate-500 font-mono text-[10px]">
            Dokumen terenkripsi secara otomatis menggunakan sertifikat digital GCG PT.
          </div>
        </div>
      </div>

      {/* Dynamic GCG Cryptographic QR Code Verification Overlay Modal */}
      <AnimatePresence>
        {selectedQRDoc && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.95, y: 15 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 15 }}
              className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-2xl text-slate-200 relative overflow-hidden"
            >
              {/* Glowing decorative indicator */}
              <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-emerald-500 via-teal-500 to-indigo-500" />
              
              <button
                type="button"
                onClick={() => setSelectedQRDoc(null)}
                className="absolute top-4 right-4 text-slate-400 hover:text-white p-1 rounded-full hover:bg-slate-800 transition-colors cursor-pointer"
                id="btn_close_qr_modal"
              >
                <X className="h-5 w-5" />
              </button>

              <div className="flex items-center gap-3 mb-6">
                <div className="h-10 w-10 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded-xl flex items-center justify-center">
                  <ShieldCheck className="h-6 w-6" />
                </div>
                <div className="text-left">
                  <h3 className="text-base font-extrabold text-white tracking-tight">Sertifikat Digital GCG & e-Sign</h3>
                  <p className="text-[11px] text-slate-400 font-medium">Badan Standardisasi Sertifikasi Mutu ISO 9001:2015</p>
                </div>
              </div>

              {/* QR and Verification content */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 items-center bg-slate-950/50 p-5 rounded-2xl border border-slate-800 mb-6">
                <div className="flex flex-col items-center justify-center text-center">
                  <img
                    src={`https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=${encodeURIComponent(selectedQRDoc.qrString)}`}
                    alt="Pindai QR"
                    className="h-28 w-28 p-1.5 bg-white border border-slate-700 rounded-xl shadow-inner shrink-0"
                    referrerPolicy="no-referrer"
                  />
                  <span className="text-[9px] text-slate-500 font-semibold tracking-wider font-mono uppercase mt-2">PINDAI QR ASLI</span>
                </div>

                <div className="sm:col-span-2 space-y-3.5 text-xs text-left">
                  <div>
                    <span className="text-[9px] font-extrabold uppercase tracking-widest text-slate-500 block">UUID / ID Dokumen</span>
                    <span className="font-mono text-white text-[11px] bg-slate-800 px-2 py-0.5 rounded border border-slate-700/60 inline-block mt-0.5">{selectedQRDoc.id}</span>
                  </div>
                  
                  <div>
                    <span className="text-[9px] font-extrabold uppercase tracking-widest text-slate-500 block">Tipe Dokumen Keputusan</span>
                    <span className="font-bold text-slate-200 block mt-0.5">{selectedQRDoc.tipe}</span>
                  </div>

                  <div>
                    <span className="text-[9px] font-extrabold uppercase tracking-widest text-slate-500 block">Status Validasi Otoritas</span>
                    <span className="inline-flex items-center gap-1.5 text-[10px] font-bold text-emerald-400 bg-emerald-500/10 px-2.5 py-0.5 rounded-full border border-emerald-500/20 mt-0.5">
                      <Check className="h-3 w-3" />
                      <span>DISETUJUI (AUTHORIZED)</span>
                    </span>
                  </div>
                </div>
              </div>

              {/* Decoded QR Payload */}
              <div className="space-y-4">
                <div className="text-left">
                  <h4 className="text-xs font-bold text-slate-200 uppercase tracking-widest mb-2 flex items-center gap-1.5">
                    <Key className="h-4 w-4 text-indigo-400" />
                    <span>Metadata Sertifikat Digital (Telah Dekripsi)</span>
                  </h4>
                  <pre className="text-[10.5px] bg-slate-950 p-4 rounded-xl text-slate-300 font-mono overflow-x-auto whitespace-pre-wrap border border-slate-800 leading-relaxed text-left">
                    {selectedQRDoc.qrString}
                  </pre>
                </div>

                <div className="grid grid-cols-2 gap-4 border-t border-slate-800/80 pt-4 text-xs text-left">
                  <div>
                    <span className="text-[9px] font-bold text-slate-500 uppercase tracking-wider block">Kunci Integritas (SHA-256)</span>
                    <span className="font-mono text-slate-400 text-[10px] block truncate" title={selectedQRDoc.hash}>{selectedQRDoc.hash}</span>
                  </div>
                  <div>
                    <span className="text-[9px] font-bold text-slate-500 uppercase tracking-wider block">Algoritma Otorisasi</span>
                    <span className="font-mono text-slate-400 text-[10px] block">RSA-SHA256 e-Sign Corp</span>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-800 flex justify-end gap-3 font-sans text-xs">
                <button
                  type="button"
                  onClick={() => setSelectedQRDoc(null)}
                  className="bg-slate-850 hover:bg-slate-800 text-slate-200 border border-slate-700/60 px-5 py-2.5 rounded-xl font-bold transition-all cursor-pointer"
                  id="btn_close_qr_modal_bottom"
                >
                  Tutup Validasi
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
