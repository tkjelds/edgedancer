import * as SQLite from 'expo-sqlite';

const DB_NAME = "STEPTRACKER";
let db: SQLite.SQLiteDatabase | null = null;

export async function getDB(dbname = DB_NAME): Promise<SQLite.SQLiteDatabase> {
  if (!db) {
    db = await SQLite.openDatabaseAsync(dbname);
  }
  return db;
}