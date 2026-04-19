import { stepTracker } from '@/models/stepTracker';
import { stepTrackerRepository } from '@/repositories/stepTrackerRepository';
import { useEffect, useState } from 'react';


export function useStepTrackers() {
  const [stepTrackers, setStepTrackers] = useState<stepTracker[]>([]);

  useEffect(() => {
    stepTrackerRepository.getStepTrackers().then(setStepTrackers);
  }, []);

  return stepTrackers;
}