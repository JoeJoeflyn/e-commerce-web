"use client";
import { removeToken } from "@/api";
import { setToken, setUser } from "@/features";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import useDropdowns from "@/hooks/useDropdowns";
import { faBell, faRectangleList } from "@fortawesome/free-regular-svg-icons";
import {
  faBagShopping,
  faPenToSquare,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React from "react";
import { AccountDropdown } from "./Dropdown";
import { SearchBar } from "./SearchBar";

export default function Navbar() {
  const router = useRouter();
  const pathname = usePathname();
  const noNav = ["/login", "/signup"];
  const { user } = useAppSelector((state) => state);
  const dispatch = useAppDispatch();

  const hanldeSignOut = () => {
    removeToken();
    dispatch(setUser(""));
    dispatch(setToken(""));
    router.push("/");
    window.location.reload();
  };

  return noNav.includes(pathname) ? null : (
    <div className="sticky top-0 z-10">
      <ul className="flex justify-between gap-5 bg-[#f4b919] text-sm p-4">
        <li className="flex items-center gap-2 hover:text-gray-700 cursor-pointer">
          <Link className="relative w-20 h-10" href="/">
            <Image
              className="object-cover"
              src="/images/logo.png"
              fill={true}
              alt="Logo"
              loading="lazy"
            />
          </Link>
        </li>
        <SearchBar dispatch={dispatch} />
        <li className="flex items-center gap-2 hover:text-gray-700 cursor-pointer">
          <FontAwesomeIcon width={16} icon={faBell} />
        </li>
        <li className="flex items-center gap-2 hover:text-gray-700 cursor-pointer">
          <FontAwesomeIcon width={16} icon={faBagShopping} />
        </li>
        <li className="flex items-center gap-2 hover:text-gray-700 cursor-pointer">
          <FontAwesomeIcon width={16} icon={faRectangleList} />
          <Link href="/management">Management</Link>
        </li>
        <AccountDropdown user={user} hanldeSignOut={hanldeSignOut} />
        <li className="flex items-center gap-2 font-bold uppercase text-white bg-[#FF8800] hover:bg-[#e56700] px-5 py-2 rounded cursor-pointer">
          <FontAwesomeIcon width={16} icon={faPenToSquare} />
          <Link href="/sell">Sell</Link>
        </li>
      </ul>
    </div>
  );
}
