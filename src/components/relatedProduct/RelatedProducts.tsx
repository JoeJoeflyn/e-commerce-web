import { Product } from "@/shared/interfaces";
import { minIdImageIndices } from "@/shared/utils";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import { Navigation, Scrollbar } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import FavoriteItem from "../favorite/FavoriteItem";
import React from "react";

export default function RelatedProducts({ products }: { products: Product[] }) {
  const minIdIndices = minIdImageIndices(products);

  return (
    <>
      <div className="flex flex-col gap-4 p-5">
        <div className="flex flex-col md:flex-row items-baseline justify-between gap-2">
          <div className="font-bold text-2xl">Explore related items</div>
          <div className="flex items-center gap-5 text-black underline">
            <Link href="#">Feedback on our suggestions</Link>
            <div className="bg-black h-3 w-0.5"></div>
            <Link href={`/category/${products?.[0]?.categoryId}`}>See all</Link>
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
            {products?.map((product, index) => {
              const minIdImageIndex = minIdIndices[index];
              return (
                <SwiperSlide key={product.id}>
                  <Link
                    href={`/product/${product.id}`}
                    className={`p-2 cursor-pointer ${true ? "" : "hidden"}`}
                  >
                    <div className="relative w-full rounded-lg h-64 bg-[#0000000D]">
                      <Image
                        src={product.productImages[minIdImageIndex].name}
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
