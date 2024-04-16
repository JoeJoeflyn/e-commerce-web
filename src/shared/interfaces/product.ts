import { Category } from ".";

export type Product = {
  id: number;
  categoryId: number;
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
  productImages: ProductImages;
  user: {
    name: string;
    email: string;
  };
};

export type ProductImages = {
  id: number;
  productId: number;
  name: string;
  url: string;
  size: number;
  status: string;
  createdAt: string;
}[];

export type FormFields = {
  category: string;
  name: string;
  description: string;
  price: string;
  discount: string;
  quantity: string;
  contact: string;
  location: string;
  files: File[];
};
