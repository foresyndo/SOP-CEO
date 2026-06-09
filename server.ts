import express from "express";
import path from "path";
import dotenv from "dotenv";
import { GoogleGenAI } from "@google/genai";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Lazy initialization helper for Gemini to prevent startup crashes if key is missing
let aiClient: GoogleGenAI | null = null;
function getGeminiClient() {
  if (!aiClient) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error("GEMINI_API_KEY is not defined in environment variables. Please configure it in Settings > Secrets.");
    }
    aiClient = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    });
  }
  return aiClient;
}

// API endpoint for GCG & ISO 9001 Consultant Chatbot
app.post("/api/chat", async (req, res) => {
  try {
    const { message, history, context } = req.body;
    const ai = getGeminiClient();

    const systemInstruction = `Anda adalah "Asisten Konsultan Manajemen Pro", ahli kepatuhan tata kelola perusahaan yang baik (Good Corporate Governance - GCG) dan standar ISO 9001.
Tugas Anda adalah membantu pengguna memahami, meringkas, mengaudit, menyelaraskan, atau memberikan saran perbaikan taktis dan profesional pada Standard Operating Procedure (SOP) PT milik pengguna.

Berikan jawaban profesional, optimis, objektif, praktis, serta penuh saran terapan dalam Bahasa Indonesia.
Gunakan markdown yang rapi (headings, bullet points, tabel, blockquotes) agar nyaman dibaca oleh eksekutif perusahaan.

Informasi PT Pengguna Saat Ini:
- Nama Perusahaan: PT ${context?.companyInfo?.namaPerusahaan || 'Perseroan Kustom'}
- Bidang Usaha: ${context?.companyInfo?.bidangUsaha || 'Tidak ditentukan'}
- Skala Bisnis: ${context?.companyInfo?.skalaPerusahaan || 'Tidak ditentukan'}
- Jumlah Karyawan: ${context?.companyInfo?.jumlahKaryawan || 'Tidak ditentukan'}
- Lokasi Operasional: ${context?.companyInfo?.lokasiOperasional || 'Tidak ditentukan'}

Konten SOP Aktif yang sedang dibuka atau dibahas:
- Klausul Aktif: ${context?.activeChapterTitle || 'Semua Klausul / Profil Perusahaan'}
---
${context?.activeChapterContent || 'Tidak ada klausul spesifik yang aktif saat ini.'}
---

Saran perbaikan Anda harus menaruh perhatian tinggi terhadap mitigasi risiko operasional, kejelasan PIC tanggung jawab, akuntabilitas pengambilan keputusan, transparansi, efisiensi skala ${context?.companyInfo?.skalaPerusahaan || 'terkait'}, dan kepatuhan standar mutu ISO 9001:2015.`;

    // Construct request history payload compatible with GoogleGenAI API
    const contents = [];
    
    if (history && Array.isArray(history)) {
      for (const msg of history) {
        contents.push({
          role: msg.role === "assistant" ? "model" : "user",
          parts: [{ text: msg.content }],
        });
      }
    }

    // Add current user query
    contents.push({
      role: "user",
      parts: [{ text: message }],
    });

    // Robust fallback model sequencing to prevent 503 Unavailable / High Demand errors
    const modelsToTry = ["gemini-3.5-flash", "gemini-flash-latest", "gemini-3.1-flash-lite"];
    let response;
    let lastError: any = null;

    for (let i = 0; i < modelsToTry.length; i++) {
      const modelName = modelsToTry[i];
      try {
        response = await ai.models.generateContent({
          model: modelName,
          contents: contents,
          config: {
            systemInstruction: systemInstruction,
            temperature: 0.7,
          },
        });
        if (response && response.text) {
          lastError = null;
          break;
        }
      } catch (err: any) {
        lastError = err;
        const errorMessage = err.message || String(err);
        console.warn(`[AI Chat Fallback] Model ${modelName} failed (Attempt ${i + 1}/${modelsToTry.length}): ${errorMessage}`);
        
        // Wait briefly (600ms) before trying the next fallback model
        if (i < modelsToTry.length - 1) {
          await new Promise((resolve) => setTimeout(resolve, 600));
        }
      }
    }

    if (lastError) {
      throw lastError;
    }

    res.json({ text: response.text });
  } catch (error: any) {
    console.error("Express Gemini API Route Error:", error);
    res.status(500).json({ error: error.message || "Terjadi kesalahan pada server AI." });
  }
});

// Vite server setup for development vs production
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const { createServer: createViteServer } = await import("vite");
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on port ${PORT}`);
  });
}

startServer();
