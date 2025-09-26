# Portfolio React

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![React](https://img.shields.io/badge/React-19.1.1-blue.svg)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8.3-blue.svg)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-7.1.2-646CFF.svg)](https://vitejs.dev/)

A modern developer portfolio built with React + TypeScript + Vite. Inspired by
terminal design with dark theme, smooth animations, and responsive interface.

## 🚀 Demo

[View Demo](https://oleksii-kyselov.dev)

## ✨ Features

- **Responsive Design**: Optimized for mobile and desktop devices
- **Smooth Animations**: Uses Lenis for smooth scrolling and auto-animate for
  transitions
- **Project Filtering**: By technologies with checkboxes
- **Dark Theme**: Terminal-style with syntax highlighting
- **SEO Optimized**: Dynamic meta (title, description, canonical), Open Graph &
  Twitter tags, structured data (JSON‑LD), robots.txt and sitemap.xml with
  auto‑updated `lastmod` for better search engine visibility
- **Fast Loading**: Optimized images and code with lazy loading for pages

## 🛠 Technologies

- **Frontend**: React 19, TypeScript, Tailwind CSS
- **Tools**: Vite, ESLint, Prettier
- **Libraries**:
  - React Router for navigation
  - SimpleBar for custom scrollbars
  - Highlight.js / React Syntax Highlighter for code highlighting
  - FormKit Auto Animate for animations
  - Lenis for smooth scrolling
  - Custom DOM-based SEO component (no react-helmet)

## 📦 Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/AlexeyKiselyov/my-portfolio.git
   cd my-portfolio
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Run the dev server:

   ```bash
   npm run dev
   ```

4. Open [http://localhost:5173](http://localhost:5173) in your browser.

## 🏗 Build

For production build:

```bash
npm run build
```

For preview:

```bash
npm run preview
```

## 📁 Project Structure

```
portfolio-react/
├── public/                 # Static files
│   ├── icons/             # Icons
│   └── images/            # Images
├── src/
│   ├── assets/            # Styles and fonts
│   ├── components/        # Reusable components
│   │   ├── SEO/          # SEO component (DOM-based meta management)
│   │   └── ...
│   ├── constants/         # Constants and SEO data
│   ├── hooks/             # Custom hooks
│   ├── pages/             # Application pages
│   ├── types/             # TypeScript types
│   ├── utils/             # Utilities
│   ├── App.tsx            # Main component
│   ├── developer.json     # Portfolio data
│   └── main.tsx           # Entry point
├── .github/               # GitHub Actions and instructions
├── eslint.config.js       # ESLint config
├── tsconfig.json          # TypeScript config
├── vite.config.ts         # Vite config
└── README.md
```

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file
for details.

## 🙏 Credits

This project is based on the original design and code from a public repository.
It was originally developed in Vue.js and has been completely rewritten and
migrated to React by me. Many improvements were made, problematic areas were
fixed, and the codebase was optimized for better performance and
maintainability.

- Designer: [@darelova](https://www.behance.net/darelova)
- Developer: [@alexdeploy](https://github.com/alexdeploy)
- Original Repository:
  [link](https://github.com/alexdeploy/developer-portfolio-v2)

If you copy or fork this project, please credit me as the original developer:
**Oleksii Kyselov** ([@AlexeyKiselyov](https://github.com/AlexeyKiselyov)).
