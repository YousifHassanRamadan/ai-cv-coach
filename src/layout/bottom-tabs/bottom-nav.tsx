import React from "react";

import BottomTabsItem from "./bottom-tabs-item/bottom-tabs-item";
import type { TBottomTabsProps } from "./bottom-nav.types";

const BottomTabs: React.FC<TBottomTabsProps> = ({ navItems }) => (
  <nav className="fixed bottom-0 left-0 right-0 bg-bg-primary border-t border-border z-50 md:hidden">
    <div className="flex items-center h-16 px-2 overflow-x-auto scrollbar-hide whitespace-nowrap">
      <div className="flex items-center gap-3 min-w-max">
        {navItems.map((item) => (
          <BottomTabsItem key={item.path} {...item} />
        ))}
      </div>
    </div>
  </nav>
);

export default BottomTabs;
