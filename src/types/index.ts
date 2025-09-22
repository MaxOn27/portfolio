// Me section types
export interface MeData {
  personal: {
    name: string;
    title: string;
    avatar: string;
  };
  about: {
    label: string;
    description: string;
  };
}

// About section types
export interface StatItem {
  number: string;
  label: string;
}

export interface EducationItem {
  period: string;
  degree: string;
  institution: string;
  description: string;
  highlights: string[];
}

export interface PhilosophyItem {
  icon: string;
  title: string;
  description: string;
}

export interface AboutData {
  title: string;
  intro: {
    greeting: string;
    description: string;
    mission: string;
    stats: StatItem[];
  };
  education: {
    title: string;
    items: EducationItem[];
  };
  philosophy: {
    title: string;
    items: PhilosophyItem[];
  };
  journey: {
    title: string;
    paragraphs: string[];
  };
}

// Portfolio section types
export interface SkillCategory {
  name: string;
  tags: string[];
}

export interface ExperienceItem {
  period: string;
  role: string;
  company: string;
  description: string;
  highlights: string[];
}

export interface HobbyItem {
  icon: string;
  title: string;
  description: string;
}

export interface PortfolioData {
  title: string;
  skills: {
    title: string;
    categories: SkillCategory[];
  };
  experience: {
    title: string;
    items: ExperienceItem[];
  };
  hobbies: {
    title: string;
    items: HobbyItem[];
  };
}

// Contacts section types
export interface ContactLink {
  href: string;
  target: string;
  cssClass: string;
  icon: string;
  title: string;
  description: string;
}

export interface ContactsData {
  title: string;
  description: string;
  links: ContactLink[];
}