import { useEffect, useMemo, useRef } from 'react';
import Lenis from 'lenis';

type Options = {
  enabled?: boolean;
  lerp?: number; // 0..1, lower is smoother
  duration?: number; // seconds, target animation duration
};

// Enables Lenis on the window (global scroll). No wrappers, no SimpleBar.
export default function useGlobalSmoothScroll(options: Options = {}) {
  const { enabled = true, lerp = 0.1, duration = 1.1 } = options;

  const lenisRef = useRef<Lenis | null>(null);
  const rafIdRef = useRef<number | null>(null);

  const reduceMotion = useMemo(() => {
    if (typeof window === 'undefined' || !('matchMedia' in window))
      return false;
    try {
      return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    } catch {
      return false;
    }
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined' || typeof document === 'undefined')
      return;

    // Respect prefers-reduced-motion and enabled flag
    const shouldEnable = enabled && !reduceMotion;
    if (!shouldEnable) {
      // Ensure any previous instance is torn down
      if (rafIdRef.current) {
        cancelAnimationFrame(rafIdRef.current);
        rafIdRef.current = null;
      }
      if (lenisRef.current) {
        lenisRef.current.destroy();
        lenisRef.current = null;
      }
      return;
    }

    // Init Lenis on window
    const lenis = new Lenis({
      lerp,
      duration,
      // smoothTouch defaults are fine; we rely on Lenis defaults here
    } as any);
    lenisRef.current = lenis;

    const raf = (time: number) => {
      lenis.raf(time);
      rafIdRef.current = requestAnimationFrame(raf);
    };
    rafIdRef.current = requestAnimationFrame(raf);

    return () => {
      if (rafIdRef.current) {
        cancelAnimationFrame(rafIdRef.current);
        rafIdRef.current = null;
      }
      lenis.destroy();
      lenisRef.current = null;
    };
  }, [enabled, lerp, duration, reduceMotion]);
}
