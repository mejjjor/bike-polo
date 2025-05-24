"use server";

import {
  deleteGround,
  createGround,
  updateGroundName,
} from "./db/repositories/ground";
import { updateTournamentName } from "./db/repositories/tournament";

export const deleteGroundAction = async (id: string) => {
  await deleteGround(id);
};

export const createGroundAction = async ({
  name,
  tournamentId,
  timerDuration,
}: {
  name: string;
  tournamentId: string;
  timerDuration: string;
}) => {
  await createGround({
    name,
    tournamentId,
    timerDuration,
  });
};

export const updateTournamentNameAction = async ({
  id,
  name,
}: {
  id: string;
  name: string;
}) => {
  await updateTournamentName(id, name);
};

export const updateGroundNameAction = async ({
  id,
  name,
}: {
  id: string;
  name: string;
}) => {
  await updateGroundName(id, name);
};
