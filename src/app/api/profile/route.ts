import { PrismaClient, Profile } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { HTTP_STATUS_CODES } from "../../../../public/config/constants";
const prisma = new PrismaClient();

export async function GET(request: NextRequest) {
  if (request.method !== "GET") {
    console.error("Request method is not GET");

    return NextResponse.json(
      { message: "Not found" },
      { status: HTTP_STATUS_CODES.NOT_FOUND }
    );
  }

  const { searchParams } = new URL(request.url);
  const username = searchParams.get("username");
  // If a user ID is provided, fetch the single user
  if (username) {
    return await getUserByUsername(username);
  }
  try {
    const users = await prisma.profile.findMany();

    return NextResponse.json(users, { status: HTTP_STATUS_CODES.OK });
  } catch (error) {
    console.error("Error fetching products:", error);
    // Send the error to a logging service, etc.

    return NextResponse.json(
      { message: "Server Error" },
      { status: HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR }
    );
  }
}

export async function POST(request: NextRequest) {
  if (request.method !== "POST") {
    console.error("Request method is not POST");

    return NextResponse.json(
      { message: "Method Not Allowed" },
      { status: HTTP_STATUS_CODES.METHOD_NOT_ALLOWED }
    );
  }

  // Parse the request body
  const body = JSON.parse(await request.text());

  // Extract and validate required fields
  const { firstName, lastName, email, username } = body;

  // These fields are required for user creation
  if (
    typeof firstName !== "string" ||
    typeof lastName !== "string" ||
    typeof email !== "string" ||
    typeof username !== "string"
  ) {
    return NextResponse.json(
      { message: "Bad Request" },
      { status: HTTP_STATUS_CODES.BAD_REQUEST }
    );
  }

  // Optional fields with validation
  const phoneNumber =
    typeof body.phoneNumber === "string" ? body.phoneNumber : null;
  const dateOfBirth =
    typeof body.dateOfBirth === "string" ? body.dateOfBirth : null;
  const profileImageUrl =
    typeof body.profileImageUrl === "string" ? body.profileImageUrl : null;
  const bio = typeof body.bio === "string" ? body.bio : null;

  // Use Prisma to create a new user
  try {
    const newUser: Profile = await prisma.profile.create({
      data: {
        firstName,
        lastName,
        email,
        username,
        phoneNumber,
        dateOfBirth,
        profileImageUrl,
        bio,
      },
    });

    return NextResponse.json(newUser, { status: HTTP_STATUS_CODES.OK });
  } catch (error) {
    console.error("Error creating user:", error);
    return NextResponse.json(
      { message: "Server Error" },
      { status: HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR }
    );
  }
}

export async function PUT(request: NextRequest) {
  if (request.method !== "PUT") {
    console.error("Request method is not PUT");

    return NextResponse.json(
      { message: "Method Not Allowed" },
      { status: HTTP_STATUS_CODES.METHOD_NOT_ALLOWED }
    );
  }

  // Parse the request body
  const body = JSON.parse(await request.text());
  // Get the user ID from the URL
  const { searchParams } = new URL(request.url);
  const userId = searchParams.get("username");
  // Check if userId is null
  if (!userId) {
    return NextResponse.json(
      { message: "Bad Request" },
      { status: HTTP_STATUS_CODES.BAD_REQUEST }
    );
  }

  // Validate the data
  const { firstName, lastName, email, username, phoneNumber } = body;

  // Use Prisma to update the user
  try {
    const updatedUser: Profile = await prisma.profile.update({
      where: {
        username: userId,
      },
      data: {
        firstName,
        lastName,
        email,
        username,
        phoneNumber,
      },
    });

    return NextResponse.json(updatedUser, { status: HTTP_STATUS_CODES.OK });
  } catch (error) {
    console.error("Error updating user:", error);
    return NextResponse.json(
      { message: "Server Error" },
      { status: HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR }
    );
  }
}

async function getUserByUsername(username: string) {
  try {
    const user = await prisma.profile.findUnique({ where: { username } });
    if (!user) {
      return NextResponse.json(
        { message: "Server Error" },
        { status: HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR }
      );
    }

    return NextResponse.json(user, { status: HTTP_STATUS_CODES.OK });
  } catch (error) {
    console.error("Error fetching user:", error);
    return NextResponse.json(
      { message: "Server Error" },
      { status: HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR }
    );
  }
}
