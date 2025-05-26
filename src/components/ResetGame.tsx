"use client";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { Button } from "./ui/button";

const ResetGame = ({ onClick }: { onClick: () => Promise<void> }) => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  return (
    <div>
      <Button
        disabled={isPending}
        onClick={() => {
          startTransition(async () => {
            await onClick();
            router.refresh();
          });
        }}
      >
        Reset game
      </Button>
    </div>
  );
};

export default ResetGame;
