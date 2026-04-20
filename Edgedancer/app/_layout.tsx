import { useEffect, useState } from 'react';
import { initDB, populateDB } from '@/data/migration';
import { Stack } from 'expo-router';
import { RepoProvider } from '@/providers/repositoryProviders';

export default function RootLayout() {
  const [dbInitialized, setDbInitialized] = useState(false);

  useEffect(() => {
    async function setup() {
      try {
        await initDB();
        await populateDB();
        setDbInitialized(true);
      } catch (error) {
        console.error("Database failed to initialize:", error);
      }
    }
    setup();
  }, []);

  // Optional: Show a splash screen or null until DB is ready
  if (!dbInitialized) {
    return null; 
  }

  return (
    <RepoProvider>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }}/>
      </Stack>
    </RepoProvider>
  );
}