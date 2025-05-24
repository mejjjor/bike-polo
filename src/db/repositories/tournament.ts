import { db } from "@/db";
import { eq, InferSelectModel, SQLWrapper } from "drizzle-orm";
import { groundSchema, tournamentSchema } from "@/db/schema/business";

type TournamentWithGrounds = InferSelectModel<typeof tournamentSchema> & {
  grounds: InferSelectModel<typeof groundSchema>[];
};

type OrderHelpers = {
  asc: (val: SQLWrapper) => unknown;
  desc: (val: SQLWrapper) => unknown;
};

export const getTournamentsWithGrounds = async (userId: string) => {
  return (await db.query.tournamentSchema.findMany({
    where: (t, { eq }) => eq(t.userId, userId),
    with: {
      grounds: {
        orderBy: (g: typeof groundSchema, { desc }: OrderHelpers) => [
          desc(g.id),
        ],
      },
    },
    orderBy: (tournamentSchema, { asc }) => [asc(tournamentSchema.createdAt)],
  })) as TournamentWithGrounds[];
};

export const updateTournamentName = async (
  tournamentId: string,
  name: string
) => {
  return await db
    .update(tournamentSchema)
    .set({ name })
    .where(eq(tournamentSchema.id, tournamentId));
};
