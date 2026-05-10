import React from "react";
import type { TSidebarLinksProps } from "./sidebar-links.types";
import { LINKS } from "../../../constants/links/link";
import Link from "../../../components/common/link/link";
import { useTranslation } from "react-i18next";

const SidebarLinks: React.FC<TSidebarLinksProps> = ({ collapsed }) => {
  const { t } = useTranslation();
  return (
    <div className="flex flex-col flex-1 overflow-y-hidden overflow-x-hidden pt-2">
      {LINKS.map((link, index) => (
        <Link
          key={index}
          text={t(link.text)}
          link={link.link}
          collapsed={collapsed}
          textForTooltip={link.textForTooltip} // Pass the translated text for tooltip
        />
      ))}
    </div>
  );
};

export default SidebarLinks;
