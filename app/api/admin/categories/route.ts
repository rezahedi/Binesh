import { NextResponse } from "next/server";
import db from "@/db";
import { categories } from "@/db/schema";
import { withAdmin } from "@/lib/auth";

export const GET = withAdmin(async () => {
  const rows = await db.select().from(categories);

  return NextResponse.json(rows);
});
