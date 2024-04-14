import { getProducts } from "@/api";
import DetailCategoryPage from "@/components/detail/DetailCategoryPage";
import { LIMIT_PAGE } from "@/shared/constants";

export default async function Page({
  params,
  searchParams,
}: {
  params: { id: number };
  searchParams: {
    page: number;
    search: string;
    sort: string;
    sortOperation: "desc";
  };
}) {
  const { products, total } = await getProducts({
    page: searchParams.page || 1,
    limit: LIMIT_PAGE,
    categoryId: [params.id],
    search: searchParams.search,
    sort: searchParams.sort,
    sortOperation: searchParams.sortOperation,
  });

  return <DetailCategoryPage total={total} products={products} />;
}
