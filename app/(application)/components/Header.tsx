import { StreakButton } from "@application/components";
// import { getServerSession } from "next-auth/next";
// import { authOptions } from "@/lib/auth";

export default async function Header() {
  // const session = await getServerSession(authOptions);

  return (
    <header className="sticky top-0 bg-background w-full shadow-lg">
      <div className="container max-w-7xl py-2 mx-auto flex gap-2 items-center">
        <h1 className="flex gap-2 items-center">
          <div className="text-5xl">🛸</div>
          <div className="text-3xl uppercase font-bold pt-2">Binesh</div>
        </h1>
        <nav className="grow">
          <ul className="flex gap-1 justify-center text-lg">
            <li>
              <a
                href={process.env.NEXT_PUBLIC_APP_BASE}
                className="p-2 px-4 rounded-full hover:bg-secondary"
              >
                Home
              </a>
            </li>
            <li>
              <a
                href={`${process.env.NEXT_PUBLIC_APP_BASE}/courses`}
                className="p-2 px-4 rounded-full hover:bg-secondary"
              >
                Courses
              </a>
            </li>
          </ul>
        </nav>
        <div className="flex gap-2 items-center">
          <StreakButton />
          <button className="text-sm p-2 px-4 rounded-full border border-primary text-primary cursor-pointer">
            Login
          </button>
          <button className="text-sm p-2 px-4 rounded-full bg-primary text-primary-foreground cursor-pointer">
            Register
          </button>
        </div>
      </div>
    </header>
  );
}
