import { identifyUser } from "@/(learningMode)/actions/trophy";
import db from "@/db";
import { usersMirror } from "@/db/schema";
import { NextRequest, NextResponse } from "next/server";
import { headers } from "next/headers";
import { Webhook } from "svix";

export const POST = async (request: NextRequest) => {
  const payload = await request.text();
  const headersList = await headers();

  const svixId = headersList.get("svix-id");
  const svixTimestamp = headersList.get("svix-timestamp");
  const svixSignature = headersList.get("svix-signature");

  if (!svixId || !svixTimestamp || !svixSignature) {
    return new Response("Missing Svix headers", { status: 400 });
  }

  const secret = process.env.STACK_WEBHOOKS_SIGNING_SECRET;
  if (!secret) {
    return NextResponse.json({ message: "No secret" }, { status: 400 });
  }

  const wh = new Webhook(secret);
  try {
    const event = await wh.verify(payload, {
      "svix-id": svixId,
      "svix-timestamp": svixTimestamp,
      "svix-signature": svixSignature,
    });
    console.log("event", event);
  } catch (err) {
    return NextResponse.json({ message: "Invalid payload" }, { status: 400 });
  }

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
