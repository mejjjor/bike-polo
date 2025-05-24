"use client";
import { useState, useEffect, useRef } from "react";

const getDateNow = () => new Date(new Date().setMilliseconds(0));

const TimerDisplay = ({
  ground,
}: {
  ground: {
    id: string;
    timerDuration: number;
    timerStartTime: Date | null;
    timerStatus: "initialed" | "started" | "paused";
    gameStatus: boolean;
    timerOffset: number;
  };
}) => {
  const formatSecondsToTime = (totalSeconds: number): string => {
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    return [minutes, seconds]
      .map((num) => num.toString().padStart(2, "0"))
      .join(":");
  };

  const getDisplayTime = (ground: {
    id: string;
    timerDuration: number;
    timerStartTime: Date | null;
    timerStatus: "initialed" | "started" | "paused";
    gameStatus: boolean;
    timerOffset: number;
  }): string => {
    switch (ground.timerStatus) {
      case "started":
        if (ground.timerStartTime) {
          const toSubstract =
            (getDateNow().getTime() - ground.timerStartTime.getTime()) / 1000;
          return formatSecondsToTime(
            ground.timerDuration - toSubstract - ground.timerOffset
          );
        }
        return formatSecondsToTime(ground.timerDuration);
      case "paused":
        return formatSecondsToTime(ground.timerDuration - ground.timerOffset);

      case "initialed":
      default:
        return formatSecondsToTime(ground.timerDuration);
    }
  };

  const [displayTime, setDisplayTime] = useState<string>(
    getDisplayTime(ground)
  );

  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const updateDisplayTime = () => {
    setDisplayTime(getDisplayTime(ground));
  };
  useEffect(() => {
    intervalRef.current = setInterval(updateDisplayTime, 500);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [ground.timerStatus]);

  return (
    <div className="text-4xl font-mono font-bold text-center p-4 bg-gray-100 rounded-lg min-w-[200px]">
      {displayTime}
    </div>
  );
};

export default TimerDisplay;
