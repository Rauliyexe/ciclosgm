import React from 'react';

export default function CommunityMoments() {
  return (
    <section className="relative py-20 sm:py-28 overflow-hidden">
      {/* Luz ambiente suave */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-cyan-950/20 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Cabeçalho Editorial Minimalista */}
        <div className="text-center mb-12 sm:mb-16">
          <span className="text-xs font-mono uppercase tracking-[0.25em] text-cyan-400 bg-cyan-950/40 border border-cyan-500/20 px-3.5 py-1 rounded-full inline-block mb-4">
            Comunidade & Propósito
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl text-white font-normal tracking-tight">
            Ciclos diferentes.<br />
            <span className="italic text-slate-400 font-light">Mesmo propósito.</span>
          </h2>
        </div>

        {/* Grade com as duas fotos 1024x682 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          
          {/* Foto 1: Palco / Audiência */}
          <div className="group relative rounded-2xl sm:rounded-3xl overflow-hidden border border-slate-800/80 hover:border-cyan-500/40 bg-slate-950/60 transition-all duration-500 shadow-2xl">
            <div className="aspect-[3/2] overflow-hidden bg-black">
              <img
                src="/event-stage.jpg"
                alt="Encontro Ciclos no palco com participantes"
                className="w-full h-full object-cover grayscale contrast-125 brightness-95 group-hover:scale-105 group-hover:brightness-105 transition-all duration-700 ease-out"
                loading="lazy"
              />
            </div>
            
            {/* Gradiente inferior e legenda sutil */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent pointer-events-none" />
            <div className="absolute bottom-0 inset-x-0 p-5 sm:p-6 flex items-center justify-between text-xs font-mono text-slate-300">
              <span className="uppercase tracking-wider text-cyan-300/90 font-medium">Foco Compartilhado</span>
              <span className="text-slate-400">Encontros & Imersão</span>
            </div>
          </div>

          {/* Foto 2: G.M / Mostrador Ciclos */}
          <div className="group relative rounded-2xl sm:rounded-3xl overflow-hidden border border-slate-800/80 hover:border-cyan-500/40 bg-slate-950/60 transition-all duration-500 shadow-2xl">
            <div className="aspect-[3/2] overflow-hidden bg-black">
              <img
                src="/event-profile.jpg"
                alt="Condução Ciclos e mostrador do tempo"
                className="w-full h-full object-cover grayscale contrast-125 brightness-95 group-hover:scale-105 group-hover:brightness-105 transition-all duration-700 ease-out"
                loading="lazy"
              />
            </div>

            {/* Gradiente inferior e legenda sutil */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent pointer-events-none" />
            <div className="absolute bottom-0 inset-x-0 p-5 sm:p-6 flex items-center justify-between text-xs font-mono text-slate-300">
              <span className="uppercase tracking-wider text-cyan-300/90 font-medium">Condução G.M</span>
              <span className="text-slate-400">Disciplina Diária</span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}

