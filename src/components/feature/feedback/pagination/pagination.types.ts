import type { PaginationState } from "../types";

export interface PaginationProps {
  pagination: PaginationState;
  onPageChange: (page: number) => void;
}
