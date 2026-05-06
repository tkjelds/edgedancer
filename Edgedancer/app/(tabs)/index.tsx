import { useState, useEffect, useMemo, useCallback, useContext } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Pedometer } from 'expo-sensors';
import { syncSteps7Days } from '../services/sync';
import { useFocusEffect } from "expo-router";
import { RepoContext } from '@/providers/repositoryProviders';
import { usePedometer } from '@/hooks/pedometerHook';

export default function Index() {
  //const [isPedometerAvailable, setIsPedometerAvailable] = useState<string>('checking');
 // const [pastStepCount, setPastStepCount] = useState<number>(0);
  const { isAvailable, stepCount } = usePedometer();
  const repository = useContext(RepoContext);

//   useEffect(() => {
//   let interval: ReturnType<typeof setInterval>;

//   const setupPedometer = async () => {
//     const isAvailable = await Pedometer.isAvailableAsync();
//     setIsPedometerAvailable(String(isAvailable));

//     if (!isAvailable) return;

//     const updateSteps = async () => {
//       const start = new Date();
//       start.setHours(0, 0, 0, 0);
//       const end = new Date()

//       const { steps } = await Pedometer.getStepCountAsync(start, end);

//       setPastStepCount(steps);
//     };
//     updateSteps()

//     interval = setInterval(updateSteps, 5 * 1000);
//   };

//   setupPedometer();

//   return () => {
//     if (interval) clearInterval(interval);
//   };
// }, []);

  useFocusEffect(
    useCallback(() => {
      syncSteps7Days(repository);
    }, [repository])
  );

  return (
    <View style={styles.container}>
      <Text>
        Pedometer.isAvailableAsync(): {isAvailable}
      </Text>
      <Text>
        Steps taken in the last 24 hours: {stepCount}
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