import React from "react";
import type { TPageHeaderProps } from "./page-header.types";

const PageHeader: React.FC<TPageHeaderProps> = ({ title, subtitle }) => {
  return (
    <div className="mb-8">
      <h1 className="text-3xl font-bold mb-2 text-text-primary">{title}</h1>
      <p className="text-text-muted">
        {subtitle || "Upload your CV for AI-powered analysis and optimization"}
      </p>
    </div>
  );
};

export default PageHeader;
