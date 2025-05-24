import { Rock_Salt } from "next/font/google";
import { cn } from "@/lib/cn";
import Link from "next/link";
import { routes } from "@/routes";

const rockSalt = Rock_Salt({ weight: "400", subsets: ["latin"] });

export default function Title({
  size,
  className,
}: {
  size?: "small";
  className?: string;
}) {
  return (
    <Link href={routes.dashboard} className={className}>
      <h1
        className={cn(
          "flex flex-col lg:text-7xl text-4xl p-8 lg:p-16 mt-40 lg:mt-48 mb-16 text-center gap-12",
          rockSalt.className,
          {
            "lg:text-xl text-lg gap-2 m-2 lg:m-2 p-1 lg:p-2": size === "small",
          }
        )}
      >
        <div>BIKE POLO</div>
        <div>REFERER</div>
      </h1>
    </Link>
  );
}
