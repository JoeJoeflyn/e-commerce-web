import { SORT_KEYS, SORT_VALUES } from "@/shared/constants";
import { usePathname, useRouter } from "next/navigation";
import React from "react";

const useSort = (
  initialSortKey: string,
  toggleDropdown: (key: string) => void
) => {
  const router = useRouter();
  const pathname = usePathname();
  const DEFAULT_SORT = SORT_VALUES[SORT_KEYS.CREATED_AT];
  const [selectedSortKey, setSelectedSortKey] =
    React.useState<string>(initialSortKey);
  const [resetPage, setResetPage] = React.useState(1);

  const replaceQueryParam = (sortValue: string, replace = false) => {
    const query = sortValue ? `?${sortValue}` : "";
    const url = `${pathname}${query}`;

    if (replace) {
      router.replace(url, { scroll: false });
    } else {
      router.push(url, { scroll: false });
    }
  };

  React.useEffect(() => {
    const sortKeyMapping: { [key: string]: string } = {
      price_asc: SORT_KEYS.PRICE_LOWEST_FIRST,
      price_desc: SORT_KEYS.PRICE_HIGHEST_FIRST,
      createdAt_desc: SORT_KEYS.CREATED_AT,
    };

    const handleRouteChange = () => {
      const newUrl = window.location.href;
      const sortKey =
        new URLSearchParams(newUrl.split("?")[1]).get("sort") || "";
      const sortOperation =
        new URLSearchParams(newUrl.split("?")[1]).get("sortOperation") || "";
      const combinedKey = sortOperation
        ? `${sortKey}_${sortOperation}`
        : sortKey;
      if (combinedKey in sortKeyMapping) {
        setSelectedSortKey(sortKeyMapping[combinedKey]);
      }
    };

    window.addEventListener("popstate", handleRouteChange);

    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener("popstate", handleRouteChange);
    };
  }, []);

  React.useEffect(() => {
    replaceQueryParam(DEFAULT_SORT, true);
    setResetPage(1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSortSelection = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
    key: string
  ) => {
    const newSortValue = SORT_VALUES[key] || DEFAULT_SORT;
    event.stopPropagation();
    setSelectedSortKey(key);
    toggleDropdown("");
    replaceQueryParam(newSortValue);
  };

  return { selectedSortKey, handleSortSelection, resetPage };
};

export default useSort;
