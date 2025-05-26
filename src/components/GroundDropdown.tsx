"use client";

import * as React from "react";
import { EllipsisVertical, Trash } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useRouter } from "next/navigation";
import { deleteGround } from "@/db/repositories/ground";

export function GroundDropdownMenu({ groundId }: { groundId: string }) {
  const [open, setOpen] = React.useState(false);
  const [, startTransition] = React.useTransition();
  const router = useRouter();

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <div role="button">
          <EllipsisVertical />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[200px]">
        <DropdownMenuGroup>
          <DropdownMenuItem
            className="text-red-600"
            onClick={() => {
              startTransition(async () => {
                await deleteGround(groundId);
                router.refresh();
              });
            }}
          >
            <Trash />
            Delete
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
