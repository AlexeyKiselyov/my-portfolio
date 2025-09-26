import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import useGlobalSmoothScroll from './hooks/useGlobalSmoothScroll';
import useMedia from './hooks/useMedia';

import AppHeader from './components/AppHeader/AppHeader';
import AppFooter from './components/AppFooter/AppFooter';
import MobileMenu from './components/MobileMenu/MobileMenu';
import PageLoader from './components/PageLoader/PageLoader';
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary';

const HomePage = lazy(() => import('./pages/HomePage/HomePage'));
const AboutMePage = lazy(() => import('./pages/AboutMe/AboutMePage'));
const Projects = lazy(() => import('./pages/Projects/Projects'));
const ContactMe = lazy(() => import('./pages/ContactMe/ContactMe'));
const NotFound = lazy(() => import('./pages/NotFound/NotFound'));

const App: React.FC = () => {
  const isSmall = useMedia('(max-width: 1024px)');
  useGlobalSmoothScroll({ enabled: isSmall, lerp: 0.08, duration: 1.2 });

  return (
    <Router>
      <MobileMenu />
      <AppHeader />

      <ErrorBoundary>
        <Suspense fallback={<PageLoader />}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/about-me" element={<AboutMePage />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/contact-me" element={<ContactMe />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </ErrorBoundary>

      <AppFooter />
    </Router>
  );
};

export default App;
