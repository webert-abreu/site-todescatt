'use client';

import { useState } from 'react';
import { Send, CheckCircle, Loader2 } from 'lucide-react';

interface ContactFormProps {
  propertyTitle?: string;
  propertyId?: string;
}

export default function ContactForm({ propertyTitle, propertyId }: ContactFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: propertyTitle
      ? `Olá! Tenho interesse no imóvel "${propertyTitle}" (Cód. ${propertyId}). Gostaria de mais informações.`
      : '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const webhookUrl = process.env.NEXT_PUBLIC_CRM_WEBHOOK_URL;
      const apiKey = process.env.NEXT_PUBLIC_CRM_API_KEY;

      if (!webhookUrl) {
        throw new Error('Configuração ausente: NEXT_PUBLIC_CRM_WEBHOOK_URL não definida.');
      }
      
      const payload = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        message: formData.message,
        property_id: propertyId || '',
        property_title: propertyTitle || '',
        source: 'Site Todescatti Imóveis',
        created_at: new Date().toISOString()
      };

      console.log('Disparando para CRM URL:', webhookUrl);
      console.log('Payload:', payload);

      const response = await fetch(webhookUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': apiKey || ''
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        // Se a resposta não for 200-299, captura o texto do erro que o CRM retornou
        const errorText = await response.text();
        console.error('Falha na resposta do CRM:', response.status, errorText);
        throw new Error(`O servidor retornou erro ${response.status}`);
      }

      setIsSubmitted(true);
      setFormData({ name: '', email: '', phone: '', message: '' });
    } catch (error: any) {
      console.error('Erro rigoroso ao enviar lead:', error);
      alert(`Erro: ${error.message || 'Não foi possível enviar a mensagem no momento. Por favor, tente pelo WhatsApp.'}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="text-center py-10 px-6 animate-fade-in">
        <CheckCircle className="w-16 h-16 text-emerald-500 mx-auto mb-4" />
        <h3 className="text-xl font-semibold text-surface-900 mb-2">
          Mensagem enviada com sucesso!
        </h3>
        <p className="text-surface-500">
          O corretor entrará em contato.
        </p>
        <button
          onClick={() => {
            setIsSubmitted(false);
            setFormData({ name: '', email: '', phone: '', message: '' });
          }}
          className="mt-4 text-sm text-primary-600 hover:text-primary-700 font-medium"
        >
          Enviar outra mensagem
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="contact-name" className="block text-sm font-medium text-surface-700 mb-1">
          Nome completo
        </label>
        <input
          id="contact-name"
          type="text"
          required
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className="w-full px-4 py-3 rounded-xl border border-surface-200 bg-white text-surface-900 placeholder:text-surface-400 focus:outline-none focus:ring-2 focus:ring-accent-500/30 focus:border-accent-500 transition-all"
          placeholder="Seu nome"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="contact-email" className="block text-sm font-medium text-surface-700 mb-1">
            E-mail
          </label>
          <input
            id="contact-email"
            type="email"
            required
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className="w-full px-4 py-3 rounded-xl border border-surface-200 bg-white text-surface-900 placeholder:text-surface-400 focus:outline-none focus:ring-2 focus:ring-accent-500/30 focus:border-accent-500 transition-all"
            placeholder="seu@email.com"
          />
        </div>
        <div>
          <label htmlFor="contact-phone" className="block text-sm font-medium text-surface-700 mb-1">
            Telefone / WhatsApp
          </label>
          <input
            id="contact-phone"
            type="tel"
            required
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            className="w-full px-4 py-3 rounded-xl border border-surface-200 bg-white text-surface-900 placeholder:text-surface-400 focus:outline-none focus:ring-2 focus:ring-accent-500/30 focus:border-accent-500 transition-all"
            placeholder="(47) 8852-5430"
          />
        </div>
      </div>

      <div>
        <label htmlFor="contact-message" className="block text-sm font-medium text-surface-700 mb-1">
          Mensagem
        </label>
        <textarea
          id="contact-message"
          required
          rows={4}
          value={formData.message}
          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
          className="w-full px-4 py-3 rounded-xl border border-surface-200 bg-white text-surface-900 placeholder:text-surface-400 focus:outline-none focus:ring-2 focus:ring-accent-500/30 focus:border-accent-500 transition-all resize-none"
          placeholder="Como podemos ajudar?"
        />
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl gradient-accent text-primary-900 font-semibold hover:shadow-glow transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed"
      >
        {isSubmitting ? (
          <>
            <Loader2 className="w-5 h-5 animate-spin" />
            Enviando...
          </>
        ) : (
          <>
            <Send className="w-5 h-5" />
            Enviar Mensagem
          </>
        )}
      </button>
    </form>
  );
}
