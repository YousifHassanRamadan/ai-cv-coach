import React from "react";
import type { EvaluateCvResponse } from "../../../../api/cv";
import { useQuery } from "@tanstack/react-query";
import OptimizationItem from "./optimization-item/optimization-item";

const OptimizationTips = () => {
  const { data: cvEvaluation } = useQuery<EvaluateCvResponse>({
    queryKey: ["cv-evaluate"],
    enabled: false,
  });

  return (
    <div className="bg-bg-card rounded-lg p-6 border border-border-light">
      <div className="flex items-center gap-2 mb-4">
        <svg
          className="w-5 h-5 text-text-active"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
          />
        </svg>
        <h2 className="text-lg font-semibold text-text-primary">
          Optimization Tips
        </h2>
      </div>
      <div className="space-y-3">
        {(cvEvaluation?.evaluation?.suggestions ?? []).length === 0 ? (
          <p className="text-sm text-gray-400">
            No optimization tips available.
          </p>
        ) : (
          (cvEvaluation?.evaluation?.suggestions ?? []).map(
            (suggest, index) => (
              <OptimizationItem key={index} description={suggest} />
            ),
          )
        )}
      </div>
    </div>
  );
};

export default OptimizationTips;
