import React from "react";

import BottomTabsItem from "./bottom-tabs-item/bottom-tabs-item";
import type { TBottomTabsProps } from "./bottom-nav.types";

const BottomTabs: React.FC<TBottomTabsProps> = ({ navItems }) => (
  <nav className="fixed bottom-0 left-0 right-0 bg-bg-primary border-t border-border z-50 md:hidden">
    <div className="flex items-center justify-around h-16 px-1">
      {navItems.map((item) => (
        <BottomTabsItem key={item.path} {...item} />
      ))}
    </div>
  </nav>
);

export default BottomTabs;
