// Unified type definitions for developer.json
export type SectionInfo = {
  title: string;
  description: string;
  files?: Record<string, string>;
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
  author: { login: string; avatarUrl: string; profileUrl: string };
  description?: string;
};

export type DeveloperConfig = {
  name: string;
  logo_name: string;
  role: string;
  about: About;
  contacts: Contacts;
  snippets?: Record<string, Snippet>;
  projects: Project[];
};

export type Config = DeveloperConfig;
