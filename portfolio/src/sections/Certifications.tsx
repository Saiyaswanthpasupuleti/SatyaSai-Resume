import { useEffect, useRef } from 'react';
import { gsap } from '../utils/gsapSetup';

import { Award, CheckCircle2, Clock, Languages, Sparkles } from 'lucide-react';
import { SectionWrapper } from '../components/SectionWrapper';
import { SectionHeading } from '../components/SectionHeading';
import { certifications, extras } from '../data/resumeData';


export function Certifications() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '[data-cert-item]',
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 78%', once: true },
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <SectionWrapper id="certifications" className="bg-white dark:bg-gray-950">
      <SectionHeading
        label="Credentials"
        title="Certifications & Extras"
        description="Professional credentials, licences, and personal attributes that complement my technical expertise."
      />

      <div ref={sectionRef} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Certifications */}
        <div className="lg:col-span-2">
          <h3 className="text-sm font-semibold uppercase tracking-widest text-gray-500 dark:text-gray-400 mb-5">
            Certifications
          </h3>
          <div className="flex flex-col gap-3">
            {certifications.map((cert) => (
              <div
                key={cert.id}
                data-cert-item
                className="flex items-start gap-4 p-4 rounded-xl border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900 hover:border-blue-200 dark:hover:border-blue-900 transition-colors"
              >
                <div className="flex-shrink-0 mt-0.5">
                  {cert.status === 'completed' ? (
                    <CheckCircle2 size={18} className="text-green-500" />
                  ) : (
                    <Clock size={18} className="text-amber-500" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-gray-900 dark:text-white">{cert.name}</p>
                  {cert.issuer && (
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{cert.issuer}</p>
                  )}
                </div>
                <span
                  className={`flex-shrink-0 inline-block px-2.5 py-0.5 rounded-full text-xs font-semibold ${
                    cert.status === 'completed'
                      ? 'bg-green-50 dark:bg-green-950/50 text-green-700 dark:text-green-400 border border-green-100 dark:border-green-900'
                      : 'bg-amber-50 dark:bg-amber-950/50 text-amber-700 dark:text-amber-400 border border-amber-100 dark:border-amber-900'
                  }`}
                >
                  {cert.status === 'completed' ? cert.year ?? 'Completed' : 'In Progress'}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Extras */}
        <div className="flex flex-col gap-6">
          {/* Languages */}
          <div data-cert-item>
            <div className="flex items-center gap-2 mb-4">
              <Languages size={16} className="text-blue-500" />
              <h3 className="text-sm font-semibold uppercase tracking-widest text-gray-500 dark:text-gray-400">
                Languages
              </h3>
            </div>
            <div className="flex flex-col gap-2">
              {extras.languages.map((lang) => (
                <div
                  key={lang.name}
                  className="flex items-center justify-between px-4 py-2.5 rounded-xl bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800"
                >
                  <span className="text-sm font-medium text-gray-900 dark:text-white">{lang.name}</span>
                  <span className="text-xs text-gray-500 dark:text-gray-400">{lang.level}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Interests */}
          <div data-cert-item>
            <div className="flex items-center gap-2 mb-4">
              <Sparkles size={16} className="text-blue-500" />
              <h3 className="text-sm font-semibold uppercase tracking-widest text-gray-500 dark:text-gray-400">
                Interests
              </h3>
            </div>
            <div className="flex flex-wrap gap-2">
              {extras.interests.map((interest) => (
                <span
                  key={interest}
                  className="px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-950/50 text-blue-700 dark:text-blue-300 text-xs font-medium border border-blue-100 dark:border-blue-900"
                >
                  {interest}
                </span>
              ))}
            </div>
          </div>

          {/* Award icon */}
          <div data-cert-item className="p-5 rounded-xl border border-gray-200 dark:border-gray-800 bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-950/30 dark:to-cyan-950/30 text-center">
            <Award size={32} className="text-blue-500 mx-auto mb-2" />
            <p className="text-xs text-gray-500 dark:text-gray-400 font-medium">
              Committed to continuous professional development in the UK construction sector
            </p>
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
}
