import React from 'react';
import { RepoProvider } from '@/providers/repositoryProviders';
import { createMockStepTrackerDao } from './mockStepTrackerDAO';

export const createRepoWrapper = (mockDao = createMockStepTrackerDao()) => {
  const Wrapper: React.FC<React.PropsWithChildren> = ({ children }) => (
    <RepoProvider dao={mockDao}>
      {children}
    </RepoProvider>
  );

  return { Wrapper };
};