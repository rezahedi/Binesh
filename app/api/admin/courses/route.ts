import { PrismaClient } from "@prisma/client";
import { withAdmin } from "@/lib/auth";
import { NextRequest, NextResponse } from "next/server";
import { desc, eq, getTableColumns, like, or } from "drizzle-orm";
import db from "@/db";
import { categories, courses } from "@/db/schema";
import { getSearchParams } from "@/utils/urls";

const prisma = new PrismaClient();

export const GET = withAdmin(async ({ req, searchParams }) => {
  const ROWS_PER_PAGE = 10;
  const {
    search,
    sort = "createdAt",
    page = "1",
  } = searchParams as {
    search?: string;
    sort?: "createdAt" | "updatedAt";
    page?: string;
  };

  const query = db
    .select({
      ...getTableColumns(courses),
      category: getTableColumns(categories),
    })
    .from(courses)
    .offset((Number(page) - 1) * ROWS_PER_PAGE)
    .limit(ROWS_PER_PAGE)
    .orderBy(desc(courses[sort]))
    .leftJoin(categories, eq(courses.categoryID, categories.id));

  if (search)
    query.where(
      or(
        like(courses.name, `%${search}%`),
        like(courses.description, `%${search}%`)
      )
    );

  const rows = await query.execute();

  return NextResponse.json(rows);
});

// TODO: This endpoint not checked yet

export const POST = withAdmin(async ({ req }) => {
  const { name, slug, level, categoryID, image, description } =
    await req.json();

  const response = await prisma.courses.create({
    data: {
      name,
      slug,
      level,
      lessens: 0,
      categoryID,
      image,
      description,
    },
  });

  return NextResponse.json(response);
});
