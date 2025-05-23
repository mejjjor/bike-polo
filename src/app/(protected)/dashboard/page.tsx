"use client";

import { Button } from "@/components/ui/button";
import { signOut } from "@/lib/auth-client";
import { redirect } from "next/navigation";

export default function Dashbaord() {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-4xl font-bold">Dashboard</h1>
      <p className="mt-4 text-lg">Welcome to the dashboard!</p>
      <Button
        onClick={async () => {
          await signOut();
          redirect("/");
        }}
      >
        Sign out
      </Button>
    </div>
  );
}
