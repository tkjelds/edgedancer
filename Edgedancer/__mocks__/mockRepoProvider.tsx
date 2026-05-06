import React from 'react';
import { RepoContext, RepoProvider } from '@/providers/repositoryProviders';
import { createMockStepTrackerDao } from './mockStepTrackerDAO';
import { stepRepositoryFactory } from '@/repositories/stepRepository';

export const createRepoWrapperWithDao = (mockDao = createMockStepTrackerDao()) => {
  const Wrapper: React.FC<React.PropsWithChildren> = ({ children }) => (
    <RepoProvider dao={mockDao}>
      {children}
    </RepoProvider>
  );

  return { Wrapper };
};

export const createRepoWrapper = (repo = stepRepositoryFactory(createMockStepTrackerDao())) => {
  const Wrapper: React.FC<React.PropsWithChildren> = ({ children }) => (
    <RepoContext.Provider value={repo}>
      {children}
    </RepoContext.Provider>
  );

  return { Wrapper };
};