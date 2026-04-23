import React, { createContext, useContext, useMemo } from 'react';
import { stepTrackerDao } from '@/data/datasource/stepTrackerDao';
import { stepTrackerFactory } from '@/repositories/stepTrackerRepository';
import { IStepTrackerDao } from '@/data/datasource/IstepTrackerDao';

const RepoContext = createContext<ReturnType<typeof stepTrackerFactory> | null>(null);


type RepoProviderProps = {
  children: React.ReactNode;
  dao?: IStepTrackerDao;
};

export const RepoProvider: React.FC<RepoProviderProps> = ({
  children,
  dao = stepTrackerDao,
}) => {
  const repository = useMemo(() => stepTrackerFactory(dao), [dao]);

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