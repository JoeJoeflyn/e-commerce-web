import { getProducts } from "@/api";
import DetailCategoryPage from "@/components/detailCategoryPage";

export default async function Page({ params }: { params: { id: number } }) {
  const { products, total } = await getProducts({
    page: 1,
    search: "",
    categoryId: [params.id],
  });

  return (
    <DetailCategoryPage
      categoryId={[params.id]}
      total={total}
      products={products}
    />
  );
}
