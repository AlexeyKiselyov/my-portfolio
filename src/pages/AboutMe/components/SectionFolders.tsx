import React from 'react';
import clsx from 'clsx';

import styles from '../AboutMePage.module.css';

import type { Section } from '../../../types/developer';

interface Props {
  section: Section;
  activeFolder: string;
  onSelectFolder: (folderId: string) => void;
  activeFile: string;
  onSelectFile: (folderId: string, fileKey: string) => void;
}

const SectionFolders: React.FC<Props> = ({
  section,
  activeFolder,
  onSelectFolder,
  activeFile,
  onSelectFile,
}) => {
  return (
    <div>
      {/* Folder structure */}
      {Object.entries(section.info).map(([folderLabel, folderItem], index) => {
        const isActive = folderLabel === activeFolder;
        return (
          <div
            key={folderLabel}
            className="grid grid-cols-2 items-center my-2 font-fira_regular text-menu-text"
          >
            <button
              type="button"
              onClick={() => onSelectFolder(folderLabel)}
              className="flex col-span-2 hover:text-white hover:cursor-pointer text-left"
              aria-pressed={isActive}
            >
              <img
                src="/icons/diple.svg"
                alt=""
                className={clsx('mx-3 w-2 max-w-fit', styles.arrow, {
                  [styles.open]: isActive,
                })}
              />
              <img
                src={`/icons/folder${index + 1}.svg`}
                alt="folder"
                className="mr-3"
              />
              <span className={clsx({ [styles.active]: isActive })}>
                {folderLabel}
              </span>
            </button>

            {/* Additional files */}
            {folderItem.files && (
              <div
                className={clsx('col-span-2', styles.filesContainer, {
                  [styles.filesHidden]: !isActive,
                })}
                aria-hidden={!isActive}
              >
                {Object.entries(folderItem.files).map(([fileKey]) => {
                  const fileActive = activeFile === fileKey && isActive;
                  return (
                    <button
                      key={fileKey}
                      type="button"
                      onClick={() => onSelectFile(folderLabel, fileKey)}
                      className={clsx(
                        'flex items-center my-2 ml-8 text-left hover:text-white cursor-pointer',
                        { [styles.active]: fileActive }
                      )}
                      aria-pressed={fileActive}
                    >
                      <img
                        src="/icons/markdown.svg"
                        alt="markdown"
                        className="mr-3"
                      />
                      <span>{fileKey}</span>
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default SectionFolders;
