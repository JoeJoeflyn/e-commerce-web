"use client";
import { getProduct, getProductsByUserId } from "@/api";
import useGetUser from "@/hooks/useGetUser";
import useNavigate from "@/hooks/useNavigate";
import { LIMIT_PAGE, NAVIGATE_KEYS } from "@/shared/constants";
import { Product } from "@/shared/interfaces";
import {
  avatarGenerateSplit,
  generateRandomColor,
  minIdImageIndices,
  timeFormat,
} from "@/shared/utils";
import { faEye } from "@fortawesome/free-regular-svg-icons";
import {
  faArrowLeft,
  faArrowRight,
  faCircleInfo,
  faPen,
  faPlus,
  faTag,
  faTrash,
  faUserGroup,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { QueryClient, useQuery, useQueryClient } from "@tanstack/react-query";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export default function Management() {
  useNavigate(NAVIGATE_KEYS.AUTHENTICATED);
  const queryClient = useQueryClient();
  const params = useParams();
  const { user } = useGetUser();
  const [minIdIndices, setMinIdIndices] = React.useState<number[]>([]);
  const [page, setPage] = React.useState(1);
  const { data, isLoading } = useQuery({
    queryKey: ["productsByUserId", page, +params?.id],
    queryFn: () =>
      getProductsByUserId({
        page,
        userId: +params?.id,
        limit: LIMIT_PAGE,
      }),
    staleTime: 10 * 1000,
  });
  const totalPage = Math.ceil(data?.total / LIMIT_PAGE);

  // Prefetch the next page!
  React.useEffect(() => {
    if (page < totalPage) {
      const prefetchPage = page + 1;
      queryClient.prefetchQuery({
        queryKey: ["productsByUserId", prefetchPage, +params?.id],
        queryFn: () =>
          getProductsByUserId({
            page: prefetchPage,
            userId: +params?.id,
            limit: LIMIT_PAGE,
          }),
        staleTime: 10 * 1000,
      });
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [totalPage, page, queryClient, +params?.id]);

  React.useEffect(() => {
    setMinIdIndices(minIdImageIndices(data?.products));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data?.products]);

  return (
    <div className="max-w-5xl mx-auto">
      <div className="flex flex-col p-3 gap-3 border border-[#e8e8e8] bg-white ">
        <div className="flex items-center gap-2 text-sm">
          <p className="font-bold">Shortcut</p>
          <div className="bg-[#f4f4f4] flex gap-1 items-center rounded-full p-2">
            <FontAwesomeIcon width={16} icon={faUserGroup} />
            Contact
          </div>
        </div>
        <div className="flex items-center gap-2">
          <div
            className="w-12 h-12 relative flex justify-center items-center rounded-full text-xl text-white uppercase"
            style={{
              backgroundColor: `${generateRandomColor(user?.name)}`,
            }}
          >
            {avatarGenerateSplit(user?.name)}
          </div>
          <div>
            <p className="font-bold text-lg">{user?.name}</p>
            <div className="flex items-center gap-1 text-sm text-[#4576dc]">
              <FontAwesomeIcon width={16} icon={faPlus} />
              Create shop
            </div>
          </div>
        </div>
        <div className="border-t pt-2 text-sm font-bold uppercase">
          <p>Your list items</p>
        </div>
      </div>
      {isLoading
        ? Array(5)
            .fill(null)
            .map((_, index) => {
              return (
                <div
                  key={index}
                  className="grid grid-cols-1 md:grid-cols-3 bg-white my-3 border-[#e8e8e8] rounded-lg shadow"
                >
                  <div className="flex items-start p-3 gap-3 col-span-2">
                    <div className="relative w-48 h-full">
                      <Skeleton className="h-full rounded-b-lg" />
                    </div>
                    <div className="relative flex-grow">
                      <Skeleton count={5} />
                    </div>
                  </div>
                  <div className="flex flex-col gap-2 border-l p-3">
                    <div className="grid grid-cols-3 grid-rows-3 gap-0.5 text-xs">
                      <div className="flex flex-col justify-center rounded-sm px-3 py-2 bg-[#F4F4F4]">
                        <div className="flex items-center self-center gap-1">
                          Views <FontAwesomeIcon width={16} icon={faEye} />
                        </div>
                        <div className="flex-grow">
                          <Skeleton count={1} />
                        </div>
                      </div>
                      <div className="bg-[#F4F4F4] col-span-2 flex items-center gap-1 px-3 py-2 rounded-sm">
                        <div className="flex items-center gap-1">
                          <FontAwesomeIcon width={16} icon={faTag} />
                        </div>
                        <div className="flex-grow">
                          <Skeleton count={1} />
                        </div>
                      </div>
                      <div className="bg-[#F4F4F4] col-span-3 row-span-3 flex flex-col gap-1 px-3 py-2 rounded-sm">
                        <span className="flex items-center gap-1">
                          <FontAwesomeIcon width={16} icon={faCircleInfo} />
                          Description
                        </span>
                        <div>
                          <Skeleton count={3} />
                        </div>
                      </div>
                    </div>
                    <div className="grid grid-cols-3 gap-1 text-sm font-bold">
                      <button className="px-3 py-2 text-white bg-sky-500 hover:bg-sky-600 rounded-xl">
                        <FontAwesomeIcon width={16} icon={faPen} />
                      </button>
                      <button className="px-3 py-2 text-white bg-slate-400 hover:bg-slate-500 rounded-xl">
                        <FontAwesomeIcon width={16} icon={faEye} />
                      </button>
                      <button className="px-3 py-2 text-white bg-red-500 hover:bg-red-700 rounded-xl">
                        <FontAwesomeIcon width={16} icon={faTrash} />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })
        : data?.products?.map((product: Product, index: number) => {
            const minIdImageIndex = minIdIndices?.[index];
            return (
              <div
                key={product?.id}
                className="grid grid-cols-1 md:grid-cols-3 bg-white my-3 border-[#e8e8e8] rounded-lg shadow"
              >
                <div className="flex items-start p-3 gap-3 col-span-2">
                  <div className="relative w-48 h-full">
                    <Image
                      className="object-cover rounded-lg"
                      src={
                        product?.productImages?.[minIdImageIndex]?.name ||
                        "data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs="
                      }
                      fill={true}
                      alt={product?.name}
                      priority={true}
                      sizes="(100vw - 10px) 300px, 300px"
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <p className="font-bold text-sm">{product?.name}</p>
                    <div className="font-bold flex gap-3 items-baseline">
                      <p className="text-[#e44510] text-lg font-bold">
                        {new Intl.NumberFormat("en-US", {
                          style: "currency",
                          currency: "USD",
                        }).format(product.price - product.discountPrice)}
                      </p>
                      <p className="text-[#707070] text-sm font-medium line-through">
                        {new Intl.NumberFormat("en-US", {
                          style: "currency",
                          currency: "USD",
                        }).format(product.price)}
                      </p>
                    </div>
                    <p className="text-sm">{product.location}</p>
                    <p className="flex gap-1 text-sm">
                      Posting date:
                      <span className="text-[#222] font-medium">
                        {timeFormat(product.createdAt)}
                      </span>
                    </p>
                  </div>
                </div>
                <div className="flex flex-col gap-2 border-l p-3">
                  <div className="grid grid-cols-3 grid-rows-3 gap-0.5 text-xs">
                    <p className="flex flex-col items-center justify-center rounded-sm px-3 py-2 bg-[#F4F4F4]">
                      <span className="flex items-center gap-1">
                        Views <FontAwesomeIcon width={16} icon={faEye} />
                      </span>
                      <span>4</span>
                    </p>
                    <p className="bg-[#F4F4F4] col-span-2 px-3 py-2 flex items-center justify-center gap-2 rounded-sm">
                      <FontAwesomeIcon width={16} icon={faTag} />
                      {product.category.name}
                    </p>
                    <div className="bg-[#F4F4F4] col-span-3 row-span-3 flex flex-col gap-1 px-3 py-2 rounded-sm ">
                      <span className="flex items-center gap-1">
                        <FontAwesomeIcon width={16} icon={faCircleInfo} />
                        Description
                      </span>
                      <p className="text-sm line-clamp-3">
                        {product.description}
                      </p>
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-1 text-sm font-bold">
                    <button className="px-3 py-2 text-white bg-sky-500 hover:bg-sky-600 rounded-xl">
                      <FontAwesomeIcon width={16} icon={faPen} />
                    </button>
                    <Link
                      href={`/product/${product?.id}`}
                      className="px-3 py-2 text-white text-center bg-slate-400 hover:bg-slate-500 rounded-xl"
                    >
                      <FontAwesomeIcon width={16} icon={faEye} />
                    </Link>
                    <button className="px-3 py-2 text-white bg-red-500 hover:bg-red-700 rounded-xl">
                      <FontAwesomeIcon width={16} icon={faTrash} />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
      <div className="flex justify-center items-center gap-3 py-3 border-t">
        <button
          onClick={() =>
            setPage((prevPage) => (prevPage <= 1 ? 1 : prevPage - 1))
          }
          className="inline-flex items-center justify-center hover:bg-[#EDEDED] text-[#707070] bg-[#F7F7F7] p-2 border rounded-full"
        >
          <FontAwesomeIcon width={16} icon={faArrowLeft} />
        </button>
        {Array(totalPage || 1)
          .fill(null)
          .map((_, index) => (
            <button
              key={index}
              onClick={() => setPage(index + 1)}
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
          onClick={() =>
            setPage((prevPage) =>
              prevPage < totalPage ? prevPage + 1 : prevPage
            )
          }
          // onMouseEnter={() => prefetchData(page)}
          className="inline-flex items-center justify-center hover:bg-[#EDEDED] text-[#707070] bg-[#F7F7F7] p-2 border rounded-full"
        >
          <FontAwesomeIcon width={16} icon={faArrowRight} />
        </button>
      </div>
    </div>
  );
}
