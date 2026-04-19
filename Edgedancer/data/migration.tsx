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