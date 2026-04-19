import { useState, useEffect, useMemo } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Pedometer } from 'expo-sensors';
import {
  useAddOrUpdateStepTracker,
  useGetStepTrackerByDate,
} from '@/hooks/stepTrackerHook';

export default function Index() {
  const [isPedometerAvailable, setIsPedometerAvailable] = useState<string>('checking');
  const [pastStepCount, setPastStepCount] = useState<number>(0);

  const todayStart = useMemo(() => {
    const d = new Date();
    d.setHours(0, 0, 0, 0);
    return d;
  }, [Date.now()]);

  const addOrUpdateStepTracker = useAddOrUpdateStepTracker();
  const getStepTrackerByDate = useGetStepTrackerByDate(todayStart);
  

  useEffect(() => {
    let subscription: any;

    const setupPedometer = async () => {
      const isAvailable = await Pedometer.isAvailableAsync();
      setIsPedometerAvailable(String(isAvailable));

      if (!isAvailable) return;

      const end = new Date();
      const { steps } = await Pedometer.getStepCountAsync(todayStart, end);
      setPastStepCount(steps);

      subscription = Pedometer.watchStepCount(async () => {
        const end = new Date();
        const { steps } = await Pedometer.getStepCountAsync(todayStart, end);

        setPastStepCount(steps);

        addOrUpdateStepTracker({
          date: todayStart,
          steps,
          finished: steps >= 10000,
        });
      });
    };

    setupPedometer();

    return () => {
      subscription?.remove?.();
    };
  }, [todayStart, addOrUpdateStepTracker]);

  return (
    <View style={styles.container}>
      <Text>
        Pedometer.isAvailableAsync(): {isPedometerAvailable}
      </Text>
      <Text>
        Steps taken in the last 24 hours: {pastStepCount}
      </Text>
      <Text>
        Step tracker for today: {getStepTrackerByDate ? JSON.stringify(getStepTrackerByDate) : 'No data'}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
});