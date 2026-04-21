import { AlertCircle } from "lucide-react";
import MatchedKeyword from "./matched-keyword/matched-keyword";
import MissingKeyword from "./missing-keyword/missing-keyword";

const KeywordAnalysis = () => {
  return (
    <div className="bg-bg-card rounded-lg p-6 border border-border-light mb-6">
      <h2 className="text-lg font-semibold mb-4 text-text-primary">
        Keyword Analysis
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Matched Keywords */}
        <MatchedKeyword />

        {/* Missing Keywords */}
        <MissingKeyword />
      </div>
    </div>
  );
};

export default KeywordAnalysis;
