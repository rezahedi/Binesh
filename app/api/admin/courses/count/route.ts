import { PrismaClient } from "@prisma/client"
import { withAdmin } from "@/lib/auth";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export const GET = withAdmin(async ({ searchParams }) => {
  const {
    search,
  } = searchParams as {
    search?: string;
  };

  const response = await prisma.courses.count(
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
    }
  );

  return NextResponse.json(response);
});