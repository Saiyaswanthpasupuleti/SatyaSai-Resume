import { useEffect, useRef } from 'react';
import { gsap } from '../utils/gsapSetup';

import { Briefcase, MapPin, Calendar, CheckCircle2 } from 'lucide-react';
import { SectionWrapper } from '../components/SectionWrapper';
import { SectionHeading } from '../components/SectionHeading';
import { experience } from '../data/resumeData';


export function Experience() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '[data-exp-card]',
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 78%', once: true },
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <SectionWrapper id="experience" className="bg-white dark:bg-gray-950">
      <SectionHeading
        label="Experience"
        title="Professional Background"
        description="Hands-on experience in BIM modelling and site engineering across residential and infrastructure projects in India."
      />

      <div ref={sectionRef} className="flex flex-col gap-6">
        {experience.map((exp) => (
          <div
            key={exp.id}
            data-exp-card
            className="group rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-6 md:p-8 hover:border-blue-200 dark:hover:border-blue-900 transition-colors duration-300"
          >
            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-5">
              <div className="flex items-start gap-4">
                <div className="w-11 h-11 rounded-2xl bg-blue-50 dark:bg-blue-950/50 border border-blue-100 dark:border-blue-900 flex items-center justify-center flex-shrink-0">
                  <Briefcase size={18} className="text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 dark:text-white text-lg">{exp.role}</h3>
                  <p className="text-blue-600 dark:text-blue-400 font-medium text-sm mt-0.5">{exp.company}</p>
                </div>
              </div>

              <div className="flex flex-wrap gap-2 md:text-right">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gray-100 dark:bg-gray-800 text-xs font-medium text-gray-600 dark:text-gray-400">
                  <Calendar size={11} /> {exp.period}
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gray-100 dark:bg-gray-800 text-xs font-medium text-gray-600 dark:text-gray-400">
                  <MapPin size={11} /> {exp.location}
                </span>
                <span className="inline-flex items-center px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-950/50 text-xs font-semibold text-blue-700 dark:text-blue-300 border border-blue-100 dark:border-blue-900">
                  {exp.type}
                </span>
              </div>
            </div>

            <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {exp.achievements.map((ach, i) => (
                <li key={i} className="flex items-start gap-2.5">
                  <CheckCircle2 size={15} className="text-blue-500 flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">{ach}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </SectionWrapper>
  );
}
