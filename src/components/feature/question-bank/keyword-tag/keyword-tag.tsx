import type { KeywordTagProps } from "./keyword-tag.types";

export const KeywordTag = ({ keyword }: KeywordTagProps) => (
  <span className="text-xs px-2 py-0.5 rounded-md bg-bg-card text-text-primary border border-border-light font-mono">
    #{keyword}
  </span>
);
