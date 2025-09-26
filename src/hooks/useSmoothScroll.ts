import { useCallback, useEffect, useMemo, useRef } from 'react';
import Lenis from 'lenis';

type Options = {
  enabled?: boolean;
  lerp?: number; // 0..1, lower is smoother
  duration?: number; // seconds, target animation duration
};

/**
 * Attaches Lenis to SimpleBar via ref.
 * Usage: const sbRef = useSmoothScroll(opts); <SimpleBar ref={sbRef}>...</SimpleBar>
 */
export default function useSmoothScroll(options: Options = {}) {
  const { enabled = true, lerp = 0.1, duration = 1.2 } = options;

  const simpleBarInstanceRef = useRef<any>(null);
  const lenisRef = useRef<Lenis | null>(null);
  const rafIdRef = useRef<number | null>(null);

  // Detect prefers-reduced-motion for accessibility
  const reduceMotion = useMemo(() => {
    if (typeof window === 'undefined' || !('matchMedia' in window))
      return false;
    try {
      return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    } catch {
      return false;
    }
  }, []);

  const cleanup = useCallback(() => {
    if (rafIdRef.current) {
      cancelAnimationFrame(rafIdRef.current);
      rafIdRef.current = null;
    }
    if (lenisRef.current) {
      lenisRef.current.destroy();
      lenisRef.current = null;
    }
  }, []);

  const init = useCallback(() => {
    cleanup();
    if (!enabled) return;

    const inst = simpleBarInstanceRef.current;
    const wrapper: HTMLElement | undefined = inst?.getScrollElement?.();
    const content: HTMLElement | undefined = inst?.getContentElement?.();
    if (!wrapper || !content) return;

    // If reduced motion is requested, disable smoothing
    const effectiveLerp = reduceMotion ? 1 : lerp;
    const effectiveDuration = reduceMotion ? 0 : duration;

    lenisRef.current = new Lenis({
      // Element-based scrolling
      wrapper,
      content,
      // Attach event listeners only to the wrapper (not globally)
      eventsTarget: wrapper as any,
      lerp: effectiveLerp,
      duration: effectiveDuration,
    } as any);

    // Start the animation frame loop for Lenis
    const raf = (time: number) => {
      lenisRef.current?.raf(time);
      rafIdRef.current = requestAnimationFrame(raf);
    };
    rafIdRef.current = requestAnimationFrame(raf);
  }, [cleanup, enabled, lerp, duration, reduceMotion]);

  const simpleBarRef = useCallback(
    (instance: any | null) => {
      simpleBarInstanceRef.current = instance;
      if (instance) init();
      else cleanup();
    },
    [init, cleanup]
  );

  useEffect(() => {
    if (simpleBarInstanceRef.current) init();
    return cleanup; // unmount
  }, [init, cleanup]);

  return simpleBarRef;
}
