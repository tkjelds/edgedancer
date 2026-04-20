
import { getDB } from "./db";


export async function initDB() {
    getDB().then(db => {
        db.execAsync(`
            CREATE TABLE IF NOT EXISTS STEPTRACKER(
                date DATETIME PRIMARY KEY NOT NULL,
                steps INT NOT NULL,
                lastUpdated DATETIME NOT NULL,
                finished BOOLEAN NOT NULL
            );`
        )
    }).then(() => console.log("Initialized database"))
}

export async function clearDB() {
    try {
        const db = await getDB();
        await db.execAsync(`DELETE FROM STEPTRACKER;`);
        console.log("Database cleared");
    } catch (error) {
        console.error("Error clearing database:", error);
    }
}

export async function populateDB() {
    try {
        const db = await getDB();

        const now = new Date().setHours(0,0,0,0);

        await db.runAsync(`
            INSERT OR IGNORE INTO STEPTRACKER (date, steps, lastUpdated, finished)
            VALUES (?, ?, ?, ?)
            `,
            [new Date().toISOString(), 10000, new Date().toISOString(), 1]
        );
        console.log("Database populated");
    } catch (error) {
        console.error("Error populating database:", error);
    }
}