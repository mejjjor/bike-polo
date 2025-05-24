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
  timerDuration: number;
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

export async function startTimer(groundId: string, timerStartTime: Date) {
  try {
    await db
      .update(groundSchema)
      .set({
        timerStatus: "started",
        timerStartTime,
        timerOffset: 0,
        gameStatus: true,
      })
      .where(eq(groundSchema.id, groundId));
  } catch (error) {
    console.error("Error starting game:", error);
    throw error;
  }
}

export async function pauseTimer(groundId: string, timerStopTime: Date) {
  try {
    const ground = await getGroundById(groundId);

    if (!ground) {
      throw new Error("Error in pauseTimer, bad groundId: " + groundId);
    }

    if (!ground.timerStartTime) {
      throw new Error("Error in pauseTimer, no timerStartTime: " + groundId);
    }

    const offset =
      (timerStopTime.getTime() - ground.timerStartTime.getTime()) / 1000;

    await db
      .update(groundSchema)
      .set({
        timerStatus: "paused",
        timerOffset: ground.timerOffset + offset,
      })
      .where(eq(groundSchema.id, groundId));
  } catch (error) {
    console.error("Error pausing game:", error);
    throw error;
  }
}

export async function resumeTimer(groundId: string, timerStartTime: Date) {
  try {
    await db
      .update(groundSchema)
      .set({
        timerStatus: "started",
        timerStartTime,
      })
      .where(eq(groundSchema.id, groundId));
  } catch (error) {
    console.error("Error resuming game:", error);
    throw error;
  }
}

export async function resetTimer(groundId: string) {
  try {
    await db
      .update(groundSchema)
      .set({
        timerStatus: "initialed",
        timerStartTime: null,
        timerOffset: 0,
      })
      .where(eq(groundSchema.id, groundId));
  } catch (error) {
    console.error("Error resetting game:", error);
    throw error;
  }
}

export async function resetGame(groundId: string) {
  try {
    await db
      .update(groundSchema)
      .set({
        timerStatus: "initialed",
        gameStatus: false,
        timerStartTime: null,
        timerOffset: 0,
        teamAScore: 0,
        teamBScore: 0,
      })
      .where(eq(groundSchema.id, groundId));
  } catch (error) {
    console.error("Error resetting game:", error);
    throw error;
  }
}
