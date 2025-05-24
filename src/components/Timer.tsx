"use client";
import { useRouter } from "next/navigation";
import { useTransition, useState, useEffect, useRef } from "react";
import { Button } from "./ui/button";

const Timer = ({
  ground,
  startGame,
  pauseGame,
  resetGame,
}: {
  ground: {
    id: string;
    timerDuration: string; // "00:12:00" format
    timerStartTime: Date | null;
    timerStatus: boolean; // true when timer is running
    gameStatus: boolean; // true when game is active
    timerPausedDuration: string; // "00:00:00" format - accumulated paused time
  };
  startGame: (groundId: string, date: Date) => Promise<void>;
  pauseGame: (groundId: string) => Promise<void>;
  resetGame: (groundId: string) => Promise<void>;
}) => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [displayTime, setDisplayTime] = useState<string>("00:00");
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Parse time string "HH:MM:SS" to total seconds
  const parseTimeToSeconds = (timeStr: string): number => {
    const [hours, minutes, seconds] = timeStr.split(":").map(Number);
    return hours * 3600 + minutes * 60 + seconds;
  };

  // Format seconds to "HH:MM:SS" string
  const formatSecondsToTime = (totalSeconds: number): string => {
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    return [minutes, seconds]
      .map((num) => num.toString().padStart(2, "0"))
      .join(":");
  };

  // Calculate remaining time
  const calculateRemainingTime = (): number => {
    if (!ground.timerStartTime || !ground.gameStatus) {
      return parseTimeToSeconds(ground.timerDuration);
    }

    const now = new Date();
    const startTime = new Date(ground.timerStartTime);
    const elapsedMs = now.getTime() - startTime.getTime();
    const elapsedSeconds = Math.floor(elapsedMs / 1000);

    // Subtract paused duration from elapsed time
    const pausedSeconds = parseTimeToSeconds(ground.timerPausedDuration);
    const actualElapsedSeconds = elapsedSeconds - pausedSeconds;

    const totalDurationSeconds = parseTimeToSeconds(ground.timerDuration);
    const remainingSeconds = Math.max(
      0,
      totalDurationSeconds - actualElapsedSeconds
    );

    return remainingSeconds;
  };

  // Update display time
  useEffect(() => {
    const updateDisplayTime = () => {
      const remaining = calculateRemainingTime();
      setDisplayTime(formatSecondsToTime(remaining));

      // If time is up and timer is running, you might want to handle game end
      if (remaining === 0 && ground.timerStatus) {
        // Handle game end logic here if needed
        console.log("Time's up!");
      }
    };

    updateDisplayTime();

    // Set up interval only if timer is running
    if (ground.timerStatus && ground.gameStatus) {
      intervalRef.current = setInterval(updateDisplayTime, 1000);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    }

    // Cleanup interval on unmount
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [
    ground.timerStatus,
    ground.gameStatus,
    ground.timerStartTime,
    ground.timerPausedDuration,
  ]);

  const handleStart = () => {
    startTransition(async () => {
      const date = new Date();
      await startGame(ground.id, date);
      router.refresh();
    });
  };

  const handlePause = () => {
    startTransition(async () => {
      await pauseGame(ground.id);
      router.refresh();
    });
  };

  const handleReset = () => {
    startTransition(async () => {
      await resetGame(ground.id);
      router.refresh();
    });
  };

  return (
    <div className="flex flex-col gap-4 items-center">
      {/* Timer Display */}
      <div className="text-4xl font-mono font-bold text-center p-4 bg-gray-100 rounded-lg min-w-[200px]">
        {displayTime}
      </div>

      {/* Control Buttons */}
      <div className="flex gap-2">
        {!ground.gameStatus ? (
          // Game not started - show only Start button
          <Button
            onClick={handleStart}
            disabled={isPending}
            className="min-w-[80px]"
          >
            {isPending ? "Starting..." : "Start"}
          </Button>
        ) : (
          // Game is active - show Start/Pause and Reset buttons
          <>
            <Button
              onClick={ground.timerStatus ? handlePause : handleStart}
              disabled={isPending}
              className="min-w-[80px]"
              variant={ground.timerStatus ? "secondary" : "default"}
            >
              {isPending
                ? ground.timerStatus
                  ? "Pausing..."
                  : "Resuming..."
                : ground.timerStatus
                ? "Pause"
                : "Resume"}
            </Button>

            <Button
              onClick={handleReset}
              disabled={isPending}
              className="min-w-[80px]"
              variant="outline"
            >
              {isPending ? "Resetting..." : "Reset"}
            </Button>
          </>
        )}
      </div>

      {/* Status Display */}
      <div className="text-sm text-gray-600 text-center">
        {!ground.gameStatus && "Ready to start"}
        {ground.gameStatus && ground.timerStatus && "Timer running"}
        {ground.gameStatus && !ground.timerStatus && "Timer paused"}
      </div>
    </div>
  );
};

export default Timer;
