import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { gsap } from '../utils/gsapSetup';
import { SectionWrapper } from '../components/SectionWrapper';
import { SectionHeading } from '../components/SectionHeading';
import { PhotoCarousel } from '../components/PhotoCarousel';
import { personalInfo, stats } from '../data/resumeData';


function AnimatedCounter({ target, label }: { target: number; label: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const triggered = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !triggered.current) {
          triggered.current = true;
          let start = 0;
          const duration = 1600;
          const step = (timestamp: number) => {
            if (!start) start = timestamp;
            const progress = Math.min((timestamp - start) / duration, 1);
            setCount(Math.floor(progress * target));
            if (progress < 1) requestAnimationFrame(step);
            else setCount(target);
          };
          requestAnimationFrame(step);
        }
      },
      { threshold: 0.5 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [target]);

  return (
    <div ref={ref} className="text-center">
      <div className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white">
        {count}
        <span className="text-blue-500">+</span>
      </div>
      <div className="mt-1 text-sm text-gray-500 dark:text-gray-400 font-medium">{label}</div>
    </div>
  );
}

export function About() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '[data-about-item]',
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.9,
          stagger: 0.12,
          ease: 'power4.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 78%', once: true },
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const highlights = [
    { title: 'BIM Expertise', desc: 'Proficient in Revit, Navisworks & BIM 360 for collaborative model coordination' },
    { title: 'Civil Engineering', desc: 'B.Tech foundation with hands-on site engineering and structural design experience' },
    { title: 'UK Market Focused', desc: 'Pursuing MSc at Coventry University, aligned with UK BIM Level 2 & 3 standards' },
  ];

  return (
    <SectionWrapper id="about" className="bg-gray-50 dark:bg-gray-900/50">
      <div ref={sectionRef}>
        <SectionHeading
          label="About Me"
          title="Civil Engineer. BIM Specialist."
          description={personalInfo.summary}
        />

        {/* Photo + highlights two-column layout */}
        <div className="grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-10 mb-16 items-start">

          {/* Photo carousel */}
          <motion.div data-about-item className="mx-auto lg:mx-0 w-72 lg:w-full flex-shrink-0">
            <PhotoCarousel />
          </motion.div>

          {/* Highlights */}
          <div className="grid grid-cols-1 sm:grid-cols-1 gap-6">
            {highlights.map((h, i) => (
              <motion.div
                key={i}
                data-about-item
                whileHover={{ y: -4 }}
                transition={{ duration: 0.2 }}
                className="p-6 rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900"
              >
                <div className="w-8 h-1 rounded-full bg-blue-500 mb-4" />
                <h3 className="text-base font-semibold text-gray-900 dark:text-white mb-2">{h.title}</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">{h.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 pt-8 border-t border-gray-200 dark:border-gray-800">
          {stats.map(({ label, value }) => (
            <AnimatedCounter key={label} target={value} label={label} />
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
}
