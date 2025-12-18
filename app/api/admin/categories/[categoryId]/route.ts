import db from "@/db";
import { categories } from "@/db/schema";
import { withAdmin } from "@/lib/auth";
import { CategoryProps } from "@/lib/types";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export const GET = withAdmin(async ({ params }) => {
  const { categoryId } = await params;

  try {
    const rows = await db
      .select()
      .from(categories)
      .where(eq(categories.id, categoryId));

    if (!rows || rows.length === 0) {
      return new Response(null, { status: 404 });
    }

    return NextResponse.json(rows[0]);
  } catch (error) {
    console.error(error);
    return new Response(null, { status: 500 });
  }
});

export const PATCH = withAdmin(
  async ({ req, params }: { req: Request; params: Record<string, string> }) => {
    const { categoryId } = await params;
    const body: CategoryProps = await req.json();
    console.log("Patch body", body);

    try {
      const result = await db
        .update(categories)
        .set(body)
        .where(eq(categories.id, categoryId));

      if (result.rowCount === 0) return new Response(null, { status: 404 });

      return new Response(null, { status: 204 });
    } catch (error) {
      console.error(error);
      return new Response(null, { status: 500 });
    }
  }
);

export const DELETE = withAdmin(async ({ params }) => {
  const { categoryId } = await params;

  try {
    const result = await db
      .delete(categories)
      .where(eq(categories.id, categoryId));
    console.log("delete result", result);
    return new Response(null, { status: 204 });
  } catch (error) {
    console.error(error);
    return new Response(null, { status: 500 });
  }
});
