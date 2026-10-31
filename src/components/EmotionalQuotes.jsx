import React from 'react';
import { Lock } from 'lucide-react';

export default function EmotionalQuotes() {
  const quotes = [
    "“Eu sei que consigo entregar muito mais do que isso.”",
    "“Já comecei tantas vezes. Por que agora seria diferente?”",
    "“Queria ser aquela pessoa que acorda cedo e simplesmente faz.”",
    "“Cansei de prometer para mim mesmo e não cumprir.”",
  ];

  return (
    <section className="relative py-20 sm:py-28 overflow-hidden">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 relative z-10">
        
        {/* Main Card */}
        <div className="subtle-grid relative rounded-3xl bg-[#070b13]/90 border border-cyan-900/40 p-6 sm:p-14 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.9)] backdrop-blur-xl">
          
          {/* Subtle inner top glow */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-[1px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent opacity-70" />

          {/* Centered Lock Badge */}
          <div className="flex justify-center mb-6">
            <div className="w-10 h-10 rounded-full bg-cyan-950/70 border border-cyan-500/30 flex items-center justify-center shadow-[0_0_15px_rgba(0,242,254,0.25)]">
              <Lock className="w-4 h-4 text-cyan-400" />
            </div>
          </div>

          {/* Section Heading */}
          <h2 className="font-serif italic text-2xl sm:text-3xl lg:text-4xl text-center text-slate-100 font-normal tracking-tight mb-10 max-w-xl mx-auto leading-snug">
            Coisas que você pensa e <br className="hidden sm:inline" />
            não conta para ninguém
          </h2>

          {/* Quotes List */}
          <div className="divide-y divide-slate-800/80 mb-10">
            {quotes.map((quote, idx) => (
              <div
                key={idx}
                className="py-5 sm:py-6 text-center text-slate-300 font-sans text-sm sm:text-base font-light tracking-wide hover:text-white transition-colors cursor-default"
              >
                {quote}
              </div>
            ))}
          </div>

          {/* Footer Callout */}
          <div className="text-center pt-2">
            <p className="text-xs sm:text-sm font-mono text-slate-400 leading-relaxed">
              Se você se reconheceu em alguma, o problema não é você.
              <br />
              <span className="text-cyan-300 font-medium">É tentar fazer tudo sozinho.</span>
            </p>
          </div>

        </div>

      </div>
    </section>
  );
}
