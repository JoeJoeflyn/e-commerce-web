"use client";
import { removeToken } from "@/api";
import useGetUser from "@/hooks/useGetUser";
import { faBell, faRectangleList } from "@fortawesome/free-regular-svg-icons";
import {
  faBagShopping,
  faBars,
  faPenToSquare,
  faRightToBracket,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { AccountDropdown } from "./Dropdown";
import { SearchBar } from "./SearchBar";
import useModal from "@/hooks/useModal";
import React from "react";
import { FormikProps } from "formik";
import Modal from "../modal/modal";
import FormItem from "../formItem/page";
import { Menu, Popover, Transition } from "@headlessui/react";
import { avatarGenerateSplit, generateRandomColor } from "@/shared/utils";

export default function Navbar() {
  const router = useRouter();
  const pathname = usePathname();
  const noNav = ["/login", "/signup"];
  const { user } = useGetUser();
  const { open, openModal, closeModal, productId } = useModal();
  const formRef = React.useRef<FormikProps<any> | null>(null);
  const userName = user?.name;

  const hanldeSignOut = () => {
    removeToken();
    router.push("/");
    window.location.reload();
  };

  function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(" ");
  }

  return noNav.includes(pathname) ? null : (
    <Popover
      as="header"
      className={({ open }) =>
        classNames(
          open ? "sticky top-0 z-10 inset-0 overflow-y-auto" : "",
          "bg-[#f4b919] sticky top-0 z-10 shadow-sm lg:overflow-y-visible"
        )
      }
    >
      <>
        <Modal mode="add" formRef={formRef} open={open} closeModal={closeModal}>
          <FormItem
            mode="add"
            formRef={formRef}
            productId={productId}
            closeModal={closeModal}
          />
        </Modal>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="relative flex justify-between lg:gap-8 xl:grid xl:grid-cols-12">
            <div className="flex md:absolute md:inset-y-0 md:left-0 lg:static xl:col-span-2">
              <div className="flex flex-shrink-0 items-center">
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
              </div>
            </div>
            <div className="min-w-0 flex-1 md:px-8 lg:px-0 xl:col-span-6">
              <div className="flex items-center px-6 py-4 md:mx-auto md:max-w-3xl lg:mx-0 lg:max-w-none xl:px-0">
                <div className="w-full">
                  <SearchBar />
                </div>
              </div>
            </div>
            <div className="flex items-center md:absolute md:inset-y-0 md:right-0 lg:hidden">
              {/* Mobile menu button */}
              <Popover.Button className="relative -mx-2 inline-flex items-center justify-center rounded-md p-2 focus:outline-none">
                <FontAwesomeIcon icon={faBars} />
              </Popover.Button>
            </div>
            <div className="hidden lg:flex lg:items-center gap-5 lg:justify-end xl:col-span-4">
              <div className="hover:text-gray-700 cursor-pointer">
                <FontAwesomeIcon width={16} icon={faBell} />
              </div>
              <div className="hover:text-gray-700 cursor-pointer">
                <FontAwesomeIcon width={16} icon={faBagShopping} />
              </div>
              {/* Dropdown */}
              <Menu as="div" className="relative flex-shrink-0">
                <AccountDropdown user={user} hanldeSignOut={hanldeSignOut} />
              </Menu>
              <div
                onClick={() => openModal()}
                className="hover:text-gray-700 cursor-pointer"
              >
                <button className="flex items-center gap-2 font-bold uppercase text-white bg-[#FF8800] hover:bg-[#e56700] h-full px-5 py-2 rounded cursor-pointer">
                  <FontAwesomeIcon width={16} icon={faPenToSquare} />
                  Sell
                </button>
              </div>
            </div>
          </div>
        </div>

        <Popover.Panel
          as="nav"
          className="lg:hidden bg-white"
          aria-label="Global"
        >
          <div className="mx-auto max-w-3xl space-y-1 px-2 pb-3 pt-2 sm:px-4">
            {!userName && (
              <div
                aria-current={true ? "page" : undefined}
                className={classNames(
                  true ? "text-black" : "hover:bg-white",
                  "block rounded-md py-2 px-3 text-base font-medium"
                )}
              >
                <Link className="font-bold text-base mb-1" href="/login">
                  Sign in / Sign up
                </Link>
              </div>
            )}
            <div
              aria-current={true ? "page" : undefined}
              className={classNames(
                true ? "text-black" : "hover:bg-white",
                "block rounded-md py-2 px-3 text-base font-medium"
              )}
            >
              <Link
                className="flex items-center gap-2 cursor-pointer h-full"
                href={`/management/${user?.id}`}
              >
                Management
              </Link>
            </div>
          </div>
          <div className="border-t border-gray-200 pb-3 pt-4">
            <div className="mx-auto flex max-w-3xl items-center px-4 sm:px-6">
              <div className="flex-shrink-0">
                {userName ? (
                  <div
                    className="w-12 h-12 relative flex justify-center items-center rounded-full text-xl text-white uppercase"
                    style={{
                      backgroundColor: `${generateRandomColor(user?.name)}`,
                    }}
                  >
                    {avatarGenerateSplit(user?.name)}
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
              </div>
              <div className="ml-3">
                <div className="text-base font-medium text-gray-800">
                  {user.name}
                </div>
                <div className="text-sm font-medium text-gray-500">
                  {user.email}
                </div>
              </div>
            </div>
            <div className="mx-auto mt-3 max-w-3xl space-y-1 px-2 sm:px-4">
              {userName && (
                <div
                  onClick={hanldeSignOut}
                  className="flex items-center gap-2 rounded-md px-3 py-2 text-base font-medium"
                >
                  Sign out
                </div>
              )}
            </div>
          </div>
        </Popover.Panel>
      </>
    </Popover>
  );
}
