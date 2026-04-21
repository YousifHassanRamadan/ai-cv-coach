import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { TSidebarCollapseProps } from "./sidebar-collapse.types";
import Link from "../../../components/common/link/link";

const SidebarCollapse: React.FC<TSidebarCollapseProps> = ({
  collapsed,
  setCollapsed,
}) => {
  return (
    <div className="flex flex-col flex-shrink-0 border-t-2 border-border-light pt-3 overflow-hidden">
      <Link text="Settings" link="/settings" collapsed={collapsed} />

      <button
        onClick={() => setCollapsed(!collapsed)}
        title={collapsed ? "Expand" : "Collapse"}
        className={`
          flex items-center gap-2 mx-2 mb-3 mt-1 px-3 py-2.5 rounded-lg
          transition-all duration-200 text-text-secondary
          hover:bg-bg-active/20 hover:text-text-active
          ${collapsed ? "justify-center" : "justify-end"}
        `}
      >
        {collapsed ? (
          <ChevronRight size={18} />
        ) : (
          <>
            <span className="text-xs text-text-muted">Collapse</span>
            <ChevronLeft size={18} />
          </>
        )}
      </button>
    </div>
  );
};

export default SidebarCollapse;
