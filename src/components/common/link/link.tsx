import React from "react";
import { NavLink } from "react-router-dom";
import type { TLinkProps } from "./link.types";
import { ICON_MAP } from "../../../constants/links/link";

const Link: React.FC<TLinkProps> = ({
  text,
  link,
  collapsed,
  textForTooltip,
}) => {
  const key = textForTooltip?.toLowerCase();
  const Icon = ICON_MAP[key as keyof typeof ICON_MAP];

  return (
    <div className="relative group">
      <NavLink
        to={link}
        className={({ isActive }) =>
          `
          flex items-center rounded-lg transition-all mx-2 relative
          ${collapsed ? "justify-center px-0" : "gap-3 px-3"}
          py-2.5
          ${
            isActive
              ? "bg-bg-active/20 text-text-active"
              : "text-text-muted hover:bg-bg-active/20 hover:text-text-active"
          }
          `
        }
      >
        {({ isActive }) => (
          <>
            {isActive && (
              <span className="w-1 h-6 absolute bg-bg-active left-0 rounded" />
            )}

            {Icon && (
              <Icon
                size={20}
                className={`flex-shrink-0 transition-all ${
                  isActive ? "text-text-active" : ""
                }`}
              />
            )}

            {/* Label - animates out when collapsed */}
            <span
              className={`
                whitespace-nowrap overflow-hidden transition-all duration-300
                ${collapsed ? "w-0 opacity-0" : "w-auto opacity-100"}
              `}
            >
              {text}
            </span>
          </>
        )}
      </NavLink>

      {/* Tooltip - only visible on desktop when sidebar is collapsed */}
      {collapsed && (
        <div
          className="
            pointer-events-none
            absolute left-full top-1/2 -translate-y-1/2 ml-3
            px-2.5 py-1.5 rounded-md text-xs font-medium whitespace-nowrap z-50
            bg-bg-active/20 text-text-muted shadow-lg
            opacity-0 scale-95
            group-hover:opacity-100 group-hover:scale-100
            transition-all duration-150
            hidden md:block
          "
        >
          {text}
          {/* Arrow pointing left */}
          <span className="absolute right-full top-1/2 -translate-y-1/2 border-4 border-transparent border-r-border-light" />
        </div>
      )}
    </div>
  );
};

export default Link;
