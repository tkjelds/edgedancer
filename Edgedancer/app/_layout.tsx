import { initDB } from '@/data/migration';
import { Stack } from 'expo-router';

export default function RootLayout() {
  initDB()
  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
    </Stack>
  );
}
