import axios from "axios";

export const createProduct = async (newProduct: {
  files: File[];
  category: string;
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

export const getAllProducts = async (queryParams: {
  page?: number;
  search?: string;
  category?: string[];
}) => {
  const { page, search, category } = queryParams;

  const searchParams = new URLSearchParams();

  if (page !== undefined) {
    searchParams.set("page", page.toString());
    searchParams.set("limit", "10");
  }
  if (search) {
    searchParams.set("search", search);
  }

  if (category?.length !== 0) {
    category?.forEach((category) => {
      searchParams.append("category[]", category.toString());
    });
  }

  const decodedQuerystring = decodeURIComponent(searchParams.toString());
  try {
    const { data } = await axios(
      `${process.env.NEXT_PUBLIC_API_URL}/products?${decodedQuerystring}`
    );

    return data;
  } catch (error) {
    if (error) {
      throw new Error("Server Error, Please try again later!");
    }
  }
};

export const getProduct = async (id: number) => {
  try {
    const { data } = await axios(
      `${process.env.NEXT_PUBLIC_API_URL}/products/${id}`
    );

    return data;
  } catch (error) {
    if (error) {
      throw new Error("Server Error, Please try again later!");
    }
  }
};
