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

  const [minutes, seconds] = displayTime.split(":");

  return (
    <div
      style={{ fontFamily: "Lightdot", fontSize: "32px" }}
      className={cn({
        "text-red-500 animate-blink": totalSeconds <= 0,

        "text-4xl font-mono self-center w-[175px] text-center":
          withTimerDisplay,
      })}
    >
      {isClient && (
        <div className="flex text-center">
          <div className=" flex">
            {minutes.split("").map((char, i) => (
              <span key={i} className="inline-block w-[1.25ch] text-center">
                {char}
              </span>
            ))}
          </div>
          <div className="min-w-[1.25ch]">:</div>
          <div className=" flex">
            {seconds.split("").map((char, i) => (
              <span key={i} className="inline-block w-[1.25ch] text-center">
                {char}
              </span>
            ))}
          </div>
        </div>
      )}
      <div className="text-lg w-[175px] text-center">
        {totalSeconds <= 0 ? " Finished" : ""}&nbsp;
      </div>
    </div>
  );
};

export default TimerDisplay;
