import { stepTrackerRow } from "@/models/stepTrackerRow";

export interface IStepTrackerDao {
  getAll(): Promise<stepTrackerRow[]>;
  getByDate(date: Date): Promise<stepTrackerRow | null>;
  exists(date: Date): Promise<boolean>;
  insert(row: stepTrackerRow): Promise<void>;
  update(row: stepTrackerRow): Promise<void>;
  getBetweenDates(from: Date, to: Date): Promise<stepTrackerRow[]>;
}