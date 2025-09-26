import { useCallback, useEffect, useRef, useState } from 'react';
import type { CanvasHandle } from '../components/CanvasGameScreen';

export interface Position {
  x: number;
  y: number;
}

// Grid constants (columns x rows) – exported for component props
export const GRID_WIDTH = 24; // X
export const GRID_HEIGHT = 40; // Y
export const WIN_SCORE = 10;
export const SNAKE_COLOR_DEFAULT = '#43D9AD';

interface GameStateRef {
  snake: Position[];
  food: Position;
  direction: Direction;
  gameStarted: boolean;
  score: number;
  gameOver: boolean;
}

export type Direction = 'up' | 'down' | 'left' | 'right';

interface UseSnakeGameOptions {
  tickInterval?: number; // ms per step
  winScore?: number;
  color?: string;
  autoStart?: boolean; // if true start immediately
}

interface UseSnakeGameReturn {
  canvasRef: React.RefObject<CanvasHandle | null>;
  score: number;
  gameStarted: boolean;
  gameOver: boolean;
  startGame: () => void;
  startAgain: () => void;
  move: (dir: Direction) => void;
  toggleMute: () => void;
  muted: boolean;
  config: {
    tickInterval: number;
    winScore: number;
    color: string;
  };
  GRID_WIDTH: number;
  GRID_HEIGHT: number;
}

const INITIAL_SNAKE: Position[] = [
  { x: 10, y: 12 },
  { x: 10, y: 13 },
  { x: 10, y: 14 },
  { x: 10, y: 15 },
  { x: 10, y: 16 },
  { x: 10, y: 17 },
  { x: 10, y: 18 },
  { x: 11, y: 18 },
  { x: 12, y: 18 },
  { x: 13, y: 18 },
  { x: 14, y: 18 },
  { x: 15, y: 18 },
  { x: 15, y: 19 },
  { x: 15, y: 20 },
  { x: 15, y: 21 },
  { x: 15, y: 22 },
  { x: 15, y: 23 },
  { x: 15, y: 24 },
];

export const useSnakeGame = (
  options: UseSnakeGameOptions = {}
): UseSnakeGameReturn => {
  const {
    tickInterval = 60,
    winScore = WIN_SCORE,
    color = SNAKE_COLOR_DEFAULT,
    autoStart = false,
  } = options;
  const [score, setScore] = useState(0);
  const [gameStarted, setGameStarted] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [food, setFood] = useState<Position>({ x: 10, y: 5 });
  const [snake, setSnake] = useState<Position[]>(INITIAL_SNAKE);
  const [direction, setDirection] = useState<Direction>('up');
  const [muted, setMuted] = useState<boolean>(() => {
    try {
      const raw = localStorage.getItem('snake_mute');
      return raw === '1';
    } catch {
      return false;
    }
  });
  const mutedRef = useRef(false);
  useEffect(() => {
    mutedRef.current = muted;
  }, [muted]);

  const canvasRef = useRef<CanvasHandle | null>(null);
  const gameIntervalRef = useRef<number | null>(null);
  const directionChangedThisTickRef = useRef(false);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const lastEatTimeRef = useRef<number>(0);
  const lastEatPosRef = useRef<Position | null>(null);
  const gameStateRef = useRef<GameStateRef>({
    snake,
    food,
    direction,
    gameStarted,
    score,
    gameOver,
  });

  // --- helpers ---
  const ensureAudioCtx = useCallback(() => {
    const AC =
      (window as any).AudioContext || (window as any).webkitAudioContext;
    if (!AC) return null;
    if (!audioCtxRef.current) audioCtxRef.current = new AC();
    const ctx = audioCtxRef.current!;
    if (ctx.state === 'suspended') void ctx.resume();
    return ctx;
  }, []);

  const beep = useCallback(
    (
      freq: number,
      duration = 0.08,
      gain = 0.03,
      type: OscillatorType = 'square',
      when = 0
    ) => {
      if (mutedRef.current) return;
      const ctx = ensureAudioCtx();
      if (!ctx) return;
      const osc = ctx.createOscillator();
      const g = ctx.createGain();
      osc.type = type;
      osc.frequency.value = freq;
      g.gain.value = gain;
      osc.connect(g);
      g.connect(ctx.destination);
      const startAt = ctx.currentTime + when;
      osc.start(startAt);
      osc.stop(startAt + duration);
    },
    [ensureAudioCtx]
  );

  const sfxEat = useCallback(() => {
    beep(660, 0.06, 0.03, 'square', 0);
    beep(880, 0.06, 0.025, 'square', 0.06);
  }, [beep]);
  const sfxGameOver = useCallback(() => {
    beep(300, 0.12, 0.03, 'sawtooth', 0);
    beep(220, 0.14, 0.03, 'sawtooth', 0.12);
    beep(180, 0.16, 0.03, 'sawtooth', 0.26);
  }, [beep]);
  const sfxWin = useCallback(() => {
    beep(523.25, 0.08, 0.03, 'triangle', 0);
    beep(659.25, 0.08, 0.03, 'triangle', 0.08);
    beep(783.99, 0.12, 0.03, 'triangle', 0.16);
  }, [beep]);

  // keep ref in sync
  useEffect(() => {
    gameStateRef.current = {
      snake,
      food,
      direction,
      gameStarted,
      score,
      gameOver,
    };
  }, [snake, food, direction, gameStarted, score, gameOver]);

  const generateNewFood = useCallback((): Position => {
    let newFood: Position;
    do {
      newFood = {
        x: Math.floor(Math.random() * GRID_WIDTH),
        y: Math.floor(Math.random() * GRID_HEIGHT),
      };
    } while (
      gameStateRef.current.snake.some(
        seg => seg.x === newFood.x && seg.y === newFood.y
      )
    );
    return newFood;
  }, []);

  const moveSnake = useCallback(() => {
    const state = gameStateRef.current;
    if (!state.gameStarted) return;

    const head = state.snake[0];
    let newX = head.x;
    let newY = head.y;
    switch (state.direction) {
      case 'up':
        newY--;
        break;
      case 'down':
        newY++;
        break;
      case 'left':
        newX--;
        break;
      case 'right':
        newX++;
        break;
    }

    if (
      newX >= 0 &&
      newX < GRID_WIDTH &&
      newY >= 0 &&
      newY < GRID_HEIGHT &&
      !state.snake.some(seg => seg.x === newX && seg.y === newY)
    ) {
      const newSnake = [{ x: newX, y: newY }, ...state.snake];
      if (newX === state.food.x && newY === state.food.y) {
        const newScore = state.score + 1;
        setScore(newScore);
        sfxEat();
        lastEatTimeRef.current = performance.now();
        lastEatPosRef.current = { x: newX, y: newY };
        if (newScore === winScore) {
          setSnake([{ x: newX, y: newY }, ...newSnake]);
          setFood({ x: -1, y: -1 });
          if (gameIntervalRef.current) {
            clearInterval(gameIntervalRef.current);
            gameIntervalRef.current = null;
          }
          setGameOver(true);
          sfxWin();
          setGameStarted(false);
        } else {
          setFood(generateNewFood());
        }
      } else {
        newSnake.pop();
      }
      setSnake(newSnake);
    } else {
      if (gameIntervalRef.current) {
        clearInterval(gameIntervalRef.current);
        gameIntervalRef.current = null;
      }
      setGameStarted(false);
      setGameOver(true);
      sfxGameOver();
    }
    directionChangedThisTickRef.current = false;
  }, [generateNewFood, sfxEat, sfxGameOver, sfxWin]);

  const startGame = useCallback(() => {
    ensureAudioCtx();
    setGameStarted(true);
    if (gameIntervalRef.current) clearInterval(gameIntervalRef.current);
    gameIntervalRef.current = setInterval(moveSnake, tickInterval);
  }, [moveSnake, ensureAudioCtx, tickInterval]);

  const startAgain = useCallback(() => {
    setGameStarted(false);
    setGameOver(false);
    setScore(0);
    setFood({ x: 10, y: 5 });
    setSnake(INITIAL_SNAKE);
    setDirection('up');
    if (gameIntervalRef.current) {
      clearInterval(gameIntervalRef.current);
      gameIntervalRef.current = null;
    }
  }, []);

  const move = useCallback(
    (newDirection: Direction) => {
      ensureAudioCtx();
      const state = gameStateRef.current;
      if (
        (!directionChangedThisTickRef.current &&
          newDirection === 'up' &&
          state.direction !== 'down') ||
        (newDirection === 'down' && state.direction !== 'up') ||
        (newDirection === 'left' && state.direction !== 'right') ||
        (newDirection === 'right' && state.direction !== 'left')
      ) {
        setDirection(newDirection);
        directionChangedThisTickRef.current = true;
      }
    },
    [ensureAudioCtx]
  );

  // rendering
  const roundRect = (
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
    w: number,
    h: number,
    radii: { tl: number; tr: number; br: number; bl: number }
  ) => {
    ctx.beginPath();
    ctx.moveTo(x + radii.tl, y);
    ctx.lineTo(x + w - radii.tr, y);
    ctx.quadraticCurveTo(x + w, y, x + w, y + radii.tr);
    ctx.lineTo(x + w, y + h - radii.br);
    ctx.quadraticCurveTo(x + w, y + h, x + w - radii.br, y + h);
    ctx.lineTo(x + radii.bl, y + h);
    ctx.quadraticCurveTo(x, y + h, x, y + h - radii.bl);
    ctx.lineTo(x, y + radii.tl);
    ctx.quadraticCurveTo(x, y, x + radii.tl, y);
    ctx.closePath();
  };

  const render = useCallback(() => {
    const canvasHandle = canvasRef.current;
    if (!canvasHandle) return;
    const ctx = canvasHandle.getContext();
    if (!ctx) return;
    const cellSize = canvasHandle.getCellSize();
    const {
      snake: currentSnake,
      food: currentFood,
      direction: dir,
    } = gameStateRef.current;
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    if (currentFood.x >= 0) {
      const fx = currentFood.x * cellSize + cellSize / 2;
      const fy = currentFood.y * cellSize + cellSize / 2;
      ctx.save();
      ctx.fillStyle = color;
      ctx.shadowColor = color;
      ctx.shadowBlur = 10;
      ctx.beginPath();
      ctx.arc(fx, fy, cellSize * 0.45, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    }
    for (let i = 0; i < currentSnake.length; i++) {
      const seg = currentSnake[i];
      const alpha = 1 - i / currentSnake.length;
      const x = seg.x * cellSize;
      const y = seg.y * cellSize;
      ctx.save();
      ctx.globalAlpha = alpha;
      ctx.fillStyle = color;
      if (i === 0) {
        const r = cellSize * 0.5;
        const w = cellSize;
        const h = cellSize;
        const tl = dir === 'up' || dir === 'left' ? r : 4;
        const tr = dir === 'up' || dir === 'right' ? r : 4;
        const br = dir === 'down' || dir === 'right' ? r : 4;
        const bl = dir === 'down' || dir === 'left' ? r : 4;
        roundRect(ctx, x, y, w, h, { tl, tr, br, bl });
        ctx.fill();
      } else {
        ctx.fillRect(x, y, cellSize, cellSize);
      }
      ctx.restore();
    }
    if (lastEatPosRef.current) {
      const dt = performance.now() - lastEatTimeRef.current;
      if (dt > 0 && dt < 180) {
        const t = 1 - dt / 180;
        const px = lastEatPosRef.current.x * cellSize + cellSize / 2;
        const py = lastEatPosRef.current.y * cellSize + cellSize / 2;
        const radius = cellSize * (0.5 + 0.25 * t);
        ctx.save();
        ctx.globalAlpha = t;
        ctx.strokeStyle = color;
        ctx.lineWidth = 2;
        ctx.shadowColor = color;
        ctx.shadowBlur = 12 * t;
        ctx.beginPath();
        ctx.arc(px, py, radius, 0, Math.PI * 2);
        ctx.stroke();
        ctx.restore();
        requestAnimationFrame(render);
      } else {
        lastEatPosRef.current = null;
      }
    }
  }, []); // deps intentionally empty – internal refs handle updates

  // Stable refs for handlers to avoid effect re-runs on mute / sfx changes
  const moveRef = useRef(move);
  const startGameRef = useRef(startGame);
  const startAgainRef = useRef(startAgain);
  useEffect(() => {
    moveRef.current = move;
  }, [move]);
  useEffect(() => {
    startGameRef.current = startGame;
  }, [startGame]);
  useEffect(() => {
    startAgainRef.current = startAgain;
  }, [startAgain]);

  // key controls & resize (mount once)
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      ensureAudioCtx();
      const state = gameStateRef.current;
      if (state.gameStarted) {
        switch (event.key) {
          case 'ArrowLeft':
            event.preventDefault();
            moveRef.current('left');
            break;
          case 'ArrowUp':
            event.preventDefault();
            moveRef.current('up');
            break;
          case 'ArrowRight':
            event.preventDefault();
            moveRef.current('right');
            break;
          case 'ArrowDown':
            event.preventDefault();
            moveRef.current('down');
            break;
        }
      } else if (event.key === ' ') {
        event.preventDefault();
        if (state.gameOver) startAgainRef.current();
        else startGameRef.current();
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    const handleResize = () => {
      canvasRef.current?.resize();
      render();
    };
    window.addEventListener('resize', handleResize);
    render();
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('resize', handleResize);
      if (gameIntervalRef.current) {
        clearInterval(gameIntervalRef.current);
        gameIntervalRef.current = null;
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // re-render when primary state changes (batch to next frame)
  useEffect(() => {
    const id = requestAnimationFrame(render);
    return () => cancelAnimationFrame(id);
  }, [snake, food, direction, render]);

  const toggleMute = useCallback(() => setMuted(m => !m), []);

  // persist mute
  useEffect(() => {
    try {
      localStorage.setItem('snake_mute', muted ? '1' : '0');
    } catch {
      /* ignore */
    }
  }, [muted]);

  // auto-start option
  useEffect(() => {
    if (autoStart && !gameStarted && !gameOver) startGame();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [autoStart]);

  return {
    canvasRef,
    score,
    gameStarted,
    gameOver,
    startGame,
    startAgain,
    move,
    toggleMute,
    muted,
    config: { tickInterval, winScore, color },
    GRID_WIDTH,
    GRID_HEIGHT,
  };
};

export default useSnakeGame;
