import React, { useState } from 'react';
import { CompanyInfo } from '../types';
import { FileText, Printer, RefreshCw, Save, Search, Settings, Check, ChevronRight, FileDown } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { generateSOPPDF } from '../utils/pdfGenerator';

interface SOPDocumentViewProps {
  companyInfo: CompanyInfo;
  chapters: Array<{ id: number; title: string; content: string }>;
  onUpdateChapter: (id: number, content: string) => void;
  onResetAll: () => void;
  selectedChapterId: number;
  onSelectChapter: (id: number) => void;
}

export default function SOPDocumentView({
  companyInfo,
  chapters,
  onUpdateChapter,
  onResetAll,
  selectedChapterId,
  onSelectChapter
}: SOPDocumentViewProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [editContent, setEditContent] = useState('');
  const [savedAlert, setSavedAlert] = useState(false);

  const selectedChapter = chapters.find(c => c.id === selectedChapterId) || chapters[0];

  const handleSelectChapter = (id: number) => {
    onSelectChapter(id);
    setIsEditing(false);
    setEditContent('');
  };

  const handleStartEdit = () => {
    setEditContent(selectedChapter.content);
    setIsEditing(true);
  };

  const handleSaveEdit = () => {
    onUpdateChapter(selectedChapterId, editContent);
    setIsEditing(false);
    setSavedAlert(true);
    setTimeout(() => setSavedAlert(false), 3000);
  };

  const handlePrint = () => {
    generateSOPPDF(companyInfo, chapters);
  };

  const filteredChapters = chapters.filter(c =>
    c.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.content.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 h-[calc(100vh-220px)] min-h-[550px]" id="sop_document_view_container">
      {/* Sidebar: Navigation Column */}
      <div className="lg:col-span-4 bg-white/95 backdrop-blur-md rounded-2xl border border-slate-200/80 shadow-sm flex flex-col h-full overflow-hidden" id="sop_sidebar">
        <div className="p-4 border-bottom border-slate-100 flex flex-col gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
            <input
              type="text"
              placeholder="Cari klausul/SOP..."
              className="w-full pl-9 pr-4 py-2 bg-slate-50/80 hover:bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-700 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-500 transition-all font-sans"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              id="sop_search_input"
            />
          </div>
          <div className="flex items-center justify-between text-xs text-slate-400 font-mono px-1">
            <span>Daftar Bab & Klausul ({filteredChapters.length})</span>
            <button
              onClick={onResetAll}
              className="flex items-center gap-1 hover:text-red-500 transition-colors"
              title="Reset Dokumen ke Default"
            >
              <RefreshCw className="h-3 w-3" />
              <span>Reset</span>
            </button>
          </div>
        </div>

        {/* Scrollable list */}
        <div className="flex-1 overflow-y-auto px-2 pb-4 scrollbar-thin scrollbar-thumb-slate-200 hover:scrollbar-thumb-slate-300" id="sop_chapters_list">
          <div className="space-y-1">
            {filteredChapters.map((ch) => {
              const isSelected = ch.id === selectedChapterId;
              return (
                <button
                  key={ch.id}
                  onClick={() => handleSelectChapter(ch.id)}
                  className={`w-full text-left p-3 transition-all flex items-center justify-between group ${
                    isSelected
                      ? 'bg-indigo-55 bg-indigo-50 border-l-4 border-indigo-900 text-indigo-900 font-bold rounded-r-xl'
                      : 'hover:bg-slate-100 text-slate-600 rounded-xl'
                  }`}
                  id={`btn_chapter_${ch.id}`}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <FileText className={`h-4.5 w-4.5 shrink-0 ${isSelected ? 'text-indigo-900' : 'text-slate-400 group-hover:text-slate-600'}`} />
                    <span className="text-sm font-medium truncate font-sans">{ch.title}</span>
                  </div>
                  <ChevronRight className={`h-4 w-4 shrink-0 transition-transform ${isSelected ? 'text-indigo-900 translate-x-0.5' : 'text-slate-300 group-hover:text-slate-500'}`} />
                </button>
              );
            })}
            {filteredChapters.length === 0 && (
              <div className="text-center p-8 text-sm text-slate-400 font-sans">
                Tidak ada Klausul yang cocok dengan pencarian Anda.
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Main Panel: Viewer & Rich Editor */}
      <div className="lg:col-span-8 bg-white rounded-2xl border border-slate-200 shadow-sm flex flex-col h-full overflow-hidden" id="sop_main_content">
        {/* Header Action Bar */}
        <div className="px-6 py-4 border-b border-slate-100 bg-slate-50/50 flex flex-wrap items-center justify-between gap-4">
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2 text-xs font-mono text-indigo-900 font-bold uppercase tracking-wider mb-0.5">
              <span>SOP Kode Kepatuhan</span>
              <span>•</span>
              <span>ISO 9001:2015 / GCG</span>
            </div>
            <h2 className="text-lg font-bold text-slate-900 font-sans truncate">{selectedChapter.title}</h2>
          </div>
          
          <div className="flex items-center gap-2">
            <AnimatePresence>
              {savedAlert && (
                <motion.span
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className="bg-emerald-50 text-emerald-700 text-xs px-2.5 py-1.5 rounded border border-emerald-200/60 font-sans font-medium flex items-center gap-1.5"
                >
                  <Check className="h-3.5 w-3.5 shrink-0" />
                  Perubahan Berhasil Disimpan
                </motion.span>
              )}
            </AnimatePresence>

            {isEditing ? (
              <button
                onClick={handleSaveEdit}
                className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded shadow-sm text-sm font-semibold transition-all shadow-emerald-600/10 cursor-pointer"
                id="btn_save_sop"
              >
                <Save className="h-4 w-4" />
                <span>Simpan Klausul</span>
              </button>
            ) : (
              <button
                onClick={handleStartEdit}
                className="flex items-center gap-2 bg-indigo-900 hover:bg-indigo-950 text-white px-4 py-2 rounded shadow-sm text-sm font-semibold transition-all cursor-pointer"
                id="btn_edit_sop"
              >
                <Settings className="h-4 w-4" />
                <span>Edit Dokumen</span>
              </button>
            )}

            <button
              onClick={handlePrint}
              className="flex items-center gap-2 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200 px-4 py-2 rounded text-sm font-bold transition-all shadow-sm cursor-pointer"
              id="btn_print_sop"
            >
              <FileDown className="h-4 w-4 text-emerald-700" />
              <span>Unduh PDF Resmi</span>
            </button>
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 p-6 overflow-y-auto bg-slate-50/20">
          <AnimatePresence mode="wait">
            {isEditing ? (
              <motion.div
                key="editor"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="h-full flex flex-col gap-3"
              >
                <p className="text-xs text-slate-400 font-sans">
                  *Anda sedang mengedit klausul resmi ini. Sesuaikan rincian operasional PT Anda. Gunakan format korporasi formal.
                </p>
                <textarea
                  className="w-full flex-1 p-4 bg-white border border-slate-300 rounded-xl font-mono text-sm leading-relaxed text-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-800"
                  value={editContent}
                  onChange={(e) => setEditContent(e.target.value)}
                  placeholder="Ketik konten dokumen di sini..."
                  id="sop_editor_textarea"
                />
              </motion.div>
            ) : (
              <motion.div
                key="viewer"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="prose prose-slate max-w-none font-sans"
              >
                <div className="bg-white border border-slate-200/60 p-6 sm:p-8 rounded-2xl shadow-sm text-slate-700 leading-relaxed font-sans whitespace-pre-wrap select-text">
                  {selectedChapter.content}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
