import React from 'react';
import SimpleBar from 'simplebar-react';
import clsx from 'clsx';

import styles from '../Projects.module.css';

import ProjectCard from './ProjectCard';
import type { Project } from '../../../types/developer';

interface ProjectListProps {
  projects: Project[];
  animation: boolean;
  animationParent: (instance: any) => void;
  isDesktop: boolean;
  projectsSBRef: (instance: any) => void;
}

const ProjectList: React.FC<ProjectListProps> = ({
  projects,
  animation,
  animationParent,
  isDesktop,
  projectsSBRef,
}) => {
  if (projects.length === 0) {
    return (
      <div
        ref={animationParent}
        className={clsx(styles.projectsCase, 'max-w-full lg:self-center', {
          fadeUp: animation,
          animHidden: !animation,
        })}
      >
        <div className="flex-col font-fira_retina text-menu-text my-5 h-full justify-center items-center">
          <span className="flex justify-center text-4xl pb-3">X__X</span>
          <span className="text-white flex justify-center text-xl">
            No matching projects
          </span>
          <span className="flex justify-center">for these technologies</span>
        </div>
      </div>
    );
  }

  if (isDesktop) {
    return (
      <SimpleBar
        ref={projectsSBRef}
        className="w-full h-full max-h-full scroll-bar"
      >
        <ul
          ref={animationParent}
          className={clsx(
            styles.projectsCase,
            'max-w-full lg:self-center grid grid-cols-1 lg:grid-cols-2 auto-rows-max gap-6 justify-items-center items-stretch content-start',
            {
              fadeUp: animation,
              animHidden: !animation,
            }
          )}
        >
          {projects.map((project, index) => (
            <li key={project.title + index} className="flex flex-col">
              <ProjectCard project={project} index={index} />
            </li>
          ))}
        </ul>
      </SimpleBar>
    );
  }

  return (
    <div className="w-full">
      <ul
        className={clsx(
          styles.projectsCase,
          'max-w-full grid grid-cols-1 auto-rows-max gap-6 justify-items-center items-stretch content-start',
          {
            fadeUp: animation,
            animHidden: !animation,
          }
        )}
      >
        {projects.map((project, index) => (
          <li key={project.title + index} className="flex flex-col">
            <ProjectCard project={project} index={index} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProjectList;
