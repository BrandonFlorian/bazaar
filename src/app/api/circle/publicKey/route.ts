import { CardService } from "@/services/cardService";
import { PublicKey } from "@/types/circle";
import { NextRequest, NextResponse } from "next/server";
import { HTTP_STATUS_CODES } from "../../../../../public/config/constants";

export async function GET(request: NextRequest) {
  if (request.method !== "GET") {
    console.error("Request method is not GET");
    return NextResponse.json(
      { message: "Method Not Allowed" },
      { status: HTTP_STATUS_CODES.METHOD_NOT_ALLOWED }
    );
  }

  try {
    const publicKey: PublicKey = await CardService.getPCIPublicKey();

    if (!publicKey) {
      return NextResponse.json(
        { message: "Error creating public key" },
        { status: HTTP_STATUS_CODES.BAD_REQUEST }
      );
    }

    return NextResponse.json(publicKey, {
      status: HTTP_STATUS_CODES.OK,
    });
  } catch (error) {
    console.error("Error getting public key:", error);
    return NextResponse.json(
      { message: "Server Error" },
      { status: HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR }
    );
  }
}
