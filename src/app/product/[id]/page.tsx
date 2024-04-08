import { getProduct, getProducts } from "@/api";
import DetailProductPage from "@/components/detail/DetailProductPage";

export default async function Page({ params }: { params: { id: number } }) {
  const results = await Promise.allSettled([
    getProduct(params.id),
    getProducts({
      page: 1,
      categoryId: [],
    }),
  ]);

  const product =
    results[0].status === "fulfilled" ? results[0].value.product : [];
  const products =
    results[1].status === "fulfilled" ? results[1].value.products : [];

  return <DetailProductPage product={product} products={products} />;
}
