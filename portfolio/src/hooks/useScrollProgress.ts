import { useState, useEffect, useRef } from 'react';

export function useScrollProgress() {
  const [progress, setProgress] = useState(0);
  const rafRef = useRef<number>(0);
  const targetRef = useRef(0);
  const currentRef = useRef(0);

  useEffect(() => {
    const getTarget = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      return docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    };

    const tick = () => {
      // Lerp current toward target for smooth catch-up
      currentRef.current += (targetRef.current - currentRef.current) * 0.12;
      const rounded = Math.round(currentRef.current * 10) / 10;
      setProgress(rounded);
      rafRef.current = requestAnimationFrame(tick);
    };

    const onScroll = () => {
      targetRef.current = getTarget();
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    rafRef.current = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener('scroll', onScroll);
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return progress;
}
