import React from "react";

function usePagination(maxPage: number) {
  const [page, setPage] = React.useState(1);

  const updatePage = (newPage: number) => {
    setPage(newPage);
  };

  const handlePageButtonClick = (index: number) => {
    if (page !== index) {
      updatePage(index);
    }
  };

  const nextPage = () => {
    if (page < maxPage) {
      updatePage(page + 1);
    }
  };

  const prevPage = () => {
    if (page > 1) {
      updatePage(page - 1);
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
