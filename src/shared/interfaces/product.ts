import { Category } from ".";

export type Product = {
  id: number;
  name: string;
  description: string;
  price: number;
  discountPrice: number;
  quantity: number;
  contact: string;
  location: string;
  status: string;
  createdAt: string;
  category: Category;
  productImages: {
    id: number;
    productId: number;
    name: string;
    size: number;
    status: string;
    createdAt: string;
  }[];
  user: {
    name: string;
    email: string;
  };
};
