import { StreakButton } from '@app/components'
// import { getServerSession } from "next-auth/next";
// import { authOptions } from "@/app/lib/auth";

export default async function Header() {
  // const session = await getServerSession(authOptions);

  return (
    <header className='sticky top-0 flex flex-row items-center container xl:max-w-7xl'>
      <h1 className='uppercase font-semibold text-3xl'><span className='text-4xl'>🌐</span> Binesh</h1>
      <nav>
        <ul className='flex gap-1'>
          <li>
            <a href="/">Home</a>
          </li>
          <li>
            <a href="/courses">Courses</a>
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
