import { FileText } from "lucide-react";
import { useState } from "react";
import PageHeader from "../../components/common/page-header/page-header";
import LeftSide from "../../components/feature/cover-letter/left-side/left-side";
import RightSide from "../../components/feature/cover-letter/right-side/right-side";

const CoverLetterPage = () => {
  const [companyName, setCompanyName] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [selectedTone, setSelectedTone] = useState("professional");
  const [generatedLetter, setGeneratedLetter] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);

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

  return (
    <div className="min-h-full bg-[#0a0a0f] text-white p-8">
      {/* Header */}

      <PageHeader
        title="Cover Letter AI"
        subtitle="Generate a tailored cover letter optimized for ATS systems"
      />

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left Side - Input Form */}
        <LeftSide
          companyName={companyName}
          setCompanyName={setCompanyName}
          jobDescription={jobDescription}
          setJobDescription={setJobDescription}
          selectedTone={selectedTone}
          setSelectedTone={setSelectedTone}
          isGenerating={isGenerating}
          handleGenerate={handleGenerate}
        />

        {/* Right Side - Generated Letter */}
        <RightSide generatedLetter={generatedLetter} />
      </div>
    </div>
  );
};

export default CoverLetterPage;
