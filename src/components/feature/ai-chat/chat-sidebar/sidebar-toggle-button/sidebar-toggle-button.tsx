import { ChevronRightIcon } from "lucide-react";
import type { SidebarToggleButton } from "./sidebar-toggle-button.types";

export function SidebarToggleButton({ onClick }: SidebarToggleButton) {
  return (
    <button
      onClick={onClick}
      className="p-2 rounded-md text-text-muted hover:text-text-primary hover:bg-bg-tertiary transition-colors"
    >
      <ChevronRightIcon size={18} />
    </button>
  );
}
