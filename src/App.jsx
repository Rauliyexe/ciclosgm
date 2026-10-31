import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import EmotionalQuotes from './components/EmotionalQuotes';
import HowItWorks from './components/HowItWorks';
import HostSection from './components/HostSection';
import AudienceComparison from './components/AudienceComparison';
import CommunityMoments from './components/CommunityMoments';
import Pricing from './components/Pricing';
import FaqSection from './components/FaqSection';
import FinalCtaSection from './components/FinalCtaSection';
import Footer from './components/Footer';
import EnrollModal from './components/EnrollModal';
import Reveal from './components/Reveal';
import ScrollProgress from './components/ScrollProgress';
import Marquee from './components/Marquee';

export default function App() {
  const [enrollModalOpen, setEnrollModalOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState('mensal'); // 'mensal' | 'anual'

  const handleOpenEnroll = (plan = 'mensal') => {
    setSelectedPlan(typeof plan === 'string' ? plan : 'mensal');
    setEnrollModalOpen(true);
  };
  const handleCloseEnroll = () => setEnrollModalOpen(false);

  return (
    <div className="min-h-screen bg-[#05070b] text-[#e2e8f0] relative selection:bg-cyan-500/30 selection:text-cyan-200">
      
      {/* Cortina de abertura de página ao entrar no site */}
      <div className="page-curtain">
        <span className="font-serif text-5xl sm:text-7xl text-white font-medium tracking-tight">
          Ciclos<span className="text-cyan-400 font-sans">.</span>
        </span>
      </div>

      {/* Barra de progresso de rolagem no topo */}
      <ScrollProgress />

      {/* Luzes ambientes sutis */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-cyan-900/10 rounded-full blur-[180px]" />
        <div className="absolute bottom-1/4 right-10 w-[500px] h-[500px] bg-cyan-950/10 rounded-full blur-[180px]" />
      </div>

      <div className="relative z-10">
        {/* Navbar */}
        <Navbar onOpenEnroll={handleOpenEnroll} />

        {/* Hero com entrada animada e esfera Phosphor */}
        <Hero onOpenEnroll={handleOpenEnroll} />

        {/* Faixa animada de palavras-chave */}
        <Marquee />

        {/* Citações com animação de escala e desfoque */}
        <Reveal direction="scale" duration={900}>
          <EmotionalQuotes />
        </Reveal>

        {/* Como funciona com slide suave */}
        <Reveal direction="up" duration={900}>
          <HowItWorks onOpenEnroll={handleOpenEnroll} />
        </Reveal>

        {/* Quem conduz (G.M com foto transparente e tilt 3D) */}
        <Reveal direction="up" duration={1000}>
          <HostSection />
        </Reveal>

        {/* Comparativo objetivo lado a lado */}
        <Reveal direction="up" duration={900}>
          <AudienceComparison onOpenEnroll={handleOpenEnroll} />
        </Reveal>

        {/* Galeria de Fotos / Propósito (Imersão & Encontros) */}
        <Reveal direction="up" duration={900}>
          <CommunityMoments />
        </Reveal>

        {/* Tabela de Preço */}
        <Reveal direction="scale" duration={900}>
          <Pricing onOpenEnroll={handleOpenEnroll} />
        </Reveal>

        {/* Dúvidas Frequentes */}
        <Reveal direction="up" duration={900}>
          <FaqSection />
        </Reveal>

        {/* Seção Final com o Background RisingLines */}
        <Reveal direction="up" duration={1000}>
          <FinalCtaSection onOpenEnroll={handleOpenEnroll} />
        </Reveal>

        {/* Rodapé */}
        <Footer />

        {/* Modal de Inscrição */}
        <EnrollModal isOpen={enrollModalOpen} onClose={handleCloseEnroll} selectedPlan={selectedPlan} />
      </div>
    </div>
  );
}
