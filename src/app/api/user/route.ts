import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { HTTP_STATUS_CODES } from "../../../../public/config/constants";
const prisma = new PrismaClient();
export async function POST(request: NextRequest) {
  if (request.method !== "POST") {
    console.error("Request method is not POST");

    return NextResponse.json(
      { message: "Method Not Allowed" },
      { status: HTTP_STATUS_CODES.METHOD_NOT_ALLOWED }
    );
  }

  try {
    const { username, email } = await request.json();

    const user = await prisma.profile.findFirst({
      where: {
        OR: [{ username }, { email }],
      },
    });

    if (!user) {
      return NextResponse.json(false, { status: HTTP_STATUS_CODES.OK });
    }
    return NextResponse.json(true, { status: HTTP_STATUS_CODES.OK });
  } catch (error) {
    console.error("Error fetching user:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR }
    );
  }
}
