import React, { useState } from 'react';
import { Compass, Sparkles, Feather } from 'lucide-react';
import { sound } from '../utils/audio';

export default function ManifestoSection() {
  const [activeConcept, setActiveConcept] = useState('ciclo');

  const concepts = {
    ciclo: {
      title: 'O Ciclo',
      desc: 'A natureza não funciona em linha reta contínua. As estações retornam, o coração pulsa, o sol renasce. Quando você sincroniza seu dia com um ciclo claro, a força de vontade deixa de ser necessária.',
    },
    silencio: {
      title: 'O Silêncio',
      desc: 'Num mundo barulhento que disputa cada segundo da sua atenção, 62 minutos de silêncio compartilhado são o maior luxo e a maior arma de diferenciação cognitiva.',
    },
    presenca: {
      title: 'A Presença',
      desc: 'Não é preciso falar. Saber que outros 100 profissionais estão com as câmeras ligadas na mesma madrugada estudando e produzindo cria uma gravidade invisível que te impede de desistir.',
    },
    amanhecer: {
      title: 'O Amanhecer',
      desc: 'Quem vence a batalha das 5h29 vence o dia inteiro. Antes de o resto do país abrir os olhos ou ler as primeiras notícias trágicas, você já garantiu sua vitória pessoal.',
    },
  };

  return (
    <section className="relative py-28 sm:py-36 border-t border-cyan-950/40 overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-cyan-600/5 rounded-full blur-[180px] pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        
        {/* Category badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-cyan-950/40 border border-cyan-500/20 text-cyan-300 text-xs font-mono uppercase tracking-[0.25em] mb-8">
          <Feather className="w-3.5 h-3.5 text-cyan-400" />
          O Manifesto
        </div>

        {/* Big Editorial Quote */}
        <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl text-white font-normal leading-[1.2] mb-12 max-w-4xl mx-auto">
          "A maioria das pessoas falha não por falta de capacidade, mas por acreditar na mentira da{' '}
          <span className="italic text-slate-400 font-light">motivação heroica</span>. O que constrói impérios é a precisão do{' '}
          <button
            onClick={() => {
              sound.playClick();
              setActiveConcept('ciclo');
            }}
            onMouseEnter={() => sound.playHoverChime()}
            className="italic text-cyan-300 underline decoration-cyan-400 decoration-1 underline-offset-8 hover:text-white transition-colors cursor-pointer"
          >
            ciclo diário.
          </button>"
        </h2>

        {/* Concept Pill Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 mb-10">
          {Object.keys(concepts).map((key) => {
            const isSelected = activeConcept === key;
            return (
              <button
                key={key}
                onClick={() => {
                  sound.playClick();
                  setActiveConcept(key);
                }}
                onMouseEnter={() => sound.playHoverChime()}
                className={`px-4 py-2 rounded-full text-xs font-mono uppercase tracking-widest transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-cyan-950 border border-cyan-400 text-cyan-200 shadow-[0_0_15px_rgba(0,242,254,0.3)]'
                    : 'bg-[#080d17] border border-slate-800 text-slate-400 hover:text-slate-200 hover:border-slate-700'
                }`}
              >
                {concepts[key].title}
              </button>
            );
          })}
        </div>

        {/* Dynamic Concept Manifest Card */}
        <div className="max-w-2xl mx-auto p-6 sm:p-8 rounded-2xl bg-[#070b13]/80 border border-cyan-500/20 shadow-2xl backdrop-blur-md transition-all duration-300">
          <h4 className="font-serif text-xl sm:text-2xl text-cyan-300 font-medium mb-3">
            {concepts[activeConcept].title}
          </h4>
          <p className="font-sans text-sm sm:text-base text-slate-300 leading-relaxed font-light">
            {concepts[activeConcept].desc}
          </p>
        </div>

      </div>
    </section>
  );
}

