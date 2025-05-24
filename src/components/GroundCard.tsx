import { Copy, Podcast, Shield } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import { GroundDropdownMenu } from "./GroundDropdown";
import { routes } from "@/routes";
import LabelEditor from "./LabelEditor";
import { updateGroundNameAction } from "@/action";

type CardProps = React.ComponentProps<typeof Card> & {
  name: string;
  teamA: string;
  teamB: string;
  teamAScore: number;
  teamBScore: number;
  timerDuration: number;
  timerStartTime: Date | null;
  timerStatus: "initialed" | "started" | "paused";
  url: string;
  gameStatus: boolean;
  id: string;
};

export default function GroundCard({
  className,
  name,
  teamA,
  teamB,
  teamAScore,
  teamBScore,
  timerDuration,
  url,
  id,
  ...props
}: CardProps) {
  return (
    <Card className={cn("w-[320px]", className)} {...props}>
      <CardHeader className="flex flex-row items-center justify-between pb-2 border-b-2 border-gray-300 h-16">
        <CardTitle className="mt-1.5 flex-1">
          <LabelEditor
            value={name}
            onValidate={async (name) => {
              "use server";
              updateGroundNameAction({
                id,
                name,
              });
            }}
          >
            {name}
          </LabelEditor>
        </CardTitle>
        <div className="flex justify-end items-center gap-2 ">
          <GroundDropdownMenu groundId={id} />
        </div>
      </CardHeader>
      <CardContent className="grid gap-4 pt-4">
        <div className=" flex flex-col gap-2 rounded-md border p-4">
          <div className="flex justify-between items-center">
            <Podcast size={32} />
            <p className="text-sm font-medium ">
              <Link href={url} target="_blank" className="underline">
                Watch scoregame
              </Link>
            </p>
            <Copy />
          </div>
        </div>
        <div className=" flex items-center justify-between gap-2 rounded-md border p-4 text-center">
          <div className="flex-1">
            <div className="font-bold">{teamA}</div>
            <div>{teamAScore}</div>
          </div>
          <div className="">vs</div>
          <div className="flex-1">
            <div className="font-bold">{teamB}</div>
            <div>{teamBScore}</div>
          </div>
        </div>
        <div>
          <div className="mb-4 grid grid-cols-[20px_1fr] items-start pb-4 last:mb-0 last:pb-0 gap-2">
            <span className="flex h-2 w-2 translate-y-1 rounded-full bg-sky-500" />
            <div className="space-y-1">
              <p className="text-sm font-medium leading-none">
                game duration : {timerDuration}
              </p>
            </div>
            <span className="flex h-2 w-2 translate-y-1 rounded-full bg-sky-500" />
            <div className="space-y-1">
              <p className="text-sm font-medium leading-none">
                timer : {timerDuration}
              </p>
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex items-center justify-between space-x-2">
        <Button asChild className="w-full">
          <Link href={routes.referee(id)}>
            <Shield /> Referee this game
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
