import { PrismaClient } from "@prisma/client"
import { withAdmin } from "@/lib/auth";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export const GET = withAdmin(async ({ searchParams }) => {
  const ROWS_PER_PAGE = 10
  const {
    search,
    sort = "createdAt",
    page,
  } = searchParams as {
    search?: string;
    sort?: "createdAt" | "updatedAt";
    page?: string;
  };

  const response = await prisma.courses.findMany(
    {
      where: {
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
      include: {
        category: true,
      },
      orderBy: {
        [sort]: "desc",
      },
      take: ROWS_PER_PAGE,
      ...(page && {
        skip: (parseInt(page) - 1) * ROWS_PER_PAGE,
      }),
    }
  );

  return NextResponse.json(response);
});