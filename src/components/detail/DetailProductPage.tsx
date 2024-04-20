"use client";
import "@/app/globals.css";
import { Product } from "@/shared/interfaces";
import {
  avatarGenerateSplit,
  createMarkup,
  generateRandomColor,
  timeFormat,
} from "@/shared/utils";
import {
  faFacebook,
  faFacebookMessenger,
} from "@fortawesome/free-brands-svg-icons";
import {
  faHeart,
  faLink,
  faPhone,
  faShield,
  faStar,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import React from "react";
import { PhotoSlider } from "react-photo-view";
import "react-photo-view/dist/react-photo-view.css";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import RelatedProducts from "../relatedProduct/RelatedProducts";

export default function DetailPage({
  product,
  products,
}: {
  product: Product;
  products: Product[];
}) {
  const { productImages, user } = product;
  const [visible, setVisible] = React.useState(false);
  const [index, setIndex] = React.useState(0);

  return (
    <div className="bg-white max-w-5xl mx-auto my-5">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-2 p-5">
        <div className="col-span-2">
          <Swiper
            key={"product"}
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
            className="customSwiper mySwiper relative"
          >
            {productImages?.map((image, index) => (
              <SwiperSlide key={image.id}>
                <div
                  className="relative h-80"
                  onClick={() => {
                    setIndex(index);
                    setVisible(true);
                  }}
                >
                  <Image
                    key={image.id}
                    className="p-3 shadow object-contain"
                    src={image.url}
                    fill={true}
                    alt={image.name}
                    loading="lazy"
                  />
                </div>
              </SwiperSlide>
            ))}
            <PhotoSlider
              images={productImages.map((item) => ({
                src: item.url,
                key: item.id,
              }))}
              visible={visible}
              onClose={() => setVisible(false)}
              index={index}
              onIndexChange={setIndex}
            />
            <div className="bg-black opacity-70 w-full text-white text-right p-0.5">
              <p className="mr-2">Posted at {timeFormat(product?.createdAt)}</p>
            </div>
          </Swiper>
          <div>
            <div className="flex flex-col gap-3 mt-2">
              <p className="font-bold text-xl">{product?.name}</p>
              <div className="font-bold flex items-baseline gap-2">
                <p className="text-[#e44510] text-lg font-bold">
                  {new Intl.NumberFormat("en-US", {
                    style: "currency",
                    currency: "USD",
                  }).format(product?.price - product?.discount)}
                </p>
                <p className="text-[#707070] font-semibold text-sm line-through">
                  {new Intl.NumberFormat("en-US", {
                    style: "currency",
                    currency: "USD",
                  }).format(product?.price)}
                </p>
              </div>
              <div className="flex flex-col gap-2">
                <p className="text-2xl font-bold">
                  Description from the seller
                </p>
                <p
                  className="text-base leading-5"
                  dangerouslySetInnerHTML={createMarkup(product.description)}
                />
              </div>
              <div className="flex flex-col gap-3">
                <div className="flex flex-col gap-2">
                  <p className="text-2xl font-bold">Item specifics</p>
                  <div className="grid grid-cols-2 gap-x-2 gap-y-1 items-start text-sm font-light">
                    <p className="flex items-center gap-1 text-base">
                      <span className="text-[#707070]">Phone:</span>
                      {product?.contact}
                    </p>
                    <p className="flex items-center gap-1 text-base">
                      <span className="text-[#707070]">Type:</span>
                      {product?.category.name}
                    </p>
                    <p className="flex items-center gap-1 text-base">
                      <span className="text-[#707070]">Quantity:</span>
                      {product?.quantity}
                    </p>
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <p className="text-2xl font-bold">Seller address</p>
                  <p className="flex items-start gap-1 text-base">
                    {product?.location}
                  </p>
                </div>
              </div>
              <p className="font-medium text-gray-500">
                Share with your friends
              </p>
              <div className="flex items-center gap-5 py-4 border-y">
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
              <div className="flex items-center gap-2 text-sm italic">
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
          <div className="flex flex-col gap-3 sticky top-20 pt-2.5 border-t">
            <div className="flex items-start gap-3">
              <div
                className="w-12 h-12 relative flex justify-center items-center rounded-full text-xl text-white uppercase"
                style={{
                  backgroundColor: `${generateRandomColor(user.name)}`,
                }}
              >
                {avatarGenerateSplit(user.name)}
              </div>
              <div className="flex-grow">
                <p>{user.name}</p>
                <div className="flex items-baseline gap-2 pb-2">
                  <div className="text-yellow-500">
                    {Array(5)
                      .fill(null)
                      .map((_, index) => (
                        <FontAwesomeIcon key={index} width={14} icon={faStar} />
                      ))}
                  </div>
                  <span className="text-sm font-bold">5.0</span>
                  <span className="hover:text-[#707070] text-sm cursor-pointer underline">
                    56 Reviews
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-full flex justify-center items-center gap-2 text-sm text-[#222] font-semibold px-3 py-1 border hover:opacity-80 cursor-pointer border-slate-300 rounded-md">
                    <FontAwesomeIcon width={14} icon={faHeart} />
                    Save seller
                  </div>
                  <div className="w-full flex justify-center items-center gap-2 text-sm text-[#222] font-semibold px-3 py-1 border hover:opacity-80 cursor-pointer border-slate-300 rounded-md">
                    <FontAwesomeIcon width={14} icon={faPhone} />
                    Contact
                  </div>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2 bg-[#61a937] hover:bg-[#3c763d] text-white py-2 px-3 rounded cursor-pointer">
              <FontAwesomeIcon width={16} icon={faPhone} />
              <span>{product?.contact}</span>
            </div>
          </div>
        </div>
      </div>
      <RelatedProducts products={products} />
    </div>
  );
}
