"use client";
import { getAllCategories, getAllProducts } from "@/api";
import { Category, Product } from "@/shared/interfaces";
import { timeFormat } from "@/utils";
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
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import Link from "next/link";

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
  const [category, setCategory] = React.useState([]);

  const { data: getCategories, isFetching: isFetchingCategories } = useQuery({
    queryKey: ["categories", page, search, category],
    queryFn: () => getAllCategories(),
    initialData: {
      categories,
    },
  });

  const { data: getProducts, isFetching: isFetchingProducts } = useQuery({
    queryKey: ["products", page, search, category],
    queryFn: () => getAllProducts({ page, search, category }),
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
                  layout="fill"
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
                  layout="fill"
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
                  layout="fill"
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
              ? Array(7)
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
                    <div
                      key={category.id}
                      className={`rounded-b-lg ${
                        category.status.trim() === "Published" ? "" : "hidden"
                      }`}
                    >
                      <a href="#" className="flex flex-col items-center">
                        <div className="relative h-20 w-20">
                          <Image
                            src={category?.image ?? "/images/category.jpeg"}
                            className="object-cover rounded-3xl"
                            alt={category.name}
                            loading="lazy"
                            layout="fill"
                          />
                        </div>
                        <p className="text-sm line-clamp-2 text-gray-600 mt-2">
                          {category.name}
                        </p>
                      </a>
                    </div>
                  );
                })}
          </div>
        </div>
        <div className="shadow p-3 my-5">
          <p className="font-bold text-lg">Products</p>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 mt-5">
            {isFetchingProducts
              ? Array(7)
                  .fill(null)
                  .map((_, index) => (
                    <div className={`rounded-b-lg border`} key={index}>
                      <div className="relative w-full h-64">
                        <Skeleton className="h-full rounded-b-lg" />
                      </div>
                      <div className="px-4 py-4">
                        <Skeleton count={3} />
                      </div>
                    </div>
                  ))
              : getProducts?.products?.map((product: Product) => {
                  return (
                    <Link
                      href={`/products/${product.id}`}
                      className={`rounded-b-lg border hover:shadow-lg cursor-pointer ${
                        product.status.trim() === "Published" ? "" : "hidden"
                      }`}
                      key={product.id}
                    >
                      <div className="relative w-full h-64">
                        <Image
                          src={
                            product?.productImages?.[0]?.name ??
                            "/images/empty-product.jpeg"
                          }
                          className="object-cover"
                          alt={product.name}
                          loading="lazy"
                          layout="fill"
                        />
                      </div>
                      <div className="px-4 py-4 flex flex-col gap-2">
                        <>
                          <div className="text-sm text-gray-600">
                            {product.name}
                          </div>
                          <div className="font-bold flex items-baseline gap-2">
                            <p className="text-[#d70018] font-bold">
                              {new Intl.NumberFormat("en-US", {
                                style: "currency",
                                currency: "USD",
                              }).format(
                                product?.price - product?.discountPrice
                              )}
                            </p>
                            <p className="text-[#707070] font-semibold text-sm line-through">
                              {new Intl.NumberFormat("en-US", {
                                style: "currency",
                                currency: "USD",
                              }).format(product?.price)}
                            </p>
                          </div>
                        </>
                        <div className="flex justify-between gap-1 text-sm text-gray-500">
                          <div className="flex justify-between items-center gap-1">
                            <FontAwesomeIcon width={15} icon={faClock} />
                            {timeFormat(product.createdAt)}
                          </div>
                          <div className="flex justify-between items-center gap-1">
                            <FontAwesomeIcon width={15} icon={faLocationDot} />
                            {product.location}
                          </div>
                          <div
                            className="cursor-pointer text-sm font-light"
                            onClick={() => setHeartStatus(!heartStatus)}
                          >
                            {heartStatus ? (
                              <FontAwesomeIcon
                                className="text-red-600"
                                width={30}
                                size="xl"
                                icon={fasHeart}
                              />
                            ) : (
                              <FontAwesomeIcon
                                className="text-red-600"
                                width={30}
                                size="xl"
                                icon={farHeart}
                              />
                            )}
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
