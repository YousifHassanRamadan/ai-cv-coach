// Pagination.tsx
import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { PaginationProps } from "./pagination.types";

const Pagination: React.FC<PaginationProps> = ({
  pagination,
  onPageChange,
}) => {
  const { currentPage, totalPages } = pagination;

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1).filter(
    (p) => p === 1 || p === totalPages || Math.abs(p - currentPage) <= 1,
  );

  const withEllipsis = pages.reduce<(number | "...")[]>((acc, page, i) => {
    if (i > 0 && page - (pages[i - 1] as number) > 1) acc.push("...");
    acc.push(page);
    return acc;
  }, []);

  return (
    <div className="flex items-center justify-between">
      <p className="text-xs text-gray-600">
        Page {currentPage} of {totalPages}
      </p>
      <div className="flex items-center gap-1">
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="p-1.5 rounded-lg border border-border text-gray-500 hover:text-white hover:border-gray-600 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>

        {withEllipsis.map((item, i) =>
          item === "..." ? (
            <span key={`ellipsis-${i}`} className="px-1 text-gray-600 text-sm">
              ...
            </span>
          ) : (
            <button
              key={item}
              onClick={() => onPageChange(item as number)}
              className={`min-w-[32px] h-8 rounded-lg text-xs font-medium border transition-colors ${
                currentPage === item
                  ? "bg-bg-active border-border-active text-white"
                  : "border-border text-gray-500 hover:text-white hover:border-gray-600"
              }`}
            >
              {item}
            </button>
          ),
        )}

        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="p-1.5 rounded-lg border border-border text-gray-500 hover:text-white hover:border-gray-600 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default Pagination;
