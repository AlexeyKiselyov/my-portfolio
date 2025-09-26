import React, { useEffect, useState } from 'react';
import SimpleBar from 'simplebar-react';
import clsx from 'clsx';

import CommentedText from './CommentedText';
import type { DeveloperConfig as Config } from '../../../types/developer';

import useMedia from '../../../hooks/useMedia';
import useSmoothScroll from '../../../hooks/useSmoothScroll';

import styles from '../AboutMePage.module.css';

interface ContentPanelProps {
  sectionData: Config['about']['sections'][keyof Config['about']['sections']];
  folder: string;
  activeFile?: string | null;
}

const ContentPanel: React.FC<ContentPanelProps> = ({
  sectionData,
  folder,
  activeFile,
}) => {
  const [startAnimation, setStartAnimation] = useState(false);

  const isDesktop = useMedia('(min-width: 1024px)');

  // Lenis + SimpleBar refs
  const commentedTextSBRef = useSmoothScroll({
    enabled: isDesktop,
    lerp: 0.1,
    duration: 1.2,
  });

  useEffect(() => {
    setStartAnimation(true);
  }, []);

  return (
    <div
      id="left"
      className={clsx(styles.left, 'w-full flex flex-col border-right')}
    >
      {/* desktop tab */}
      <div
        className={clsx(
          styles.tabHeight,
          'w-full hidden lg:flex border-bot items-center'
        )}
      >
        <div className="flex items-center border-right h-full">
          <p className="font-fira_regular text-menu-text text-sm px-3">
            {sectionData.title}
          </p>
          <img src="/icons/close.svg" alt="" className="mx-3" />
        </div>
      </div>

      {/* mobile tab */}
      <div id="tab-mobile" className="flex lg:hidden font-fira_retina">
        <span className="text-white">// </span>
        <h3 className="text-white px-2">{sectionData.title}</h3>
        <span className="text-menu-text"> / </span>
        <h3 className="text-menu-text pl-2">
          {sectionData.info[folder]?.title}
          {activeFile ? ` / ${activeFile}` : ''}
        </h3>
      </div>

      {/* commented text */}
      <div
        id="commented-text"
        className={clsx(
          'flex h-full w-full overflow-hidden',
          startAnimation ? 'fadeIn' : 'animHidden'
        )}
      >
        <SimpleBar
          ref={commentedTextSBRef}
          className="w-full h-full max-h-full scroll-bar"
        >
          <div className="pr-9 py-5 max-lg:pl-5">
            <CommentedText
              text={
                activeFile
                  ? sectionData.info[folder]?.files?.[activeFile] || ''
                  : sectionData.info[folder]?.description || ''
              }
            />
          </div>
        </SimpleBar>
      </div>
    </div>
  );
};

export default ContentPanel;
