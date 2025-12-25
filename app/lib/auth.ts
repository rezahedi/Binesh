import { ADMIN_ROLE_LABEL } from "@/constants/dashboard";
import db from "@/db";
import { usersMirror } from "@/db/schema";
import { getSearchParams } from "@/utils/urls";
import { stackServerApp } from "@stack/server";
import { and, eq } from "drizzle-orm";

// Internal use only (for admin portal)
interface WithAdminHandler {
  ({
    req,
    params,
    searchParams,
  }: {
    req: Request;
    params: Record<string, string>;
    searchParams: Record<string, string>;
  }): Promise<Response>;
}

export const isAdmin = async (userId: string) => {
  // Select user info by userId and check if its an admin user then return true/false
  const response = await db
    .select()
    .from(usersMirror)
    .where(
      and(eq(usersMirror.id, userId), eq(usersMirror.role, ADMIN_ROLE_LABEL))
    );

  if (response.length === 1) {
    return true;
  }

  return false;
};

export const withAdmin =
  (handler: WithAdminHandler) =>
  async (
    req: Request,
    { params: initialParams }: { params: Promise<Record<string, string>> }
  ) => {
    // TODO: Check if user is admin
    const params = (await initialParams) || {};

    const user = await stackServerApp.getUser();
    if (!user) {
      return new Response("Unauthorized: Login required.", { status: 401 });
    }

    const isAdminUser = await isAdmin(user.id);
    if (!isAdminUser) {
      return new Response("Unauthorized: Not an admin.", { status: 401 });
    }

    const searchParams = getSearchParams(req.url);
    return handler({ req, params, searchParams });
  };
