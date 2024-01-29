import { drizzle } from "drizzle-orm/d1"

export function initializeDrizzle(D1: D1Database) {
  return drizzle(D1)
}
