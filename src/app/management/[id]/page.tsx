"use client";
import { getProductsByUserId } from "@/api";
import Loading from "@/components/Loading/loading";
import { useAppSelector } from "@/hooks/redux";
import useNavigate from "@/hooks/useNavigate";
import usePagination from "@/hooks/usePagination";
import { NAVIGATE_KEYS } from "@/shared/constants";
import { Product } from "@/shared/interfaces";
import {
  avatarGenerateSplit,
  generateRandomColor,
  minIdImageIndices,
} from "@/shared/utils";
import { faEye, faEyeSlash } from "@fortawesome/free-regular-svg-icons";
import {
  faCircleInfo,
  faPen,
  faPlus,
  faTag,
  faTrash,
  faUserGroup,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import { useParams } from "next/navigation";

export default function Management() {
  useNavigate(NAVIGATE_KEYS.AUTHENTICATED);
  const params = useParams();
  const { user } = useAppSelector((state) => state);
  const { nextPage, prevPage, handlePageButtonClick, page } = usePagination(2);

  const { data: products, isFetching: isFetchingProducts } = useQuery({
    queryKey: ["products", page, params?.id],
    queryFn: () => getProductsByUserId({ page, userId: +params?.id }),
  });

  const minIdIndices = minIdImageIndices(products);

  return (
    <div className="max-w-5xl mx-auto h-screen">
      <div className="flex flex-col p-3 gap-3 border border-[#e8e8e8] bg-white ">
        <div className="flex items-center gap-2 text-sm">
          <p className="font-bold">Shortcut</p>
          <div className="bg-[#f4f4f4] flex gap-1 items-center rounded-full p-2">
            <FontAwesomeIcon width={16} icon={faUserGroup} />
            Contact
          </div>
        </div>
        <div className="flex items-center gap-2">
          <div
            className="w-12 h-12 relative flex justify-center items-center rounded-full text-xl text-white uppercase"
            style={{
              backgroundColor: `${generateRandomColor(user?.data?.name)}`,
            }}
          >
            {avatarGenerateSplit(user?.data?.name)}
          </div>
          <div>
            <p className="font-bold text-lg">{user?.data?.name}</p>
            <div className="flex items-center gap-1 text-sm text-[#4576dc]">
              <FontAwesomeIcon width={16} icon={faPlus} />
              Create shop
            </div>
          </div>
        </div>
        <div className="border-t pt-2 text-sm font-bold uppercase">
          <p>Your list items</p>
        </div>
      </div>
      {isFetchingProducts ? (
        <Loading />
      ) : (
        products?.map((product: Product, index: number) => {
          const minIdImageIndex = minIdIndices[index];
          return (
            <div
              key={product.id}
              className="grid grid-cols-1 md:grid-cols-3 bg-white mt-3 border-[#e8e8e8] rounded-lg shadow"
            >
              <div className="flex items-start p-3 gap-3 col-span-2">
                <div className="relative w-48 h-full">
                  <Image
                    className="object-cover rounded-lg"
                    src={product.productImages[minIdImageIndex].name}
                    fill={true}
                    alt="Logo"
                    loading="lazy"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <p className="font-bold text-sm">Testing book</p>
                  <p className="text-[#d70018] text-sm font-bold">
                    {new Intl.NumberFormat("en-US", {
                      style: "currency",
                      currency: "USD",
                    }).format(0)}
                  </p>
                  <p className="text-xs">district,county,State</p>
                  <p className="text-xs">
                    Posting date:
                    <span className="text-[#222] font-medium">29/03/24</span>
                  </p>
                  <p className="text-xs">
                    Expire date:
                    <span className="text-[#222] font-medium">29/03/24</span>
                  </p>
                </div>
              </div>
              <div className="flex flex-col gap-2 border-l p-3">
                <div className="grid grid-cols-3 grid-rows-3 gap-0.5 text-xs">
                  <p className="flex flex-col items-center rounded-sm px-3 py-2 bg-[#F4F4F4]">
                    <span className="flex items-center gap-1">
                      Views <FontAwesomeIcon width={16} icon={faEye} />
                    </span>
                    <span>4</span>
                  </p>
                  <p className="bg-[#F4F4F4] col-span-2 px-3 py-2 flex items-center justify-center gap-2 rounded-sm">
                    <FontAwesomeIcon width={16} icon={faTag} /> Electric device
                  </p>
                  <div className="bg-[#F4F4F4] col-span-3 row-span-3 flex flex-col gap-1 px-3 py-2 rounded-sm ">
                    <span className="flex items-center gap-1">
                      <FontAwesomeIcon width={16} icon={faCircleInfo} />{" "}
                      Description
                    </span>
                    <p>This is the section description for product</p>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-1 text-sm font-bold">
                  <button className="px-3 py-2 text-white bg-sky-500 hover:bg-sky-600 rounded-xl">
                    <FontAwesomeIcon width={16} icon={faPen} />
                  </button>
                  <button className="px-3 py-2 text-white bg-yellow-400 hover:bg-yellow-500 rounded-xl">
                    <FontAwesomeIcon width={16} icon={faEyeSlash} />
                  </button>
                  <button className="px-3 py-2 text-white bg-red-500 hover:bg-red-700 rounded-xl">
                    <FontAwesomeIcon width={16} icon={faTrash} />
                  </button>
                </div>
              </div>
            </div>
          );
        })
      )}
    </div>
  );
}
