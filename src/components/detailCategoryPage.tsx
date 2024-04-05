"use client";
import { getProducts } from "@/api";
import useDropdowns from "@/hooks/useDropdowns";
import usePagination from "@/hooks/usePagination";
import { DROPDOWN_KEYS, LIMIT_PAGE, SORT_KEYS } from "@/shared/constants";
import { Product } from "@/shared/interfaces";
import { timeFormat } from "@/shared/utils";
import { faHeart as farHeart } from "@fortawesome/free-regular-svg-icons";
import {
  faAngleDown,
  faAngleUp,
  faArrowLeft,
  faArrowRight,
  faCheck,
  faClock,
  faListUl,
  faLocationDot,
  faTableCellsLarge,
  faHeart as fasHeart,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export default function DetailCategoryPage({
  products,
  categoryId,
  total,
}: {
  products: Product[];
  categoryId: number[];
  total: number;
}) {
  const [select, setSelect] = React.useState<string>(SORT_KEYS.NEWEST);
  const [search, setSearch] = React.useState("");
  const [isListView, setIsListView] = React.useState(false);
  const [heartStatus, setHeartStatus] = React.useState(false);
  const dropdownRefVar = React.useRef<HTMLDivElement>(null);
  const [dropdownRef, isOpen, toggleDropdown] = useDropdowns(dropdownRefVar);
  const { nextPage, prevPage, handlePageButtonClick, page } = usePagination(2);

  const hanldeDropdown = (DROPDOWN_KEYS: string) => {
    toggleDropdown(DROPDOWN_KEYS);
  };

  const {
    data: _products,
    isFetching: isFetchingProducts,
    refetch,
  } = useQuery({
    queryKey: ["productsBycategory", page, search, categoryId],
    queryFn: () => getProducts({ page, search, categoryId }),
    placeholderData: {
      products,
    },
  });

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
              <p>
                {total || _products?.total} - {page} Results
              </p>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => hanldeDropdown(DROPDOWN_KEYS.SORT)}
                  className="relative flex items-center gap-1 bg-[#f7f7f7] text-sm font-medium px-5 py-2 rounded-2xl h-9"
                >
                  {select}
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
                      <div
                        onClick={(event) => {
                          event.stopPropagation();
                          setSelect(SORT_KEYS.NEWEST);
                          toggleDropdown("");
                        }}
                        className={`px-4 py-2 flex justify-between items-center gap-2 hover:bg-gray-100 ${
                          select === SORT_KEYS.NEWEST && "underline"
                        } cursor-pointer`}
                      >
                        {SORT_KEYS.NEWEST}
                        {select === SORT_KEYS.NEWEST && (
                          <FontAwesomeIcon width={16} icon={faCheck} />
                        )}
                      </div>
                      <div
                        onClick={(event) => {
                          event.stopPropagation();
                          setSelect(SORT_KEYS.PRICE_HIGHEST_FIRST);
                          toggleDropdown("");
                        }}
                        className={`px-4 py-2 flex justify-between items-center gap-2 hover:bg-gray-100 ${
                          select === SORT_KEYS.PRICE_HIGHEST_FIRST &&
                          "underline"
                        } cursor-pointer`}
                      >
                        {SORT_KEYS.PRICE_HIGHEST_FIRST}
                        {select === SORT_KEYS.PRICE_HIGHEST_FIRST && (
                          <FontAwesomeIcon width={16} icon={faCheck} />
                        )}
                      </div>
                      <div
                        onClick={(event) => {
                          event.stopPropagation();
                          setSelect(SORT_KEYS.PRICE_LOWEST_FIRST);
                          toggleDropdown("");
                        }}
                        className={`px-4 py-2 flex justify-between items-center gap-2 hover:bg-gray-100 ${
                          select === SORT_KEYS.PRICE_LOWEST_FIRST && "underline"
                        } cursor-pointer`}
                      >
                        {SORT_KEYS.PRICE_LOWEST_FIRST}
                        {select === SORT_KEYS.PRICE_LOWEST_FIRST && (
                          <FontAwesomeIcon width={16} icon={faCheck} />
                        )}
                      </div>
                    </div>
                  )}
                </button>
                <button
                  onClick={() => hanldeDropdown(DROPDOWN_KEYS.VIEW)}
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
              <div
                className={`${
                  !isListView
                    ? "flex flex-col"
                    : "grid grid-cols-2 lg:grid-cols-3 gap-y-5"
                } mt-5`}
              >
                {isFetchingProducts
                  ? Array(7)
                      .fill(null)
                      .map((_, index) => (
                        <div className="rounded-b-lg p-2" key={index}>
                          <div className="relative w-full h-64">
                            <Skeleton className="h-full rounded-b-lg" />
                          </div>
                          <div className="py-2">
                            <Skeleton count={3} />
                          </div>
                        </div>
                      ))
                  : _products?.products?.map((product: Product) => {
                      return !isListView ? (
                        <Link
                          href={`/product/${product.id}`}
                          className="grid grid-cols-3 py-2 px-3 gap-2"
                        >
                          <div className="relative w-full rounded-lg h-64 bg-[#0000000D]">
                            <Image
                              src={product.productImages[0].name}
                              className="object-contain"
                              alt={product.name}
                              loading="lazy"
                              fill={true}
                            />
                            <div
                              className="cursor-pointer absolute top-2 right-2 text-sm font-light bg-white px-2 py-1 rounded-full"
                              onClick={() => setHeartStatus(!heartStatus)}
                            >
                              {heartStatus ? (
                                <FontAwesomeIcon
                                  width={16}
                                  size="xl"
                                  icon={fasHeart}
                                />
                              ) : (
                                <FontAwesomeIcon
                                  width={16}
                                  size="xl"
                                  icon={farHeart}
                                />
                              )}
                            </div>
                          </div>
                          <div className="col-span-2 flex flex-col justify-between gap-3">
                            <p className="text-base hover:underline font-normal">
                              {product.name}
                            </p>
                            <div className="flex-grow">
                              <div className="font-bold flex gap-3 items-baseline">
                                <p className="text-lg font-bold">
                                  {new Intl.NumberFormat("en-US", {
                                    style: "currency",
                                    currency: "USD",
                                  }).format(
                                    product.price - product.discountPrice
                                  )}
                                </p>
                                <p className="text-[#707070] text-sm font-medium line-through">
                                  {new Intl.NumberFormat("en-US", {
                                    style: "currency",
                                    currency: "USD",
                                  }).format(product.price)}
                                </p>
                              </div>
                              <div className="flex items-center gap-1 text-sm font-medium text-[#707070]">
                                <FontAwesomeIcon
                                  width={16}
                                  icon={faLocationDot}
                                />
                                <p className="line-clamp-1">
                                  {product.location}
                                </p>
                              </div>
                            </div>
                            <div className="flex items-center gap-1 text-sm font-bold text-[#363636]">
                              <FontAwesomeIcon width={16} icon={faClock} />
                              {timeFormat(product.createdAt)}
                            </div>
                          </div>
                        </Link>
                      ) : (
                        <Link
                          href={`/product/${product.id}`}
                          className={`p-2 cursor-pointer ${
                            true ? "" : "hidden"
                          }`}
                          key={product.id}
                        >
                          <div className="relative w-full rounded-lg h-64 bg-[#0000000D]">
                            <Image
                              src={product.productImages[0].name}
                              className="object-contain"
                              alt={product.name}
                              loading="lazy"
                              fill={true}
                            />
                            <div
                              className="cursor-pointer absolute top-2 right-2 text-sm font-light bg-white px-2 py-1 rounded-full"
                              onClick={() => setHeartStatus(!heartStatus)}
                            >
                              {heartStatus ? (
                                <FontAwesomeIcon
                                  width={16}
                                  size="xl"
                                  icon={fasHeart}
                                />
                              ) : (
                                <FontAwesomeIcon
                                  width={16}
                                  size="xl"
                                  icon={farHeart}
                                />
                              )}
                            </div>
                          </div>
                          <div className="flex flex-col gap-2 text-[#191919] m-1">
                            <div className="text-base hover:underline font-normal">
                              {product.name}
                            </div>
                            <div className="font-bold flex justify-between items-baseline gap-2">
                              <p className="text-base font-bold">
                                {new Intl.NumberFormat("en-US", {
                                  style: "currency",
                                  currency: "USD",
                                }).format(
                                  product.price - product.discountPrice
                                )}
                              </p>
                              <p className="text-[#707070] font-semibold text-sm line-through">
                                {new Intl.NumberFormat("en-US", {
                                  style: "currency",
                                  currency: "USD",
                                }).format(product.price)}
                              </p>
                            </div>
                            <div className="flex justify-between gap-1 text-sm font-bold text-[#363636]">
                              <div className="flex justify-between items-center gap-1">
                                <FontAwesomeIcon width={16} icon={faClock} />
                                {timeFormat(product.createdAt)}
                              </div>
                            </div>
                          </div>
                        </Link>
                      );
                    })}
              </div>
              <div className="flex justify-center items-center gap-3 py-3 border-t">
                <button
                  onClick={prevPage}
                  className="inline-flex items-center justify-center hover:bg-[#EDEDED] text-[#707070] bg-[#F7F7F7] p-2 border rounded-full"
                >
                  <FontAwesomeIcon width={16} icon={faArrowLeft} />
                </button>
                {Array(Math.ceil(total / LIMIT_PAGE))
                  .fill(null)
                  .map((_, index) => (
                    <button
                      key={index}
                      onClick={() => handlePageButtonClick(index + 1)}
                      className={`inline-flex items-center justify-center text-base ${
                        page === index + 1
                          ? "border-b-2 border-[#191919]"
                          : "text-[#707070]"
                      } hover:text-[#3665F3] hover:border-b-2 hover:border-[#3665F3] py-2 px-1 font-semibold`}
                    >
                      {index + 1}
                    </button>
                  ))}
                <button
                  onClick={nextPage}
                  className="inline-flex items-center justify-center hover:bg-[#EDEDED] text-[#707070] bg-[#F7F7F7] p-2 border rounded-full"
                >
                  <FontAwesomeIcon width={16} icon={faArrowRight} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
