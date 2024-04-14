import { getProduct, getProducts } from "@/api";
import DetailProductPage from "@/components/detail/DetailProductPage";
import { LIMIT_PAGE } from "@/shared/constants";
import { Product } from "@/shared/interfaces";

export async function generateStaticParams() {
  const { products } = await getProducts();

  return products?.map((product: Product) => ({ id: `${product.id}` }));
}

export default async function Page({ params }: { params: { id: number } }) {
  const { product } = await getProduct(params.id);

  const { products } = await getProducts({
    limit: LIMIT_PAGE,
    categoryId: [product?.categoryId],
  });

  return <DetailProductPage product={product} products={products} />;
}
