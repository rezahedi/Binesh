import { StreakButton } from "@application/components";
import Image from "next/image";
import Link from "next/link";
// import { getServerSession } from "next-auth/next";
// import { authOptions } from "@/lib/auth";

export default async function Header() {
  // const session = await getServerSession(authOptions);

  return (
    <header className="sticky top-0 bg-background w-full shadow-lg z-10">
      <div className="container max-w-7xl px-2 py-1 mx-auto flex gap-2 items-center">
        <h1>
          <Link href="/" className="flex gap-1 items-center hover:text-primary">
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
              <a
                href={process.env.NEXT_PUBLIC_APP_BASE}
                className="p-3 px-6 rounded-full hover:bg-secondary"
              >
                Home
              </a>
            </li>
            <li>
              <a
                href={`${process.env.NEXT_PUBLIC_APP_BASE}/courses`}
                className="p-3 px-6 rounded-full hover:bg-secondary"
              >
                Courses
              </a>
            </li>
          </ul>
        </nav>
        <div className="flex gap-2 items-center">
          <StreakButton />
          <button className="text-base p-2 px-6 rounded-full border border-primary text-primary cursor-pointer">
            Login
          </button>
          <button className="text-base p-2 px-6 rounded-full bg-primary text-primary-foreground cursor-pointer">
            Register
          </button>
        </div>
      </div>
    </header>
  );
}
