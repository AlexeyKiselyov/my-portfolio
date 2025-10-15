import React from 'react';
import { NavLink } from 'react-router-dom';
import clsx from 'clsx';

import GithubCorner from '../GithubCorner/GithubCorner';
import analytics from '../../utils/analytics';

import type { DeveloperConfig } from '../../types/developer';

import styles from './AppHeader.module.css';

import configData from '../../developer.json';

const config: DeveloperConfig = configData;

const AppHeader: React.FC = () => {
  const githubUrl =
    config.contacts.social.github.url + config.contacts.social.github.user;

  return (
    <header
      id="navbar"
      className={clsx(styles.navbar, 'w-full', 'hidden', 'lg:flex', 'flex-col')}
    >
      <nav className="w-full flex justify-between border-bot">
        <GithubCorner url={githubUrl} />

        <div className="flex">
          <NavLink id="nav-logo" className={styles.navLogo} to="/">
            <img
              className="rounded-[50%] mr-3 w-8 h-8 object-cover"
              alt="User avatar"
              src="/images/avatar/avatar_logo.jpg"
              width="32"
              height="32"
              loading="lazy"
            />
            {config.logo_name}
          </NavLink>

          <NavLink
            id="nav-link"
            className={({ isActive }) =>
              clsx(styles.navLink, { [styles.active]: isActive })
            }
            to="/"
            onClick={() => analytics.navigation.menuItemClick('hello')}
          >
            _hello
          </NavLink>

          <NavLink
            id="nav-link"
            className={({ isActive }) =>
              clsx(styles.navLink, { [styles.active]: isActive })
            }
            to="/about-me"
            onClick={() => analytics.navigation.menuItemClick('about-me')}
          >
            _about-me
          </NavLink>

          <NavLink
            id="nav-link"
            className={({ isActive }) =>
              clsx(styles.navLink, { [styles.active]: isActive })
            }
            to="/projects"
            onClick={() => analytics.navigation.menuItemClick('projects')}
          >
            _projects
          </NavLink>
        </div>

        <NavLink
          id="nav-link-contact"
          className={({ isActive }) =>
            clsx(styles.navLinkContact, { [styles.active]: isActive })
          }
          to="/contact-me"
          onClick={() => analytics.navigation.menuItemClick('contact-me')}
        >
          _contact-me
        </NavLink>
      </nav>
    </header>
  );
};

export default AppHeader;
