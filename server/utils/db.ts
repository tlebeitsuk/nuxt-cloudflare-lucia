import { drizzle as drizzleD1, DrizzleD1Database } from 'drizzle-orm/d1'
import { drizzle, BetterSQLite3Database } from 'drizzle-orm/better-sqlite3'
// @ts-ignore
import Database from 'better-sqlite3'

export * as tables from '../db/schema'

let _db: DrizzleD1Database | BetterSQLite3Database | null = null

export const useDb = () => {
  if (!_db) {
    if (process.env.DB) {
      // d1 in production
      _db = drizzleD1(process.env.DB)
    } else if (process.dev) {
      // local sqlite in development
      const sqlite = new Database('./db.sqlite')
      _db = drizzle(sqlite)
    } else {
      throw new Error('No database configured')
    }
  }

  return _db
} 
