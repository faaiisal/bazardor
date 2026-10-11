import { betterAuth } from "better-auth";
import { Kysely } from "kysely";
import { DatabaseSync } from "node:sqlite";
import { LibsqlDialect } from "@libsql/kysely-libsql";
import { NodeSqliteDialect } from "@better-auth/kysely-adapter/node-sqlite-dialect";

if (process.env.NODE_ENV === "production" && !process.env.BETTER_AUTH_SECRET) {
  throw new Error(
    "Set BETTER_AUTH_SECRET before building or running BazarDor in production."
  );
}

const database = new Kysely({
  dialect: process.env.DATABASE_URL
    ? new LibsqlDialect({
        url: process.env.DATABASE_URL,
        authToken: process.env.DATABASE_AUTH_TOKEN,
      })
    : new NodeSqliteDialect({
        database: new DatabaseSync(
          process.env.SQLITE_DATABASE_PATH || "./bazardor.sqlite"
        ),
      }),
});

const googleConfigured =
  process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET;
const githubConfigured =
  process.env.GITHUB_CLIENT_ID && process.env.GITHUB_CLIENT_SECRET;

export const auth = betterAuth({
  baseURL: process.env.BETTER_AUTH_URL || "http://localhost:3000",
  secret: process.env.BETTER_AUTH_SECRET,
  database: { db: database, type: "sqlite" },
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: false,
    autoSignIn: false,
    minPasswordLength: 8,
  },
  socialProviders: {
    ...(googleConfigured && {
      google: {
        clientId: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      },
    }),
    ...(githubConfigured && {
      github: {
        clientId: process.env.GITHUB_CLIENT_ID,
        clientSecret: process.env.GITHUB_CLIENT_SECRET,
      },
    }),
  },
});
