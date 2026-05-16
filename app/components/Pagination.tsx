"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  isFirstPage: boolean;
  isLastPage: boolean;
}

const Pagination = ({ currentPage, totalPages, isFirstPage, isLastPage }: PaginationProps) => {

  const router = useRouter();
  const searchParams = useSearchParams();

  const handlePageChange = (pageNumber: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", pageNumber.toString());

    router.push(`?${params.toString()}`);
  };

  const getPageNumbers = () => {
    const pages = [];

    if (totalPages <= 6) {

      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }

    } else {
      pages.push(1);

      if (currentPage > 3) {
        pages.push("...");
      }

      const start = Math.max(2, currentPage - 1);
      const end = Math.min(totalPages - 1, currentPage + 1);

      for (let i = start; i <= end; i++) {
        if (i !== 1 && i !== totalPages) {
          pages.push(i);
        }
      }

      if (currentPage < totalPages - 2) {
        pages.push("...");
      }

      pages.push(totalPages);
    }

    return pages;
  };

  return (
    <div className="dark event-glass border-2 border-red-600 flex items-center gap-1 p-1 rounded-lg w-fit">
      
      <button
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={isFirstPage}
        className={`w-8 h-8 flex items-center justify-center rounded transition-colors ${isFirstPage
          ? "text-gray-600 cursor-not-allowed"
          : "text-gray-300 hover:bg-gray-800"
          }`}
      >
        <ChevronLeft size={18} />
      </button>

      {getPageNumbers().map((page, index) => (
        <button
          key={index}
          onClick={() => typeof page === "number" && handlePageChange(page)}
          disabled={page === "..."}
          className={`w-8 h-8 flex items-center justify-center rounded-md text-sm font-medium transition-all ${page === currentPage
            ? "bg-gradient-to-br from-purple-600 to-purple-500 text-white shadow-lg shadow-purple-500/30"
            : page === "..."
              ? "text-gray-500 cursor-default"
              : "text-gray-300 hover:bg-gray-800"
            }`}
        >
          {page}
        </button>
      ))}

      <button
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={isLastPage}
        className={`w-8 h-8 flex items-center justify-center rounded transition-colors ${isLastPage
          ? "text-gray-600 cursor-not-allowed"
          : "text-gray-300 hover:bg-gray-800"
          }`}
      >
        <ChevronRight size={18} />
      </button>
    </div>
  );
};

export default Pagination;