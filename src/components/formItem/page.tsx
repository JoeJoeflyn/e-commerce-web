"use client";
import { useCreateProduct } from "@/hooks/reactQuery/useCreateProduct";
import { useEditProduct } from "@/hooks/reactQuery/useEditProduct";
import usePrefetchProductUser from "@/hooks/reactQuery/usePrefetchProductUser";
import useImageUploadHandler from "@/hooks/useFileHandler";
import useGetUser from "@/hooks/useGetUser";
import useNavigate from "@/hooks/useNavigate";
import { ProductSchema } from "@/schema/schema";
import { NAVIGATE_KEYS } from "@/shared/constants";
import { FormFields } from "@/shared/interfaces";
import { faClose, faImage, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  ErrorMessage,
  Field,
  FieldProps,
  Form,
  Formik,
  FormikProps,
} from "formik";
import Image from "next/image";
import React from "react";
import { NumericFormat } from "react-number-format";
import "react-quill/dist/quill.snow.css";
import FormLoading from "../loading/formLoading";
import ModalConfirmation from "../modalConfirmation/modalConfirmation";
import dynamic from "next/dynamic";

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

export default function FormItem({
  formRef,
  productId,
  closeModal,
}: {
  formRef: React.MutableRefObject<FormikProps<any> | null>;
  productId?: number;
  closeModal: () => void;
}) {
  useNavigate(NAVIGATE_KEYS.AUTHENTICATED);
  const [open, setOpen] = React.useState(false);
  const [idDeleteImage, setIdDeleteImage] = React.useState(0);
  const { user } = useGetUser();
  const { previewImages, handleFileChange, handleRemoveImage } =
    useImageUploadHandler();
  const { mutate: editProduct } = useEditProduct({
    userId: user?.id,
    closeModal,
  });
  const { mutate: createProduct } = useCreateProduct();
  const { product, productImages, formFields, isFetching } =
    usePrefetchProductUser(productId as number);

  const allImages = React.useMemo(
    () => [
      ...(productImages?.map(
        ({ id, url, name }: { id: number; url: string; name: string }) => ({
          id,
          url,
          name,
        })
      ) ?? []),
      ...(previewImages?.map((url) => ({ url, name: "" })) ?? []),
    ],
    [productImages, previewImages]
  );

  const handleDelete = React.useCallback((id: number) => {
    setOpen(true);
    setIdDeleteImage(id);
  }, []);

  return (
    <>
      <Formik<FormFields>
        innerRef={formRef}
        initialValues={{
          categoryId: product?.product?.categoryId || "",
          files: [],
          name: product?.product?.name || "",
          price: product?.product?.price?.toString() || "",
          discount: product?.product?.discount?.toString() || "",
          quantity: product?.product?.quantity?.toString() || "",
          contact: product?.product?.contact || "",
          location: product?.product?.location || "",
          description: product?.product?.description || "",
        }}
        validationSchema={ProductSchema}
        onSubmit={(values, { setSubmitting }) => {
          const payload = {
            ...values,
            userId: user.id.toString(),
            price: +values.price.replace(/,/g, ""),
            discount: +values.discount.replace(/,/g, ""),
            quantity: +values.quantity.replace(/,/g, ""),
          };

          if (product?.product?.id) {
            // Edit mode
            editProduct({
              ...payload,
              id: product.product.id,
            });
          } else {
            // Create mode
            createProduct(payload);
          }

          setSubmitting(false);
        }}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          setFieldValue,
          setFieldTouched,
        }: FormikProps<FormFields>) => {
          return isFetching ? (
            <FormLoading />
          ) : (
            <Form className="grid md:grid-cols-3 justify-center gap-5 rounded">
              <div>
                <p className="text-lg font-bold text-start md:text-center">
                  Product images
                </p>
                {allImages?.length !== 0 ? (
                  <div className="grid grid-cols-3 gap-2 mt-5">
                    <div className="relative border-dotted rounded-lg border-2 border-[#f80] bg-gray-100 flex justify-center items-center">
                      <div className="absolute">
                        <div className="flex flex-col items-center">
                          <FontAwesomeIcon
                            className="text-[#f80]"
                            icon={faPlus}
                            size="3x"
                            width={25}
                            height={25}
                          />
                        </div>
                      </div>
                      <input
                        type="file"
                        name="files"
                        className="h-full w-full opacity-0 cursor-pointer"
                        accept="image/*"
                        multiple
                        onChange={(e) => {
                          const files = Array.from(e.target.files as FileList);
                          setFieldValue("files", files);
                          handleFileChange(e);
                        }}
                      />
                    </div>
                    {allImages
                      ?.sort((a, b) => a.id - b.id)
                      ?.map((image, index) => {
                        return (
                          <div key={index} className="relative h-28">
                            <Image
                              src={image.url}
                              alt={image.name}
                              fill={true}
                              objectFit="contain"
                              className="border border-gray-300 border-solid"
                            />
                            {index === 0 && (
                              <p className="absolute bottom-0 left-0 bg-black text-white text-xs text-center w-full p-1 opacity-80">
                                Cover image
                              </p>
                            )}
                            <button
                              type="button"
                              onClick={() => {
                                if (image.name === "") {
                                  handleRemoveImage(image.url);
                                } else {
                                  handleDelete(image.id);
                                }
                              }}
                              className="absolute -top-2 -right-2 bg-black text-white w-6 h-6 flex items-center justify-center rounded-full z-10"
                            >
                              <FontAwesomeIcon
                                icon={faClose}
                                width={10}
                                height={10}
                              />
                            </button>
                          </div>
                        );
                      })}
                  </div>
                ) : (
                  <div className="relative border-dotted h-48 mt-5 rounded-lg border-2 border-[#f80] bg-gray-100 flex justify-center items-center">
                    <div className="absolute">
                      <div className="flex flex-col items-center">
                        <FontAwesomeIcon
                          className="text-[#f80]"
                          icon={faImage}
                          size="3x"
                          width={50}
                          height={50}
                        />
                        <span className="block text-gray-400 font-bold text-xs">
                          Attach your files here
                        </span>
                        <span className="text-gray-400 font-bold text-xs">
                          Only 6 images can be uploaded
                        </span>
                      </div>
                    </div>
                    <input
                      type="file"
                      name="files"
                      className="h-full w-full opacity-0 cursor-pointer"
                      accept="image/*"
                      multiple
                      onChange={(e) => {
                        const files = Array.from(e.target.files as FileList);
                        setFieldValue("files", files);
                        handleFileChange(e);
                      }}
                    />
                  </div>
                )}
              </div>
              <div className="md:col-span-2 grid gap-3">
                {formFields.map((field) => {
                  return (
                    <div className="relative" key={field.name}>
                      {["price", "discount", "quantity"].includes(
                        field.name
                      ) ? (
                        <NumericFormat
                          onChange={handleChange}
                          onBlur={handleBlur}
                          name={field.name}
                          value={
                            (values as { [key: string]: any })[field.name] || ""
                          }
                          thousandSeparator
                          allowNegative={false}
                          className={`rounded peer w-full placeholder:text-transparent focus:border-none ${
                            (errors as { [key: string]: any })[field.name] &&
                            (touched as { [key: string]: any })[field.name]
                              ? "border-pink-500 border-2 focus:ring-pink-500"
                              : "focus:ring-[#f80]"
                          }`}
                          placeholder={
                            field.name.charAt(0).toUpperCase() +
                            field.name.slice(1)
                          }
                          id={field.name}
                        />
                      ) : field.type === "select" ? (
                        <Field
                          as="select"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          name={field.name}
                          value={
                            (values as { [key: string]: any })[field.name] || ""
                          }
                          className={`rounded peer w-full placeholder:text-transparent focus:border-none ${
                            (errors as { [key: string]: any })[field.name] &&
                            (touched as { [key: string]: any })[field.name]
                              ? "border-pink-500 border-2 focus:ring-pink-500"
                              : "focus:ring-[#f80]"
                          }`}
                        >
                          <option value="" disabled hidden></option>
                          {field.options?.map(
                            (option: { id: number; name: string }) => (
                              <option key={option.id} value={option.id}>
                                {option.name}
                              </option>
                            )
                          )}
                        </Field>
                      ) : field.name === "description" ? (
                        <Field name={field.name}>
                          {({ field }: FieldProps) => {
                            return (
                              <ReactQuill
                                onChange={(content) =>
                                  setFieldValue("description", content)
                                }
                                onBlur={() =>
                                  setFieldTouched("description", true)
                                }
                                value={
                                  (values as { [key: string]: any })[
                                    field.name
                                  ] || ""
                                }
                                className={`rounded peer w-full placeholder:text-transparent focus:border-none ${
                                  (errors as { [key: string]: any })[
                                    field.name
                                  ] &&
                                  (touched as { [key: string]: any })[
                                    field.name
                                  ]
                                    ? "border-pink-500 border-2 focus:ring-pink-500"
                                    : "focus:ring-[#f80]"
                                }`}
                              />
                            );
                          }}
                        </Field>
                      ) : (
                        <Field
                          onChange={handleChange}
                          onBlur={handleBlur}
                          name={field.name}
                          type="text"
                          value={
                            (values as { [key: string]: any })[field.name] || ""
                          }
                          className={`rounded peer w-full placeholder:text-transparent focus:border-none ${
                            (errors as { [key: string]: any })[field.name] &&
                            (touched as { [key: string]: any })[field.name]
                              ? "border-pink-500 border-2 focus:ring-pink-500"
                              : "focus:ring-[#f80]"
                          }`}
                          placeholder={field.name}
                          id={field.name}
                        />
                      )}
                      <label
                        htmlFor={field.name}
                        className={`absolute left-0 ml-1 -translate-y-2 bg-white text-xs px-3 peer-placeholder-shown:text-base duration-100 ease-linear text-gray-500 peer peer-focus:ml-1 peer-focus:bg-white peer-focus:-translate-y-2 peer-focus:px-3 peer-focus:text-xs`}
                      >
                        {field.name.charAt(0).toUpperCase() +
                          field.name.slice(1)}
                      </label>
                      <ErrorMessage name={field.name}>
                        {(msg) => (
                          <div className="text-red-500 text-start mt-1">
                            {msg}
                          </div>
                        )}
                      </ErrorMessage>
                    </div>
                  );
                })}
              </div>
            </Form>
          );
        }}
      </Formik>
      <ModalConfirmation
        idDeleteImage={idDeleteImage}
        open={open}
        setOpen={setOpen}
      />
    </>
  );
}
