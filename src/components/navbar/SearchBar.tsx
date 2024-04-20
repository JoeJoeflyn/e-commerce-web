import useDebounce from "@/hooks/useDebounce";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { usePathname, useRouter } from "next/navigation";
import React from "react";

export function SearchBar() {
  const router = useRouter();
  const pathname = usePathname();
  const [searchValue, setSearchValue] = React.useState("");
  const debounceVal = useDebounce(searchValue, 500);

  React.useEffect(() => {
    const changeQueryParam = (searchValue: string) => {
      const query = searchValue ? `?search=${searchValue}` : "";
      const url = `${pathname}${query}`;

      router.push(url, { scroll: false });
    };
    changeQueryParam(debounceVal);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debounceVal]);

  return (
    <div className="relative">
      <input
        type="search"
        onChange={(e) => setSearchValue(e.target.value)}
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
  );
}
