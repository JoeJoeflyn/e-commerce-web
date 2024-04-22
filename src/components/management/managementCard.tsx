import { useDeleteProduct } from "@/hooks/reactQuery/useDeleteProduct";
import { Product } from "@/shared/interfaces";
import { createMarkup, timeFormat } from "@/shared/utils";
import { faEye } from "@fortawesome/free-regular-svg-icons";
import {
  faCircleInfo,
  faPen,
  faTag,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import Link from "next/link";

const ManagementProductCard = ({
  product,
  openModal,
  minIdImageIndex,
}: {
  product: Product;
  openModal: (id?: number) => void;
  minIdImageIndex: number;
}) => {
  const { mutate } = useDeleteProduct();

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 bg-white my-3 border-[#e8e8e8] rounded-lg shadow">
      <div className="flex items-start p-3 gap-3 col-span-2">
        <div className="relative w-48 h-full">
          <Image
            className="object-contain rounded-lg"
            src={
              product?.productImages?.[minIdImageIndex]?.url ||
              "data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs="
            }
            fill={true}
            alt={product?.productImages?.[minIdImageIndex]?.name}
            priority={true}
            sizes="(100vw - 10px) 300px, 300px"
          />
        </div>
        <div className="flex flex-col gap-2">
          <p className="font-bold text-sm">{product?.name}</p>
          <div className="font-bold flex gap-3 items-baseline">
            <p className="text-[#e44510] text-lg font-bold">
              {new Intl.NumberFormat("en-US", {
                style: "currency",
                currency: "USD",
              }).format(product.price - product.discount)}
            </p>
            <p className="text-[#707070] text-sm font-medium line-through">
              {new Intl.NumberFormat("en-US", {
                style: "currency",
                currency: "USD",
              }).format(product.price)}
            </p>
          </div>
          <p className="text-sm">{product.location}</p>
          <p className="flex gap-1 text-sm">
            Posting date:
            <span className="text-[#222] font-medium">
              {timeFormat(product.createdAt)}
            </span>
          </p>
        </div>
      </div>
      <div className="flex flex-col gap-2 border-l p-3">
        <div className="grid grid-cols-3 grid-rows-3 gap-0.5 text-xs">
          <p className="flex flex-col items-center justify-center rounded-sm px-3 py-2 bg-[#F4F4F4]">
            <span className="flex items-center gap-1">
              Views <FontAwesomeIcon width={16} icon={faEye} />
            </span>
            <span>4</span>
          </p>
          <p className="bg-[#F4F4F4] col-span-2 px-3 py-2 flex items-center justify-center gap-2 rounded-sm">
            <FontAwesomeIcon width={16} icon={faTag} />
            {product.category.name}
          </p>
          <div className="bg-[#F4F4F4] col-span-3 row-span-3 flex flex-col gap-1 px-3 py-2 rounded-sm ">
            <span className="flex items-center gap-1">
              <FontAwesomeIcon width={16} icon={faCircleInfo} />
              Description
            </span>
            <p
              className="text-sm line-clamp-3"
              dangerouslySetInnerHTML={createMarkup(product.description)}
            />
          </div>
        </div>
        <div className="grid grid-cols-3 gap-1 text-sm font-bold">
          <button
            onClick={() => openModal(product?.id)}
            className="px-3 py-2 text-white w-full text-center bg-sky-500 hover:bg-sky-600 rounded-xl"
          >
            <FontAwesomeIcon width={16} icon={faPen} />
          </button>
          <Link
            href={`/product/${product?.id}`}
            className="px-3 py-2 text-white text-center bg-slate-400 hover:bg-slate-500 rounded-xl"
          >
            <FontAwesomeIcon width={16} icon={faEye} />
          </Link>
          <button
            onClick={() => mutate(product?.id)}
            className="px-3 py-2 text-white bg-red-500 hover:bg-red-700 rounded-xl"
          >
            <FontAwesomeIcon width={16} icon={faTrash} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ManagementProductCard;
