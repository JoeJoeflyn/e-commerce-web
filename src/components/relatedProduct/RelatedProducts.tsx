import Image from "next/image";
import Link from "next/link";
import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import { Navigation, Scrollbar } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import FavoriteItem from "../favorite/FavoriteItem";
import { Product } from "@/shared/interfaces";

export default function RelatedProducts({ products }: { products: Product[] }) {
  return (
    <>
      <div className="flex flex-col gap-4 p-5">
        <div className="flex flex-col md:flex-row items-baseline justify-between gap-2">
          <div className="font-bold text-2xl">Explore related items</div>
          <div className="text-[#707070] underline">
            Feedback on our suggestions
          </div>
        </div>
        <div>
          <Swiper
            key={"related"}
            scrollbar={{
              hide: true,
            }}
            spaceBetween={15}
            navigation={true}
            breakpoints={{
              390: {
                slidesPerView: 1,
              },
              640: {
                slidesPerView: 4,
                scrollbar: {
                  hide: true,
                },
              },
              1024: {
                slidesPerView: 4,
                scrollbar: {
                  hide: true,
                },
              },
            }}
            modules={[Scrollbar, Navigation]}
            className="customSwiper mySwiper"
          >
            {false
              ? Array(7)
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
              : products?.map((product, index) => {
                  return (
                    <SwiperSlide key={index}>
                      <Link
                        href={`/product/${product.id}`}
                        className={`p-2 cursor-pointer ${true ? "" : "hidden"}`}
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
                          <FavoriteItem />
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
                              }).format(product.price - product.discountPrice)}
                            </p>
                            <p className="text-[#707070] font-semibold text-sm line-through">
                              {new Intl.NumberFormat("en-US", {
                                style: "currency",
                                currency: "USD",
                              }).format(product.price)}
                            </p>
                          </div>
                        </div>
                      </Link>
                    </SwiperSlide>
                  );
                })}
          </Swiper>
        </div>
      </div>
    </>
  );
}
