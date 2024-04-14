import { useRouter, useSearchParams } from "next/navigation";
import React from "react";

function usePagination(totalPage: number) {
  const searchParams = useSearchParams();
  const pageParams = searchParams.get("page");
  const router = useRouter();
  const [page, setPage] = React.useState(1);

  const changeQueryParam = (pageNumber: number) => {
    const currentUrl = new URL(window.location.href);
    currentUrl.searchParams.set("page", pageNumber.toString());
    router.push(currentUrl.toString(), { scroll: false });
  };

  React.useEffect(() => {
    if (!pageParams) {
      setPage(1);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageParams]);

  React.useEffect(() => {
    const handleRouteChange = () => {
      const newSortKey =
        new URLSearchParams(window.location.href.split("?")[1]).get("page") ||
        "";
      setPage(+newSortKey || 1);
    };

    window.addEventListener("popstate", handleRouteChange);

    return () => window.removeEventListener("popstate", handleRouteChange);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handlePageButtonClick = (index: number) => {
    if (page !== index) {
      setPage(index);
      changeQueryParam(index);
    }
  };

  const nextPage = () => {
    if (page < totalPage) {
      setPage((prev) => prev + 1);
      changeQueryParam(page + 1);
    }
  };

  const prevPage = () => {
    if (page > 1) {
      setPage((prev) => prev - 1);
      changeQueryParam(page - 1);
    }
  };

  return {
    nextPage,
    prevPage,
    handlePageButtonClick,
    page,
  };
}

export default usePagination;
