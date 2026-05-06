import { Step } from '@/models/step';
import { RepoContext} from '@/providers/repositoryProviders';
import { useContext, useEffect, useState } from 'react';


export function useGetSteps() {
  const [stepTrackers, setStepTrackers] = useState<Step[]>([]);
  const repository = useContext(RepoContext);
  const fetchStepTrackers = () => {
    return repository
      .getSteps()
      .then(setStepTrackers);
  };

  useEffect(() => {
    fetchStepTrackers();
  }, []);

  return { stepTrackers, refetch: fetchStepTrackers };
}
export function useGetStepByDate(date: Date) {
  const repository = useContext(RepoContext);
  const [stepTracker, setStepTracker] = useState<Step|null>(null);

  useEffect(() => {
    repository.getStepByDate(date).then(setStepTracker);
  }, [date, repository]);

  return stepTracker;
}
export function useGetStepsInRange(from: Date, to: Date) {
  const [stepTrackers, setStepTrackers] = useState<Step[]>([]);
  const repository = useContext(RepoContext);

  useEffect(() => {
    repository.getStepsInRange(from, to).then(setStepTrackers);
  }, [from, to, repository]);

  return stepTrackers;
}

export function useAddOrUpdateStep() {
  const repository = useContext(RepoContext);
  return async (stepTracker: Step, finished: boolean) => {
    await repository.addOrUpdateStep(stepTracker, finished);
  }
}
