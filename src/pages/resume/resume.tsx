import { TargetIcon, DotSquare } from "lucide-react";

import PageHeader from "../../components/common/page-header/page-header";
import UploadCvSection from "../../components/feature/resume/upload-cv-section/upload-cv-section";
import ProgressCard from "../../components/common/progess-card/progress-card";
import TopSkills from "../../components/feature/resume/top-skills/top-skills";
import KeywordAnalysis from "../../components/feature/resume/keyword-analysis/keyword-analysis";
import { useTracks } from "../../api/tracks";
import { useQuery } from "@tanstack/react-query";
import type { EvaluateCvResponse } from "../../api/cv";
import OptimizationTips from "../../components/feature/resume/optimization-tips/optimization-tips";
import { useTranslation } from "react-i18next";

const ResumePage = () => {
  const { t } = useTranslation();

  const { data: cvEvaluation } = useQuery<EvaluateCvResponse>({
    queryKey: ["cv-evaluate"],
    enabled: false,
  });

  console.log("CV Evaluation:", cvEvaluation);
  return (
    <div className="min-h-full bg-bg-primary  p-8">
      {/* Header */}
      <PageHeader title={t("resumeTitle")} subtitle={t("resumeSubtitle")} />

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Upload CV Section */}
        <UploadCvSection />
        {/* ATS Score */}

        <ProgressCard
          score={
            cvEvaluation ? cvEvaluation?.evaluation?.overall_score * 100 : 0
          }
          title={t("atsScore")}
          gradientColors={["#f59f0a", "#f59f0a"]}
          description={cvEvaluation ? t("atsScoreDesc") : t("atsScoreEmpty")}
          size={180}
          icon={TargetIcon}
        />

        {/* Job Match */}

        <ProgressCard
          score={
            cvEvaluation
              ? cvEvaluation?.evaluation?.category_scores?.skills_match.score *
                100
              : 0
          }
          title={t("jobMatch")}
          gradientColors={["#8b5cf6", "#8b5cf6"]}
          description={
            cvEvaluation
              ? cvEvaluation?.evaluation?.category_scores?.skills_match?.details
              : t("jobMatchEmpty")
          }
          size={180}
          icon={DotSquare}
        />

        {/* Top Skills */}
        <TopSkills />
      </div>

      {/* Keyword Analysis */}
      <KeywordAnalysis />

      {/* Optimization Tips */}
      <OptimizationTips />
    </div>
  );
};

export default ResumePage;
