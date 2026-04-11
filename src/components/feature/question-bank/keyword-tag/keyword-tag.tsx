import type { KeywordTagProps } from "./keyword-tag.types";

export const KeywordTag = ({ keyword }: KeywordTagProps) => (
  <span className="text-xs px-2 py-0.5 rounded-md bg-[#211339]/60 text-[#7c3bed] border border-[#7c3bed]/20 font-mono">
    #{keyword}
  </span>
);
