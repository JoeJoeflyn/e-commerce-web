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

  const formdata = new FormData();

  files.forEach((file) => {
    formdata.append(`${file.name}`, file);
  });

  formdata.append("categoryId", product.category);
  formdata.append("name", product.name);
  formdata.append("description", product.description);
  formdata.append("price", product.price.toString());
  formdata.append("discountPrice", product.discount.toString());
  formdata.append("quantity", product.quantity.toString());
  formdata.append("contact", product.contact);
  formdata.append("location", product.location);

  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products`, {
    method: "POST",
    body: formdata,
  });

  const parseResponse = await response.json();
  if (!response?.ok) {
    throw new Error(
      parseResponse?.error ?? "Server Error, Please try again later!"
    );
  }

  return parseResponse;
};
