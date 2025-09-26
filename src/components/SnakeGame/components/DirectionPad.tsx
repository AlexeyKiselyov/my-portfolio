import React from 'react';
import styles from '../SnakeGame.module.css';

interface DirectionPadProps {
  move: (dir: 'up' | 'down' | 'left' | 'right') => void;
}

const DirectionPad: React.FC<DirectionPadProps> = ({ move }) => (
  <div
    id="buttons"
    className={`${styles.buttons} w-full flex flex-col items-center gap-1 pt-5`}
  >
    <button className={styles.consoleButton} onClick={() => move('up')}>
      <img src="/icons/console/arrow-button.svg" alt="move up" />
    </button>
    <div className={styles.arrowGrid}>
      <button className={styles.consoleButton} onClick={() => move('left')}>
        <img
          src="/icons/console/arrow-button.svg"
          alt="move left"
          className="-rotate-90"
        />
      </button>
      <button className={styles.consoleButton} onClick={() => move('down')}>
        <img
          src="/icons/console/arrow-button.svg"
          alt="move down"
          className="rotate-180"
        />
      </button>
      <button className={styles.consoleButton} onClick={() => move('right')}>
        <img
          src="/icons/console/arrow-button.svg"
          alt="move right"
          className="rotate-90"
        />
      </button>
    </div>
  </div>
);

export default DirectionPad;
