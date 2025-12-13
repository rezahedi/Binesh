import { getSearchParams } from "@/utils/urls";

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

export const withAdmin =
  (handler: WithAdminHandler) =>
  async (req: Request, { params }: { params: Record<string, string> }) => {
    // TODO: Check if user is admin

    const searchParams = getSearchParams(req.url);
    return handler({ req, params, searchParams });
  };
