import { useEffect, useRef } from 'react';
import { motion, type Variants } from 'framer-motion';
import { Download, Mail, MapPin, ArrowDown, Building2 } from 'lucide-react';
import { Button } from '../components/Button';
import { Globe } from '../components/Globe';
import { personalInfo, contactInfo } from '../data/resumeData';
import { gsap } from '../utils/gsapSetup';

interface HeroProps { isDark: boolean; }

export function Hero({ isDark }: HeroProps) {
  const bgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let raf: number;
    let tx = 0, ty = 0, cx = 0, cy = 0;
    const onMove = (e: MouseEvent) => {
      tx = (e.clientX / window.innerWidth  - 0.5) * 16;
      ty = (e.clientY / window.innerHeight - 0.5) * 10;
    };
    const tick = () => {
      cx += (tx - cx) * 0.05;
      cy += (ty - cy) * 0.05;
      if (bgRef.current) gsap.set(bgRef.current, { x: cx, y: cy });
      raf = requestAnimationFrame(tick);
    };
    window.addEventListener('mousemove', onMove, { passive: true });
    raf = requestAnimationFrame(tick);
    return () => { window.removeEventListener('mousemove', onMove); cancelAnimationFrame(raf); };
  }, []);

  const container: Variants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.1, delayChildren: 0.08 } },
  };
  const item: Variants = {
    hidden: { y: 24, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] } },
  };

  // Colours that switch cleanly with the theme
  const dotGridColor = isDark
    ? 'rgba(59,130,246,0.1)'
    : 'rgba(59,130,246,0.07)';

  const ambientColor = isDark
    ? 'rgba(59,130,246,0.09)'
    : 'rgba(59,130,246,0.05)';

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center overflow-hidden
        bg-white dark:bg-gray-950 transition-colors duration-500"
    >
      {/* Parallax dot grid */}
      <div
        ref={bgRef}
        className="absolute inset-[-6%] pointer-events-none"
        aria-hidden
        style={{ willChange: 'transform' }}
      >
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(${dotGridColor} 1px, transparent 1px)`,
            backgroundSize: '36px 36px',
          }}
        />
      </div>

      {/* Top ambient glow */}
      <div
        aria-hidden
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[350px] pointer-events-none"
        style={{
          background: `radial-gradient(ellipse 70% 60% at 50% 0%, ${ambientColor} 0%, transparent 70%)`,
        }}
      />

      {/* Two-column layout */}
      <div className="relative w-full mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 pt-24 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-6 items-center min-h-[calc(100vh-10rem)]">

          {/* LEFT — text content */}
          <motion.div variants={container} initial="hidden" animate="visible">

            {/* Badge */}
            <motion.div variants={item} className="mb-7">
              <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold
                bg-green-100 dark:bg-green-950/50 border border-green-300 dark:border-green-700/40
                text-green-700 dark:text-green-400">
                <span className="w-1.5 h-1.5 rounded-full bg-green-500 dark:bg-green-400 animate-pulse" />
                Available for opportunities
              </span>
            </motion.div>

            {/* Name */}
            <motion.h1
              variants={item}
              className="text-4xl sm:text-5xl md:text-[3.2rem] font-bold
                text-gray-900 dark:text-white leading-[1.08] tracking-tight whitespace-nowrap"
            >
              {personalInfo.name.split(' ')[0]}{' '}
              <span className="text-blue-600 dark:text-blue-400">
                {personalInfo.name.split(' ')[1]}
              </span>
            </motion.h1>

            {/* Title */}
            <motion.div variants={item} className="mt-5 flex items-start gap-2.5">
              <Building2 size={15} className="text-blue-500 flex-shrink-0 mt-0.5" />
              <p className="text-sm sm:text-base font-medium text-gray-600 dark:text-gray-300 leading-snug">
                {personalInfo.title}
              </p>
            </motion.div>

            {/* Summary */}
            <motion.p
              variants={item}
              className="mt-5 text-sm sm:text-base text-gray-500 dark:text-gray-400 leading-[1.8]"
            >
              {personalInfo.summary}
            </motion.p>

            {/* Location */}
            <motion.div variants={item} className="mt-3 flex items-center gap-1.5 text-sm text-gray-400 dark:text-gray-500">
              <MapPin size={13} />
              <span>{contactInfo.location}</span>
            </motion.div>

            {/* CTAs */}
            <motion.div variants={item} className="mt-8 flex flex-wrap gap-3">
              <Button variant="primary" size="lg" href="/resume-satyasai-sypu.pdf" download icon={<Download size={16} />}>
                Download Resume
              </Button>
              <Button variant="secondary" size="lg" href={`mailto:${contactInfo.email}`} icon={<Mail size={16} />}>
                Contact Me
              </Button>
            </motion.div>
          </motion.div>

          {/* RIGHT — Globe (desktop only) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.1, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="relative hidden lg:flex items-center justify-center"
            aria-hidden
          >
            {/* Canvas handles its own edge fade via CSS mask — no box overlay needed */}
            <div className="w-[460px] h-[460px] xl:w-[520px] xl:h-[520px]">
              <Globe isDark={isDark} className="w-full h-full" />
            </div>
          </motion.div>
        </div>

        {/* Scroll cue */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.8, duration: 0.7 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5"
        >
          <span className="text-[9px] text-gray-400 dark:text-gray-600 font-semibold tracking-[0.25em] uppercase">
            Scroll
          </span>
          <motion.div animate={{ y: [0, 6, 0] }} transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}>
            <ArrowDown size={13} className="text-gray-400 dark:text-gray-600" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
