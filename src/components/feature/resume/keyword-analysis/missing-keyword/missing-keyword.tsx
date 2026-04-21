import { AlertCircle } from "lucide-react";
import React from "react";
import KeywordItem from "../../../../common/keyword-item/keyword-item";
import KeywordPoint from "../../../../common/keyword-point/keyword-point";
import type { EvaluateCvResponse } from "../../../../../api/cv";
import { useQuery } from "@tanstack/react-query";

const MissingKeyword: React.FC = () => {
  const { data: cvEvaluation } = useQuery<EvaluateCvResponse>({
    queryKey: ["cv-evaluate"],
    enabled: false,
  });

  const missingSkills = cvEvaluation?.evaluation?.missing_skills ?? [];
  const weaknesses = cvEvaluation?.evaluation?.weaknesses ?? [];

  return (
    <div>
      {/* Header */}
      <div className="flex items-center gap-2 mb-3">
        <AlertCircle className="w-5 h-5 text-orange-500" />
        <span className="text-sm font-semibold text-orange-500">
          MISSING KEYWORDS
        </span>
      </div>

      <div className="flex flex-wrap gap-2 mb-4">
        {missingSkills.length === 0 ? (
          <p className="text-sm text-text-muted">No missing keywords found.</p>
        ) : (
          missingSkills.map((item) => (
            <KeywordItem key={item} keyword={item} matched={false} />
          ))
        )}
      </div>

      {/* Areas to Improve */}
      <div className="bg-bg-card rounded-lg p-4">
        <h3 className="text-sm font-semibold text-orange-400 mb-2">
          Areas to Improve
        </h3>

        <ul className="space-y-1 text-sm text-gray-400">
          {weaknesses.length === 0 ? (
            <p className="text-sm text-text-muted">No areas to improve.</p>
          ) : (
            weaknesses.map((str, idx) => (
              <KeywordPoint str={str} key={idx} color="orange" />
            ))
          )}
        </ul>
      </div>
    </div>
  );
};

export default MissingKeyword;
