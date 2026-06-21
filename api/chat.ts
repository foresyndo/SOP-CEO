import { GoogleGenAI } from "@google/genai";

// Lazy initialization of Gemini client to avoid platform startup crashes if GEMINI_API_KEY is not defined
let aiClient: GoogleGenAI | null = null;
function getGeminiClient() {
  if (!aiClient) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error("GEMINI_API_KEY is not defined in environment variables. Please check your Vercel project settings.");
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

export default async function handler(req: any, res: any) {
  // Simple CORS preflight handling
  if (req.method === 'OPTIONS') {
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
    res.setHeader(
      'Access-Control-Allow-Headers',
      'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
    );
    return res.status(200).end();
  }

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed. Use POST." });
  }

  try {
    const { message, history, context } = req.body;
    const ai = getGeminiClient();

    const systemInstruction = `Anda adalah "Asisten Konsultan Manajemen Pro", ahli kepatuhan tata kelola perusahaan yang baik (Good Corporate Governance - GCG) dan standar ISO 9001.
Tugas Anda adalah membantu pengguna memahami, meringkas, mengaudit, menyelaraskan, atau memberikan saran perbaikan taktis dan profesional pada Standard Operating Procedure (SOP) PT milik pengguna.

Berikan jawaban profesional, optimis, objektif, praktis, serta penuh saran terapan dalam Bahasa Indonesia.
Gunakan markdown yang rapi (headings, bullet points, tabel, blockquotes) agar nyaman dibaca oleh eksekutif perusahaan.

Informasi PT Pengguna Saat Ini:
- Nama Perusahaan: PT ${context?.companyInfo?.namaPerusahaan || 'PT. Foresyndo Global Indonesia'}
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

    // Map history payload into parameters expected by GoogleGenAI
    const contents = [];
    
    if (history && Array.isArray(history)) {
      for (const msg of history) {
        contents.push({
          role: msg.role === "assistant" ? "model" : "user",
          parts: [{ text: msg.content }],
        });
      }
    }

    // Add current query
    contents.push({
      role: "user",
      parts: [{ text: message }],
    });

    // Try multiple models in sequence as fail-safe fallback
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
        console.warn(`[Vercel Serverless Fallback] Model ${modelName} failed during call:`, err);
        
        if (i < modelsToTry.length - 1) {
          await new Promise((resolve) => setTimeout(resolve, 600));
        }
      }
    }

    if (lastError) {
      throw lastError;
    }

    res.setHeader('Access-Control-Allow-Origin', '*');
    return res.status(200).json({ text: response.text });
  } catch (error: any) {
    console.error("Vercel Serverless Function Chat Exception:", error);
    return res.status(500).json({ error: error.message || "Terjadi kesalahan pada modul serverless AI." });
  }
}
