import { useEffect, useState } from 'react';
import { Pedometer } from 'expo-sensors';

export function usePedometer(pollInterval = 5000) {
  const [isAvailable, setIsAvailable] = useState<string>('checking');
  const [stepCount, setStepCount] = useState<number>(0);

  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;

    const init = async () => {
      const available = await Pedometer.isAvailableAsync();
      setIsAvailable(String(available));

      if (!available) return;

      const updateSteps = async () => {
        const start = new Date();
        start.setHours(0, 0, 0, 0);
        const end = new Date();

        const { steps } = await Pedometer.getStepCountAsync(start, end);
        setStepCount(steps);
      };

      await updateSteps();
      interval = setInterval(updateSteps, pollInterval);
    };

    init();

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [pollInterval]);

  return { isAvailable, stepCount };
}