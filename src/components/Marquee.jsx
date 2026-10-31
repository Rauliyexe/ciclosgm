import React from 'react';

/** Faixa infinita de palavras-chave entre seções. */
export default function Marquee() {
  const words = ['Constância', 'Silêncio', '05h29', 'Presença', 'Foco profundo', 'Um pouco todo dia', 'Ritmo', '62 minutos', 'Ciclo'];
  const row = [...words, ...words];

  return (
    <div className="relative py-8 border-y border-cyan-950/50 overflow-hidden bg-[#04070d]/70 select-none">
      <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-[#05070b] to-transparent z-10 pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-[#05070b] to-transparent z-10 pointer-events-none" />
      <div className="flex w-max animate-marquee gap-12">
        {row.map((w, i) => (
          <span key={i} className="flex items-center gap-12 font-serif text-3xl sm:text-5xl text-slate-200/80 whitespace-nowrap">
            <span className={i % 2 ? 'italic text-cyan-300/90' : ''}>{w}</span>
            <span className="w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_10px_#00f2fe]" />
          </span>
        ))}
      </div>
    </div>
  );
}

