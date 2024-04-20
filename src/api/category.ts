export const getAllCategories = async () => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/categories`, {
      method: "GET",
      next: { tags: ["list-categories"] },
    });

    if (!res.ok) {
      throw new Error(`API call failed with status: ${res.status}`);
    }

    const data = await res.json();

    return data;
  } catch (error) {
    if (error) {
      throw new Error("Server Error, Please try again later!");
    }
  }
};
