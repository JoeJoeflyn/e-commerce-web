export const STORE_KEYS = Object.freeze({
  USER: "user",
  TOKEN: "token",
});

export const NAVIGATE_KEYS = Object.freeze({
  AUTHENTICATED: "authenticated",
  UNAUTHENTICATED: "unauthenticated",
});

export const DROPDOWN_KEYS = Object.freeze({
  SORT: "sort",
  VIEW: "view",
  ACCOUNT: "account",
});

export const SORT_KEYS = Object.freeze({
  CREATED_AT: "Newest",
  PRICE_LOWEST_FIRST: "Price: lowest first",
  PRICE_HIGHEST_FIRST: "Price: highest first",
});

export const SORT_VALUES: { [key: string]: string } = Object.freeze({
  [SORT_KEYS.CREATED_AT]: "sort=createdAt&sortOperation=desc",
  [SORT_KEYS.PRICE_LOWEST_FIRST]: "sort=price&sortOperation=asc",
  [SORT_KEYS.PRICE_HIGHEST_FIRST]: "sort=price&sortOperation=desc",
});

export const LIMIT_PAGE = 6;

export const STALE_TIME = 60;

export const initialFormValues = {
  category: "",
  name: "",
  description: "",
  price: "",
  discount: "",
  quantity: "",
  contact: "",
  location: "",
  files: [],
};

export const formFields = [
  { name: "category", type: "select", options: [] },
  { name: "name", type: "text" },
  { name: "description", type: "text" },
  { name: "price", type: "numeric" },
  { name: "discount", type: "numeric" },
  { name: "quantity", type: "numeric" },
  { name: "contact", type: "text" },
  { name: "location", type: "text" },
];
