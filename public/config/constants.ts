export const HTTP_STATUS_CODES = {
  OK: 200,
  INTERNAL_SERVER_ERROR: 500,
  METHOD_NOT_ALLOWED: 405,
  NOT_FOUND: 404,
};

export const HEADER_HEIGHT: number = 60;

//Endpoints
export const PRODUCTS_ENDPOINT: string =
  process.env.NEXT_PUBLIC_PRODUCTS_ENDPOINT || "";

export const appPaths = {
  home: "/",
  products: "/products",
  product: "/product",
  cart: "/cart",
  checkout: "/checkout",
  signIn: "/sign-in",
  order: "/order",
  faq: "/faq",
};
