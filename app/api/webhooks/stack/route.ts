import { identifyUser } from "@/(learningMode)/actions/trophy";
import db from "@/db";
import { usersMirror } from "@/db/schema";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (request: NextRequest) => {
  const { type, data: user } = await request.json();

  if (type === "user.created") {
    await db.insert(usersMirror).values({
      id: user.id,
      name: user.display_name,
      email: user.primary_email,
      image: user.profile_image_url,
    });

    // Trophy user identify
    await identifyUser(user.id);

    return NextResponse.json({ message: "ok" });
  }

  return NextResponse.json({ message: "Unknown event type" }, { status: 400 });
};
