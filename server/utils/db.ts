import { drizzle, DrizzleD1Database } from 'drizzle-orm/d1';

export * as tables from '~/server/db/schema'

const db: DrizzleD1Database = drizzle(process.env.DB);

export const useDb = () => {
  return db
}
 
