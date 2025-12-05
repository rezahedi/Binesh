import { StreakButton } from "@application/components";
// import { getServerSession } from "next-auth/next";
// import { authOptions } from "@/lib/auth";

export default async function Header() {
  // const session = await getServerSession(authOptions);

  return (
    <header className="sticky top-0 bg-background w-full shadow-lg z-10">
      <div className="container max-w-7xl px-2 py-1 mx-auto flex gap-2 items-center">
        <h1 className="flex gap-1 items-center mb-2">
          <div className="text-5xl">🛸</div>
          <div className="text-3xl font-bold pt-2">BINESH</div>
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
