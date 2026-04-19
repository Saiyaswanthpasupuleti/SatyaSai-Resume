import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '../utils/cn';

interface ButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  href?: string;
  onClick?: () => void;
  className?: string;
  icon?: React.ReactNode;
  download?: boolean;
}

export function Button({ children, variant = 'primary', size = 'md', href, onClick, className, icon, download }: ButtonProps) {
  const base = 'inline-flex items-center gap-2 font-semibold rounded-2xl transition-all duration-200 cursor-pointer select-none';

  const variants = {
    primary:
      'bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-600/25 hover:shadow-xl hover:shadow-blue-600/40',
    secondary:
      'bg-transparent border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:border-blue-500 dark:hover:border-blue-400 hover:text-blue-600 dark:hover:text-blue-400',
    ghost:
      'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700',
  };

  const sizes = { sm: 'px-4 py-2 text-sm', md: 'px-6 py-3 text-sm', lg: 'px-7 py-3.5 text-sm sm:text-base' };

  const cls = cn(base, variants[variant], sizes[size], className);
  const motionProps = { whileHover: { scale: 1.02 }, whileTap: { scale: 0.98 } };

  if (href) {
    return (
      <motion.a href={href} className={cls} target={download ? '_self' : '_blank'}
        rel="noopener noreferrer" download={download} {...motionProps}>
        {icon && <span className="flex-shrink-0">{icon}</span>}
        {children}
      </motion.a>
    );
  }

  return (
    <motion.button onClick={onClick} className={cls} {...motionProps}>
      {icon && <span className="flex-shrink-0">{icon}</span>}
      {children}
    </motion.button>
  );
}
