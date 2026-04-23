import { useState, useEffect, useMemo, useCallback } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Pedometer } from 'expo-sensors';
import { syncSteps7Days } from '../services/sync';
import { useFocusEffect } from "expo-router";
import { RepoProvider, useStepRepo } from '@/providers/repositoryProviders';

export default function Index() {
  const [isPedometerAvailable, setIsPedometerAvailable] = useState<string>('checking');
  const [pastStepCount, setPastStepCount] = useState<number>(0);

  const todayStart = useCallback(() => {
    const d = new Date();
    d.setHours(0, 0, 0, 0);
    return d;
  }, [Date.now()]);

  const repository = useStepRepo();

  useEffect(() => {
  let interval: ReturnType<typeof setInterval>;

  const setupPedometer = async () => {
    const isAvailable = await Pedometer.isAvailableAsync();
    setIsPedometerAvailable(String(isAvailable));

    if (!isAvailable) return;

    const updateSteps = async () => {
      const end = new Date();
      const { steps } = await Pedometer.getStepCountAsync(todayStart(), end);

      setPastStepCount(steps);
    };
    updateSteps()

    interval = setInterval(updateSteps, 5 * 1000);
  };

  setupPedometer();

  return () => {
    if (interval) clearInterval(interval);
  };
}, [todayStart]);

  useFocusEffect(
    useCallback(() => {
      syncSteps7Days(repository);
    }, [repository])
  );

  return (
    <RepoProvider>
    <View style={styles.container}>
      <Text>
        Pedometer.isAvailableAsync(): {isPedometerAvailable}
      </Text>
      <Text>
        Steps taken in the last 24 hours: {pastStepCount}
      </Text>
    </View>
    </RepoProvider>
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