import React, { useState, useEffect } from 'react';
import useMedia from '../../hooks/useMedia';

import HeroSection from './components/HeroSection';
import GameSection from './components/GameSection';
import SEO from '../../components/SEO';

import clsx from 'clsx';
import styles from './HomePage.module.css';

import DevConfig from '../../developer.json';

const HomePage: React.FC = () => {
  const [mainAnimation, setMainAnimation] = useState(false);
  const [gameAnimation, setGameAnimation] = useState(false);

  const config = DevConfig;

  const isMobile = useMedia('(max-width: 1024px)');

  const githubLink = `${config.contacts.social.github.url}${config.contacts.social.github.user}`;

  useEffect(() => {
    setMainAnimation(true);
    setGameAnimation(true);
  }, []);

  return (
    <>
      <SEO page="home" canonical={`${window.location.origin}/`} />
      <main
        id="hello"
        className={clsx(styles.hello, mainAnimation ? 'fadeIn' : 'animHidden')}
      >
        {/* gradients */}
        <div className={styles.cssBlurryGradientBlue}></div>
        <div className={styles.cssBlurryGradientGreen}></div>

        <HeroSection
          config={config}
          isMobile={isMobile}
          githubLink={githubLink}
        />

        {!isMobile && <GameSection gameAnimation={gameAnimation} />}
      </main>
    </>
  );
};

export default HomePage;
