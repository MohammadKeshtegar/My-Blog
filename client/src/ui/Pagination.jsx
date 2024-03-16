import { MdKeyboardArrowRight } from "react-icons/md";
import { MdKeyboardArrowLeft } from "react-icons/md";
import PaginationButton from "./PaginationButton";
import { useSearchParams } from "react-router-dom";
import { PAGE_SIZE } from "../utils/constant";

function Pagination({ count }) {
  const [searchParams, setSearchParams] = useSearchParams();
  let currentPage = !searchParams.get("page") ? 1 : Number(searchParams.get("page"));

  const pageCount = Math.ceil(count / PAGE_SIZE);

  function nextPage() {
    const next = currentPage === pageCount ? currentPage : currentPage + 1;
    searchParams.set("page", next);
    setSearchParams(searchParams);
  }

  function prevPage() {
    const prev = currentPage === 1 ? currentPage : currentPage - 1;
    searchParams.set("page", prev);
    setSearchParams(searchParams);
  }

  if (pageCount <= 1) return null;

  return (
    <div className="w-full flex justify-between">
      <p>
        showing <span className="text-emerald-500">{(currentPage - 1) * PAGE_SIZE + 1}</span> to{" "}
        <span className="text-emerald-500">{currentPage === pageCount ? count : currentPage * PAGE_SIZE}</span>{" "}
        of <span>{count}</span>
      </p>

      <div className="flex border-emerald-500 bg-neutral-700 border-2 rounded items-center disabled:cursor-not-allowed">
        <PaginationButton onClick={prevPage}>
          <MdKeyboardArrowLeft />
        </PaginationButton>

        <span className="border-x-2 border-emerald-500 bg-neutral-800 h-full px-3 disabled:cursor-not-allowed">
          {currentPage}
        </span>

        <PaginationButton onClick={nextPage} disabled={currentPage === pageCount}>
          <MdKeyboardArrowRight />
        </PaginationButton>
      </div>
    </div>
  );
}

export default Pagination;
