import React, { useState, useEffect } from 'react';
import { CompanyInfo } from './types';
import { getSOPChapters } from './templates';
import SOPDocumentView from './components/SOPDocumentView';
import SOPFlowcharts from './components/SOPFlowcharts';
import CEODashboard from './components/CEODashboard';
import SOPForms from './components/SOPForms';
import SOPChatbot from './components/SOPChatbot';
import {
  FileText,
  GitBranch,
  LayoutDashboard,
  ClipboardPen,
  ChevronDown,
  Building2,
  Users,
  Eye,
  Settings2,
  CheckCircle2,
  Scale,
  FileDown
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { generateSOPPDF } from './utils/pdfGenerator';

export default function App() {
  const [activeTab, setActiveTab] = useState<'view' | 'workflow' | 'dashboard' | 'forms'>('view');
  const [isConfigOpen, setIsConfigOpen] = useState(false);

  // Initialize company metadata state
  const [companyInfo, setCompanyInfo] = useState<CompanyInfo>({
    namaPerusahaan: 'Nusantara Global Mandiri',
    bidangUsaha: 'Developer Real Estate & Investasi Infrastruktur',
    skalaPerusahaan: 'NASIONAL',
    jumlahKaryawan: '450',
    lokasiOperasional: 'Jakarta & Jawa Barat',
    bentukUsaha: 'PT',
    visiPerusahaan: 'Menjadi korporasi investasi terintegrasi nomor satu di Indonesia yang unggul dalam pembangunan berkelanjutan berstandar internasional.',
    misiPerusahaan: '1. Melaksanakan investasi berdaya guna tinggi pada sektor strategis.\n2. Menerapkan tata kelola perusahaan yang bersih (GCG Score > 95).\n3. Mewujudkan kebahagiaan dan keselamatan berproduksi bagi karyawan.',
    nomorDokumen: 'SOP/DIRUT/NGM-001/06/2026',
    nomorRevisi: '00',
    tanggalBerlaku: '2026-06-09',
    disusunOleh: 'Konsultan Manajemen Korporasi Internasional',
    diperiksaOleh: 'Komite Tata Kelola & Auditor Internal',
    disetujuiOleh: 'Dewan Komisaris & Direktur Utama'
  });

  // State to hold compiled document chapters
  const [chapters, setChapters] = useState<Array<{ id: number; title: string; content: string }>>([]);
  const [selectedChapterId, setSelectedChapterId] = useState<number>(1);

  // Hydrate chapters initially or when companyInfo changes
  useEffect(() => {
    // Check if there is edited SOP content in localStorage, otherwise load from templates
    const savedSOP = localStorage.getItem('sop_ceo_saved_document');
    if (savedSOP) {
      try {
        const parsed = JSON.parse(savedSOP);
        // Only load if it matches dynamic company inputs or regenerate
        setChapters(parsed);
        return;
      } catch (e) {
        console.error('Failed to parse saved document, falling back');
      }
    }
    setChapters(getSOPChapters(companyInfo));
  }, [companyInfo]);

  // Handle a single chapter edit
  const handleUpdateChapter = (id: number, content: string) => {
    const updated = chapters.map((ch) => (ch.id === id ? { ...ch, content } : ch));
    setChapters(updated);
    localStorage.setItem('sop_ceo_saved_document', JSON.stringify(updated));
  };

  // Reset all content back to template defaults for current parameters
  const handleResetAll = () => {
    const defaultChapters = getSOPChapters(companyInfo);
    setChapters(defaultChapters);
    localStorage.setItem('sop_ceo_saved_document', JSON.stringify(defaultChapters));
  };

  return (
    <div className="min-h-screen bg-[#F1F5F9] text-slate-900 flex flex-col antialiased relative selection:bg-indigo-100 selection:text-indigo-950">
      {/* Dynamic Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-50 shadow-sm px-6 py-4">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 bg-indigo-900 rounded flex items-center justify-center text-white font-bold text-xl shadow-sm">
              <Scale className="h-5 w-5" />
            </div>
            <div>
              <div className="flex items-center gap-2.5">
                <h1 className="text-base sm:text-lg font-bold text-indigo-900 leading-none">
                  EXECUTIVE MANAGEMENT SYSTEM (CEO SOP)
                </h1>
                <span className="hidden sm:inline-block bg-emerald-15 bg-emerald-100 border border-emerald-300 text-emerald-700 text-[10px] uppercase font-bold tracking-wider py-0.5 px-2 rounded-full">
                  CONTROLLED COPY
                </span>
              </div>
              <p className="text-xs text-slate-500 uppercase tracking-widest mt-1.5 italic font-sans">
                ISO 9001:2015 & GCG COMPLIANT • PT {companyInfo.namaPerusahaan}
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-4 lg:gap-6 text-xs font-semibold self-start lg:self-auto">
            <div className="text-left leading-tight hidden md:block">
              <p className="text-slate-400 font-bold text-[9px] uppercase tracking-wider">DOCUMENT NO.</p>
              <p className="text-indigo-900 font-bold font-mono">{companyInfo.nomorDokumen || 'SOP-DIR-UT-001/2026'}</p>
            </div>
            <div className="h-8 w-px bg-slate-200 hidden md:block"></div>
            <div className="text-left leading-tight hidden md:block">
              <p className="text-slate-400 font-bold text-[9px] uppercase tracking-wider">VALIDATION DATE</p>
              <p className="text-indigo-900 font-bold font-mono">{companyInfo.tanggalBerlaku}</p>
            </div>
            <div className="h-8 w-px bg-slate-200 hidden md:block"></div>
            <div className="text-left leading-tight">
              <p className="text-slate-400 font-bold text-[9px] uppercase tracking-wider">SEKTOR USAHA</p>
              <p className="text-emerald-700 font-bold uppercase">{companyInfo.bidangUsaha}</p>
            </div>
            
            {/* Control Panel Toggle Button */}
            <button
              onClick={() => setIsConfigOpen(!isConfigOpen)}
              className="px-4 py-2 bg-indigo-900 hover:bg-indigo-950 text-white rounded shadow-sm text-xs font-semibold cursor-pointer transition-all flex items-center gap-2"
              id="btn_toggle_config_panel"
            >
              <Settings2 className="h-4 w-4" />
              <span>{isConfigOpen ? 'Tutup Parameter' : 'Ubah Parameter'}</span>
              <ChevronDown className={`h-3 w-3 shrink-0 transition-transform ${isConfigOpen ? 'rotate-180' : ''}`} />
            </button>

            {/* Download PDF Button */}
            <button
              onClick={() => generateSOPPDF(companyInfo, chapters)}
              className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded shadow-md text-xs font-bold whitespace-nowrap cursor-pointer transition-all flex items-center gap-2"
              id="btn_header_download_pdf"
            >
              <FileDown className="h-4 w-4" />
              <span>DOWNLOAD PDF SOP</span>
            </button>
          </div>
        </div>
      </header>

      {/* Slide down Configuration Parameter Panel */}
      <AnimatePresence>
        {isConfigOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden bg-white border-b border-slate-200 shadow-inner"
            id="company_config_panel"
          >
            <div className="max-w-7xl mx-auto p-6 sm:p-8 grid grid-cols-1 md:grid-cols-3 gap-6 font-sans text-xs">
              {/* Box 1: Core Corporate Data */}
              <div className="space-y-4">
                <h3 className="font-bold text-indigo-900 uppercase tracking-widest text-[10px] border-b border-slate-200 pb-1.5 flex items-center gap-1.5">
                  <Building2 className="h-4 w-4" />
                  <span>Informasi Dasar Korporasi</span>
                </h3>

                <div className="space-y-1.5">
                  <label className="font-bold text-slate-600 block">Nama Perusahaan (Tanpa PT/CV)</label>
                  <input
                    type="text"
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded focus:bg-white text-slate-800 font-semibold focus:outline-none focus:ring-1 focus:ring-indigo-900"
                    value={companyInfo.namaPerusahaan}
                    onChange={(e) => setCompanyInfo({ ...companyInfo, namaPerusahaan: e.target.value })}
                    id="cfg_nama_perusahaan"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="font-bold text-slate-600 block">Sektor & Bidang Usaha</label>
                  <input
                    type="text"
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded focus:bg-white text-slate-800 focus:outline-none focus:ring-1 focus:ring-indigo-900"
                    value={companyInfo.bidangUsaha}
                    onChange={(e) => setCompanyInfo({ ...companyInfo, bidangUsaha: e.target.value })}
                    id="cfg_bidang_usaha"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1.5">
                    <label className="font-bold text-slate-600 block">Skala Operasional</label>
                    <select
                      className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded text-slate-800 font-bold focus:outline-none focus:ring-1 focus:ring-indigo-900"
                      value={companyInfo.skalaPerusahaan}
                      onChange={(e) => setCompanyInfo({ ...companyInfo, skalaPerusahaan: e.target.value as any })}
                      id="cfg_skala_perusahaan"
                    >
                      <option value="UMKM">UMKM</option>
                      <option value="MENENGAH">Menengah</option>
                      <option value="NASIONAL">Nasional (BUMN/Tbk)</option>
                      <option value="INTERNASIONAL">Internasional</option>
                    </select>
                  </div>
                  <div className="space-y-1.5">
                    <label className="font-bold text-slate-600 block">Jumlah Karyawan (Staf)</label>
                    <input
                      type="text"
                      className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded focus:bg-white text-slate-800 font-mono focus:outline-none focus:ring-1 focus:ring-indigo-900"
                      value={companyInfo.jumlahKaryawan}
                      onChange={(e) => setCompanyInfo({ ...companyInfo, jumlahKaryawan: e.target.value })}
                      id="cfg_jumlah_karyawan"
                    />
                  </div>
                </div>
              </div>

              {/* Box 2: Institutional Vision & Mission */}
              <div className="space-y-4">
                <h3 className="font-bold text-indigo-900 uppercase tracking-widest text-[10px] border-b border-slate-200 pb-1.5 flex items-center gap-1.5">
                  <Eye className="h-4 w-4" />
                  <span>Visi & Misi PT</span>
                </h3>

                <div className="space-y-1.5">
                  <label className="font-bold text-slate-600 block">Visi Utama Perusahaan</label>
                  <textarea
                    rows={2}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded focus:bg-white text-slate-800 font-medium leading-relaxed focus:outline-none focus:ring-1 focus:ring-indigo-900"
                    value={companyInfo.visiPerusahaan}
                    onChange={(e) => setCompanyInfo({ ...companyInfo, visiPerusahaan: e.target.value })}
                    id="cfg_visi_perusahaan"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="font-bold text-slate-600 block">Misi Utama Perusahaan</label>
                  <textarea
                    rows={2}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded focus:bg-white text-slate-800 leading-relaxed focus:outline-none focus:ring-1 focus:ring-indigo-900"
                    value={companyInfo.misiPerusahaan}
                    onChange={(e) => setCompanyInfo({ ...companyInfo, misiPerusahaan: e.target.value })}
                    id="cfg_misi_perusahaan"
                  />
                </div>
              </div>

              {/* Box 3: Formal Document Audit Specs */}
              <div className="space-y-4">
                <h3 className="font-bold text-indigo-900 uppercase tracking-widest text-[10px] border-b border-slate-200 pb-1.5 flex items-center gap-1.5">
                  <FileText className="h-4 w-4" />
                  <span>Metadata Legalitas Dokumen</span>
                </h3>

                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1.5">
                    <label className="font-bold text-slate-600 block">Nomor Dokumen SOP</label>
                    <input
                      type="text"
                      className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded text-slate-800 font-mono focus:outline-none focus:ring-1 focus:ring-indigo-900"
                      value={companyInfo.nomorDokumen}
                      onChange={(e) => setCompanyInfo({ ...companyInfo, nomorDokumen: e.target.value })}
                      id="cfg_no_dokumen"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="font-bold text-slate-600 block">Tgl Validasi Berlaku</label>
                    <input
                      type="text"
                      className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded text-slate-800 focus:outline-none focus:ring-1 focus:ring-indigo-900"
                      value={companyInfo.tanggalBerlaku}
                      onChange={(e) => setCompanyInfo({ ...companyInfo, tanggalBerlaku: e.target.value })}
                      id="cfg_tgl_berlaku"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-2">
                  <div className="space-y-1">
                    <label className="font-bold text-slate-600 block text-[9px] truncate">Disusun Oleh</label>
                    <input
                      type="text"
                      className="w-full p-2 bg-slate-50 border border-slate-200 rounded text-[10px] focus:outline-none focus:ring-1 focus:ring-indigo-900"
                      value={companyInfo.disusunOleh}
                      onChange={(e) => setCompanyInfo({ ...companyInfo, disusunOleh: e.target.value })}
                      id="cfg_disusun"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="font-bold text-slate-600 block text-[9px] truncate">Diperiksa Oleh</label>
                    <input
                      type="text"
                      className="w-full p-2 bg-slate-50 border border-slate-200 rounded text-[10px] focus:outline-none focus:ring-1 focus:ring-indigo-900"
                      value={companyInfo.diperiksaOleh}
                      onChange={(e) => setCompanyInfo({ ...companyInfo, diperiksaOleh: e.target.value })}
                      id="cfg_diperiksa"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="font-bold text-slate-600 block text-[9px] truncate">Disetujui Oleh</label>
                    <input
                      type="text"
                      className="w-full p-2 bg-slate-50 border border-slate-200 rounded text-[10px] focus:outline-none focus:ring-1 focus:ring-indigo-900"
                      value={companyInfo.disetujuiOleh}
                      onChange={(e) => setCompanyInfo({ ...companyInfo, disetujuiOleh: e.target.value })}
                      id="cfg_disetujui"
                    />
                  </div>
                </div>

                <div className="flex justify-end pt-1">
                  <button
                    onClick={() => {
                      setIsConfigOpen(false);
                      handleResetAll();
                    }}
                    className="bg-indigo-900 border border-indigo-950 text-white px-4 py-2 rounded text-xs font-bold shadow-md hover:bg-indigo-950 transition-all cursor-pointer"
                    id="btn_apply_config"
                  >
                    Terapkan & Regenerasi SOP
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Navigational Tabs row */}
      <div className="border-b border-slate-200 bg-white shadow-sm font-sans" id="apps_nav_tabs_row">
        <div className="max-w-7xl mx-auto px-4 flex flex-wrap gap-1 py-1">
          <button
            onClick={() => setActiveTab('view')}
            className={`px-4 py-3.5 text-xs font-bold uppercase tracking-wider transition-all cursor-pointer border-b-2 flex items-center gap-2 ${
              activeTab === 'view'
                ? 'border-indigo-900 text-indigo-900 font-bold'
                : 'border-transparent text-slate-500 hover:text-indigo-900 hover:border-slate-300'
            }`}
            id="tab_view_sop"
          >
            <FileText className="h-4 w-4 shrink-0" />
            <span>Dokumen SOP (Chapter 1-25)</span>
          </button>

          <button
            onClick={() => setActiveTab('workflow')}
            className={`px-4 py-3.5 text-xs font-bold uppercase tracking-wider transition-all cursor-pointer border-b-2 flex items-center gap-2 ${
              activeTab === 'workflow'
                ? 'border-indigo-900 text-indigo-900 font-bold'
                : 'border-transparent text-slate-500 hover:text-indigo-900 hover:border-slate-300'
            }`}
            id="tab_view_pipeline"
          >
            <GitBranch className="h-4 w-4 shrink-0" />
            <span>Diagram Alur Kerja SOP</span>
          </button>

          <button
            onClick={() => setActiveTab('dashboard')}
            className={`px-4 py-3.5 text-xs font-bold uppercase tracking-wider transition-all cursor-pointer border-b-2 flex items-center gap-2 ${
              activeTab === 'dashboard'
                ? 'border-indigo-900 text-indigo-900 font-bold'
                : 'border-transparent text-slate-500 hover:text-indigo-900 hover:border-slate-300'
            }`}
            id="tab_view_dashboard"
          >
            <LayoutDashboard className="h-4 w-4 shrink-0" />
            <span>Dashboard Eksekutif & Kepatuhan</span>
          </button>

          <button
            onClick={() => setActiveTab('forms')}
            className={`px-4 py-3.5 text-xs font-bold uppercase tracking-wider transition-all cursor-pointer border-b-2 flex items-center gap-2 ${
              activeTab === 'forms'
                ? 'border-indigo-900 text-indigo-900 font-bold'
                : 'border-transparent text-slate-500 hover:text-indigo-900 hover:border-slate-300'
            }`}
            id="tab_view_forms"
          >
            <ClipboardPen className="h-4 w-4 shrink-0" />
            <span>E-Formulir Lampiran</span>
          </button>
        </div>
      </div>

      {/* Primary Application Render Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 transition-all" id="app_primary_canvas">
        <AnimatePresence mode="wait">
          {activeTab === 'view' && chapters.length > 0 && (
            <motion.div
              key="view"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.15 }}
            >
              <SOPDocumentView
                companyInfo={companyInfo}
                chapters={chapters}
                onUpdateChapter={handleUpdateChapter}
                onResetAll={handleResetAll}
                selectedChapterId={selectedChapterId}
                onSelectChapter={setSelectedChapterId}
              />
            </motion.div>
          )}

          {activeTab === 'workflow' && (
            <motion.div
              key="workflow"
              initial={{ opacity: 0, scale: 0.99 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.99 }}
              transition={{ duration: 0.15 }}
            >
              <SOPFlowcharts />
            </motion.div>
          )}

          {activeTab === 'dashboard' && (
            <motion.div
              key="dashboard"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
            >
              <CEODashboard companyInfo={companyInfo} />
            </motion.div>
          )}

          {activeTab === 'forms' && (
            <motion.div
              key="forms"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.15 }}
            >
              <SOPForms companyInfo={companyInfo} />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Global Regulatory Footer */}
      <footer className="bg-white border-t border-slate-200 py-4 px-6 text-center text-xs text-slate-400 font-mono flex flex-col sm:flex-row sm:items-center sm:justify-between max-w-7xl w-full mx-auto mt-6">
        <span>SOP DIREKTUR UTAMA (CEO) — VERSI DIGITAL TERENKRIPSI BERSTANDAR GCG</span>
        <span className="mt-1 sm:mt-0 flex items-center justify-center gap-1.5 font-bold text-slate-500">
          <CheckCircle2 className="h-4 w-4 text-emerald-500" />
          <span>Audit ISO 9001:2015 & KNKG Compliant</span>
        </span>
      </footer>

      {/* Floating AI Consultant Chatbot */}
      {chapters.length > 0 && (() => {
        const activeChapter = chapters.find(c => c.id === selectedChapterId) || chapters[0];
        return (
          <SOPChatbot
            companyInfo={companyInfo}
            activeChapterTitle={activeChapter?.title || "Profil Perusahaan"}
            activeChapterContent={activeChapter?.content || ""}
          />
        );
      })()}
    </div>
  );
}
