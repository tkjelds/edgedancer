import { stepTracker } from '@/models/stepTracker';
import { stepTrackerRepository } from '@/repositories/stepTrackerRepository';
import { useEffect, useState } from 'react';


export function useStepTrackers() {
  const [stepTrackers, setStepTrackers] = useState<stepTracker[]>([]);

  const fetchStepTrackers = () => {
    return stepTrackerRepository
      .getStepTrackers()
      .then(setStepTrackers);
  };

  useEffect(() => {
    fetchStepTrackers();
  }, []);

  return { stepTrackers, refetch: fetchStepTrackers };
}
// export function useExistsStepTracker(date: Date) {
//   const [exists, setExists] = useState<boolean>(false);

//   useEffect(() => {
//     stepTrackerRepository.exists(date.setHours(0,0,0,0)).then(setExists);
//   }, [date]);

//   return exists;
// }

export function useGetStepTrackerByDate(date: Date) {
  const [stepTracker, setStepTracker] = useState<stepTracker|null>(null);

  useEffect(() => {
    stepTrackerRepository.getStepTrackerbyDate(date).then(setStepTracker);
  }, [date]);

  return stepTracker;
}
export function useGetStepTrackersBetween(from: Date, to: Date) {
  const [stepTrackers, setStepTrackers] = useState<stepTracker[]>([]);

  useEffect(() => {
    stepTrackerRepository.getSteptrackersBetween(from, to).then(setStepTrackers);
  }, [from, to]);

  return stepTrackers;
}

export function useAddOrUpdateStepTracker() {
  return async (stepTracker: stepTracker, finished: boolean) => {
    await stepTrackerRepository.addOrUpdateStepTracker(stepTracker, finished);
  }
}