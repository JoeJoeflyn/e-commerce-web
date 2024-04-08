"use client";
import { getAllCategories, getProducts } from "@/api";
import { Category, Product } from "@/shared/interfaces";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import { useAppSelector } from "@/hooks/redux";
import useDebounce from "@/hooks/useDebounce";
import usePagination from "@/hooks/usePagination";
import Link from "next/link";
import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import Card from "../card/Card";

export default function Home({
  categories,
  products,
}: {
  categories: Category[];
  products: Product[];
}) {
  // const { search } = useAppSelector((state) => state.search);
  // const { nextPage, prevPage, handlePageButtonClick, page } = usePagination(2);
  // const debouncedSearch = useDebounce(search, 500);

  const { data: getCategories, isFetching: isFetchingCategories } = useQuery({
    queryKey: ["categories"],
    queryFn: () => getAllCategories(),
    initialData: {
      categories,
    },
  });

  // const {
  //   data: _products,
  //   isFetching: isFetchingProducts,
  //   refetch,
  // } = useQuery({
  //   queryKey: ["products", page, debouncedSearch],
  //   queryFn: () => getProducts({ page, search: debouncedSearch }),
  //   initialData: {
  //     products,
  //   },
  // });

  // React.useEffect(() => {
  //   refetch();
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [debouncedSearch]);

  return (
    <>
      <div className="max-w-5xl mx-auto bg-white">
        <div className="relative w-full p-3 shadow">
          <Swiper
            spaceBetween={30}
            centeredSlides={true}
            autoplay={{
              delay: 2500,
              disableOnInteraction: false,
            }}
            pagination={{
              clickable: true,
            }}
            loop={true}
            modules={[Autoplay, Pagination, Navigation]}
            className="mySwiper"
          >
            <SwiperSlide>
              <div className="relative h-80">
                <Image
                  className="p-3 shadow object-cover"
                  src="/images/banner.png"
                  fill={true}
                  alt="Banner"
                  loading="lazy"
                />
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="relative h-80">
                <Image
                  className="p-3 shadow object-cover"
                  src="/images/banner.png"
                  fill={true}
                  alt="Banner"
                  loading="lazy"
                />
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="relative h-80">
                <Image
                  className="p-3 shadow object-cover"
                  src="/images/banner.png"
                  fill={true}
                  alt="Banner"
                  loading="lazy"
                />
              </div>
            </SwiperSlide>
          </Swiper>
        </div>
        <div className="shadow p-3 my-5">
          <p className="font-bold text-lg">Categories</p>
          <div className="grid grid-cols-3 lg:grid-cols-7 items-start mt-5 text-center">
            {false
              ? Array(8)
                  .fill(null)
                  .map((_, index) => (
                    <div key={index} className={`rounded-b-lg`}>
                      <a href="#" className="flex flex-col items-center">
                        <div className="relative h-20 w-20">
                          <Skeleton className="h-full rounded-b-lg" />
                        </div>
                        <p className="text-sm w-1/2 line-clamp-2 text-gray-600 mt-2">
                          <Skeleton />
                        </p>
                      </a>
                    </div>
                  ))
              : categories?.map((category: Category) => {
                  return (
                    <Link
                      href={`/category/${category.id}`}
                      key={category.id}
                      className={`flex flex-col items-center rounded-b-lg ${
                        category.status.trim() === "Published" ? "" : "hidden"
                      }`}
                    >
                      <div className="relative h-20 w-20">
                        <Image
                          src={category?.image ?? "/images/category.jpeg"}
                          className="object-cover rounded-3xl"
                          alt={category.name}
                          loading="lazy"
                          fill={true}
                        />
                      </div>
                      <p className="text-sm line-clamp-2 text-gray-600 mt-2">
                        {category.name}
                      </p>
                    </Link>
                  );
                })}
          </div>
        </div>
        <div className="shadow p-3 my-5">
          <p className="font-bold text-lg">Products</p>
          <Card
            products={products}
            // nextPage={nextPage}
            // prevPage={prevPage}
            // handlePageButtonClick={handlePageButtonClick}
            // page={page}
            // products={_products?.products}
            // isFetchingProducts={isFetchingProducts}
          />
        </div>
      </div>
    </>
  );
}
