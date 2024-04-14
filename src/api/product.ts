import { revalidateTag } from "next/cache";
import { headers } from "./config";

export const createProduct = async (newProduct: {
  files: File[];
  category: string;
  userId: string;
  name: string;
  description: string;
  price: number;
  discount: number;
  quantity: number;
  contact: string;
  location: string;
}) => {
  const { files, ...product } = newProduct;

  const formData = new FormData();

  files.forEach((file) => {
    formData.append(`${file.name}`, file);
  });

  formData.append("categoryId", product.category);
  formData.append("userId", product.userId);
  formData.append("name", product.name);
  formData.append("description", product.description);
  formData.append("price", product.price.toString());
  formData.append("discountPrice", product.discount.toString());
  formData.append("quantity", product.quantity.toString());
  formData.append("contact", product.contact);
  formData.append("location", product.location);

  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products`, {
    method: "POST",
    body: formData,
  });

  const parseResponse = await response.json();
  if (!response?.ok) {
    throw new Error(
      parseResponse?.error ?? "Server Error, Please try again later!"
    );
  }

  return parseResponse;
};

export const getProducts = async (queryParams?: {
  page?: number;
  search?: string;
  categoryId?: number[];
  limit?: number;
  sort?: string;
  sortOperation?: string;
}) => {
  const { page, search, categoryId, sort, limit, sortOperation } =
    queryParams || {};

  const searchParams = new URLSearchParams();

  if (page !== undefined) {
    searchParams.set("page", page.toString());
  }

  if (limit) {
    searchParams.set("limit", limit.toString());
  }

  if (search) {
    searchParams.set("search", search);
  }

  if (sort && sortOperation) {
    searchParams.set("sort", sort);
    searchParams.set("sortOperation", sortOperation);
  }

  if (categoryId?.length !== 0) {
    categoryId?.forEach((item) => {
      searchParams.append("category[]", item.toString());
    });
  }

  const decodedQuerystring = decodeURIComponent(searchParams.toString());

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/products?${decodedQuerystring}`,
      {
        method: "GET",
        next: { tags: ["list-products"], revalidate: 60000 },
      }
    );

    const data = await res.json();

    return data;
  } catch (error) {
    return [];
  }
};

export const getProduct = async (id: number) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/products/${id}`,
      {
        method: "GET",
        next: { tags: ["product"] },
      }
    );

    const data = await res.json();

    return data;
  } catch (error) {
    return [];
  }
};

export const getProductsByUserId = async (queryParams: {
  page?: number;
  userId?: number;
  limit?: number;
}) => {
  const { page, userId, limit } = queryParams;

  const searchParams = new URLSearchParams();

  if (page !== undefined) {
    searchParams.set("page", page.toString());
  }
  if (limit) {
    searchParams.set("limit", limit.toString());
  }
  if (userId !== undefined) {
    searchParams.set("userId", userId.toString());
  }

  const decodedQuerystring = decodeURIComponent(searchParams.toString());
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/user/products?${decodedQuerystring}`,
      {
        method: "GET",
        headers: {
          ...headers({
            Authorization: "Bearer " + localStorage.getItem("token"),
          }),
        },
      }
    );

    const data = await res.json();

    return data;
  } catch (error) {
    return [];
  }
};
