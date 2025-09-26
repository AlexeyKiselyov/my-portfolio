import React from 'react';
import clsx from 'clsx';

import styles from '../Projects.module.css';

interface ProjectTabsProps {
  filters: string[];
  isDesktop: boolean;
}

const ProjectTabs: React.FC<ProjectTabsProps> = ({ filters, isDesktop }) => {
  if (isDesktop) {
    return (
      <div
        className={clsx(
          styles.tabHeight,
          'w-full hidden lg:flex border-bot items-center'
        )}
      >
        <div className="flex items-center border-right h-full">
          {filters.map(filter => (
            <p
              key={filter}
              className="font-fira_regular text-menu-text text-sm px-3"
            >
              {filter};
            </p>
          ))}
          <img src="/icons/close.svg" alt="" className="m-3" />
        </div>
      </div>
    );
  }

  return (
    <div className={clsx(styles.tab, 'flex lg:hidden items-center')}>
      <span className="text-white"> // </span>
      <p className="font-fira_regular text-white text-sm px-3">projects</p>
      <span className="text-menu-text"> / </span>
      {filters.map(filter => (
        <p
          key={filter}
          className="font-fira_regular text-menu-text text-sm px-3"
        >
          {filter};
        </p>
      ))}
    </div>
  );
};

export default ProjectTabs;
