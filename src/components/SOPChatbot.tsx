import React, { useState, useRef, useEffect } from 'react';
import { CompanyInfo } from '../types';
import { 
  MessageSquare, 
  Send, 
  X, 
  Loader2, 
  Sparkles, 
  Trash2, 
  ChevronDown, 
  Maximize2, 
  Minimize2, 
  HelpCircle,
  ShieldCheck,
  Award
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface SOPChatbotProps {
  companyInfo: CompanyInfo;
  activeChapterTitle: string;
  activeChapterContent: string;
}

interface Message {
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

export default function SOPChatbot({
  companyInfo,
  activeChapterTitle,
  activeChapterContent
}: SOPChatbotProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isMaximized, setIsMaximized] = useState(false);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: `Selamat datang! Saya adalah **Asisten AI Konsultan Manajemen** untuk PT **${companyInfo.namaPerusahaan}**.

Saya dapat membantu Anda menguji, mengaudit keselarasan **ISO 9001:2015**, mengikhtisarkan klausul GCG, atau menyusun draf klausul SOP operasional yang taktis.

👉 *Gunakan jalan pintas konsultasi cepat di bawah untuk langsung menganalisis klausul yang saat ini sedang dibuka!*`,
      timestamp: new Date()
    }
  ]);

  const chatEndRef = useRef<HTMLDivElement>(null);

  // Auto scroll to bottom
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  const handleSendMessage = async (customMessage?: string) => {
    const messageText = customMessage || inputMessage.trim();
    if (!messageText || isLoading) return;

    if (!customMessage) {
      setInputMessage('');
    }

    const newUserMessage: Message = {
      role: 'user',
      content: messageText,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, newUserMessage]);
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          message: messageText,
          history: messages.map(msg => ({
            role: msg.role,
            content: msg.content
          })),
          context: {
            companyInfo,
            activeChapterTitle,
            activeChapterContent
          }
        })
      });

      if (!response.ok) {
        throw new Error('Gagal terhubung dengan server konsultasi AI.');
      }

      const data = await response.json();
      
      if (data.error) {
        throw new Error(data.error);
      }

      setMessages(prev => [...prev, {
        role: 'assistant',
        content: data.text || 'Gagal memformulasikan jawaban.',
        timestamp: new Date()
      }]);
    } catch (error: any) {
      console.error('Chat AI Error:', error);
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: `❌ **Terjadi kendala:** ${error.message || 'Gagal merespons. Pastikan GEMINI_API_KEY Anda telah dikonfigurasi dan aktif.'}

*Silakan periksa konfigurasi Secrets aplikasi di panel atas jika Anda menggunakan private environment.*`,
        timestamp: new Date()
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const clearChat = () => {
    if (window.confirm('Hapus seluruh riwayat percakapan konsultasi saat ini?')) {
      setMessages([
        {
          role: 'assistant',
          content: `Percakapan dikosongkan. Layanan konsultasi siap menerima pertanyaan baru terkait SOP PT **${companyInfo.namaPerusahaan}**.`,
          timestamp: new Date()
        }
      ]);
    }
  };

  // Safe markdown inline text formatter
  const parseInlineMarkdown = (text: string) => {
    const parts: React.ReactNode[] = [];
    let lastIndex = 0;

    // Bold Markdown regex: **text**
    const boldRegex = /\*\*(.*?)\*\*/g;
    let match;

    while ((match = boldRegex.exec(text)) !== null) {
      const prevText = text.substring(lastIndex, match.index);
      if (prevText) {
        parts.push(...parseCodeSegments(prevText));
      }
      parts.push(<strong key={`bold-${match.index}`} className="font-extrabold text-slate-900">{match[1]}</strong>);
      lastIndex = boldRegex.lastIndex;
    }

    const remaining = text.substring(lastIndex);
    if (remaining) {
      parts.push(...parseCodeSegments(remaining));
    }

    return parts.length > 0 ? parts : text;
  };

  // Code inline markdown parser helper: `code`
  const parseCodeSegments = (text: string) => {
    const segments: React.ReactNode[] = [];
    let lastIdx = 0;
    const codeRegex = /`(.*?)`/g;
    let match;

    while ((match = codeRegex.exec(text)) !== null) {
      const prev = text.substring(lastIdx, match.index);
      if (prev) segments.push(prev);
      segments.push(
        <code key={`code-${match.index}`} className="bg-slate-100 text-amber-800 px-1 py-0.5 rounded font-mono text-[10px] border border-slate-200/50">
          {match[1]}
        </code>
      );
      lastIdx = codeRegex.lastIndex;
    }

    const rem = text.substring(lastIdx);
    if (rem) segments.push(rem);

    return segments;
  };

  // Safe markdown block formatter
  const renderMarkdown = (text: string) => {
    const lines = text.split('\n');
    return lines.map((line, idx) => {
      // Headers
      if (line.startsWith('### ')) {
        return (
          <h4 key={idx} className="text-xs font-extrabold text-indigo-950 uppercase mt-3 mb-1 flex items-center gap-1.5 border-b border-indigo-50 pb-0.5">
            <Sparkles className="h-3.5 w-3.5 text-indigo-700" />
            <span>{line.replace('### ', '')}</span>
          </h4>
        );
      }
      if (line.startsWith('## ')) {
        return (
          <h3 key={idx} className="text-sm font-bold text-indigo-900 mt-4 mb-2 border-l-4 border-indigo-800 pl-2">
            {line.replace('## ', '')}
          </h3>
        );
      }
      if (line.startsWith('# ')) {
        return (
          <h2 key={idx} className="text-base font-extrabold text-indigo-955 mt-4 mb-2 text-indigo-900">
            {line.replace('# ', '')}
          </h2>
        );
      }

      // Blockquote
      if (line.trim().startsWith('> ')) {
        return (
          <div key={idx} className="my-2 border-l-4 border-slate-300 bg-slate-50 p-2.5 rounded-r text-xs text-slate-600 italic">
            {parseInlineMarkdown(line.trim().replace(/^>\s+/, ''))}
          </div>
        );
      }

      // Bullets list items
      if (line.trim().startsWith('- ') || line.trim().startsWith('* ')) {
        const cleanBullet = line.trim().replace(/^[-*]\s+/, '');
        return (
          <li key={idx} className="ml-5 list-disc text-xs text-slate-700 leading-relaxed mb-1 font-sans">
            {parseInlineMarkdown(cleanBullet)}
          </li>
        );
      }

      // Empty blank spacer line
      if (line.trim() === '') {
        return <div key={idx} className="h-2" />;
      }

      // Normal text paragraphs
      return (
        <p key={idx} className="text-xs text-slate-700 leading-relaxed mb-1.5 font-sans">
          {parseInlineMarkdown(line)}
        </p>
      );
    });
  };

  return (
    <div className="fixed bottom-6 right-6 z-[9999] flex flex-col items-end" id="sop_ai_assistant_root_container">
      {/* Dynamic Chat Overlay window content */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 15, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 15, scale: 0.95 }}
            transition={{ duration: 0.18 }}
            className={`bg-white rounded-2xl border border-slate-250 border-slate-200/90 shadow-2xl flex flex-col overflow-hidden mb-3 select-none ${
              isMaximized ? 'w-[calc(100vw-48px)] h-[calc(100vh-120px)] max-w-4xl max-h-[850px]' : 'w-80 sm:w-96 h-[500px]'
            }`}
            id="ai_chatbot_window"
          >
            {/* Header section bar */}
            <div className="bg-indigo-900 px-4 py-3 text-white flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center border border-white/20">
                  <Sparkles className="h-4.5 w-4.5 text-amber-300 animate-pulse" />
                </div>
                <div>
                  <h3 className="text-xs sm:text-sm font-bold tracking-tight">AI Konsultan Manajemen</h3>
                  <div className="flex items-center gap-1.5 mt-0.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping"></span>
                    <span className="text-[10px] text-indigo-200 uppercase font-bold tracking-wider">MENDUKUNG GCG & ISO 9001</span>
                  </div>
                </div>
              </div>

              {/* Action buttons on header */}
              <div className="flex items-center gap-1">
                <button
                  onClick={() => setIsMaximized(!isMaximized)}
                  className="p-1.5 hover:bg-white/10 text-indigo-200 hover:text-white rounded transition-colors cursor-pointer"
                  title={isMaximized ? "Perkecil Jendela" : "Perbesar Jendela"}
                >
                  {isMaximized ? <Minimize2 className="h-3.5 w-3.5" /> : <Maximize2 className="h-3.5 w-3.5" />}
                </button>
                <button
                  onClick={clearChat}
                  className="p-1.5 hover:bg-white/10 text-indigo-200 hover:text-rose-300 rounded transition-colors cursor-pointer"
                  title="Hapus Percakapan"
                >
                  <Trash2 className="h-3.5 w-3.5" />
                </button>
                <div className="w-px h-4.5 bg-white/20 mx-1"></div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1.5 hover:bg-white/10 text-indigo-200 hover:text-white rounded transition-colors cursor-pointer"
                  title="Tutup Chat"
                >
                  <X className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>

            {/* Active context informational bar */}
            <div className="bg-slate-50 border-b border-slate-150 px-4 py-2 flex items-center justify-between text-[11px] text-slate-500 font-sans border-b border-slate-100">
              <div className="flex items-center gap-1.5 truncate">
                <ShieldCheck className="h-3.5 w-3.5 text-indigo-900 shrink-0" />
                <span className="truncate">Context: <strong className="text-slate-800">{activeChapterTitle || 'Klausul Terpilih'}</strong></span>
              </div>
              <span className="text-[10px] bg-slate-200 text-slate-600 px-1.5 py-0.5 rounded font-mono font-semibold shrink-0">
                ACTIVE
              </span>
            </div>

            {/* MESSAGE LIST CHAT AREA */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50/20 select-text" id="ai_chatbox_messages">
              {messages.map((msg, index) => {
                const isAssistant = msg.role === 'assistant';
                return (
                  <div
                    key={index}
                    className={`flex ${isAssistant ? 'justify-start' : 'justify-end'}`}
                  >
                    <div className={`max-w-[85%] rounded-2xl px-4 py-3 text-xs shadow-sm font-sans relative ${
                      isAssistant 
                        ? 'bg-white text-slate-800 border border-slate-100 rounded-tl-sm' 
                        : 'bg-indigo-900 text-white rounded-tr-sm'
                    }`}>
                      {/* Message Content */}
                      <div className="space-y-1">
                        {isAssistant ? renderMarkdown(msg.content) : <p className="leading-relaxed whitespace-pre-wrap">{msg.content}</p>}
                      </div>
                      <span className={`text-[9px] block mt-1.5 ${isAssistant ? 'text-slate-400 text-left' : 'text-indigo-200 text-right'}`}>
                        {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </span>
                    </div>
                  </div>
                );
              })}

              {/* Loader response state */}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-white border border-slate-100 rounded-2xl rounded-tl-sm px-4 py-3 text-xs text-slate-500 shadow-sm flex items-center gap-3">
                    <Loader2 className="h-4 w-4 text-indigo-900 animate-spin shrink-0" />
                    <span className="italic font-medium">Biro Consultant AI sedang memformulasikan analisis...</span>
                  </div>
                </div>
              )}
              
              <div ref={chatEndRef} />
            </div>

            {/* PRE-CHIPS CONSULTATION SHORTCUT OPTIONS */}
            <div className="bg-white px-3 py-2 border-t border-slate-100/80">
              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mb-1.5 px-1 flex items-center gap-1">
                <Award className="h-3.5 w-3.5 text-amber-500" />
                <span>PILIH MENU KONSULTASI DIREKSI</span>
              </p>
              <div className="flex flex-wrap gap-1 max-h-24 overflow-y-auto py-0.5 scrollbar-thin">
                <button
                  type="button"
                  onClick={() => handleSendMessage(`Mohon buatkan Ringkasan Eksekutif (Executive Summary) yang padat mengenai Klausul: "${activeChapterTitle}".`)}
                  className="bg-slate-50 hover:bg-slate-100 border border-slate-200/80 text-[10px] text-indigo-950 font-bold px-2 py-1 rounded transition-colors cursor-pointer"
                  disabled={isLoading}
                >
                  📝 Ringkas Klausul Ini
                </button>
                <button
                  type="button"
                  onClick={() => handleSendMessage(`Uraikan bagaimana Klausul "${activeChapterTitle}" menyelaraskan diri dan memenuhi standar sistem manajemen mutu ISO 9001:2015.`)}
                  className="bg-slate-50 hover:bg-slate-100 border border-slate-200/80 text-[10px] text-indigo-950 font-bold px-2 py-1 rounded transition-colors cursor-pointer"
                  disabled={isLoading}
                >
                  ⚙️ Audit Kepatuhan ISO 9001
                </button>
                <button
                  type="button"
                  onClick={() => handleSendMessage(`Tolong berikan 3 Rekomendasi Perbaikan Taktis & Praktis untuk Klausul: "${activeChapterTitle}" guna memitigasi risiko hukum dan finansial.`)}
                  className="bg-slate-50 hover:bg-slate-100 border border-slate-200/80 text-[10px] text-indigo-950 font-bold px-2 py-1 rounded transition-colors cursor-pointer"
                  disabled={isLoading}
                >
                  💡 Berikan Saran Perbaikan
                </button>
                <button
                  type="button"
                  onClick={() => handleSendMessage(`Beri penjelasan mendalam mengenai wewenang puncak Direktur Utama pada Klausul "${activeChapterTitle}" berdasarkan aturan kepatuhan Good Corporate Governance (GCG) di Indonesia.`)}
                  className="bg-slate-50 hover:bg-slate-100 border border-slate-200/80 text-[10px] text-indigo-950 font-bold px-2 py-1 rounded transition-colors cursor-pointer"
                  disabled={isLoading}
                >
                  ⚖️ Wewenang Direksi & Tata Kelola
                </button>
              </div>
            </div>

            {/* CHAT INPUT AREA */}
            <form
              onSubmit={(e) => { e.preventDefault(); handleSendMessage(); }}
              className="bg-slate-50/50 p-3 border-t border-slate-150 flex gap-2"
              id="ai_chat_form"
            >
              <input
                type="text"
                placeholder="Diskusikan perbaikan SOP atau tanyakan regulasi..."
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                disabled={isLoading}
                className="flex-1 bg-white border border-slate-250 border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-700 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-900/15 focus:border-indigo-900 transition-all font-sans"
                id="ai_chat_input_field"
              />
              <button
                type="submit"
                disabled={isLoading || !inputMessage.trim()}
                className={`w-9 h-9 rounded-xl flex items-center justify-center text-white transition-all cursor-pointer shadow ${
                  isLoading || !inputMessage.trim() 
                    ? 'bg-slate-300 pointer-events-none' 
                    : 'bg-indigo-900 hover:bg-indigo-950 shadow-indigo-900/10'
                }`}
                id="btn_send_chat_message"
              >
                <Send className="h-4 w-4" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Trigger Balloon Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="h-14 px-5 bg-indigo-900 hover:bg-indigo-950 text-white rounded-full shadow-2xl flex items-center gap-2.5 cursor-pointer border-2 border-indigo-950 group relative overflow-hidden"
        id="btn_ai_chatbot_trigger"
      >
        <span className="absolute inset-0 bg-gradient-to-tr from-amber-300/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></span>
        <div className="relative">
          <MessageSquare className="h-5.5 w-5.5 group-hover:rotate-6 transition-transform" />
          <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-amber-400 border border-indigo-900 rounded-full animate-pulse"></span>
        </div>
        <span className="text-xs font-extrabold tracking-wide uppercase select-none font-sans">
          {isOpen ? 'Tutup Konsultan' : 'Konsultasi AI SOP'}
        </span>
      </motion.button>
    </div>
  );
}
