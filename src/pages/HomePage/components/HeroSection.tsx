import React from 'react';
import clsx from 'clsx';
import styles from '../HomePage.module.css';

interface HeroSectionProps {
  config: any; // From DevConfig
  isMobile: boolean;
  githubLink: string;
}

const HeroSection: React.FC<HeroSectionProps> = ({
  config,
  isMobile,
  githubLink,
}) => {
  return (
    <section className={styles.hero}>
      <div className={styles.head}>
        <span>Hi all, I am</span>

        <h1 className={styles.headTitle}>{config.name}</h1>

        <div className={clsx(styles.diple, 'flex')}>
          &gt;&nbsp;
          <h2
            className={clsx(
              styles.line1,
              styles.headText,
              styles.animTypewriter,
              'max-w-fit'
            )}
          >
            {config.role}
          </h2>
        </div>
      </div>

      <div className={styles.info}>
        <span className={styles.action}>// complete the game to continue</span>

        {isMobile ? (
          <span>// find my profile on Github:</span>
        ) : (
          <span>// you can also see it on my Github page</span>
        )}

        <p className={styles.code}>
          <span className={styles.identifier}>const</span>
          <span className={styles.variableName}> githubLink </span>
          <span className={styles.operator}>= </span>
          <a
            className={styles.string}
            href={githubLink}
            target="_blank"
            rel="noreferrer noopener"
          >
            {githubLink}
          </a>
        </p>
      </div>
    </section>
  );
};

export default HeroSection;
