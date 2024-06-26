"use client";
import usePagination from "@/hooks/usePagination";
import { LIMIT_PAGE } from "@/shared/constants";
import { Product } from "@/shared/interfaces";
import { minIdImageIndices, timeFormat } from "@/shared/utils";
import {
  faArrowLeft,
  faArrowRight,
  faClock,
  faLocationDot,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import Link from "next/link";
import "react-loading-skeleton/dist/skeleton.css";
import FavoriteItem from "../favorite/FavoriteItem";

export default function Card({
  isListView,
  products,
  total,
}: {
  isListView?: boolean;
  products: Product[];
  total: number;
}) {
  const totalPage = Math.ceil(total / LIMIT_PAGE);
  const { nextPage, prevPage, handlePageButtonClick, page } =
    usePagination(totalPage);
  const minIdIndices = minIdImageIndices(products);

  return (
    <>
      <div
        className={`${
          isListView
            ? "flex flex-col"
            : "grid grid-cols-2 lg:grid-cols-3 gap-y-5"
        } my-5`}
      >
        {products?.length ? (
          products?.map((product: Product, index: number) => {
            const minIdImageIndex = minIdIndices[index];
            return isListView ? (
              <Link key={product.id} href={`/product/${product.id}`}>
                <div className="grid grid-cols-3 py-2 px-3 gap-2">
                  <div className="relative rounded-lg h-64 bg-[#0000000D]">
                    <Image
                      src={product.productImages[minIdImageIndex].url}
                      alt={product.productImages[minIdImageIndex].name}
                      loading="lazy"
                      fill={true}
                    />
                    <FavoriteItem />
                  </div>
                  <div className="flex flex-col justify-between gap-3">
                    <p className="text-base hover:underline font-normal">
                      {product.name}
                    </p>
                    <div className="flex-grow">
                      <div className="font-bold flex gap-3 items-baseline">
                        <p className="text-[#e44510] text-lg font-bold">
                          {new Intl.NumberFormat("en-US", {
                            style: "currency",
                            currency: "USD",
                          }).format(product.price - product.discount)}
                        </p>
                        <p className="text-[#707070] text-sm font-medium line-through">
                          {new Intl.NumberFormat("en-US", {
                            style: "currency",
                            currency: "USD",
                          }).format(product.price)}
                        </p>
                      </div>
                      <div className="flex items-center gap-1 text-sm font-medium text-[#707070]">
                        <FontAwesomeIcon width={16} icon={faLocationDot} />
                        <p className="line-clamp-1">{product.location}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-1 text-sm font-bold text-[#363636]">
                      <FontAwesomeIcon width={16} icon={faClock} />
                      {timeFormat(product.createdAt)}
                    </div>
                  </div>
                </div>
              </Link>
            ) : (
              <Link
                key={product.id}
                href={`/product/${product.id}`}
                className={`p-2 cursor-pointer ${true ? "" : "hidden"}`}
              >
                <div className="relative rounded-lg h-60 bg-[#0000000D]">
                  <Image
                    src={product.productImages[minIdImageIndex].url}
                    alt={product.productImages[minIdImageIndex].name}
                    loading="lazy"
                    fill={true}
                  />
                  <FavoriteItem />
                </div>
                <div className="flex flex-col gap-2 text-[#191919] m-1">
                  <div className="text-base hover:underline font-normal">
                    {product.name}
                  </div>
                  <div className="font-bold flex justify-between items-baseline gap-2">
                    <p className="text-[#e44510] text-base font-bold">
                      {new Intl.NumberFormat("en-US", {
                        style: "currency",
                        currency: "USD",
                      }).format(product.price - product.discount)}
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
          })
        ) : (
          <div>No exact matches found</div>
        )}
      </div>
      <div className="flex justify-center items-center gap-3 py-3 border-t">
        <button
          onClick={prevPage}
          className="inline-flex items-center justify-center hover:bg-[#EDEDED] text-[#707070] bg-[#F7F7F7] p-2 border rounded-full"
        >
          <FontAwesomeIcon width={16} icon={faArrowLeft} />
        </button>
        {Array(totalPage)
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
    </>
  );
}
