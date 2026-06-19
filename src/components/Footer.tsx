import Link from 'next/link';
import Image from 'next/image';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';



function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
    </svg>
  );
}

function FacebookIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
    </svg>
  );
}

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-primary-950 text-white/80">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="space-y-4">
            <Link href="/" className="inline-block mb-2 group">
              <Image
                src="/logo-white.png"
                alt="Imobiliária Todescatt"
                width={200}
                height={80}
                className="h-16 w-auto object-contain transition-transform duration-500 group-hover:scale-105"
              />
            </Link>
            <p className="text-sm text-white/60 leading-relaxed">
              Há anos realizando sonhos e conectando pessoas aos melhores imóveis da região. Sua satisfação é o nosso compromisso.
            </p>
            <div className="flex gap-3">
              <a
                href="https://www.instagram.com/todescattimoveis/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-accent-500 hover:text-primary-900 transition-all duration-300"
                aria-label="Instagram"
              >
                <InstagramIcon className="w-4 h-4" />
              </a>
              <a
                href="#"
                className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-accent-500 hover:text-primary-900 transition-all duration-300"
                aria-label="Facebook"
              >
                <FacebookIcon className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">
              Links Rápidos
            </h3>
            <ul className="space-y-2.5">
              {[
                { href: '/', label: 'Início' },
                { href: '/imoveis', label: 'Imóveis' },
                { href: '/imoveis?type=apartment', label: 'Apartamentos' },
                { href: '/imoveis?type=house', label: 'Casas' },
                { href: '/imoveis?type=land', label: 'Terrenos' },
                { href: '/sobre', label: 'Sobre Nós' },
                { href: '/contato', label: 'Contato' },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/60 hover:text-accent-400 transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">
              Contato
            </h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3 text-sm text-white/60">
                <MapPin className="w-4 h-4 text-accent-400 mt-0.5 shrink-0" />
                <span>Balneário Camboriú, SC - Brasil</span>
              </li>
              <li className="flex items-center gap-3 text-sm text-white/60">
                <Phone className="w-4 h-4 text-accent-400 shrink-0" />
                <span>+55 47 8852-5430</span>
              </li>
              <li className="flex items-center gap-3 text-sm text-white/60">
                <Mail className="w-4 h-4 text-accent-400 shrink-0" />
                <span>contato@todescatt.com.br</span>
              </li>
              <li className="flex items-start gap-3 text-sm text-white/60">
                <Clock className="w-4 h-4 text-accent-400 mt-0.5 shrink-0" />
                <div>
                  <p>Seg - Sex: 08h às 18h</p>
                  <p>Sáb: 08h às 12h</p>
                </div>
              </li>
            </ul>
          </div>

          {/* Newsletter / CTA */}
          <div>
            <h3 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">
              Fique por dentro
            </h3>
            <p className="text-sm text-white/60 mb-4">
              Receba novidades sobre os melhores imóveis diretamente no seu WhatsApp.
            </p>
            <Link
              href="/contato"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full gradient-accent text-primary-900 font-semibold text-sm hover:shadow-glow transition-all duration-300"
            >
              <Phone className="w-4 h-4" />
              Entrar em Contato
            </Link>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 text-[11px] uppercase tracking-widest font-light text-white/40 text-center sm:text-left">
              <p className="flex items-center gap-2">
                <span className="font-semibold text-white tracking-[0.2em]">Todescatt Imóveis</span>
                <span>&copy; {currentYear}</span>
              </p>
              <span className="hidden sm:inline w-1 h-1 rounded-full bg-white/20"></span>
              <p>CRECI 024360</p>
              <span className="hidden sm:inline w-1 h-1 rounded-full bg-white/20"></span>
              <p className="normal-case tracking-wide">Todos os direitos reservados</p>
            </div>
            
            <a 
              href="https://www.wasventure.com.br" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-3"
            >
              <span className="text-[9px] font-medium tracking-[0.2em] uppercase text-white/80">
                Desenvolvido por
              </span>
              <Image 
                src="/was_transparent.png" 
                alt="WAS Venture" 
                width={240} 
                height={80} 
                className="h-16 sm:h-20 w-auto object-contain grayscale" 
              />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
