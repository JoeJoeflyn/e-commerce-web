import React from "react";
import Image from "next/image";
import Link from "next/link";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebook,
  faGoogle,
  faApple,
} from "@fortawesome/free-brands-svg-icons";

export default function index() {
  return (
    <section className="mx-auto md:p-0 p-4 grid place-items-center h-screen">
      <div className="md:shadow md:px-8 md:py-14 md:rounded-md">
        <div className="flex flex-col">
          <p className="font-bold text-3xl mb-8">Đăng ký tài khoản</p>
          <input
            className="px-4 py-3 border rounded-md focus:ring-2 focus:border-none focus:ring-[#f80] mb-6"
            placeholder="Họ và tên"
            type="text"
          />
          <input
            className="px-4 py-3 border rounded-md focus:ring-2 focus:border-none focus:ring-[#f80] mb-6"
            placeholder="Email"
            type="email"
          />
          <input
            className="px-4 py-3 border focus:ring-2 focus:border-none rounded-md focus:ring-[#f80] mb-6"
            placeholder="Mật khẩu"
            type="password"
          />
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
          <button className="bg-[#f80] font-bold text-xl text-white py-3 rounded-md hover:opacity-60 uppercase">
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
          </div>
          <p className="flex gap-2 justify-center text-sm items-center">
            Đã có tài khoản?
            <Link className="text-blue-500 font-bold" href="/logIn">
              Đăng nhập ngay
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
}
