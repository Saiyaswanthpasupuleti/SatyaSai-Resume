import { useEffect, useRef, useState } from 'react';
import { gsap } from '../utils/gsapSetup';

import { Mail, Phone, Link, MapPin, Send, ArrowUpRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { SectionWrapper } from '../components/SectionWrapper';
import { SectionHeading } from '../components/SectionHeading';
import { contactInfo } from '../data/resumeData';


interface FormState {
  name: string;
  email: string;
  subject: string;
  message: string;
}

const CONTACT_LINKS = [
  {
    icon: Mail,
    label: 'Email',
    value: contactInfo.email,
    href: `mailto:${contactInfo.email}`,
  },
  {
    icon: Phone,
    label: 'Phone',
    value: contactInfo.phone,
    href: `tel:${contactInfo.phone}`,
  },
  {
    icon: Link,
    label: 'LinkedIn',
    value: contactInfo.linkedin,
    href: `https://${contactInfo.linkedin}`,
  },
  {
    icon: MapPin,
    label: 'Location',
    value: contactInfo.location,
    href: 'https://maps.google.com/?q=Coventry,UK',
  },
];

export function Contact() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [form, setForm] = useState<FormState>({ name: '', email: '', subject: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '[data-contact-item]',
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 78%', once: true },
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // UI-only form; in production, integrate with email service (Resend, EmailJS, etc.)
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 4000);
    setForm({ name: '', email: '', subject: '', message: '' });
  };

  const inputClass =
    'w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-600 text-sm focus:outline-none focus:border-blue-500 dark:focus:border-blue-400 focus:ring-1 focus:ring-blue-500/30 transition-all';

  return (
    <SectionWrapper id="contact" className="bg-gray-50 dark:bg-gray-900/50">
      <SectionHeading
        label="Get In Touch"
        title="Let's Connect"
        description="Open to BIM, construction project management, and site engineering opportunities across the UK. Feel free to reach out."
      />

      <div ref={sectionRef} className="grid grid-cols-1 lg:grid-cols-5 gap-12">
        {/* Contact info */}
        <div className="lg:col-span-2 flex flex-col gap-4">
          {CONTACT_LINKS.map(({ icon: Icon, label, value, href }) => (
            <motion.a
              key={label}
              data-contact-item
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ x: 4 }}
              transition={{ duration: 0.2 }}
              className="flex items-center gap-4 p-4 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 hover:border-blue-200 dark:hover:border-blue-900 group transition-colors"
            >
              <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-950/50 flex items-center justify-center flex-shrink-0">
                <Icon size={17} className="text-blue-600 dark:text-blue-400" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs text-gray-400 dark:text-gray-500 font-medium">{label}</p>
                <p className="text-sm font-medium text-gray-900 dark:text-white truncate group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  {value}
                </p>
              </div>
              <ArrowUpRight size={14} className="text-gray-300 dark:text-gray-700 group-hover:text-blue-500 flex-shrink-0 transition-colors" />
            </motion.a>
          ))}
        </div>

        {/* Contact form */}
        <div data-contact-item className="lg:col-span-3 rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-6 md:p-8">
          <h3 className="text-base font-semibold text-gray-900 dark:text-white mb-6">Send a message</h3>

          {submitted ? (
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="flex flex-col items-center justify-center gap-3 py-12 text-center"
            >
              <div className="w-14 h-14 rounded-full bg-green-100 dark:bg-green-950/50 flex items-center justify-center">
                <Send size={22} className="text-green-600 dark:text-green-400" />
              </div>
              <p className="font-semibold text-gray-900 dark:text-white">Message sent!</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">Thanks for reaching out. I'll get back to you soon.</p>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <input
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Your name"
                  required
                  className={inputClass}
                />
                <input
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="Your email"
                  required
                  className={inputClass}
                />
              </div>
              <input
                name="subject"
                value={form.subject}
                onChange={handleChange}
                placeholder="Subject"
                required
                className={inputClass}
              />
              <textarea
                name="message"
                value={form.message}
                onChange={handleChange}
                placeholder="Your message..."
                required
                rows={5}
                className={`${inputClass} resize-none`}
              />
              <motion.button
                type="submit"
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold shadow-lg shadow-blue-600/25 hover:shadow-blue-600/40 transition-all"
              >
                <Send size={15} />
                Send Message
              </motion.button>
            </form>
          )}
        </div>
      </div>
    </SectionWrapper>
  );
}
