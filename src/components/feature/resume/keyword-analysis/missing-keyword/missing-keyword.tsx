import { AlertCircle } from "lucide-react";
import React from "react";
import KeywordItem from "../../../../common/keyword-item/keyword-item";
import KeywordPoint from "../../../../common/keyword-point/keyword-point";
import {
  MISSING_KEYWORDS,
  AREAS_TO_IMPROVE,
} from "../../../../../constants/resume/resume";

const MissingKeyword: React.FC = () => {
  return (
    <div>
      {/* Header */}
      <div className="flex items-center gap-2 mb-3">
        <AlertCircle className="w-5 h-5 text-orange-500" />
        <span className="text-sm font-semibold text-orange-500">
          MISSING KEYWORDS
        </span>
      </div>

      {/* Keywords */}
      <div className="flex flex-wrap gap-2 mb-4">
        {MISSING_KEYWORDS.map((item) => (
          <KeywordItem
            key={item.keyword}
            keyword={item.keyword}
            matched={false}
          />
        ))}
      </div>

      {/* Areas to Improve */}
      <div className="bg-bg-card rounded-lg p-4">
        <h3 className="text-sm font-semibold text-orange-400 mb-2">
          Areas to Improve
        </h3>
        <ul className="space-y-1 text-sm text-gray-400">
          {AREAS_TO_IMPROVE.map((str, idx) => (
            <KeywordPoint str={str} key={idx} color="orange" />
          ))}
        </ul>
      </div>
    </div>
  );
};

export default MissingKeyword;
