"use client";
import { getAllCategories, getProducts } from "@/api";
import { Category, Product } from "@/shared/interfaces";
import { timeFormat } from "@/shared/utils";
import { faHeart as farHeart } from "@fortawesome/free-regular-svg-icons";
import {
  faClock,
  faLocationDot,
  faHeart as fasHeart,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import Link from "next/link";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Autoplay, Navigation, Pagination } from "swiper/modules";

export default function Home({
  categories,
  products,
}: {
  categories: Category[];
  products: Product[];
}) {
  const [heartStatus, setHeartStatus] = React.useState(false);
  const [page, setPage] = React.useState(1);
  const [search, setSearch] = React.useState("");
  const [categoryId, setCategoryId] = React.useState([]);

  const { data: getCategories, isFetching: isFetchingCategories } = useQuery({
    queryKey: ["categories"],
    queryFn: () => getAllCategories(),
    initialData: {
      categories,
    },
  });

  const { data: _products, isFetching: isFetchingProducts } = useQuery({
    queryKey: ["products", page, search, categoryId],
    queryFn: () => getProducts({ page, search, categoryId }),
    initialData: {
      products,
    },
  });

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
            {isFetchingCategories
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
              : getCategories?.categories?.map((category: Category) => {
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
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 mt-5">
            {isFetchingProducts
              ? Array(8)
                  .fill(null)
                  .map((_, index) => (
                    <div className={`rounded-b-lg p-2`} key={index}>
                      <div className="relative w-full h-64">
                        <Skeleton className="h-full rounded-b-lg" />
                      </div>
                      <div className="py-2">
                        <Skeleton count={3} />
                      </div>
                    </div>
                  ))
              : _products?.products?.map((product: Product) => {
                  return (
                    <Link
                      href={`/product/${product.id}`}
                      key={product.id}
                      className={`rounded-b-lg cursor-pointer ${
                        product.status.trim() === "Published" ? "" : "hidden"
                      }`}
                    >
                      <div className="relative w-full h-64 bg-[#0000000D] rounded-2xl">
                        <Image
                          src={
                            product?.productImages?.[0]?.name ??
                            "/images/empty-product.jpeg"
                          }
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
                      <div className="flex flex-col gap-2 text-[#191919] m-2">
                        <div className="text-sm hover:underline font-normal">
                          {product.name}
                        </div>
                        <div className="font-bold flex justify-between items-baseline gap-2">
                          <p className="text-lg font-bold">
                            {new Intl.NumberFormat("en-US", {
                              style: "currency",
                              currency: "USD",
                            }).format(product?.price - product?.discountPrice)}
                          </p>
                          <p className="text-[#707070] font-semibold text-sm line-through">
                            {new Intl.NumberFormat("en-US", {
                              style: "currency",
                              currency: "USD",
                            }).format(product?.price)}
                          </p>
                        </div>
                        <div className="text-sm text-gray-500">
                          <div className="flex items-center gap-1">
                            <FontAwesomeIcon width={15} icon={faClock} />
                            {timeFormat(product.createdAt)}
                          </div>
                        </div>
                      </div>
                    </Link>
                  );
                })}
          </div>
        </div>
      </div>
    </>
  );
}
