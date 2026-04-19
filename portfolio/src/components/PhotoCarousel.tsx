import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const PHOTOS = [
  { src: '/satyasai.png',   alt: 'Satyasai at Coventry street' },
  { src: '/satyasai-2.png', alt: 'Satyasai at Coventry Cathedral' },
  { src: '/satyasai-3.png', alt: 'Satyasai at the hills' },
  { src: '/satyasai-4.png', alt: 'Satyasai in the forest' },
];

const INTERVAL = 4000;

export function PhotoCarousel() {
  const [active, setActive] = useState(0);
  const [direction, setDirection] = useState(1);
  const paused = useRef(false);

  const go = (idx: number) => {
    setDirection(idx > active ? 1 : -1);
    setActive(idx);
  };

  const prev = () => {
    const idx = (active - 1 + PHOTOS.length) % PHOTOS.length;
    setDirection(-1);
    setActive(idx);
  };

  const next = () => {
    const idx = (active + 1) % PHOTOS.length;
    setDirection(1);
    setActive(idx);
  };

  useEffect(() => {
    const id = setInterval(() => {
      if (!paused.current) {
        setDirection(1);
        setActive(a => (a + 1) % PHOTOS.length);
      }
    }, INTERVAL);
    return () => clearInterval(id);
  }, []);

  const variants = {
    enter: (d: number) => ({
      x: d > 0 ? '100%' : '-100%',
      opacity: 0,
    }),
    center: {
      x: '0%',
      opacity: 1,
    },
    exit: (d: number) => ({
      x: d > 0 ? '-100%' : '100%',
      opacity: 0,
    }),
  };

  return (
    <div
      className="select-none"
      onMouseEnter={() => { paused.current = true; }}
      onMouseLeave={() => { paused.current = false; }}
    >
      {/* Main slide */}
      <div className="relative rounded-2xl overflow-hidden aspect-[3/4] bg-gray-100 dark:bg-gray-800 shadow-2xl shadow-black/20">

        <AnimatePresence custom={direction} mode="sync" initial={false}>
          <motion.img
            key={active}
            src={PHOTOS[active].src}
            alt={PHOTOS[active].alt}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1] }}
            className="absolute inset-0 w-full h-full object-cover object-top"
            draggable={false}
          />
        </AnimatePresence>

        {/* Bottom gradient */}
        <div className="absolute bottom-0 inset-x-0 h-28 bg-gradient-to-t from-black/50 to-transparent z-10 pointer-events-none" />

        {/* Prev / Next buttons — inside the image */}
        <button
          onClick={prev}
          className="absolute left-3 top-1/2 -translate-y-1/2 z-20 w-9 h-9 rounded-full
            bg-white/10 hover:bg-white/25 backdrop-blur-sm border border-white/20
            flex items-center justify-center text-white transition-all duration-200
            hover:scale-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400"
          aria-label="Previous photo"
        >
          <ChevronLeft size={18} />
        </button>

        <button
          onClick={next}
          className="absolute right-3 top-1/2 -translate-y-1/2 z-20 w-9 h-9 rounded-full
            bg-white/10 hover:bg-white/25 backdrop-blur-sm border border-white/20
            flex items-center justify-center text-white transition-all duration-200
            hover:scale-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400"
          aria-label="Next photo"
        >
          <ChevronRight size={18} />
        </button>

        {/* Counter + dots — bottom overlay */}
        <div className="absolute bottom-4 inset-x-0 z-20 flex flex-col items-center gap-2">
          <div className="flex items-center gap-1.5">
            {PHOTOS.map((_, i) => (
              <button
                key={i}
                onClick={() => go(i)}
                aria-label={`Go to photo ${i + 1}`}
                className="focus-visible:outline-none"
              >
                <motion.div
                  animate={{
                    width: i === active ? 22 : 6,
                    opacity: i === active ? 1 : 0.45,
                  }}
                  transition={{ duration: 0.3, ease: 'easeOut' }}
                  className="h-1.5 rounded-full bg-white"
                />
              </button>
            ))}
          </div>
          <span className="text-[10px] text-white/60 font-medium tracking-widest uppercase">
            {active + 1} / {PHOTOS.length}
          </span>
        </div>
      </div>
    </div>
  );
}
