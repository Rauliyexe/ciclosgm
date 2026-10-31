import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowRight } from 'lucide-react';

export default function Navbar({ onOpenEnroll }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#05070b]/90 backdrop-blur-md border-b border-cyan-950/40 py-3 shadow-[0_10px_30px_-10px_rgba(0,0,0,0.8)]'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* Logo */}
          <a href="#" className="flex items-center gap-2 group">
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

          {/* CTA Button */}
          <div className="hidden sm:flex items-center gap-3">
            <button
              onClick={onOpenEnroll}
              className="group relative inline-flex items-center gap-2 px-5 py-2 rounded-full border border-cyan-500/30 bg-cyan-950/30 text-cyan-300 text-xs font-mono tracking-widest uppercase hover:bg-cyan-500/10 hover:border-cyan-400 hover:text-white transition-all duration-300 hover:shadow-[0_0_20px_rgba(0,242,254,0.35)] cursor-pointer"
            >
              <span>Entrar no Ciclos</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform text-cyan-400" />
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden text-slate-300 hover:text-white p-2 rounded-lg bg-slate-900/60 border border-slate-800"
            aria-label="Abrir menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5 text-cyan-400" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden px-4 pt-4 pb-6 bg-[#070b12] border-b border-cyan-950/60 backdrop-blur-xl">
          <div className="flex flex-col gap-4 text-xs font-mono uppercase tracking-widest text-slate-300 mb-6">
            <a href="#para-quem-e" onClick={() => setMobileMenuOpen(false)} className="py-2 border-b border-slate-800/80 hover:text-cyan-300">
              Para quem é
            </a>
            <a href="#como-funciona" onClick={() => setMobileMenuOpen(false)} className="py-2 border-b border-slate-800/80 hover:text-cyan-300">
              Como funciona
            </a>
            <a href="#quem-conduz" onClick={() => setMobileMenuOpen(false)} className="py-2 border-b border-slate-800/80 hover:text-cyan-300">
              Quem conduz
            </a>
            <a href="#planos" onClick={() => setMobileMenuOpen(false)} className="py-2 border-b border-slate-800/80 hover:text-cyan-300">
              Planos
            </a>
            <a href="#perguntas" onClick={() => setMobileMenuOpen(false)} className="py-2 hover:text-cyan-300">
              Perguntas
            </a>
          </div>

          <button
            onClick={() => {
              setMobileMenuOpen(false);
              onOpenEnroll();
            }}
            className="w-full btn-cyan-glow py-3 rounded-full text-xs font-mono uppercase tracking-wider font-semibold flex items-center justify-center gap-2"
          >
            <span>Entrar no Ciclos</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      )}
    </header>
  );
}
