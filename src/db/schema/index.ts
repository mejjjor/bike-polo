import { user } from "./auth";
import { groundSchema, tournamentSchema } from "./business";

export type User = typeof user.$inferSelect;
export type Ground = typeof groundSchema.$inferSelect;
export type Tournament = typeof tournamentSchema.$inferSelect;
