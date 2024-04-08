"use client";
import { getProducts } from "@/api";
import useDropdowns from "@/hooks/useDropdowns";
import usePagination from "@/hooks/usePagination";
import { DROPDOWN_KEYS, SORT_KEYS, SORT_VALUES } from "@/shared/constants";
import {
  faAngleDown,
  faAngleUp,
  faCheck,
  faListUl,
  faTableCellsLarge,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useQuery } from "@tanstack/react-query";

import React from "react";
import Card from "../card/Card";
import { Product } from "@/shared/interfaces";

export default function DetailCategoryPage({
  products,
}: // categoryId,
// total,
{
  products: Product[];
  // categoryId: number[];
  // total: number;
}) {
  // Sort related variables
  const DEFAULT_SORT = SORT_VALUES[SORT_KEYS.NEWEST];
  const [selectedSortKey, setSelectedSortKey] = React.useState<string>(
    SORT_KEYS.NEWEST
  );
  const [sortValue, setSortValue] = React.useState<string>(DEFAULT_SORT);
  const sortKeys = Object.values(SORT_KEYS);

  // Type of list view like gallery view
  const [isListView, setIsListView] = React.useState(false);

  // Dropdown related variables
  const dropdownRefVar = React.useRef<HTMLDivElement>(null);
  const [dropdownRef, isOpen, toggleDropdown] = useDropdowns(dropdownRefVar);

  // Pagination related variables
  // const { nextPage, prevPage, handlePageButtonClick, page } = usePagination(2);
  // const categoryId = [2];

  const handleDropdown = (DROPDOWN_KEYS: string) => {
    toggleDropdown(DROPDOWN_KEYS);
  };

  const handleSortSelection = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
    key: string
  ) => {
    event.stopPropagation();
    setSelectedSortKey(key);
    toggleDropdown("");
    setSortValue(SORT_VALUES[key] || DEFAULT_SORT);
  };

  // const {
  //   data: _products,
  //   isFetching: isFetchingProducts,
  //   refetch,
  // } = useQuery({
  //   queryKey: ["productsBycategory", page, sortValue, categoryId],
  //   queryFn: () => getProducts({ page, sort: sortValue, categoryId }),
  //   placeholderData: {
  //     products,
  //   },
  // });

  // React.useEffect(() => {
  //   if (page) refetch();
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [page]);

  return (
    <div className="max-w-5xl mx-auto my-5">
      <div className="grid grid-cols-1 xl:grid-cols-3">
        <div className="col-span-2 flex flex-col gap-5">
          <div className="bg-white text-[#191919] font-bold text-2xl px-4 py-2 rounded">
            Clothing
          </div>
          <div className="flex flex-col gap-2">
            <div className="flex justify-between items-center bg-white text-sm font-normal px-5 py-3 rounded">
              <p>7 Results</p>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleDropdown(DROPDOWN_KEYS.SORT)}
                  className="relative flex items-center gap-1 bg-[#f7f7f7] text-sm font-medium px-5 py-2 rounded-2xl h-9"
                >
                  {selectedSortKey}
                  {isOpen === DROPDOWN_KEYS.SORT ? (
                    <FontAwesomeIcon width={16} icon={faAngleUp} />
                  ) : (
                    <FontAwesomeIcon width={16} icon={faAngleDown} />
                  )}
                  {isOpen === DROPDOWN_KEYS.SORT && (
                    <div
                      ref={dropdownRef}
                      className="absolute right-0 top-full mt-2 z-10 w-40 bg-white text-sm rounded-md shadow-lg"
                    >
                      {sortKeys.map((key) => (
                        <div
                          key={key}
                          onClick={(event) => handleSortSelection(event, key)}
                          className={`px-4 py-2 flex justify-between items-center gap-2 hover:bg-gray-100 ${
                            selectedSortKey === key && "underline"
                          } cursor-pointer`}
                        >
                          {key}
                          {selectedSortKey === key && (
                            <FontAwesomeIcon width={16} icon={faCheck} />
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </button>
                <button
                  onClick={() => handleDropdown(DROPDOWN_KEYS.VIEW)}
                  className="relative flex items-center gap-1 bg-[#f7f7f7] text-sm font-medium px-5 py-2 rounded-2xl h-9"
                >
                  {isListView ? (
                    <FontAwesomeIcon width={16} icon={faListUl} />
                  ) : (
                    <FontAwesomeIcon width={16} icon={faTableCellsLarge} />
                  )}
                  {isOpen === DROPDOWN_KEYS.VIEW ? (
                    <FontAwesomeIcon width={16} icon={faAngleUp} />
                  ) : (
                    <FontAwesomeIcon width={16} icon={faAngleDown} />
                  )}
                  {isOpen === DROPDOWN_KEYS.VIEW && (
                    <div
                      ref={dropdownRef}
                      className="absolute right-0 top-full mt-2 z-10 w-36 bg-white text-sm rounded-md shadow-lg"
                    >
                      <div
                        className={`px-4 py-2 flex items-center justify-between cursor-pointer ${
                          isListView ? "hover:bg-gray-100 hover:underline" : ""
                        }`}
                        onClick={(event) => {
                          event.stopPropagation();
                          setIsListView(!isListView);
                          toggleDropdown("");
                        }}
                      >
                        <span>{isListView ? "List View" : "Gallery View"}</span>
                        {isListView ? (
                          <FontAwesomeIcon width={16} icon={faListUl} />
                        ) : (
                          <FontAwesomeIcon
                            width={16}
                            icon={faTableCellsLarge}
                          />
                        )}
                      </div>
                    </div>
                  )}
                </button>
              </div>
            </div>
            <div className="bg-white flex flex-col gap-5">
              <Card
                // nextPage={nextPage}
                // prevPage={prevPage}
                // handlePageButtonClick={handlePageButtonClick}
                // page={page}
                products={products}
                isListView={isListView}
                sortValue={sortValue}
                // isFetchingProducts={isFetchingProducts}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
