export const getCategories = async () => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/admin/categories`
  );

  const result = await response.json();

  if (!response?.ok) {
    throw new Error(result?.error ?? "Server Error, Please try again later!");
  }

  return result;
};
