import React, { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState(0);

  const faqs = [
    {
      q: 'Preciso acordar às 5h29 todos os dias?',
      a: 'O encontro acontece de segunda a sexta, pontualmente às 5h29 até 6h31. Você tem a flexibilidade de participar nos dias que couberem na sua rotina, mas recomendamos a consistência diária para usufruir do efeito acumulado do hábito.',
    },
    {
      q: 'Se eu não puder ligar a câmera, posso participar?',
      a: 'Sim! A câmera aberta é incentivada para reforçar o sentimento de compromisso coletivo, mas se você estiver em um ambiente privativo ou sem condições no dia, você pode participar com a câmera fechada. O microfone fica fechado para todos o tempo todo.',
    },
    {
      q: 'O que as pessoas fazem durante esses 62 minutos?',
      a: 'Cada participante trabalha no que precisa: leitura de livros de estudo, preparação para provas ou concursos, escrita técnica, código, organização do dia de trabalho ou tarefas profundas que exigem concentração sem celular.',
    },
    {
      q: 'Como funciona o link e o acesso aos encontros?',
      a: 'Assim que sua inscrição é confirmada, você recebe o convite para o grupo exclusivo de WhatsApp. Todos os dias úteis, às 5h25, o link direto do Google Meet é fixado no topo do grupo.',
    },
    {
      q: 'Como funciona o cancelamento e a garantia?',
      a: 'Você tem garantia incondicional de 7 dias. Se nos primeiros 7 dias você sentir que não é para você, basta enviar uma mensagem e 100% do valor será reembolsado. Além disso, a assinatura é mensal e você pode cancelar quando quiser sem burocracia.',
    },
    {
      q: 'E nos feriados ou fins de semana?',
      a: 'Aos fins de semana o grupo permanece disponível para troca de experiências e registro de rotina, mas a sala ao vivo ocorre exclusivamente nos dias úteis. Em feriados nacionais, a sala é opcional para quem deseja manter o ritmo.',
    },
  ];

  const toggle = (idx) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section id="perguntas" className="relative py-24 sm:py-32">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center mb-16">
          <span className="text-xs font-mono uppercase tracking-[0.25em] text-cyan-400 bg-cyan-950/40 border border-cyan-500/20 px-3.5 py-1 rounded-full inline-block mb-3">
            Dúvidas Frequentes
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl text-white font-normal tracking-tight">
            Perguntas & Respostas
          </h2>
        </div>

        {/* Accordion list */}
        <div className="space-y-4">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="rounded-2xl bg-[#070b13]/80 border border-slate-800/80 hover:border-cyan-500/30 transition-all duration-200 overflow-hidden"
              >
                <button
                  onClick={() => toggle(idx)}
                  className="w-full px-6 py-5 flex items-center justify-between text-left text-white font-serif text-lg sm:text-xl font-normal"
                >
                  <span className="pr-4">{faq.q}</span>
                  <ChevronDown
                    className={`w-5 h-5 text-cyan-400 shrink-0 transition-transform duration-300 ${
                      isOpen ? 'rotate-180 text-cyan-300' : ''
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-6 pb-6 pt-1 text-sm sm:text-base text-slate-300 font-sans font-light leading-relaxed border-t border-slate-800/50">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}

