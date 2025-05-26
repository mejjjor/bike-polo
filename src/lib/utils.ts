import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const formatSecondsToTime = (_totalSeconds: number): string => {
  const totalSeconds = Math.abs(_totalSeconds);

  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  return [minutes, seconds]
    .map((num) => num.toString().padStart(2, "0"))
    .join(":");
};
