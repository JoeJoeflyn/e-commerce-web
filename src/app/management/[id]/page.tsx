"use client";
import FormItem from "@/components/formItem/page";
import ManagementLoading from "@/components/loading/managementLoading";
import ManagementProductCard from "@/components/managementProductCard/managementProductCard";
import Modal from "@/components/modal/modal";
import Pagination from "@/components/pagination/pagination";
import { usePrefetchProductsByUserId } from "@/hooks/reactQuery/usePrefetchProductsByUserId";
import useGetUser from "@/hooks/useGetUser";
import useModal from "@/hooks/useModal";
import useNavigate from "@/hooks/useNavigate";
import { NAVIGATE_KEYS } from "@/shared/constants";
import { Product } from "@/shared/interfaces";
import {
  avatarGenerateSplit,
  generateRandomColor,
  minIdImageIndices,
} from "@/shared/utils";
import { faPlus, faUserGroup } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FormikProps } from "formik";
import { useParams } from "next/navigation";
import React from "react";
import "react-loading-skeleton/dist/skeleton.css";

export default function Management() {
  useNavigate(NAVIGATE_KEYS.AUTHENTICATED);
  const params = useParams();
  const { open, openModal, closeModal, productId } = useModal();
  const { user } = useGetUser();
  const [page, setPage] = React.useState(1);
  const formRef = React.useRef<FormikProps<any> | null>(null);
  const { data, isLoading, totalPage } = usePrefetchProductsByUserId(
    page,
    +params?.id
  );

  const minIdIndices = React.useMemo(
    () => minIdImageIndices(data?.products),
    [data?.products]
  );

  return (
    <>
      <Modal mode="edit" formRef={formRef} open={open} closeModal={closeModal}>
        <FormItem
          formRef={formRef}
          productId={productId}
          closeModal={closeModal}
        />
      </Modal>
      <div className="max-w-5xl mx-auto">
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
                backgroundColor: `${generateRandomColor(user?.name)}`,
              }}
            >
              {avatarGenerateSplit(user?.name)}
            </div>
            <div>
              <p className="font-bold text-lg">{user?.name}</p>
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
        {data?.error && <p className="bg-white text-base p-3">{data?.error}</p>}
        {data?.length && (
          <p className="bg-white text-base p-3">List some product</p>
        )}
        {isLoading
          ? Array(5)
              .fill(null)
              .map((_, index) => <ManagementLoading key={index} />)
          : data?.products?.map((product: Product, index: number) => {
              const minIdImageIndex = minIdIndices?.[index];
              return (
                <ManagementProductCard
                  key={product?.id}
                  product={product}
                  openModal={openModal}
                  minIdImageIndex={minIdImageIndex}
                />
              );
            })}
        <Pagination page={page} totalPage={totalPage} setPage={setPage} />
      </div>
    </>
  );
}
