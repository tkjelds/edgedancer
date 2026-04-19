import { stepTracker } from '@/models/stepTracker';
import { toDomain, toRow } from '@/models/stepMapper';
import { stepTrackerDao } from '@/data/datasource/stepTrackerDao';

export const stepTrackerRepository = {

  async getStepTrackers(): Promise<stepTracker[]> {
    const rows = await stepTrackerDao.getAll();
    return rows.map(row => toDomain(row));
  },

  async getStepTrackerbyDate(date: Date): Promise<stepTracker|null> {
    const row = await stepTrackerDao.getByDate(date.setHours(0,0,0,0));
    return row ? toDomain(row) : null;
  },

  async addOrUpdateStepTracker(stepTracker: stepTracker): Promise<void> {
      // Check to see if a step tracker point exists
      let exists = await stepTrackerExists(stepTracker.date.setHours(0,0,0,0));
      // If it does, update it. If not, add it.
      if (exists) {
          await updateStepTracker(stepTracker);
        } else {
            await addStepTracker(stepTracker);
        }
    },
    
};

async function stepTrackerExists(date: number): Promise<boolean> {
  return await stepTrackerDao.exists(date);
}
async function addStepTracker(stepTracker: stepTracker): Promise<void> {
  const row = toRow(stepTracker);
  await stepTrackerDao.insert(row);
}
async function updateStepTracker(stepTracker: stepTracker): Promise<void> {
  const row = toRow(stepTracker);
  await stepTrackerDao.update(row);
}