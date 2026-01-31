// Unified type definitions for developer.json
export type JobConfig = {
  role: string;
  techStack?: string;
  company: string;
  period: string;
  location: string;
  description: string[];
};

export type ExperienceConfig = {
  intro?: string;
  jobs: JobConfig[];
};

export type SkillGroup = {
  title: string;
  items: string[];
};

export type SkillConfig = {
  title?: string;
  groups: SkillGroup[];
};

export type TextConfig = {
  paragraphs: string[];
};

export type LanguageItem = {
  language: string;
  level: string;
};

export type LanguageConfig = {
  languages: LanguageItem[];
};

export type Certificate = {
  name: string;
  url: string;
};

export type EducationItem = {
  institution: string;
  period?: string; // Optional for some certificates
  location?: string;
  degree: string;
  certificates?: Certificate[]; // For specific certificates linked to this item
  certificateLink?: string; // Quick link for the degree itself
};

export type EducationConfig = {
  list: EducationItem[];
};

export type LinkConfig = {
  text: string;
  url: string;
};

export type FileConfig = {
  description?: string;
  link?: LinkConfig;
};

// Union of all structured types
export type StructuredContent =
  | ExperienceConfig
  | SkillConfig
  | TextConfig
  | LanguageConfig
  | EducationConfig
  | FileConfig;

export type SectionInfo = {
  title: string;
  description: string | StructuredContent;
  files?: Record<string, string | StructuredContent>;
};

export type Section = {
  title: string;
  icon: string;
  info: Record<string, SectionInfo>;
};

export type About = {
  sections: {
    'professional-info': Section;
    'personal-info': Section;
    'hobbies-info': Section;
    [k: string]: Section;
  };
};

export type DirectContactSources = {
  email?: string;
  phone?: string;
  [k: string]: string | undefined;
};

export type DirectContactsBlock = {
  title: string;
  sources: DirectContactSources;
};

export type SocialContact = {
  title: string;
  url: string;
  user: string;
};

export type SocialContactsGroup = {
  title: string;
  sources: Record<string, SocialContact>;
};

export type Contacts = {
  direct: DirectContactsBlock;
  social: Record<string, SocialContact>;
  find_me_also_in: SocialContactsGroup;
};

export type Project = {
  title: string;
  description: string;
  img: string;
  tech: string[];
  url: string;
  github_link: string;
};

export type Snippet = {
  title: string;
  language: string;
  code: string;
  createdAt: string;
  author: {
    login: string;
    avatarUrl: string;
    profileUrl: string;
  };
  description: string;
};

export type DeveloperConfig = {
  name: string;
  logo_name: string;
  role: string;
  about: About;
  contacts: Contacts;
  snippets: Record<string, Snippet>;
  projects: Project[];
};
