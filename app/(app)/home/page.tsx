import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/lib/auth";
import { Streak } from "@app/components";

export default async function ApplicationPage() {
  const session = await getServerSession(authOptions);

  if( session )
    return <div>
      <div className="container flex gap-4">
        <div className="basis-8/12">
          <Streak />
        </div>
        <div className="basis-4/12 bg-orange-200 border rounded-md border-orange-300 p-4">
          Premium users are 6x more likely to reach their learning goals
          <button>Learn more</button>
        </div>
      </div>
      <div className="container flex gap-4">
        <div className="w-1/2">
          <h3 className="font-semibold text-xl">Pick up where you left off</h3>
          <div className="border rounded-md p-4 h-52"></div>
        </div>
        <div className="w-1/2">
          <h3 className="font-semibold text-xl">Carbon League</h3>
          <div className="border rounded-md p-4 h-52"></div>
        </div>
      </div>
      <div className="container">
        <h3 className="font-semibold text-xl">Continue learning</h3>
        <div className="flex gap-4">
          <div className="border rounded-md p-4 h-52 w-1/4"></div>
          <div className="border rounded-md p-4 h-52 w-1/4"></div>
          <div className="border rounded-md p-4 h-52 w-1/4"></div>
          <div className="border rounded-md p-4 h-52 w-1/4"></div>
        </div>
      </div>
      <div className="container">
        <h3 className="font-semibold text-xl">Recommended for you</h3>
        <div className="flex gap-4">
          <div className="border rounded-md p-4 h-52 w-1/4"></div>
          <div className="border rounded-md p-4 h-52 w-1/4"></div>
          <div className="border rounded-md p-4 h-52 w-1/4"></div>
          <div className="border rounded-md p-4 h-52 w-1/4"></div>
        </div>
      </div>
      {/* <p>Signed in as {session.user && session.user.name}</p>
      <a href="/api/auth/signout">Sign out by link</a> */}
    </div>

  return (
    <div>
      <p>Not signed in</p>
    </div>
  )
}
