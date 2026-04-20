import { stepTracker } from '@/models/stepTracker';
import { toDomain, toRow } from '@/models/stepMapper';
import { stepTrackerDao } from '@/data/datasource/stepTrackerDao';

export const stepTrackerRepository = {

  async getStepTrackers(): Promise<stepTracker[]> {
    const rows = await stepTrackerDao.getAll();
    return rows.map(row => toDomain(row));
  },

    async getStepTrackerbyDate(date: Date): Promise<stepTracker|null> {
      date.setHours(0,0,0,0);
    const row = await stepTrackerDao.getByDate(date);
    return row ? toDomain(row) : null;
  },

  async addOrUpdateStepTracker(stepTracker: stepTracker, finished: boolean): Promise<void> {
      // Check to see if a step tracker point exists
      stepTracker.date.setHours(0,0,0,0);
      let exists = await stepTrackerExists(stepTracker.date);
      // If it does, update it. If not, add it.
      if (exists) {
          await updateStepTracker(stepTracker, finished);
        } else {
          await addStepTracker(stepTracker, finished);
        }
    },

    async getSteptrackersBetween(from: Date, to:Date){
      from.setHours(0,0,0,0)
      to.setHours(0,0,0,0)
      return await stepTrackerDao.getAll();
    }
    
};

async function stepTrackerExists(date: Date): Promise<boolean> {
  return await stepTrackerDao.exists(date);
}
async function addStepTracker(stepTracker: stepTracker, finished: boolean): Promise<void> {
  const row = toRow(stepTracker, finished);
  await stepTrackerDao.insert(row);
}
async function updateStepTracker(stepTracker: stepTracker, finished: boolean): Promise<void> {
  const row = toRow(stepTracker, finished);
  await stepTrackerDao.update(row);
}