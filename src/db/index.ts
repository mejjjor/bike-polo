import { drizzle as drizzleProd } from "drizzle-orm/neon-http";
import { drizzle as drizzleDev } from "drizzle-orm/node-postgres";

import * as authSchema from "./schema/auth";
import * as businessSchema from "./schema/business";

const schema = {
  ...authSchema,
  ...businessSchema,
};

export const db =
  process.env.NODE_ENV === "production"
    ? drizzleProd({
        connection: process.env.DATABASE_URL!,
        casing: "snake_case",
        schema,
      })
    : drizzleDev({
        connection: process.env.DATABASE_URL!,
        casing: "snake_case",
        schema,
      });
