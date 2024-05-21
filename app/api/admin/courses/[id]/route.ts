// TODO: This entire code not checked yet

import { PrismaClient } from "@prisma/client"
import { withAdmin } from "@/lib/auth";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();


export const GET = withAdmin(async ({ params }) => {
  const { id: slug } = params;

  const response = await prisma.courses.findFirst(
    {
      where: { slug },
      include: {
        category: true,
      },
    }
  );
  
  // If course doesn't exists
  if(!response)
    return NextResponse.json({ message: `Course not found` }, { status: 404 });

  return NextResponse.json(response);
});

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
    // if (error && error.code === "P2002") {
    //   throw new Error(`Course with name ${name} already exists`);
    // }

    throw error;
  }
});

export const PUT = PATCH;
