import React, { createContext, useContext, useMemo } from 'react';
import { stepDAOSQL } from '@/data/datasource/stepDao';
import { stepRepositoryFactory } from '@/repositories/stepRepository';
import { IStepDao } from '@/data/datasource/IStepDao';

export const RepoContext = createContext<ReturnType<typeof stepRepositoryFactory>>(stepRepositoryFactory(stepDAOSQL));

export const RepoProvider: React.FC<{
  children: React.ReactNode;
  dao?: IStepDao;
}> = ({
  children,
  dao = stepDAOSQL,
}) => {
  const repository = useMemo(() => stepRepositoryFactory(dao), [dao]);

  return (
    <RepoContext.Provider value={repository}>
      {children}
    </RepoContext.Provider>
  );
};
