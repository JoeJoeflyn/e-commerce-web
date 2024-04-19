import { getAllCategories, getProduct } from "@/api";
import { STALE_TIME } from "@/shared/constants";
import { ProductImages } from "@/shared/interfaces";
import { useQuery } from "@tanstack/react-query";

export default function usePrefetchProductUser(productId: number) {
  const { data: product, isFetching } = useQuery({
    queryKey: ["editProduct", productId],
    queryFn: () => getProduct(productId),
    staleTime: STALE_TIME * 1000,
  });

  const { data: categories } = useQuery({
    queryKey: ["categories"],
    queryFn: getAllCategories,
    staleTime: STALE_TIME * 1000,
  });

  const formFields = [
    { name: "categoryId", type: "select", options: categories?.categories },
    { name: "name", type: "text" },
    { name: "price", type: "numeric" },
    { name: "discount", type: "numeric" },
    { name: "quantity", type: "numeric" },
    { name: "contact", type: "text" },
    { name: "location", type: "text" },
    { name: "description", type: "text" },
  ];

  const productImages = product?.product?.productImages?.map(
    (image: ProductImages) => image
  );

  return {
    product,
    productImages,
    formFields,
    isFetching,
  };
}
