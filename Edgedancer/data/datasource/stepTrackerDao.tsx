import { stepTrackerRow } from "@/models/stepTrackerRow";
import { getDB } from "../db";
import { get } from "react-native/Libraries/TurboModule/TurboModuleRegistry";

export const stepTrackerDao = {
    async getAll(): Promise<stepTrackerRow[]> {
        return await getDB().then(db => db.getAllAsync("SELECT * FROM STEPTRACKER")) as stepTrackerRow[]
    },

    async getByDate(date: number): Promise<stepTrackerRow | null> {
        const db = await getDB();
        const row = await db.getFirstAsync(
            `SELECT * FROM STEPTRACKER WHERE date = ?`,
            [date]
        ) as stepTrackerRow | null;
        
        return row 
    },
    
    async insert(row: stepTrackerRow) {
        const { date, steps, lastUpdated, finished } = row;
        await getDB().then(db => db.runAsync(
            `INSERT INTO STEPTRACKER (date, steps, lastUpdated, finished) VALUES (?, ?, ?, ?)`,
            [date, steps, lastUpdated, finished ? 1 : 0]
        ));
    },

    async update(row: stepTrackerRow) {
        const { date, steps, lastUpdated, finished } = row;
        await getDB().then(db => db.runAsync(
            `UPDATE STEPTRACKER SET steps = ?, lastUpdated = ?, finished = ? WHERE date = ?`,
            [steps, lastUpdated, finished ? 1 : 0, date]
        ));
    },
    async exists(date: number): Promise<boolean> {
        const db = await getDB();
        const row = await db.getFirstAsync(
            `SELECT 1 FROM STEPTRACKER WHERE date = ? LIMIT 1`,
            [date]
        );

        return !!row;
    }
}
