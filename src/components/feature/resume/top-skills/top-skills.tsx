import { useQuery } from "@tanstack/react-query";
import { TrendingUp } from "lucide-react";
import type { EvaluateCvResponse } from "../../../../api/cv";
import { useTranslation } from "react-i18next";

const TopSkills = () => {
  const { data: cvEvaluation } = useQuery<EvaluateCvResponse>({
    queryKey: ["cv-evaluate"],
    enabled: false,
  });

  const { t } = useTranslation();

  return (
    <div className="bg-bg-card rounded-lg p-6 border border-border-light">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold text-text-primary">
          {t("topSkills")}
        </h2>
        <TrendingUp className="w-5 h-5 text-text-muted" />
      </div>
      <div className="space-y-4">
        <div>
          <div className="flex justify-between mb-2">
            <span className="text-sm">{t("experienceRelevance")}</span>
            <span className="text-sm text-text-active">
              {cvEvaluation
                ? cvEvaluation?.evaluation.category_scores.experience_relevance
                    .score * 100
                : 0}
              %
            </span>
          </div>
          <div className="w-full bg-bg-gray1 rounded-full h-2">
            <div
              className="bg-bg-active h-2 rounded-full"
              style={{
                width: `${cvEvaluation ? cvEvaluation?.evaluation.category_scores.experience_relevance.score * 100 : 0}%`,
              }}
            ></div>
          </div>
        </div>
        <div>
          <div className="flex justify-between mb-2">
            <span className="text-sm">{t("formatting")}</span>
            <span className="text-sm text-indigo-400">
              {cvEvaluation
                ? cvEvaluation?.evaluation.category_scores.formatting.score *
                  100
                : 0}
              %
            </span>
          </div>
          <div className="w-full bg-gray-800 rounded-full h-2">
            <div
              className="bg-bg-active h-2 rounded-full"
              style={{
                width: `${cvEvaluation ? cvEvaluation?.evaluation.category_scores.formatting.score * 100 : 0}%`,
              }}
            ></div>
          </div>
        </div>
        <div>
          <div className="flex justify-between mb-2">
            <span className="text-sm">{t("keywordCoverage")}</span>
            <span className="text-sm text-cyan-400">
              {cvEvaluation
                ? cvEvaluation?.evaluation.category_scores.keyword_coverage
                    .score * 100
                : 0}
              %
            </span>
          </div>
          <div className="w-full bg-gray-800 rounded-full h-2">
            <div
              className="bg-cyan-500 h-2 rounded-full"
              style={{
                width: `${cvEvaluation ? cvEvaluation?.evaluation.category_scores.keyword_coverage.score * 100 : 0}%`,
              }}
            ></div>
          </div>
        </div>
        <div>
          <div className="flex justify-between mb-2">
            <span className="text-sm">{t("skillsMatch")}</span>
            <span className="text-sm text-cyan-400">
              {cvEvaluation
                ? cvEvaluation?.evaluation.category_scores.skills_match.score *
                  100
                : 0}
              %
            </span>
          </div>
          <div className="w-full bg-gray-800 rounded-full h-2">
            <div
              className="bg-cyan-500 h-2 rounded-full"
              style={{
                width: `${cvEvaluation ? cvEvaluation?.evaluation.category_scores.skills_match.score * 100 : 0}%`,
              }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopSkills;
