import { useEffect, useRef } from 'react';
import { gsap } from '../utils/gsapSetup';

import { Layers, Leaf, HardHat, Wrench } from 'lucide-react';
import { SectionWrapper } from '../components/SectionWrapper';
import { SectionHeading } from '../components/SectionHeading';
import { skills, skillCategories } from '../data/resumeData';
import type { Skill } from '../types';
import { cn } from '../utils/cn';


const ICONS: Record<string, React.ReactNode> = {
  Layers: <Layers size={18} />,
  Leaf: <Leaf size={18} />,
  HardHat: <HardHat size={18} />,
  Wrench: <Wrench size={18} />,
};

function SkillBar({ skill, index }: { skill: Skill; index: number }) {
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = barRef.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        { width: '0%' },
        {
          width: `${skill.level}%`,
          duration: 1,
          delay: index * 0.05,
          ease: 'power2.out',
          scrollTrigger: { trigger: el, start: 'top 90%', once: true },
        }
      );
    });
    return () => ctx.revert();
  }, [skill.level, index]);

  return (
    <div className="group">
      <div className="flex items-center justify-between mb-1.5">
        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{skill.name}</span>
        <span className="text-xs text-gray-400 dark:text-gray-500 font-mono">{skill.level}%</span>
      </div>
      <div className="h-1.5 rounded-full bg-gray-100 dark:bg-gray-800 overflow-hidden">
        <div
          ref={barRef}
          className="h-full rounded-full bg-blue-500 dark:bg-blue-400"
          style={{ width: 0 }}
        />
      </div>
    </div>
  );
}

export function Skills() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '[data-cat-card]',
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 78%', once: true },
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const categories = Object.entries(skillCategories) as [
    keyof typeof skillCategories,
    (typeof skillCategories)[keyof typeof skillCategories],
  ][];

  return (
    <SectionWrapper id="skills" className="bg-white dark:bg-gray-950">
      <SectionHeading
        label="Technical Skills"
        title="Tools & Expertise"
        description="A comprehensive set of BIM, design, and project management skills built through academic training and hands-on internship experience."
      />

      <div ref={sectionRef} className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {categories.map(([catKey, cat]) => {
          const catSkills = skills.filter((s) => s.category === catKey);
          return (
            <div
              key={catKey}
              data-cat-card
              className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-6"
            >
              {/* Category header */}
              <div className="flex items-center gap-3 mb-6">
                <div
                  className={cn(
                    'w-9 h-9 rounded-xl flex items-center justify-center text-white bg-gradient-to-br',
                    cat.color
                  )}
                >
                  {ICONS[cat.icon]}
                </div>
                <h3 className="font-semibold text-gray-900 dark:text-white">{cat.label}</h3>
              </div>

              {/* Skills */}
              <div className="flex flex-col gap-4">
                {catSkills.map((skill, i) => (
                  <SkillBar key={skill.name} skill={skill} index={i} />
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </SectionWrapper>
  );
}
