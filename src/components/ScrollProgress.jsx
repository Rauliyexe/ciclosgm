import React, { useEffect, useState } from 'react';

/** Barra fina de progresso de leitura no topo + cursor glow sutil. */
export default function ScrollProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement;
      const max = h.scrollHeight - h.clientHeight;
      setProgress(max > 0 ? h.scrollTop / max : 0);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div className="fixed top-0 left-0 right-0 h-[2px] z-[60] pointer-events-none">
      <div
        className="h-full bg-gradient-to-r from-cyan-500 via-cyan-300 to-sky-400 shadow-[0_0_12px_#00f2fe] origin-left"
        style={{ transform: `scaleX(${progress})` }}
      />
    </div>
  );
}

