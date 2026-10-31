import React, { useState } from 'react';
import { BookOpen, Code2, PenTool, TrendingUp, Sparkles, Flame, CheckCircle } from 'lucide-react';
import { sound } from '../utils/audio';

export default function CompoundCycleCalculator({ onOpenEnroll }) {
  const [daysPerWeek, setDaysPerWeek] = useState(5);
  const [category, setCategory] = useState('study');

  const categories = [
    {
      id: 'study',
      name: 'Estudos & Leitura',
      icon: BookOpen,
      metricName: 'livros aprofundados lidos',
      calc: (hours) => Math.floor(hours / 8),
      detail: 'Equivale a dominar 3 áreas inteiras do conhecimento por ano.',
    },
    {
      id: 'code',
      name: 'Código & Projetos',
      icon: Code2,
      metricName: 'projetos ou sistemas entregues',
      calc: (hours) => Math.max(1, Math.floor(hours / 60)),
      detail: 'Suficiente para criar e lançar um produto do zero sem tocar no horário de trabalho comercial.',
    },
    {
      id: 'writing',
      name: 'Escrita & Pesquisa',
      icon: PenTool,
      metricName: 'páginas e teses redigidas',
      calc: (hours) => Math.floor(hours * 3.5),
      detail: 'O equivalente a redigir 2 a 3 livros inteiros por ano em silêncio absoluto.',
    },
  ];

  const activeCat = categories.find((c) => c.id === category) || categories[0];

  // 62 minutes per session
  const totalMinutesPerYear = daysPerWeek * 62 * 52;
  const totalHoursPerYear = Math.floor(totalMinutesPerYear / 60);
  const metricResult = activeCat.calc(totalHoursPerYear);

  return (
    <section className="relative py-24 sm:py-32 overflow-hidden">
      {/* Ambient glow */}
      <div className="absolute top-1/2 right-1/4 w-[450px] h-[450px] bg-cyan-600/10 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center mb-16">
          <span className="text-xs font-mono uppercase tracking-[0.25em] text-cyan-400 bg-cyan-950/40 border border-cyan-500/20 px-3.5 py-1 rounded-full inline-block mb-3">
            O Efeito Composto
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl text-white font-normal tracking-tight mb-4">
            O que acontece quando você não quebra o ciclo?
          </h2>
          <p className="font-sans text-sm sm:text-base text-slate-400 max-w-xl mx-auto">
            62 minutos parecem pouco em um único dia. Mas no ciclo contínuo, tornam-se uma vantagem competitiva inalcançável.
          </p>
        </div>

        {/* Interactive Calculator Container */}
        <div className="glass-panel-glow rounded-3xl p-6 sm:p-12 border border-cyan-500/30">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            {/* Left Controls */}
            <div className="lg:col-span-6 space-y-8">
              
              {/* Category picker */}
              <div>
                <label className="block text-xs font-mono uppercase tracking-widest text-slate-300 mb-3">
                  1. O que você vai desenvolver toda manhã?
                </label>
                <div className="grid grid-cols-3 gap-2.5">
                  {categories.map((cat) => {
                    const Icon = cat.icon;
                    const isSelected = category === cat.id;
                    return (
                      <button
                        key={cat.id}
                        onClick={() => {
                          sound.playClick();
                          setCategory(cat.id);
                        }}
                        onMouseEnter={() => sound.playHoverChime()}
                        className={`p-3 sm:p-4 rounded-xl border text-left transition-all duration-200 cursor-pointer ${
                          isSelected
                            ? 'bg-cyan-950/70 border-cyan-400 shadow-[0_0_15px_rgba(0,242,254,0.25)] text-cyan-200'
                            : 'bg-[#060a13] border-slate-800 text-slate-400 hover:text-white hover:border-slate-700'
                        }`}
                      >
                        <Icon className={`w-5 h-5 mb-2 ${isSelected ? 'text-cyan-400' : 'text-slate-500'}`} />
                        <span className="block text-xs font-medium font-sans leading-tight">
                          {cat.name}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Slider: Days per week */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <label className="text-xs font-mono uppercase tracking-widest text-slate-300">
                    2. Frequência semanal no Ciclos:
                  </label>
                  <span className="font-mono text-sm font-semibold text-cyan-300 bg-cyan-950/60 px-2.5 py-0.5 rounded border border-cyan-500/30">
                    {daysPerWeek} {daysPerWeek === 1 ? 'dia' : 'dias'} por semana
                  </span>
                </div>

                <input
                  type="range"
                  min="1"
                  max="5"
                  step="1"
                  value={daysPerWeek}
                  onChange={(e) => {
                    sound.playClick();
                    setDaysPerWeek(Number(e.target.value));
                  }}
                  className="w-full h-2 bg-slate-900 rounded-lg appearance-none cursor-pointer accent-cyan-400"
                />

                <div className="flex justify-between text-[11px] font-mono text-slate-500 mt-2">
                  <span>1 dia (Ritmo leve)</span>
                  <span>3 dias (Constante)</span>
                  <span className="text-cyan-400">5 dias (Compromisso total)</span>
                </div>
              </div>

              {/* Insight note */}
              <div className="p-4 rounded-xl bg-[#040811] border border-cyan-950/70 text-xs text-slate-300 font-sans flex items-start gap-3">
                <Flame className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                <p>
                  <strong className="text-white">O segredo das 5h29:</strong> O mundo ainda está dormindo. Nenhuma notificação apita, ninguém pede reuniões de urgência. É o único horário do dia 100% sob seu controle.
                </p>
              </div>

            </div>

            {/* Right Result Card */}
            <div className="lg:col-span-6">
              <div className="rounded-2xl p-7 sm:p-9 bg-gradient-to-b from-[#091322] to-[#04070d] border border-cyan-500/40 shadow-[0_0_40px_rgba(0,242,254,0.15)] relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/10 rounded-full blur-2xl pointer-events-none" />

                <div className="flex items-center gap-2 text-cyan-400 text-xs font-mono uppercase tracking-widest mb-6">
                  <Sparkles className="w-3.5 h-3.5" />
                  Resultado acumulado em 12 meses
                </div>

                {/* Big Metric Display */}
                <div className="mb-6">
                  <div className="flex items-baseline gap-2 mb-1">
                    <span className="font-serif text-5xl sm:text-6xl text-white font-normal tracking-tight">
                      {totalHoursPerYear}
                    </span>
                    <span className="font-serif text-2xl sm:text-3xl text-cyan-300 italic">
                      horas
                    </span>
                  </div>
                  <p className="text-xs font-mono uppercase tracking-wider text-slate-400">
                    de foco profundo ininterrupto
                  </p>
                </div>

                {/* Tangible Equivalent */}
                <div className="py-5 border-y border-cyan-950/80 mb-6">
                  <div className="text-xl sm:text-2xl font-serif text-white font-medium mb-1">
                    ≈ {metricResult} {activeCat.metricName}
                  </div>
                  <p className="text-xs text-slate-400 font-sans">
                    {activeCat.detail}
                  </p>
                </div>

                {/* Action */}
                <button
                  onClick={() => {
                    sound.playClick();
                    onOpenEnroll();
                  }}
                  onMouseEnter={() => sound.playHoverChime()}
                  className="w-full btn-cyan-glow py-3.5 rounded-xl font-mono text-xs uppercase tracking-wider font-bold text-slate-950 flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>Garantir Esse Resultado no Ciclos</span>
                </button>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}

