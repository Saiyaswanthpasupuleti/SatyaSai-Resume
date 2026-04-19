import type { Skill, Education, Experience, Project, Certification, ContactInfo } from '../types';

export const personalInfo = {
  name: 'Satyasai Sypu',
  title: 'BIM / Revit Enthusiast',
  tagline: 'Civil Engineering Graduate | BIM Specialist | Construction Tech Innovator',
  summary:
    'Civil Engineering graduate with hands-on BIM/Revit experience pursuing an MSc in Construction Project Management with BIM at Coventry University. Passionate about integrating digital technologies into construction workflows to drive efficiency, sustainability, and precision. Experienced in site engineering, structural design, and project coordination across residential and infrastructure projects.',
  location: 'Coventry, United Kingdom',
  available: true,
};

export const contactInfo: ContactInfo = {
  email: 'satyasaisypu@gmail.com',
  phone: '+44 7XXX XXXXXX',
  linkedin: 'linkedin.com/in/satyasaisypu',
  location: 'Coventry, UK',
};

export const stats = [
  { label: 'Years Experience', value: 2 },
  { label: 'Projects Delivered', value: 8 },
  { label: 'BIM Skills', value: 12 },
  { label: 'Certifications', value: 4 },
];

export const skills: Skill[] = [
  // BIM & Design
  { name: 'Autodesk Revit', level: 90, category: 'bim' },
  { name: 'BIM 360 / ACC', level: 80, category: 'bim' },
  { name: 'AutoCAD', level: 88, category: 'bim' },
  { name: 'Navisworks', level: 75, category: 'bim' },
  { name: 'Civil 3D', level: 72, category: 'bim' },
  { name: 'SketchUp', level: 78, category: 'bim' },
  // Sustainability
  { name: 'LEED Principles', level: 70, category: 'sustainability' },
  { name: 'Green Building Standards', level: 68, category: 'sustainability' },
  { name: 'Energy Modelling', level: 65, category: 'sustainability' },
  // Site Management
  { name: 'Project Scheduling', level: 80, category: 'site' },
  { name: 'Site Coordination', level: 85, category: 'site' },
  { name: 'Quality Control', level: 78, category: 'site' },
  { name: 'Health & Safety', level: 82, category: 'site' },
  // Tools
  { name: 'MS Project', level: 75, category: 'tools' },
  { name: 'Primavera P6', level: 65, category: 'tools' },
  { name: 'Microsoft Office', level: 90, category: 'tools' },
];

export const skillCategories = {
  bim: { label: 'BIM & Design', icon: 'Layers', color: 'from-blue-500 to-cyan-500' },
  sustainability: { label: 'Sustainability', icon: 'Leaf', color: 'from-green-500 to-emerald-500' },
  site: { label: 'Site Management', icon: 'HardHat', color: 'from-orange-500 to-amber-500' },
  tools: { label: 'Tools & Software', icon: 'Wrench', color: 'from-purple-500 to-violet-500' },
};

export const education: Education[] = [
  {
    id: 'edu-1',
    degree: 'MSc Construction Project Management with BIM',
    institution: 'Coventry University',
    location: 'Coventry, United Kingdom',
    period: '2024 – Present',
    description:
      'Specialising in BIM-integrated project management methodologies, digital construction workflows, and sustainable development practices within the UK construction industry.',
    highlights: [
      'BIM Level 2 & Level 3 protocols',
      'Construction law and contracts (NEC/JCT)',
      'Sustainable construction practices',
      'Advanced project scheduling & risk management',
    ],
  },
  {
    id: 'edu-2',
    degree: 'Diploma in AutoCAD & BIM Technologies',
    institution: 'CAD CAM Institute',
    location: 'India',
    period: '2022 – 2023',
    description:
      'Intensive training in computer-aided design tools and Building Information Modelling technologies used in modern construction and infrastructure projects.',
    highlights: [
      'Autodesk Revit Architecture & Structure',
      'AutoCAD 2D & 3D modelling',
      'BIM workflow implementation',
      'Construction documentation',
    ],
  },
  {
    id: 'edu-3',
    degree: 'B.Tech in Civil Engineering',
    institution: 'BIHER (Bharath Institute of Higher Education & Research)',
    location: 'Chennai, India',
    period: '2018 – 2022',
    description:
      'Comprehensive civil engineering programme covering structural analysis, geotechnical engineering, transportation, environmental engineering, and construction management.',
    highlights: [
      'Structural design & analysis',
      'Geotechnical engineering',
      'Construction materials & technology',
      'Transportation & highway engineering',
    ],
  },
];

export const experience: Experience[] = [
  {
    id: 'exp-1',
    role: 'BIM/Revit Intern',
    company: 'Construction Tech Firm',
    location: 'Chennai, India',
    period: 'Jan 2023 – Jun 2023',
    type: 'Internship',
    achievements: [
      'Developed and coordinated BIM models for residential and commercial projects using Autodesk Revit',
      'Collaborated with multidisciplinary teams to resolve design clashes via Navisworks clash detection',
      'Produced detailed construction documentation including floor plans, sections, elevations, and schedules',
      'Assisted in implementing BIM 360 for real-time project data management and team collaboration',
      'Reduced design revision cycles by 20% through proactive model coordination',
    ],
  },
  {
    id: 'exp-2',
    role: 'Site Engineer Intern',
    company: 'Infrastructure Development Company',
    location: 'Andhra Pradesh, India',
    period: 'Jun 2021 – Dec 2021',
    type: 'Internship',
    achievements: [
      'Supervised day-to-day site operations for a multi-storey residential project worth ₹2.5 Crore',
      'Ensured compliance with design specifications, quality standards, and safety regulations',
      'Coordinated with contractors and subcontractors to maintain project schedule and cost targets',
      'Conducted material quantity surveys and prepared BOQ (Bill of Quantities) reports',
      'Maintained site diary, progress reports, and daily inspection records',
    ],
  },
];

export const projects: Project[] = [
  {
    id: 'proj-1',
    title: 'BIM-Based Residential Complex Model',
    description:
      'Developed a comprehensive multi-storey residential BIM model incorporating architectural, structural, and MEP disciplines. The model facilitated clash detection, quantity take-offs, and construction sequencing.',
    tools: ['Autodesk Revit', 'Navisworks', 'BIM 360'],
    category: 'BIM Modelling',
    highlights: [
      'Full LOD 300 model for 6-storey residential block',
      'Clash-free coordination across all disciplines',
      'Automated quantity schedules reducing estimation time by 35%',
    ],
  },
  {
    id: 'proj-2',
    title: 'Sustainable Infrastructure Design Study',
    description:
      'Academic research project analysing sustainable design strategies for urban infrastructure, incorporating LEED principles and green building standards within the UK planning framework.',
    tools: ['AutoCAD', 'SketchUp', 'MS Excel'],
    category: 'Sustainability',
    highlights: [
      'Carbon footprint analysis and reduction strategies',
      'Life cycle cost assessment',
      'Integration with UK building regulations',
    ],
  },
  {
    id: 'proj-3',
    title: 'Highway Realignment & Drainage Design',
    description:
      'Final year B.Tech project involving the geometric design and drainage planning for a 5km highway realignment using Civil 3D and AutoCAD, following IRC standards.',
    tools: ['AutoCAD', 'Civil 3D', 'MS Excel'],
    category: 'Infrastructure',
    highlights: [
      'Horizontal and vertical alignment design',
      'Drainage catchment calculations',
      'Cross-section and earthwork volume estimation',
    ],
  },
  {
    id: 'proj-4',
    title: 'Construction Project Schedule & Risk Register',
    description:
      'MSc module project developing a comprehensive programme for a £10M commercial development using MS Project, including risk identification, assessment, and mitigation strategies.',
    tools: ['MS Project', 'Primavera P6', 'MS Excel'],
    category: 'Project Management',
    highlights: [
      'Critical path analysis and schedule optimisation',
      'Monte Carlo risk simulation',
      'Resource levelling and cost baseline',
    ],
  },
];

export const certifications: Certification[] = [
  {
    id: 'cert-1',
    name: 'CSCS Card (Construction Skills Certification Scheme)',
    issuer: 'CITB',
    status: 'in-progress',
  },
  {
    id: 'cert-2',
    name: 'Autodesk Certified User – Revit',
    issuer: 'Autodesk',
    status: 'completed',
    year: '2023',
  },
  {
    id: 'cert-3',
    name: 'AutoCAD Professional Certificate',
    issuer: 'CAD CAM Institute',
    status: 'completed',
    year: '2023',
  },
  {
    id: 'cert-4',
    name: 'BIM Foundation Certificate',
    issuer: 'buildingSMART',
    status: 'completed',
    year: '2022',
  },
];

export const extras = {
  languages: [
    { name: 'English', level: 'Fluent' },
    { name: 'Telugu', level: 'Native' },
    { name: 'Hindi', level: 'Conversational' },
  ],
  drivingLicense: 'Full UK Driving Licence (in progress)',
  interests: ['Digital Construction', 'Smart Cities', 'Sustainable Architecture', 'Technology Innovation'],
};
