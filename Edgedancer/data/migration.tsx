import { getDB } from "./db";


export async function initDB() {
    getDB().then(db => {
        db.execAsync(`
            CREATE TABLE IF NOT EXISTS STEPTRACKER(
                date INT PRIMARY KEY NOT NULL,
                steps INT NOT NULL,
                lastUpdated INT NOT NULL,
                finished BOOLEAN NOT NULL
            );`
        )
    }).then(() => console.log("Initialized database"))
}

export async function populateDB() {
    try {
        const db = await getDB();

        const now = Date.now();

        await db.execAsync(`
            INSERT OR IGNORE INTO STEPTRACKER (date, steps, lastUpdated, finished)
            VALUES 
                (${now - 86400000 * 2}, 5000, ${now}, 0),
                (${now - 86400000}, 8000, ${now}, 0),
                (${now}, 10000, ${now}, 1);
        `);

        console.log("Database populated");
    } catch (error) {
        console.error("Error populating database:", error);
    }
}