"use client";
import Link from "next/link";
import React, { useEffect } from "react";

import { SyncLoader } from "react-spinners";
import { toast } from "react-toastify";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { Field, Form, Formik } from "formik";

import { login } from "@/api";
import { LoginSchema } from "@/schema/schema";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { useMutation } from "@tanstack/react-query";

import { useRouter } from "next/navigation";

export default function Login() {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      router.back();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [togglePassword, setTogglePassword] = React.useState(true);

  const mutationUser = useMutation({
    mutationFn: (user: { email: string; password: string }) => {
      return login(user);
    },
    onSuccess(data) {
      // Set token to localstorage
      localStorage.setItem("token", data.token);
      // Notify user for when successfully logged in
      router.push("/");
      setTimeout(() => {
        toast.success("You logged in successfully");
      }, 5 * 1000);
    },
    onError(error: { message: string }) {
      toast.error(error?.message);
    },
  });

  return (
    <section className="md:p-0 p-4 grid place-items-center h-screen">
      <div className="md:shadow md:px-8 md:py-14 md:rounded-md bg-white">
        <Formik
          initialValues={{ email: "", password: "" }}
          validationSchema={LoginSchema}
          onSubmit={(values, { setSubmitting, resetForm }) => {
            mutationUser.mutate(
              {
                email: values.email,
                password: values.password,
              },
              {
                onSuccess: () => {
                  setSubmitting(false);
                  setTimeout(() => {
                    resetForm();
                  }, 5 * 1000);
                },
                onError: () => {
                  setSubmitting(false);
                },
              }
            );
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
              <p className="font-bold text-3xl mb-8">Log in</p>
              <div
                className={`w-full ${
                  errors.email && touched.email ? null : "mb-6"
                }`}
              >
                <Field
                  name="email"
                  type="email"
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
                    placeholder="Password"
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
              <a href="#" className="text-blue-500 mb-4">
                Forgot your password?
              </a>
              <button
                type="submit"
                disabled={isSubmitting}
                className="bg-[#f80] font-bold text-xl text-white py-3 rounded-md hover:opacity-60 uppercase"
              >
                {isSubmitting ? <SyncLoader color="#ffffff" /> : "Log in"}
              </button>
              <div className="relative flex py-5 items-center">
                <div className="flex-grow border-t border-gray-600"></div>
                <span className="flex-shrink mx-4 text-gray-600">Or</span>
                <div className="flex-grow border-t border-gray-600"></div>
              </div>
              {/* <div className="grid grid-cols-3 gap-2 mb-6">
                <div className="border rounded-md flex justify-center gap-2 items-center px-4 py-2 cursor-pointer">
                  <div className="text-blue-500">
                    <FontAwesomeIcon width={20} height={20} icon={faFacebook} />
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
              </div> */}
              <p className="flex gap-2 justify-center text-sm items-center">
                Don&apos;t have an account yet?
                <Link className="text-blue-500 font-bold" href="/signup">
                  Sign up
                </Link>
              </p>
            </Form>
          )}
        </Formik>
      </div>
    </section>
  );
}
