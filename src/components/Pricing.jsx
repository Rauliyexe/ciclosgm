import React, { useState, useRef, useLayoutEffect, useEffect } from 'react';
import { Check, ShieldCheck, ArrowRight, Sparkles, Zap, Tag } from 'lucide-react';

export default function Pricing({ onOpenEnroll }) {
  const [billingCycle, setBillingCycle] = useState('mensal'); // 'mensal' | 'anual'
  
  // Refs para animação do seletor físico
  const containerRef = useRef(null);
  const mensalRef = useRef(null);
  const anualRef = useRef(null);
  const [indicatorStyle, setIndicatorStyle] = useState({ left: 6, width: 90 });

  // Ref e estado para animação suave de altura do card (sem saltos bruscos)
  const innerCardRef = useRef(null);
  const [cardHeight, setCardHeight] = useState(null);

  useLayoutEffect(() => {
    const updateIndicator = () => {
      const activeEl = billingCycle === 'mensal' ? mensalRef.current : anualRef.current;
      if (activeEl && containerRef.current) {
        const containerRect = containerRef.current.getBoundingClientRect();
        const activeRect = activeEl.getBoundingClientRect();
        setIndicatorStyle({
          left: activeRect.left - containerRect.left,
          width: activeRect.width,
        });
      }
    };

    updateIndicator();
    const raf = requestAnimationFrame(updateIndicator);
    window.addEventListener('resize', updateIndicator);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', updateIndicator);
    };
  }, [billingCycle]);

  // Observa mudanças de altura do conteúdo para transição contínua
  useEffect(() => {
    if (!innerCardRef.current) return;
    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        if (entry.target) {
          setCardHeight(entry.target.offsetHeight);
        }
      }
    });
    observer.observe(innerCardRef.current);
    return () => observer.disconnect();
  }, []);

  const features = [
    {
      text: 'Encontro matinal online, de segunda a sexta (5h29 às 6h31)',
      highlight: false,
    },
    {
      text: 'Grupo de WhatsApp exclusivo com a comunidade',
      highlight: true,
    },
    {
      text: 'Acesso imediato à biblioteca de reflexões matinais',
      highlight: false,
    },
    {
      text: 'Área de membros com encontros ao vivo e dinâmicas especiais',
      highlight: false,
    },
    {
      text: 'Ritmo contínuo e disciplina coletiva sem interrupções',
      highlight: false,
    },
  ];

  const isAnual = billingCycle === 'anual';

  return (
    <section id="planos" className="relative py-24 sm:py-32">
      {/* Luz ambiente suave de fundo */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[520px] bg-cyan-600/10 rounded-full blur-[190px] pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Cabeçalho */}
        <div className="text-center mb-10">
          <span className="text-xs font-mono uppercase tracking-[0.25em] text-cyan-400 bg-cyan-950/40 border border-cyan-500/20 px-3.5 py-1 rounded-full inline-block mb-3 shadow-[0_0_15px_rgba(0,242,254,0.15)]">
            Planos de Adesão
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl text-white font-normal tracking-tight mb-4">
            Escolha como quer entrar no ciclo.
          </h2>
          <p className="font-sans text-slate-400 text-sm sm:text-base max-w-lg mx-auto">
            Sem contratos complexos. Compromisso direto com a sua consistência matinal.
          </p>
        </div>

        {/* Seletor Interativo com Deslizar Físico Fluido */}
        <div className="flex justify-center mb-12">
          <div
            ref={containerRef}
            className="relative p-1.5 rounded-full bg-slate-950/90 border border-slate-800/90 inline-flex items-center backdrop-blur-xl shadow-2xl overflow-hidden"
          >
            {/* Cápsula de luz que desliza fluidamente e adapta sua largura milimétrica */}
            <div
              className="absolute top-1.5 bottom-1.5 rounded-full bg-cyan-500/20 border border-cyan-400/50 shadow-[0_0_22px_rgba(0,242,254,0.4)] pointer-events-none transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]"
              style={{
                left: `${indicatorStyle.left}px`,
                width: `${indicatorStyle.width}px`,
              }}
            />

            <button
              ref={mensalRef}
              type="button"
              onClick={() => setBillingCycle('mensal')}
              className={`relative z-10 px-6 py-2.5 rounded-full text-xs font-mono uppercase tracking-wider transition-colors duration-300 cursor-pointer ${
                !isAnual ? 'text-cyan-200 font-bold' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Mensal
            </button>

            <button
              ref={anualRef}
              type="button"
              onClick={() => setBillingCycle('anual')}
              className={`relative z-10 px-6 py-2.5 rounded-full text-xs font-mono uppercase tracking-wider transition-colors duration-300 flex items-center gap-2 cursor-pointer ${
                isAnual ? 'text-cyan-200 font-bold' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <span>Anual</span>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-mono tracking-tight font-bold bg-cyan-400 text-slate-950 shadow-[0_0_10px_#00f2fe]">
                -R$ 169
              </span>
            </button>
          </div>
        </div>

        {/* Card Principal com Animação Fluida de Altura & Shimmer no Hover */}
        <div
          className="group relative max-w-xl mx-auto rounded-3xl bg-gradient-to-b from-[#070e1b]/95 via-[#060a14]/95 to-[#04070f]/95 border border-cyan-500/35 hover:border-cyan-400/60 shadow-[0_20px_80px_-15px_rgba(0,242,254,0.22)] hover:shadow-[0_25px_90px_-10px_rgba(0,242,254,0.32)] backdrop-blur-2xl overflow-hidden transition-[height,border-color,box-shadow] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]"
          style={{ height: cardHeight ? `${cardHeight}px` : 'auto' }}
        >
          {/* Reflexo sutil de luz que passa diagonalmente no hover */}
          <div className="reflex-shimmer" />

          {/* Filete superior com brilho neon ciano */}
          <div className="absolute top-0 inset-x-10 h-[1px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent opacity-90 shadow-[0_0_12px_#00f2fe]" />

          {/* Conteúdo interno medido para animação fluida de altura */}
          <div ref={innerCardRef} className="p-7 sm:p-11">
            
            {/* Conteúdo com animação de troca de plano */}
            <div key={billingCycle} className="animate-price-pop">
              
              {/* Badges superiores */}
              <div className="flex items-center justify-between gap-2 mb-8">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse shadow-[0_0_8px_#00f2fe]" />
                  <span className="text-xs font-mono uppercase tracking-widest text-cyan-300 font-semibold">
                    {isAnual ? 'Plano Anual • Desconto Especial' : 'Plano Mensal Recorrente'}
                  </span>
                </div>

                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-950/70 border border-cyan-500/30 text-cyan-300 text-[11px] font-mono tracking-wider uppercase">
                  {isAnual ? (
                    <>
                      <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                      Economia de R$ 169
                    </>
                  ) : (
                    <>
                      <Check className="w-3.5 h-3.5 text-cyan-400" />
                      Cancele quando quiser
                    </>
                  )}
                </span>
              </div>

              {/* Display de Preço com 830 Cortado no Anual */}
              <div className="mb-3">
                {isAnual ? (
                  <div>
                    {/* Linha do valor original cortado */}
                    <div className="flex items-center gap-2.5 mb-1.5 min-h-[28px]">
                      <span className="text-xs font-mono uppercase tracking-widest text-slate-500">
                        De:
                      </span>
                      <span className="line-through text-slate-500 font-serif text-2xl sm:text-3xl font-light decoration-cyan-400/80 decoration-2">
                        R$ 830,00
                      </span>
                      <span className="inline-flex items-center gap-1 text-[11px] font-mono bg-cyan-950/80 text-cyan-300 border border-cyan-500/30 px-2.5 py-0.5 rounded-full">
                        <Tag className="w-3 h-3 text-cyan-400" />
                        - R$ 169
                      </span>
                    </div>

                    {/* Preço final com corte de 830 -> 661 */}
                    <div className="flex items-baseline gap-1.5">
                      <span className="text-xs font-mono uppercase tracking-widest text-cyan-400 mr-1">
                        Por:
                      </span>
                      <span className="text-base sm:text-lg font-mono text-slate-400 font-normal">
                        R$
                      </span>
                      <span className="font-serif text-5xl sm:text-6xl lg:text-7xl font-normal text-white tracking-tight drop-shadow-[0_0_25px_rgba(0,242,254,0.25)]">
                        661
                      </span>
                      <span className="text-lg sm:text-xl font-mono text-slate-300">
                        ,00
                      </span>
                      <span className="text-xs sm:text-sm font-mono text-slate-400 ml-1">
                        /ano
                      </span>
                    </div>

                    {/* Equivalência mensal */}
                    <div className="mt-2.5 flex flex-wrap items-center gap-2 text-xs font-mono">
                      <span className="text-cyan-300 font-semibold bg-cyan-950/60 px-2.5 py-0.5 rounded border border-cyan-500/30">
                        Apenas R$ 55,08/mês
                      </span>
                      <span className="text-slate-400">
                        • 12 meses de acesso pelo preço de menos de 8 meses
                      </span>
                    </div>
                  </div>
                ) : (
                  <div>
                    {/* Linha equivalente para equilíbrio visual */}
                    <div className="flex items-center gap-2.5 mb-1.5 min-h-[28px]">
                      <span className="text-xs font-mono uppercase tracking-widest text-cyan-400/80 bg-cyan-950/50 border border-cyan-500/20 px-2.5 py-0.5 rounded-full">
                        Acesso Imediato • Sem Fidelidade
                      </span>
                    </div>

                    <div className="flex items-baseline gap-1.5">
                      <span className="text-base sm:text-lg font-mono text-slate-400 font-normal">
                        R$
                      </span>
                      <span className="font-serif text-5xl sm:text-6xl lg:text-7xl font-normal text-white tracking-tight">
                        83
                      </span>
                      <span className="text-lg sm:text-xl font-mono text-slate-300">
                        ,00
                      </span>
                      <span className="text-xs sm:text-sm font-mono text-slate-400 ml-1">
                        /mês
                      </span>
                    </div>

                    <p className="text-xs font-mono text-cyan-300/80 mt-2.5 tracking-wide">
                      Menos de R$ 2,80 por dia • Cancele quando quiser com 1 clique
                    </p>
                  </div>
                )}
              </div>

              {/* Linha divisória sutil em degradê */}
              <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-slate-800 to-transparent my-7" />

              {/* O que está incluso */}
              <div className="mb-8">
                <span className="text-[11px] font-mono uppercase tracking-widest text-slate-400 block mb-5">
                  O que você recebe
                </span>

                <div className="space-y-3.5">
                  {features.map((feat, idx) => (
                    <div key={idx} className="flex items-start gap-3 text-sm text-slate-200">
                      <div className="w-5 h-5 rounded-full bg-cyan-950/80 border border-cyan-500/30 flex items-center justify-center shrink-0 mt-0.5">
                        <Check className="w-3 h-3 text-cyan-400" />
                      </div>
                      {feat.highlight ? (
                        <span className="bg-cyan-500/15 text-cyan-200 px-2.5 py-0.5 rounded font-medium border border-cyan-500/30">
                          {feat.text}
                        </span>
                      ) : (
                        <span>{feat.text}</span>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Box de Garantia */}
              <div className="rounded-2xl p-5 bg-[#0a1220]/70 border border-cyan-900/40 mb-8 backdrop-blur-sm">
                <div className="flex items-center gap-2 mb-1.5">
                  <ShieldCheck className="w-4 h-4 text-cyan-400" />
                  <span className="text-xs font-mono uppercase tracking-wider text-cyan-300 font-semibold">
                    Garantia Incondicional de 7 Dias
                  </span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed font-sans">
                  Participe dos encontros e da comunidade por 7 dias completos. Se não transformar suas manhãs, basta um clique para receber 100% do seu investimento de volta.
                </p>
              </div>

              {/* Botão de Ação */}
              <button
                onClick={() => onOpenEnroll(billingCycle)}
                className="w-full btn-cyan-glow group/btn py-4 px-6 rounded-xl font-mono text-xs sm:text-sm uppercase tracking-wider font-bold text-slate-950 flex items-center justify-center gap-2.5 transition-all cursor-pointer shadow-[0_0_30px_rgba(0,242,254,0.4)]"
              >
                <span>
                  {isAnual
                    ? 'Garantir Vaga Anual • R$ 661/ano'
                    : 'Garantir Vaga Mensal • R$ 83/mês'}
                </span>
                <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
              </button>

              {/* Subtexto */}
              <p className="text-[11px] font-mono text-center text-slate-400 mt-4 tracking-wide">
                {isAnual
                  ? 'Cobrança anual de R$ 661 • Desconto de R$ 169 aplicado'
                  : 'Cobrança mensal automática • cancele quando quiser sem burocracia'}
              </p>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
