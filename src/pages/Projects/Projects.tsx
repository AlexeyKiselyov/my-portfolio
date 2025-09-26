import React, { useEffect, useState } from 'react';
import { useAutoAnimate } from '@formkit/auto-animate/react';

import useSmoothScroll from '../../hooks/useSmoothScroll';
import useMedia from '../../hooks/useMedia';

import FilterMenu from './components/FilterMenu';
import ProjectList from './components/ProjectList';
import ProjectTabs from './components/ProjectTabs';
import SEO from '../../components/SEO';

import type { Project } from '../../types/developer';
import DevConfig from '../../developer.json';

const Projects: React.FC = () => {
  const config = DevConfig;

  const [filters, setFilters] = useState<string[]>(['all']);
  const [showFilters, setShowFilters] = useState(true);
  const [projects, setProjects] = useState<Project[]>(
    config.projects as Project[]
  );
  const [animation, setAnimation] = useState(false);

  const [animationParent] = useAutoAnimate();

  const isDesktop = useMedia('(min-width: 1024px)');

  // Lenis + SimpleBar refs
  const filtersSBRef = useSmoothScroll({
    enabled: showFilters && isDesktop,
    lerp: 0.1,
    duration: 1.2,
  });
  const projectsSBRef = useSmoothScroll({
    enabled: true && isDesktop,
    lerp: 0.1,
    duration: 1.2,
  });

  const filterProjectsBy = (filters: string[]): Project[] => {
    return (config.projects as Project[]).filter(project =>
      filters.some(filter => project.tech.includes(filter))
    );
  };

  useEffect(() => {
    if (filters[0] === 'all') {
      setProjects(config.projects);
    } else {
      setProjects(filterProjectsBy(filters));
    }
    setAnimation(true);
  }, [filters]);

  return (
    <>
      <SEO page="projects" canonical={`${window.location.origin}/projects`} />
      <main className="flex flex-col flex-auto lg:flex-row overflow-hidden">
        {/* Mobile Page Title */}
        <div id="mobile-page-title">
          <h2>_projects</h2>
        </div>

        <FilterMenu
          filters={filters}
          setFilters={setFilters}
          showFilters={showFilters}
          setShowFilters={setShowFilters}
          filtersSBRef={filtersSBRef}
        />

        {/* Content */}
        <div className="flex flex-col w-full overflow-hidden">
          <ProjectTabs filters={filters} isDesktop={isDesktop} />

          <ProjectList
            projects={projects}
            animation={animation}
            animationParent={animationParent}
            isDesktop={isDesktop}
            projectsSBRef={projectsSBRef}
          />
        </div>
      </main>
    </>
  );
};

export default Projects;
