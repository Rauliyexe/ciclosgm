import React, { useRef, useState } from 'react';
import { ArrowUpRight } from 'lucide-react';

export default function HostSection() {
  const frameRef = useRef(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const onMove = (e) => {
    if (typeof window !== 'undefined' && window.matchMedia('(hover: none)').matches) return;
    if (!frameRef.current) return;
    const r = frameRef.current.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width;
    const py = (e.clientY - r.top) / r.height;
    setTilt({ x: (py - 0.5) * -4, y: (px - 0.5) * 6 });
  };

  const onLeave = () => {
    setTilt({ x: 0, y: 0 });
  };

  return (
    <section id="quem-conduz" className="relative py-24 sm:py-32 overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center">

          {/* Portrait with 3D tilt */}
          <div className="lg:col-span-6">
            <div
              ref={frameRef}
              onMouseMove={onMove}
              onMouseLeave={onLeave}
              className="relative w-full max-w-[500px] mx-auto select-none"
              style={{ perspective: '1200px' }}
            >
              <div
                className="relative w-full transition-transform duration-500 ease-out flex items-end justify-center"
                style={{ transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`, transformStyle: 'preserve-3d' }}
              >
                <img
                  src="/host.png"
                  alt="G.M — Fundador do Ciclos"
                  className="w-full h-auto object-contain filter drop-shadow-[0_25px_60px_rgba(0,0,0,0.95)]"
                />
              </div>
            </div>
          </div>

          {/* Short, punchy copy */}
          <div className="lg:col-span-6">
            <span className="text-xs font-mono uppercase tracking-[0.25em] text-cyan-400 bg-cyan-950/40 border border-cyan-500/20 px-3.5 py-1 rounded-full inline-block mb-6">
              Quem Conduz
            </span>

            <h2 className="font-serif text-4xl sm:text-6xl text-white font-normal leading-[1.08] tracking-tight mb-6">
              Eu não vou te <span className="italic text-slate-500 line-through decoration-cyan-400/60 decoration-1">motivar</span>.
              <br />
              Vou estar <span className="italic text-cyan-300">lá</span>.
            </h2>

            <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-lg mb-8">
              A maioria das pessoas trava na execução solitária. A presença silenciosa de outra pessoa focada ao seu lado sustenta o ritmo e elimina a procrastinação. Sem discurso. Apenas presença.
            </p>

            {/* Signature */}
            <div className="pt-6 border-t border-slate-800/80 flex items-center justify-between gap-6 max-w-lg">
              <div>
                <div className="font-serif italic text-3xl sm:text-4xl text-white mb-1 tracking-tight">
                  — G.M
                </div>
                <div className="text-[11px] font-mono uppercase tracking-widest text-cyan-400/80">
                  Fundador · Ciclos
                </div>
              </div>
              <a
                href="#planos"
                className="group w-12 h-12 rounded-full border border-cyan-500/40 flex items-center justify-center hover:bg-cyan-400 hover:border-cyan-400 transition-all duration-300 hover:shadow-[0_0_25px_#00f2fe]"
                aria-label="Ver planos"
              >
                <ArrowUpRight className="w-4 h-4 text-cyan-300 group-hover:text-slate-950 group-hover:rotate-45 transition-all duration-300" />
              </a>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
