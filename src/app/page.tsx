import { getAllCategories, getProducts } from "@/api";
import Home from "@/components/home/HomePage";
import { LIMIT_PAGE } from "@/shared/constants";

export default async function Page({
  searchParams,
}: {
  searchParams: { page: number; search: string };
}) {
  const results = await Promise.allSettled([
    getAllCategories(),
    getProducts({
      search: searchParams.search,
      page: searchParams.page || 1,
      limit: LIMIT_PAGE,
    }),
  ]);

  const categories =
    results[0].status === "fulfilled" ? results[0].value.categories : [];
  const { products, total } =
    results[1].status === "fulfilled" ? results[1].value : [];

  return <Home categories={categories} products={products} total={total} />;
}
