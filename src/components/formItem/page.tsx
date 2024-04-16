"use client";
import { useCreateProduct } from "@/hooks/reactQuery/useCreateProduct";
import usePrefetchProductUser from "@/hooks/reactQuery/usePrefetchProductUser";
import useImageUploadHandler from "@/hooks/useFileHandler";
import useGetUser from "@/hooks/useGetUser";
import useNavigate from "@/hooks/useNavigate";
import { ProductSchema } from "@/schema/schema";
import { NAVIGATE_KEYS, initialFormValues } from "@/shared/constants";
import { FormFields } from "@/shared/interfaces";
import { faClose, faImage, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ErrorMessage, Field, Form, Formik, FormikProps } from "formik";
import Image from "next/image";

export default function FormItem({
  formRef,
  productId,
}: {
  formRef: React.MutableRefObject<FormikProps<any> | null>;
  productId?: number;
}) {
  useNavigate(NAVIGATE_KEYS.AUTHENTICATED);
  const { user } = useGetUser();
  const { previewImages, handleFileChange, handleRemoveImage, emptyImage } =
    useImageUploadHandler();
  const { mutate } = useCreateProduct();
  const { product, productImages, formFields } = usePrefetchProductUser(
    productId as number
  );
  const allImages = [...(previewImages || []), ...(productImages || [])];

  return (
    <Formik<FormFields>
      innerRef={formRef}
      initialValues={initialFormValues}
      validationSchema={ProductSchema}
      onSubmit={(values, { setSubmitting, resetForm }) => {
        mutate({
          ...values,
          userId: user.id.toString(),
          price: +values.price.replace(/,/g, ""),
          discount: +values.discount.replace(/,/g, ""),
          quantity: +values.quantity.replace(/,/g, ""),
        });

        setSubmitting(false);
        resetForm({
          values: initialFormValues,
        });
        emptyImage();
      }}
    >
      {({
        values,
        errors,
        touched,
        handleChange,
        handleBlur,
        setFieldValue,
      }: FormikProps<FormFields>) => (
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
                  ?.map((image, index) => (
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
                        onClick={() => handleRemoveImage(index)}
                        className="absolute -top-2 -right-2 bg-black text-white w-6 h-6 flex items-center justify-center rounded-full z-10"
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
            {formFields.map((field) => (
              <div className="relative" key={field.name}>
                {field.type === "select" ? (
                  <Field
                    onChange={handleChange}
                    as="select"
                    id={field.name}
                    name={field.name}
                    onBlur={handleBlur}
                    value={
                      (values as { [key: string]: any })[field.name] ||
                      product?.product?.[field.name]
                    }
                    className={`rounded peer w-full placeholder:text-transparent focus:border-none ${
                      (errors as { [key: string]: any })[field.name] &&
                      (touched as { [key: string]: any })[field.name]
                        ? "border-pink-500 border-2 focus:ring-pink-500"
                        : "focus:ring-[#f80]"
                    } `}
                  >
                    <option value="" disabled hidden></option>
                    {field?.options?.map(
                      (option: { id: number; name: string }) => (
                        <option key={option.id} value={option.id}>
                          {option.name}
                        </option>
                      )
                    )}
                  </Field>
                ) : (
                  <Field
                    onChange={handleChange}
                    name={field.name}
                    type="text"
                    onBlur={handleBlur}
                    value={
                      (values as { [key: string]: any })[field.name] ||
                      product?.product?.[field.name] ||
                      product?.product?.discountPrice ||
                      ""
                    }
                    className={`rounded peer w-full placeholder:text-transparent focus:border-none ${
                      (errors as { [key: string]: any })[field.name] &&
                      (touched as { [key: string]: any })[field.name]
                        ? "border-pink-500 border-2 focus:ring-pink-500"
                        : "focus:ring-[#f80]"
                    } `}
                    placeholder={field.name}
                    id={field.name}
                  />
                )}
                <label
                  htmlFor={field.name}
                  className={`absolute left-0 ml-1 ${
                    (values as { [key: string]: any })[field.name] ||
                    product?.product?.[field.name] ||
                    product?.product?.discountPrice ||
                    ""
                      ? "-translate-y-2 bg-white text-xs"
                      : "translate-y-2"
                  } px-3 peer-placeholder-shown:text-base duration-100 ease-linear text-gray-500 peer peer-focus:ml-1 peer-focus:bg-white peer-focus:-translate-y-2 peer-focus:px-3 peer-focus:text-xs`}
                >
                  {field.name.charAt(0).toUpperCase() + field.name.slice(1)}
                </label>
                <ErrorMessage name={field.name}>
                  {(msg) => (
                    <div className="text-red-500 text-start">{msg}</div>
                  )}
                </ErrorMessage>
              </div>
            ))}
          </div>
        </Form>
      )}
    </Formik>
  );
}
