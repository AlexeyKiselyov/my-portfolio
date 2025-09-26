import React from 'react';
import styles from '../SnakeGame.module.css';

interface ScoreBoardProps {
  score: number;
}

const ScoreBoard: React.FC<ScoreBoardProps> = ({ score }) => {
  const foodElements = Array.from({ length: 10 }, (_, index) => (
    <div
      key={index}
      className={styles.food}
      style={{ opacity: index < score ? 1 : 0.3 }}
    />
  ));
  return (
    <div id="score-board" className={styles.scoreBoard}>
      <p className="font-fira_retina text-white pt-5">// food left</p>
      <div id="score" className={styles.score}>
        {foodElements}
      </div>
    </div>
  );
};

export default ScoreBoard;
