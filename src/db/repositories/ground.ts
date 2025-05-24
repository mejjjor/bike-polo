"use server";

import { db } from "@/db";
import { groundSchema } from "@/db/schema/business";
import { eq } from "drizzle-orm";

export const getGroundById = async (id: string) => {
  return await db.query.groundSchema.findFirst({
    where: (g, { eq }) => eq(g.id, id),
  });
};

export const getGround = async (slug: number) => {
  return await db.query.groundSchema.findFirst({
    where: (g, { eq }) => eq(g.slug, slug),
  });
};

export const deleteGround = async (id: string) => {
  return await db.delete(groundSchema).where(eq(groundSchema.id, id));
};

export const createGround = async ({
  name,
  tournamentId,
  timerDuration,
}: {
  name: string;
  tournamentId: string;
  timerDuration: string;
}) => {
  return await db
    .insert(groundSchema)
    .values({ name, timerDuration, tournamentId });
};

export const updateGroundName = async (groundId: string, name: string) => {
  return await db
    .update(groundSchema)
    .set({ name })
    .where(eq(groundSchema.id, groundId));
};

export const updateTeamAName = async (groundId: string, name: string) => {
  return await db
    .update(groundSchema)
    .set({ teamA: name })
    .where(eq(groundSchema.id, groundId));
};

export const updateTeamBName = async (groundId: string, name: string) => {
  return await db
    .update(groundSchema)
    .set({ teamB: name })
    .where(eq(groundSchema.id, groundId));
};

export const updateTeamAScore = async (groundId: string, score: number) => {
  return await db
    .update(groundSchema)
    .set({ teamAScore: score })
    .where(eq(groundSchema.id, groundId));
};

export const updateTeamBScore = async (groundId: string, score: number) => {
  return await db
    .update(groundSchema)
    .set({ teamBScore: score })
    .where(eq(groundSchema.id, groundId));
};

export const updateIsStreaming = async (
  groundId: string,
  isStreaming: boolean
) => {
  return await db
    .update(groundSchema)
    .set({ isStreaming })
    .where(eq(groundSchema.id, groundId));
};

export const startGame = async (groundId: string, date: Date) => {
  return await db
    .update(groundSchema)
    .set({ timerStartTime: date, timerStatus: true, gameStatus: true })
    .where(eq(groundSchema.id, groundId));
};
