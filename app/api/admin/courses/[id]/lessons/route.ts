import { PrismaClient } from "@prisma/client"
import { withAdmin } from "@/lib/auth";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export const GET = withAdmin(async ({ params, searchParams }) => {
  const { id: courseSlug } = params
  const {
    search,
    sort = "part",
  } = searchParams as {
    search?: string;
    sort?: "part" | "createdAt" | "updatedAt";
  };

  // Get course ID
  const course = await prisma.courses.findFirst({
    where: {
      slug: courseSlug,
    },
  });

  // If course doesn't exists
  if(!course)
    return NextResponse.json({ message: `Course not found` }, { status: 404 });

  const response = await prisma.lessons.findMany(
    {
      where: {
        courseID: course.id,
        ...(search && {
          OR: [
            {
              name: { contains: search },
            },
            {
              description: { contains: search },
            },
          ],
        }),
      },
      orderBy: {
        [sort]: "asc",
      },
    }
  );

  return NextResponse.json(response);
});
