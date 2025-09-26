import React from 'react';
import clsx from 'clsx';

import GistsPanel from './GistsPanel';

import styles from '../AboutMePage.module.css';

import type { DeveloperConfig as Config } from '../../../types/developer';

interface RightPanelProps {
  snippets?: Config['snippets'];
}

const RightPanel: React.FC<RightPanelProps> = ({ snippets }) => {
  return (
    <div id="right" className={clsx(styles.right, 'max-w-full flex flex-col')}>
      {/* desktop tab */}
      <div
        className={clsx(
          styles.tabHeight,
          'w-full h-full hidden lg:flex border-bot items-center'
        )}
      >
        {/* Empty tab */}
      </div>

      {/* mobile tab */}
      <div
        className={clsx(
          styles.tabHeight,
          'w-full h-full flex-none lg:hidden items-center'
        )}
      >
        {/* Empty tab */}
      </div>

      <GistsPanel snippets={snippets} />
    </div>
  );
};

export default RightPanel;
