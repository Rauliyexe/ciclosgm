import React, { useEffect, useRef } from 'react';

export default function AmbientCanvas({ isDawnMode }) {
  const canvasRef = useRef(null);
  const mousePos = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    const handleMouseMove = (e) => {
      mousePos.current.targetX = e.clientX;
      mousePos.current.targetY = e.clientY;
    };
    window.addEventListener('mousemove', handleMouseMove);

    // Initial center
    mousePos.current.x = width / 2;
    mousePos.current.y = height / 2;
    mousePos.current.targetX = width / 2;
    mousePos.current.targetY = height / 2;

    // Generate dust / cycle particles
    const particleCount = 45;
    const particles = Array.from({ length: particleCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 1.6 + 0.4,
      speedY: Math.random() * 0.35 + 0.1,
      speedX: (Math.random() - 0.5) * 0.2,
      opacity: Math.random() * 0.6 + 0.2,
      pulseSpeed: Math.random() * 0.02 + 0.005,
    }));

    let tick = 0;

    const render = () => {
      tick++;

      // Smooth mouse follow
      mousePos.current.x += (mousePos.current.targetX - mousePos.current.x) * 0.04;
      mousePos.current.y += (mousePos.current.targetY - mousePos.current.y) * 0.04;

      ctx.clearRect(0, 0, width, height);

      // Render interactive orbital rings around mouse position
      const ringColor = isDawnMode ? 'rgba(56, 189, 248, 0.04)' : 'rgba(0, 242, 254, 0.03)';
      ctx.lineWidth = 1;

      for (let r = 160; r <= 520; r += 120) {
        ctx.beginPath();
        ctx.arc(mousePos.current.x, mousePos.current.y, r, 0, Math.PI * 2);
        ctx.strokeStyle = ringColor;
        ctx.setLineDash([4, 18]);
        ctx.stroke();
        ctx.setLineDash([]);
      }

      // Draw particles
      particles.forEach((p) => {
        p.y -= p.speedY;
        p.x += p.speedX;

        // Wrap edges
        if (p.y < 0) p.y = height;
        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;

        const currentOpacity = Math.abs(Math.sin(tick * p.pulseSpeed)) * p.opacity;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = isDawnMode
          ? `rgba(125, 211, 252, ${currentOpacity})`
          : `rgba(0, 242, 254, ${currentOpacity * 0.8})`;
        ctx.fill();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, [isDawnMode]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-[1] transition-opacity duration-1000"
    />
  );
}

