import { StepRow } from "@/models/stepRow";

export interface IStepDao {
  getAll(): Promise<StepRow[]>;
  getByDate(date: Date): Promise<StepRow | null>;
  exists(date: Date): Promise<boolean>;
  insert(row: StepRow): Promise<void>;
  update(row: StepRow): Promise<void>;
  getBetweenDates(from: Date, to: Date): Promise<StepRow[]>;
}