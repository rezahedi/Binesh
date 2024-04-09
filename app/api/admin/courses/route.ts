import { PrismaClient } from "@prisma/client"
import { withAdmin } from "@/lib/auth";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export const GET = withAdmin(async ({ searchParams }) => {
  const {
    search,
    sort = "createdAt",
    page,
  } = searchParams as {
    search?: string;
    sort?: "createdAt" | "clicks" | "lastClicked";
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
      take: 100,
      ...(page && {
        skip: (parseInt(page) - 1) * 100,
      }),
    }
  );

  return NextResponse.json(response);
});