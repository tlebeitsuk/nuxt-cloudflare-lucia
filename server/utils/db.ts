import { drizzle, DrizzleD1Database } from "drizzle-orm/d1";
export * as tables from "../db/schema";

let _db: DrizzleD1Database | null = null;

export const useDb = () => {
  if (!_db) {
    _db = drizzle(process.env.DB);
  }

  return _db;
};
