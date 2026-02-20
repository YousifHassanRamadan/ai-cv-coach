import React from "react";
import type { TRightSideProps } from "./right-side.types";
import { FileText } from "lucide-react";

const RightSide: React.FC<TRightSideProps> = ({ generatedLetter }) => {
  return (
    <div className="bg-bg-card rounded-lg p-6 border border-border-card h-fit  ">
      <div className="flex items-center gap-2 mb-6">
        <FileText className="w-5 h-5 text-purple-500" />
        <h2 className="text-lg font-semibold">Generated Letter</h2>
      </div>

      {/* Empty State or Generated Content */}
      <div className="min-h-[400px] flex items-center justify-center">
        {generatedLetter ? (
          <div className="w-full">
            <div className="bg-[#0f1419] rounded-lg p-6 border border-gray-700">
              <p className="text-gray-300 whitespace-pre-wrap leading-relaxed">
                {generatedLetter}
              </p>
            </div>
            <div className="mt-4 flex gap-3">
              <button className="flex-1 bg-purple-600 hover:bg-purple-700 text-white py-3 rounded-lg transition font-medium">
                Copy to Clipboard
              </button>
              <button className="flex-1 bg-transparent border border-gray-700 hover:border-purple-500 text-white py-3 rounded-lg transition font-medium">
                Download PDF
              </button>
            </div>
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
