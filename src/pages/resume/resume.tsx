import { TargetIcon, DotSquare } from "lucide-react";

import PageHeader from "../../components/common/page-header/page-header";
import UploadCvSection from "../../components/feature/resume/upload-cv-section/upload-cv-section";
import ProgressCard from "../../components/common/progess-card/progress-card";
import TopSkills from "../../components/feature/resume/top-skills/top-skills";
import KeywordAnalysis from "../../components/feature/resume/keyword-analysis/keyword-analysis";

const ResumePage = () => {
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
          score={78}
          title="ATS Score"
          gradientColors={["#f59f0a", "#f59f0a"]}
          description="Your resume is well-optimized for ATS systems"
          size={180}
          icon={TargetIcon}
        />

        {/* Job Match */}

        <ProgressCard
          score={88}
          title="Job Match"
          gradientColors={["#8b5cf6", "#8b5cf6"]}
          description="Front-end developer role at TechCorp"
          size={180}
          icon={DotSquare}
        />

        {/* Top Skills */}
        <TopSkills />
      </div>

      {/* Keyword Analysis */}
      <KeywordAnalysis />

      {/* Optimization Tips */}
      <div className="bg-bg-card rounded-lg p-6 border border-gray-800">
        <div className="flex items-center gap-2 mb-4">
          <svg
            className="w-5 h-5 text-purple-500"
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
          <h2 className="text-lg font-semibold">Optimization Tips</h2>
        </div>
        <div className="space-y-3">
          <div className="flex items-start gap-3 bg-red-500/10 border border-red-500/20 rounded-lg p-4">
            <span className="px-2 py-1 bg-red-500/20 text-red-400 rounded text-xs font-semibold">
              high
            </span>
            <p className="text-sm text-gray-300">
              Add GraphQL experience to match job requirements
            </p>
          </div>
          <div className="flex items-start gap-3 bg-red-500/10 border border-red-500/20 rounded-lg p-4">
            <span className="px-2 py-1 bg-red-500/20 text-red-400 rounded text-xs font-semibold">
              high
            </span>
            <p className="text-sm text-gray-300">
              Include AWS/cloud experience if applicable
            </p>
          </div>
          <div className="flex items-start gap-3 bg-orange-500/10 border border-orange-500/20 rounded-lg p-4">
            <span className="px-2 py-1 bg-orange-500/20 text-orange-400 rounded text-xs font-semibold">
              medium
            </span>
            <p className="text-sm text-gray-300">
              Quantify more achievements with specific numbers
            </p>
          </div>
          <div className="flex items-start gap-3 bg-gray-500/10 border border-gray-500/20 rounded-lg p-4">
            <span className="px-2 py-1 bg-gray-500/20 text-gray-400 rounded text-xs font-semibold">
              low
            </span>
            <p className="text-sm text-gray-300">
              Consider adding a technical skills section
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResumePage;
