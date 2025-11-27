import { PrismaClient } from "@prisma/client";
import { withAdmin } from "@/lib/auth";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export const GET = withAdmin(async ({ searchParams }) => {
  const ROWS_PER_PAGE = 100;
  const {
    search,
    sort = "name",
    page,
  } = searchParams as {
    search?: string;
    sort?: "name" | "description";
    page?: string;
  };

  const response = await prisma.categories.findMany({
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
    orderBy: {
      [sort]: "asc",
    },
    take: ROWS_PER_PAGE,
    ...(page && {
      skip: (parseInt(page) - 1) * ROWS_PER_PAGE,
    }),
  });

  return NextResponse.json(response);
});
