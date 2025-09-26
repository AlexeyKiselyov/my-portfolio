import React from 'react';
import { Link } from 'react-router-dom';
import styles from '../SnakeGame.module.css';
import DirectionPad from './DirectionPad';
import ScoreBoard from './ScoreBoard';

interface ConsoleMenuProps {
  move: (dir: 'up' | 'down' | 'left' | 'right') => void;
  score: number;
  muted?: boolean;
  toggleMute?: () => void;
}

const ConsoleMenu: React.FC<ConsoleMenuProps> = ({
  move,
  score,
  muted,
  toggleMute,
}) => {
  return (
    <div
      id="console-menu"
      className={`${styles.consoleMenu} h-full flex flex-col justify-between`}
    >
      <div>
        <div
          id="instructions"
          className={`${styles.instructions} font-fira_retina text-sm text-white`}
        >
          <p>// use your keyboard</p>
          <p>// arrows to play</p>
          <DirectionPad move={move} />
        </div>
        <ScoreBoard score={score} />
      </div>

      <div className="flex justify-between items-center  gap-2">
        {toggleMute && (
          <button
            onClick={toggleMute}
            className="flex items-center ml-3 p-1.5 rounded bg-white/5 hover:bg-white/10 transition-colors outline-none cursor-pointer"
            aria-label={muted ? 'unmute' : 'mute'}
          >
            <img
              src={
                muted
                  ? '/icons/console/sound-off.svg'
                  : '/icons/console/sound-on.svg'
              }
              alt={muted ? 'sound off' : 'sound on'}
              width={20}
              height={20}
            />
          </button>
        )}

        <Link
          id="skip-btn"
          to="/about-me"
          className={`${styles.skipButton} font-fira_retina flex hover:bg-white/20`}
        >
          skip
        </Link>
      </div>
    </div>
  );
};

export default ConsoleMenu;
