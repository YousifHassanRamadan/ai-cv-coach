import React from "react";
import type { TSidebarHeaderProps } from "./sidebar-header.types";
import { NavLink } from "react-router-dom";

const SidebarHeader: React.FC<TSidebarHeaderProps> = ({ collapsed }) => {
  return (
    <div
      className={`flex items-center gap-3 mx-3 transition-all duration-300   ${
        collapsed ? "justify-center mx-0" : "justify-start"
      }`}
    >
      <div className="w-8 h-8 flex-shrink-0 bg-gradient-to-tr from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
        <NavLink to="/" className="text-white text-lg">
          ✦
        </NavLink>
      </div>
      {!collapsed && (
        <h1 className="font-semibold text-lg bg-gradient-to-tr from-blue-500 to-purple-600 bg-clip-text text-transparent whitespace-nowrap overflow-hidden">
          InterviewAI
        </h1>
      )}
    </div>
  );
};

export default SidebarHeader;
