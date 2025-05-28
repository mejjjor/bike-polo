"use client";
import { useRouter } from "next/navigation";
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import { TimePicker } from "./ui/timePicker";
import { useState } from "react";

type TimerEditorProps = {
  timerDuration: number;
  updateTimer: (duration: number) => Promise<void>;
};

export default function TimerEditor({
  timerDuration = 720,
  updateTimer,
}: TimerEditorProps) {
  const [duration, setDuration] = useState<Date | undefined>(
    new Date(timerDuration * 1000)
  );
  const router = useRouter();

  return (
    <div className="flex m-4 p-4 justify-center items-center gap-4">
      <Label>Duration : </Label>
      <TimePicker date={duration} setDate={setDuration} />
      <Button
        onClick={async () => {
          if (duration) {
            await updateTimer(
              duration.getMinutes() * 60 + duration.getSeconds()
            );
          }
          router.refresh();
        }}
      >
        update
      </Button>
    </div>
  );
}
