# Ciclos. — Base de Site com Shader Phosphor & Recursos Originais

Landing page construída com paleta **preto profundo e azul neon/ciano** (`#05070b` e `#00f2fe`), desenvolvida com **React + Vite + Tailwind CSS v4 + WebGL Raymarching Shader Phosphor + Lucide Icons + Web Audio API**.

---

## 🔮 O Shader Phosphor Integrado (`Phosphor.jsx`)

O componente **Phosphor** (shader volumétrico de raymarching de ruído torcido por Xor) foi adaptado e integrado com precisão cirúrgica ao design system do **Ciclos**:

1. **O Núcleo Quântico do Mostrador (`CycleDial.jsx`)**:
   - Posicionado no coração do mostrador de ciclos no Hero, funcionando como uma **esfera de energia viva** em azul ciano/neon sob o slogan *"Um pouco todo dia"*.
   - Possui máscara radial suave (`radial-gradient`) que funde as bordas com o preto absoluto do site.
   - Parâmetros calibrados:
     - `background="#05070b"`
     - `baseColor="#00f2fe"` (ou `#38bdf8` no Modo Alvorada)
     - `spectrum={18}` (limita a dispersão a tons elétricos de ciano e anil, evitando arco-íris desalinhados)
     - `turbulence={48}`
     - `speed={32}`
   - Botão interativo para alternar a intensidade do núcleo (*normal*, *intenso*, *mínimo*).

2. **Esfera de Foco Meditativo (`LiveFocusWidget.jsx`)**:
   - Disponível como um visualizador opcional de meditação e foco profundo durante o cronômetro dos 62 minutos matinais.

---

## 🚀 Como Rodar o Projeto

```powershell
cd C:\Users\rauli\.gemini\antigravity\scratch\ciclos-site

# Instalar dependências (já instaladas)
npm install

# Modo desenvolvimento
npm run dev

# Visualizar a build (ativa em http://localhost:4173)
npm run preview
```
