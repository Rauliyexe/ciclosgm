import React from 'react';
import { ArrowRight, ChevronDown, ShieldCheck } from 'lucide-react';
import CycleDial from './CycleDial';

export default function Hero({ onOpenEnroll }) {
  return (
    <section className="relative pt-32 sm:pt-40 pb-20 sm:pb-28 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Copy & CTAs */}
          <div className="lg:col-span-7 flex flex-col items-start text-left">
            
            {/* Tag / Category */}
            <div className="hero-in inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-cyan-950/40 border border-cyan-500/25 text-cyan-300 text-xs font-mono uppercase tracking-[0.2em] mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse shadow-[0_0_8px_#00f2fe]" />
              05h29 · Foco Matinal
            </div>

            {/* Main Headline */}
            <h1 className="font-serif text-4xl sm:text-6xl lg:text-[4.4rem] font-normal tracking-tight text-white leading-[1.08] mb-6">
              Você sabe o que precisa fazer. O difícil é{' '}
              <span className="italic font-light text-cyan-300 font-serif drop-shadow-[0_0_25px_rgba(0,242,254,0.3)]">
                fazer todo dia.
              </span>
            </h1>

            {/* Description — Curta, direta e sem enrolação */}
            <p className="hero-in text-base sm:text-lg text-slate-300 font-normal leading-relaxed max-w-xl mb-8" style={{ animationDelay: '0.2s' }}>
              De segunda a sexta, pontualmente às 5h29. Câmeras abertas, microfones mudos e 62 minutos de foco absoluto na sua prioridade.
            </p>

            {/* CTAs */}
            <div className="hero-in flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full sm:w-auto mb-6" style={{ animationDelay: '0.35s' }}>
              <button
                onClick={onOpenEnroll}
                className="btn-cyan-glow group inline-flex items-center justify-center gap-3 px-7 py-3.5 rounded-xl font-mono text-xs sm:text-sm uppercase tracking-wider font-bold text-slate-950 transition-all cursor-pointer"
              >
                <span>Quero entrar no Ciclos</span>
                <span className="w-6 h-6 rounded-lg bg-black/10 flex items-center justify-center group-hover:translate-x-1 transition-transform">
                  <ArrowRight className="w-4 h-4 text-black" />
                </span>
              </button>

              <a
                href="#como-funciona"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl text-xs sm:text-sm font-mono uppercase tracking-wider text-slate-300 border border-slate-800 hover:border-cyan-500/40 hover:text-white bg-slate-900/40 backdrop-blur-sm transition-all"
              >
                <span>Como funciona</span>
                <ChevronDown className="w-4 h-4 text-slate-400" />
              </a>
            </div>

            {/* Microcopy info */}
            <div className="hero-in flex flex-wrap items-center gap-2 text-xs font-mono text-slate-400 tracking-wide" style={{ animationDelay: '0.5s' }}>
              <span>R$ 83/mês</span>
              <span className="text-cyan-500">•</span>
              <span>cancele quando quiser</span>
              <span className="text-cyan-500">•</span>
              <span className="flex items-center gap-1 text-slate-300">
                <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" />
                garantia de 7 dias
              </span>
            </div>

          </div>

          {/* Right Column: Visual Phosphor Ball with smooth fade-in */}
          <div className="hero-in lg:col-span-5 flex items-center justify-center w-full" style={{ animationDelay: '0.3s' }}>
            <CycleDial />
          </div>

        </div>
      </div>
    </section>
  );
}
