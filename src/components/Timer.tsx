"use client";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { Button } from "./ui/button";
import TimerDisplay from "./TimerDisplay";
import { Ground } from "@/db/schema";

const getDateNow = () => new Date();

const Timer = ({
  ground,
  startTimer,
  pauseTimer,
  resumeTimer,
  resetTimer,
}: {
  ground: Ground;
  startTimer: (groundId: string, timerStartTime: Date) => Promise<void>;
  pauseTimer: (groundId: string, timerStopTime: Date) => Promise<void>;
  resumeTimer: (groundId: string, timerStartTime: Date) => Promise<void>;
  resetTimer: (groundId: string) => Promise<void>;
}) => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const handleStart = () => {
    startTransition(async () => {
      await startTimer(ground.id, getDateNow());
      router.refresh();
    });
  };

  const handlePause = () => {
    startTransition(async () => {
      await pauseTimer(ground.id, getDateNow());
      router.refresh();
    });
  };

  const handleResume = () => {
    startTransition(async () => {
      await resumeTimer(ground.id, getDateNow());
      router.refresh();
    });
  };

  const handleReset = () => {
    startTransition(async () => {
      await resetTimer(ground.id);
      router.refresh();
    });
  };

  return (
    <div className="flex flex-col gap-4 items-center">
      <TimerDisplay ground={ground} withTimerDisplay />

      <div className="flex gap-2">
        {ground.timerStatus === "initialed" ? (
          <Button
            onClick={handleStart}
            disabled={isPending}
            className="min-w-[80px]"
          >
            {isPending ? "Starting..." : "Start"}
          </Button>
        ) : (
          <>
            <Button
              onClick={
                ground.timerStatus === "started" ? handlePause : handleResume
              }
              disabled={isPending}
              className="min-w-[80px]"
            >
              {ground.timerStatus === "started" ? "Pause" : "Resume"}
            </Button>

            <Button
              onClick={handleReset}
              disabled={isPending}
              className="min-w-[80px]"
              variant="outline"
            >
              {"Reset"}
            </Button>
          </>
        )}
      </div>
    </div>
  );
};

export default Timer;
