import ScoreItem from "@/components/ScoreItem";
import SwitchStream from "@/components/SwitchStream";
import Timer from "@/components/Timer";
import { Card, CardContent } from "@/components/ui/card";
import {
  getGroundById,
  updateGround,
  startTimer,
  pauseTimer,
  resumeTimer,
  resetTimer,
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
                await updateGround(groundId, { teamA: name });
              }}
              updateScore={async (score: number) => {
                "use server";
                await updateGround(groundId, { teamAScore: score });
              }}
            />
            <div className="border" />
            <ScoreItem
              name={ground.teamB}
              score={ground.teamBScore}
              updateName={async (name: string) => {
                "use server";
                await updateGround(groundId, { teamB: name });
              }}
              updateScore={async (score: number) => {
                "use server";
                await updateGround(groundId, { teamBScore: score });
              }}
            />
          </CardContent>
        </Card>
      </div>
      <div>
        <h1 className="text-2xl font-bold">Timer</h1>
        <Timer
          ground={ground}
          startTimer={async (groundId: string, timerStartTime: Date) => {
            "use server";
            await startTimer(groundId, timerStartTime);
          }}
          pauseTimer={async (groundId: string, timerStopTime: Date) => {
            "use server";
            await pauseTimer(groundId, timerStopTime);
          }}
          resumeTimer={async (groundId: string, timerStartTime: Date) => {
            "use server";
            await resumeTimer(groundId, timerStartTime);
          }}
          resetTimer={async (groundId: string) => {
            "use server";
            await resetTimer(groundId);
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
              await updateGround(groundId, { isStreaming: checked });
            }}
          />
        </div>
      </div>
    </div>
  );
}
