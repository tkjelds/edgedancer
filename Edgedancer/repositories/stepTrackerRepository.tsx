import { stepTracker } from '@/models/stepTracker';
import { toDomain, toRow } from '@/models/stepMapper';
import { IStepTrackerDao } from '@/data/datasource/IstepTrackerDao';

export const stepTrackerFactory = (dao: IStepTrackerDao) => {
  
  const stepTrackerExists = async (date: Date): Promise<boolean> => {
    return await dao.exists(date);
  };

  const addStepTracker = async (st: stepTracker, finished: boolean): Promise<void> => {
    const row = toRow(st, finished);
    await dao.insert(row);
  };

  const updateStepTracker = async (st: stepTracker, finished: boolean): Promise<void> => {
    const row = toRow(st, finished);
    await dao.update(row);
  };

  return {
    async getStepTrackers(): Promise<stepTracker[]> {
      const rows = await dao.getAll();
      return rows.map(row => toDomain(row));
    },

    async getStepTrackerbyDate(date: Date): Promise<stepTracker | null> {
      const normalizedDate = new Date(date);
      normalizedDate.setHours(0, 0, 0, 0);
      
      const row = await dao.getByDate(normalizedDate);
      return row ? toDomain(row) : null;
    },

    async addOrUpdateStepTracker(st: stepTracker, finished: boolean): Promise<void> {
      const normalizedDate = new Date(st.date);
      normalizedDate.setHours(0, 0, 0, 0);
      
      const exists = await stepTrackerExists(normalizedDate);
      
      if (exists) {
        await updateStepTracker(st, finished);
      } else {
        await addStepTracker(st, finished);
      }
    },

    async getSteptrackersBetween(from: Date, to: Date): Promise<stepTracker[]> {
      const dFrom = new Date(from);
      dFrom.setHours(0, 0, 0, 0);
      
      const dTo = new Date(to);
      dTo.setHours(0, 0, 0, 0);

      const rows = await dao.getBetweenDates(dFrom, dTo);
      return rows.map(row => toDomain(row));
    },
  };
};