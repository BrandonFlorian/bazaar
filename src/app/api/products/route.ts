import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { HTTP_STATUS_CODES } from "../../../../public/config/constants";
const prisma = new PrismaClient();

export async function GET(request: NextRequest) {
  if (request.method !== "GET") {
    console.error("Request method is not GET");

    return NextResponse.json(
      { message: "Request method is not GET" },
      { status: HTTP_STATUS_CODES.METHOD_NOT_ALLOWED }
    );
  }

  const { searchParams } = new URL(request.url);
  const productId = searchParams.get("id");
  const query = searchParams.get("query");
  const sort = searchParams.get("sort");
  const order = searchParams.get("order");

  // If a product ID is provided, fetch the single product
  if (productId) {
    return await getProductById(request, productId);
  }

  // If a query is provided, fetch the products that match the query
  if (query || sort || order) {
    return await getProductsByQuery(query ?? "", order ?? "", sort ?? "");
  }

  try {
    const products = await prisma.product.findMany();

    return NextResponse.json(products, { status: HTTP_STATUS_CODES.OK });
  } catch (error) {
    console.error("Error fetching products:", error);
    // Send the error to a logging service, etc.

    return NextResponse.json(
      { message: "Error fetching products" },
      { status: HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR }
    );
  }
}

async function getProductById(request: NextRequest, id: string) {
  try {
    const product = await prisma.product.findUnique({ where: { id } });

    if (!product) {
      return NextResponse.json(
        { message: "Product not found" },
        { status: HTTP_STATUS_CODES.NOT_FOUND }
      );
    }

    return NextResponse.json(product, { status: HTTP_STATUS_CODES.OK });
  } catch (error) {
    console.error("Error fetching product:", error);
    return NextResponse.json(
      { message: "Error fetching product" },
      { status: HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR }
    );
  }
}

async function getProductsByQuery(
  query: string,
  order?: string,
  sort?: string
) {
  try {
    let orderByObj;

    if (order && sort) {
      orderByObj = {
        [order]: sort,
      };
    }

    const products = await prisma.product.findMany({
      where: {
        OR: [
          {
            name: {
              contains: query,
              mode: "insensitive",
            },
          },
          {
            description: {
              contains: query,
              mode: "insensitive",
            },
          },
          {
            category: {
              contains: query,
              mode: "insensitive",
            },
          },
          {
            subCategory: {
              contains: query,
              mode: "insensitive",
            },
          },
        ],
      },
      orderBy: orderByObj,
    });

    if (!products) {
      return NextResponse.json(
        { message: "Product not found" },
        { status: HTTP_STATUS_CODES.NOT_FOUND }
      );
    }

    return NextResponse.json(products, { status: HTTP_STATUS_CODES.OK });
  } catch (error) {
    console.error("Error fetching products:", error);
    return NextResponse.json(
      { message: "Error fetching products" },
      { status: HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR }
    );
  }
}
