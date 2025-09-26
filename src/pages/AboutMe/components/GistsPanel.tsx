import React from 'react';
import SimpleBar from 'simplebar-react';
import clsx from 'clsx';

import GistSnippet from './GistSnippet';

import useMedia from '../../../hooks/useMedia';
import useSmoothScroll from '../../../hooks/useSmoothScroll';

import type { DeveloperConfig as Config } from '../../../types/developer';
import styles from '../AboutMePage.module.css';

interface Props {
  snippets?: Config['snippets'];
}

const GistsPanel: React.FC<Props> = ({ snippets }) => {
  const isDesktop = useMedia('(min-width: 1024px)');

  // Lenis + SimpleBar refs
  const gistsSBRef = useSmoothScroll({
    enabled: isDesktop,
    lerp: 0.1,
    duration: 1.2,
  });

  return (
    <div id="gists-content" className={clsx(styles.gistsContent, 'flex')}>
      <div id="gists" className="flex flex-col w-full overflow-hidden">
        <SimpleBar
          ref={gistsSBRef}
          className="w-full h-full max-h-full scroll-bar"
        >
          <h3 className="text-white lg:text-menu-text mt-5 mb-4 pl-5 text-sm">
            // Code snippet showcase:
          </h3>
          <div className="flex flex-col lg:pl-5 lg:pr-7 lg:py-4">
            {Object.entries(snippets || {}).map(([key, sn]) => (
              <div key={key}>
                <GistSnippet snippet={sn} />
              </div>
            ))}
          </div>
        </SimpleBar>
      </div>
    </div>
  );
};

export default GistsPanel;
