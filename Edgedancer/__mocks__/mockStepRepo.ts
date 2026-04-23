// test/mocks/mockStepRepo.ts
import { stepTracker } from '@/models/stepTracker';

export const createMockStepRepo = () => ({
  getStepTrackers: jest.fn<Promise<stepTracker[]>, []>(),
  getStepTrackerbyDate: jest.fn<Promise<stepTracker | null>, [Date]>(),
  addOrUpdateStepTracker: jest.fn<Promise<void>, [stepTracker, boolean]>(),
  getSteptrackersBetween: jest.fn<Promise<stepTracker[]>, [Date, Date]>(),
});