import { Link, Mail } from 'lucide-react';
import { contactInfo, personalInfo } from '../data/resumeData';

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
            <span>© {year}</span>
            <span className="font-semibold text-gray-900 dark:text-white">{personalInfo.name}</span>
          </div>

          <div className="flex items-center gap-1">
            <a
              href={`mailto:${contactInfo.email}`}
              aria-label="Email"
              className="p-2 rounded-lg text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-all"
            >
              <Mail size={16} />
            </a>
            <a
              href={`https://${contactInfo.linkedin}`}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="p-2 rounded-lg text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-all"
            >
              <Link size={16} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
