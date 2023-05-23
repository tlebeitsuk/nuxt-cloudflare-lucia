import lucia from "lucia-auth";
import { d1 } from "@lucia-auth/adapter-sqlite";
import { h3 } from "lucia-auth/middleware";
import type { Auth as LAuth, Configuration } from "lucia-auth";

let _auth: LAuth<Configuration> | null = null;

export const useAuth = () => {
  if (!_auth) {
    _auth = lucia({
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
  }

  return _auth
} 

export type Auth = typeof _auth;
