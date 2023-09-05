import { QueryOptionsType } from "@/types/dataTypes";

export const fetcher = async (url: string, accessToken?: string) => {
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };

  if (accessToken) {
    headers["Authorization"] = `${accessToken}`;
  }

  const res = await fetch(url, {
    method: "GET",
    headers: headers,
  });
  const data = await res.json();

  if (res.status !== 200) {
    throw new Error(data.message);
  }

  return data;
};

export const formatPaginatedEndpoint = (
  baseUrl: string,
  queryOptions: QueryOptionsType,
  page: number
) => {
  const paramsString =
    queryOptions &&
    Object.keys(queryOptions)
      .filter(
        (key) =>
          queryOptions[key as keyof QueryOptionsType] !== undefined &&
          queryOptions[key as keyof QueryOptionsType] !== null &&
          queryOptions[key as keyof QueryOptionsType] !== ""
      )
      .map((key) => `${key}=${queryOptions[key as keyof QueryOptionsType]}`)
      .join("&");

  const queryString = paramsString ? `?${paramsString}` : "";

  return `${baseUrl}${queryString}&offset=${page}`;
};

export const nullIfEmpty = (prop: string | undefined) => {
  if (prop === "") {
    return undefined;
  }
  return prop;
};
