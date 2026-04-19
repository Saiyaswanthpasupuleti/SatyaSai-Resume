import { useEffect, useRef } from 'react';

export function ScrollProgress() {
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const bar = barRef.current;
    if (!bar) return;

    const update = () => {
      const scrolled  = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const ratio     = docHeight > 0 ? scrolled / docHeight : 0;
      bar.style.transform = `scaleX(${ratio})`;
    };

    // Sync immediately on mount
    update();
    window.addEventListener('scroll', update, { passive: true });
    return () => window.removeEventListener('scroll', update);
  }, []);

  return (
    <div
      className="fixed top-0 left-0 right-0 z-[60] h-[2px] bg-transparent pointer-events-none"
      aria-hidden
    >
      <div
        ref={barRef}
        className="h-full w-full bg-blue-500 origin-left"
        style={{ transform: 'scaleX(0)', willChange: 'transform' }}
      />
    </div>
  );
}
