import { CheckCircle } from "lucide-react";
import React from "react";
import KeywordItem from "../../../../common/keyword-item/keyword-item";
import { KEYWORDS, STRENGTHS } from "../../../../../constants/resume/resume";
import KeywordPoint from "../../../../common/keyword-point/keyword-point";
import type { EvaluateCvResponse } from "../../../../../api/cv";
import { useQuery } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";

const MatchedKeyword: React.FC = () => {
  const { t } = useTranslation();
  const { data: cvEvaluation } = useQuery<EvaluateCvResponse>({
    queryKey: ["cv-evaluate"],
    enabled: false,
  });

  const matchedSkills = cvEvaluation?.evaluation?.matched_skills ?? [];
  const strengths = cvEvaluation?.evaluation?.strengths ?? [];

  return (
    <div>
      {/* Header */}
      <div className="flex items-center gap-2 mb-3">
        <CheckCircle className="w-5 h-5 text-green-500" />
        <span className="text-sm font-semibold text-green-500">
          {t("matchedKeywords")}
        </span>
      </div>

      {/* Keywords */}
      <div className="flex flex-wrap gap-2 mb-4">
        {matchedSkills.length === 0 ? (
          <p className="text-sm text-text-muted">{t("noMatchedKeywords")}</p>
        ) : (
          matchedSkills.map((item) => (
            <KeywordItem key={item} keyword={item} matched={true} />
          ))
        )}
      </div>

      {/* Strengths */}
      <div className="bg-bg-subcard rounded-lg p-4">
        <h3 className="text-sm font-semibold text-green-400 mb-2">
          {t("strengths")}
        </h3>

        <ul className="space-y-1 text-sm text-gray-400">
          {strengths.length === 0 ? (
            <p className="text-sm text-text-muted">{t("noStrengths")}</p>
          ) : (
            strengths.map((str, idx) => (
              <KeywordPoint str={str} key={idx} color="green" />
            ))
          )}
        </ul>
      </div>
    </div>
  );
};

export default MatchedKeyword;
