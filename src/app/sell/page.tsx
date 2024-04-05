"use client";
import { createProduct, getAllCategories } from "@/api/";
import { useAppSelector } from "@/hooks/redux";
import useNavigate from "@/hooks/useNavigate";
import { ProductSchema } from "@/schema/schema";
import { NAVIGATE_KEYS } from "@/shared/constants";
import { faClose, faImage, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useMutation, useQuery } from "@tanstack/react-query";
import { ErrorMessage, Field, Form, Formik } from "formik";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";
import { NumericFormat } from "react-number-format";
import { toast } from "react-toastify";

export default function Sell() {
  const router = useRouter();
  const { user } = useAppSelector((state) => state);
  useNavigate(NAVIGATE_KEYS.AUTHENTICATED);

  const [previewImages, setPreviewImages] = React.useState<string[]>([]);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    const imageFiles = Array.from(files as FileList).filter((file) =>
      file.type.startsWith("image/")
    );

    const imageUrls: string[] = imageFiles.map((file) => {
      return URL.createObjectURL(file);
    });

    const totalImages = previewImages.length + imageUrls.length;

    if (totalImages > 6) {
      toast.error("Only 6 images can be uploaded");
      const remainingSpace = 6 - previewImages.length;
      const imagesToAdd = imageUrls.slice(0, remainingSpace);

      setPreviewImages([...previewImages, ...imagesToAdd]);
      return;
    }

    if (previewImages.length < 6) {
      const remainingSpace = 6 - previewImages.length;
      const imagesToAdd = imageUrls.slice(0, remainingSpace);
      setPreviewImages([...previewImages, ...imagesToAdd]);
    } else {
      toast.error("Only 6 images can be uploaded");
    }
  };

  const handleRemoveImage = (index: number) => {
    const updatedImages = [...previewImages];
    updatedImages.splice(index, 1);
    setPreviewImages(updatedImages);
  };

  const { data } = useQuery({
    queryKey: ["categories"],
    queryFn: getAllCategories,
  });

  const { mutate } = useMutation({
    mutationFn: createProduct,
    onSuccess() {
      toast.success("Created product successfully");
      router.push("/");
    },
    onError(error: { message: string }) {
      toast.error(error?.message);
    },
  });

  return (
    <>
      <div className="grid max-w-5xl mx-auto my-10">
        <Formik
          initialValues={{
            category: "",
            name: "",
            description: "",
            price: "",
            discount: "",
            quantity: "",
            contact: "",
            location: "",
            files: [],
          }}
          validationSchema={ProductSchema}
          onSubmit={(values, { setSubmitting, resetForm }) => {
            mutate({
              ...values,
              userId: user?.data?.id,
              price: +values.price.replace(/,/g, ""),
              discount: +values.discount.replace(/,/g, ""),
              quantity: +values.quantity.replace(/,/g, ""),
            });

            setSubmitting(false);

            resetForm({
              values: {
                category: "",
                name: "",
                description: "",
                price: "",
                discount: "",
                quantity: "",
                contact: "",
                location: "",
                files: [],
              },
            });
            setPreviewImages([]);
          }}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            setFieldValue,
            isSubmitting,
          }) => (
            <Form className="xl:shadow-md grid md:grid-cols-3 justify-center p-5 gap-5 rounded bg-white">
              <div>
                <p className="text-base font-bold">Product images</p>
                {previewImages.length !== 0 ? (
                  <div className="grid grid-cols-3 gap-3 mt-5">
                    <div className="relative border-dotted h-28 xl:w-28 rounded-lg border-2 border-[#f80] bg-gray-100 flex justify-center items-center">
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
                    {previewImages?.map((imageUrl, index) => (
                      <div key={index} className="relative h-28">
                        <Image
                          src={imageUrl}
                          alt={`Preview ${index}`}
                          fill={true}
                          objectFit="contain"
                          className="border border-gray-300 border-solid w-full h-auto"
                        />
                        {index === 0 ? (
                          <p className="absolute bottom-0 left-0 bg-black text-white text-xs text-center w-full p-1 opacity-80">
                            Cover image
                          </p>
                        ) : (
                          ""
                        )}
                        <button
                          type="button"
                          onClick={() => handleRemoveImage(index)}
                          className="absolute -top-2 -right-2 bg-black text-white px-2 rounded-full"
                          style={{ zIndex: 1, borderRadius: "50%" }}
                        >
                          <FontAwesomeIcon
                            icon={faClose}
                            width={10}
                            height={10}
                          />
                        </button>
                      </div>
                    ))}
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

              <div className="md:col-span-2 grid gap-4">
                <div>
                  <div className="relative">
                    <Field
                      onChange={handleChange}
                      as="select"
                      id="category"
                      name="category"
                      onBlur={handleBlur}
                      value={values.category}
                      className={`rounded peer w-full placeholder:text-transparent focus:border-none ${
                        errors.category && touched.category
                          ? "border-pink-500 border-2 focus:ring-pink-500"
                          : "focus:ring-[#f80]"
                      } `}
                    >
                      <option value="" disabled hidden></option>
                      {data?.categories.map(
                        (category: { id: number; name: string }) => (
                          <option key={category.id} value={category.id}>
                            {category.name}
                          </option>
                        )
                      )}
                    </Field>
                    <label
                      htmlFor="category"
                      className={`absolute left-0 ml-1 ${
                        values.category
                          ? "-translate-y-2 bg-white text-xs"
                          : "translate-y-2"
                      } px-3 peer-placeholder-shown:text-base duration-100 ease-linear text-gray-500 peer peer-focus:ml-1 peer-focus:bg-white peer-focus:-translate-y-2 peer-focus:px-3 peer-focus:text-xs`}
                    >
                      Category
                    </label>
                    {errors.category && touched.category ? (
                      <div className="text-red-500 mt-2">{errors.category}</div>
                    ) : null}
                  </div>
                </div>
                <div>
                  <p className="text-lg font-bold">Your detail information</p>
                </div>
                <div
                  className={`relative ${
                    errors.name && touched.name ? "" : ""
                  }`}
                >
                  <Field
                    onChange={handleChange}
                    name="name"
                    type="text"
                    onBlur={handleBlur}
                    value={values.name}
                    className={`rounded peer w-full placeholder:text-transparent focus:border-none ${
                      errors.name && touched.name
                        ? "border-pink-500 border-2 focus:ring-pink-500"
                        : "focus:ring-[#f80]"
                    } `}
                    placeholder="name"
                    id="name"
                  />
                  <label
                    htmlFor="name"
                    className={`absolute left-0 ml-1  px-3 peer-placeholder-shown:text-base duration-100 ease-linear text-gray-500 peer-focus:ml-1 peer-focus:bg-white ${
                      values.name
                        ? "-translate-y-2 bg-white text-xs"
                        : "translate-y-2"
                    }  peer-focus:-translate-y-2 peer-focus:px-3 peer-focus:text-xs`}
                  >
                    Name
                  </label>
                  <ErrorMessage name="name">
                    {(msg) => <div className="text-red-500">{msg}</div>}
                  </ErrorMessage>
                </div>
                <div className="relative">
                  <Field
                    onChange={handleChange}
                    name="description"
                    type="text"
                    onBlur={handleBlur}
                    value={values.description}
                    className={`rounded peer w-full placeholder:text-transparent focus:border-none ${
                      errors.description && touched.description
                        ? "border-pink-500 border-2 focus:ring-pink-500"
                        : "focus:ring-[#f80]"
                    } `}
                    placeholder="Description"
                    id="description"
                  />
                  <label
                    htmlFor="description"
                    className={`absolute left-0 ml-1  px-3 peer-placeholder-shown:text-base duration-100 ease-linear text-gray-500 peer-focus:ml-1 peer-focus:bg-white ${
                      values.description
                        ? "-translate-y-2 bg-white text-xs"
                        : "translate-y-2"
                    }  peer-focus:-translate-y-2 peer-focus:px-3 peer-focus:text-xs`}
                  >
                    Description
                  </label>
                  <ErrorMessage name="description">
                    {(msg) => <div className="text-red-500">{msg}</div>}
                  </ErrorMessage>
                </div>
                <div className="relative">
                  <NumericFormat
                    onChange={handleChange}
                    name="price"
                    onBlur={handleBlur}
                    value={values.price}
                    thousandSeparator
                    allowNegative={false}
                    className={`rounded peer w-full placeholder:text-transparent focus:border-none ${
                      errors.price && touched.price
                        ? "border-pink-500 border-2 focus:ring-pink-500"
                        : "focus:ring-[#f80]"
                    } `}
                    placeholder="Price"
                    id="price"
                  />
                  <label
                    htmlFor="price"
                    className={`absolute left-0 ml-1  px-3 peer-placeholder-shown:text-base duration-100 ease-linear text-gray-500 peer-focus:ml-1 peer-focus:bg-white ${
                      values.price
                        ? "-translate-y-2 bg-white text-xs"
                        : "translate-y-2"
                    }  peer-focus:-translate-y-2 peer-focus:px-3 peer-focus:text-xs`}
                  >
                    Price
                  </label>
                  <ErrorMessage name="price">
                    {(msg) => <div className="text-red-500">{msg}</div>}
                  </ErrorMessage>
                </div>
                <div className="relative">
                  <NumericFormat
                    onChange={handleChange}
                    name="discount"
                    onBlur={handleBlur}
                    value={values.discount}
                    allowNegative={false}
                    thousandSeparator
                    className={`rounded peer w-full placeholder:text-transparent focus:border-none ${
                      errors.discount && touched.discount
                        ? "border-pink-500 border-2 focus:ring-pink-500"
                        : "focus:ring-[#f80]"
                    } `}
                    placeholder="Discount"
                    id="discount"
                  />
                  <label
                    htmlFor="discount"
                    className={`absolute left-0 ml-1  px-3 peer-placeholder-shown:text-base duration-100 ease-linear text-gray-500 peer-focus:ml-1 peer-focus:bg-white ${
                      values.discount
                        ? "-translate-y-2 bg-white text-xs"
                        : "translate-y-2"
                    }  peer-focus:-translate-y-2 peer-focus:px-3 peer-focus:text-xs`}
                  >
                    Discount
                  </label>
                  <ErrorMessage name="discount">
                    {(msg) => <div className="text-red-500">{msg}</div>}
                  </ErrorMessage>
                </div>
                <div className="relative">
                  <NumericFormat
                    onChange={handleChange}
                    name="quantity"
                    onBlur={handleBlur}
                    value={values.quantity}
                    allowNegative={false}
                    thousandSeparator
                    className={`rounded peer w-full placeholder:text-transparent focus:border-none ${
                      errors.quantity && touched.quantity
                        ? "border-pink-500 border-2 focus:ring-pink-500"
                        : "focus:ring-[#f80]"
                    } `}
                    placeholder="Quantity"
                    id="quantity"
                  />
                  <label
                    htmlFor="quantity"
                    className={`absolute left-0 ml-1  px-3 peer-placeholder-shown:text-base duration-100 ease-linear text-gray-500 peer-focus:ml-1 peer-focus:bg-white ${
                      values.quantity
                        ? "-translate-y-2 bg-white text-xs"
                        : "translate-y-2"
                    }  peer-focus:-translate-y-2 peer-focus:px-3 peer-focus:text-xs`}
                  >
                    Quantity
                  </label>
                  <ErrorMessage name="quantity">
                    {(msg) => <div className="text-red-500">{msg}</div>}
                  </ErrorMessage>
                </div>
                <div className="relative">
                  <Field
                    onChange={handleChange}
                    name="contact"
                    type="text"
                    onBlur={handleBlur}
                    value={values.contact}
                    className={`rounded peer w-full placeholder:text-transparent focus:border-none ${
                      errors.contact && touched.contact
                        ? "border-pink-500 border-2 focus:ring-pink-500"
                        : "focus:ring-[#f80]"
                    } `}
                    placeholder="Contact"
                    id="contact"
                  />
                  <label
                    htmlFor="contact"
                    className={`absolute left-0 ml-1  px-3 peer-placeholder-shown:text-base duration-100 ease-linear text-gray-500 peer-focus:ml-1 peer-focus:bg-white ${
                      values.contact
                        ? "-translate-y-2 bg-white text-xs"
                        : "translate-y-2"
                    }  peer-focus:-translate-y-2 peer-focus:px-3 peer-focus:text-xs`}
                  >
                    Contact
                  </label>
                  <ErrorMessage name="contact">
                    {(msg) => <div className="text-red-500">{msg}</div>}
                  </ErrorMessage>
                </div>
                <div className="relative">
                  <Field
                    onChange={handleChange}
                    name="location"
                    type="text"
                    onBlur={handleBlur}
                    value={values.location}
                    className={`rounded peer w-full placeholder:text-transparent focus:border-none ${
                      errors.location && touched.location
                        ? "border-pink-500 border-2 focus:ring-pink-500"
                        : "focus:ring-[#f80]"
                    } `}
                    placeholder="Location"
                    id="location"
                  />
                  <label
                    htmlFor="location"
                    className={`absolute left-0 ml-1  px-3 peer-placeholder-shown:text-base duration-100 ease-linear text-gray-500 peer-focus:ml-1 peer-focus:bg-white ${
                      values.location
                        ? "-translate-y-2 bg-white text-xs"
                        : "translate-y-2"
                    }  peer-focus:-translate-y-2 peer-focus:px-3 peer-focus:text-xs`}
                  >
                    Location
                  </label>
                  <ErrorMessage name="location">
                    {(msg) => <div className="text-red-500">{msg}</div>}
                  </ErrorMessage>
                </div>
                <button
                  type="submit"
                  className="bg-[#f80] font-normal text-base text-white py-2 mt-2 rounded-md hover:opacity-60 uppercase"
                >
                  {isSubmitting ? "Submitting..." : "Post"}
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </>
  );
}