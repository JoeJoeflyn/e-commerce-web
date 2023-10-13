"use client";
import React from "react";
import Link from "next/link";

import { useMutation } from "@tanstack/react-query";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebook,
  faGoogle,
  faApple,
} from "@fortawesome/free-brands-svg-icons";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

import { Field, Form, Formik } from "formik";

import { SignupSchema } from "../../schema/schema";

import { createAccount } from "@/api";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Signup() {
  const [togglePassword, setTogglePassword] = React.useState(true);

  const mutationAccount = useMutation({
    mutationFn: (newAccount: {
      name: string;
      email: string;
      password: string;
    }) => {
      return createAccount(newAccount);
    },
  });
  console.log(mutationAccount);

  // notification
  mutationAccount?.data?.error ? toast.error(mutationAccount.data.error) : null;
  mutationAccount?.data?.newUser
    ? toast.success("Tạo tài khoản thành công")
    : null;

  return (
    <>
      <ToastContainer />
      <section className="mx-auto md:p-0 p-4 grid place-items-center h-screen">
        <div className="md:shadow md:px-8 md:py-14 md:rounded-md">
          <Formik
            initialValues={{ name: "", email: "", password: "" }}
            validationSchema={SignupSchema}
            onSubmit={(values, { setSubmitting, resetForm }) => {
              mutationAccount.mutate({
                name: values.name,
                email: values.email,
                password: values.password,
              });

              setSubmitting(false);

              resetForm({
                values: {
                  name: "",
                  email: "",
                  password: "",
                },
              });
            }}
          >
            {({
              values,
              errors,
              touched,
              handleChange,
              handleBlur,
              isSubmitting,
            }) => (
              <Form className="flex flex-col">
                <p className="font-bold text-3xl mb-8">Đăng ký tài khoản</p>
                <div
                  className={`w-full ${
                    errors.name && touched.name ? null : "mb-6"
                  }`}
                >
                  <Field
                    name="name"
                    focus="innerRef"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.name}
                    className={`px-4 py-3 w-full border rounded-md focus:ring-2 focus:border-none ${
                      errors.name && touched.name
                        ? "border-pink-500 border-2 focus:ring-pink-500"
                        : "focus:ring-[#f80]"
                    } `}
                    placeholder="Họ và tên"
                    type="text"
                  />
                  {errors.name && touched.name ? (
                    <div className="text-red-500 my-2">{errors.name}</div>
                  ) : null}
                </div>
                <div
                  className={`w-full ${
                    errors.email && touched.email ? null : "mb-6"
                  }`}
                >
                  <Field
                    type="email"
                    name="email"
                    placeholder="Email"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.email}
                    className={`px-4 py-3 w-full border rounded-md focus:ring-2 focus:border-none ${
                      errors.email && touched.email
                        ? "border-pink-500 border-2 focus:ring-pink-500"
                        : "focus:ring-[#f80]"
                    } `}
                  />
                  {errors.email && touched.email ? (
                    <div className="text-red-500 my-2">{errors.email}</div>
                  ) : null}
                </div>
                <div
                  className={`w-full ${
                    errors.password && touched.password ? null : "mb-6"
                  }`}
                >
                  <div className="relative">
                    <Field
                      name="password"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.password}
                      className={`px-4 py-3 w-full border rounded-md focus:ring-2 focus:border-none ${
                        errors.password && touched.password
                          ? "border-pink-500 border-2 focus:ring-pink-500"
                          : "focus:ring-[#f80]"
                      } `}
                      placeholder="Mật khẩu"
                      type={togglePassword ? "password" : "text"}
                    />
                    {togglePassword ? (
                      <FontAwesomeIcon
                        onClick={() => setTogglePassword(false)}
                        className="absolute w-4 top-1/3 right-3 cursor-pointer"
                        icon={faEye}
                      />
                    ) : (
                      <FontAwesomeIcon
                        onClick={() => setTogglePassword(true)}
                        className="absolute w-4 top-1/3 right-3 cursor-pointer"
                        icon={faEyeSlash}
                      />
                    )}
                  </div>
                  {errors.password && touched.password ? (
                    <div className="text-red-500 my-2">{errors.password}</div>
                  ) : null}
                </div>
                <div className="flex space-x-4 items-start mb-6">
                  <input
                    type="checkbox"
                    className="text-[#f80] w-5 h-5 rounded focus:ring-0 m"
                  />
                  <p className="max-w-sm">
                    Bằng việc Đăng ký, bạn đã đọc và đồng ý với {""}
                    <a className="text-blue-500" href="#">
                      Điều khoản sự dụng
                    </a>{" "}
                    và{" "}
                    <a className="text-blue-500" href="#">
                      Chính sách bảo mật
                    </a>{" "}
                    của chúng tôi
                  </p>
                </div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-[#f80] font-bold text-xl text-white py-3 rounded-md hover:opacity-60 uppercase"
                >
                  đăng Ký
                </button>
                <div className="relative flex py-5 items-center">
                  <div className="flex-grow border-t border-gray-600"></div>
                  <span className="flex-shrink mx-4 text-gray-600">
                    Hoặc đăng nhập bằng
                  </span>
                  <div className="flex-grow border-t border-gray-600"></div>
                </div>
                <div className="grid grid-cols-3 gap-2 mb-6">
                  <div className="border rounded-md flex justify-center gap-2 items-center px-4 py-2 cursor-pointer">
                    <div className="text-blue-500">
                      <FontAwesomeIcon
                        width={20}
                        height={20}
                        icon={faFacebook}
                      />
                    </div>
                    <span className="font-bold">Facebook</span>
                  </div>
                  <div className="border rounded-md flex justify-center items-center gap-2 px-4 py-2 cursor-pointer">
                    <div className="text-red-500">
                      <FontAwesomeIcon width={20} height={20} icon={faGoogle} />
                    </div>
                    <span className="font-bold">Google</span>
                  </div>
                  <div className="border rounded-md flex justify-center gap-2 items-center px-4 py-2 cursor-pointer">
                    <div>
                      <FontAwesomeIcon width={20} height={20} icon={faApple} />
                    </div>
                    <span className="font-bold">Apple</span>
                  </div>
                </div>
                <p className="flex gap-2 justify-center text-sm items-center">
                  Đã có tài khoản?
                  <Link className="text-blue-500 font-bold" href="/logIn">
                    Đăng nhập ngay
                  </Link>
                </p>
              </Form>
            )}
          </Formik>
        </div>
      </section>
    </>
  );
}
