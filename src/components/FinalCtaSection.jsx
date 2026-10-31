import React from 'react';
import { ArrowRight, ShieldCheck } from 'lucide-react';
import RisingLines from './RisingLines';

export default function FinalCtaSection({ onOpenEnroll }) {
  return (
    <section className="relative min-h-[500px] sm:min-h-[560px] flex items-center justify-center overflow-hidden">
      
      {/* Background: RisingLines com a paleta ciano e preto do Ciclos */}
      <div className="absolute inset-0 pointer-events-none">
        <RisingLines
          color="#00f2fe"
          horizonColor="#0284c7"
          background="#05070b"
          particles={450}
          riseSpeed={22}
          opacity={90}
          scale={7}
          showHorizon={true}
          horizonOpacity={80}
        />
      </div>

      {/* Gradientes superior e inferior suaves para transição fluida sem linhas divisórias */}
      <div className="absolute top-0 inset-x-0 h-48 bg-gradient-to-b from-[#05070b] via-[#05070b]/80 to-transparent pointer-events-none z-10" />
      <div className="absolute bottom-0 inset-x-0 h-48 bg-gradient-to-t from-[#03060c] via-[#03060c]/80 to-transparent pointer-events-none z-10" />

      {/* Conteúdo Central Flutuante */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 relative z-20 text-center py-20">
        
        {/* Tag */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-cyan-950/70 border border-cyan-500/30 text-cyan-300 text-xs font-mono uppercase tracking-[0.2em] mb-6 shadow-[0_0_15px_rgba(0,242,254,0.25)]">
          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse shadow-[0_0_8px_#00f2fe]" />
          Amanhã às 05h29
        </div>

        {/* Título */}
        <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl text-white font-normal tracking-tight mb-6 leading-tight">
          O próximo ciclo começa amanhã.
          <br />
          <span className="italic font-light text-cyan-300 font-serif drop-shadow-[0_0_30px_rgba(0,242,254,0.35)]">
            Você vai estar lá?
          </span>
        </h2>

        {/* Subtítulo curto e direto */}
        <p className="text-base sm:text-lg text-slate-300 font-normal max-w-xl mx-auto mb-8 leading-relaxed">
          Sem motivação passageira. Apenas 62 minutos de foco compartilhado para destravar o seu dia antes do restante do mundo acordar.
        </p>

        {/* Botão de Ação */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-6 w-full">
          <button
            onClick={onOpenEnroll}
            className="btn-cyan-glow group w-full sm:w-auto inline-flex items-center justify-center gap-3 px-7 sm:px-8 py-4 rounded-xl font-mono text-xs sm:text-sm uppercase tracking-wider font-bold text-slate-950 transition-all cursor-pointer shadow-[0_0_30px_rgba(0,242,254,0.4)]"
          >
            <span>Garantir minha vaga no Ciclos</span>
            <span className="w-6 h-6 rounded-lg bg-black/10 flex items-center justify-center group-hover:translate-x-1 transition-transform">
              <ArrowRight className="w-4 h-4 text-black" />
            </span>
          </button>
        </div>

        {/* Garantia */}
        <div className="flex items-center justify-center gap-2 text-xs font-mono text-slate-400 tracking-wide">
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

    </section>
  );
}

