import { headers } from "./config";

export const createProduct = async (newProduct: {
  files: File[];
  categoryId: string;
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

  Object.entries(product).forEach(([key, value]) => {
    if (value !== null && value !== undefined) {
      const valueToAppend =
        typeof value === "number" ? value.toString() : value;
      formData.append(key, valueToAppend);
    }
  });
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/products`,
      {
        method: "POST",
        headers: {
          ...headers({
            Authorization: "Bearer " + localStorage.getItem("token"),
          }),
        },
        body: formData,
      }
    );

    const data = await response.json();
    if (!response?.ok) {
      throw new Error(data?.error ?? "Server Error, Please try again later!");
    }

    return data;
  } catch (error) {
    throw error;
  }
};

export const updateProduct = async (newProduct: {
  id: number;
  files: File[];
  categoryId: string;
  userId: string;
  name: string;
  description: string;
  price: number;
  discount: number;
  quantity: number;
  contact: string;
  location: string;
}) => {
  const { files, id, ...product } = newProduct;

  const formData = new FormData();

  files.forEach((file) => {
    formData.append(`${file.name}`, file);
  });

  Object.entries(product).forEach(([key, value]) => {
    if (value !== null && value !== undefined) {
      const valueToAppend =
        typeof value === "number" ? value.toString() : value;
      formData.append(key, valueToAppend);
    }
  });

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/products/${id}`,
      {
        method: "PUT",
        headers: {
          ...headers({
            Authorization: "Bearer " + localStorage.getItem("token"),
          }),
        },
        body: formData,
      }
    );

    if (!response?.ok) {
      throw new Error("Server Error, Please try again later!");
    }

    return;
  } catch (error) {
    throw error;
  }
};

export const getProducts = async (queryParams?: {
  page?: number;
  search?: string;
  categoryId?: number[];
  limit?: number;
  sort?: string;
  sortOperation?: string;
}) => {
  const searchParams = new URLSearchParams();
  const categoryId = queryParams?.categoryId;

  const addParam = (key: string, value: any) => {
    if (value !== undefined && value !== null) {
      searchParams.set(key, value.toString());
    }
  };

  // Iterate over queryParams except categoryId which needs special handling
  queryParams &&
    Object.entries(queryParams).forEach(([key, value]) => {
      if (key !== "categoryId") {
        addParam(key, value);
      }
    });

  if (Array.isArray(categoryId) && categoryId.length > 0) {
    categoryId.forEach((item) =>
      searchParams.append("category[]", item.toString())
    );
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
          "Content-Type": "application/json",
        },
      }
    );

    const data = await res.json();

    return data;
  } catch (error) {
    return [];
  }
};

export const deleteImage = async (id: number) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/products/deleteImage/${id}`,
      {
        method: "DELETE",
        headers: {
          ...headers({
            Authorization: "Bearer " + localStorage.getItem("token"),
          }),
          "Content-Type": "application/json",
        },
      }
    );

    if (!res.ok) {
      throw new Error("Server responded with an error");
    }

    return;
  } catch (error) {
    throw error;
  }
};
