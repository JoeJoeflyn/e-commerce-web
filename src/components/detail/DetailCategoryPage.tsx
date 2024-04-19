"use client";
import useDropdowns from "@/hooks/useDropdowns";
import useSort from "@/hooks/useSort";
import { DROPDOWN_KEYS, SORT_KEYS } from "@/shared/constants";
import { Product } from "@/shared/interfaces";
import {
  faAngleDown,
  faCheck,
  faListUl,
  faTableCellsLarge,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import Card from "../card/Card";

export default function DetailCategoryPage({
  products,
  total,
}: {
  products: Product[];
  total: number;
}) {
  const sortKeys = Object.values(SORT_KEYS);
  // Type of list view like gallery view
  const [isListView, setIsListView] = React.useState(false);
  // Dropdown related variables
  const dropdownRefVar = React.useRef<HTMLDivElement>(null);
  const [dropdownRef, isOpen, toggleDropdown] = useDropdowns(dropdownRefVar);

  const handleDropdown = (DROPDOWN_KEYS: string) => {
    toggleDropdown(DROPDOWN_KEYS);
  };

  const { selectedSortKey, handleSortSelection } = useSort(
    SORT_KEYS.CREATED_AT,
    toggleDropdown
  );

  return (
    <div className="max-w-5xl mx-auto my-5">
      <div className="col-span-2 flex flex-col gap-5">
        <div className="bg-white text-[#191919] font-bold text-2xl px-4 py-2 rounded">
          {products?.[0]?.category.name}
        </div>
        <div className="flex flex-col gap-2">
          <div className="flex justify-between items-center bg-white text-sm font-normal px-5 py-3 rounded">
            <p>{total} Results</p>
            <div className="flex items-center gap-2">
              <button
                onClick={() => handleDropdown(DROPDOWN_KEYS.SORT)}
                className="relative flex items-center gap-1 bg-[#f7f7f7] text-sm font-medium px-5 py-2 rounded-2xl h-9"
              >
                {selectedSortKey}
                <FontAwesomeIcon
                  width={16}
                  icon={faAngleDown}
                  className={`${isOpen === DROPDOWN_KEYS.SORT && "rotate-180"}`}
                />
                {isOpen === DROPDOWN_KEYS.SORT && (
                  <div
                    ref={dropdownRef}
                    className="absolute right-0 top-full mt-2 z-10 w-44 bg-white text-sm rounded-md shadow-lg"
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
                <FontAwesomeIcon
                  width={16}
                  icon={faAngleDown}
                  className={`${isOpen === DROPDOWN_KEYS.VIEW && "rotate-180"}`}
                />

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
                        <FontAwesomeIcon width={16} icon={faTableCellsLarge} />
                      )}
                    </div>
                  </div>
                )}
              </button>
            </div>
          </div>
          <div className="bg-white flex flex-col gap-5">
            <Card total={total} products={products} isListView={isListView} />
          </div>
        </div>
      </div>
    </div>
  );
}
