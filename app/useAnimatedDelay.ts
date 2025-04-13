import { useCallback, useEffect, useState } from "react";

export type UseAnimatedDelayResult = {
  progress: number;
  delayed: (callback: () => void, delay: number) => void;
};

export function useAnimatedDelay(): UseAnimatedDelayResult {
  type Registration = {
    callback: () => void;
    startedAt: number;
    delay: number;
  };
  const [reg, setReg] = useState<Registration | null>(null);
  const [progress, setProgress] = useState<number>(0);

  useEffect(() => {
    if (!reg) {
      return;
    }
    const { callback, startedAt, delay } = reg;
    let active = true;
    function checkedCallback() {
      if (active) {
        callback();
        active = false;
      }
    }
    function update() {
      const elapsed = Date.now() - startedAt;
      const progress = Math.min(elapsed / delay, 1);
      setProgress(progress);
      if (progress >= 1) {
        checkedCallback();
      }
    }
    function animationLoop() {
      if (!active) {
        return;
      }
      update();
      requestAnimationFrame(animationLoop);
    }

    const interval = setInterval(update, 100);
    requestAnimationFrame(animationLoop);
    return () => {
      active = false;
      clearInterval(interval);
    };
  }, [reg]);

  const delayed = useCallback((callback: () => void, delay: number) => {
    setReg({
      callback,
      startedAt: Date.now(),
      delay,
    });
  }, []);

  return { progress: reg ? progress : 0, delayed };
}
