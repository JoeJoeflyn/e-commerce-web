import { getProducts } from "@/api";
import DetailCategoryPage from "@/components/detail/DetailCategoryPage";
import { LIMIT_PAGE } from "@/shared/constants";
import { Metadata } from "next";

export async function generateMetadata({ params }: { params: { id: number } }) {
  const { products } = await getProducts({
    categoryId: [params.id],
  });

  return {
    title: products[0]?.category?.name,
    description:
      "Get the best deals on electronic devices when you shop the largest online selection at e-commerce.com. Free shipping on many items | Browse your favorite brands | affordable prices.",
  };
}

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
