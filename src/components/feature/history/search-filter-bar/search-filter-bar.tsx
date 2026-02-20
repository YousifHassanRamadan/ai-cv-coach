import React from "react";
import type { SearchFilterBarProps } from "./search-filter-bar.types";
import { FilterIcon, SearchIcon, SendIcon } from "lucide-react";

const SearchFilterBar: React.FC<SearchFilterBarProps> = ({
  searchTerm,
  onSearchChange,
  filterLabel = "Date",
  onFilterClick,
}) => {
  return (
    <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4">
      <div className="flex-1 relative">
        <SearchIcon
          size={15}
          className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500"
        />
        <input
          type="text"
          placeholder="Search by role or company..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full bg-bg-input border border-border-card rounded-lg pl-9 sm:pl-10 pr-4 py-2 sm:py-2.5 text-xs sm:text-sm text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500"
        />
      </div>
      <button
        onClick={onFilterClick}
        className="bg-bg-input border border-border-card  rounded-lg px-4 py-2 sm:py-2.5 text-xs sm:text-sm text-gray-300 hover:bg-gray-800 transition-colors flex items-center justify-center gap-2"
      >
        <FilterIcon size={15} className="text-gray-300" />
        {filterLabel}
      </button>
    </div>
  );
};

export default SearchFilterBar;
