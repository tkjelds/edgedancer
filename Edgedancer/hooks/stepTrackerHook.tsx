import { stepTracker } from '@/models/stepTracker';
import { useStepRepo } from '@/providers/repositoryProviders';
import { useEffect, useState } from 'react';


export function useStepTrackers() {
  const [stepTrackers, setStepTrackers] = useState<stepTracker[]>([]);
  const repository = useStepRepo();

  const fetchStepTrackers = () => {
    return repository
      .getStepTrackers()
      .then(setStepTrackers);
  };

  useEffect(() => {
    fetchStepTrackers();
  }, []);

  return { stepTrackers, refetch: fetchStepTrackers };
}
export function useGetStepTrackerByDate(date: Date) {
  const repository = useStepRepo();
  const [stepTracker, setStepTracker] = useState<stepTracker|null>(null);

  useEffect(() => {
    repository.getStepTrackerbyDate(date).then(setStepTracker);
  }, [date, repository]);

  return stepTracker;
}
export function useGetStepTrackersBetween(from: Date, to: Date) {
  const [stepTrackers, setStepTrackers] = useState<stepTracker[]>([]);
  const repository = useStepRepo();

  useEffect(() => {
    repository.getSteptrackersBetween(from, to).then(setStepTrackers);
  }, [from, to, repository]);

  return stepTrackers;
}

export function useAddOrUpdateStepTracker() {
  const repository = useStepRepo();
  return async (stepTracker: stepTracker, finished: boolean) => {
    await repository.addOrUpdateStepTracker(stepTracker, finished);
  }
}
