import React from 'react';
import clsx from 'clsx';
import styles from '../HomePage.module.css';

import SnakeGame from '../../../components/SnakeGame/SnakeGame';

interface GameSectionProps {
  gameAnimation: boolean;
}

const GameSection: React.FC<GameSectionProps> = ({ gameAnimation }) => {
  return (
    <section
      className={clsx(styles.game, gameAnimation ? 'fadeUp' : 'animHidden')}
    >
      <SnakeGame />
    </section>
  );
};

export default GameSection;
