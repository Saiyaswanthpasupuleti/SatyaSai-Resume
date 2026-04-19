import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '../utils/cn';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  padding?: 'sm' | 'md' | 'lg';
}

export function Card({ children, className, hover = true, padding = 'md' }: CardProps) {
  const paddings = { sm: 'p-4', md: 'p-6', lg: 'p-8' };

  return (
    <motion.div
      whileHover={hover ? { y: -4 } : undefined}
      transition={{ duration: 0.2, ease: 'easeOut' }}
      className={cn(
        'rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900',
        'shadow-sm hover:shadow-md dark:shadow-none dark:hover:shadow-none',
        'transition-shadow duration-200',
        paddings[padding],
        className
      )}
    >
      {children}
    </motion.div>
  );
}
