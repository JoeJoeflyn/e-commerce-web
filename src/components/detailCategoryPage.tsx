import { faAngleDown, faList } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

export default function DetailCategoryPage() {
  return (
    <div className="max-w-5xl mx-auto my-5">
      <div className="grid grid-cols-1 md:grid-cols-3">
        <div className="col-span-2 flex flex-col gap-5">
          <div className="bg-white text-base font-bold px-5 py-3">Clothing</div>
          <div className="flex flex-col gap-2">
            <div className="flex justify-between items-center bg-white text-sm font-normal px-5 py-3">
              <p>1xx Results</p>
              <div className="flex gap-2">
                <button className="bg-[#f7f7f7] text-xs font-medium px-5 py-2 rounded-2xl">
                  Sort <FontAwesomeIcon width={16} icon={faAngleDown} />
                </button>
                <button className="bg-[#f7f7f7] text-xs font-medium px-5 py-2 rounded-2xl">
                  <FontAwesomeIcon width={16} icon={faList} />{" "}
                  <FontAwesomeIcon width={16} icon={faAngleDown} />
                </button>
              </div>
            </div>
            <div className="bg-white">2</div>
          </div>
        </div>
      </div>
    </div>
  );
}
