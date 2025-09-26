import React from 'react';
import SimpleBar from 'simplebar-react';
import clsx from 'clsx';

import styles from '../Projects.module.css';

import { TECHS, TECH_ICON_FILES } from '../../../constants';

interface FilterMenuProps {
  filters: string[];
  setFilters: React.Dispatch<React.SetStateAction<string[]>>;
  showFilters: boolean;
  setShowFilters: React.Dispatch<React.SetStateAction<boolean>>;
  filtersSBRef: (instance: any) => void;
}

const FilterMenu: React.FC<FilterMenuProps> = ({
  filters,
  setFilters,
  showFilters,
  setShowFilters,
  filtersSBRef,
}) => {
  const handleFilterChange = (tech: string, checked: boolean) => {
    if (checked) {
      setFilters(prevFilters => {
        const updatedFilters = prevFilters.filter(item => item !== 'all');
        return [...updatedFilters, tech];
      });
    } else {
      setFilters(prevFilters => {
        const updatedFilters = prevFilters.filter(item => item !== tech);
        return updatedFilters.length === 0 ? ['all'] : updatedFilters;
      });
    }
  };

  return (
    <>
      {/* Section Title (Mobile) */}
      <div
        id="section-content-title"
        className="flex lg:hidden"
        onClick={() => setShowFilters(!showFilters)}
      >
        <img
          className={`section-arrow ${showFilters ? 'rotate-90' : ''}`}
          src="/icons/arrow.svg"
          alt="Toggle Filters"
        />
        <span className="font-fira_regular text-white text-sm">projects</span>
      </div>

      {/* Filter Menu */}
      {showFilters && (
        <div
          id="filter-menu"
          className="w-full flex-col border-right font-fira_regular text-menu-text lg:flex"
        >
          <div
            id="section-content-title"
            className="hidden lg:flex items-center min-w-full"
          >
            <img
              id="section-arrow-menu"
              src="/icons/arrow.svg"
              alt=""
              className="section-arrow mx-3"
            />
            <p className="font-fira_regular text-white text-sm">projects</p>
          </div>

          <SimpleBar
            ref={filtersSBRef}
            className="w-full h-full max-h-full scroll-bar"
          >
            <nav className={styles.filters}>
              {TECHS.map(tech => {
                const checked = filters.includes(tech);
                return (
                  <div key={tech} className="flex items-center py-2">
                    <input
                      type="checkbox"
                      id={tech}
                      checked={checked}
                      onChange={e => handleFilterChange(tech, e.target.checked)}
                      className={clsx(styles.checkbox, {
                        [styles.checkboxChecked]: checked,
                      })}
                    />
                    <img
                      src={`/icons/techs/${
                        TECH_ICON_FILES[tech] || tech.toLowerCase() + '.svg'
                      }`}
                      alt={tech}
                      className={clsx(styles.techIcon, 'w-5 h-5 mx-4', {
                        [styles.techIconActive]: checked,
                      })}
                      onError={e => {
                        (e.currentTarget as HTMLImageElement).style.visibility =
                          'hidden';
                      }}
                    />
                    <label
                      htmlFor={tech}
                      className={clsx({ [styles.titleTechActive]: checked })}
                    >
                      {tech}
                    </label>
                  </div>
                );
              })}
            </nav>
          </SimpleBar>
        </div>
      )}
    </>
  );
};

export default FilterMenu;
