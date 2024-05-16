// TODO: This entire code not checked yet

import { PrismaClient } from "@prisma/client"
import { withAdmin } from "@/lib/auth";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export const PATCH = withAdmin(async ({ req, params }) => {
  const { id } = params;
  const { name, slug, level, categoryID, image, description } = await req.json();

  const course = await prisma.courses.findFirst({
    where: {
      id,
      slug,
    },
  });

  if (!course) {
    throw new Error(
      `Course with id ${id} and slug ${slug} not found`
    );
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
    if (error.code === "P2002") {
      throw new Error(`Course with name ${name} already exists`);
    }

    throw error;
  }
});

export const PUT = PATCH;
