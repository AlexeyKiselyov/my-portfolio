import React from 'react';
import styles from './ProjectCard.module.css';
import clsx from 'clsx';

interface ProjectCardProps {
  project: {
    title: string;
    tech: string[];
    img: string;
    description: string;
    url: string;
    github_link: string;
  };
  index?: number;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, index }) => {
  return (
    <>
      {/* Project Title */}
      <div className="flex text-sm my-3">
        <h3 className="text-purplefy font-fira_bold mr-3">
          Project {index != null ? index + 1 : ''}
        </h3>
        <h4 className="font-fira_retina text-menu-text"> // {project.title}</h4>
      </div>

      {/* Pfoject Card */}
      <div className={clsx(styles.projectCard, 'flex flex-col flex-1')}>
        <div className={clsx(styles.window)}>
          <div className="absolute flex right-3 top-3">
            {project.tech.map(tech => (
              <img
                key={tech}
                src={`/icons/techs/filled/${tech}.svg`}
                title={tech}
                alt={tech}
                className="w-6 h-6 mx-1 hover:opacity-75"
              />
            ))}
          </div>
          <img
            className={clsx(styles.showcase)}
            src={project.img}
            alt="Project Showcase"
          />
        </div>

        <div className="p-6 border-top flex flex-col flex-1">
          <p className="text-menu-text font-fira_retina text-sm mb-5 flex-1">
            {project.description}
          </p>
          <div className="flex justify-between items-center mt-auto">
            <a
              id="view-button"
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              className="button-main text-xs"
            >
              view-project
            </a>
            <a
              id="view-github"
              href={project.github_link}
              title="View on GitHub"
              target="_blank"
              rel="noopener noreferrer"
              className="button-main text-xs"
            >
              <img src="/icons/social/github.svg" alt="GitHub" />
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProjectCard;
