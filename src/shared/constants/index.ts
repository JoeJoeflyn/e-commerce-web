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
  NEWEST: "Newest",
  PRICE_LOWEST_FIRST: "Price: lowest first",
  PRICE_HIGHEST_FIRST: "Price: highest first",
});

export const SORT_VALUES: { [key: string]: string } = Object.freeze({
  [SORT_KEYS.NEWEST]: "createdAt&sortOperation=desc",
  [SORT_KEYS.PRICE_LOWEST_FIRST]: "price&sortOperation=asc",
  [SORT_KEYS.PRICE_HIGHEST_FIRST]: "price&sortOperation=desc",
});

export const LIMIT_PAGE = 5;
