export type QueryOptionsType = {
  searchTerm?: string;
  pageSize?: number;
  limit?: number;
  order?: "price" | "createdAt";
  sort?: "asc" | "desc";
  query?: string;
  lang?: string;
};
