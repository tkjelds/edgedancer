import { stepTrackerRow } from "@/models/stepTrackerRow";

const store = new Map<string, stepTrackerRow>();

const key = (date: Date | string) =>
  typeof date === "string" ? date : date.toISOString();

export const createMockStepTrackerDao = () => {
  return {
    async getAll(): Promise<stepTrackerRow[]> {
      return Array.from(store.values());
    },

    async getByDate(date: Date): Promise<stepTrackerRow | null> {
      return store.get(key(date)) ?? null;
    },

    async insert(row: stepTrackerRow) {
      store.set(key(row.date), row);
    },

    async update(row: stepTrackerRow) {
      store.set(key(row.date), {
        ...store.get(key(row.date)),
        ...row,
      });
    },

    async exists(date: Date): Promise<boolean> {
      return store.has(key(date));
    },

    async getBetweenDates(from: Date, to: Date): Promise<stepTrackerRow[]> {
      const fromTime = new Date(from).getTime();
      const toTime = new Date(to).getTime();

      return Array.from(store.values()).filter((row) => {
        const t = new Date(row.date).getTime();
        return t >= fromTime && t <= toTime;
      });
    },

    // 🔥 test helper (not in production DAO)
    __reset() {
      store.clear();
    },
  };
};