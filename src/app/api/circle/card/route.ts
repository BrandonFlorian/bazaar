import { NextRequest, NextResponse } from "next/server";
import {
  HTTP_STATUS_CODES,
  LOCALHOST_API,
} from "../../../../../public/config/constants";
import {
  CardResponse,
  CreateCardPayload,
  CreateCardPaymentPayload,
} from "@/types/circle";
import { CardService } from "@/services/cardService";
import { OrderItem } from "@prisma/client";
import { PaymentService } from "@/services/paymentService";
import { OrderWithItemsAndProducts } from "@/types/dataTypes";
export async function POST(request: NextRequest) {
  if (request.method !== "POST") {
    console.error("Request method is not POST");

    return NextResponse.json(
      { message: "Method Not Allowed" },
      { status: HTTP_STATUS_CODES.METHOD_NOT_ALLOWED }
    );
  }

  try {
    const forwarded = request.headers.get("x-forwarded-for");
    const ip = forwarded ? forwarded.split(/, /)[0] : undefined;

    // Parse the request body
    const body = JSON.parse(await request.text());
    // Extract and validate required fields
    const {
      idempotencyKey,
      keyId,
      encryptedData,
      billingDetails,
      expMonth,
      expYear,
      metadata,
    } = body.cardPayload;

    const orderId: string = body.orderId;

    //prepare card details
    const cardDetails: CreateCardPayload = {
      idempotencyKey: idempotencyKey,
      keyId: keyId,
      encryptedData: encryptedData,
      billingDetails: billingDetails,
      expMonth: expMonth,
      expYear: expYear,
      metadata: metadata,
    };

    cardDetails.metadata.ipAddress = ip;

    //create card on circle API
    const cardResponse: CardResponse = await CardService.createCard(
      cardDetails
    );
    if (!cardResponse) {
      return NextResponse.json(
        { message: "Bad Request" },
        { status: HTTP_STATUS_CODES.BAD_REQUEST }
      );
    }

    //get order from DB
    const order: OrderWithItemsAndProducts = await fetch(
      `${LOCALHOST_API}/order?orderId=${orderId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    ).then((res) => res.json());

    if (!order) {
      return NextResponse.json(
        { message: "Bad Request - No order Found for ID" },
        { status: HTTP_STATUS_CODES.BAD_REQUEST }
      );
    }

    //go through order items and add up the total amount
    const paymentAmount: number = order.orderItems
      .map((item: OrderItem) => Number(item.price))
      .reduce((a: number, b: number) => a + b, 0);
    const paymentAmountString = paymentAmount.toFixed(2);

    //prepare payment payload
    const paymentPayload: CreateCardPaymentPayload = {
      metadata: {
        email: cardDetails.billingDetails.email,
        phoneNumber: cardDetails.metadata.phoneNumber!,
        sessionId: cardDetails.metadata.sessionId!,
        ipAddress: cardDetails.metadata.ipAddress!,
      },
      amount: { amount: paymentAmountString, currency: "USD" },
      autoCapture: true,
      verification: "none",
      source: {
        id: cardResponse.id,
        type: "card",
      },
      idempotencyKey: idempotencyKey,
      keyId: keyId,
      verificationSuccessUrl: `http://127.0.0.1:3000/paymentStatus=success`,
      verificationFailureUrl: `http://127.0.0.1:3000/paymentStatus=failure`,
      description: "Payment",
      encryptedData: encryptedData,
      //channel: "none",
    };

    //send payment to circle API
    const paymentResponse = await PaymentService.sendPayment(paymentPayload);
    // Polling the payment status
    let paymentStatus = paymentResponse.status;

    const maxAttempts = 20;
    let attempts = 0;

    while (paymentStatus === "pending" && attempts < maxAttempts) {
      // Wait for some time before checking the status again
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Fetch the payment status from your /api/payment endpoint
      const statusResponse = await fetch(`${LOCALHOST_API}/circle/payment`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ paymentId: paymentResponse.id }),
      });
      const statusData = await statusResponse.json();

      paymentStatus = statusData.status;
      attempts++;

      // Break the loop if the payment status is 'paid'
      if (paymentStatus !== "pending") {
        //update the order status to paid
        const updateOrderResponse = await fetch(`${LOCALHOST_API}/order`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            order_status: paymentStatus,
            order_id: orderId,
          }),
        });
        const updatedOrderData = await updateOrderResponse.json();

        return NextResponse.json(statusData, {
          status: HTTP_STATUS_CODES.OK,
        });
      }
    }

    return NextResponse.json(paymentResponse, {
      status: HTTP_STATUS_CODES.OK,
    });
  } catch (error) {
    console.error("Error creating card:", error);
    return NextResponse.json(
      { message: "Server Error" },
      { status: HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR }
    );
  }
}
