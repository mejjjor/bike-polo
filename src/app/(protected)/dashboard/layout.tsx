"use client";

import BreadcrumbComponent from "@/components/Breadcrumb";
import Title from "@/components/Title";
import { Button } from "@/components/ui/button";
import { signOut } from "@/lib/auth-client";
import { redirect, usePathname } from "next/navigation";

export default function Protectedlayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();

  return (
    <div className="grid grid-rows-[1fr_6fr] min-h-svh max-w-screen p-2 lg:p-8 ">
      <div className="flex justify-between items-center border-b-2 border-gray-300">
        <div className="border-r-2 border-gray-300 h-full flex items-center">
          <Title size="small" />
        </div>
        <Button
          className="m-3"
          onClick={async () => {
            await signOut();
            redirect("/");
          }}
        >
          logout
        </Button>
      </div>
      <div>
        <div className="p-4">
          <BreadcrumbComponent path={pathname} />
          {children}
        </div>
      </div>
    </div>
  );
}
