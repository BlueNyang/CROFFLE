import type { base, app } from 'croffle';

// 전역 타입 선언
declare global {
  const croffle: {
    readonly base: typeof base;
    readonly app: typeof app;
  };

  interface Window {
    readonly croffle: typeof croffle;
  }
}

export {};
