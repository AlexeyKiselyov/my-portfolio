import { useState, useMemo, useCallback } from 'react';
import { ABOUT_DEFAULT_SECTION } from '../constants';
import DevConfig from '../developer.json';
import type { DeveloperConfig as Config } from '../types/developer';

export const useAboutMeState = () => {
  const config = DevConfig as Config;
  type SectionKey = keyof Config['about']['sections'];

  // Find the initial section
  const sectionKeys = Object.keys(config.about.sections) as SectionKey[];
  const defaultSection = sectionKeys[0] || ABOUT_DEFAULT_SECTION;
  const [currentSection, setCurrentSection] =
    useState<SectionKey>(defaultSection);

  // Get the current section data
  const currentSectionData = useMemo(() => {
    return config.about.sections[currentSection];
  }, [currentSection, config]);

  // Find the first folder in the current section
  const getFirstFolderInSection = useCallback(
    (sectionId: SectionKey) => {
      return Object.keys(config.about.sections[sectionId].info)[0] || '';
    },
    [config]
  );

  // Set the current folder
  const [folder, setFolder] = useState<string>(
    getFirstFolderInSection(defaultSection)
  );
  const [selectedFile, setSelectedFile] = useState<string | null>(null);

  // State for mobile version
  const [openMobileSections, setOpenMobileSections] = useState<
    Record<string, boolean>
  >({});
  const [contactsOpen, setContactsOpen] = useState<boolean>(false);

  // Event handlers
  const handleSelectSection = useCallback(
    (sectionId: string) => {
      if (sectionId in config.about.sections) {
        const typedSectionId = sectionId as SectionKey;
        setCurrentSection(typedSectionId);
        setFolder(getFirstFolderInSection(typedSectionId));
        setSelectedFile(null);
      }
    },
    [getFirstFolderInSection, config]
  );

  const handleSelectFolder = useCallback((folderId: string) => {
    setFolder(folderId);
    setSelectedFile(null);
  }, []);

  const handleSelectFile = useCallback((folderId: string, fileKey: string) => {
    setFolder(folderId);
    setSelectedFile(fileKey);
  }, []);

  const toggleMobileSection = useCallback((sectionId: string) => {
    setOpenMobileSections(prev => ({ ...prev, [sectionId]: !prev[sectionId] }));
  }, []);

  const toggleContacts = useCallback(() => {
    setContactsOpen(prev => !prev);
  }, []);

  return {
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
  };
};
