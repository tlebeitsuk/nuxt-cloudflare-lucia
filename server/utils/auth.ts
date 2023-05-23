import lucia from "lucia-auth";
import { h3 } from "lucia-auth/middleware";
import { d1 } from "@lucia-auth/adapter-sqlite";

export const auth = lucia({
  adapter: d1(process.env.DB),
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
