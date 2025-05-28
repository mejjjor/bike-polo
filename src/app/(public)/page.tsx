import Image from "next/image";
import { Button } from "@/components/ui/button";
import { CornerUpRight, LogIn } from "lucide-react";
import Link from "next/link";
import Title from "@/components/Title";
import { routes } from "@/routes";

export default function Home() {
  return (
    <div className="grid grid-rows-[7fr_1fr] min-h-svh p-2 lg:p-8">
      <main className="grid-rows-1">
        <Title />
        <div className="flex gap-16 justify-center">
          <Button
            asChild
            className="h-auto text-2xl [&_svg]:size-4 gap-2 lg:text-4xl lg:[&_svg]:size-8 lg:gap-4"
          >
            <Link href={routes.signin}>
              <LogIn />
              Sign in
            </Link>
          </Button>
          <Button
            asChild
            className="h-auto text-2xl [&_svg]:size-4 gap-2 lg:text-4xl lg:[&_svg]:size-8 lg:gap-4"
            variant="outline"
          >
            <Link href={routes.signup}>
              <CornerUpRight /> Sign up
            </Link>
          </Button>
        </div>
      </main>
      <footer className="grid-rows-2 flex flex-col items-center justify-end gap-2">
        <div>Made with ♥️ in Toulouse</div>
        <div className="flex gap-4">
          Erik Aouizerate
          <a target="_blank" href="https://github.com/erikAouizerate/bike-polo">
            <Image
              src="/github.svg"
              alt="github repository"
              width={24}
              height={20}
            />
          </a>
        </div>
      </footer>
    </div>
  );
}
