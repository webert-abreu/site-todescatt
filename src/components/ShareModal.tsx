'use client';

import { useState, useEffect } from 'react';
import { Share2, Link as LinkIcon, QrCode, FileText, X, Check, Download } from 'lucide-react';
import QRCode from 'react-qr-code';
import { Property } from '@/types/property';
import { formatCurrency, formatArea, getPropertyTypeLabel } from '@/lib/utils';

interface ShareModalProps {
  property: Property;
}

export default function ShareModal({ property }: ShareModalProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [url, setUrl] = useState('');
  const [copied, setCopied] = useState(false);
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);

  useEffect(() => {
    setUrl(window.location.href);
  }, []);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy', err);
    }
  };

  const generatePDF = async () => {
    try {
      setIsGeneratingPDF(true);
      
      // Dynamic import to avoid SSR issues
      const html2canvas = (await import('html2canvas')).default;
      const { jsPDF } = await import('jspdf');

      // Create a temporary div for the PDF content
      const printArea = document.createElement('div');
      printArea.style.width = '800px';
      printArea.style.padding = '40px';
      printArea.style.backgroundColor = '#ffffff';
      printArea.style.color = '#1f2937';
      printArea.style.fontFamily = 'sans-serif';
      
      // Content layout
      printArea.innerHTML = `
        <div style="text-align: center; margin-bottom: 30px;">
          <h1 style="font-size: 28px; margin: 0; color: #0a0a0a;">Imobiliária Todescatt</h1>
          <p style="color: #6b7280; font-size: 14px; margin-top: 5px;">todescattimoveis.com.br</p>
        </div>
        
        ${property.images[0] ? `<img src="${property.images[0]}" crossorigin="anonymous" style="width: 100%; height: 400px; object-fit: cover; border-radius: 12px; margin-bottom: 24px;" />` : ''}
        
        <h2 style="font-size: 24px; margin: 0 0 10px 0;">${property.title}</h2>
        <p style="font-size: 18px; color: #4b5563; margin: 0 0 20px 0;">${property.address.neighborhood}, ${property.address.city} - ${property.address.state}</p>
        
        <p style="font-size: 26px; font-weight: bold; color: #000; margin-bottom: 30px;">${formatCurrency(property.price)}</p>
        
        <div style="display: flex; gap: 20px; margin-bottom: 30px; padding: 20px; background-color: #f9fafb; border-radius: 8px;">
          <div><strong>Área:</strong> ${formatArea(property.area)}</div>
          <div><strong>Dormitórios:</strong> ${property.bedrooms}</div>
          <div><strong>Suítes:</strong> ${property.suites}</div>
          <div><strong>Vagas:</strong> ${property.parking}</div>
        </div>

        <h3 style="font-size: 18px; margin-bottom: 10px;">Descrição</h3>
        <p style="line-height: 1.6; color: #4b5563; margin-bottom: 30px;">${property.description}</p>
        
        <div style="text-align: center; margin-top: 40px; padding-top: 20px; border-top: 1px solid #e5e7eb;">
          <p style="margin-bottom: 5px;">Ficou interessado?</p>
          <p style="font-weight: bold;">Entre em contato: +55 47 8852-5430</p>
        </div>
      `;

      document.body.appendChild(printArea);

      // Render the canvas
      const canvas = await html2canvas(printArea, { 
        scale: 2,
        useCORS: true, // important for external images
      });
      
      document.body.removeChild(printArea);

      // Convert to PDF
      const imgData = canvas.toDataURL('image/jpeg', 1.0);
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'px',
        format: [canvas.width, canvas.height]
      });

      pdf.addImage(imgData, 'JPEG', 0, 0, canvas.width, canvas.height);
      pdf.save(`imovel-${property.id}.pdf`);
      
    } catch (err) {
      console.error('Error generating PDF:', err);
      alert('Erro ao gerar o PDF. Verifique se as imagens permitem acesso CORS.');
    } finally {
      setIsGeneratingPDF(false);
    }
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="p-2 rounded-lg bg-surface-100 text-surface-500 hover:bg-surface-200 transition-colors shrink-0 flex items-center justify-center"
        aria-label="Compartilhar"
        title="Compartilhar Imóvel"
      >
        <Share2 className="w-5 h-5" />
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-white rounded-2xl w-full max-w-md overflow-hidden shadow-2xl animate-in fade-in zoom-in duration-200">
            {/* Header */}
            <div className="px-6 py-4 border-b border-surface-100 flex items-center justify-between">
              <h3 className="text-lg font-semibold text-surface-900">Compartilhar Imóvel</h3>
              <button 
                onClick={() => setIsOpen(false)}
                className="p-1 text-surface-400 hover:text-surface-600 rounded-lg hover:bg-surface-100 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Content */}
            <div className="p-6 space-y-8">
              
              {/* Option 1: Copy Link */}
              <div className="space-y-3">
                <label className="text-sm font-medium text-surface-700 flex items-center gap-2">
                  <LinkIcon className="w-4 h-4 text-accent-500" />
                  Link do Imóvel
                </label>
                <div className="flex gap-2">
                  <input 
                    type="text" 
                    readOnly 
                    value={url} 
                    className="flex-1 bg-surface-50 border border-surface-200 rounded-lg px-3 py-2 text-sm text-surface-600 focus:outline-none"
                  />
                  <button 
                    onClick={copyToClipboard}
                    className="px-4 py-2 bg-primary-950 hover:bg-primary-900 text-white rounded-lg text-sm font-medium transition-colors flex items-center gap-2 shrink-0"
                  >
                    {copied ? <Check className="w-4 h-4" /> : 'Copiar'}
                  </button>
                </div>
              </div>

              {/* Option 2: PDF Download */}
              <div className="space-y-3 pt-4 border-t border-surface-100">
                <label className="text-sm font-medium text-surface-700 flex items-center gap-2">
                  <FileText className="w-4 h-4 text-accent-500" />
                  Apresentação em PDF (Para WhatsApp)
                </label>
                <button 
                  onClick={generatePDF}
                  disabled={isGeneratingPDF}
                  className="w-full py-3 px-4 border border-surface-200 rounded-xl flex items-center justify-center gap-2 text-surface-700 hover:bg-surface-50 hover:border-surface-300 transition-all font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Download className="w-4 h-4" />
                  {isGeneratingPDF ? 'Gerando arquivo...' : 'Baixar Catálogo PDF'}
                </button>
              </div>

              {/* Option 3: QR Code */}
              <div className="space-y-3 pt-4 border-t border-surface-100 flex flex-col items-center">
                <label className="text-sm font-medium text-surface-700 flex items-center gap-2 w-full">
                  <QrCode className="w-4 h-4 text-accent-500" />
                  QR Code para acesso rápido
                </label>
                <div className="bg-white p-4 border border-surface-200 rounded-xl shadow-sm inline-block mt-2">
                  {url && (
                    <QRCode
                      value={url}
                      size={150}
                      bgColor={"#ffffff"}
                      fgColor={"#0a0a0a"}
                      level={"L"}
                    />
                  )}
                </div>
                <p className="text-xs text-surface-500 text-center max-w-[200px] mt-2">
                  Aponte a câmera do celular para abrir a página deste imóvel
                </p>
              </div>

            </div>
          </div>
        </div>
      )}
    </>
  );
}
