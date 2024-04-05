import { getAllCategories, getProducts } from "@/api";
import Home from "@/components/homePage";

export default async function Page() {
  const results = await Promise.allSettled([
    getAllCategories(),
    getProducts({
      page: 1,
      search: "",
      categoryId: [],
    }),
  ]);

  const categories =
    results[0].status === "fulfilled" ? results[0].value.categories : [];
  const products =
    results[1].status === "fulfilled" ? results[1].value.products : [];

  return <Home categories={categories} products={products} />;
}
