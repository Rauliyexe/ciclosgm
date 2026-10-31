import React from 'react';
import { Clock, Video, MicOff, Target } from 'lucide-react';

export default function HowItWorks({ onOpenEnroll }) {
  const steps = [
    {
      num: '01',
      badge: 'HOJE',
      title: 'Inscrição',
      description: 'Confirmação rápida e segura em menos de 1 minuto.',
    },
    {
      num: '02',
      badge: 'IMEDIATO',
      title: 'Grupo WhatsApp',
      description: 'Você recebe o link exclusivo da comunidade no WhatsApp.',
    },
    {
      num: '03',
      badge: '05h29',
      title: 'Próxima Manhã',
      description: 'A sala abre às 5h25. Começamos juntos às 5h29.',
    },
  ];

  const pillars = [
    {
      icon: Clock,
      title: 'Link no grupo às 5h25',
      subtitle: 'Finalizamos pontualmente às 6h31.',
    },
    {
      icon: Video,
      title: 'Câmera aberta',
      subtitle: 'Presença mútua que sustenta a disciplina.',
    },
    {
      icon: MicOff,
      title: 'Microfone fechado',
      subtitle: 'Silêncio absoluto do começo ao fim.',
    },
    {
      icon: Target,
      title: 'Foco na sua meta',
      subtitle: 'Estudo, leitura, código ou trabalho profundo.',
    },
  ];

  return (
    <section id="como-funciona" className="relative py-24 sm:py-32 overflow-hidden max-w-full">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center mb-14">
          <span className="text-xs font-mono uppercase tracking-[0.25em] text-cyan-400 bg-cyan-950/40 border border-cyan-500/20 px-3.5 py-1 rounded-full inline-block mb-3">
            Como Funciona
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl text-white font-normal tracking-tight">
            Três passos. Uma nova rotina.
          </h2>
        </div>

        {/* 3 Step Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          {steps.map((step, index) => (
            <div
              key={index}
              className="glass-panel p-6 sm:p-7 rounded-2xl relative overflow-hidden group hover:border-cyan-500/40 transition-all duration-300"
            >
              <div className="flex items-center justify-between mb-4">
                <span className="w-8 h-8 rounded-full border border-cyan-500/40 bg-cyan-950/60 text-cyan-300 font-mono text-xs flex items-center justify-center font-bold">
                  {step.num}
                </span>
                <span className="text-[10px] font-mono tracking-widest uppercase px-2 py-0.5 rounded bg-cyan-950/40 text-cyan-300 border border-cyan-500/20">
                  {step.badge}
                </span>
              </div>
              <h3 className="font-serif text-xl sm:text-2xl text-white font-normal mb-1.5">
                {step.title}
              </h3>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                {step.description}
              </p>
            </div>
          ))}
        </div>

        {/* Master Box: O Encontro da Manhã */}
        <div id="o-encontro" className="glass-panel-glow rounded-3xl p-6 sm:p-10 border border-cyan-900/50 relative overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left: Timeline */}
            <div className="lg:col-span-6">
              <span className="text-cyan-400 text-xs font-mono tracking-widest uppercase block mb-3">
                • O Bloco da Manhã
              </span>

              <h3 className="font-serif text-2xl sm:text-4xl text-white font-normal leading-tight mb-6">
                62 minutos para vencer o dia antes das 7h.
              </h3>

              {/* Timeline Bar */}
              <div className="bg-[#040810]/80 rounded-2xl p-5 border border-cyan-950/80">
                <div className="flex items-center justify-between font-mono text-2xl sm:text-3xl text-white font-medium mb-3">
                  <span>5h29</span>
                  <span>6h31</span>
                </div>

                <div className="relative w-full h-2 bg-slate-900 rounded-full overflow-hidden mb-3 border border-slate-800">
                  <div className="absolute top-0 left-0 bottom-0 w-full bg-gradient-to-r from-cyan-500 via-sky-400 to-cyan-300 rounded-full shadow-[0_0_12px_rgba(0,242,254,0.7)]" />
                </div>

                <div className="flex items-center justify-between text-[11px] font-mono uppercase tracking-widest text-slate-400">
                  <span>Início</span>
                  <span className="text-cyan-300 font-semibold bg-cyan-950/80 px-2 py-0.5 rounded border border-cyan-500/30">
                    62 min de foco
                  </span>
                  <span>Fim</span>
                </div>
              </div>
            </div>

            {/* Right: 4 Pillars */}
            <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {pillars.map((item, idx) => {
                const Icon = item.icon;
                return (
                  <div key={idx} className="p-4 rounded-xl bg-[#060a12]/80 border border-cyan-950/60 flex items-start gap-3">
                    <div className="w-8 h-8 rounded-lg bg-cyan-950/80 border border-cyan-500/30 flex items-center justify-center shrink-0 mt-0.5">
                      <Icon className="w-4 h-4 text-cyan-400" />
                    </div>
                    <div>
                      <h4 className="text-xs sm:text-sm text-white font-medium mb-0.5">
                        {item.title}
                      </h4>
                      <p className="text-[11px] text-slate-400 leading-snug">
                        {item.subtitle}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
