import { stackServerApp } from "@stack/server";
import Link from "next/link";

export default async function WebsitePage() {
  const user = await stackServerApp.getUser();

  return (
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
          <Link href={"/handler/sign-in"}>Sign in</Link> -
          <Link href={"/handler/sign-up"}>Sign up</Link>
        </>
      )}
      {user && (
        <div>
          {user?.displayName} <Link href={"/handler/sign-out"}>Sign out</Link>
        </div>
      )}
    </div>
  );
}
