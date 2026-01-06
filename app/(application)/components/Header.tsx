import { StreakButton } from "@application/components";
import { UserButton } from "@stackframe/stack";
import Image from "next/image";
import Link from "next/link";
import PointsButton from "./PointsButton";
import NavBar from "./NavBar";

export default function Header() {
  if (!process.env.NEXT_PUBLIC_APP_BASE)
    throw new Error("NEXT_PUBLIC_APP_BASE is not set");

  return (
    <header className="sticky top-0 bg-background w-full shadow-lg z-10">
      <div className="container max-w-7xl px-2 py-1 mx-auto flex gap-3 items-center">
        <h1 className="hidden sm:block">
          <Link
            href={`${process.env.NEXT_PUBLIC_APP_BASE}`}
            className="flex gap-1 items-center hover:text-primary"
          >
            <Image
              src="/assets/binesh-logo.svg"
              width={50}
              height={50}
              alt="Binesh Logo"
            />
            <div className="text-3xl font-bold hidden sm:block">Binesh</div>
          </Link>
        </h1>
        <NavBar className="grow" />
        <div className="flex gap-2 items-center">
          <PointsButton />
          <StreakButton />
          <UserButton />
        </div>
      </div>
    </header>
  );
}
