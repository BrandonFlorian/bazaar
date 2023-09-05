import { Profile } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { HTTP_STATUS_CODES } from "../../../../public/config/constants";
import { supabase } from "@/utils/supabaseClient";
import { prisma } from "@/utils/prismaClient";
import { authorizeUser } from "@/utils/serverUtils";

export async function GET(request: NextRequest) {
  if (request.method !== "GET") {
    console.error("Request method is not GET");

    return NextResponse.json(
      { message: "Not found" },
      { status: HTTP_STATUS_CODES.NOT_FOUND }
    );
  }

  try {
    const token = await authorizeUser(request);

    if (!token) {
      return NextResponse.json(
        { message: "Unauthorized" },
        { status: HTTP_STATUS_CODES.UNAUTHORIZED }
      );
    }

    const { searchParams } = new URL(request.url);
    const username = searchParams.get("username");
    // If a user ID is provided, fetch the single user
    if (username) {
      if (username !== token.user.user_metadata.username) {
        return NextResponse.json(
          { message: "Unauthorized" },
          { status: HTTP_STATUS_CODES.UNAUTHORIZED }
        );
      }
      return await getUserByUsername(username);
    }
  } catch (error) {
    return NextResponse.json(
      { message: "Server Error" },
      { status: HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR }
    );
  }
  //server error
  return NextResponse.json(
    { message: "Server Error" },
    { status: HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR }
  );
}

//Needs to be updated to take in a username and auth header to check if the user is authorized to create the profile
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

  try {
    const token = await authorizeUser(request);

    if (!token) {
      return NextResponse.json(
        { message: "Unauthorized" },
        { status: HTTP_STATUS_CODES.UNAUTHORIZED }
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
    const {
      firstName,
      lastName,
      email,
      username,
      phoneNumber,
      bio,
      dateOfBirth,
      profileImageUrl,
      id,
    } = body;

    return await updateUser(userId, {
      id,
      firstName,
      lastName,
      email,
      username,
      phoneNumber,
      bio,
      dateOfBirth,
      profileImageUrl,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  } catch (error) {
    console.error("Error updating user:", error);
    return NextResponse.json(
      { message: "Server Error" },
      { status: HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR }
    );
  }
}

async function updateUser(username: string, data: Profile) {
  try {
    const payload = {
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      username: data.username,
      phoneNumber: data.phoneNumber,
      bio: data.bio,
      dateOfBirth: data.dateOfBirth,
      profileImageUrl: data.profileImageUrl,
      updatedAt: data.updatedAt,
    };
    const updatedUser: Profile = await prisma.profile.update({
      where: {
        username: username,
      },
      data: payload,
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

async function getAllUsers() {
  try {
    const users = await prisma.profile.findMany();

    if (!users) {
      return NextResponse.json(
        { message: "Server Error" },
        { status: HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR }
      );
    }

    return NextResponse.json(users, { status: HTTP_STATUS_CODES.OK });
  } catch (error) {
    console.error("Error fetching user:", error);
    return NextResponse.json(
      { message: "Server Error" },
      { status: HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR }
    );
  }
}
