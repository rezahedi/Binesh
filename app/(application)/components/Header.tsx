import { StreakButton } from '@application/components'
// import { getServerSession } from "next-auth/next";
// import { authOptions } from "@/lib/auth";

export default async function Header() {
  // const session = await getServerSession(authOptions);

  return (
    <header className='sticky top-0 flex flex-row items-center container'>
      <h1 className='uppercase font-semibold text-3xl'><span className='text-4xl'>🌐</span> Binesh</h1>
      <nav>
        <ul className='flex gap-1'>
          <li>
            <a href={process.env.NEXT_APP_BASE}>Home</a>
          </li>
          <li>
            <a href={`${process.env.NEXT_APP_BASE}/courses`}>Courses</a>
          </li>
        </ul>
      </nav>
      <form className='grow'>
        <input type="search" placeholder="Search..." className='w-full' />
      </form>
      <div>
        <StreakButton />
        <button>Sign in</button>
        <button>Sign up</button>
      </div>
    </header>
  )
}
