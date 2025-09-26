export const ABOUT_DEFAULT_SECTION = 'professional-info';

export const TECHS = [
  'HTML',
  'CSS',
  'JavaScript',
  'TypeScript',
  'React',
  'NodeJS',
  'Tailwindcss',
  'Redux',
];

export const TECH_ICON_FILES: Record<string, string> = {
  HTML: 'html.svg',
  CSS: 'css.svg',
  JavaScript: 'javascript.svg',
  TypeScript: 'typescript.svg',
  React: 'react.svg',
  NodeJS: 'nodeJS.svg',
  Tailwindcss: 'tailwindcss.svg',
  Redux: 'redux.svg',
};

export const TELEGRAM_ENDPOINT = import.meta.env
  .VITE_TELEGRAM_ENDPOINT as string;
