import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Play, Clipboard, CheckCircle2, AlertTriangle, Scale, ShieldAlert, Check, Users, TrendingUp, HelpCircle, FileText, ArrowRight, CornerDownRight } from 'lucide-react';

export default function SOPFlowcharts() {
  const [activeWorkflow, setActiveWorkflow] = useState<'direksi' | 'investasi' | 'strategis'>('direksi');
  const [activeStep, setActiveStep] = useState(0);

  // Workflow Data
  const workflows = {
    direksi: {
      title: 'SOP Rapat Direksi (Board of Directors Meeting)',
      description: 'Format baku sirkulasi info dan integrasi mufakat C-Level sesuai amanah Bab VII UU PT & tata tertib GCG.',
      steps: [
        {
          title: 'Persiapan Agenda (T-5)',
          desc: 'Sekretariat mengumpulkan bahan-bahan masalah utama dari para Direkur (CFO, COO, CHRO, CBDO) dan memantapkan agenda khusus.',
          pic: 'Sekretaris Perusahaan',
          icon: FileText,
          status: 'danger'
        },
        {
          title: 'Pengumpulan Data (T-3)',
          desc: 'Distribusi bahan briefing, slide presentasi taktis, dan laporan finansial sementara kepada seluruh jajaran Direksi untuk dikaji pra-rapat.',
          pic: 'Jajaran Direksi & Staf Ahli',
          icon: Clipboard,
          status: 'warning'
        },
        {
          title: 'Rapat Direksi (Hari-H)',
          desc: 'Dipimpin CEO langsung. Pengambil keputusan kuorum dihadiri minimal 2/3 direksi. Menghilangkan hambatan (unblocking bottlenecks) antardivisi.',
          pic: 'Direktur Utama & Seluruh Direksi',
          icon: Users,
          status: 'info'
        },
        {
          title: 'Perumusan Keputusan',
          desc: 'Mufakat kolegial diupayakan penuh. Apabila buntu (deadlock), hak penentu akhir dipegang veto oleh Direktur Utama secara definitif.',
          pic: 'Direktur Utama',
          icon: Scale,
          status: 'success'
        },
        {
          title: 'Penulisan Risalah & Penugasan',
          desc: 'Risalah Rapat (MoM) disusun resmi dalam waktu 24 jam. Direktur Utama menerbitkan Instruksi CEO pelonggaran bottlenecks.',
          pic: 'Sekretaris Korporat',
          icon: FileText,
          status: 'success'
        },
        {
          title: 'Monitoring Taktis',
          desc: 'Setiap Direktur melaporkan progress eksekusi harian/mingguan via dashboard internal yang dipantau asisten eksekutif.',
          pic: 'Asisten Eksekutif & Direktur',
          icon: TrendingUp,
          status: 'neutral'
        },
        {
          title: 'Evaluasi & Penutupan',
          desc: 'Pengkajian hasil program kerja dibanding target awal dalam Rapat Direksi siklus berikutnya.',
          pic: 'Seluruh Jajaran Direksi',
          icon: CheckCircle2,
          status: 'success'
        }
      ]
    },
    investasi: {
      title: 'SOP Persetujuan Investasi & Belanja Modal (CapEx)',
      description: 'Tata kelola preventif kebocoran likuiditas PT, menjamin imbal hasil modal (RoI) tinggi.',
      steps: [
        {
          title: 'Pengajuan Proposal Kelayakan',
          desc: 'Unit kerja memformulasi analisis inisiatif belanja modal (CapEx) dengan detail fungsional pendukung.',
          pic: 'Kepala Divisi / Sponsor Proyek',
          icon: Clipboard,
          status: 'neutral'
        },
        {
          title: 'Kajian Finansial (Financial Due Diligence)',
          desc: 'Simulasi parameter profitabilitas ketat oleh CFO: target IRR >18%, NPV positif, payback <4 tahun.',
          pic: 'Direktur Keuangan / CFO',
          icon: TrendingUp,
          status: 'warning'
        },
        {
          title: 'Kajian Risiko Korporasi',
          desc: 'Analisis sensitivitas terhadap inflasi, bahan baku, krisis rantai pasok global, dan risiko kepunahan teknologi.',
          pic: 'Komite Manajemen Risiko',
          icon: ShieldAlert,
          status: 'danger'
        },
        {
          title: 'Kajian Hukum Sektoral',
          desc: 'Verifikasi kepatuhan sertifikat hukum, denda tersembunyi, regulasi monopoli, perlindungan data, dan uji lisensi kontrak.',
          pic: 'VP Corporate Legal',
          icon: Scale,
          status: 'info'
        },
        {
          title: 'Persetujuan Direktur Utama',
          desc: 'Meneliti dokumen pertanggungjawaban gabungan. Memberikan keputusan mutlak: Disetujui, Revisi, atau Ditolak.',
          pic: 'Direktur Utama (CEO)',
          icon: CheckCircle2,
          status: 'success'
        },
        {
          title: 'Implementasi & Tender Terbuka',
          desc: 'Proses pengadaan terstruktur menggunakan SOP Tender Akuntabel untuk memilih mitra kontraktor terbaik.',
          pic: 'Komite Pengadaan & COO',
          icon: Users,
          status: 'info'
        },
        {
          title: 'Audit Pasca-Kinerja (6-Bulanan)',
          desc: 'Audit berkala untuk membandingkan antara pengembalian modal riil di lapangan vs asumsi optimis prapengadaan.',
          pic: 'Kepala Audit Internal / SPI',
          icon: FileText,
          status: 'success'
        }
      ]
    },
    strategis: {
      title: 'SOP Pengambilan Keputusan Strategis Berisiko Tinggi',
      description: 'Prosedur pemecahan masalah (Problem-Solving Framework) berdasar rujukan metodologi data ilmiah tingkat CEO.',
      steps: [
        {
          title: 'Identifikasi Akar Masalah',
          desc: 'Memilah insiden luar biasa vs akar masalah sistemis menggunakan fishbone diagram & analisis 5-Whys.',
          pic: 'Direktur Utama & Steering Team',
          icon: HelpCircle,
          status: 'danger'
        },
        {
          title: 'Konsolidasi & Audit Data',
          desc: 'Menghimpun bukti empiris pasar, masukan dari seluruh level staf PT, serta saran regulasi ahli eksternal.',
          pic: 'Analyst Division & HR',
          icon: Clipboard,
          status: 'info'
        },
        {
          title: 'Simulasi Risiko Skenario',
          desc: 'Mengalkulasi dampak skenario terhadap aset PT: Skenario Optimis, Dasar, dan Pesimis (Worst-Case).',
          pic: 'Manajemen Risiko',
          icon: ShieldAlert,
          status: 'warning'
        },
        {
          title: 'Penyusunan Opsi Solusi',
          desc: 'Menciptakan minimal 3 opsi jitu lengkap dengan kalkulasi biaya komparatif dan mitigasi kedaruratannya.',
          pic: 'Pimpinan Divisi Terkait',
          icon: Scale,
          status: 'info'
        },
        {
          title: 'Keputusan Resmi CEO',
          desc: 'Memilih opsi terbaik, menerbitkan Surat Keputusan Direksi (SK) yang solid, tegas, bermartabat, dan memberi kepastian arah.',
          pic: 'Direktur Utama',
          icon: CheckCircle2,
          status: 'success'
        },
        {
          title: 'Manajemen Perubahan (Change Mgmt)',
          desc: 'Mengomunikasikan penyesuaian baru kepada internal PT, serikat karyawan, dan mitra eksternal secara humanis.',
          pic: 'Direktur SDM & Corporate PR',
          icon: Users,
          status: 'warning'
        },
        {
          title: 'Evaluasi Dampak T+30',
          desc: 'Melakukan peninjauan hasil kinerja baru setelah 30 hari berjalan untuk memastikan bottlenecks tuntas tanpa memicu risiko sengketa baru.',
          pic: 'Seluruh Jajaran Direksi',
          icon: CheckCircle2,
          status: 'success'
        }
      ]
    }
  };

  const currentWorkflow = workflows[activeWorkflow];

  const handleStepClick = (index: number) => {
    setActiveStep(index);
  };

  const getStatusStyle = (status: string, active: boolean) => {
    if (active) {
      return 'bg-indigo-900 text-white ring-4 ring-indigo-500/20 scale-105';
    }
    switch (status) {
      case 'danger': return 'bg-rose-50 text-rose-700 border border-rose-200/60';
      case 'warning': return 'bg-amber-50 text-amber-700 border border-amber-200/60';
      case 'info': return 'bg-sky-50 text-sky-700 border border-sky-200/60';
      case 'success': return 'bg-emerald-50 text-emerald-700 border border-emerald-200/60';
      default: return 'bg-slate-50 text-slate-700 border border-slate-200/60';
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm h-[calc(100vh-220px)] min-h-[550px] overflow-y-auto flex flex-col font-sans" id="sop_flowcharts_container">
      {/* Tab Selectors */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-100 pb-5 mb-6">
        <div>
          <h2 className="text-lg font-bold text-slate-900 leading-tight">Visualisasi Diagram Alur SOP Eksekutif</h2>
          <p className="text-xs text-slate-500 mt-1">Gunakan visualisasi interaktif ini untuk melatih staf dan manajer jajaran PT Anda.</p>
        </div>

        <div className="flex bg-slate-100 p-1 rounded">
          {(Object.keys(workflows) as Array<keyof typeof workflows>).map((key) => {
            const isActive = activeWorkflow === key;
            return (
              <button
                key={key}
                onClick={() => {
                  setActiveWorkflow(key);
                  setActiveStep(0);
                }}
                className={`px-4 py-2 rounded text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer ${
                  isActive
                    ? 'bg-indigo-900 text-white shadow-sm'
                    : 'text-slate-500 hover:text-indigo-900'
                }`}
                id={`btn_tab_flow_${key}`}
              >
                {key === 'direksi' ? 'Rapat Direksi' : key === 'investasi' ? 'Investasi CapEx' : 'Keputusan Strategis'}
              </button>
            );
          })}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 flex-1 min-h-0">
        {/* Left Side: Dynamic Pipeline Flow */}
        <div className="lg:col-span-7 flex flex-col justify-between h-full min-h-0" id="flow_pipeline">
          <div className="mb-4">
            <span className="inline-block bg-indigo-50 text-indigo-900 text-xs px-2.5 py-1 rounded font-bold border border-indigo-100 uppercase tracking-wide mb-2">
              Langkah Prosedural Aktif
            </span>
            <h3 className="text-xl font-bold text-slate-900">{currentWorkflow.title}</h3>
            <p className="text-sm text-slate-500 mt-1">{currentWorkflow.description}</p>
          </div>

          {/* Interactive Steps Visual Tracker */}
          <div className="flex-1 overflow-y-auto pr-2 my-4 space-y-3 max-h-[300px] lg:max-h-[340px]" id="flow_steps_scroller">
            {currentWorkflow.steps.map((step, idx) => {
              const isActive = activeStep === idx;
              const isPast = activeStep > idx;
              const Icon = step.icon;

              return (
                <div
                  key={idx}
                  onClick={() => handleStepClick(idx)}
                  className={`flex items-start gap-4 p-3 rounded transition-all cursor-pointer border ${
                    isActive
                      ? 'bg-indigo-900 text-white border-indigo-900 shadow-md shadow-indigo-900/10'
                      : isPast
                        ? 'bg-slate-50/80 border-slate-200 text-slate-600 opacity-60 hover:opacity-90'
                        : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                  }`}
                  id={`flow_step_row_${idx}`}
                >
                  <div className={`h-8 w-8 rounded flex items-center justify-center font-mono font-bold shrink-0 text-sm ${
                    isActive
                      ? 'bg-white text-indigo-900 font-extrabold'
                      : 'bg-slate-100 text-slate-700'
                  }`}>
                    {idx + 1}
                  </div>

                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between gap-2">
                      <h4 className="font-semibold text-sm truncate">{step.title}</h4>
                      <span className={`text-[10px] px-2 py-0.5 rounded font-bold border select-none shrink-0 ${
                        isActive
                          ? 'bg-white/15 text-white border-white/20'
                          : 'bg-slate-100 text-slate-500 border-slate-200'
                      }`}>
                        PIC: {step.pic}
                      </span>
                    </div>
                    <p className={`text-xs mt-1.5 leading-relaxed line-clamp-2 ${
                      isActive ? 'text-slate-200' : 'text-slate-500'
                    }`}>
                      {step.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Controls */}
          <div className="flex items-center justify-between border-t border-slate-100 pt-4 bg-white">
            <button
              onClick={() => setActiveStep(prev => Math.max(0, prev - 1))}
              disabled={activeStep === 0}
              className="px-4 py-2 text-xs font-semibold rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 disabled:opacity-40 transition-all cursor-pointer"
            >
              Langkah Sebelumnya
            </button>
            <span className="text-xs font-mono font-bold text-slate-400">
              {activeStep + 1} dari {currentWorkflow.steps.length}
            </span>
            <button
              onClick={() => setActiveStep(prev => Math.min(currentWorkflow.steps.length - 1, prev + 1))}
              disabled={activeStep === currentWorkflow.steps.length - 1}
              className="px-4 py-2 text-xs font-semibold rounded-lg bg-slate-900 hover:bg-slate-800 text-white disabled:opacity-40 transition-all cursor-pointer"
            >
              Langkah Berikutnya
            </button>
          </div>
        </div>

        {/* Right Side: Step Deep Dive details */}
        <div className="lg:col-span-5 bg-slate-50/50 border border-slate-200/50 rounded-2xl p-6 flex flex-col justify-between" id="flow_deep_dive">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-slate-200/60 mb-4">
              <span className="text-xs font-mono text-indigo-600 font-bold uppercase tracking-widest flex items-center gap-1.5">
                <Play className="h-3 w-3 fill-indigo-600" />
                SOP Analisis Detail
              </span>
              <span className="text-xs bg-slate-100 text-slate-600 px-2 py-0.5 rounded-md font-mono font-bold">
                Langkah {activeStep + 1}
              </span>
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={activeStep}
                initial={{ opacity: 0, x: 15 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -15 }}
                transition={{ duration: 0.2 }}
                className="space-y-4"
              >
                <div>
                  <h4 className="text-lg font-bold text-slate-900">{currentWorkflow.steps[activeStep].title}</h4>
                  <p className="text-xs font-semibold text-indigo-600 mt-1 uppercase tracking-wider flex items-center gap-1.5">
                    <CornerDownRight className="h-3 w-3" />
                    Penanggung Jawab Utama (PIC): {currentWorkflow.steps[activeStep].pic}
                  </p>
                </div>

                <div className="bg-white p-4 rounded-xl border border-slate-200/70 shadow-sm leading-relaxed text-sm text-slate-700 min-h-[140px]">
                  {currentWorkflow.steps[activeStep].desc}
                </div>

                {/* Audit Checklist for this specific step */}
                <div className="space-y-2">
                  <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Checklist Kepatuhan GCG & ISO 9001:</span>
                  <div className="bg-emerald-50/60 border border-emerald-100 text-emerald-800 p-3 rounded-lg text-xs space-y-2">
                    <div className="flex gap-2 items-start">
                      <Check className="h-4.5 w-4.5 text-emerald-600 shrink-0" />
                      <span>Data input tervalidasi secara faktual dan disimpan dalam log arsip PT.</span>
                    </div>
                    <div className="flex gap-2 items-start">
                      <Check className="h-4.5 w-4.5 text-emerald-600 shrink-0" />
                      <span>Persetujuan tertulis dibubuhi paraf verifikasi digital oleh legal dan internal audit.</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="mt-6 pt-4 border-t border-slate-200/60 flex items-center gap-3">
            <span className="inline-flex h-2 w-2 rounded-full bg-emerald-500 animate-ping"></span>
            <span className="text-xs text-slate-500 leading-tight">Prosedur siap dialirkan ke operasional. Semua langkah memenuhi kriteria ISO Audit.</span>
          </div>
        </div>
      </div>
    </div>
  );
}
