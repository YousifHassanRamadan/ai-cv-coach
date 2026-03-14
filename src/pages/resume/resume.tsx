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

const ResumePage = () => {
  const { data: cvEvaluation } = useQuery<EvaluateCvResponse>({
    queryKey: ["cv-evaluate"],
    enabled: false,
  });

  console.log("CV Evaluation:", cvEvaluation);
  return (
    <div className="min-h-full bg-[#0a0a0f] text-white p-8">
      {/* Header */}
      <PageHeader
        title="Resume Intelligence"
        subtitle="Upload your CV for AI-powered analysis and optimization"
      />

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Upload CV Section */}
        <UploadCvSection />
        {/* ATS Score */}

        <ProgressCard
          score={
            cvEvaluation ? cvEvaluation?.evaluation?.overall_score * 100 : 0
          }
          title="ATS Score"
          gradientColors={["#f59f0a", "#f59f0a"]}
          description={
            cvEvaluation
              ? "Your ATS score systems"
              : "you need to select a track and upload a CV to get an ATS score"
          }
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
          title="Job Match"
          gradientColors={["#8b5cf6", "#8b5cf6"]}
          description={
            cvEvaluation
              ? cvEvaluation?.evaluation?.category_scores?.skills_match?.details
              : "you need to select a track and upload a CV to get a job match score"
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
