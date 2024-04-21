import { getProduct, getProductsByUserId } from "@/api";
import { LIMIT_PAGE, STALE_TIME } from "@/shared/constants";
import { Product } from "@/shared/interfaces";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";

export const usePrefetchProductsByUserId = (page: number, userId: number) => {
  const queryClient = useQueryClient();

  const { data, isLoading } = useQuery({
    queryKey: ["productsByUserId", page, userId],
    queryFn: () =>
      getProductsByUserId({
        page,
        userId,
        limit: LIMIT_PAGE,
      }),
    retry: 10,
    staleTime: STALE_TIME * 1000,
  });

  // Prefetch all products belong to user
  useEffect(() => {
    if (data?.products) {
      data.products.forEach((product: Product) => {
        queryClient.prefetchQuery({
          queryKey: ["editProduct", product.id],
          queryFn: () => getProduct(product.id),
          retry: 10,
          staleTime: STALE_TIME * 1000,
        });
      });
    }
  }, [queryClient, data?.products]);

  const totalPage = Math.ceil(data?.total / LIMIT_PAGE);

  // Prefetch the next page!
  useEffect(() => {
    for (
      let prefetchPage = page + 1;
      prefetchPage <= totalPage;
      prefetchPage++
    ) {
      queryClient.prefetchQuery({
        queryKey: ["productsByUserId", prefetchPage, userId],
        queryFn: () =>
          getProductsByUserId({
            page: prefetchPage,
            userId,
            limit: LIMIT_PAGE,
          }),
        retry: 10,
        staleTime: STALE_TIME * 1000,
      });
    }
  }, [totalPage, page, queryClient, userId]);

  return { data, isLoading, totalPage };
};
