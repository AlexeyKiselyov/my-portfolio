import React from 'react';
import type { ComponentType, LazyExoticComponent } from 'react';

/**
 * Wrap React.lazy with retry + page reload for stale chunk scenarios.
 * - Detects typical dynamic import failures (network / missing chunk after deploy).
 * - Single reload attempt; avoids infinite loops via in-memory attempt counter.
 */
export function lazyWithRetry<T extends ComponentType<any>>(
  importer: () => Promise<{ default: T }>,
  opts: { retryTimes?: number; onFail?: (err: unknown) => void } = {}
): LazyExoticComponent<T> {
  const { retryTimes = 1, onFail } = opts;
  let attempts = 0;

  const load = () =>
    importer().catch((err: any) => {
      const message: string = err?.message || '';
      const isChunkError = /Failed to fetch dynamically imported module|Loading chunk|import\(|ChunkLoadError/i.test(message);

      if (isChunkError && attempts < retryTimes) {
        attempts += 1;
        // Force a hard reload to fetch fresh index.html + manifest
        window.location.reload();
      }

      onFail?.(err);
      throw err;
    });

  return React.lazy(load);
}
