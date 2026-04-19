import { useDarkMode } from './hooks/useDarkMode';
import { useActiveSection } from './hooks/useActiveSection';
import { Navbar } from './components/Navbar';
import { ScrollProgress } from './components/ScrollProgress';
import { Footer } from './components/Footer';
import { Hero } from './sections/Hero';
import { About } from './sections/About';
import { Skills } from './sections/Skills';
import { Education } from './sections/Education';
import { Experience } from './sections/Experience';
import { Projects } from './sections/Projects';
import { Certifications } from './sections/Certifications';
import { Contact } from './sections/Contact';

const SECTION_IDS = ['hero', 'about', 'skills', 'education', 'experience', 'projects', 'certifications', 'contact'];

export default function App() {
  const { isDark, toggle } = useDarkMode();
  const activeSection = useActiveSection(SECTION_IDS);

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 text-gray-900 dark:text-white font-sora">
      <ScrollProgress />
      <Navbar isDark={isDark} onToggleDark={toggle} activeSection={activeSection} />

      <main>
        <Hero isDark={isDark} />
        <About />
        <Skills />
        <Education />
        <Experience />
        <Projects />
        <Certifications />
        <Contact />
      </main>

      <Footer />
    </div>
  );
}
