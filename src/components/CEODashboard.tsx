import React, { useState, useEffect } from 'react';
import { CompanyInfo, RiskItem } from '../types';
import {
  TrendingUp,
  DollarSign,
  Briefcase,
  Users,
  ShieldCheck,
  AlertOctagon,
  Play,
  CheckCircle,
  HelpCircle,
  ArrowRight,
  Shield,
  Activity,
  Smile,
  Flame,
  Award,
  Zap
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from 'recharts';

interface CEODashboardProps {
  companyInfo: CompanyInfo;
}

export default function CEODashboard({ companyInfo }: CEODashboardProps) {
  // State for Corporate Financials & Metrics (connected to simulation)
  const [revenue, setRevenue] = useState(15000000000); // 15 Miliar
  const [profitRate, setProfitRate] = useState(0.15); // 15%
  const [cashflow, setCashflow] = useState(4200000000); // 4.2 Miliar
  const [projectProgress, setProjectProgress] = useState(82); // 82%
  const [riskIndex, setRiskIndex] = useState(25); // Lower is better (0-100)
  const [csi, setCsi] = useState(90); // Customer Satisfaction Index
  const [employeePerf, setEmployeePerf] = useState(88); // Employee Performance

  // Daily Schedule Stage (Chapter 10)
  const [currentHour, setCurrentHour] = useState<'07:00' | '09:00' | '13:00' | 'done'>('07:00');
  const [completedDailySchedule, setCompletedDailySchedule] = useState<{ [key: string]: boolean }>({});

  // Active Crisis State (Chapter 16)
  const [activeCrisis, setActiveCrisis] = useState<string | null>(null);
  const [crisisResolutionPhase, setCrisisResolutionPhase] = useState<number>(0);
  const [crisisLog, setCrisisLog] = useState<string[]>([]);

  // Simulation Sliders / Admin controls
  const [isSimulatorOpen, setIsSimulatorOpen] = useState(false);

  // Default Risks List (Chapter 14)
  const [risks, setRisks] = useState<RiskItem[]>([
    {
      kategori: 'Keuangan',
      identifikasi: 'Volatilitas kurs valas asing pengetatan modal kerja',
      dampak: 'Kenaikan biaya bahan baku & margin turun',
      mitigasi: 'Kebijakan lindung nilai (hedging) & reserve 6 bulan OpEx',
      pemilik: 'CFO (Direktur Keuangan)',
      level: 'SEDANG'
    },
    {
      kategori: 'Operasional',
      identifikasi: 'Gangguan rantai pasok wilayah operasional',
      dampak: 'Keterlambatan penyelesaian proyek',
      mitigasi: 'Sertifikasi pemasok cadangan & stok persediaan kritis 30%',
      pemilik: 'COO (Direktur Operasional)',
      level: 'TINGGI'
    },
    {
      kategori: 'Hukum',
      identifikasi: 'Perubahan peraturan pertambangan / perpajakan',
      dampak: 'Denda administratif & penghentian izin sementara',
      mitigasi: 'Uji kepatuhan berkala & konsultan hukum independen',
      pemilik: 'Legal / VP Compliance',
      level: 'RENDAH'
    },
    {
      kategori: 'Siber/Kemanan',
      identifikasi: 'Serangan malware & pencurian basis data korporat',
      dampak: 'Hilangnya kepercayaan publik & downtime sistem',
      mitigasi: 'Enkripsi end-to-end & audit keamanan internal berkala',
      pemilik: 'Direktur Teknologi / CIO',
      level: 'KRITIS'
    }
  ]);

  // Format IDR Currency
  const formatIDR = (num: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      maximumFractionDigits: 0
    }).format(num);
  };

  // KPI Target configurations for GCG & ISO 9001:2015 Compliance
  const targetRevenue = 18000000000; // 18 Miliar
  const targetProfit = 3000000000; // 3 Miliar
  const targetCashflow = 5000000000; // 5 Miliar
  const riskIndexMaxThreshold = 30; // lower is better

  const getKPIStatus = (value: number, type: 'revenue' | 'profit' | 'cashflow' | 'risk' | 'csi' | 'employee' | 'project') => {
    if (type === 'revenue') {
      if (value >= targetRevenue) {
        return { label: 'Optimal', col: 'emerald', textClass: 'text-emerald-600 border-emerald-500/30 shadow-emerald-500/5', bgClass: 'bg-emerald-50 text-emerald-800' };
      }
      if (value >= 12000000000) {
        return { label: 'Waspada', col: 'amber', textClass: 'text-amber-600 border-amber-400/50 shadow-amber-500/5', bgClass: 'bg-amber-105 bg-amber-50 text-amber-800' };
      }
      return { label: 'Di Bawah Target', col: 'rose', textClass: 'text-rose-600 border-rose-500 ring-4 ring-rose-500/10 shadow-rose-500/5', bgClass: 'bg-rose-100 text-rose-800' };
    }
    if (type === 'profit') {
      if (value >= targetProfit) {
        return { label: 'Optimal', col: 'emerald', textClass: 'text-emerald-600 border-emerald-500/30' };
      }
      if (value >= 1500000000) {
        return { label: 'Waspada', col: 'amber', textClass: 'text-amber-600 border-amber-400/30' };
      }
      return { label: 'Di Bawah Target', col: 'rose', textClass: 'text-rose-600 border-rose-500 ring-4 ring-rose-500/10' };
    }
    if (type === 'cashflow') {
      if (value >= targetCashflow) {
        return { label: 'Sehat', col: 'emerald', textClass: 'text-emerald-600 border-emerald-500/30' };
      }
      if (value >= 3000000000) {
        return { label: 'Waspada', col: 'amber', textClass: 'text-amber-600 border-amber-400/30' };
      }
      return { label: 'Di Bawah Target', col: 'rose', textClass: 'text-rose-600 border-rose-500 ring-4 ring-rose-500/10' };
    }
    if (type === 'risk') {
      // Risk: lower is better!
      if (value <= riskIndexMaxThreshold) {
        return { label: 'Sangat Aman', col: 'emerald', textClass: 'text-emerald-600 border-emerald-500/30' };
      }
      if (value <= 55) {
        return { label: 'Waspada', col: 'amber', textClass: 'text-amber-600 border-amber-400/30' };
      }
      return { label: 'Di Bawah Target (Kritis)', col: 'rose', textClass: 'text-rose-600 border-rose-500 ring-4 ring-rose-500/10' };
    }
    if (type === 'csi') {
      if (value >= 90) return { label: 'Optimal', col: 'emerald' };
      if (value >= 80) return { label: 'Cukup', col: 'amber' };
      return { label: 'Di Bawah Target', col: 'rose' };
    }
    if (type === 'employee') {
      if (value >= 85) return { label: 'Optimal', col: 'emerald' };
      if (value >= 70) return { label: 'Cukup', col: 'amber' };
      return { label: 'Di Bawah Target', col: 'rose' };
    }
    if (type === 'project') {
      if (value >= 80) return { label: 'Optimal', col: 'emerald' };
      if (value >= 60) return { label: 'Cukup', col: 'amber' };
      return { label: 'Di Bawah Target', col: 'rose' };
    }
    return { label: 'N/A', col: 'slate' };
  };

  // Helper for formatting large numbers in charts with suffixes (M for Miliar)
  const formatChartYAxis = (value: number) => {
    if (value >= 1000000000) {
      return `Rp ${(value / 1000000000).toFixed(1)} M`;
    }
    if (value >= 1000000) {
      return `Rp ${(value / 1000000).toFixed(0)} Jt`;
    }
    return String(value);
  };

  // Dynamic historical records for Revenue Growth relative to current state
  const revenueChartData = [
    { bulan: 'Jan', 'Pendapatan Aktif': Math.round(revenue * 0.70), 'Target Direksi': Math.round(revenue * 0.75) },
    { bulan: 'Feb', 'Pendapatan Aktif': Math.round(revenue * 0.76), 'Target Direksi': Math.round(revenue * 0.78) },
    { bulan: 'Mar', 'Pendapatan Aktif': Math.round(revenue * 0.82), 'Target Direksi': Math.round(revenue * 0.82) },
    { bulan: 'Apr', 'Pendapatan Aktif': Math.round(revenue * 0.88), 'Target Direksi': Math.round(revenue * 0.85) },
    { bulan: 'Mei', 'Pendapatan Aktif': Math.round(revenue * 0.94), 'Target Direksi': Math.round(revenue * 0.90) },
    { bulan: 'Jun (Seka)', 'Pendapatan Aktif': revenue, 'Target Direksi': Math.round(revenue * 0.95) },
  ];

  // Dynamic projects performance indicators matching state values
  const projectsChartData = [
    { nama: 'Sertifikasi ISO 9001', 'Kemajuan': Math.min(100, Math.round(projectProgress * 1.05)), 'Target': 100 },
    { nama: 'Kepatuhan K3 Utama', 'Kemajuan': Math.min(100, Math.round(projectProgress * 0.92 + (100 - riskIndex) * 0.1)), 'Target': 100 },
    { nama: 'Audit Tata Kelola GCG', 'Kemajuan': Math.min(100, Math.round(projectProgress * 0.88 + employeePerf * 0.1)), 'Target': 100 },
    { nama: 'Migrasi ERP Terintegrasi', 'Kemajuan': Math.min(100, Math.round(projectProgress * 0.80)), 'Target': 100 },
    { nama: 'Otomasi Pabrik / Rantai Pasok', 'Kemajuan': Math.min(100, Math.round(projectProgress * 0.72)), 'Target': 100 },
  ];

  // Trigger Crisis Option Handlers
  const handleTriggerCrisis = (type: 'cyber' | 'accident' | 'union') => {
    setActiveCrisis(type);
    setCrisisResolutionPhase(1);
    setCrisisLog([]);

    // Temporary metric fluctuations
    if (type === 'cyber') {
      setRiskIndex(85);
      setCsi(prev => Math.max(50, prev - 15));
    } else if (type === 'accident') {
      setRiskIndex(90);
      setEmployeePerf(prev => Math.max(50, prev - 10));
    } else if (type === 'union') {
      setRiskIndex(75);
      setEmployeePerf(prev => Math.max(45, prev - 20));
    }
  };

  const resolveCrisisAction = (actionChoice: 'correct' | 'incorrect') => {
    if (activeCrisis === 'cyber') {
      if (actionChoice === 'correct') {
        setCsi(prev => Math.min(100, prev + 10));
        setRiskIndex(30);
        setCashflow(prev => Math.max(0, prev - 200000000)); // SOP audit cost
        setCrisisLog([
          ' Mengaktifkan Crisis Management Center dalam < 60 menit.',
          ' Menunjuk CIO menghentikan kebocoran server.',
          ' Juru Bicara Tunggal mengeluarkan rilis pers apologetis tulus & rencana ganti rugi.',
          ' Melakukan audit ISO 27001 dan memulihkan reputasi PT.'
        ]);
        setCrisisResolutionPhase(2);
      } else {
        setCsi(prev => Math.max(30, prev - 20));
        setRiskIndex(95);
        setCashflow(prev => Math.max(0, prev - 1000000000)); // Regulatory fine
        setCrisisLog([
          ' Gagal mengaktifkan Emergency Center tepat waktu.',
          ' Humas menolak berkomentar kepada media dan menyembunyikan fakta.',
          ' Publik mengetahui pelanggaran via hacker eksternal hancurkan kredibilitas.',
          ' Pemerintah menjatuhkan denda berat pencurian privasi nasabah.'
        ]);
        setCrisisResolutionPhase(3);
      }
    } else if (activeCrisis === 'accident') {
      if (actionChoice === 'correct') {
        setEmployeePerf(prev => Math.min(100, prev + 8));
        setRiskIndex(25);
        setCashflow(prev => Math.max(0, prev - 300000000)); // Treatment & mitigation
        setProjectProgress(prev => Math.min(100, prev + 5));
        setCrisisLog([
          ' Membawa korban ke pusat trauma medis terakreditasi.',
          ' Menghentikan jalur operasional rawan bahaya sesegera mungkin.',
          ' CEO bersaksi di hadapan dinas investigasi & memberikan santunan penuh.',
          ' Standardisasi K3 disiagakan, nihil kecelakaan berikutnya.'
        ]);
        setCrisisResolutionPhase(2);
      } else {
        setEmployeePerf(prev => Math.max(40, prev - 15));
        setRiskIndex(85);
        setCashflow(prev => Math.max(0, prev - 800000000)); // Compensation penalty
        setProjectProgress(prev => Math.max(0, prev - 10));
        setCrisisLog([
          ' Menutup-nutupi insiden kerja dari pengawas pemerintah.',
          ' Serikat buruh mengendus kemunafikan korporasi & menggelar mogok kerja.',
          ' Media memblow-up kelalaian keselamatan kerja sehingga reputasi hancur.',
          ' Proyek strategis dihentikan paksa oleh izin aparat tata tertib.'
        ]);
        setCrisisResolutionPhase(3);
      }
    } else if (activeCrisis === 'union') {
      if (actionChoice === 'correct') {
        setEmployeePerf(prev => Math.min(100, prev + 15));
        setRiskIndex(20);
        setCashflow(prev => Math.max(0, prev - 150000000)); // Increment cost
        setCrisisLog([
          ' CEO memimpin rapat bipartite dua arah secara ramah dengan perwakilan buruh.',
          ' Menyelesaikan formula sengketa gaji berorientasi meritokrasi yang adil.',
          ' Menandatangani Perjanjian Kerja Bersama (PKB) baru berasas kekeluargaan.',
          ' Karyawan kembali berproduksi dengan antusiasme yang tinggi.'
        ]);
        setCrisisResolutionPhase(2);
      } else {
        setEmployeePerf(prev => Math.max(30, prev - 25));
        setRiskIndex(80);
        setCashflow(prev => Math.max(0, prev - 500000000)); // Protests cost
        setCrisisLog([
          ' Menggunakan skema kekerasan menuntut buruh kembali wajib kerja.',
          ' Serikat pekerja bersikeras menuntut keadilan & mogok kerja diperluas.',
          ' Jalur produksi lumpuh selama seminggu penuh mengurangi output bisnis.',
          ' Denda keterlambatan kargo pelabuhan menumpuk tinggi.'
        ]);
        setCrisisResolutionPhase(3);
      }
    }
  };

  const handleFinishCrisisSimulation = () => {
    setActiveCrisis(null);
    setCrisisResolutionPhase(0);
    setCrisisLog([]);
  };

  // Quick Action Handlers
  const executeDailyActivity = (hour: '07:00' | '09:00' | '13:00') => {
    setCompletedDailySchedule(prev => ({ ...prev, [hour]: true }));

    // Simulating positive impact of standard daily work
    if (hour === '07:00') {
      setCashflow(prev => prev + 50000000); // 50jt optimization
      setRiskIndex(prev => Math.max(10, prev - 2));
      setCurrentHour('09:00');
    } else if (hour === '09:00') {
      setRevenue(prev => prev + 100000000); // 100jt deals
      setCsi(prev => Math.min(100, prev + 2));
      setCurrentHour('13:00');
    } else if (hour === '13:00') {
      setProjectProgress(prev => Math.min(100, prev + 3));
      setEmployeePerf(prev => Math.min(100, prev + 2));
      setCurrentHour('done');
    }
  };

  const resetScheduleSimulator = () => {
    setCompletedDailySchedule({});
    setCurrentHour('07:00');
  };

  return (
    <div className="space-y-6 font-sans select-none" id="executive_dashboard_root">
      {/* Simulation Controller Top Banner */}
      <div className="bg-indigo-900 text-white rounded-2xl p-4 sm:p-6 shadow-md border border-indigo-950 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="h-12 w-12 rounded-xl bg-indigo-950/40 border border-indigo-800 flex items-center justify-center text-emerald-400 font-mono shadow-inner animate-pulse">
            <Activity className="h-6 w-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] bg-emerald-500/10 text-emerald-300 border border-emerald-500/20 px-2 py-0.5 rounded font-mono font-bold tracking-wider">
                LIVE SIMULATION ON
              </span>
              <span className="text-xs text-indigo-200 font-mono">Frek: Real-Time</span>
            </div>
            <h1 className="text-lg font-bold tracking-tight">Sistem Pemantauan Eksekutif & Simulator SOP</h1>
            <p className="text-xs text-indigo-150">
              Menghubungkan klausul SOP Direktur Utama PT {companyInfo.namaPerusahaan} dengan kinerja bisnis nyata.
            </p>
          </div>
        </div>

        <button
          onClick={() => setIsSimulatorOpen(!isSimulatorOpen)}
          className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded text-xs font-semibold shadow-md cursor-pointer transition-all flex items-center gap-2"
          id="btn_toggle_simulator"
        >
          <Zap className="h-3.5 w-3.5" />
          <span>{isSimulatorOpen ? 'Sembunyikan Staf Kontrol' : 'Buka Parameter Kontrol (Simulasi)'}</span>
        </button>
      </div>

      {/* Simulator Variable Slider Panel */}
      {isSimulatorOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-slate-50 border border-slate-200/80 rounded-2xl p-5 grid grid-cols-1 md:grid-cols-4 gap-4 shadow-inner"
        >
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-600 uppercase flex justify-between">
              <span>Pendapatan Proyeksi</span>
              <span className="text-indigo-600 font-mono">{(revenue / 1000000000).toFixed(1)} M</span>
            </label>
            <input
              type="range"
              min="5000000000"
              max="50000000000"
              step="500000000"
              value={revenue}
              onChange={(e) => setRevenue(Number(e.target.value))}
              className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
              id="slide_revenue"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-600 uppercase flex justify-between">
              <span>Rasio Profit Margin</span>
              <span className="text-indigo-600 font-mono">{(profitRate * 100).toFixed(0)} %</span>
            </label>
            <input
              type="range"
              min="0.05"
              max="0.40"
              step="0.01"
              value={profitRate}
              onChange={(e) => setProfitRate(Number(e.target.value))}
              className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
              id="slide_profit"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-600 uppercase flex justify-between">
              <span>Arus Kas Lancar</span>
              <span className="text-indigo-600 font-mono">{(cashflow / 1000000000).toFixed(1)} M</span>
            </label>
            <input
              type="range"
              min="500000000"
              max="15000000000"
              step="100000000"
              value={cashflow}
              onChange={(e) => setCashflow(Number(e.target.value))}
              className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
              id="slide_cashflow"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-600 uppercase flex justify-between">
              <span>Indeks Risiko Korporasi</span>
              <span className={`${riskIndex > 50 ? 'text-red-500' : 'text-emerald-600'} font-mono font-bold`}>{riskIndex} / 100</span>
            </label>
            <input
              type="range"
              min="5"
              max="95"
              step="1"
              value={riskIndex}
              onChange={(e) => setRiskIndex(Number(e.target.value))}
              className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
              id="slide_risk"
            />
          </div>
        </motion.div>
      )}

      {/* Primary KPI Metrics Summary (Grid Layout) */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4" id="dashboard_metrics_grid">
        {/* Metric 1 */}
        {(() => {
          const status = getKPIStatus(revenue, 'revenue');
          return (
            <div className={`bg-white border-2 p-5 rounded-2xl shadow-sm hover:shadow-md transition-all ${
              status.col === 'emerald' ? 'border-emerald-500/30' :
              status.col === 'amber' ? 'border-amber-500/40' :
              'border-rose-500 ring-2 ring-rose-200'
            }`}>
              <div className="flex items-center justify-between pb-3">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">Pendapatan Total</span>
                <span className={`text-[9px] uppercase font-bold px-2 py-0.5 rounded-full ${
                  status.col === 'emerald' ? 'bg-emerald-100 text-emerald-800' :
                  status.col === 'amber' ? 'bg-amber-100 text-amber-800' :
                  'bg-rose-100 text-rose-805 text-rose-800 animate-pulse'
                }`}>
                  {status.label}
                </span>
              </div>
              <div className="space-y-1">
                <h3 className="text-lg sm:text-xl font-extrabold text-slate-900 font-mono truncate">
                  {formatIDR(revenue)}
                </h3>
                <div className={`flex items-center gap-1.5 text-[11px] font-semibold ${
                  status.col === 'emerald' ? 'text-emerald-600' :
                  status.col === 'amber' ? 'text-amber-600' :
                  'text-rose-600'
                }`}>
                  <TrendingUp className="h-3 w-3" />
                  <span>Target: &gt;= {(targetRevenue / 1000000000).toFixed(0)} M</span>
                </div>
              </div>
            </div>
          );
        })()}

        {/* Metric 2 */}
        {(() => {
          const netProfit = revenue * profitRate;
          const status = getKPIStatus(netProfit, 'profit');
          return (
            <div className={`bg-white border-2 p-5 rounded-2xl shadow-sm hover:shadow-md transition-all ${
              status.col === 'emerald' ? 'border-emerald-500/30' :
              status.col === 'amber' ? 'border-amber-500/40' :
              'border-rose-500 ring-2 ring-rose-200'
            }`}>
              <div className="flex items-center justify-between pb-3">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">Laba Bersih</span>
                <span className={`text-[9px] uppercase font-bold px-2 py-0.5 rounded-full ${
                  status.col === 'emerald' ? 'bg-emerald-100 text-emerald-800' :
                  status.col === 'amber' ? 'bg-amber-100 text-amber-800' :
                  'bg-rose-100 text-rose-800 animate-pulse'
                }`}>
                  {status.label}
                </span>
              </div>
              <div className="space-y-1">
                <h3 className="text-lg sm:text-xl font-extrabold text-slate-900 font-mono truncate">
                  {formatIDR(netProfit)}
                </h3>
                <div className={`flex items-center gap-1.5 text-[11px] font-semibold ${
                  status.col === 'emerald' ? 'text-emerald-700' :
                  status.col === 'amber' ? 'text-amber-700' :
                  'text-rose-700'
                }`}>
                  <span className="font-bold font-mono">{(profitRate * 100).toFixed(0)}%</span>
                  <span>Target: &gt;= {(targetProfit / 1000000000).toFixed(0)} M</span>
                </div>
              </div>
            </div>
          );
        })()}

        {/* Metric 3 */}
        {(() => {
          const status = getKPIStatus(cashflow, 'cashflow');
          return (
            <div className={`bg-white border-2 p-5 rounded-2xl shadow-sm hover:shadow-md transition-all ${
              status.col === 'emerald' ? 'border-emerald-500/30' :
              status.col === 'amber' ? 'border-amber-500/40' :
              'border-rose-500 ring-2 ring-rose-200'
            }`}>
              <div className="flex items-center justify-between pb-3">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">Arus Kas Bebas</span>
                <span className={`text-[9px] uppercase font-bold px-2 py-0.5 rounded-full ${
                  status.col === 'emerald' ? 'bg-emerald-100 text-emerald-800' :
                  status.col === 'amber' ? 'bg-amber-100 text-amber-800' :
                  'bg-rose-100 text-rose-800 animate-pulse'
                }`}>
                  {status.label}
                </span>
              </div>
              <div className="space-y-1">
                <h3 className="text-lg sm:text-xl font-extrabold text-slate-900 font-mono truncate">
                  {formatIDR(cashflow)}
                </h3>
                <div className={`flex items-center gap-1.5 text-[11px] font-semibold ${
                  status.col === 'emerald' ? 'text-emerald-700' :
                  status.col === 'amber' ? 'text-amber-700' :
                  'text-rose-700'
                }`}>
                  <span className={`h-2 h-2.5 w-2.5 rounded-full shrink-0 ${
                    status.col === 'emerald' ? 'bg-emerald-500' :
                    status.col === 'amber' ? 'bg-amber-500' : 'bg-rose-500'
                  }`}></span>
                  <span>Target: &gt;= {(targetCashflow / 1000000000).toFixed(0)} M</span>
                </div>
              </div>
            </div>
          );
        })()}

        {/* Metric 4 */}
        {(() => {
          const status = getKPIStatus(riskIndex, 'risk');
          return (
            <div className={`bg-white border-2 p-5 rounded-2xl shadow-sm hover:shadow-md transition-all ${
              status.col === 'emerald' ? 'border-emerald-500/30' :
              status.col === 'amber' ? 'border-amber-500/40' :
              'border-rose-500 ring-2 ring-rose-200'
            }`}>
              <div className="flex items-center justify-between pb-3">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">Indeks Risiko</span>
                <span className={`text-[9px] uppercase font-bold px-2 py-0.5 rounded-full ${
                  status.col === 'emerald' ? 'bg-emerald-100 text-emerald-800' :
                  status.col === 'amber' ? 'bg-amber-100 text-amber-800' :
                  'bg-rose-100 text-rose-800 animate-pulse'
                }`}>
                  {status.label}
                </span>
              </div>
              <div className="space-y-1">
                <h3 className={`text-lg sm:text-xl font-extrabold font-mono ${
                  status.col === 'rose' ? 'text-rose-600' : 'text-slate-900'
                }`}>
                  {riskIndex} / 100
                </h3>
                <div className={`flex items-center gap-1.5 text-[11px] font-semibold ${
                  status.col === 'emerald' ? 'text-emerald-600' :
                  status.col === 'amber' ? 'text-amber-600' :
                  'text-rose-600'
                }`}>
                  <span>Limit GCG: &lt;= {riskIndexMaxThreshold}</span>
                </div>
              </div>
            </div>
          );
        })()}
      </div>

      {/* Visual Analytics Charts Section (Recharts Integration) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6" id="dashboard_charts_section">
        {/* Chart 1: Revenue Growth Trend */}
        <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-sm space-y-4">
          <div className="flex items-center justify-between pb-1">
            <div>
              <h3 className="text-sm font-bold text-slate-950 flex items-center gap-2">
                <TrendingUp className="h-4.5 w-4.5 text-indigo-700" />
                <span>Tren Pertumbuhan Pendapatan Korporat</span>
              </h3>
              <p className="text-[11px] text-slate-400">
                Laporan historis 6 bulan & proyeksi pendapatan di PT {companyInfo.namaPerusahaan}
              </p>
            </div>
            <span className="text-[10px] bg-indigo-50 text-indigo-700 font-extrabold px-2 py-1 rounded font-mono">
              Live Updated
            </span>
          </div>

          <div className="h-[240px] w-full" id="revenue_growth_line_chart_container">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={revenueChartData}
                margin={{ top: 10, right: 10, left: -10, bottom: 0 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis 
                  dataKey="bulan" 
                  tick={{ fill: '#64748b', fontSize: 10, fontWeight: 600 }}
                  axisLine={{ stroke: '#e2e8f0' }}
                  tickLine={{ stroke: '#e2e8f0' }}
                />
                <YAxis 
                  tickFormatter={formatChartYAxis}
                  tick={{ fill: '#64748b', fontSize: 10, fontWeight: 500 }}
                  axisLine={{ stroke: '#e2e8f0' }}
                  tickLine={{ stroke: '#e2e8f0' }}
                />
                <Tooltip 
                  content={({ active, payload, label }) => {
                    if (active && payload && payload.length) {
                      return (
                        <div className="bg-slate-900 border border-slate-800 text-white p-3 rounded-xl shadow-xl text-xs space-y-1 font-mono">
                          <p className="font-sans font-extrabold border-b border-slate-800 pb-1 mb-1 text-slate-300">{label}</p>
                          <p className="text-indigo-400 font-bold flex justify-between gap-4">
                            <span>Aktif:</span>
                            <span>{formatIDR(payload[0].value as number)}</span>
                          </p>
                          <p className="text-emerald-400 font-bold flex justify-between gap-4">
                            <span>Target:</span>
                            <span>{formatIDR(payload[1].value as number)}</span>
                          </p>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <Legend 
                  wrapperStyle={{ fontSize: 11, paddingTop: 10, fontWeight: 600 }}
                  iconType="circle"
                />
                <Line 
                  name="Pendapatan Aktif" 
                  type="monotone" 
                  dataKey="Pendapatan Aktif" 
                  stroke="#4f46e5" 
                  strokeWidth={3}
                  activeDot={{ r: 6, stroke: '#ffffff', strokeWidth: 2 }}
                />
                <Line 
                  name="Target Direksi" 
                  type="monotone" 
                  dataKey="Target Direksi" 
                  stroke="#10b981" 
                  strokeWidth={2}
                  strokeDasharray="4 4"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Chart 2: Project Progress Detail */}
        <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-sm space-y-4">
          <div className="flex items-center justify-between pb-1">
            <div>
              <h3 className="text-sm font-bold text-slate-950 flex items-center gap-2">
                <Briefcase className="h-4.5 w-4.5 text-indigo-700" />
                <span>Evaluasi Kemajuan Proyek Direksi</span>
              </h3>
              <p className="text-[11px] text-slate-400">
                Peringkat realisasi proyek strategis PT berdasarkan klausul SOP aktif
              </p>
            </div>
            <span className="text-[10px] bg-emerald-50 text-emerald-700 font-extrabold px-2 py-1 rounded font-mono">
              Target 100%
            </span>
          </div>

          <div className="h-[240px] w-full" id="project_progress_bar_chart_container">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={projectsChartData}
                margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis 
                  dataKey="nama" 
                  tick={{ fill: '#64748b', fontSize: 9, fontWeight: 600 }}
                  axisLine={{ stroke: '#e2e8f0' }}
                  tickLine={{ stroke: '#e2e8f0' }}
                />
                <YAxis 
                  domain={[0, 100]}
                  unit="%"
                  tick={{ fill: '#64748b', fontSize: 10 }}
                  axisLine={{ stroke: '#e2e8f0' }}
                  tickLine={{ stroke: '#e2e8f0' }}
                />
                <Tooltip 
                  content={({ active, payload, label }) => {
                    if (active && payload && payload.length) {
                      return (
                        <div className="bg-slate-900 border border-slate-800 text-white p-3 rounded-xl shadow-xl text-xs space-y-1 font-mono">
                          <p className="font-sans font-extrabold border-b border-slate-800 pb-1 mb-1 text-slate-300">{label}</p>
                          <p className="text-indigo-400 font-bold flex justify-between gap-4">
                            <span>Realisasi:</span>
                            <span>{payload[0].value}%</span>
                          </p>
                          <p className="text-slate-400 font-bold flex justify-between gap-4">
                            <span>Sisa Gap:</span>
                            <span>{100 - (payload[0].value as number)}%</span>
                          </p>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <Legend 
                  wrapperStyle={{ fontSize: 11, paddingTop: 10, fontWeight: 600 }}
                  iconType="rect"
                />
                <Bar 
                  name="Kemajuan Saat Ini" 
                  dataKey="Kemajuan" 
                  fill="#4f46e5" 
                  radius={[5, 5, 0, 0]} 
                  maxBarSize={45}
                />
                <Bar 
                  name="Target Optimal" 
                  dataKey="Target" 
                  fill="#e2e8f0" 
                  radius={[5, 5, 0, 0]} 
                  maxBarSize={45} 
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Main Core Layout: Crisis Simulation & Daily Schedule Progress */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Crisis Action Center (Chapter 16) - Left Columns */}
        <div className="lg:col-span-7 bg-white border border-slate-200/80 rounded-2xl p-5 shadow-sm space-y-4" id="crisis_action_panel">
          <div>
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <Flame className="h-5 w-5 text-rose-600 shrink-0 animate-bounce" />
              <span>Pusat Kendali Penanganan Krisis (Chapter 16)</span>
            </h3>
            <p className="text-xs text-slate-500 mt-1">
              Sebagai CEO, setiap keputusan taktis Anda saat krisis diuji kepatuhannya terhadap prinsip pertanggungjawaban GCG.
            </p>
          </div>

          <AnimatePresence mode="wait">
            {!activeCrisis ? (
              <motion.div
                key="no-crisis"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="bg-slate-50 rounded-xl p-6 border border-dashed border-slate-200 text-center space-y-4"
              >
                <div className="text-sm text-slate-600 max-w-md mx-auto">
                  Semua sistem operasional PT {companyInfo.namaPerusahaan} berjalan seimbang. Uji kesiapan krisis Anda dengan memicu skenario luar biasa:
                </div>
                <div className="flex flex-wrap items-center justify-center gap-3">
                  <button
                    onClick={() => handleTriggerCrisis('cyber')}
                    className="bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200/60 font-semibold px-4 py-2.5 rounded-xl text-xs cursor-pointer transition-all flex items-center gap-2"
                  >
                    <AlertOctagon className="h-3.5 w-3.5" />
                    <span>Serangan Malware Siber</span>
                  </button>
                  <button
                    onClick={() => handleTriggerCrisis('accident')}
                    className="bg-amber-50 hover:bg-amber-100 text-amber-700 border border-amber-200/60 font-semibold px-4 py-2.5 rounded-xl text-xs cursor-pointer transition-all flex items-center gap-2"
                  >
                    <AlertOctagon className="h-3.5 w-3.5" />
                    <span>Kecelakaan Kerja Kritis</span>
                  </button>
                  <button
                    onClick={() => handleTriggerCrisis('union')}
                    className="bg-orange-50 hover:bg-orange-100 text-orange-700 border border-orange-200/60 font-semibold px-4 py-2.5 rounded-xl text-xs cursor-pointer transition-all flex items-center gap-2"
                  >
                    <AlertOctagon className="h-3.5 w-3.5" />
                    <span>Mogok Kerja Massal</span>
                  </button>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="active-crisis"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className="bg-rose-50/50 border border-rose-200/80 rounded-2xl p-5 space-y-4"
              >
                <div className="flex items-start gap-3">
                  <div className="h-10 w-10 rounded-lg bg-rose-600 text-white flex items-center justify-center animate-ping flex-shrink-0">
                    <Flame className="h-5 w-5" />
                  </div>
                  <div>
                    <span className="text-[10px] bg-rose-600 text-white px-2 py-0.5 rounded-md font-mono font-bold uppercase tracking-wider">
                      STATUS: BAHAYA UMUM KRITIS
                    </span>
                    <h4 className="text-base font-bold text-rose-950 mt-1">
                      {activeCrisis === 'cyber' && 'Kebocoran Basis Data & Ancaman Ransomware'}
                      {activeCrisis === 'accident' && 'Kecelakaan Fatal pada Wilayah Operasional Pabrik'}
                      {activeCrisis === 'union' && 'Mogok Kerja Serikat Pekerja Menuntut Kenaikan Upah'}
                    </h4>
                  </div>
                </div>

                {crisisResolutionPhase === 1 ? (
                  <div className="space-y-4">
                    <p className="text-sm text-slate-800 leading-relaxed font-medium">
                      {activeCrisis === 'cyber' &&
                        'Hacker mengirimkan denda tebusan 1 Juta USD atau data nasabah/formula bisnis penting disebarkan ke forum publik. Bagaimana instruksi mitigasi Anda?'}
                      {activeCrisis === 'accident' &&
                        'Alat berat mengalami malafungsi fatal mengakibatkan dua pekerja dirawat intensif. Media dan dinas pengawas K-3 pemerintah daerah berdatangan meminta rilis resmi. Apa keputusan Anda?'}
                      {activeCrisis === 'union' &&
                        'Serikat pekerja menuntut kenaikan upah pokok 20% secara instan di luar RKAP tahunan, atau jalur distribusi kargo pelabuhan akan ditutup total. Tindakan Anda?'}
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
                      <button
                        onClick={() => resolveCrisisAction('correct')}
                        className="bg-indigo-900 hover:bg-indigo-950 text-white p-4 rounded text-xs text-left font-semibold border border-indigo-950 flex items-start gap-2 cursor-pointer transition-all group"
                      >
                        <Shield className="h-4.5 w-4.5 text-emerald-400 shrink-0 mt-0.5 group-hover:scale-110 transition-transform" />
                        <div>
                          <div className="text-emerald-400 font-bold">TERAPKAN SOP KEPATUHAN GCG</div>
                          <span className="text-indigo-100 font-normal leading-relaxed block mt-1">
                            {activeCrisis === 'cyber' && 'Segera bentuk Crisis Center, akui fakta dengan jujur & tangani kebocoran siber berbaik hati.'}
                            {activeCrisis === 'accident' && 'Evakuasi medis korban terekam, beri jaminan finansial penuh, kooperatif investigasi.'}
                            {activeCrisis === 'union' && 'Buka diskusi bipartit kooperatif, carikan skema remunerasi meritokrasi adil dalam RKAP.'}
                          </span>
                        </div>
                      </button>

                      <button
                        onClick={() => resolveCrisisAction('incorrect')}
                        className="bg-white hover:bg-slate-50 text-slate-900 p-4 rounded text-xs text-left font-semibold border border-rose-200 flex items-start gap-2 cursor-pointer transition-all group"
                      >
                        <AlertOctagon className="h-4.5 w-4.5 text-rose-500 shrink-0 mt-0.5 group-hover:scale-110 transition-transform" />
                        <div>
                          <div className="text-rose-600 font-bold">PENANGANAN NON-STANDAR / INSTAN</div>
                          <span className="text-slate-600 font-normal leading-relaxed block mt-1">
                            {activeCrisis === 'cyber' && 'Sewa aparat tidak berizin untuk melacak peretas, abaikan pemberitahuan pers untuk menjaga saham.'}
                            {activeCrisis === 'accident' && 'Sembunyikan insiden dari dinas pengawas, bayar uang tutup mulut media lokal agar steril.'}
                            {activeCrisis === 'union' && 'Keluarkan perintah terminasi sepihak atas aktivis persatuan buruh untuk mengakhiri demonstrasi.'}
                          </span>
                        </div>
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className={`p-4 rounded-xl border ${crisisResolutionPhase === 2 ? 'bg-emerald-50 text-emerald-950 border-emerald-200/80' : 'bg-red-50 text-red-950 border-red-200/80'}`}>
                      <h5 className="font-bold text-sm flex items-center gap-2">
                        {crisisResolutionPhase === 2 ? (
                          <>
                            <CheckCircle className="h-4.5 w-4.5 text-emerald-600" />
                            <span>Krisis Teratasi dengan BenarSesuai GCG</span>
                          </>
                        ) : (
                          <>
                            <AlertOctagon className="h-4.5 w-4.5 text-red-600" />
                            <span>Krisis Berakhir dengan Dampak Hukum Fatal!</span>
                          </>
                        )}
                      </h5>

                      <div className="mt-3 space-y-1.5 text-xs">
                        {crisisLog.map((log, i) => (
                          <div key={i} className="flex gap-2">
                            <span>•</span>
                            <span>{log}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <button
                      onClick={handleFinishCrisisSimulation}
                      className="bg-indigo-900 hover:bg-indigo-950 text-white px-5 py-2 rounded text-xs font-semibold cursor-pointer transition-all flex items-center gap-1.5 mx-auto"
                    >
                      <span>Selesaikan Simulasi & Refresh Sistem</span>
                      <ArrowRight className="h-3.5 w-3.5" />
                    </button>
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Sub Panel: Secondary interactive indicators */}
          <div className="grid grid-cols-3 gap-3">
            {(() => {
              const status = getKPIStatus(csi, 'csi');
              return (
                <div className={`p-3 rounded-xl border text-center space-y-1.5 transition-all ${
                  status.col === 'emerald' ? 'bg-emerald-50/40 border-emerald-300/80 shadow-sm' :
                  status.col === 'amber' ? 'bg-amber-50/40 border-amber-300/80' :
                  'bg-rose-50/80 border-rose-400 animate-pulse'
                }`}>
                  <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wide block truncate">Kepuasan Klien</span>
                  <div className="flex items-center justify-center gap-1 font-mono font-bold text-sm">
                    <Smile className={`h-4 w-4 shrink-0 ${
                      status.col === 'emerald' ? 'text-emerald-605 text-emerald-600' :
                      status.col === 'amber' ? 'text-amber-500' : 'text-rose-600'
                    }`} />
                    <span className={status.col === 'rose' ? 'text-rose-700' : 'text-slate-900'}>{csi}%</span>
                  </div>
                  <div className="text-[8.5px] font-semibold text-slate-400">Target: &gt;=90%</div>
                </div>
              );
            })()}

            {(() => {
              const status = getKPIStatus(employeePerf, 'employee');
              return (
                <div className={`p-3 rounded-xl border text-center space-y-1.5 transition-all ${
                  status.col === 'emerald' ? 'bg-emerald-50/40 border-emerald-300/80 shadow-sm' :
                  status.col === 'amber' ? 'bg-amber-50/40 border-amber-300/80' :
                  'bg-rose-50/80 border-rose-400 animate-pulse'
                }`}>
                  <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wide block truncate">Kinerja Tim</span>
                  <div className="flex items-center justify-center gap-1 font-mono font-bold text-sm">
                    <Users className={`h-4 w-4 shrink-0 ${
                      status.col === 'emerald' ? 'text-emerald-605 text-emerald-600' :
                      status.col === 'amber' ? 'text-amber-500' : 'text-rose-600'
                    }`} />
                    <span className={status.col === 'rose' ? 'text-rose-700' : 'text-slate-900'}>{employeePerf}%</span>
                  </div>
                  <div className="text-[8.5px] font-semibold text-slate-400">Target: &gt;=85%</div>
                </div>
              );
            })()}

            {(() => {
              const status = getKPIStatus(projectProgress, 'project');
              return (
                <div className={`p-3 rounded-xl border text-center space-y-1.5 transition-all ${
                  status.col === 'emerald' ? 'bg-emerald-50/40 border-emerald-300/80 shadow-sm' :
                  status.col === 'amber' ? 'bg-amber-50/40 border-amber-300/80' :
                  'bg-rose-50/80 border-rose-400 animate-pulse'
                }`}>
                  <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wide block truncate">Progres SOP</span>
                  <div className="flex items-center justify-center gap-1 font-mono font-bold text-sm">
                    <Briefcase className={`h-4 w-4 shrink-0 ${
                      status.col === 'emerald' ? 'text-emerald-605 text-emerald-600' :
                      status.col === 'amber' ? 'text-amber-500' : 'text-rose-600'
                    }`} />
                    <span className={status.col === 'rose' ? 'text-rose-700' : 'text-slate-900'}>{projectProgress}%</span>
                  </div>
                  <div className="text-[8.5px] font-semibold text-slate-400">Target: &gt;=80%</div>
                </div>
              );
            })()}
          </div>
        </div>

        {/* CEO Daily Schedule PROGRESS COMPONENT (Chapter 10) - Right Columns */}
        <div className="lg:col-span-5 bg-white border border-slate-200/80 rounded-2xl p-5 shadow-sm flex flex-col justify-between" id="daily_routine_panel">
          <div className="space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <Award className="h-5 w-5 text-indigo-600 shrink-0" />
                <span>SOP Agenda Harian Aktif (Chapter 10)</span>
              </h3>
              <button
                onClick={resetScheduleSimulator}
                className="text-[10px] text-indigo-600 hover:text-indigo-800 font-semibold uppercase"
              >
                Reset Hari
              </button>
            </div>

            <p className="text-xs text-slate-500 leading-relaxed">
              Jalankan tugas pengawasan eksekutif harian CEO agar indikator keuangan, kelayakan K3, dan kepatuhan hukum PT terjaga optimal.
            </p>

            <div className="relative border-l border-slate-200 pl-4 py-1 space-y-6 ml-3" id="daily_timeline_scroller">
              {/* Routine Item 1 */}
              <div className="relative">
                <div className={`absolute -left-[24.5px] top-1.5 h-4.5 w-4.5 rounded-full border-4 border-white flex items-center justify-center ${
                  completedDailySchedule['07:00']
                    ? 'bg-emerald-500'
                    : currentHour === '07:00' ? 'bg-indigo-600 animate-pulse ring-4 ring-indigo-500/20' : 'bg-slate-300'
                }`} />
                <div className="space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-[10.5px] font-mono font-bold text-slate-400">JAM 07.00 - 09.00</span>
                    {completedDailySchedule['07:00'] && (
                      <span className="text-[10px] text-emerald-600 font-bold bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-100">
                        Disetujui
                      </span>
                    )}
                  </div>
                  <h4 className="font-bold text-sm text-slate-800">Analisis Internal & Cashflow</h4>
                  <p className="text-xs text-slate-500">Membaca Executive dashboard, menyetujui sirkulasi cashflow, mereview mitigasi K3.</p>
                  {currentHour === '07:00' && (
                    <button
                      onClick={() => executeDailyActivity('07:00')}
                      className="mt-2 bg-indigo-900 hover:bg-indigo-950 text-white px-3 py-1.5 rounded text-[10.5px] font-bold cursor-pointer flex items-center gap-1"
                      id="btn_execute_07"
                    >
                      <Play className="h-3 w-3" />
                      <span>Review & Tanda Tangan Kas</span>
                    </button>
                  )}
                </div>
              </div>

              {/* Routine Item 2 */}
              <div className="relative">
                <div className={`absolute -left-[24.5px] top-1.5 h-4.5 w-4.5 rounded-full border-4 border-white flex items-center justify-center ${
                  completedDailySchedule['09:00']
                    ? 'bg-emerald-500'
                    : currentHour === '09:00' ? 'bg-indigo-600 animate-pulse ring-4 ring-indigo-500/20' : 'bg-slate-300'
                }`} />
                <div className="space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-[10.5px] font-mono font-bold text-slate-400">JAM 09.00 - 12.00</span>
                    {completedDailySchedule['09:00'] && (
                      <span className="text-[10px] text-emerald-600 font-bold bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-100">
                        Selesai Rapat
                      </span>
                    )}
                  </div>
                  <h4 className="font-bold text-sm text-slate-800">Rapat Dewan Komisaris & Klien</h4>
                  <p className="text-xs text-slate-500">Bernegosiasi kemitraan luar negeri, menyusun restrukturisasi dengan dewan pengawas.</p>
                  {currentHour === '09:00' && (
                    <button
                      onClick={() => executeDailyActivity('09:00')}
                      className="mt-2 bg-indigo-900 hover:bg-indigo-950 text-white px-3 py-1.5 rounded text-[10.5px] font-bold cursor-pointer flex items-center gap-1"
                      id="btn_execute_09"
                    >
                      <Play className="h-3 w-3" />
                      <span>Mulai Aliansi Strategis</span>
                    </button>
                  )}
                </div>
              </div>

              {/* Routine Item 3 */}
              <div className="relative">
                <div className={`absolute -left-[24.5px] top-1.5 h-4.5 w-4.5 rounded-full border-4 border-white flex items-center justify-center ${
                  completedDailySchedule['13:00']
                    ? 'bg-emerald-500'
                    : currentHour === '13:00' ? 'bg-indigo-600 animate-pulse ring-4 ring-indigo-500/20' : 'bg-slate-300'
                }`} />
                <div className="space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-[10.5px] font-mono font-bold text-slate-400">JAM 13.00 - 17.00</span>
                    {completedDailySchedule['13:00'] && (
                      <span className="text-[10px] text-emerald-600 font-bold bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-100">
                        Disetujui
                      </span>
                    )}
                  </div>
                  <h4 className="font-bold text-sm text-slate-800">Keputusan Eksekutif & Delegasi</h4>
                  <p className="text-xs text-slate-500">Menyetujui promosi SDM untuk mutasi {companyInfo.jumlahKaryawan} staf PT, meneliti monitoring KPI kuartal.</p>
                  {currentHour === '13:00' && (
                    <button
                      onClick={() => executeDailyActivity('13:00')}
                      className="mt-2 bg-indigo-900 hover:bg-indigo-950 text-white px-3 py-1.5 rounded text-[10.5px] font-bold cursor-pointer flex items-center gap-1"
                      id="btn_execute_13"
                    >
                      <Play className="h-3 w-3" />
                      <span>Sahkan Kebijakan & KPI</span>
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500 font-mono">
            <span>Progress Kerja:</span>
            <span className="font-bold text-indigo-600">
              {currentHour === 'done' ? '100% Selesai Tuntas' : `${Math.round(Object.keys(completedDailySchedule).length * 33.3)}%`}
            </span>
          </div>
        </div>
      </div>

      {/* Corporate Risk Register Log (Chapter 14) */}
      <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-sm" id="risk_register_panel">
        <h3 className="text-base font-bold text-slate-900 pb-3 border-b border-slate-100 flex items-center gap-2">
          <Shield className="h-5 w-5 text-slate-700 shrink-0" />
          <span>Buku Daftar Identifikasi Risiko Korporat Aktif (Chapter 14)</span>
        </h3>

        <div className="overflow-x-auto mt-4 rounded-xl border border-slate-200">
          <table className="w-full text-sm text-left text-slate-600">
            <thead className="text-xs text-slate-500 uppercase bg-slate-50 font-bold">
              <tr>
                <th className="px-4 py-3">Kategori</th>
                <th className="px-4 py-3">Identifikasi Risiko</th>
                <th className="px-4 py-3">Dampak Potensial</th>
                <th className="px-4 py-3">Mitigasi Prosedur</th>
                <th className="px-4 py-3 text-center">Tingkat Bahaya</th>
                <th className="px-4 py-3">Pemilik Risiko</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 font-sans">
              {risks.map((risk, index) => (
                <tr key={index} className="hover:bg-slate-50/50 bg-white">
                  <td className="px-4 py-3.5 font-semibold text-slate-900">{risk.kategori}</td>
                  <td className="px-4 py-3.5 leading-relaxed">{risk.identifikasi}</td>
                  <td className="px-4 py-3.5 text-xs font-medium text-rose-700 whitespace-pre-wrap">{risk.dampak}</td>
                  <td className="px-4 py-3.5 text-xs text-slate-600 whitespace-pre-wrap">{risk.mitigasi}</td>
                  <td className="px-4 py-3.5 text-center whitespace-nowrap">
                    <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold border ${
                      risk.level === 'KRITIS'
                        ? 'bg-red-100 text-red-800 border-red-200'
                        : risk.level === 'TINGGI'
                          ? 'bg-rose-50 text-rose-800 border-rose-200'
                          : risk.level === 'SEDANG'
                            ? 'bg-amber-50 text-amber-800 border-amber-200'
                            : 'bg-emerald-50 text-emerald-800 border-emerald-200'
                    }`}>
                      {risk.level}
                    </span>
                  </td>
                  <td className="px-4 py-3.5 text-xs font-mono font-bold text-slate-500">{risk.pemilik}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
