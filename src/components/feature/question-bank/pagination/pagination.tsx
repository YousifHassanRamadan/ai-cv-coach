import type { PaginationProps } from "./pagination.types";

export const Pagination = ({
  page,
  total,
  limit,
  onPageChange,
}: PaginationProps) => {
  const totalPages = Math.ceil(total / limit);
  if (totalPages <= 1) return null;

  return (
    <div className="flex items-center justify-between px-1 pt-2">
      <span className="text-xs text-[#65758d]">
        Page {page} of {totalPages} · {total} questions
      </span>
      <div className="flex items-center gap-2">
        <button
          onClick={() => onPageChange(page - 1)}
          disabled={page <= 1}
          className="px-3 py-1.5 rounded-lg text-xs font-medium border border-[#1f1f27] text-[#9ca3af] bg-[#0e0e15] hover:bg-[#14131b] hover:border-[#7c3bed]/40 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
        >
          ← Prev
        </button>
        <button
          onClick={() => onPageChange(page + 1)}
          disabled={page >= totalPages}
          className="px-3 py-1.5 rounded-lg text-xs font-medium border border-[#1f1f27] text-[#9ca3af] bg-[#0e0e15] hover:bg-[#14131b] hover:border-[#7c3bed]/40 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
        >
          Next →
        </button>
      </div>
    </div>
  );
};
