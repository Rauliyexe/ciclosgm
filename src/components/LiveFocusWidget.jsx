import React, { useState, useEffect } from 'react';
import { Play, Pause, RotateCcw, Volume2, VolumeX, Sparkles, Clock, Eye, EyeOff } from 'lucide-react';
import Phosphor from './Phosphor';

export default function LiveFocusWidget() {
  const [timeLeft, setTimeLeft] = useState(62 * 60); // 62 minutes focus cycle in seconds
  const [isActive, setIsActive] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(false);
  const [showPhosphorOrb, setShowPhosphorOrb] = useState(false);
  const [audioContext, setAudioContext] = useState(null);
  const [oscillator, setOscillator] = useState(null);

  // Next 5:29 AM countdown
  const [countdownString, setCountdownString] = useState('');

  useEffect(() => {
    const updateCountdown = () => {
      const now = new Date();
      const target = new Date();
      target.setHours(5, 29, 0, 0);

      if (now > target) {
        target.setDate(target.getDate() + 1);
      }

      if (target.getDay() === 6) {
        target.setDate(target.getDate() + 2);
      } else if (target.getDay() === 0) {
        target.setDate(target.getDate() + 1);
      }

      const diff = target - now;
      const hours = Math.floor(diff / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);

      setCountdownString(
        `${String(hours).padStart(2, '0')}h ${String(minutes).padStart(2, '0')}m ${String(seconds).padStart(2, '0')}s`
      );
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, []);

  // Timer runner
  useEffect(() => {
    let interval = null;
    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setIsActive(false);
    }
    return () => clearInterval(interval);
  }, [isActive, timeLeft]);

  // Audio tone generator for focus state
  const toggleSound = () => {
    if (!soundEnabled) {
      try {
        const ctx = new (window.AudioContext || window.webkitAudioContext)();
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(432, ctx.currentTime);
        gain.gain.setValueAtTime(0.015, ctx.currentTime);

        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();

        setAudioContext(ctx);
        setOscillator(osc);
        setSoundEnabled(true);
      } catch (e) {
        console.error(e);
      }
    } else {
      if (oscillator) {
        oscillator.stop();
        oscillator.disconnect();
      }
      if (audioContext) {
        audioContext.close();
      }
      setSoundEnabled(false);
    }
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  const progressPercent = ((62 * 60 - timeLeft) / (62 * 60)) * 100;

  return (
    <section className="relative py-16 sm:py-20 border-y border-cyan-950/40 bg-[#040810]/60">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 relative z-10">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left info */}
          <div className="lg:col-span-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-500/20 text-cyan-300 text-xs font-mono uppercase tracking-widest mb-4">
              <Clock className="w-3.5 h-3.5 text-cyan-400" />
              Próximo Encontro
            </div>

            <h3 className="font-serif text-2xl sm:text-3xl text-white font-normal mb-3">
              Tempo até o próximo ciclo das 5h29
            </h3>

            <div className="font-mono text-3xl sm:text-4xl text-cyan-300 font-semibold tracking-wider mb-4 drop-shadow-[0_0_15px_rgba(0,242,254,0.4)]">
              {countdownString || 'Calculando...'}
            </div>

            <p className="text-sm text-slate-400 leading-relaxed max-w-md">
              A comunidade se reúne de segunda a sexta pontualmente. Prepare seu ambiente, café e materiais na noite anterior.
            </p>
          </div>

          {/* Right interactive timer preview */}
          <div className="lg:col-span-6">
            <div className="glass-panel p-6 sm:p-7 rounded-2xl border border-cyan-500/20 shadow-xl relative overflow-hidden">
              
              <div className="flex items-center justify-between mb-4 gap-2">
                <span className="text-xs font-mono uppercase tracking-wider text-slate-300">
                  Experimente o Bloco de 62 Minutos
                </span>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setShowPhosphorOrb(!showPhosphorOrb)}
                    className={`text-[11px] font-mono px-2 py-1 rounded-full border flex items-center gap-1 transition-all ${
                      showPhosphorOrb
                        ? 'bg-cyan-500/20 text-cyan-300 border-cyan-400'
                        : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-slate-200'
                    }`}
                    title="Ativar esfera quântica de meditação"
                  >
                    <Eye className="w-3 h-3" />
                    <span>Esfera</span>
                  </button>

                  <button
                    onClick={toggleSound}
                    className={`text-[11px] font-mono px-2 py-1 rounded-full border flex items-center gap-1 transition-all ${
                      soundEnabled
                        ? 'bg-cyan-500/20 text-cyan-300 border-cyan-400'
                        : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-slate-200'
                    }`}
                    title="Frequência 432Hz para foco mental"
                  >
                    {soundEnabled ? <Volume2 className="w-3 h-3" /> : <VolumeX className="w-3 h-3" />}
                    <span>432Hz</span>
                  </button>
                </div>
              </div>

              {/* Optional Phosphor Focus Orb - Free of circular borders */}
              {showPhosphorOrb && (
                <div className="w-36 h-36 mx-auto mb-4 overflow-hidden pointer-events-none">
                  <Phosphor
                    background="#050914"
                    baseColor="#00f2fe"
                    spectrum={14}
                    size={130}
                    distance={8}
                    turbulence={40}
                    brightness={145}
                    speed={25}
                  />
                </div>
              )}

              {/* Display & Progress Bar */}
              <div className="text-center py-4 bg-[#050914] rounded-xl border border-cyan-950/80 mb-5">
                <div className="font-mono text-4xl sm:text-5xl font-bold text-white tracking-widest mb-3">
                  {formatTime(timeLeft)}
                </div>
                
                {/* Visual Progress Bar */}
                <div className="w-11/12 mx-auto h-2 bg-slate-900 rounded-full overflow-hidden border border-slate-800">
                  <div
                    className="h-full bg-gradient-to-r from-cyan-500 to-sky-400 transition-all duration-300"
                    style={{ width: `${progressPercent}%` }}
                  />
                </div>
              </div>

              {/* Controls */}
              <div className="flex items-center justify-center gap-3">
                <button
                  onClick={() => setIsActive(!isActive)}
                  className="px-6 py-2.5 rounded-lg font-mono text-xs uppercase tracking-wider font-semibold bg-cyan-400 text-slate-950 hover:bg-cyan-300 transition-colors flex items-center gap-2 shadow-[0_0_15px_rgba(0,242,254,0.3)] cursor-pointer"
                >
                  {isActive ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                  <span>{isActive ? 'Pausar' : 'Iniciar Foco'}</span>
                </button>

                <button
                  onClick={() => {
                    setIsActive(false);
                    setTimeLeft(62 * 60);
                  }}
                  className="p-2.5 rounded-lg border border-slate-800 text-slate-400 hover:text-white hover:border-slate-700 transition-colors cursor-pointer"
                  title="Reiniciar"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
