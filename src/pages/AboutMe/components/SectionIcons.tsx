import React from 'react';
import clsx from 'clsx';

import styles from '../AboutMePage.module.css';

import type { Section } from '../../../types/developer';

interface Props {
  sections: Record<string, Section>;
  activeId: string;
  onSelect: (sectionId: string) => void;
}

const SectionIcons: React.FC<Props> = ({ sections, activeId, onSelect }) => {
  return (
    <div
      id="sections"
      className={styles.sections}
      role="tablist"
      aria-orientation="vertical"
    >
      {Object.entries(sections).map(([id, section]) => {
        const active = id === activeId;
        return (
          <button
            key={id}
            id={`section-icon-${id}`}
            role="tab"
            title={section.title}
            aria-selected={active}
            tabIndex={active ? 0 : -1}
            onClick={() => onSelect(id)}
            className={clsx(styles.sectionIcon, { [styles.active]: active })}
          >
            <img src={section.icon} alt={`${section.title} icon`} />
          </button>
        );
      })}
    </div>
  );
};

export default SectionIcons;
