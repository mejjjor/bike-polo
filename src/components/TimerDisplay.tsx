"use client";
import { Ground } from "@/db/schema";
import { cn, formatSecondsToTime } from "@/lib/utils";
import { useState, useEffect, useRef } from "react";

const getDateNow = () => new Date();

const TimerDisplay = ({
  ground,
  withTimerDisplay,
}: {
  ground: Ground;
  className?: string;
  withTimerDisplay?: boolean;
}) => {
  const [isClient, setIsClient] = useState(false);

  const getTotalSeconds = (ground: Ground): number => {
    switch (ground.timerStatus) {
      case "started":
        if (ground.timerStartTime) {
          const toSubstract =
            (getDateNow().getTime() - ground.timerStartTime.getTime()) / 1000;
          return (
            ground.timerDuration -
            Math.floor(toSubstract) -
            Math.floor(ground.timerOffset)
          );
        }
        return ground.timerDuration;
      case "paused":
        return ground.timerDuration - Math.floor(ground.timerOffset);

      case "initialed":
      default:
        return ground.timerDuration;
    }
  };

  const getDisplayTime = (ground: Ground): string => {
    const totalSeconds = getTotalSeconds(ground);
    return formatSecondsToTime(totalSeconds);
  };

  const [totalSeconds, setTotalSeconds] = useState(getTotalSeconds(ground));
  const [displayTime, setDisplayTime] = useState(getDisplayTime(ground));

  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const updateDisplayTime = () => {
    const totalSeconds = getTotalSeconds(ground);
    setTotalSeconds(totalSeconds);
    setDisplayTime(getDisplayTime(ground));
  };

  useEffect(() => {
    setIsClient(true);
    updateDisplayTime();

    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    intervalRef.current = setInterval(updateDisplayTime, 500);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [ground.timerStatus, ground.timerDuration]);

  return (
    <div
      className={cn({
        "text-red-500": totalSeconds <= 0,
        "text-4xl font-mono font-bold text-center p-4 bg-gray-100 rounded-lg min-w-[200px] min-h-[72px]":
          withTimerDisplay,
      })}
    >
      {isClient && displayTime}
    </div>
  );
};

export default TimerDisplay;
