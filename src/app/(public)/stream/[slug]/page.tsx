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
      <div className="relative max-w-[767px] font-scoreboard text-7xl text-white p-4">
        <div className="absolute inset-0 bg-black opacity-80 z-0 " />

        <div className="relative z-10 w-full h-full flex flex-col text-amber-200 neon-text-yellow">
          <div className="flex">
            <div className="w-[280px] text-center font-lightdot text-red-400 neon-text-red">
              {ground.teamAScore}
            </div>
            <TimerDisplay ground={ground} withTimerDisplay />
            <div className="w-[280px] text-center font-lightdot text-red-400 neon-text-red">
              {ground.teamBScore}
            </div>
          </div>

          <div className="mt-8 text-5xl flex justify-between w-full text-center items-center break-words">
            <div className="w-[280px]">{ground.teamA}</div>
            <div className="w-[280px]">{ground.teamB}</div>
          </div>
        </div>
        <Relaoad />
      </div>
    </FullScreen>
  );
}
