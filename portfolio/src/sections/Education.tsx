import { useEffect, useRef } from 'react';
import { gsap } from '../utils/gsapSetup';

import { GraduationCap, MapPin, Calendar } from 'lucide-react';
import { SectionWrapper } from '../components/SectionWrapper';
import { SectionHeading } from '../components/SectionHeading';
import { education } from '../data/resumeData';


export function Education() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '[data-edu-item]',
        { x: -30, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.7,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 78%', once: true },
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <SectionWrapper id="education" className="bg-gray-50 dark:bg-gray-900/50">
      <SectionHeading
        label="Education"
        title="Academic Journey"
        description="Building a strong foundation from Civil Engineering to specialised BIM and Construction Project Management."
      />

      <div ref={sectionRef} className="relative">
        {/* Timeline line */}
        <div className="absolute left-5 md:left-8 top-0 bottom-0 w-px bg-gray-200 dark:bg-gray-800" />

        <div className="flex flex-col gap-8">
          {education.map((edu, i) => (
            <div key={edu.id} data-edu-item className="relative pl-14 md:pl-20">
              {/* Timeline dot */}
              <div className="absolute left-3 md:left-6 top-1 w-4 h-4 rounded-full border-2 border-blue-500 bg-white dark:bg-gray-950 flex items-center justify-center">
                <div className={`w-2 h-2 rounded-full ${i === 0 ? 'bg-blue-500 animate-pulse' : 'bg-blue-300 dark:bg-blue-700'}`} />
              </div>

              {/* Card */}
              <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-6">
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-3">
                  <div>
                    <h3 className="font-bold text-gray-900 dark:text-white text-base md:text-lg leading-snug">
                      {edu.degree}
                    </h3>
                    <div className="flex items-center gap-1.5 mt-1">
                      <GraduationCap size={13} className="text-blue-500" />
                      <span className="text-sm font-medium text-blue-600 dark:text-blue-400">
                        {edu.institution}
                      </span>
                    </div>
                  </div>
                  <span className="flex-shrink-0 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gray-100 dark:bg-gray-800 text-xs font-medium text-gray-600 dark:text-gray-400">
                    <Calendar size={11} />
                    {edu.period}
                  </span>
                </div>

                <div className="flex items-center gap-1.5 mb-3">
                  <MapPin size={12} className="text-gray-400" />
                  <span className="text-xs text-gray-400 dark:text-gray-500">{edu.location}</span>
                </div>

                <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed mb-4">
                  {edu.description}
                </p>

                {edu.highlights && (
                  <ul className="flex flex-wrap gap-2">
                    {edu.highlights.map((h) => (
                      <li
                        key={h}
                        className="px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-950/50 text-blue-700 dark:text-blue-300 text-xs font-medium border border-blue-100 dark:border-blue-900"
                      >
                        {h}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
}
