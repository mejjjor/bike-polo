"use client";
import { CirclePlus } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import Form from "next/form";
import { Label } from "./ui/label";
import { TimePicker } from "./ui/timePicker";
import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { createGround } from "@/db/repositories/ground";
import { toast } from "sonner";

type CardProps = React.ComponentProps<typeof Card> & {
  tournamentId: string;
};

export default function GroundCardCreation({
  className,
  tournamentId,
  ...props
}: CardProps) {
  const router = useRouter();

  const [duration, setDuration] = useState<Date | undefined>(
    new Date("01-01-01-00:12:00")
  );

  const [isPending, startTransition] = useTransition();

  const onSubmit = (formData: FormData) => {
    const name = formData.get("name")?.toString();

    if (!name) {
      toast.error("Please provide a name for the ground.");
      return;
    }

    if (!duration) {
      toast.error("Please provide a valid duration for the ground.");
      return;
    }

    startTransition(async () => {
      await createGround({
        name,
        timerDuration: duration.getMinutes() * 60 + duration.getSeconds(),
        tournamentId,
      });
      router.refresh();
    });
  };

  return (
    <Card
      className={cn("w-[320px] h-full flex flex-col", className)}
      {...props}
    >
      <CardHeader className="flex flex-row items-center justify-between pb-2 border-b-2 border-gray-300 h-16">
        <CardTitle>
          <div className="mt-1.5">Create new ground</div>
        </CardTitle>
      </CardHeader>
      <Form
        action={onSubmit}
        className="flex-1 flex flex-col justify-between gap-4 pt-4"
      >
        <CardContent className="flex flex-col flex-1  gap-4 pt-2">
          <Label htmlFor="name">Name : </Label>
          <Input id="name" name="name" placeholder="A ground name" />
          <Label htmlFor="duration">Duration : </Label>
          <TimePicker date={duration} setDate={setDuration} />
        </CardContent>
        <CardFooter className="flex items-center justify-between space-x-2">
          <Button
            variant="outline"
            type="submit"
            className="w-full"
            disabled={isPending}
          >
            <CirclePlus /> {isPending ? "Creating..." : "Create"}
          </Button>
        </CardFooter>
      </Form>
    </Card>
  );
}
