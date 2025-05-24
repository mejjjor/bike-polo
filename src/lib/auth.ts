import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { createAuthMiddleware } from "better-auth/api";

import { db } from "@/db"; // your drizzle instance
import * as schema from "@/db/schema/auth";
import { groundSchema, tournamentSchema } from "@/db/schema/business";

export const auth = betterAuth({
  database: drizzleAdapter(db, { schema, provider: "pg" }),
  emailAndPassword: {
    enabled: true,
  },
  hooks: {
    after: createAuthMiddleware(async (ctx) => {
      if (ctx.path.startsWith("/sign-up")) {
        const newSession = ctx.context.newSession;
        if (newSession) {
          const tournaments = await db
            .insert(tournamentSchema)
            .values({
              name: "Mon tournoi",
              userId: newSession.user.id,
            })
            .returning();

          await db
            .insert(groundSchema)
            .values({ name: "Terrain 1", tournamentId: tournaments[0].id });
        }
      }
    }),
  },
});
