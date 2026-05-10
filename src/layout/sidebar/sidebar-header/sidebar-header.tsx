import React from "react";
import type { TSidebarHeaderProps } from "./sidebar-header.types";
import { NavLink } from "react-router-dom";
import darkIconImg from "../../../../public/dark-icon.jpeg";
import lightIconImg from "../../../../public/light-icon.jpeg";
import { useTheme } from "../../../context/theme-context";

const SidebarHeader: React.FC<TSidebarHeaderProps> = ({ collapsed }) => {
  const { isDark } = useTheme();

  return (
    <div
      className={`flex items-center gap-3 mx-3 transition-all duration-300   ${
        collapsed ? "justify-center mx-0" : "justify-start"
      }`}
    >
      <div className="w-8 h-8 flex-shrink-0  rounded-xl flex items-center justify-center">
        <NavLink to="/" className="text-white text-lg">
          {isDark ? (
            <img src={darkIconImg} alt="Dark Icon" />
          ) : (
            <img src={lightIconImg} alt="Light Icon" />
          )}
        </NavLink>
      </div>
      {!collapsed && (
        <h1 className="font-semibold text-lg text-text-active bg-clip-text  whitespace-nowrap overflow-hidden">
          Ai Coach
        </h1>
      )}
    </div>
  );
};

export default SidebarHeader;
