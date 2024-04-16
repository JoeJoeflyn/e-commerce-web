import { faEye } from "@fortawesome/free-regular-svg-icons";
import {
  faCircleInfo,
  faPen,
  faTag,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Skeleton from "react-loading-skeleton";

export default function ManagementLoading() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 bg-white my-3 border-[#e8e8e8] rounded-lg shadow">
      <div className="flex items-start p-3 gap-3 col-span-2">
        <div className="relative w-48 h-full">
          <Skeleton className="h-full rounded-b-lg" />
        </div>
        <div className="relative flex-grow">
          <Skeleton count={5} />
        </div>
      </div>
      <div className="flex flex-col gap-2 border-l p-3">
        <div className="grid grid-cols-3 grid-rows-3 gap-0.5 text-xs">
          <div className="flex flex-col justify-center rounded-sm px-3 py-2 bg-[#F4F4F4]">
            <div className="flex items-center self-center gap-1">
              Views <FontAwesomeIcon width={16} icon={faEye} />
            </div>
            <div className="flex-grow">
              <Skeleton count={1} />
            </div>
          </div>
          <div className="bg-[#F4F4F4] col-span-2 flex items-center gap-1 px-3 py-2 rounded-sm">
            <div className="flex items-center gap-1">
              <FontAwesomeIcon width={16} icon={faTag} />
            </div>
            <div className="flex-grow">
              <Skeleton count={1} />
            </div>
          </div>
          <div className="bg-[#F4F4F4] col-span-3 row-span-3 flex flex-col gap-1 px-3 py-2 rounded-sm">
            <span className="flex items-center gap-1">
              <FontAwesomeIcon width={16} icon={faCircleInfo} />
              Description
            </span>
            <div>
              <Skeleton count={3} />
            </div>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-1 text-sm font-bold">
          <button className="px-3 py-2 text-white bg-sky-500 hover:bg-sky-600 rounded-xl">
            <FontAwesomeIcon width={16} icon={faPen} />
          </button>
          <button className="px-3 py-2 text-white bg-slate-400 hover:bg-slate-500 rounded-xl">
            <FontAwesomeIcon width={16} icon={faEye} />
          </button>
          <button className="px-3 py-2 text-white bg-red-500 hover:bg-red-700 rounded-xl">
            <FontAwesomeIcon width={16} icon={faTrash} />
          </button>
        </div>
      </div>
    </div>
  );
}
