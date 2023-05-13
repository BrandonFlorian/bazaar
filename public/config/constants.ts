export const HTTP_STATUS_CODES = {
  OK: 200,
  INTERNAL_SERVER_ERROR: 500,
  METHOD_NOT_ALLOWED: 405,
  NOT_FOUND: 404,
  BAD_REQUEST: 400,
};

export const HEADER_HEIGHT: number = 60;

//Endpoints
export const PRODUCTS_ENDPOINT: string =
  process.env.NEXT_PUBLIC_PRODUCTS_ENDPOINT || "";
export const PROFILES_ENDPOINT: string =
  process.env.NEXT_PUBLIC_PROFILE_ENDPOINT || "";
export const USERNAME_ENDPOINT: string =
  process.env.NEXT_PUBLIC_USERNAME_ENDPOINT || "";

export const IMAGE_HOSTNAME: string =
  process.env.NEXT_PUBLIC_IMAGE_HOSTNAME || "";

export const IMAGE_BUCKET: string = process.env.NEXT_PUBLIC_IMAGE_BUCKET || "";
export const appPaths = {
  home: "/",
  products: "/products",
  product: "/product",
  profile: "/profile",
  cart: "/cart",
  checkout: "/checkout",
  signIn: "/sign-in",
  order: "/order",
  faq: "/faq",
};
