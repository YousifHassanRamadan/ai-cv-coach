export interface SearchFilterBarProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  filterLabel?: string;
  onFilterClick?: () => void;
}
