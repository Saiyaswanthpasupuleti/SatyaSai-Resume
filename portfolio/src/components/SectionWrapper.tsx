import React from 'react';
import { cn } from '../utils/cn';

interface SectionWrapperProps {
  id: string;
  children: React.ReactNode;
  className?: string;
  tight?: boolean;
}

export function SectionWrapper({ id, children, className, tight }: SectionWrapperProps) {
  return (
    <section id={id} className={cn('relative w-full', tight ? 'py-14 md:py-20' : 'py-20 md:py-28', className)}>
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {children}
      </div>
    </section>
  );
}
