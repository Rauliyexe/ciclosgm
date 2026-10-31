import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowRight } from 'lucide-react';

export default function Navbar({ onOpenEnroll }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Bloqueio de rolagem do body quando o menu mobile estiver aberto
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
      const handleKeyDown = (e) => {
        if (e.key === 'Escape') setMobileMenuOpen(false);
      };
      window.addEventListener('keydown', handleKeyDown);
      return () => {
        document.body.style.overflow = '';
        window.removeEventListener('keydown', handleKeyDown);
      };
    } else {
      document.body.style.overflow = '';
    }
  }, [mobileMenuOpen]);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled || mobileMenuOpen
            ? 'bg-[#05070b]/95 backdrop-blur-md border-b border-cyan-950/40 py-3 shadow-[0_10px_30px_-10px_rgba(0,0,0,0.8)]'
            : 'bg-transparent py-4 sm:py-5'
        }`}
        style={{ paddingTop: 'max(0.75rem, env(safe-area-inset-top))' }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            
            {/* Logo */}
            <a href="#" className="flex items-center gap-2 group shrink-0">
              <span className="font-serif text-2xl sm:text-3xl font-medium tracking-tight text-white group-hover:text-cyan-300 transition-colors">
                Ciclos<span className="text-cyan-400 font-sans inline-block">.</span>
              </span>
            </a>

            {/* Desktop Nav Links */}
            <nav className="hidden md:flex items-center gap-8 text-[12px] tracking-widest uppercase font-mono text-slate-300">
              <a href="#para-quem-e" className="hover:text-cyan-300 transition-colors py-1">
                Para quem é
              </a>
              <a href="#como-funciona" className="hover:text-cyan-300 transition-colors py-1">
                Como funciona
              </a>
              <a href="#quem-conduz" className="hover:text-cyan-300 transition-colors py-1">
                Quem conduz
              </a>
              <a href="#planos" className="hover:text-cyan-300 transition-colors py-1">
                Planos
              </a>
              <a href="#perguntas" className="hover:text-cyan-300 transition-colors py-1">
                Perguntas
              </a>
            </nav>

            {/* Desktop CTA Button */}
            <div className="hidden sm:flex items-center gap-3">
              <button
                onClick={onOpenEnroll}
                className="group relative inline-flex items-center gap-2 px-5 py-2 rounded-full border border-cyan-500/30 bg-cyan-950/30 text-cyan-300 text-xs font-mono tracking-widest uppercase hover:bg-cyan-500/10 hover:border-cyan-400 hover:text-white transition-all duration-300 hover:shadow-[0_0_20px_rgba(0,242,254,0.35)] cursor-pointer"
              >
                <span>Entrar no Ciclos</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform text-cyan-400" />
              </button>
            </div>

            {/* Mobile Actions: Botão de ação rápida + Hamburger */}
            <div className="flex md:hidden items-center gap-2.5">
              <button
                onClick={onOpenEnroll}
                className="btn-cyan-glow px-3.5 py-1.5 rounded-full text-[11px] font-mono uppercase tracking-wider font-bold inline-flex items-center gap-1.5 cursor-pointer shadow-sm"
              >
                <span>Entrar</span>
                <ArrowRight className="w-3 h-3" />
              </button>

              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="text-slate-300 hover:text-white p-2.5 rounded-xl bg-slate-900/80 border border-slate-800 focus:outline-none focus:ring-2 focus:ring-cyan-500/50"
                aria-label={mobileMenuOpen ? "Fechar menu" : "Abrir menu"}
                aria-expanded={mobileMenuOpen}
              >
                {mobileMenuOpen ? <X className="w-5 h-5 text-cyan-400" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Drawer */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-cyan-950/60 bg-[#070b13]/98 backdrop-blur-2xl px-5 pt-4 pb-8 transition-all animate-fade-in shadow-2xl">
            <div className="flex flex-col text-sm font-mono uppercase tracking-widest text-slate-300 mb-6 divide-y divide-slate-800/60">
              <a
                href="#para-quem-e"
                onClick={() => setMobileMenuOpen(false)}
                className="py-3.5 hover:text-cyan-300 flex items-center justify-between"
              >
                <span>Para quem é</span>
                <span className="text-cyan-500/50 text-xs">→</span>
              </a>
              <a
                href="#como-funciona"
                onClick={() => setMobileMenuOpen(false)}
                className="py-3.5 hover:text-cyan-300 flex items-center justify-between"
              >
                <span>Como funciona</span>
                <span className="text-cyan-500/50 text-xs">→</span>
              </a>
              <a
                href="#quem-conduz"
                onClick={() => setMobileMenuOpen(false)}
                className="py-3.5 hover:text-cyan-300 flex items-center justify-between"
              >
                <span>Quem conduz</span>
                <span className="text-cyan-500/50 text-xs">→</span>
              </a>
              <a
                href="#planos"
                onClick={() => setMobileMenuOpen(false)}
                className="py-3.5 hover:text-cyan-300 flex items-center justify-between"
              >
                <span>Planos</span>
                <span className="text-cyan-500/50 text-xs">→</span>
              </a>
              <a
                href="#perguntas"
                onClick={() => setMobileMenuOpen(false)}
                className="py-3.5 hover:text-cyan-300 flex items-center justify-between"
              >
                <span>Perguntas</span>
                <span className="text-cyan-500/50 text-xs">→</span>
              </a>
            </div>

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenEnroll();
              }}
              className="w-full btn-cyan-glow py-3.5 rounded-xl text-xs font-mono uppercase tracking-wider font-bold flex items-center justify-center gap-2 cursor-pointer shadow-[0_0_25px_rgba(0,242,254,0.35)]"
            >
              <span>Garantir minha vaga</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </header>

      {/* Backdrop overlay para fechar o menu mobile ao tocar fora */}
      {mobileMenuOpen && (
        <div
          onClick={() => setMobileMenuOpen(false)}
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 md:hidden animate-fade-in"
          aria-hidden="true"
        />
      )}
    </>
  );
}
