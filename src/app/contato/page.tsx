import type { Metadata } from 'next';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';
import ContactForm from '@/components/ContactForm';

export const metadata: Metadata = {
  title: 'Contato',
  description: 'Entre em contato com a Imobiliária Todescatt. Estamos prontos para ajudar você a encontrar o imóvel perfeito.',
};

export default function ContatoPage() {
  const contactInfo = [
    {
      icon: MapPin,
      title: 'Endereço',
      lines: ['Balneário Camboriú, SC', 'Brasil'],
    },
    {
      icon: Phone,
      title: 'Telefone / WhatsApp',
      lines: ['+55 47 8852-5430'],
    },
    {
      icon: Mail,
      title: 'E-mail',
      lines: ['contato@todescatt.com.br'],
    },
    {
      icon: Clock,
      title: 'Horário de Atendimento',
      lines: ['Seg a Sex: 08h às 18h', 'Sábado: 08h às 12h'],
    },
  ];

  return (
    <div className="pt-24 pb-16">
      {/* Hero */}
      <div className="gradient-primary py-16 sm:py-20 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 right-0 w-96 h-96 bg-accent-500/5 rounded-full blur-3xl" />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <span className="text-accent-400 text-sm font-semibold uppercase tracking-wider">
            Contato
          </span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-white mt-3 mb-4">
            Fale Conosco
          </h1>
          <p className="text-white/60 text-lg max-w-xl">
            Estamos prontos para atender você. Entre em contato e tire todas as suas dúvidas.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
          {/* Contact Form */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-2xl shadow-card border border-surface-100 p-6 sm:p-8">
              <h2 className="text-2xl font-serif font-bold text-surface-900 mb-2">
                Envie sua mensagem
              </h2>
              <p className="text-surface-500 mb-6">
                Preencha o formulário e entraremos em contato em breve.
              </p>
              <ContactForm />
            </div>
          </div>

          {/* Contact Info */}
          <div className="lg:col-span-2 space-y-4">
            {contactInfo.map((info) => (
              <div
                key={info.title}
                className="bg-white rounded-2xl shadow-card border border-surface-100 p-6 flex items-start gap-4"
              >
                <div className="w-11 h-11 rounded-xl gradient-accent flex items-center justify-center shrink-0">
                  <info.icon className="w-5 h-5 text-primary-900" />
                </div>
                <div>
                  <h3 className="font-semibold text-surface-900 mb-1">
                    {info.title}
                  </h3>
                  {info.lines.map((line) => (
                    <p key={line} className="text-sm text-surface-500">
                      {line}
                    </p>
                  ))}
                </div>
              </div>
            ))}

            {/* Map */}
            <div className="bg-white rounded-2xl shadow-card border border-surface-100 overflow-hidden">
              <iframe
                title="Localização Imobiliária Todescatt"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d113337.89201977937!2d-48.73031024345524!3d-27.022442220478053!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94d8b6712391295b%3A0xc07ce9825b048d08!2sBalne%C3%A1rio%20Cambori%C3%BA%20-%20SC!5e0!3m2!1spt-BR!2sbr!4v1700000000000!5m2!1spt-BR!2sbr"
                width="100%"
                height="220"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
