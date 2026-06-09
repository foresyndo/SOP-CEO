import { CompanyInfo } from '../types';

interface PDFChapter {
  id: number;
  title: string;
  content: string;
}

export function generateSOPPDF(info: CompanyInfo, chapters: PDFChapter[]) {
  const printWindow = window.open('', '_blank');
  if (!printWindow) {
    alert('Mohon izinkan pop-up untuk dapat mengunduh dokumen PDF resmi.');
    return;
  }

  // format dates to Indonesian format if possible
  let formattedDate = info.tanggalBerlaku;
  try {
    const d = new Date(info.tanggalBerlaku);
    if (!isNaN(d.getTime())) {
      formattedDate = d.toLocaleDateString('id-ID', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      });
    }
  } catch (e) {
    // Keep raw date
  }

  // Build Table of Contents entries
  const tocHTML = chapters.map((ch, idx) => `
    <tr style="border-bottom: 1px dashed #cbd5e1;">
      <td style="padding: 10px 0; font-family: 'Inter', sans-serif; font-size: 13px; color: #334155;">
        <strong>Klausul ${idx + 1}</strong>: ${ch.title}
      </td>
      <td style="text-align: right; padding: 10px 0; font-family: 'Inter', sans-serif; font-size: 13px; color: #64748b; font-weight: 500;">
        Halaman ${idx + 2}
      </td>
    </tr>
  `).join('');

  // Build the chapters content
  const chaptersHTML = chapters.map((c, index) => `
    <div style="page-break-before: always; page-break-after: always; padding-top: 15px;">
      <!-- Title standard matching the header style -->
      <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 2px solid #1e3a8a; padding-bottom: 8px; margin-bottom: 24px;">
        <h2 style="font-family: 'Inter', sans-serif; font-size: 16px; font-weight: 800; color: #1e3a8a; margin: 0; text-transform: uppercase;">
          KLAUSUL PROSEDUR - ${c.title}
        </h2>
        <span style="font-family: 'Inter', sans-serif; font-size: 10px; background-color: #eff6ff; color: #1e3a8a; border: 1px solid #bfdbfe; padding: 4px 10px; font-weight: bold; border-radius: 4px;">
          KODE: EX-SOP-${String(c.id).padStart(2, '0')}
        </span>
      </div>

      <!-- Chapter Content styled and clean -->
      <div style="font-family: 'Inter', sans-serif; font-size: 13px; color: #334155; line-height: 1.8; text-align: justify; white-space: pre-wrap;" class="sop-content-body">${c.content}</div>
    </div>
  `).join('');

  printWindow.document.write(`
    <!doctype html>
    <html lang="id">
      <head>
        <meta charset="UTF-8">
        <title>SOP_DIREKTUR_UTAMA_${info.namaPerusahaan.replace(/\s+/g, '_').toUpperCase()}.pdf</title>
        <link rel="preconnect" href="https://fonts.googleapis.com">
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;600&display=swap" rel="stylesheet">
        <style>
          @page {
            size: A4;
            margin: 20mm 15mm 20mm 15mm;
          }
          
          body {
            margin: 0;
            padding: 0;
            background-color: #ffffff;
            font-family: 'Inter', sans-serif;
            color: #1e293b;
            line-height: 1.6;
            -webkit-print-color-adjust: exact;
            print-color-adjust: exact;
          }

          /* Corporate Color Scheme helpers */
          .text-indigo-900 { color: #1e3a8a !important; }
          .bg-indigo-900 { background-color: #1e3a8a !important; }
          
          /* Setup table-based print layout to cleanly repeat header/footer constraints */
          table.print-layout-table {
            width: 100%;
            border-collapse: collapse;
            border: none;
            margin: 0;
            padding: 0;
          }

          /* Header spacer height configuration */
          thead.print-header-spacer td {
            height: 25mm; /* reserves room for fixed header */
          }

          /* Footer spacer height configuration */
          tfoot.print-footer-spacer td {
            height: 18mm; /* reserves room for fixed footer */
          }

          /* Repeating absolute elements to overlay during actual print driver execution */
          div.print-fixed-header-container {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            height: 20mm;
            display: none; /* hidden on screen */
            flex-direction: column;
            justify-content: flex-end;
            padding-bottom: 3mm;
            border-bottom: 2px solid #1e3a8a;
            z-index: 9999;
            background-color: #ffffff;
          }

          div.print-fixed-footer-container {
            position: fixed;
            bottom: 0;
            left: 0;
            right: 0;
            height: 15mm;
            display: none; /* hidden on screen */
            flex-direction: column;
            justify-content: flex-start;
            padding-top: 3mm;
            border-top: 1px solid #cbd5e1;
            z-index: 9999;
            background-color: #ffffff;
          }

          /* Printable container overrides */
          @media print {
            body { 
              background: transparent; 
            }
            .no-print { 
              display: none !important; 
            }
            div.print-fixed-header-container {
              display: flex;
            }
            div.print-fixed-footer-container {
              display: flex;
            }
            .page-break-after {
              page-break-after: always;
            }
            /* Clean margins for print engine */
            .sop-content-body {
              text-align: justify;
              font-size: 13px !important;
            }
            table {
              page-break-inside: auto;
            }
            tr {
              page-break-inside: avoid;
              page-break-after: auto;
            }
          }

          /* Styling for top screen interaction bar */
          .screen-control-bar {
            background-color: #0f172a;
            padding: 16px 24px;
            color: #ffffff;
            display: flex;
            justify-content: space-between;
            align-items: center;
            font-family: 'Inter', sans-serif;
            border-bottom: 4px solid #1e3a8a;
          }

          .btn-print {
            background-color: #1e3a8a;
            color: white;
            border: none;
            padding: 10px 24px;
            font-size: 14px;
            font-weight: 700;
            border-radius: 4px;
            cursor: pointer;
            display: flex;
            align-items: center;
            gap: 8px;
            box-shadow: 0 4px 6px -1px rgba(30, 58, 138, 0.2);
            transition: all 0.15s ease-in-out;
          }
          
          .btn-print:hover {
            background-color: #1a3073;
          }

          /* Helper class for nice labels */
          .label {
            font-size: 9px;
            font-weight: 800;
            letter-spacing: 0.05em;
            text-transform: uppercase;
            color: #64748b;
          }

          .value {
            font-size: 12px;
            font-weight: 600;
            color: #1e293b;
          }
        </style>
      </head>
      <body>
        <!-- Top Control Panel (Only visible on web preview) -->
        <div class="screen-control-bar no-print">
          <div>
            <h1 style="margin: 0; font-size: 16px; font-weight: 700; color: #ffffff;">Dokumen Pelaporan PDF Resmi</h1>
            <p style="margin: 4px 0 0 0; font-size: 11px; color: #94a3b8;">
              Standar Operasional Prosedur PT ${info.namaPerusahaan}
            </p>
          </div>
          <button onclick="window.print()" class="btn-print">
            💾 Simpan / Cetak PDF Resmi SOP
          </button>
        </div>

        <!-- PRINT COMPLIANT REPEATING HEADER CONTAINER (Injected on print pages) -->
        <div class="print-fixed-header-container">
          <table style="width: 100%; border-collapse: collapse; margin-bottom: 2px;">
            <tr>
              <td style="text-align: left; vertical-align: bottom;">
                <span class="label" style="display: block; margin-bottom: 2px;">DOKUMEN KEPATUHAN KORPORASI</span>
                <span style="font-size: 12px; font-weight: 800; color: #1e3a8a;">PT ${info.namaPerusahaan}</span>
              </td>
              <td style="text-align: right; vertical-align: bottom;">
                <span class="label" style="display: block; margin-bottom: 2px;">NOMOR DOKUMEN SOP</span>
                <span style="font-size: 11px; font-weight: 700; font-family: 'JetBrains Mono', monospace; color: #0f172a;">${info.nomorDokumen}</span>
              </td>
            </tr>
          </table>
        </div>

        <!-- PRINT COMPLIANT REPEATING FOOTER CONTAINER (Injected on print pages) -->
        <div class="print-fixed-footer-container">
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="text-align: left; font-size: 9px; color: #64748b;">
                <strong>SOP DIREKTUR UTAMA (CEO)</strong><br>
                ISO 9001:2015 & Good Corporate Governance (GCG) Compliant
              </td>
              <td style="text-align: center; font-size: 9px; color: #94a3b8; font-style: italic;">
                DOKUMEN DIKONTROL • SANGAT RAHASIA
              </td>
              <td style="text-align: right; font-size: 10px; font-weight: bold; color: #1e3a8a; font-family: 'JetBrains Mono', monospace;">
                PT ${info.namaPerusahaan.replace('PT ', '').toUpperCase()}
              </td>
            </tr>
          </table>
        </div>

        <!-- MAIN LAYOUT AREA -->
        <div style="max-width: 800px; margin: 0 auto; padding: 20px;">

          <!-- ================= PAGE 1: COVER PAGE ================= -->
          <div class="page-break-after" style="height: 100%; min-height: 260mm; display: flex; flex-direction: column; justify-content: space-between; font-family: 'Inter', sans-serif;">
            
            <!-- Cover Header Branding Line -->
            <div style="border-bottom: 6px solid #1e3a8a; padding-bottom: 16px; margin-bottom: 40px; display: flex; justify-content: space-between; align-items: flex-end;">
              <div>
                <span style="background-color: #1e3a8a; color: white; padding: 4px 10px; font-size: 10px; font-weight: 800; letter-spacing: 0.1em; text-transform: uppercase; border-radius: 4px;">SYSTEM DOKUMEN MASTER</span>
                <h3 style="margin: 8px 0 0 0; font-size: 13px; font-weight: 700; color: #64748b; letter-spacing: 0.05em; text-transform: uppercase;">
                  SURAT KETETAPAN DIREKSI & TATA KELOLA
                </h3>
              </div>
              <div style="text-align: right;">
                <span class="label" style="display: block;">DIKONTROL OLEH</span>
                <span style="font-size: 11px; font-weight: 700; color: #1e3a8a;">BIRO KEPATUHAN PT</span>
              </div>
            </div>

            <!-- Cover Central Title Block -->
            <div style="margin: auto 0; text-align: center; padding: 20px 0;">
              <div style="width: 70px; height: 70px; border-radius: 12px; background-color: #1e3a8a; margin: 0 auto 24px auto; display: flex; align-items: center; justify-content: center; color: white; font-size: 32px; font-weight: 900; box-shadow: 0 10px 15px -3px rgba(30, 58, 138, 0.3);">
                🌟
              </div>
              <h1 style="font-size: 26px; font-weight: 900; color: #1e3a8a; line-height: 1.3; margin: 0 0 10px 0; text-transform: uppercase; letter-spacing: -0.01em;">
                STANDAR OPERASIONAL PROSEDUR (SOP)
              </h1>
              <h2 style="font-size: 18px; font-weight: 700; color: #0f172a; margin: 0 0 12px 0; letter-spacing: 0.05em;">
                DIREKTUR UTAMA (CHIEF EXECUTIVE OFFICER)
              </h2>
              <div style="height: 4px; width: 60px; background-color: #1e3a8a; margin: 0 auto 24px auto; border-radius: 2px;"></div>
              
              <div style="font-size: 22px; font-weight: 800; color: #1e3a8a; text-transform: uppercase;">
                PT ${info.namaPerusahaan}
              </div>
              <p style="font-size: 12px; color: #64748b; max-width: 480px; margin: 12px auto 0 auto; line-height: 1.6; font-weight: 500;">
                Sektor Usaha: ${info.bidangUsaha}<br>
                Skala Bisnis: ${info.skalaPerusahaan} (${info.jumlahKaryawan} Staf)<br>
                Lokasi Operasi: ${info.lokasiOperasional}
              </p>
            </div>

            <!-- Cover Footer: Document Information Block & Stamp -->
            <div style="margin-top: auto; background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 24px;">
              <h4 style="margin: 0 0 14px 0; font-size: 10px; font-weight: 800; letter-spacing: 0.05em; color: #475569; text-transform: uppercase; border-bottom: 1px solid #e2e8f0; padding-bottom: 6px;">
                LEMBAR KONTROL DIAGRAM & METADATA DOKUMEN
              </h4>
              <table style="width: 100%; border-collapse: collapse; font-size: 11.5px; text-align: left;">
                <tr>
                  <td style="padding: 6px 0; color: #64748b; width: 30%;">Nomor Dokumen</td>
                  <td style="padding: 6px 0; font-weight: 700; font-family: 'JetBrains Mono', monospace; color: #0f172a;">${info.nomorDokumen}</td>
                  <td style="padding: 6px 0; color: #64748b; width: 20%;">Nomor Revisi</td>
                  <td style="padding: 6px 0; font-weight: 700; color: #0f172a;">${info.nomorRevisi || '00'}</td>
                </tr>
                <tr>
                  <td style="padding: 6px 0; color: #64748b;">Tanggal Berlaku</td>
                  <td style="padding: 6px 0; font-weight: 700; color: #0f172a;">${formattedDate}</td>
                  <td style="padding: 6px 0; color: #64748b;">Status</td>
                  <td style="padding: 6px 0; font-weight: 800; color: #16a34a;">SALINAN TERTAHAN</td>
                </tr>
                <tr style="border-top: 1px solid #e2e8f0;">
                  <td style="padding: 8px 0 4px 0; color: #64748b;">Disusun Oleh</td>
                  <td style="padding: 8px 0 4px 0; font-weight: 600; color: #334155;" colspan="3">${info.disusunOleh}</td>
                </tr>
                <tr>
                  <td style="padding: 4px 0; color: #64748b;">Diperiksa Oleh</td>
                  <td style="padding: 4px 0; font-weight: 600; color: #334155;" colspan="3">${info.diperiksaOleh}</td>
                </tr>
                <tr>
                  <td style="padding: 4px 0 8px 0; color: #64748b;">Disetujui Oleh</td>
                  <td style="padding: 4px 0 8px 0; font-weight: 600; color: #334155;" colspan="3">${info.disetujuiOleh}</td>
                </tr>
              </table>
              
              <div style="margin-top: 16px; padding-top: 14px; border-top: 1px dashed #cbd5e1; display: flex; justify-content: space-between; align-items: center;">
                <div style="display: flex; gap: 8px; align-items: center;">
                  <img src="https://upload.wikimedia.org/wikipedia/commons/b/b0/ISO_9001-2015.png" style="height: 32px; filter: grayscale(100%); opacity: 0.6;" alt="ISO 9001 Label">
                  <div>
                    <span style="font-size: 8px; font-weight: 800; color: #94a3b8; display: block;">KONFORMITAS MUTU</span>
                    <span style="font-size: 10px; font-weight: 700; color: #475569;">ISO 9001:2015 REGISTERED</span>
                  </div>
                </div>
                <div style="text-align: right; font-size: 10px; font-weight: 700; color: #1e3a8a; border: 1.5px solid #1e3a8a; padding: 4px 8px; border-radius: 4px; uppercase;">
                  E-SIGNED CERTIFIED
                </div>
              </div>
            </div>
          </div>

          <!-- ================= PAGE 2: TABLE OF CONTENTS ================= -->
          <div class="page-break-after" style="padding-top: 15px; min-height: 260mm;">
            <div style="border-bottom: 2px solid #1e3a8a; padding-bottom: 8px; margin-bottom: 30px;">
              <h2 style="font-family: 'Inter', sans-serif; font-size: 18px; font-weight: 800; color: #1e3a8a; margin: 0;">
                DAFTAR ISI & KORDINAT SOP
              </h2>
            </div>
            
            <p style="font-size: 12.5px; color: #475569; margin-bottom: 24px;">
              Dokumen ini mengikat secara operasional kewenangan, tugas pokok, kewajiban pelaporan, dan tata kelola PT ${info.namaPerusahaan} yang relevan dengan Standar Nasional dan Internasional.
            </p>

            <table style="width: 100%; border-collapse: collapse; margin-bottom: 40px;">
              <thead>
                <tr style="border-bottom: 2px solid #0f172a; text-align: left; background-color: #f8fafc;">
                  <th style="padding: 10px; font-size: 11px; font-weight: 800; color: #475569; uppercase;">Elemen Klausul</th>
                  <th style="padding: 10px; font-size: 11px; font-weight: 800; color: #475569; text-align: right; uppercase;">Halaman</th>
                </tr>
              </thead>
              <tbody>
                <tr style="border-bottom: 1px dashed #cbd5e1;">
                  <td style="padding: 10px; font-size: 13px; color: #334155;"><strong>Halaman Pengesahan (Sampul Resmi)</strong></td>
                  <td style="text-align: right; padding: 10px; font-size: 13px; color: #64748b; font-weight: 500;">Halaman 1</td>
                </tr>
                <tr style="border-bottom: 1px dashed #cbd5e1;">
                  <td style="padding: 10px; font-size: 13px; color: #334155;"><strong>Daftar Isi & Sistem Rapat</strong></td>
                  <td style="text-align: right; padding: 10px; font-size: 13px; color: #64748b; font-weight: 500;">Halaman 2</td>
                </tr>
                ${tocHTML}
              </tbody>
            </table>

            <div style="background-color: #eff6ff; border-left: 4px solid #1e3a8a; padding: 15px; border-radius: 0 6px 6px 0; margin-top: auto;">
              <h4 style="margin: 0 0 6px 0; font-size: 12px; font-weight: 700; color: #1e3a8a;">Catatan Biro Mutu (Quality Assurance):</h4>
              <p style="margin: 0; font-size: 11.5px; color: #1e3a8a; line-height: 1.5; font-weight: 500;">
                Seluruh klausul di dalam Standar Operasional Prosedur ini telah diselaraskan dengan Prinsip Tata Kelola Perusahaan yang Baik (Transparency, Accountability, Responsibility, Independency, Fairness) serta komitmen mutu berstandar ISO 9001. Segala bentuk pelanggaran terhadap tata kelola ini dapat berimplikasi hukum bagi struktur perseroan.
              </p>
            </div>
          </div>

          <!-- ================= SUBSEQUENT PAGES: TABLE WRAPPING TO ENABLE REPEATING HEADERS/FOOTERS ================= -->
          <table class="print-layout-table">
            <thead class="print-header-spacer">
              <tr><td>&nbsp;</td></tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <!-- Complete dynamically rendered chapters markup style -->
                  ${chaptersHTML}
                </td>
              </tr>
            </tbody>
            <tfoot class="print-footer-spacer">
              <tr><td>&nbsp;</td></tr>
            </tfoot>
          </table>

        </div>
      </body>
    </html>
  `);

  printWindow.document.close();
}
