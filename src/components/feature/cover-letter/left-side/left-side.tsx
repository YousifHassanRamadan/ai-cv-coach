import {
  Box,
  Brain,
  Building2,
  ClipboardList,
  Cloud,
  Code,
  FileText,
  GitBranch,
  Layers,
  Server,
  Shield,
  Sparkles,
  Users,
} from "lucide-react";
import React from "react";
import { TONES } from "../../../../constants/cover-letter/cover-letter";
import type { TLeftSideProps } from "./left-side.types";
import ToneItem from "../tone-item/tone-item";
import RoleCard from "../../interview/role-card/role-card";
import { useTracks } from "../../../../api/tracks";
import LoadingText from "../../../common/loading/loading";
import { useCoverLetter } from "../../../../api/cover-letter";
import { useTranslation } from "react-i18next";

const LeftSide: React.FC<TLeftSideProps> = ({
  jobTitle,
  setJobTitle,
  jobDescription,
  isGenerating,
  handleGenerate,
  selectedRole,
  setSelectedRole,
}) => {
  const { t } = useTranslation();
  const iconMap: Record<string, React.ReactNode> = {
    "git-branch": <GitBranch size={20} />,
    server: <Server size={20} />,
    users: <Users size={20} />,
    building: <Building2 size={20} />,
    shield: <Shield size={20} />,
    cloud: <Cloud size={20} />,
    code: <Code size={20} />,
    layers: <Layers size={20} />,
    brain: <Brain size={20} />,
    boxes: <Box size={20} />,
    "clipboard-list": <ClipboardList size={20} />,
  };

  const { data: tracks, isLoading: isTracksLoading } = useTracks();

  // console.log("Tracks data in LeftSide:", tracks);
  const { mutate: coverLetterMutate, isPending: isCoverLetterMutatePending } =
    useCoverLetter();

  const handleGenerateClick = () => {
    coverLetterMutate(
      {
        jobTitle,
        trackId: selectedRole,
      },
      {
        onSuccess: () => {
          setJobTitle("");
          setSelectedRole("");
        },
      },
    );
  };

  return (
    <div className="space-y-6">
      {/* Company & Job Details */}
      <div className="bg-bg-card rounded-lg p-6 border border-border-card">
        <div className="flex items-center gap-2 mb-6">
          <FileText className="w-5 h-5 text-purple-500" />
          <h2 className="text-lg font-semibold"> {t("companyJobDetails")}</h2>
        </div>

        <div className="space-y-4">
          {/* job title */}
          <div>
            <label className="block text-sm font-medium mb-2">
              {" "}
              {t("jobTitle")}{" "}
            </label>
            <input
              type="text"
              placeholder={t("jobTitlePlaceholder")}
              value={jobTitle}
              onChange={(e) => setJobTitle(e.target.value)}
              className="w-full bg-bg-input 0 rounded-lg px-4 py-3 text-white placeholder-gray-500 border-3 border-border-card focus:outline-none focus:border-border-active transition"
            />
          </div>

          {/* Job Description */}
          {/* <div>
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
          </div> */}
        </div>
      </div>

      {/* Writing Tone */}
      <div className="bg-bg-card rounded-lg p-6 border border-border-card">
        <div className="flex items-center gap-2 mb-6">
          <Sparkles className="w-5 h-5 text-purple-500" />
          <h2 className="text-lg font-semibold"> {t("writingTone")} </h2>
        </div>

        {isTracksLoading ? (
          <LoadingText text={t("tracksLoading")} />
        ) : (
          <div className="grid grid-cols-2 gap-3">
            {tracks?.map((track) => (
              <RoleCard
                key={track.id}
                icon={iconMap[track.icon] ?? <Code size={20} />}
                label={track.name}
                onClick={() => {
                  setSelectedRole(track.id);
                }}
                selected={selectedRole === track.id}
              />
            ))}
          </div>
        )}
      </div>

      {/* Generate Button */}
      <button
        onClick={handleGenerateClick}
        disabled={!jobTitle || !selectedRole || isCoverLetterMutatePending}
        className="w-full bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700 text-white font-semibold py-4 rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
      >
        <Sparkles className="w-5 h-5" />
        {isCoverLetterMutatePending
          ? t("generating")
          : t("generateCoverLetter")}
      </button>
    </div>
  );
};

export default LeftSide;
