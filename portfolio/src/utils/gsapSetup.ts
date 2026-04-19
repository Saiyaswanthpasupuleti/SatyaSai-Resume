import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// Global performance settings
gsap.config({ force3D: true, nullTargetWarn: false });
gsap.defaults({ ease: 'power3.out', duration: 0.8 });

// Refresh ScrollTrigger after fonts/images load
window.addEventListener('load', () => ScrollTrigger.refresh());

export { gsap, ScrollTrigger };
