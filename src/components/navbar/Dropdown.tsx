import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBagShopping,
  faChevronDown,
  faClipboardList,
  faGear,
  faHeart,
  faLifeRing,
  faPenToSquare,
  faRightToBracket,
  faStar,
} from "@fortawesome/free-solid-svg-icons";
import { DROPDOWN_KEYS } from "@/shared/constants";
import { avatarGenerateSplit, generateRandomColor } from "@/shared/utils";
import {
  faBell,
  faCircleUser,
  faRectangleList,
} from "@fortawesome/free-regular-svg-icons";
import Image from "next/image";
import Link from "next/link";
import { RootState } from "@/store";
import React from "react";
import useDropdowns from "@/hooks/useDropdowns";

export function AccountDropdown({
  user,
  hanldeSignOut,
}: {
  user: RootState;
  hanldeSignOut: () => void;
}) {
  const dropdownRefVar = React.useRef<HTMLDivElement>(null);
  const [dropdownRef, isOpen, toggleDropdown] = useDropdowns(dropdownRefVar);
  const userName = user?.name;
  const hanldeDropdown = (DROPDOWN_KEYS: string) => {
    toggleDropdown(DROPDOWN_KEYS);
  };

  return (
    <li
      onClick={() => hanldeDropdown(DROPDOWN_KEYS.ACCOUNT)}
      className="flex items-center gap-2 relative"
    >
      <div>
        <button className="flex items-center gap-2 cursor-pointer hover:text-gray-700">
          <div
            className="w-3 h-3 relative flex justify-center items-center rounded-full p-4 text-xl text-white uppercase"
            style={{
              backgroundColor: userName
                ? generateRandomColor(userName)
                : "defaultColor",
            }}
          >
            {userName ? (
              avatarGenerateSplit(userName)
            ) : (
              <FontAwesomeIcon width={16} icon={faCircleUser} />
            )}
          </div>
          {userName || "Account"}
          <FontAwesomeIcon
            width={16}
            icon={faChevronDown}
            className={`${isOpen === DROPDOWN_KEYS.ACCOUNT && "rotate-180"}`}
          />
        </button>
        {isOpen === DROPDOWN_KEYS.ACCOUNT && (
          <div
            ref={dropdownRef}
            className="flex flex-col absolute right-0 top-14 w-64 bg-white text-sm border shadow"
          >
            <div className="flex items-start gap-3 px-3 py-5">
              {userName ? (
                <div
                  className="w-12 h-12 relative flex justify-center items-center rounded-full text-xl text-white uppercase"
                  style={{
                    backgroundColor: `${generateRandomColor(userName)}`,
                  }}
                >
                  {avatarGenerateSplit(userName)}
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
                {userName ? (
                  <p className="font-bold text-base mb-1">{userName}</p>
                ) : (
                  <Link className="font-bold text-base mb-1" href="/login">
                    Sign in / Sign up
                  </Link>
                )}
                <div className="flex items-baseline gap-1 pb-2 border-b">
                  <span className="text-xs font-bold">5.0</span>
                  <div className="text-yellow-500">
                    {Array(5)
                      .fill(null)
                      .map((_, index) => (
                        <FontAwesomeIcon key={index} width={14} icon={faStar} />
                      ))}
                  </div>
                </div>
                <div className="flex gap-2 text-xs">
                  <div className="border-r pr-2 flex gap-1">
                    <b>10</b>
                    <p className="text-[#777777]">followers</p>
                  </div>
                  <div className="flex gap-1">
                    <b>50</b>
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
              {userName && (
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
              )}
            </div>
          </div>
        )}
      </div>
    </li>
  );
}
