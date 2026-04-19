import { useEffect, useRef } from 'react';
import createGlobe from 'cobe';
import { cn } from '../utils/cn';

interface GlobeProps {
  className?: string;
  isDark?: boolean;
}

export function Globe({ className, isDark = true }: GlobeProps) {
  const canvasRef  = useRef<HTMLCanvasElement>(null);
  const isDarkRef  = useRef(isDark);

  useEffect(() => { isDarkRef.current = isDark; }, [isDark]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    let phi = 0.6;
    let raf: number;
    let width = canvas.offsetWidth;

    const globe = createGlobe(canvas, {
      width:  width * 2,
      height: width * 2,
      phi,
      theta: 0.25,
      dark:          isDark ? 1   : 0,
      diffuse:       isDark ? 0.5 : 1.4,
      mapSamples:    20000,
      mapBrightness: isDark ? 1.1 : 2.8,
      baseColor:     isDark ? [0.16, 0.20, 0.36] : [0.78, 0.85, 0.98],
      markerColor:   [0, 0, 0],   // unused
      glowColor:     isDark ? [0.20, 0.40, 1.0] : [0.50, 0.65, 1.0],
      markers:       [],          // no dots
      devicePixelRatio: 2,
    });

    const animate = () => {
      phi += 0.003;
      width = canvas.offsetWidth;
      globe.update({
        phi,
        width:  width * 2,
        height: width * 2,
        dark:          isDarkRef.current ? 1   : 0,
        diffuse:       isDarkRef.current ? 0.5 : 1.4,
        mapBrightness: isDarkRef.current ? 1.1 : 2.8,
        baseColor:     isDarkRef.current ? [0.16, 0.20, 0.36] : [0.78, 0.85, 0.98],
        glowColor:     isDarkRef.current ? [0.20, 0.40, 1.0]  : [0.50, 0.65, 1.0],
      });
      raf = requestAnimationFrame(animate);
    };

    raf = requestAnimationFrame(animate);
    return () => { cancelAnimationFrame(raf); globe.destroy(); };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className={cn('w-full h-full', className)}
      style={{
        contain: 'layout paint size',
        // CSS radial mask — fades edges to transparent, no visible box
        maskImage: 'radial-gradient(ellipse 85% 85% at 50% 50%, black 45%, transparent 78%)',
        WebkitMaskImage: 'radial-gradient(ellipse 85% 85% at 50% 50%, black 45%, transparent 78%)',
      }}
    />
  );
}
