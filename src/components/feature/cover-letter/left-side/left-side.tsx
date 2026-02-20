import { FileText, Sparkles } from "lucide-react";
import React from "react";
import { TONES } from "../../../../constants/cover-letter/cover-letter";
import type { TLeftSideProps } from "./left-side.types";
import ToneItem from "../tone-item/tone-item";

const LeftSide: React.FC<TLeftSideProps> = ({
  companyName,
  setCompanyName,
  jobDescription,
  setJobDescription,
  selectedTone,
  setSelectedTone,
  isGenerating,
  handleGenerate,
}) => {
  return (
    <div className="space-y-6">
      {/* Company & Job Details */}
      <div className="bg-bg-card rounded-lg p-6 border border-border-card">
        <div className="flex items-center gap-2 mb-6">
          <FileText className="w-5 h-5 text-purple-500" />
          <h2 className="text-lg font-semibold">Company & Job Details</h2>
        </div>

        <div className="space-y-4">
          {/* Company Name */}
          <div>
            <label className="block text-sm font-medium mb-2">
              Company Name
            </label>
            <input
              type="text"
              placeholder="e.g., TechCorp"
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
              className="w-full bg-bg-input 0 rounded-lg px-4 py-3 text-white placeholder-gray-500 border-3 border-border-card focus:outline-none focus:border-border-active transition"
            />
          </div>

          {/* Job Description */}
          <div>
            <label className="block text-sm font-medium mb-2">
              Job Description
            </label>
            <textarea
              placeholder="Paste the job description here..."
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
              rows={8}
              className="w-full bg-bg-input 0 rounded-lg px-4 py-3 text-white placeholder-gray-500 border-3 border-border-card focus:outline-none focus:border-border-active transition"
            />
          </div>
        </div>
      </div>

      {/* Writing Tone */}
      <div className="bg-bg-card rounded-lg p-6 border border-border-card">
        <div className="flex items-center gap-2 mb-6">
          <Sparkles className="w-5 h-5 text-purple-500" />
          <h2 className="text-lg font-semibold">Writing Tone</h2>
        </div>

        <div className="grid grid-cols-2 gap-3">
          {TONES.map((tone) => (
            <ToneItem
              key={tone.id}
              tone={tone}
              selectedTone={selectedTone}
              setSelectedTone={setSelectedTone}
            />
          ))}
        </div>
      </div>

      {/* Generate Button */}
      <button
        onClick={handleGenerate}
        disabled={!companyName || !jobDescription || isGenerating}
        className="w-full bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700 text-white font-semibold py-4 rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
      >
        <Sparkles className="w-5 h-5" />
        {isGenerating ? "Generating..." : "Generate Cover Letter"}
      </button>
    </div>
  );
};

export default LeftSide;
