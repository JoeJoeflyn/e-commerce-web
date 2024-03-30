"use client";
import { removeToken } from "@/api";
import { setToken, setUser } from "@/features/user.reducer";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { avatarGenerateSplit, generateRandomColor } from "@/shared/utils";
import {
  faBell,
  faCircleUser,
  faRectangleList,
} from "@fortawesome/free-regular-svg-icons";
import {
  faBagShopping,
  faChevronDown,
  faChevronUp,
  faClipboardList,
  faGear,
  faHeart,
  faLifeRing,
  faMagnifyingGlass,
  faPenToSquare,
  faRightToBracket,
  faStar,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect, useRef } from "react";

export default function Navbar() {
  const pathname = usePathname();
  const noNav = ["/login", "/signup"];
  const [isOpen, setIsOpen] = React.useState(false);
  const dropdownRef = useRef<HTMLLIElement>(null);
  const router = useRouter();
  const { user } = useAppSelector((state) => state);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!isOpen) return;

    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [isOpen]);

  const hanldeSignOut = () => {
    removeToken();
    dispatch(setUser(""));
    dispatch(setToken(""));
    router.push("/");
    window.location.reload();
  };

  const hanldeDropdown = () => {
    setIsOpen((pre) => !pre);
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
        <li className="max-w-3xl flex-grow mr-auto">
          <div className="relative">
            <input
              type="search"
              id="default-search"
              className="block p-2.5 w-full text-sm text-gray-900 bg-white rounded border-none border-gray-300 focus:ring-0 ring-0"
              placeholder="Search your product ..."
            />
            <button
              type="submit"
              className="text-white absolute right-1 bottom-1 bg-[#FF8800] hover:bg-[#FF8800] font-medium rounded text-sm px-4 py-1.5"
            >
              <FontAwesomeIcon width={16} icon={faMagnifyingGlass} />
            </button>
          </div>
        </li>
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
        <li className="flex items-center gap-2 relative" ref={dropdownRef}>
          <button
            onClick={hanldeDropdown}
            className="flex items-center gap-2 cursor-pointer hover:text-gray-700"
          >
            {user?.data?.name ? (
              <div
                className="w-3 h-3 relative flex justify-center items-center rounded-full p-4 text-xl text-white uppercase"
                style={{
                  backgroundColor: `${generateRandomColor(user?.data?.name)}`,
                }}
              >
                {avatarGenerateSplit(user?.data?.name)}
              </div>
            ) : (
              <FontAwesomeIcon width={16} icon={faCircleUser} />
            )}
            {user?.data?.name ? user?.data?.name : "Account"}
            {isOpen ? (
              <FontAwesomeIcon width={16} icon={faChevronUp} />
            ) : (
              <FontAwesomeIcon width={16} icon={faChevronDown} />
            )}
          </button>
          {isOpen ? (
            <div className="flex flex-col absolute right-0 top-14 w-64 bg-white text-sm border shadow">
              <div className="flex items-start gap-3 px-3 py-5">
                {user?.data?.name ? (
                  <div
                    className="w-12 h-12 relative flex justify-center items-center rounded-full text-xl text-white uppercase"
                    style={{
                      backgroundColor: `${generateRandomColor(
                        user?.data?.name
                      )}`,
                    }}
                  >
                    {avatarGenerateSplit(user?.data?.name)}
                  </div>
                ) : (
                  <Image
                    className="border rounded-full object-cover"
                    src="/images/User-avatar.svg.png"
                    width={25}
                    height={25}
                    alt="Avatar"
                    loading="lazy"
                  />
                )}
                <div className="flex flex-col gap-2">
                  {user?.data?.name ? (
                    <p className="font-bold text-base mb-1">
                      {user?.data?.name}
                    </p>
                  ) : (
                    <Link className="font-bold text-base mb-1" href="/login">
                      Sign in / Sign up
                    </Link>
                  )}
                  <div className="flex items-baseline gap-1 pb-2 border-b">
                    <span className="text-xs font-bold">0.0</span>
                    <div className="text-[#C0C0C0]">
                      <FontAwesomeIcon width={14} icon={faStar} />
                      <FontAwesomeIcon width={14} icon={faStar} />
                      <FontAwesomeIcon width={14} icon={faStar} />
                      <FontAwesomeIcon width={14} icon={faStar} />
                      <FontAwesomeIcon width={14} icon={faStar} />
                    </div>
                    <span className="text-xs font-normal text-[#777777]">
                      No rating
                    </span>
                  </div>
                  <div className="flex gap-2 text-xs">
                    <div className="border-r pr-2 flex gap-1">
                      <b>0</b>
                      <p className="text-[#777777]">followers</p>
                    </div>
                    <div className="flex gap-1">
                      <b>0</b>
                      <p className="text-[#777777]">following</p>
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <div className="bg-[#E5E5E5] text-[#777777] font-bold p-3">
                  Orders management
                </div>
                <div className="hover:bg-[#E8E8E8] p-3 flex items-center gap-2 cursor-pointer">
                  <FontAwesomeIcon
                    className="bg-blue-500 text-white rounded-full p-1.5"
                    width={16}
                    icon={faBagShopping}
                  />
                  Your orders
                </div>
                <div className="hover:bg-[#E8E8E8] p-3 flex items-center gap-2 cursor-pointer">
                  <FontAwesomeIcon
                    className="bg-green-600 text-white rounded-full p-1.5"
                    width={16}
                    icon={faClipboardList}
                  />
                  Your purchases
                </div>
              </div>
              <div>
                <div className="bg-[#E5E5E5] text-[#777777] font-bold p-3">
                  Utilities
                </div>
                <div className="hover:bg-[#E8E8E8] p-3 flex items-center gap-2 cursor-pointer">
                  <FontAwesomeIcon
                    className="bg-red-500 text-white rounded-full p-1.5"
                    width={16}
                    icon={faHeart}
                  />
                  Watchlist
                </div>
                <div className="hover:bg-[#E8E8E8] p-3 flex items-center gap-2 cursor-pointer">
                  <FontAwesomeIcon
                    className="bg-yellow-500 text-white rounded-full p-1.5"
                    width={16}
                    icon={faStar}
                  />
                  My rating
                </div>
              </div>
              <div>
                <div className="bg-[#E5E5E5] text-[#777777] font-bold p-3">
                  Other
                </div>
                <div className="hover:bg-[#E8E8E8] p-3 flex items-center gap-2 cursor-pointer">
                  <FontAwesomeIcon
                    className="bg-[#9b9b9b] text-white rounded-full p-1.5"
                    width={16}
                    icon={faGear}
                  />
                  Account setting
                </div>
                <div className="hover:bg-[#E8E8E8] p-3 flex items-center gap-2 cursor-pointer">
                  <FontAwesomeIcon
                    className="bg-[#9b9b9b] text-white rounded-full p-1.5"
                    width={16}
                    icon={faLifeRing}
                  />
                  Help
                </div>
                {user?.data?.name ? (
                  <div
                    onClick={hanldeSignOut}
                    className="hover:bg-[#E8E8E8] p-3 flex items-center gap-2 cursor-pointer"
                  >
                    <FontAwesomeIcon
                      className="bg-[#9b9b9b] text-white rounded-full p-1.5"
                      width={16}
                      icon={faRightToBracket}
                      flip="horizontal"
                    />
                    Sign out
                  </div>
                ) : (
                  ""
                )}
              </div>
            </div>
          ) : (
            ""
          )}
        </li>
        <li className="flex items-center gap-2 font-bold uppercase text-white bg-[#FF8800] hover:bg-[#e56700] px-5 py-2 rounded cursor-pointer">
          <FontAwesomeIcon width={16} icon={faPenToSquare} />
          <Link href="/sell">Sell</Link>
        </li>
      </ul>
    </div>
  );
}
