import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { HTTP_STATUS_CODES } from "../../../../public/config/constants";
const prisma = new PrismaClient();

export async function GET(request: NextRequest) {
  if (request.method !== "GET") {
    console.error("Request method is not GET");

    return NextResponse.next({
      status: HTTP_STATUS_CODES.METHOD_NOT_ALLOWED,
      headers: { "Content-Type": "application/json" },
    });
  }

  const { searchParams } = new URL(request.url);
  const userId = searchParams.get("id");

  // If a user ID is provided, fetch the single user
  if (userId) {
    return await getUserById(request, userId);
  }
  try {
    const users = await prisma.user.findMany();

    return NextResponse.json(users, { status: HTTP_STATUS_CODES.OK });
  } catch (error) {
    console.error("Error fetching products:", error);
    // Send the error to a logging service, etc.

    return NextResponse.next({
      status: HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR,
      headers: { "Content-Type": "application/json" },
    });
  }
}

async function getUserById(request: NextRequest, id: string) {
  try {
    const user = await prisma.user.findUnique({ where: { id } });

    if (!user) {
      return NextResponse.next({
        status: HTTP_STATUS_CODES.NOT_FOUND,
        headers: { "Content-Type": "application/json" },
      });
    }

    return NextResponse.json(user, { status: HTTP_STATUS_CODES.OK });
  } catch (error) {
    console.error("Error fetching user:", error);
    return NextResponse.next({
      status: HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR,
      headers: { "Content-Type": "application/json" },
    });
  }
}
