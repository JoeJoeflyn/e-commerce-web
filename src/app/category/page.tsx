import DetailCategoryPage from "@/components/detailCategoryPage";

export default async function Page({ params }: { params: { id: number } }) {
  // const { product } = await getProduct(params.id);

  return <DetailCategoryPage />;
}
