import { faHeart as farHeart } from "@fortawesome/free-regular-svg-icons";
import { faHeart as fasHeart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
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

export default function RelatedProducts() {
  const [heartStatus, setHeartStatus] = React.useState(false);

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
              : Array(7)
                  .fill(null)
                  .map((_, index) => {
                    return (
                      <SwiperSlide key={index}>
                        <Link
                          href="#"
                          className={`rounded-b-lg cursor-pointer ${
                            true ? "" : "hidden"
                          }`}
                        >
                          <div className="relative w-full h-64 bg-[#0000000D] rounded-2xl">
                            <Image
                              src={"/images/empty-product.jpeg"}
                              className="object-contain"
                              alt="name"
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
                              *NEW* 2024 Bluegrass (Single) 2024 Mint NH
                            </div>
                            <div className="font-bold flex justify-between items-baseline gap-2">
                              <p className="text-lg font-bold">
                                {new Intl.NumberFormat("en-US", {
                                  style: "currency",
                                  currency: "USD",
                                }).format(3000)}
                              </p>
                              <p className="text-[#707070] font-semibold text-sm line-through">
                                {new Intl.NumberFormat("en-US", {
                                  style: "currency",
                                  currency: "USD",
                                }).format(3000)}
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
