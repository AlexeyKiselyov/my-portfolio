import React from 'react';
import ConsoleFrame from './components/ConsoleFrame';
import CanvasGameScreen from './components/CanvasGameScreen';
import StartButton from './components/StartButton';
import Overlay from './components/Overlay';
import ConsoleMenu from './components/ConsoleMenu';
import {
  useSnakeGame,
  GRID_WIDTH,
  GRID_HEIGHT,
  WIN_SCORE,
  SNAKE_COLOR_DEFAULT,
} from './hooks/useSnakeGame';

const SnakeGame: React.FC = () => {
  const {
    canvasRef,
    score,
    gameStarted,
    gameOver,
    startGame,
    startAgain,
    move,
    toggleMute,
    muted,
  } = useSnakeGame({
    tickInterval: 60,
    winScore: WIN_SCORE,
    color: SNAKE_COLOR_DEFAULT,
  });

  return (
    <ConsoleFrame>
      <CanvasGameScreen
        ref={canvasRef}
        gridWidth={GRID_WIDTH}
        gridHeight={GRID_HEIGHT}
      />
      {!gameStarted && !gameOver && <StartButton onClick={startGame} />}
      {gameOver && score < WIN_SCORE && (
        <Overlay variant="gameover" onClick={startAgain} />
      )}
      {gameOver && score === WIN_SCORE && (
        <Overlay variant="congrats" onClick={startAgain} />
      )}
      <ConsoleMenu
        move={move}
        score={score}
        muted={muted}
        toggleMute={toggleMute}
      />
    </ConsoleFrame>
  );
};

export default SnakeGame;
