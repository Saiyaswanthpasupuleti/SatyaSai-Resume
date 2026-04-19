import { cn } from '../utils/cn';

interface SectionHeadingProps {
  label: string;
  title: string;
  description?: string;
  className?: string;
  align?: 'left' | 'center';
}

export function SectionHeading({ label, title, description, className, align = 'left' }: SectionHeadingProps) {
  return (
    <div className={cn('mb-10 md:mb-14', align === 'center' && 'text-center', className)}>
      <span className="inline-block text-xs font-semibold uppercase tracking-[0.2em] text-blue-500 dark:text-blue-400 mb-3">
        {label}
      </span>
      <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 dark:text-white leading-tight">
        {title}
      </h2>
      {description && (
        <p className="mt-4 text-sm sm:text-base md:text-lg text-gray-500 dark:text-gray-400 max-w-2xl leading-relaxed">
          {description}
        </p>
      )}
    </div>
  );
}
