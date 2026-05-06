import React, { createContext, useContext, useMemo } from 'react';
import { stepDao } from '@/data/datasource/stepDao';
import { stepRepositoryFactory } from '@/repositories/stepRepository';
import { IStepDao } from '@/data/datasource/IStepDao';

export const RepoContext = createContext<ReturnType<typeof stepRepositoryFactory>>(stepRepositoryFactory(stepDao));

export const RepoProvider: React.FC<{
  children: React.ReactNode;
  dao?: IStepDao;
}> = ({
  children,
  dao = stepDao,
}) => {
  const repository = useMemo(() => stepRepositoryFactory(dao), [dao]);

  return (
    <RepoContext.Provider value={repository}>
      {children}
    </RepoContext.Provider>
  );
};
