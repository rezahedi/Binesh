import { PrismaClient } from "@prisma/client"
import { withAdmin } from "@/lib/auth";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export const POST = withAdmin(async ({ req }) => {

  // Get the request body
  const {
    name,
    description,
    image,
    level,
    categoryID
  } = await req.json();

  // Create the course
  const response = await prisma.courses.create({
    data: {
      name,
      description,
      slug: name.toLowerCase().replace(/\s/g, "-"),
      image,
      level: parseInt(level),
      lessens: 0,
      categoryID,
    },
  });

  return NextResponse.json(response);
});
