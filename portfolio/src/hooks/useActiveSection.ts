import { useState, useEffect } from 'react';

export function useActiveSection(sectionIds: string[]) {
  const [activeSection, setActiveSection] = useState<string>(sectionIds[0] ?? '');

  useEffect(() => {
    const observers = sectionIds.map((id) => {
      const el = document.getElementById(id);
      if (!el) return null;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveSection(id);
        },
        { threshold: 0.3, rootMargin: '-10% 0px -60% 0px' }
      );
      observer.observe(el);
      return observer;
    });

    return () => {
      observers.forEach((obs, i) => {
        const el = document.getElementById(sectionIds[i]);
        if (obs && el) obs.unobserve(el);
      });
    };
  }, [sectionIds]);

  return activeSection;
}
