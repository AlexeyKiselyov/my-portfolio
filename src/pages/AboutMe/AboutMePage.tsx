import React from 'react';
import clsx from 'clsx';

import { useAboutMeState } from '../../hooks/useAboutMeState';
import SEO from '../../components/SEO';

import MobileSection from './components/MobileSection';
import MobileContacts from './components/MobileContacts';
import SectionContent from './components/SectionContent';
import SectionIcons from './components/SectionIcons';
import ContentPanel from './components/ContentPanel';
import RightPanel from './components/RightPanel';

import styles from './AboutMePage.module.css';

const AboutMePage: React.FC = () => {
  const {
    config,
    currentSection,
    currentSectionData,
    folder,
    selectedFile,
    openMobileSections,
    contactsOpen,
    handleSelectSection,
    handleSelectFolder,
    handleSelectFile,
    toggleMobileSection,
    toggleContacts,
  } = useAboutMeState();

  return (
    <>
      <SEO page="about" canonical={`${window.location.origin}/about-me`} />
      <main id="about-me" className={clsx('page', styles.page)}>
        {/* Mobile page title */}
        <div id="mobile-page-title" className="lg:hidden">
          <h2>_about-me</h2>
        </div>

        <div id="page-menu" className="w-full flex">
          {/* Section icons for navigation */}
          <SectionIcons
            sections={config.about.sections}
            activeId={currentSection as string}
            onSelect={handleSelectSection}
          />

          {/* Desktop section content */}
          <SectionContent
            section={currentSectionData}
            activeFolder={folder}
            activeFile={selectedFile ?? ''}
            contacts={config.contacts.direct}
            onSelectFolder={handleSelectFolder}
            onSelectFile={handleSelectFile}
          />

          {/* Mobile section content */}
          <div
            id="section-content"
            className={clsx(
              styles.sectionContent,
              'lg:hidden w-full font-fira_regular'
            )}
          >
            {Object.entries(config.about.sections).map(([id, section]) => (
              <MobileSection
                key={id}
                sectionId={id}
                section={section}
                isOpen={!!openMobileSections[id]}
                folder={folder}
                onToggleSection={toggleMobileSection}
                onSelectSection={handleSelectSection}
                onSelectFolder={handleSelectFolder}
                onSelectFile={handleSelectFile}
                activeFile={selectedFile ?? ''}
              />
            ))}

            <MobileContacts
              contactsData={config.contacts.direct}
              isOpen={contactsOpen}
              onToggle={toggleContacts}
            />
          </div>
        </div>
        {/* MENU END */}

        {/* Main content area */}
        <div className="flex flex-col lg:grid lg:grid-cols-2 h-full w-full">
          <ContentPanel
            sectionData={currentSectionData}
            folder={folder}
            activeFile={selectedFile}
          />
          <RightPanel snippets={config.snippets} />
        </div>
      </main>
    </>
  );
};

export default AboutMePage;
