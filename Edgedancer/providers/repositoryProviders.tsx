import React, { createContext, useContext, useMemo } from 'react';
import { stepTrackerDao } from '@/data/datasource/stepTrackerDao';
import { createStepTrackerRepository } from '@/repositories/stepTrackerRepository';

const RepoContext = createContext<ReturnType<typeof createStepTrackerRepository> | null>(null);

export const RepoProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const repository = useMemo(() => createStepTrackerRepository(stepTrackerDao), []);

  return (
    <RepoContext.Provider value={repository}>
      {children}
    </RepoContext.Provider>
  );
};

export const useStepRepo = () => {
  const context = useContext(RepoContext);
  if (!context) throw new Error("useStepRepo must be used within RepoProvider");
  return context;
};