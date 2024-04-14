"use client";
import { removeToken } from "@/api";
import useGetUser from "@/hooks/useGetUser";
import { faBell, faRectangleList } from "@fortawesome/free-regular-svg-icons";
import {
  faBagShopping,
  faPenToSquare,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { AccountDropdown } from "./Dropdown";
import { SearchBar } from "./SearchBar";

export default function Navbar() {
  const router = useRouter();
  const pathname = usePathname();
  const noNav = ["/login", "/signup"];
  const { user } = useGetUser();

  const hanldeSignOut = () => {
    removeToken();
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
              sizes="(100vw, 100vh)"
              priority={true}
            />
          </Link>
        </li>
        <SearchBar />
        <li className="flex items-center gap-2 hover:text-gray-700 cursor-pointer">
          <FontAwesomeIcon width={16} icon={faBell} />
        </li>
        <li className="flex items-center gap-2 hover:text-gray-700 cursor-pointer">
          <FontAwesomeIcon width={16} icon={faBagShopping} />
        </li>
        <li>
          <Link
            className="flex items-center gap-2 hover:text-gray-700 cursor-pointer h-full"
            href={`/management/${user?.id}`}
          >
            <FontAwesomeIcon width={16} icon={faRectangleList} />
            Management
          </Link>
        </li>
        <AccountDropdown user={user} hanldeSignOut={hanldeSignOut} />
        <li>
          <Link
            className="flex items-center gap-2 font-bold uppercase text-white bg-[#FF8800] hover:bg-[#e56700] h-full px-5 py-2 rounded cursor-pointer"
            href="/sell"
          >
            <FontAwesomeIcon width={16} icon={faPenToSquare} />
            Sell
          </Link>
        </li>
      </ul>
    </div>
  );
}
