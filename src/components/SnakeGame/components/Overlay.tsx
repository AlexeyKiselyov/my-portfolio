import styles from '../SnakeGame.module.css';

interface OverlayProps {
  variant: 'gameover' | 'congrats';
  onClick: () => void;
}

const Overlay: React.FC<OverlayProps> = ({ variant, onClick }) => {
  const isCongrats = variant === 'congrats';
  return (
    <div
      id={isCongrats ? 'congrats' : 'game-over'}
      className={isCongrats ? styles.congrats : styles.gameOver}
    >
      <span className="font-fira_retina text-greenfy bg-bluefy-dark h-12 flex items-center justify-center">
        {isCongrats ? 'WELL DONE!' : 'GAME OVER!'}
      </span>
      <button
        className="font-fira_retina text-menu-text text-sm flex items-center justify-center w-full py-6 hover:text-white"
        onClick={onClick}
      >
        {isCongrats ? 'play-again' : 'start-again'}
      </button>
    </div>
  );
};

export default Overlay;
