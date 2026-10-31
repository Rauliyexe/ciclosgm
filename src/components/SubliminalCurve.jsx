import React, { useRef, useEffect } from 'react';

export default function SubliminalCurve({ className = '' }) {
  const containerRef = useRef(null);
  const mainPathRef = useRef(null);
  const glowPathRef = useRef(null);
  const echoPathRef = useRef(null);
  const tipRef = useRef(null);

  useEffect(() => {
    const mainPath = mainPathRef.current;
    const glowPath = glowPathRef.current;
    const echoPath = echoPathRef.current;
    if (!mainPath || !glowPath || !echoPath) return;

    const mainLen = mainPath.getTotalLength();
    const echoLen = echoPath.getTotalLength();

    [mainPath, glowPath].forEach((p) => {
      p.style.strokeDasharray = `${mainLen}`;
      p.style.strokeDashoffset = `${mainLen}`;
    });

    echoPath.style.strokeDasharray = `${echoLen}`;
    echoPath.style.strokeDashoffset = `${echoLen}`;

    let targetProgress = 0;
    let currentProgress = 0;
    let rafId = null;

    const computeTargetProgress = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const vh = window.innerHeight;

      // Começa quando a seção entra na tela e completa suavemente ao atravessá-la
      const start = vh * 0.88;
      const span = rect.height * 0.85 + vh * 0.25;
      const raw = (start - rect.top) / span;
      targetProgress = Math.min(Math.max(raw, 0), 1);
    };

    const animate = () => {
      // Interpolação suave (lerp) para que a linha suba com inércia fluida
      const diff = targetProgress - currentProgress;
      if (Math.abs(diff) > 0.0005) {
        currentProgress += diff * 0.065;
      } else {
        currentProgress = targetProgress;
      }

      // Easing suave na progressão
      const eased = currentProgress;
      const offset = mainLen * (1 - eased);

      mainPath.style.strokeDashoffset = `${offset}`;
      glowPath.style.strokeDashoffset = `${offset}`;

      const echoProgress = Math.max(0, (eased - 0.08) / 0.92);
      echoPath.style.strokeDashoffset = `${echoLen * (1 - echoProgress)}`;

      if (tipRef.current) {
        try {
          const pt = mainPath.getPointAtLength(mainLen * eased);
          tipRef.current.setAttribute('transform', `translate(${pt.x}, ${pt.y})`);
          // Fade in suave no início e fade out sutil no final
          const tipOpacity =
            eased < 0.04
              ? eased / 0.04
              : eased > 0.96
                ? (1 - eased) / 0.04
                : 1;
          tipRef.current.style.opacity = `${tipOpacity * 0.85}`;
        } catch {
          // ignore
        }
      }

      rafId = requestAnimationFrame(animate);
    };

    // Desaceleração sutil do scroll quando o usuário passa pelo centro desta seção
    const handleWheel = (e) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const vh = window.innerHeight;

      // Zona ativa de desaceleração enquanto a curva está no centro da viewport
      const inSlowZone = rect.top < vh * 0.38 && rect.bottom > vh * 0.62;
      if (inSlowZone && Math.abs(e.deltaY) < 180) {
        e.preventDefault();
        window.scrollBy({
          top: e.deltaY * 0.38,
          behavior: 'instant',
        });
      }
    };

    const onScroll = () => {
      computeTargetProgress();
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    window.addEventListener('wheel', handleWheel, { passive: false });

    computeTargetProgress();
    rafId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      window.removeEventListener('wheel', handleWheel);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      className={`absolute inset-0 pointer-events-none overflow-hidden select-none z-0 ${className}`}
    >
      <svg
        className="w-full h-full object-cover opacity-35 sm:opacity-45"
        viewBox="0 0 1440 800"
        preserveAspectRatio="xMidYMid slice"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Gradiente minimalista que nasce invisível e ganha luz ao subir */}
          <linearGradient id="minimalCurveStroke" x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#00f2fe" stopOpacity="0" />
            <stop offset="20%" stopColor="#00f2fe" stopOpacity="0.15" />
            <stop offset="65%" stopColor="#00f2fe" stopOpacity="0.55" />
            <stop offset="92%" stopColor="#bae6fd" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
          </linearGradient>

          {/* Gradiente da linha de eco secundária */}
          <linearGradient id="echoCurveStroke" x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#00f2fe" stopOpacity="0" />
            <stop offset="50%" stopColor="#00f2fe" stopOpacity="0.12" />
            <stop offset="90%" stopColor="#00f2fe" stopOpacity="0.22" />
            <stop offset="100%" stopColor="#00f2fe" stopOpacity="0" />
          </linearGradient>

          {/* Brilho difuso ao redor apenas do filamento */}
          <filter id="minimalGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="8" result="blur" />
          </filter>

          {/* Halo radial para o ponto de luz na ponta */}
          <radialGradient id="tipHalo">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.9" />
            <stop offset="35%" stopColor="#00f2fe" stopOpacity="0.45" />
            <stop offset="100%" stopColor="#00f2fe" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Camada 1: Aura difusa seguindo exatamente o traço */}
        <path
          ref={glowPathRef}
          d="M -40 720 C 380 715, 760 680, 1020 460 C 1180 320, 1300 150, 1400 20"
          stroke="url(#minimalCurveStroke)"
          strokeWidth="8"
          fill="none"
          filter="url(#minimalGlow)"
          strokeLinecap="round"
          opacity="0.45"
        />

        {/* Camada 2: Filamento principal fino e elegante */}
        <path
          ref={mainPathRef}
          d="M -40 720 C 380 715, 760 680, 1020 460 C 1180 320, 1300 150, 1400 20"
          stroke="url(#minimalCurveStroke)"
          strokeWidth="1.5"
          fill="none"
          strokeLinecap="round"
        />

        {/* Camada 3: Filamento secundário sutil de eco para profundidade */}
        <path
          ref={echoPathRef}
          d="M 40 750 C 440 745, 810 705, 1065 495 C 1220 360, 1335 190, 1430 60"
          stroke="url(#echoCurveStroke)"
          strokeWidth="0.8"
          fill="none"
          strokeLinecap="round"
        />

        {/* Ponto luminoso minimalista na ponta do filamento */}
        <g ref={tipRef} style={{ opacity: 0 }}>
          <circle r="10" fill="url(#tipHalo)" />
          <circle r="2" fill="#e0f2fe" />
        </g>
      </svg>
    </div>
  );
}
