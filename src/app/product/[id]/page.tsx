import { getProduct } from "@/api";
import DetailProductPage from "@/components/detailProductPage";

export default async function Page({ params }: { params: { id: number } }) {
  const { product } = await getProduct(params.id);

  return <DetailProductPage product={product} />;
}
