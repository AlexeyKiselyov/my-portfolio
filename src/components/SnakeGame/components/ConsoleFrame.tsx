import React from 'react';
import styles from '../SnakeGame.module.css';

interface ConsoleFrameProps {
  children: React.ReactNode;
}

const ConsoleFrame: React.FC<ConsoleFrameProps> = ({ children }) => {
  return (
    <div id="console" className={styles.console}>
      <img
        src="/icons/console/bolt-up-left.svg"
        alt=""
        className={`${styles.corner} absolute top-2 left-2 opacity-70`}
      />
      <img
        src="/icons/console/bolt-up-right.svg"
        alt=""
        className={`${styles.corner} absolute top-2 right-2 opacity-70`}
      />
      <img
        src="/icons/console/bolt-down-left.svg"
        alt=""
        className={`${styles.corner} absolute bottom-2 left-2 opacity-70`}
      />
      <img
        src="/icons/console/bolt-down-right.svg"
        alt=""
        className={`${styles.corner} absolute bottom-2 right-2 opacity-70`}
      />
      {children}
    </div>
  );
};

export default ConsoleFrame;
