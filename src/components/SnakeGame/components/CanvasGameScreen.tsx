import { forwardRef, useImperativeHandle, useRef, useEffect } from 'react';
import styles from '../SnakeGame.module.css';

export interface CanvasHandle {
  getContext: () => CanvasRenderingContext2D | null;
  resize: () => void;
  getCellSize: () => number;
}

interface CanvasGameScreenProps {
  gridWidth: number;
  gridHeight: number;
}

const CanvasGameScreen = forwardRef<CanvasHandle, CanvasGameScreenProps>(
  ({ gridWidth, gridHeight }, ref) => {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const cellSizeRef = useRef<number>(8);

    const resize = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const cellSize = window.innerWidth > 1536 ? 10 : 8;
      cellSizeRef.current = cellSize;
      canvas.width = gridWidth * cellSize;
      canvas.height = gridHeight * cellSize;
    };

    useEffect(() => {
      resize();
      window.addEventListener('resize', resize);
      return () => window.removeEventListener('resize', resize);
    }, []);

    useImperativeHandle(
      ref,
      () => ({
        getContext: () => canvasRef.current?.getContext('2d') || null,
        resize,
        getCellSize: () => cellSizeRef.current,
      }),
      []
    );

    return (
      <div
        className={styles.gameScreen}
        style={{ display: 'block', padding: 0 }}
      >
        <canvas ref={canvasRef} style={{ display: 'block' }} />
      </div>
    );
  }
);

CanvasGameScreen.displayName = 'CanvasGameScreen';
export default CanvasGameScreen;
