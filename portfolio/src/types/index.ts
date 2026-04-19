export interface Skill {
  name: string;
  level: number;
  category: 'bim' | 'sustainability' | 'site' | 'tools';
}

export interface Education {
  id: string;
  degree: string;
  institution: string;
  location: string;
  period: string;
  description: string;
  highlights?: string[];
}

export interface Experience {
  id: string;
  role: string;
  company: string;
  location: string;
  period: string;
  type: string;
  achievements: string[];
}

export interface Project {
  id: string;
  title: string;
  description: string;
  tools: string[];
  category: string;
  highlights?: string[];
}

export interface Certification {
  id: string;
  name: string;
  issuer?: string;
  status: 'completed' | 'in-progress';
  year?: string;
}

export interface ContactInfo {
  email: string;
  phone: string;
  linkedin: string;
  location: string;
}
