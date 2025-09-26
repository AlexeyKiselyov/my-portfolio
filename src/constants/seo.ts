export const BASE_SEO_DATA = {
  title: 'Oleksii Kyselov - Full-stack Developer Portfolio',
  description:
    'Portfolio of Oleksii Kyselov, a full-stack developer with 3+ years experience. View my projects, skills, and contact information.',
  keywords: 'full-stack developer, React, Node.js, portfolio, web development',
  author: 'Oleksii Kyselov',
  viewport: 'width=device-width, initial-scale=1.0',
  charset: 'UTF-8',
};

export const STRUCTURED_DATA = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Oleksii Kyselov',
  jobTitle: 'Full-stack Developer',
  url: 'https://oleksii-kyselov.dev',
  sameAs: [
    'https://github.com/oleksiikyselov',
    'https://linkedin.com/in/oleksiikyselov',
    'https://t.me/oleksiikyselov',
  ],
  knowsAbout: [
    'JavaScript',
    'TypeScript',
    'React',
    'Node.js',
    'MongoDB',
    'HTML',
    'CSS',
    'Web Development',
  ],
  hasOccupation: {
    '@type': 'Occupation',
    name: 'Full-stack Developer',
    occupationLocation: {
      '@type': 'Country',
      name: 'Ukraine',
    },
  },
};

export const PAGE_SEO_DATA = {
  home: {
    title: 'Home | Oleksii Kyselov - Full-stack Developer',
    description:
      "Welcome to Oleksii Kyselov's portfolio. Discover my projects, skills, and experience as a full-stack developer with 3+ years in web development.",
  },
  about: {
    title: 'About Me | Oleksii Kyselov - Full-stack Developer',
    description:
      'Learn more about Oleksii Kyselov, a full-stack developer with experience in React, Node.js, and web development. View my professional background, skills, and personal info.',
  },
  projects: {
    title: 'Projects | Oleksii Kyselov - Full-stack Developer',
    description:
      "Explore Oleksii Kyselov's portfolio projects. View web applications built with React, Node.js, and modern technologies including landing pages, and more.",
  },
  contact: {
    title: 'Contact Me | Oleksii Kyselov - Full-stack Developer',
    description:
      'Get in touch with Oleksii Kyselov. Send a message, view contact information, and connect via email, phone, or social media.',
  },
  notFound: {
    title: '404 - Page Not Found | Oleksii Kyselov',
    description:
      "The page you are looking for does not exist. Return to Oleksii Kyselov's portfolio homepage.",
  },
};
