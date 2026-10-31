import React, { useEffect, useRef, useState } from 'react';

/**
 * Reveal — anima o conteúdo quando entra na viewport.
 * direction: 'up' | 'down' | 'left' | 'right' | 'scale' | 'blur'
 */
export default function Reveal({
  children,
  direction = 'up',
  delay = 0,
  duration = 900,
  distance = 48,
  once = true,
  threshold = 0.15,
  className = '',
  as: Tag = 'div',
}) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  const [settled, setSettled] = useState(false);

  useEffect(() => {
    if (!visible) return;
    const t = setTimeout(() => setSettled(true), duration + delay + 50);
    return () => clearTimeout(t);
  }, [visible, duration, delay]);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setVisible(true);
      return;
    }

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          if (once) io.disconnect();
        } else if (!once) {
          setVisible(false);
        }
      },
      { threshold, rootMargin: '0px 0px -8% 0px' }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [once, threshold]);

  const hidden = {
    up: `translate3d(0, ${distance}px, 0)`,
    down: `translate3d(0, -${distance}px, 0)`,
    left: `translate3d(${distance}px, 0, 0)`,
    right: `translate3d(-${distance}px, 0, 0)`,
    scale: 'scale(0.94)',
    blur: `translate3d(0, ${distance / 2}px, 0)`,
  }[direction];

  return (
    <Tag
      ref={ref}
      className={className}
      style={
        settled
          ? undefined
          : {
            opacity: visible ? 1 : 0,
            transform: visible ? 'none' : hidden,
            filter: visible ? 'blur(0px)' : 'blur(10px)',
            transition: `opacity ${duration}ms cubic-bezier(0.16,1,0.3,1) ${delay}ms, transform ${duration}ms cubic-bezier(0.16,1,0.3,1) ${delay}ms, filter ${duration}ms cubic-bezier(0.16,1,0.3,1) ${delay}ms`,
            willChange: 'opacity, transform, filter',
          }
      }
    >
      {children}
    </Tag>
  );
}
