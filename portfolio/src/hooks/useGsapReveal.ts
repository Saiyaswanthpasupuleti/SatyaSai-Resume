import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface RevealOptions {
  y?: number;
  opacity?: number;
  duration?: number;
  stagger?: number;
  delay?: number;
}

export function useGsapReveal<T extends HTMLElement>(options: RevealOptions = {}) {
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const { y = 40, opacity = 0, duration = 0.8, stagger = 0.1, delay = 0 } = options;

    const targets = el.querySelectorAll('[data-reveal]');
    const animTargets = targets.length > 0 ? Array.from(targets) : [el];

    const ctx = gsap.context(() => {
      gsap.fromTo(
        animTargets,
        { y, opacity },
        {
          y: 0,
          opacity: 1,
          duration,
          stagger,
          delay,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 85%',
            once: true,
          },
        }
      );
    }, el);

    return () => ctx.revert();
  }, []);

  return ref;
}
