import React from 'react';
import clsx from 'clsx';

import SectionFolders from './SectionFolders';
import type { DeveloperConfig as Config } from '../../../types/developer';

interface MobileSectionProps {
  sectionId: string;
  section: Config['about']['sections'][keyof Config['about']['sections']];
  isOpen: boolean;
  folder: string;
  onToggleSection: (id: string) => void;
  onSelectSection: (id: string) => void;
  onSelectFolder: (id: string) => void;
  onSelectFile: (folderId: string, fileKey: string) => void;
  activeFile: string;
}

const MobileSection: React.FC<MobileSectionProps> = ({
  sectionId,
  section,
  isOpen,
  folder,
  onToggleSection,
  onSelectSection,
  onSelectFolder,
  onSelectFile,
  activeFile,
}) => {
  return (
    <div>
      <button
        type="button"
        onClick={() => {
          onSelectSection(sectionId);
          onToggleSection(sectionId);
        }}
        id="section-content-title"
        className="flex lg:hidden mb-1 items-center"
        aria-expanded={isOpen}
      >
        <img
          src="/icons/arrow.svg"
          alt="toggle section"
          className={clsx('section-arrow', { 'rotate-90': isOpen })}
        />
        <span className="text-white text-sm ml-1">{section.title}</span>
      </button>
      {isOpen && (
        <div>
          <SectionFolders
            section={section}
            activeFolder={folder}
            onSelectFolder={onSelectFolder}
            onSelectFile={onSelectFile}
            activeFile={activeFile}
          />
        </div>
      )}
    </div>
  );
};

export default MobileSection;
