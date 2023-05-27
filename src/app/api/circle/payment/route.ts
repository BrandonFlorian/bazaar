import { NextRequest, NextResponse } from "next/server";
import { HTTP_STATUS_CODES } from "../../../../../public/config/constants";
import { PaymentService } from "@/services/paymentService";

export async function POST(request: NextRequest, response: NextResponse) {
  if (request.method !== "POST") {
    console.error("Request method is not POST");
    return NextResponse.json(
      { message: "Method Not Allowed" },
      { status: HTTP_STATUS_CODES.METHOD_NOT_ALLOWED }
    );
  }

  try {
    //check the request for the payment id
    const body = JSON.parse(await request.text());
    const { paymentId } = body;

    if (!paymentId) {
      return NextResponse.json(
        { message: "Bad Request" },
        { status: HTTP_STATUS_CODES.BAD_REQUEST }
      );
    }
    //get the payment from circle
    const payment = await PaymentService.getPaymentById(paymentId);
    if (!payment) {
      return NextResponse.json(
        { message: "Bad Request" },
        { status: HTTP_STATUS_CODES.BAD_REQUEST }
      );
    }
    //return the payment
    return NextResponse.json(payment, { status: HTTP_STATUS_CODES.OK });
  } catch (error) {
    console.error("Error getting payment:", error);
    return NextResponse.json(
      { message: "Server Error" },
      { status: HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR }
    );
  }
}
