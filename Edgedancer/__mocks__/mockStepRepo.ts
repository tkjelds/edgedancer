// test/mocks/mockStepRepo.ts
import { Step } from '@/models/step';

export const createMockStepRepo = () => ({
  getStepTrackers: jest.fn<Promise<Step[]>, []>(),
  getStepTrackerbyDate: jest.fn<Promise<Step | null>, [Date]>(),
  addOrUpdateStepTracker: jest.fn<Promise<void>, [Step, boolean]>(),
  getSteptrackersBetween: jest.fn<Promise<Step[]>, [Date, Date]>(),
});