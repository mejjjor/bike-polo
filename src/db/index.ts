import { drizzle } from "drizzle-orm/neon-http";

import * as authSchema from "./schema/auth";
import * as businessSchema from "./schema/business";

export const db = drizzle({
  connection: process.env.DATABASE_URL!,
  casing: "snake_case",
  schema: {
    ...authSchema,
    ...businessSchema,
  },
});
