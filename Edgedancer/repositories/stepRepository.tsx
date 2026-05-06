import { Step } from '@/models/step';
import { toDomain, toRow } from '@/models/stepMapper';
import { IStepDao } from '@/data/datasource/IStepDao';

export const stepRepositoryFactory = (dao: IStepDao) => {
  
  const stepExists = async (date: Date): Promise<boolean> => {
    return await dao.exists(date);
  };

  const addStep = async (st: Step, finished: boolean): Promise<void> => {
    const row = toRow(st, finished);
    await dao.insert(row);
  };

  const updateStep = async (st: Step, finished: boolean): Promise<void> => {
    const row = toRow(st, finished);
    await dao.update(row);
  };
  
  return {
    async getSteps(): Promise<Step[]> {
      const rows = await dao.getAll();
      return rows.map(row => toDomain(row));
    },

    async getStepByDate(date: Date): Promise<Step | null> {
      const normalizedDate = new Date(date);
      normalizedDate.setHours(0, 0, 0, 0);
      
      const row = await dao.getByDate(normalizedDate);
      return row ? toDomain(row) : null;
    },

    async addOrUpdateStep(st: Step, finished: boolean): Promise<void> {
      const normalizedDate = new Date(st.date);
      normalizedDate.setHours(0, 0, 0, 0);
      
      const exists = await stepExists(normalizedDate);
      
      if (exists) {
        await updateStep(st, finished);
      } else {
        await addStep(st, finished);
      }
    },

    async getStepsInRange(from: Date, to: Date): Promise<Step[]> {
      const dFrom = new Date(from);
      dFrom.setHours(0, 0, 0, 0);
      
      const dTo = new Date(to);
      dTo.setHours(0, 0, 0, 0);

      const rows = await dao.getBetweenDates(dFrom, dTo);
      return rows.map(row => toDomain(row));
    },
  };
};