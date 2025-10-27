import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "@/src/db";
import * as schema from "@/src/db/schema/auth-schema";
export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "pg", // change to "sqlite" if using SQLite
    schema: schema
  }),
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: false, // set to true if you want email verification
  },
  session: {
    cookieCache: {
      enabled: true,
      maxAge: 60 * 60 * 24 * 7, // 7 days
    },
  },
  trustedOrigins: [process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"],
});

export type Session = typeof auth.$Infer.Session.session;
export type User = typeof auth.$Infer.Session.user;
