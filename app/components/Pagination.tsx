"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  isFirstPage: boolean;
  isLastPage: boolean;
}

const Pagination = ({ currentPage, totalPages, isFirstPage, isLastPage }: PaginationProps) => {
  const getPageNumbers = () => {
    const pages = [];

    if (totalPages <= 6) {
      // Si moins de 6 pages, afficher toutes les pages
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }

    } else {
      // Toujours afficher la première page
      pages.push(1);

      if (currentPage > 3) {
        pages.push("...");
      }

      // Pages autour de la page courante
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

      // Toujours afficher la dernière page
      pages.push(totalPages);
    }

    return pages;
  };

  return (
    <div className="border-2 border-red-600 flex items-center gap-1 bg-[#0a0a0f] p-3 rounded-lg w-fit">
      {/* Bouton Précédent */}
      <button
        disabled={isFirstPage}
        className={`w-8 h-8 flex items-center justify-center rounded transition-colors ${isFirstPage
          ? "text-gray-600 cursor-not-allowed"
          : "text-gray-300 hover:bg-gray-800"
          }`}
      >
        <ChevronLeft size={18} />
      </button>

      {/* Numéros de page */}
      {getPageNumbers().map((page, index) => (
        <button
          key={index}
          disabled={page === "..."}
          className={`w-8 h-8 flex items-center justify-center rounded text-sm font-medium transition-all ${page === currentPage
            ? "bg-gradient-to-br from-purple-600 to-purple-500 text-white shadow-lg shadow-purple-500/30"
            : page === "..."
              ? "text-gray-500 cursor-default"
              : "text-gray-300 hover:bg-gray-800"
            }`}
        >
          {page}
        </button>
      ))}

      {/* Bouton Suivant */}
      <button
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