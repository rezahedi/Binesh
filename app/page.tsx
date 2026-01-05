import { stackServerApp } from "@stack/server";
import Image from "next/image";
import Link from "next/link";
import { buttonVariants } from "./components/ui/button";
import SloganBuilder from "./SloganBuilder";
import { cn } from "./utils/cn";

export default async function WebsitePage() {
  const user = await stackServerApp.getUser();

  return (
    <>
      <header className="sticky top-0 bg-background w-full shadow-lg z-10">
        <div className="container max-w-7xl px-2 py-4 mx-auto flex gap-3 items-center">
          <h1 className="hidden sm:block">
            <Link
              href={`${process.env.NEXT_PUBLIC_APP_BASE}`}
              className="flex gap-2 items-center hover:text-primary"
            >
              <Image
                src="/assets/binesh-logo.svg"
                width={50}
                height={50}
                alt="Binesh Logo"
              />
              <div className="text-3xl font-bold hidden sm:block">BINESH</div>
            </Link>
          </h1>
          <nav className="grow">
            <ul className="flex gap-1 justify-center text-lg">
              <li>
                <Link
                  href="#features"
                  className="block p-2 px-6 rounded-full hover:bg-muted"
                >
                  Features
                </Link>
              </li>
              <li>
                <Link
                  href="#how-it-works"
                  className="block p-2 px-6 rounded-full hover:bg-muted"
                >
                  How It Works
                </Link>
              </li>
              <li>
                <Link
                  href="#about"
                  className="block p-2 px-6 rounded-full hover:bg-muted"
                >
                  About
                </Link>
              </li>
            </ul>
          </nav>
          <div className="flex gap-2 items-center">
            <Link
              href={`${process.env.NEXT_PUBLIC_AUTH_HANDLER_BASE}/sign-in`}
              className={cn(
                buttonVariants({ variant: "outline" }),
                "border-muted-foreground shadow-none active:translate-0"
              )}
            >
              Sign in
            </Link>
          </div>
        </div>
      </header>
      <section className="text-center">
        <SloganBuilder />
      </section>
      <div>
        <h1>Website</h1>
        <p>
          <Link href={"/learn"}>Start Learning</Link>
        </p>
        <p>
          <Link href={"/dashboard"}>Admin Dashboard</Link>
        </p>
        {!user && (
          <>
            <Link href={`${process.env.NEXT_PUBLIC_AUTH_HANDLER_BASE}/sign-in`}>
              Sign in
            </Link>{" "}
            -
            <Link href={`${process.env.NEXT_PUBLIC_AUTH_HANDLER_BASE}/sign-up`}>
              Sign up
            </Link>
          </>
        )}
        {user && (
          <div>
            {user?.displayName}{" "}
            <Link
              href={`${process.env.NEXT_PUBLIC_AUTH_HANDLER_BASE}/sign-out`}
            >
              Sign out
            </Link>
          </div>
        )}
      </div>
    </>
  );
}
