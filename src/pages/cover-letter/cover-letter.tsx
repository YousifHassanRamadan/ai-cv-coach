import { use, useState } from "react";
import PageHeader from "../../components/common/page-header/page-header";
import LeftSide from "../../components/feature/cover-letter/left-side/left-side";
import RightSide from "../../components/feature/cover-letter/right-side/right-side";
import { useTracks } from "../../api/tracks";
import {
  useCoverLetter,
  useGetCoverLetterList,
  type CvResponse,
} from "../../api/cover-letter";
import { useQuery, useQueryClient } from "@tanstack/react-query";

const CoverLetterPage = () => {
  const [jobTitle, setJobTitle] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [selectedTone, setSelectedTone] = useState("professional");
  const [generatedLetter, setGeneratedLetter] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [selectedRole, setSelectedRole] = useState("");

  const queryClient = useQueryClient();

  const handleGenerate = () => {
    setIsGenerating(true);
    // Simulate API call
    setTimeout(() => {
      setGeneratedLetter(
        "Your generated cover letter will appear here with tailored content based on the job description and company information you provided.",
      );
      setIsGenerating(false);
    }, 2000);
  };

  const coverLetter = queryClient.getQueryData<CvResponse>([
    "cover-letter-response",
  ]);

  const { data: generatedLetters, isLoading: isGeneratedLettersLoading } =
    useGetCoverLetterList();

  console.log("Cover Letter API Response:", coverLetter);

  console.log("Generated Letters List:", generatedLetters);

  return (
    <div className="min-h-full bg-bg-primary text-text-primary p-8">
      {/* Header */}

      <PageHeader
        title="Cover Letter AI"
        subtitle="Generate a tailored cover letter optimized for ATS systems"
      />

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left Side - Input Form */}
        <LeftSide
          jobTitle={jobTitle}
          setJobTitle={setJobTitle}
          jobDescription={jobDescription}
          setJobDescription={setJobDescription}
          selectedTone={selectedTone}
          setSelectedTone={setSelectedTone}
          isGenerating={isGenerating}
          handleGenerate={handleGenerate}
          selectedRole={selectedRole}
          setSelectedRole={setSelectedRole}
        />

        {/* Right Side - Generated Letter */}
        <RightSide
          generatedLetter={generatedLetters ?? []}
          isGeneratedLettersLoading={isGeneratedLettersLoading}
        />
      </div>
    </div>
  );
};

export default CoverLetterPage;
