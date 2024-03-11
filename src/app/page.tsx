"use client";
import Image from "next/image";
import { faHeart as farHeart } from "@fortawesome/free-regular-svg-icons";
import { faHeart as fasHeart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

export default function Home() {
  const [heartStatus, setHeartStatus] = React.useState(false);

  return (
    <>
      <div className="max-w-[15rem] rounded-lg overflow-hidden shadow-md mx-auto">
        <div className="relative">
          <div className="absolute top-0 left-0 bg-red-600 text-white rounded-r-md px-2 py-1">
            $19.99
            <div className="absolute bottom-0 left-0 w-5 h-3 bg-red-600 transform -translate-x-1/2 -rotate-45"></div>
          </div>
          <Image
            className="pt-6"
            width={300}
            height={300}
            src="https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:80/plain/https://cellphones.com.vn/media/catalog/product/i/p/iphone-15-pro-max_3.png"
            alt="Sunset in the mountains"
          />
        </div>
        <div className="px-4 py-4">
          <div className="font-bold text-sm mb-2">The Coldest Sunset</div>
          <div className="flex items-baseline gap-2 font-bold">
            <p className="text-red-600 text-sm">33.000.000</p>
            <p className="text-gray-600 text-xs">34.000.000</p>
          </div>
        </div>
        <div className="px-4 pt-4 pb-2">
          <span
            className="cursor-pointer text-sm font-light"
            onClick={() => setHeartStatus(!heartStatus)}
          >
            Favorite {""}
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
          </span>
        </div>
      </div>
    </>
  );
}
