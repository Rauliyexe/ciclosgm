import React from 'react';
import Phosphor from './Phosphor';

export default function CycleDial({ isDawnMode }) {
  return (
    <div className="relative w-full max-w-[280px] xs:max-w-[340px] sm:max-w-[420px] lg:max-w-[500px] aspect-square mx-auto flex items-center justify-center select-none bg-transparent">
      {/* Exclusivamente a bola renderizada, com fundo 100% transparente */}
      <div className="w-full h-full relative flex items-center justify-center bg-transparent">
        <Phosphor
          background="transparent"
          baseColor={isDawnMode ? "#38bdf8" : "#00f2fe"}
          spectrum={isDawnMode ? 26 : 18}
          size={160}
          distance={7.2}
          turbulence={48}
          brightness={170}
          speed={32}
        />
      </div>
    </div>
  );
}
