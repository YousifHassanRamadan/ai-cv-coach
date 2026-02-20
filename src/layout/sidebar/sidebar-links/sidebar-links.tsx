import React from "react";
import type { TSidebarLinksProps } from "./sidebar-links.types";
import { LINKS } from "../../../constants/links/link";
import Link from "../../../components/common/link/link";

const SidebarLinks: React.FC<TSidebarLinksProps> = ({ collapsed }) => {
  return (
    <div className="flex flex-col flex-1 overflow-y-hidden overflow-x-hidden pt-2">
      {LINKS.map((link, index) => (
        <Link
          key={index}
          text={link.text}
          link={link.link}
          collapsed={collapsed}
        />
      ))}
    </div>
  );
};

export default SidebarLinks;
