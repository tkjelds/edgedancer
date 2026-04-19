import { stepTrackerRow } from "@/models/stepTrackerRow";
import { getDB } from "./db";

export const stepTrackerDao = {
    async getAll() {
        return await getDB().then(db => db.getAllAsync("SELECT * FROM STEPTRACKER")) as stepTrackerRow[]
    },
    async insert(row: stepTrackerRow) {
        const { date, steps, lastUpdated, finished } = row;
        await getDB().then(db => db.runAsync(
            `INSERT INTO STEPTRACKER (date, steps, lastUpdated, finished) VALUES (?, ?, ?, ?)`,
            [date, steps, lastUpdated, finished ? 1 : 0]
        ));
    }
}


async function execQuery<T>(sql: string, params: string[] = []): Promise<T[]> {
  const db = await getDB();
  const result = await db.runAsync(sql, params);
  return result as unknown as T[];
}