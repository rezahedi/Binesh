import { stackServerApp } from "@stack/server";
import Link from "next/link";

export default async function WebsitePage() {
  const user = await stackServerApp.getUser();

  return (
    <div>
      <h1>Website</h1>
      {!user && (
        <>
          <Link href={"/handler/sign-in"}>Sign in</Link> -
          <Link href={"/handler/sign-un"}>Sign un</Link>
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
