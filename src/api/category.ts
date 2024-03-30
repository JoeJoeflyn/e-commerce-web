import axios from "axios";

export const getAllCategories = async () => {
  try {
    const { data } = await axios(
      `${process.env.NEXT_PUBLIC_API_URL}/categories`
    );

    return data;
  } catch (error) {
    if (error) {
      throw new Error("Server Error, Please try again later!");
    }
  }
};
