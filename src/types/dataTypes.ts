import { Prisma } from "@prisma/client";

export type QueryOptionsType = {
  searchTerm?: string;
  pageSize?: number;
  limit?: number;
  order?: "price" | "created_at";
  sort?: "asc" | "desc";
  query?: string;
  lang?: string;
};

export type OrderWithItemsAndProducts = Prisma.OrderGetPayload<{
  include: {
    orderItems: {
      include: {
        product: true;
      };
    };
  };
}>;
