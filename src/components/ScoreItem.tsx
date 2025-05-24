"use client";
import LabelEditor from "@/components/LabelEditor";
import { Button } from "@/components/ui/button";
import { Minus, Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { useTransition } from "react";

const ScoreItem = ({
  name,
  updateName,
  score,
  updateScore,
}: {
  name: string;
  updateName: (name: string) => Promise<void>;
  score: number;
  updateScore: (score: number) => Promise<void>;
}) => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  return (
    <div className="flex-1 flex flex-col gap-4 mx-8 ">
      <LabelEditor value={name} onValidate={updateName}>
        <h2 className="text-xl font-bold">{name}</h2>
      </LabelEditor>
      <div className="flex items-center justify-start gap-4">
        <Button
          disabled={isPending}
          onClick={() => {
            startTransition(async () => {
              await updateScore(score - 1);
              router.refresh();
            });
          }}
        >
          <Minus strokeWidth={2.5} />
        </Button>
        <div className="text-xl font-bold">{score}</div>
        <Button
          disabled={isPending}
          onClick={() => {
            startTransition(async () => {
              await updateScore(score + 1);
              router.refresh();
            });
          }}
        >
          <Plus strokeWidth={2.5} />
        </Button>
      </div>
    </div>
  );
};

export default ScoreItem;
