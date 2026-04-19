import { useEffect } from 'react';
import { motion } from 'framer-motion';

interface Props {
  onDone: () => void;
  isDark: boolean;
}

const WORDS = ['Satyasai', 'Sypu'];

// Duration (ms) before the intro starts sliding out
const HOLD_DURATION = 2200;

export function IntroScreen({ onDone, isDark }: Props) {
  useEffect(() => {
    const t = setTimeout(onDone, HOLD_DURATION);
    return () => clearTimeout(t);
  }, [onDone]);

  return (
    <motion.div
      className={`fixed inset-0 z-[9999] flex flex-col items-center justify-center select-none overflow-hidden transition-colors ${isDark ? 'bg-gray-950' : 'bg-white'}`}
      initial={{ y: 0 }}
      exit={{ y: '-100%' }}
      transition={{ duration: 1, ease: [0.76, 0, 0.24, 1] }}
    >
      {/* Subtle grid overlay */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none opacity-30"
        style={{
          backgroundImage: `radial-gradient(${isDark ? 'rgba(59,130,246,0.15)' : 'rgba(59,130,246,0.10)'} 1px, transparent 1px)`,
          backgroundSize: '40px 40px',
        }}
      />

      {/* Blue ambient glow */}
      <div
        aria-hidden
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 70% 60% at 50% 50%, rgba(59,130,246,0.12) 0%, transparent 70%)',
        }}
      />

      {/* Name */}
      <div className="relative flex flex-col items-center gap-0 leading-none">
        {WORDS.map((word, wi) => (
          <div key={word} className="overflow-hidden">
            <motion.span
              className={`block font-bold tracking-tight ${isDark ? 'text-white' : 'text-gray-900'}`}
              style={{
                fontSize: 'clamp(3.5rem, 12vw, 9rem)',
                lineHeight: 1.02,
              }}
              initial={{ y: '110%', opacity: 0 }}
              animate={{ y: '0%', opacity: 1 }}
              transition={{
                duration: 0.85,
                delay: 0.25 + wi * 0.18,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              {wi === 1 ? (
                <span className={isDark ? 'text-blue-400' : 'text-blue-600'}>{word}</span>
              ) : (
                word
              )}
            </motion.span>
          </div>
        ))}
      </div>

      {/* Subtitle */}
      <div className="overflow-hidden mt-5">
        <motion.p
          className={`text-sm sm:text-base tracking-[0.3em] uppercase font-medium ${isDark ? 'text-gray-500' : 'text-gray-400'}`}
          initial={{ y: '110%', opacity: 0 }}
          animate={{ y: '0%', opacity: 1 }}
          transition={{ duration: 0.75, delay: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          BIM &amp; Construction Portfolio
        </motion.p>
      </div>

      {/* Loading bar */}
      <div className={`absolute bottom-10 left-1/2 -translate-x-1/2 w-32 h-px overflow-hidden ${isDark ? 'bg-gray-800' : 'bg-gray-200'}`}>
        <motion.div
          className="h-full bg-blue-500"
          initial={{ scaleX: 0, originX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: HOLD_DURATION / 1000 - 0.3, delay: 0.3, ease: 'linear' }}
        />
      </div>
    </motion.div>
  );
}
