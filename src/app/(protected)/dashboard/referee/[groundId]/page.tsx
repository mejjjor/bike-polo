import ScoreItem from "@/components/ScoreItem";
import SwitchStream from "@/components/SwitchStream";
import Timer from "@/components/Timer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  getGroundById,
  updateIsStreaming,
  updateTeamAName,
  updateTeamAScore,
  updateTeamBName,
  updateTeamBScore,
  startGame,
} from "@/db/repositories/ground";
import { routes } from "@/routes";
import { headers } from "next/headers";

export default async function RefereePage({
  params,
}: {
  params: Promise<{ groundId: string }>;
}) {
  const { groundId } = await params;
  const headersData = await headers();

  const ground = await getGroundById(groundId);

  const referer = headersData.get("referer");

  if (!referer) {
    return null;
  }

  const url = new URL(referer);
  const baseUrl = `${url.protocol}//${url.hostname}:${url.port}`;

  if (!ground) {
    return <div className="text-red-500">Ground not found</div>;
  }

  return (
    <div className="m-16 flex flex-col gap-16 max-w-lg">
      <div>
        <h1 className="text-2xl font-bold my-8">Score</h1>
        <Card className="">
          <CardContent className="py-2 flex">
            <ScoreItem
              name={ground.teamA}
              score={ground.teamAScore}
              updateName={async (name: string) => {
                "use server";
                updateTeamAName(groundId, name);
              }}
              updateScore={async (score: number) => {
                "use server";
                updateTeamAScore(groundId, score);
              }}
            />
            <div className="border" />
            <ScoreItem
              name={ground.teamB}
              score={ground.teamBScore}
              updateName={async (name: string) => {
                "use server";
                updateTeamBName(groundId, name);
              }}
              updateScore={async (score: number) => {
                "use server";
                updateTeamBScore(groundId, score);
              }}
            />
          </CardContent>
        </Card>
      </div>
      <div>
        <h1 className="text-2xl font-bold">Timer</h1>
        <Timer
          ground={ground}
          startGame={async (groundId: string, date: Date) => {
            "use server";
            startGame(groundId, date);
          }}
          pauseGame={async (groundId: string) => {
            "use server";
            startGame(groundId);
          }}
          resetGame={async (groundId: string) => {
            "use server";
            startGame(groundId);
          }}
        />
      </div>
      <div>
        <h1 className="text-2xl font-bold my-8">Stream</h1>
        <div className="flex flex-col gap-4">
          <a
            className="underline"
            target="_blank"
            href={`${baseUrl}${routes.stream}/${ground.slug}`}
          >
            Url : {`${baseUrl}${routes.stream}/${ground.slug}`}
          </a>
          <SwitchStream
            checked={ground.isStreaming}
            onCheckedChange={async (checked) => {
              "use server";
              updateIsStreaming(groundId, checked);
            }}
          />
        </div>
      </div>
    </div>
  );
}
