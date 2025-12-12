import { StreakButton } from "@application/components";
import { UserButton, useUser } from "@stackframe/stack";
import Image from "next/image";
import Link from "next/link";
import PointsButton from "./PointsButton";

export default function Header() {
  const user = useUser();

  if (!process.env.NEXT_PUBLIC_APP_BASE)
    throw new Error("NEXT_PUBLIC_APP_BASE is not set");

  return (
    <header className="sticky top-0 bg-background w-full shadow-lg z-10">
      <div className="container max-w-7xl px-2 py-1 mx-auto flex gap-2 items-center">
        <h1>
          <Link
            href={process.env.NEXT_PUBLIC_APP_BASE}
            className="flex gap-1 items-center hover:text-primary"
          >
            <Image
              src="/assets/binesh-logo.svg"
              width={60}
              height={50}
              alt="Binesh Logo"
            />
            <div className="text-3xl font-bold">BINESH</div>
          </Link>
        </h1>
        <nav className="grow">
          <ul className="flex gap-1 justify-center text-lg">
            <li>
              <Link
                href={process.env.NEXT_PUBLIC_APP_BASE}
                className="p-3 px-6 rounded-full hover:bg-secondary"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                href={`${process.env.NEXT_PUBLIC_APP_BASE}/courses`}
                className="p-3 px-6 rounded-full hover:bg-secondary"
              >
                Courses
              </Link>
            </li>
          </ul>
        </nav>
        <div className="flex gap-2 items-center">
          <PointsButton />
          <StreakButton />
          {user ? (
            <UserButton />
          ) : (
            <>
              <Link href={"/handler/sign-in"}>
                <button className="text-base p-2 px-6 rounded-full border border-primary text-primary cursor-pointer">
                  Sign in
                </button>
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
