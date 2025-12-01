import { PrismaClient } from "@prisma/client";
import { withAdmin } from "@/lib/auth";
import { NextResponse } from "next/server";
import { eq, getTableColumns } from "drizzle-orm";
import db from "@/db";
import { categories, courses } from "@/db/schema";

const prisma = new PrismaClient();

export const GET = withAdmin(async ({ params }) => {
  const { courseSlug } = await params;

  const response = await db
    .select({
      ...getTableColumns(courses),
      category: getTableColumns(categories),
    })
    .from(courses)
    .where(eq(courses.slug, courseSlug))
    .leftJoin(categories, eq(courses.categoryID, categories.id));

  // If course doesn't exists
  if (response.length !== 1)
    return NextResponse.json({ message: `Course not found` }, { status: 404 });

  return NextResponse.json(response[0]);
});

export const PATCH = withAdmin(async ({ req, params }) => {
  const { id } = await params;
  const { name, slug, level, categoryID, image, description } =
    await req.json();

  const course = await prisma.courses.findFirst({
    where: {
      id,
      slug,
    },
  });

  if (!course) {
    throw new Error(`Course with id ${id} and slug ${slug} not found`);
  }

  try {
    const response = await prisma.courses.update({
      where: {
        id,
      },
      data: {
        name,
        slug,
        level,
        categoryID,
        image,
        description,
      },
    });

    return NextResponse.json(response);
  } catch (error) {
    // if (error && error.code === "P2002") {
    //   throw new Error(`Course with name ${name} already exists`);
    // }

    throw error;
  }
});

export const PUT = PATCH;
