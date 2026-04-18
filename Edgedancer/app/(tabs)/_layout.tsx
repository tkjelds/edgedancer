import { Tabs } from 'expo-router';

export default function TabLayout() {
  return (
    <Tabs>
      <Tabs.Screen name="history" options={{ title: 'History', headerShown: false }} />
      <Tabs.Screen name="index" options={{ title: 'Home', headerShown: false }} />
      <Tabs.Screen name="alarms" options={{ title: 'Alarms', headerShown: false }} />
    </Tabs>
  );
}
