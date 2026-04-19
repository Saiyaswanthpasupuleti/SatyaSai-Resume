import { useEffect, useRef } from 'react';
import { gsap } from '../utils/gsapSetup';

import { FolderOpen, Wrench, ChevronRight } from 'lucide-react';
import { SectionWrapper } from '../components/SectionWrapper';
import { SectionHeading } from '../components/SectionHeading';
import { projects } from '../data/resumeData';


const CATEGORY_COLORS: Record<string, string> = {
  'BIM Modelling': 'bg-blue-50 dark:bg-blue-950/50 text-blue-700 dark:text-blue-300 border-blue-100 dark:border-blue-900',
  Sustainability: 'bg-green-50 dark:bg-green-950/50 text-green-700 dark:text-green-300 border-green-100 dark:border-green-900',
  Infrastructure: 'bg-orange-50 dark:bg-orange-950/50 text-orange-700 dark:text-orange-300 border-orange-100 dark:border-orange-900',
  'Project Management': 'bg-purple-50 dark:bg-purple-950/50 text-purple-700 dark:text-purple-300 border-purple-100 dark:border-purple-900',
};

export function Projects() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '[data-proj-card]',
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
          stagger: 0.12,
          ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 78%', once: true },
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <SectionWrapper id="projects" className="bg-gray-50 dark:bg-gray-900/50">
      <SectionHeading
        label="Projects"
        title="Selected Work"
        description="Academic and professional projects spanning BIM modelling, sustainable design, infrastructure planning, and project management."
      />

      <div ref={sectionRef} className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {projects.map((proj) => (
          <div
            key={proj.id}
            data-proj-card
            className="group flex flex-col rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-6 hover:border-blue-200 dark:hover:border-blue-900 transition-all duration-300 hover:shadow-md dark:hover:shadow-none"
          >
            {/* Header */}
            <div className="flex items-start gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-gray-100 dark:bg-gray-800 flex items-center justify-center flex-shrink-0">
                <FolderOpen size={18} className="text-blue-500" />
              </div>
              <div className="flex-1 min-w-0">
                <span
                  className={`inline-block mb-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold border ${CATEGORY_COLORS[proj.category] ?? 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 border-gray-200 dark:border-gray-700'}`}
                >
                  {proj.category}
                </span>
                <h3 className="font-bold text-gray-900 dark:text-white text-base leading-snug group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  {proj.title}
                </h3>
              </div>
            </div>

            {/* Description */}
            <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed mb-4 flex-1">
              {proj.description}
            </p>

            {/* Highlights */}
            {proj.highlights && (
              <ul className="flex flex-col gap-1.5 mb-4">
                {proj.highlights.map((h, i) => (
                  <li key={i} className="flex items-start gap-2 text-xs text-gray-500 dark:text-gray-400">
                    <ChevronRight size={12} className="text-blue-500 flex-shrink-0 mt-0.5" />
                    {h}
                  </li>
                ))}
              </ul>
            )}

            {/* Tools */}
            <div className="flex items-center gap-2 flex-wrap pt-4 border-t border-gray-100 dark:border-gray-800">
              <Wrench size={12} className="text-gray-400 flex-shrink-0" />
              {proj.tools.map((tool) => (
                <span
                  key={tool}
                  className="text-xs text-gray-500 dark:text-gray-500 font-medium"
                >
                  {tool}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </SectionWrapper>
  );
}
