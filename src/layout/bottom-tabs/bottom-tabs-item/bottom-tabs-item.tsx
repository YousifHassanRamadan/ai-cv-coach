import { NavLink } from "react-router-dom";
import { ICON_MAP, type TBottomTabsItemProps } from "./bottom-tabs-item.types";

const BottomTabsItem: React.FC<TBottomTabsItemProps> = ({
  path,
  label,
  icon,
}) => (
  <NavLink
    to={path}
    end={path === "/"}
    className={({ isActive }) =>
      `flex flex-col items-center justify-center flex-1 h-full gap-1 relative transition-all duration-200
      ${isActive ? "text-text-active" : "text-gray-500 hover:text-gray-300"}`
    }
  >
    {({ isActive }) => (
      <>
        {isActive && (
          <span className="absolute top-0 left-1/2 -translate-x-1/2 w-8 h-0.5 bg-primary rounded-b-full" />
        )}
        <span
          className={`transition-transform duration-200 ${isActive ? "scale-110" : "scale-100"}`}
        >
          {ICON_MAP[label] ?? icon}
        </span>
        <span
          className={`text-[10px] font-medium tracking-wide ${isActive ? "text-text-active" : "text-gray-500"}`}
        >
          {label}
        </span>
      </>
    )}
  </NavLink>
);

export default BottomTabsItem;
