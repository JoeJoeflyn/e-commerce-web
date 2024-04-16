import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";

interface PaginationProps {
  page: number;
  totalPage: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
}

const Pagination: React.FC<PaginationProps> = ({
  page,
  totalPage,
  setPage,
}) => {
  return (
    <div className="flex justify-center items-center gap-3 py-3 border-t">
      <button
        onClick={() =>
          setPage((prevPage) => (prevPage <= 1 ? 1 : prevPage - 1))
        }
        className="inline-flex items-center justify-center hover:bg-[#EDEDED] text-[#707070] bg-[#F7F7F7] p-2 border rounded-full"
      >
        <FontAwesomeIcon width={16} icon={faArrowLeft} />
      </button>
      {Array(totalPage || 1)
        .fill(null)
        .map((_, index) => (
          <button
            key={index}
            onClick={() => setPage(index + 1)}
            className={`inline-flex items-center justify-center text-base ${
              page === index + 1
                ? "border-b-2 border-[#191919]"
                : "text-[#707070]"
            } hover:text-[#3665F3] hover:border-b-2 hover:border-[#3665F3] py-2 px-1 font-semibold`}
          >
            {index + 1}
          </button>
        ))}
      <button
        onClick={() =>
          setPage((prevPage) =>
            prevPage < totalPage ? prevPage + 1 : prevPage
          )
        }
        className="inline-flex items-center justify-center hover:bg-[#EDEDED] text-[#707070] bg-[#F7F7F7] p-2 border rounded-full"
      >
        <FontAwesomeIcon width={16} icon={faArrowRight} />
      </button>
    </div>
  );
};

export default Pagination;
