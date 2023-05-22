import lucia from "lucia-auth";
import { h3 } from "lucia-auth/middleware";
import { d1, betterSqlite3 } from "@lucia-auth/adapter-sqlite";
// @ts-ignore
import Database from 'better-sqlite3'

let sqlite

if (process.dev) {
  sqlite = new Database('./db.sqlite')
}

export const auth = lucia({
  adapter: process.dev ? betterSqlite3(sqlite) : d1(process.env.DB),
  env: process.dev ? "DEV" : "PROD",
  middleware: h3(),
  transformDatabaseUser: (userData) => {
    return {
      userId: userData.id,
      email: userData.email
    };
  }
});

export type Auth = typeof auth;
