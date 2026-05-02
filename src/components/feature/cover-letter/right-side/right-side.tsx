import React from "react";
import type { TRightSideProps } from "./right-side.types";
import { FileText } from "lucide-react";
import LoadingText from "../../../common/loading/loading";
import CvCard from "../cv-card/cv-card";

const RightSide: React.FC<TRightSideProps> = ({
  generatedLetter,
  isGeneratedLettersLoading,
}) => {
  return (
    <div className="bg-bg-card rounded-lg p-6 border border-border-card h-fit ">
      <div className="flex items-center gap-2 mb-6">
        <FileText className="w-5 h-5 text-purple-500" />
        <h2 className="text-lg font-semibold">Generated Letter</h2>
      </div>

      {/* Empty State or Generated Content */}
      <div className="max-h-[400px] overflow-y-auto flex items-center justify-center">
        {isGeneratedLettersLoading ? (
          <div className="text-center">
            <LoadingText text="Generating your cover letter..." />
          </div>
        ) : generatedLetter.length > 0 ? (
          <div className="w-full">
            {generatedLetter.map((letter) => (
              <CvCard {...letter} key={letter.id} />
            ))}
          </div>
        ) : (
          <div className="text-center">
            <div className="w-20 h-20 bg-gray-800/50 rounded-full flex items-center justify-center mx-auto mb-4">
              <FileText className="w-10 h-10 text-gray-600" />
            </div>
            <p className="text-gray-500">
              Your generated cover letter will appear here
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default RightSide;
