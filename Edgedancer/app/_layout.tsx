import { clearDB, initDB, populateDB } from '@/data/migration';
import { Stack } from 'expo-router';

export default function RootLayout() {
  initDB().then(() => { populateDB() });
  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
    </Stack>
  );
}
