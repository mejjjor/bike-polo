import { getGround } from "@/db/repositories/ground";
import Relaoad from "./Reload";
import FullScreen from "./FullScreen";
import TimerDisplay from "@/components/TimerDisplay";

export default async function Stream({
  params,
}: {
  params: Promise<{ slug: number }>;
}) {
  const { slug } = await params;

  const ground = await getGround(slug);

  if (!ground || !ground.isStreaming) {
    return (
      <FullScreen>
        <Relaoad />
      </FullScreen>
    );
  }

  return (
    <FullScreen>
      <div className="w-screen h-screen ">
        <div className=" flex items-center justify-between gap-2 rounded-md border p-4 text-center">
          <div className="flex-1">
            <div className="font-bold">{ground.teamA}</div>
            <div>{ground.teamAScore}</div>
          </div>
          <div className="space-y-1">
            <div className="text-sm font-medium leading-none">
              <TimerDisplay ground={ground} withTimerDisplay />
            </div>
          </div>
          <div className="flex-1">
            <div className="font-bold">{ground.teamB}</div>
            <div>{ground.teamBScore}</div>
          </div>
        </div>
        <Relaoad />
      </div>
    </FullScreen>
  );
}
