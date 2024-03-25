import { getProduct } from "@/api";
import DetailPage from "@/components/detailPage";

export default async function Page({ params }: { params: { id: number } }) {
  const { product } = await getProduct(params.id);

  return <DetailPage product={product} />;
}
