import React from 'react';
import { X, Check, ArrowRight } from 'lucide-react';
import SubliminalCurve from './SubliminalCurve';

export default function AudienceComparison({ onOpenEnroll }) {
  const notForYou = [
    'procura um curso com começo, meio e fim (normalmente nunca termina)',
    'quer conteúdo técnico da sua área',
    'pretende só assistir, sem participar',
    'busca atalho ou resultado fácil',
  ];

  const forYou = [
    'quer evoluir um pouco todo dia, com ou sem vontade',
    'já tentou manter a rotina sozinho e não conseguiu',
    'quer começar o dia cedo e produzindo, ou já acorda cedo e sente falta de companhia',
    'quer estar perto de gente com o mesmo propósito',
    'trabalha em qualquer área e tem vontade de se desenvolver',
  ];

  return (
    <section id="para-quem-e" className="relative py-24 sm:py-32 overflow-hidden">
      {/* Gráfico Exponencial Subliminar no Background (Curva de Aprendizado) */}
      <SubliminalCurve />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="text-xs font-mono uppercase tracking-[0.25em] text-cyan-400 bg-cyan-950/40 border border-cyan-500/20 px-3.5 py-1 rounded-full inline-block mb-3">
            Antes de Entrar
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl text-white font-normal tracking-tight mb-3">
            Para quem é, e para quem não é.
          </h2>
        </div>

        {/* Comparison Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch mb-12">
          
          {/* Card 1: Não é para você */}
          <div className="rounded-3xl p-5 sm:p-10 bg-[#141012] border border-red-950/40 shadow-xl flex flex-col justify-between">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-red-950/30 border border-red-500/20 text-rose-300 text-xs font-mono uppercase tracking-wider mb-6 sm:mb-8">
                <span className="w-4 h-4 rounded-full bg-red-900/60 flex items-center justify-center text-rose-300 text-[10px]">
                  ✕
                </span>
                Não é para você se
              </div>

              <div className="space-y-4">
                {notForYou.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-3 text-sm sm:text-base text-slate-300 py-2 border-b border-rose-950/20 last:border-0"
                  >
                    <X className="w-4 h-4 text-rose-400/80 shrink-0 mt-1" />
                    <span className="leading-relaxed">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-8 pt-4 border-t border-rose-950/30 text-xs font-mono text-slate-500">
              O Ciclos não é aula gravada, é compromisso real diário.
            </div>
          </div>

          {/* Card 2: É para você */}
          <div className="rounded-3xl p-5 sm:p-10 bg-[#080e18] border border-cyan-500/35 shadow-[0_0_35px_-10px_rgba(0,242,254,0.18)] flex flex-col justify-between relative overflow-hidden">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-cyan-950/60 border border-cyan-400/30 text-cyan-300 text-xs font-mono uppercase tracking-wider mb-6 sm:mb-8">
                <span className="w-4 h-4 rounded-full bg-cyan-400 flex items-center justify-center text-slate-950 text-[10px] font-bold">
                  ✓
                </span>
                É para você se
              </div>

              <div className="space-y-4">
                {forYou.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-3 text-sm sm:text-base text-slate-200 py-2 border-b border-cyan-950/40 last:border-0"
                  >
                    <Check className="w-4 h-4 text-cyan-400 shrink-0 mt-1" />
                    <span className="leading-relaxed">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-8 pt-4 border-t border-cyan-950/40 text-xs font-mono text-cyan-300/80">
              Ambiente silencioso, propício para constância e disciplina.
            </div>
          </div>

        </div>

        {/* CTA Button below */}
        <div className="flex justify-center">
          <button
            onClick={onOpenEnroll}
            className="btn-cyan-glow group inline-flex items-center gap-3 px-8 py-4 rounded-full font-mono text-xs sm:text-sm uppercase tracking-wider font-bold text-slate-950 transition-all cursor-pointer"
          >
            <span>Sou eu, quero entrar</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

      </div>
    </section>
  );
}
