import axios from "axios";

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

export const getProducts = async (queryParams: {
  page?: number;
  search?: string;
  categoryId?: number[];
  sort?: string;
}) => {
  const { page, search, categoryId, sort } = queryParams;

  const searchParams = new URLSearchParams();

  if (page !== undefined) {
    searchParams.set("page", page.toString());
    searchParams.set("limit", "5");
  }

  if (search) {
    searchParams.set("search", search);
  }

  if (sort) {
    searchParams.set("sort", sort);
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
        next: { tags: ["list-products"] },
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
}) => {
  const { page, userId } = queryParams;

  const searchParams = new URLSearchParams();

  if (page !== undefined) {
    searchParams.set("page", page.toString());
    searchParams.set("limit", "5");
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
        next: { tags: ["product-by-id"] },
      }
    );

    const data = await res.json();

    return data;
  } catch (error) {
    return [];
  }
};
