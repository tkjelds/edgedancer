import { Pedometer } from "expo-sensors";

export async function syncSteps7Days(repository: any) {
  const available = await Pedometer.isAvailableAsync();
  if (!available) return;

  const start = new Date();
  start.setDate(start.getDate() - 7);
  start.setHours(0, 0, 0, 0);

  for (let i = 0; i < 10; i++) {

    const day = new Date(start);
    day.setDate(start.getDate() + i);

    const nextDay = new Date(day);
    nextDay.setDate(day.getDate() + 1);

    const { steps } = await Pedometer.getStepCountAsync(day, nextDay);

    await repository.addOrUpdateStepTracker(
      {
        date: day,
        steps,
      },
      true
    );
  }
}