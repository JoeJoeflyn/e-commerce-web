"use client";
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faImage, faClose, faPlus } from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";
import { Field, Form, Formik } from "formik";
import { ProductSchema } from "@/schema/schema";
import { createProduct } from "@/api/product";
import { useMutation } from "@tanstack/react-query";

export default function PostsProduct() {
  const [previewImages, setPreviewImages] = React.useState<string[]>([]);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    const imageFiles = Array.from(files as FileList).filter((file) =>
      file.type.startsWith("image/")
    );

    const imageUrls: string[] = imageFiles.map((file) => {
      return URL.createObjectURL(file);
    });

    setPreviewImages([...imageUrls, ...previewImages]);
  };

  const handleRemoveImage = (index: number) => {
    const updatedImages = [...previewImages];
    updatedImages.splice(index, 1);
    setPreviewImages(updatedImages);
  };

  const { mutate } = useMutation({
    mutationFn: createProduct,
    onSuccess(data) {
      console.log(data);
    },
    onError(error: { message: string }) {
      console.log(error);
    },
  });

  return (
    <>
      <div className="container h-screen mx-auto grid place-items-center">
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
              price: +values.price,
              discount: +values.discount,
              quantity: +values.quantity,
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
            <Form className="border rounded shadow-md grid grid-cols-3 justify-center p-4 gap-5">
              <div>
                <p className="text-xl font-medium">Product images</p>
                {previewImages.length !== 0 ? (
                  <div className="grid grid-cols-3 gap-3 mt-5">
                    <div className="relative border-dotted h-28 w-28 rounded-lg border-2 border-[#f80] bg-gray-100 flex justify-center items-center">
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
                    {previewImages.map((imageUrl, index) => (
                      <div key={index} className="relative h-28 w-28">
                        <Image
                          src={imageUrl}
                          alt={`Preview ${index}`}
                          layout="fill"
                          objectFit="contain"
                          className="border border-gray-300 border-solid w-full h-auto"
                        />
                        <button
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
                        <span className="block text-gray-400 font-normal">
                          Attach you files here
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

              <div className="col-span-2">
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
                      <option value="1">USD</option>
                      <option value="2">CAD</option>
                      <option value="3">EUR</option>
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
                <div className="mt-6 flex flex-col justify-between">
                  <p className="text-xl font-medium">Your detail information</p>
                  <div
                    className={`relative ${
                      errors.name && touched.name ? "" : "mb-3"
                    } mt-4`}
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
                    {errors.name && touched.name ? (
                      <div className="text-red-500 mt-2">{errors.name}</div>
                    ) : null}
                  </div>
                  <div
                    className={`relative ${
                      errors.description && touched.description ? "" : "my-3"
                    }`}
                  >
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
                    {errors.description && touched.description ? (
                      <div className="text-red-500 mt-2">
                        {errors.description}
                      </div>
                    ) : null}
                  </div>
                  <div
                    className={`relative ${
                      errors.price && touched.price ? "" : "my-3"
                    }`}
                  >
                    <Field
                      onChange={handleChange}
                      name="price"
                      type="number"
                      onBlur={handleBlur}
                      value={values.price}
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
                    {errors.price && touched.price ? (
                      <div className="text-red-500 my-2">{errors.price}</div>
                    ) : null}
                  </div>
                  <div
                    className={`relative ${
                      errors.discount && touched.discount ? "" : "my-3"
                    }`}
                  >
                    <Field
                      onChange={handleChange}
                      name="discount"
                      type="number"
                      onBlur={handleBlur}
                      value={values.discount}
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
                    {errors.discount && touched.discount ? (
                      <div className="text-red-500 my-2">{errors.discount}</div>
                    ) : null}
                  </div>
                  <div
                    className={`relative ${
                      errors.quantity && touched.quantity ? "" : "my-3"
                    }`}
                  >
                    <Field
                      onChange={handleChange}
                      name="quantity"
                      type="number"
                      onBlur={handleBlur}
                      value={values.quantity}
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
                    {errors.quantity && touched.quantity ? (
                      <div className="text-red-500 my-2">{errors.quantity}</div>
                    ) : null}
                  </div>
                  <div
                    className={`relative ${
                      errors.contact && touched.contact ? "" : "my-3"
                    }`}
                  >
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
                    {errors.contact && touched.contact ? (
                      <div className="text-red-500 my-2">{errors.contact}</div>
                    ) : null}
                  </div>
                  <div
                    className={`relative ${
                      errors.location && touched.location ? "" : "my-3"
                    }`}
                  >
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
                    {errors.location && touched.location ? (
                      <div className="text-red-500 my-2">{errors.location}</div>
                    ) : null}
                  </div>
                  <button
                    type="submit"
                    className="bg-[#f80] w-full mt-2 font-bold text-xl text-white py-2 rounded-md hover:opacity-60 uppercase"
                  >
                    {isSubmitting ? "Submitting..." : "Post"}
                  </button>
                </div>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </>
  );
}
