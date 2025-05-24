"use client";
import { Check, Pencil, X } from "lucide-react";
import { useRef, useState, useTransition, useEffect } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";

export default function LabelEditor({
  className = "",
  children,
  value,
  onValidate = async () => {},
}: {
  className?: string;
  value: string;
  children: React.ReactNode;
  onValidate: (value: string) => Promise<void>;
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [isPending, startTransition] = useTransition();

  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  // Focus input when editing starts
  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [isEditing]);

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSave();
    } else if (e.key === "Escape") {
      handleCancel();
    }
  };

  const handleSave = () => {
    const newValue = inputRef.current?.value?.trim() || "";
    if (newValue === value) {
      setIsEditing(false);
      return;
    }

    startTransition(async () => {
      try {
        await onValidate(newValue);
        router.refresh();
        setIsEditing(false);
      } catch (error) {
        console.error("Failed to save:", error);
        // Optionally show error message to user
      }
    });
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  if (isEditing) {
    return (
      <div className={`flex items-center gap-1 w-full p-1 ${className}`}>
        <Input
          ref={inputRef}
          className="flex-1 min-w-0 h-8 px-2 text-sm"
          defaultValue={value}
          onKeyDown={onKeyDown}
          disabled={isPending}
        />
        <div className="flex items-center gap-1 shrink-0">
          <Button
            variant="ghost"
            size="sm"
            className="h-8 w-8 p-0"
            onClick={handleSave}
            disabled={isPending}
          >
            <Check className="h-4 w-4 text-green-600" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="h-8 w-8 p-0"
            onClick={handleCancel}
            disabled={isPending}
          >
            <X className="h-4 w-4 text-red-600" />
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className={`flex items-center gap-1 w-full p-1 group ${className}`}>
      <div className="flex-1 min-w-0">{children}</div>
      <Button
        variant="ghost"
        size="sm"
        className="h-8 w-8 p-0 opacity-0 group-hover:opacity-100 transition-opacity shrink-0"
        onClick={handleEdit}
      >
        <Pencil className="h-4 w-4 text-gray-500" />
      </Button>
    </div>
  );
}
