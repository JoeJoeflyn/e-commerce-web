import { getAllCategories, getAllProducts } from "@/api";
import Home from "@/components/homePage";

export default async function Page() {
  // const categories: Category[] = await getAllCategories(); //5s
  // const products: Product[] = await getAllProducts({
  //   page: 1,
  // }); //5s;

  const results = await Promise.allSettled([
    getAllCategories(),
    getAllProducts({
      page: 1,
      search: "",
      category: [],
    }),
  ]);

  const categories =
    results[0].status === "fulfilled" ? results[0].value.categories : [];
  const products =
    results[1].status === "fulfilled" ? results[1].value.products : [];

  return <Home categories={categories} products={products} />;
}
