import { useState, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Pedometer } from 'expo-sensors';

export default function Index() {
  const [isPedometerAvailable, setIsPedometerAvailable] = useState('checking');
  const [pastStepCount, setPastStepCount] = useState(0);

  const subscribe = async () => {
    const isAvailable = await Pedometer.isAvailableAsync();
    setIsPedometerAvailable(String(isAvailable));

    if (isAvailable) {
      return Pedometer.watchStepCount(async () => {
        const end = new Date();
        const start = new Date();
        start.setDate(end.getDate() - 1);
        const pastStepCountResult = Pedometer.getStepCountAsync(start, end);
        setPastStepCount((await pastStepCountResult).steps);
      });
    }
  };

  useEffect(() => {
    const subscription = subscribe();
    return () => {if(subscription) {
      subscription.then(sub => sub?.remove());
    } }
  }, []);

  return (
    <View style={styles.container}>
      <Text>Pedometer.isAvailableAsync(): {isPedometerAvailable}</Text>
      <Text>Steps taken the last 24 hours: {pastStepCount}</Text>
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
