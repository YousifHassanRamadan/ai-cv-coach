import { CheckCircle } from "lucide-react";
import React from "react";
import KeywordItem from "../../../../common/keyword-item/keyword-item";
import { KEYWORDS, STRENGTHS } from "../../../../../constants/resume/resume";
import KeywordPoint from "../../../../common/keyword-point/keyword-point";

const MatchedKeyword: React.FC = () => {
  return (
    <div>
      {/* Header */}
      <div className="flex items-center gap-2 mb-3">
        <CheckCircle className="w-5 h-5 text-green-500" />
        <span className="text-sm font-semibold text-green-500">
          MATCHED KEYWORDS
        </span>
      </div>

      {/* Keywords */}
      <div className="flex flex-wrap gap-2 mb-4">
        {KEYWORDS.map((item) => (
          <KeywordItem
            key={item.keyword}
            keyword={item.keyword}
            matched={item.matched}
          />
        ))}
      </div>

      {/* Strengths */}
      <div className="bg-bg-card  rounded-lg p-4">
        <h3 className="text-sm font-semibold text-green-400 mb-2">Strengths</h3>
        <ul className="space-y-1 text-sm text-gray-400">
          {STRENGTHS.map((str, idx) => (
            <KeywordPoint str={str} key={idx} color="green" />
          ))}
        </ul>
      </div>
    </div>
  );
};

export default MatchedKeyword;
