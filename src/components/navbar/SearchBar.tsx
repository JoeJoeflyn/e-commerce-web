import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export function SearchBar() {
  return (
    <li className="max-w-2xl flex-grow mx-auto">
      <div className="relative">
        <input
          type="search"
          onChange={() => console.log("set search on url")}
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
  );
}
