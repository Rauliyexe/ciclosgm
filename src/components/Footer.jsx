import React from 'react';
import { ArrowUp, ShieldCheck } from 'lucide-react';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative pt-16 pb-12 bg-[#03060c] overflow-hidden max-w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 pb-12 border-b border-slate-900">
          
          {/* Brand & Slogan */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <span className="font-serif text-3xl font-medium tracking-tight text-white mb-2">
              Ciclos<span className="text-cyan-400">.</span>
            </span>
            <p className="font-serif italic text-slate-400 text-sm max-w-sm">
              Você sabe o que precisa fazer. O difícil é fazer todo dia.
            </p>
          </div>

          {/* Nav links */}
          <div className="flex flex-wrap justify-center gap-6 text-xs font-mono uppercase tracking-wider text-slate-400">
            <a href="#para-quem-e" className="hover:text-cyan-300 transition-colors">
              Para quem é
            </a>
            <a href="#como-funciona" className="hover:text-cyan-300 transition-colors">
              Como funciona
            </a>
            <a href="#o-encontro" className="hover:text-cyan-300 transition-colors">
              O Encontro
            </a>
            <a href="#planos" className="hover:text-cyan-300 transition-colors">
              Planos
            </a>
            <a href="#perguntas" className="hover:text-cyan-300 transition-colors">
              Perguntas
            </a>
          </div>

          {/* Back to top button */}
          <button
            onClick={scrollToTop}
            className="w-10 h-10 rounded-full border border-slate-800 bg-slate-900/60 text-slate-400 hover:text-cyan-300 hover:border-cyan-500/40 flex items-center justify-center transition-colors"
            aria-label="Voltar ao topo"
          >
            <ArrowUp className="w-4 h-4" />
          </button>

        </div>

        {/* Bottom copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] font-mono text-slate-400">
          <p>© {new Date().getFullYear()} Ciclos. Todos os direitos reservados.</p>
          <div className="flex items-center gap-6">
            <span className="hover:text-slate-300 cursor-pointer">Termos de Uso</span>
            <span className="hover:text-slate-300 cursor-pointer">Privacidade</span>
            <span className="hover:text-slate-300 cursor-pointer">Suporte</span>
          </div>
        </div>

      </div>
    </footer>
  );
}

