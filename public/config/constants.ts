export const HTTP_STATUS_CODES = {
  OK: 200,
  INTERNAL_SERVER_ERROR: 500,
  METHOD_NOT_ALLOWED: 405,
  NOT_FOUND: 404,
  BAD_REQUEST: 400,
};

export const HEADER_HEIGHT: number = 60;
export const SWR_RETRY_COUNT: number = 1;
export const GALLERY_PAGE_SIZE: number = 12;

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
  mint: "/mint",
};

export const FOOTER_LINKS = [
  {
    title: "About",
    links: [
      {
        label: "Features",
        link: "#",
      },
      {
        label: "Pricing",
        link: "#",
      },
      {
        label: "Support",
        link: "#",
      },
      {
        label: "Forums",
        link: "#",
      },
    ],
  },
  {
    title: "Second Column",
    links: [
      {
        label: "Project 1",
        link: "#",
      },
      {
        label: "Project 2",
        link: "#",
      },
      {
        label: "Project 3",
        link: "#",
      },
      {
        label: "Upcoming",
        link: "#",
      },
    ],
  },
  {
    title: "Community",
    links: [
      {
        label: "Join Discord",
        link: "#",
      },
      {
        label: "Follow on Twitter",
        link: "#",
      },
      {
        label: "Email newsletter",
        link: "#",
      },
      {
        label: "GitHub discussions",
        link: "#",
      },
    ],
  },
];

export const FILTER_TERMS = [
  { value: "low", label: "Price Low to High" },
  { value: "high", label: "Price High to Low" },
  { value: "new", label: "Newest" },
  { value: "old", label: "Oldest" },
];
