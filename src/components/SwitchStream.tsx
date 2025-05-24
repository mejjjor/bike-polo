"use client";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { Switch } from "./ui/switch";

const SwitchStream = ({
  checked,
  onCheckedChange,
}: {
  checked: boolean;
  onCheckedChange: (checked: boolean) => Promise<void>;
}) => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  return (
    <div>
      Stream:{" "}
      <Switch
        disabled={isPending}
        checked={checked}
        onCheckedChange={(checked) => {
          startTransition(async () => {
            await onCheckedChange(checked);
            router.refresh();
          });
        }}
      />
    </div>
  );
};

export default SwitchStream;
