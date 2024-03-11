"use client";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { faHome, faPen, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Navbar() {
  const pathname = usePathname();
  const noNav = ["/login", "/signup"];

  return noNav.includes(pathname) ? null : (
    <>
      <ul className="flex justify-between gap-5 bg-[#f4b919] p-5">
        <li className="flex items-center gap-2 hover:text-gray-700 cursor-pointer mr-6">
          <FontAwesomeIcon width={15} height={15} icon={faHome} />
          <Link href="/">Home</Link>
        </li>
        <li className="flex items-center gap-2 hover:text-gray-700 cursor-pointer ml-auto">
          <FontAwesomeIcon width={15} height={15} icon={faPen} />
          <Link href="/postsproducts">Posts Product</Link>
        </li>
        <li className="flex items-center gap-2 hover:text-gray-700 cursor-pointer mr-6">
          <FontAwesomeIcon width={15} height={15} icon={faUser} />
          <Link href="/login">Login</Link>
        </li>
      </ul>
    </>
  );
}
