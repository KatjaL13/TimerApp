import { useCallback, useEffect, useRef, useState } from "react";

export function useCountdown(initialSeconds: number) {
  const initialMs = Math.max(0, Math.floor(initialSeconds)) * 1000;

  const [timeLeft, setTimeLeft] = useState(initialMs);
  const [isRunning, setIsRunning] = useState(false);

  const remainingRef = useRef(initialMs);
  const endTimeRef = useRef(0);
  const intervalRef = useRef<number | null>(null);

  // Laufendes Intervall beenden
  const clearTimer = useCallback(() => {
    if (intervalRef.current !== null) {
      window.clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  // Timer starten oder fortsetzen
  const start = useCallback(() => {
    if (intervalRef.current !== null || remainingRef.current <= 0) {
      return;
    }

    endTimeRef.current = performance.now() + remainingRef.current;
    setIsRunning(true);

    intervalRef.current = window.setInterval(() => {
      const remaining = Math.max(0, Math.ceil(endTimeRef.current - performance.now()));

      remainingRef.current = remaining;
      setTimeLeft(remaining);

      if (remaining === 0) {
        clearTimer();
        setIsRunning(false);
      }
    }, 10);
  }, [clearTimer]);

  // Timer pausieren
  const pause = useCallback(() => {
    if (intervalRef.current === null) return;

    const remaining = Math.max(0, Math.ceil(endTimeRef.current - performance.now()));

    clearTimer();
    remainingRef.current = remaining;
    setTimeLeft(remaining);
    setIsRunning(false);
  }, [clearTimer]);

  // Timer zurücksetzen
  const reset = useCallback(() => {
    clearTimer();
    remainingRef.current = initialMs;
    setTimeLeft(initialMs);
    setIsRunning(false);
  }, [clearTimer, initialMs]);

  // Intervall beim Entfernen der Komponente aufräumen
  useEffect(() => {
    return () => clearTimer();
  }, [clearTimer]);

  return {
    timeLeft,
    isRunning,
    start,
    pause,
    reset,
  };
}
