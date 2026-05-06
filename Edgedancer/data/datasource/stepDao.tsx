import { StepRow } from "@/models/stepRow";
import { getDB } from "../db";

export const stepDAOSQL  = {
    async getAll(): Promise<StepRow[]> {
        return await getDB().then(db => db.getAllAsync("SELECT * FROM STEPTRACKER")) as StepRow[]
    },

    async getByDate(date: Date): Promise<StepRow | null> {
        const db = await getDB();
        const row = await db.getFirstAsync(
            `SELECT * FROM STEPTRACKER WHERE date = ?`,
            [date.toISOString()]
        ) as StepRow | null;
        
        return row 
    },
    
    async insert(row: StepRow) {
        const { date, steps, lastUpdated, finished } = row;
        await getDB().then(db => db.runAsync(
            `INSERT INTO STEPTRACKER (date, steps, lastUpdated, finished) VALUES (?, ?, ?, ?)`,
            [date, steps, lastUpdated, finished ? 1 : 0]
        ));
    },

    async update(row: StepRow) {
        const { date, steps, lastUpdated, finished } = row;
        await getDB().then(db => db.runAsync(
            `UPDATE STEPTRACKER SET steps = ?, lastUpdated = ?, finished = ? WHERE date = ?`,
            [steps, lastUpdated, finished ? 1 : 0, date]
        ));
    },
    async exists(date: Date): Promise<boolean> {
        const db = await getDB();
        const row = await db.getFirstAsync(
            `SELECT 1 FROM STEPTRACKER WHERE date = ? LIMIT 1`,
            [date.toISOString()]
        );

        return !!row;
    },

    async getBetweenDates(from: Date, to: Date): Promise<StepRow[]> {
        const db = await getDB();
        const rows = await db.getAllAsync(
            `SELECT * FROM STEPTRACKER WHERE date BETWEEN ? AND ?`,
            [from.toISOString(),to.toISOString()]);
        return await rows as StepRow[];
    },
}
