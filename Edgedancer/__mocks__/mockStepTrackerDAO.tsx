import { StepRow } from "@/models/stepRow";

const store = new Map<string, StepRow>();

export const createMockStepTrackerDao = () => {
  return {
    async getAll(): Promise<StepRow[]> {
      return Array.from(store.values());
    },

    async getByDate(date: Date): Promise<StepRow | null> {
      return store.get(date.toISOString()) ?? null;
    },

    async insert(row: StepRow) {
      store.set(row.date, row);
    },

    async update(row: StepRow) {
      store.set(row.date, {
        ...store.get(row.date),
        ...row,
      });
    },

    async exists(date: Date): Promise<boolean> {
      return store.has(date.toISOString());
    },

    async getBetweenDates(from: Date, to: Date): Promise<StepRow[]> {
      const fromTime = new Date(from).getTime();
      const toTime = new Date(to).getTime();

      return Array.from(store.values()).filter((row) => {
        const t = new Date(row.date).getTime();
        return t >= fromTime && t <= toTime;
      });
    },
  };
};