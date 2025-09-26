import React from 'react';
import clsx from 'clsx';

import SectionFolders from './SectionFolders';
import ContactsBlock from './ContactsBlock';

import styles from '../AboutMePage.module.css';

import type { DeveloperConfig as Config } from '../../../types/developer';

interface SectionContentProps {
  section: Config['about']['sections'][keyof Config['about']['sections']];
  activeFolder: string;
  activeFile: string;
  contacts: Config['contacts']['direct'];
  onSelectFolder: (id: string) => void;
  onSelectFile: (folderId: string, fileKey: string) => void;
}

const SectionContent: React.FC<SectionContentProps> = ({
  section,
  activeFolder,
  activeFile,
  contacts,
  onSelectFolder,
  onSelectFile,
}) => {
  return (
    <div
      id="section-content"
      className={clsx(
        styles.sectionContent,
        'hidden lg:block w-full h-full border-right'
      )}
    >
      {/* title */}
      <div
        id="section-content-title"
        className="hidden lg:flex items-center min-w-full"
      >
        <img
          id="section-arrow-menu"
          src="/icons/arrow.svg"
          alt=""
          className={clsx(
            'section-arrow',
            'section-arrow',
            'mx-3',
            styles.open
          )}
        />
        <p className="font-fira_regular text-white text-sm">{section.title}</p>
      </div>

      {/* folders */}
      <SectionFolders
        section={section}
        activeFolder={activeFolder}
        onSelectFolder={onSelectFolder}
        activeFile={activeFile}
        onSelectFile={onSelectFile}
      />

      {/* contacts */}
      <div
        id="section-content-title-contact"
        className="flex items-center min-w-full border-top"
      >
        <img
          id="section-arrow-menu"
          src="/icons/arrow.svg"
          alt=""
          className={clsx(
            'section-arrow',
            'section-arrow',
            'mx-3',
            styles.open
          )}
        />
        <p className="font-fira_regular text-white text-sm">{contacts.title}</p>
      </div>
      <div
        id={styles.contactSources}
        className="hidden lg:flex lg:flex-col my-2"
      >
        <ContactsBlock contacts={contacts} />
      </div>
    </div>
  );
};

export default SectionContent;
