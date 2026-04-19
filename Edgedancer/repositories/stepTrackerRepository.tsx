import { stepTracker } from '@/models/stepTracker';
import { stepTrackerDao } from '@/data/stepTrackerDao';
import { toDomain, toRow } from '@/models/stepMapper';

export const stepTrackerRepository = {
  async getStepTrackers(): Promise<stepTracker[]> {
    const rows = await stepTrackerDao.getAll();
    return rows.map(row => toDomain(row));
  },
  async addStepTracker(stepTracker: stepTracker): Promise<void> {
    const row = toRow(stepTracker);
    await stepTrackerDao.insert(row);
  }
};