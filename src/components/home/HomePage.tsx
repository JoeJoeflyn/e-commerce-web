"use client";

import { Category, Product } from "@/shared/interfaces";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import Link from "next/link";
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
            {categories?.map((category: Category) => {
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
