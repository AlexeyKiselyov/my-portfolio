import React from 'react';
import styles from '../SnakeGame.module.css';

interface StartButtonProps {
  onClick: () => void;
}

const StartButton: React.FC<StartButtonProps> = ({ onClick }) => (
  <button
    id="start-button"
    className={`${styles.startButton} font-fira_retina`}
    onClick={onClick}
  >
    start-game
  </button>
);

export default StartButton;
