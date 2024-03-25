import { getProduct } from "@/api";
// import DetailPage from "@/components/detailPage";x

export default async function Page({ params }: { params: { id: number } }) {
  console.log("params", params);
  // const { product } = await getProduct(params.id);
  return <></>;

  // return <DetailPage product={product} />;
}
