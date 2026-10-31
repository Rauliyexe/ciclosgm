import React, { useState } from 'react';
import { X, ShieldCheck, CheckCircle2, ArrowRight, MessageSquare, Sparkles } from 'lucide-react';

export default function EnrollModal({ isOpen, onClose, selectedPlan = 'mensal' }) {
  const [step, setStep] = useState('form'); // 'form' | 'success'
  const [formData, setFormData] = useState({
    name: '',
    whatsapp: '',
    email: '',
  });

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email) return;
    setStep('success');
  };

  const handleReset = () => {
    setStep('form');
    setFormData({ name: '', whatsapp: '', email: '' });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-lg max-h-[92vh] overflow-y-auto overscroll-contain rounded-3xl bg-[#080d17] border border-cyan-500/40 p-5 sm:p-9 shadow-[0_0_60px_rgba(0,242,254,0.25)] text-left">

        {/* Close Button */}
        <button
          onClick={handleReset}
          className="absolute top-4 right-4 text-slate-400 hover:text-white p-2.5 rounded-full hover:bg-slate-800 transition-colors"
          aria-label="Fechar"
        >
          <X className="w-5 h-5" />
        </button>

        {step === 'form' ? (
          <div>
            <div className="flex items-center gap-2 text-cyan-400 text-xs font-mono uppercase tracking-widest mb-2">
              <span className="w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_8px_#00f2fe]" />
              Inscrição Oficial
            </div>

            <h3 className="font-serif text-2xl sm:text-3xl text-white font-normal mb-2">
              Bem-vindo ao Ciclos.
            </h3>

            <p className="text-xs sm:text-sm text-slate-300 font-sans mb-5 sm:mb-6 leading-relaxed">
              Preencha os dados abaixo para receber as instruções imediatas de acesso ao grupo e à sala ao vivo.
            </p>

            {/* Plan Recap */}
            <div className="bg-[#050811] rounded-2xl p-4 border border-cyan-950 mb-5 sm:mb-6 flex items-center justify-between gap-3">
              <div>
                <span className="text-xs font-mono uppercase text-cyan-300 block font-semibold">
                  {selectedPlan === 'anual' ? 'Plano Anual • Desconto R$ 169' : 'Plano Mensal'}
                </span>
                <span className="text-[11px] sm:text-xs text-slate-400">
                  {selectedPlan === 'anual' ? 'De R$ 830 por R$ 661/ano (R$ 55/mês)' : 'Encontros matinais 5h29 – 6h31'}
                </span>
              </div>
              <div className="text-right shrink-0">
                <span className="font-serif text-xl sm:text-2xl text-white font-semibold">
                  {selectedPlan === 'anual' ? 'R$ 661,00' : 'R$ 83,00'}
                </span>
                <span className="text-[11px] sm:text-xs text-slate-400 block font-mono">
                  {selectedPlan === 'anual' ? '/ano' : '/mês'}
                </span>
              </div>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-slate-300 mb-1.5">
                  Seu Nome Completo
                </label>
                <input
                  type="text"
                  required
                  autoComplete="name"
                  placeholder="Ex: Carlos Silva"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-[#05070e] border border-slate-800 text-white placeholder-slate-600 focus:outline-none focus:border-cyan-400 text-base sm:text-sm font-sans transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-slate-300 mb-1.5">
                  Seu E-mail Principal
                </label>
                <input
                  type="email"
                  required
                  autoComplete="email"
                  placeholder="seuemail@exemplo.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-[#05070e] border border-slate-800 text-white placeholder-slate-600 focus:outline-none focus:border-cyan-400 text-base sm:text-sm font-sans transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-slate-300 mb-1.5">
                  WhatsApp (para o link do grupo)
                </label>
                <input
                  type="tel"
                  required
                  inputMode="tel"
                  autoComplete="tel"
                  placeholder="(11) 99999-9999"
                  value={formData.whatsapp}
                  onChange={(e) => setFormData({ ...formData, whatsapp: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-[#05070e] border border-slate-800 text-white placeholder-slate-600 focus:outline-none focus:border-cyan-400 text-base sm:text-sm font-sans transition-colors"
                />
              </div>

              {/* Guarantee mention */}
              <div className="flex items-center gap-2 text-[11px] font-mono text-slate-400 py-1">
                <ShieldCheck className="w-4 h-4 text-cyan-400 shrink-0" />
                <span>Garantia total de 7 dias com devolução integral.</span>
              </div>

              <button
                type="submit"
                className="w-full btn-cyan-glow py-3.5 px-6 rounded-xl font-mono text-xs sm:text-sm uppercase tracking-wider font-bold text-slate-950 flex items-center justify-center gap-2 mt-4 cursor-pointer"
              >
                <span>Confirmar & Receber Link</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          </div>
        ) : (
          <div className="text-center py-4">
            <div className="w-16 h-16 rounded-full bg-cyan-950/80 border border-cyan-400/40 flex items-center justify-center mx-auto mb-4 text-cyan-300 shadow-[0_0_20px_rgba(0,242,254,0.3)]">
              <CheckCircle2 className="w-8 h-8 text-cyan-400" />
            </div>

            <h3 className="font-serif text-2xl sm:text-3xl text-white font-normal mb-2">
              Inscrição Concluída!
            </h3>

            <p className="text-sm text-slate-300 font-sans mb-6 max-w-sm mx-auto">
              {formData.name}, enviamos os detalhes para <span className="text-cyan-300">{formData.email}</span>. Você já pode acessar a comunidade.
            </p>

            <div className="p-4 rounded-2xl bg-[#050914] border border-cyan-900/60 mb-6 text-left text-xs font-mono space-y-2">
              <div className="flex items-center gap-2 text-cyan-300">
                <MessageSquare className="w-4 h-4" />
                <span>Próximo Passo: Entrar no WhatsApp</span>
              </div>
              <p className="text-slate-400 font-sans text-xs">
                O link do Meet será publicado pontualmente às 5h25.
              </p>
            </div>

            <button
              onClick={handleReset}
              className="w-full py-3 rounded-xl border border-cyan-500/30 text-cyan-300 font-mono text-xs uppercase tracking-wider hover:bg-cyan-950/40 transition-colors"
            >
              Fechar Janela
            </button>
          </div>
        )}

      </div>
    </div>
  );
}

