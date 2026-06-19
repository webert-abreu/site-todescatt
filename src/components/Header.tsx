'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Menu, X, Phone } from 'lucide-react';
import { cn } from '@/lib/utils';

const navLinks = [
  { href: '/', label: 'Início' },
  { href: '/imoveis', label: 'Imóveis' },
  { href: '/sobre', label: 'Sobre' },
  { href: '/contato', label: 'Contato' },
];

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);



  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isMobileMenuOpen]);

  const isHome = pathname === '/';
  const isTransparent = isHome && !isScrolled && !isMobileMenuOpen;

  return (
    <>
      <header
        className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-500',
        !isTransparent
          ? 'bg-white/80 backdrop-blur-md border-b border-surface-200/50 shadow-sm py-3'
          : 'bg-transparent py-6'
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <Image
              src={isTransparent ? "/Logotipo Horizontal Branco.png" : "/logo-horizontal.png"}
              alt="Imobiliária Todescatt"
              width={240}
              height={60}
              className="h-12 w-auto object-contain transition-transform duration-500 group-hover:scale-105"
              priority
            />
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-2">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  'px-4 py-2 rounded-full text-sm font-medium transition-all duration-300',
                  pathname === link.href
                    ? (isTransparent ? 'text-white bg-white/20' : 'text-primary-900 bg-surface-100')
                    : (isTransparent ? 'text-white/80 hover:text-white hover:bg-white/10' : 'text-surface-600 hover:text-primary-900 hover:bg-surface-50')
                )}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* CTA + Mobile Button */}
          <div className="flex items-center gap-4">
            <Link
              href="/contato"
              className={cn(
                "hidden sm:flex items-center gap-2 px-6 py-2.5 rounded-full font-medium text-sm transition-all duration-300 hover:-translate-y-0.5",
                isTransparent 
                  ? "bg-white text-primary-950 hover:bg-white/90" 
                  : "bg-primary-950 text-white hover:bg-primary-900 hover:shadow-md"
              )}
            >
              <Phone className={cn("w-4 h-4", isTransparent ? "text-primary-900" : "text-accent-400")} />
              <span>Fale Conosco</span>
            </Link>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={cn(
                "md:hidden p-2 rounded-full transition-colors",
                isTransparent
                  ? "text-white hover:bg-white/10"
                  : "text-surface-600 hover:text-primary-900 hover:bg-surface-100"
              )}
              aria-label={isMobileMenuOpen ? 'Fechar menu' : 'Abrir menu'}
            >
              {isMobileMenuOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <div
        className={cn(
          'md:hidden fixed inset-0 z-40 bg-white transition-all duration-300 overflow-y-auto',
          isMobileMenuOpen
            ? 'opacity-100 pointer-events-auto translate-y-0'
            : 'opacity-0 pointer-events-none -translate-y-4'
        )}
      >
        <div className="flex flex-col min-h-full p-6 pb-12 pt-28">
          <nav className="flex flex-col items-center gap-6 pt-6">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className={cn(
                  'text-2xl font-serif font-medium transition-colors',
                  pathname === link.href ? 'text-primary-900' : 'text-surface-600 hover:text-primary-900'
                )}
              >
                {link.label}
              </Link>
            ))}
          </nav>
          
          <div className="mt-16 flex flex-col gap-4">
            <Link
              href="/contato"
              onClick={() => setIsMobileMenuOpen(false)}
              className="flex items-center justify-center gap-2 w-full py-4 rounded-full gradient-accent text-primary-900 font-bold text-lg shadow-md hover:shadow-lg transition-all"
            >
              <Phone className="w-5 h-5" />
              <span>Fale Conosco</span>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
