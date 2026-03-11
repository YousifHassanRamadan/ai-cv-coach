import type { TSidebarProps } from "./sidebar.types";
import SidebarLinks from "./sidebar-links/sidebar-links";
import SidebarHeader from "./sidebar-header/sidebar-header";
import SidebarCollapse from "./sidebar-collapse/sidebar-collapse";

const Sidebar: React.FC<TSidebarProps> = ({ collapsed, setCollapsed }) => {
  return (
    <div className="w-full h-screen flex flex-col justify-between border-r border-border bg-bg-primary overflow-x-hidden ">
      {/* Logo */}
      <div className="border-b-2 border-border  p-3 pt-3 pl-0 h-[77.5px] flex items-center justify-start">
        <SidebarHeader collapsed={collapsed} />
      </div>

      {/* Links + collapse */}
      <div className="flex flex-col justify-between flex-1 overflow-x-hidden overflow-y-hidden">
        <SidebarLinks collapsed={collapsed} />
        <SidebarCollapse collapsed={collapsed} setCollapsed={setCollapsed} />
      </div>
    </div>
  );
};

export default Sidebar;
