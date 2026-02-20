import React from "react";
import type { TKeywordItemProps } from "./keyword-item.types";

const KeywordItem: React.FC<TKeywordItemProps> = ({ keyword, matched }) => {
  return (
    <span
      className={`px-3 py-1 bg-${matched ? "green" : "orange"}-500/10 text-${matched ? "green" : "orange"}-400 rounded-full text-sm`}
    >
      {keyword}
    </span>
  );
};

export default KeywordItem;
