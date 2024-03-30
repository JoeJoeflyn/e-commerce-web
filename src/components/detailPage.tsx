"use client";
import "@/app/globals.css";
import { Product } from "@/shared/interfaces";
import { avatarGenerateSplit, generateRandomColor, timeFormat } from "@/utils";
import {
  faFacebook,
  faFacebookMessenger,
} from "@fortawesome/free-brands-svg-icons";
import {
  faLink,
  faLocationDot,
  faPhone,
  faShield,
  faSquareCheck,
  faTag,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "../app/globals.css";
import { PhotoProvider, PhotoView } from "react-photo-view";
import "react-photo-view/dist/react-photo-view.css";

export default function DetailPage({ product }: { product: Product }) {
  return (
    <div className="bg-white max-w-5xl mx-auto my-5">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-2 p-5 border">
        <div className="col-span-2">
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
            navigation={true}
            loop={true}
            modules={[Autoplay, Pagination, Navigation]}
            className="mySwiper relative"
          >
            {product?.productImages.map((image) => (
              <SwiperSlide key={image.id}>
                <div className="relative h-80">
                  <PhotoProvider>
                    <PhotoView src={image.name}>
                      <Image
                        className="p-3 shadow object-contain"
                        src={image.name}
                        layout="fill"
                        alt={image.name}
                        loading="lazy"
                      />
                    </PhotoView>
                  </PhotoProvider>
                </div>
              </SwiperSlide>
            ))}
            <div className="bg-black opacity-70 w-full text-white text-right p-0.5">
              <p className="mr-2">Posted at {timeFormat(product?.createdAt)}</p>
            </div>
          </Swiper>
          <div>
            <div className="flex flex-col gap-3 mt-2">
              <p className="font-medium">{product?.name}</p>
              <div className="font-bold flex items-baseline gap-2">
                <p className="text-[#d70018] font-bold">
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
              <p className="text-sm">{product?.description}</p>
              <div className="grid grid-cols-2 gap-2 text-sm font-light">
                <p className="flex items-center gap-2">
                  <FontAwesomeIcon width={16} icon={faPhone} />
                  Phone: {product?.contact}
                </p>
                <p className="flex items-center gap-2">
                  <FontAwesomeIcon width={16} icon={faTag} />
                  Type: {product?.category.name}
                </p>
                <p className="flex items-center gap-2">
                  <FontAwesomeIcon width={16} icon={faLocationDot} />
                  Location: {product?.location}
                </p>
                <p className="flex items-center gap-2">
                  <FontAwesomeIcon width={16} icon={faSquareCheck} />
                  {product?.status.trim().toLowerCase() === "published" &&
                    "verified"}
                </p>
              </div>
              <p className="font-medium text-gray-500 border-b pb-3">
                Share with your friends
              </p>
              <div className="flex items-center gap-5 pb-3 border-b">
                <FontAwesomeIcon
                  className="text-[#285fbd] cursor-pointer"
                  icon={faFacebook}
                  width={50}
                  size="3x"
                />
                <FontAwesomeIcon
                  className="text-[#3f78d9]"
                  icon={faFacebookMessenger}
                  width={50}
                  size="3x"
                />
                <FontAwesomeIcon
                  className="text-white bg-black inline-block rounded-full p-4"
                  width={16}
                  icon={faLink}
                />
              </div>
              <div className="flex items-center gap-2 text-xs italic">
                <FontAwesomeIcon width={30} size="2x" icon={faShield} />
                <p>
                  This post was verified by admin. If you have any problem,
                  please report the post or contact customer service for
                  support.
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-3">
          <div className="flex flex-col gap-3 sticky top-5 pt-2.5 border-t">
            <div className="flex items-start gap-3">
              <div
                className="w-12 h-12 relative flex justify-center items-center rounded-full text-xl text-white uppercase"
                style={{
                  backgroundColor: `${generateRandomColor("Stacey Fleming")}`,
                }}
              >
                {avatarGenerateSplit("Stacey Fleming")}
              </div>
              <p>Username Here</p>
            </div>
            <div className="flex items-center gap-2 bg-[#61a937] hover:bg-[#3c763d] text-white py-2 px-3 rounded cursor-pointer">
              <FontAwesomeIcon width={16} icon={faPhone} />
              <span>{product?.contact}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
