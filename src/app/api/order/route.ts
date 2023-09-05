import { NextRequest, NextResponse } from "next/server";
import { HTTP_STATUS_CODES } from "../../../../public/config/constants";
import { prisma } from "@/utils/prismaClient";
import { OrderWithItemsAndProducts } from "@/types/dataTypes";
import { Order, OrderItem } from "@prisma/client";
import { authorizeUser } from "@/utils/serverUtils";
import { CartItem } from "@/context/cartContext";

export async function POST(request: NextRequest) {
  if (request.method !== "POST") {
    console.error("Request method is not POST");

    return NextResponse.json(
      { message: "Method Not Allowed" },
      { status: HTTP_STATUS_CODES.METHOD_NOT_ALLOWED }
    );
  }

  try {
    const token = await authorizeUser(request);

    if (!token) {
      // return NextResponse.json(
      //   { message: "Unauthorized" },
      //   { status: HTTP_STATUS_CODES.UNAUTHORIZED }
      // );
      console.log("unauthorized user token: ", token);
    }
    // console.log("authorized user token: ", token);
    // Parse the request body
    const body = JSON.parse(await request.text());
    // Extract and validate required fields
    const { profileId, items } = body;
    console.log("extracted profileId: ", profileId);
    console.log("extracted items: ", items);

    if (!profileId || !items || items.length === 0) {
      return NextResponse.json(
        { message: "Missing required fields" },
        { status: HTTP_STATUS_CODES.BAD_REQUEST }
      );
    }

    const orderItems: OrderItem[] = items.map((item: CartItem) => ({
      quantity: item.quantity,
      productId: item.id,
      price: item.price,
      createdAt: new Date(),
      updatedAt: new Date(),
    }));

    const order: Order = await prisma.order.create({
      data: {
        userId: profileId,
        orderStatus: "pending",
        orderItems: {
          create: orderItems,
        },
      },
    });
    console.log("order: ", order);

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
    const token = await authorizeUser(request);

    if (!token) {
      return NextResponse.json(
        { message: "Unauthorized" },
        { status: HTTP_STATUS_CODES.UNAUTHORIZED }
      );
    }
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
    const token = await authorizeUser(request);

    if (!token) {
      return NextResponse.json(
        { message: "Unauthorized" },
        { status: HTTP_STATUS_CODES.UNAUTHORIZED }
      );
    }
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
