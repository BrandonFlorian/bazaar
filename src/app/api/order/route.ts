import { NextRequest, NextResponse } from "next/server";
import { HTTP_STATUS_CODES } from "../../../../public/config/constants";
import { Order } from "@prisma/client";
import { OrderItems } from "@/types/circle";
import prisma from "@/utils/prisma";
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
    // Parse the request body
    const body = JSON.parse(await request.text());
    console.log("body", body);
    // Extract and validate required fields
    const { profile_id, items } = body;
    if (!profile_id || !items || items.length === 0) {
      return NextResponse.json(
        { message: "Missing required fields" },
        { status: HTTP_STATUS_CODES.BAD_REQUEST }
      );
    }

    // Start a transaction to create the order and order items
    const order: Order | undefined = await prisma?.order.create({
      data: {
        userId: profile_id,
        orderStatus: "pending",
        // Use the Prisma `create` function to create the associated order items
        orderItems: {
          create: items.map((item: OrderItems) => ({
            productId: item.product_id,
            quantity: item.quantity,
            price: item.price,
          })),
        },
      },
    });

    // Return the created order
    return NextResponse.json(order);
  } catch (error) {
    console.error("Error creating order:", error);
    return NextResponse.json(
      { message: "Server Error" },
      { status: HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR }
    );
  }
}

export async function GET(request: NextRequest) {
  if (request.method !== "GET") {
    console.error("Request method is not GET");
    return NextResponse.json(
      { message: "Method Not Allowed" },
      { status: HTTP_STATUS_CODES.METHOD_NOT_ALLOWED }
    );
  }

  try {
    //check for order id
    const { searchParams } = new URL(request.url);
    const order_id = searchParams.get("orderId");

    if (order_id && prisma) {
      const order: OrderWithItemsAndProducts | null =
        await prisma.order.findUnique({
          where: {
            id: order_id,
          },
          include: {
            orderItems: {
              include: {
                product: true,
              },
            },
          },
        });
      return NextResponse.json(order, { status: HTTP_STATUS_CODES.OK });
    }

    const user_id = searchParams.get("userId");

    if (user_id && prisma) {
      const order: OrderWithItemsAndProducts[] = await prisma.order.findMany({
        where: {
          userId: user_id,
        },
        include: {
          orderItems: {
            include: {
              product: true,
            },
          },
        },
      });

      return NextResponse.json(order, { status: HTTP_STATUS_CODES.OK });
    }
    if (prisma) {
      const orders: OrderWithItemsAndProducts[] = await prisma.order.findMany({
        include: {
          orderItems: {
            include: {
              product: true,
            },
          },
        },
      });
      return NextResponse.json(orders, { status: HTTP_STATUS_CODES.OK });
    } else {
      return NextResponse.json(
        { message: "Server Error" },
        { status: HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR }
      );
    }
  } catch (error) {
    console.error("Error getting orders:", error);
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
    const body = JSON.parse(await request.text());
    const { order_id, order_status } = body;
    if (!order_id || !order_status) {
      return NextResponse.json(
        { message: "Missing required fields" },
        { status: HTTP_STATUS_CODES.BAD_REQUEST }
      );
    }

    const order = await prisma?.order.update({
      where: {
        id: order_id,
      },
      data: {
        orderStatus: order_status,
      },
    });

    return NextResponse.json(order, { status: HTTP_STATUS_CODES.OK });
  } catch (error) {
    console.error("Error updating order:", error);
    return NextResponse.json(
      { message: "Server Error" },
      { status: HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR }
    );
  }
}
