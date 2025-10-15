import React from 'react';

import clsx from 'clsx';
import styles from './AppFooter.module.css';

import config from '../../developer.json';
import analytics from '../../utils/analytics';

const AppFooter: React.FC = () => {
  const social = config.contacts.social;
  const githubUser = social.github.user;
  const githubLink = `${social.github.url}${githubUser}`;
  const linkedinLink = `${social.linkedin.url}${social.linkedin.user}`;
  const telegramLink = `${social.telegram.url}${social.telegram.user}`;

  return (
    <footer
      className={clsx(
        'flex justify-between border-top text-menu-text font-fira_retina',
        styles.footer
      )}
    >
      {/* Social icons */}
      <div className="flex justify-between max-md:w-full">
        <span
          className={clsx(
            'h-full flex justify-center items-center px-5 border-border border-r-1 max-md:border-r-0'
          )}
        >
          find me in:
        </span>
        <div id="social-icons" className={clsx(styles.socialIcons, 'flex')}>
          <a
            href={linkedinLink}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => analytics.social.linkClick('linkedin')}
            className={clsx(
              'flex justify-center items-center',
              styles.socialIcon
            )}
          >
            <img src="/icons/social/linkedin_icon.svg" alt="linkedin" />
          </a>
          <a
            href={telegramLink}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => analytics.social.linkClick('telegram')}
            className={clsx(
              'flex justify-center items-center',
              styles.socialIcon
            )}
          >
            <img src="/icons/social/telegram-icon.svg" alt="telegram" />
          </a>
          <a
            href={githubLink}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => analytics.social.linkClick('github')}
            className={clsx(
              'flex md:hidden justify-center items-center',
              styles.socialIcon
            )}
          >
            <img src="/icons/social/github.svg" alt="github" />
          </a>
        </div>
      </div>

      {/* GitHub user (desktop) */}
      <a
        href={githubLink}
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => analytics.social.linkClick('github')}
        className="hidden md:inline-flex items-center px-5 border-left"
      >
        @{githubUser}
        <img src="/icons/social/github.svg" alt="github" />
      </a>
    </footer>
  );
};

export default AppFooter;
