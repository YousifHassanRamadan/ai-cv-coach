import { AlertTriangle } from "lucide-react";
import FeedbackItem from "./feedback-item";

const ImprovementsCard = () => {
  const improvements = [
    'Reduce filler words like "um" and "like" for more polished delivery',
    "Provide more quantified results when discussing achievements",
    "Take a brief pause before answering to gather thoughts",
  ];

  return (
    <div className="bg-[#1a1a24] rounded-lg p-6 border border-gray-800">
      <div className="flex items-center gap-2 mb-6">
        <div className="w-6 h-6 bg-orange-500/20 rounded flex items-center justify-center">
          <AlertTriangle className="w-4 h-4 text-orange-500" />
        </div>
        <h3 className="font-semibold">Areas to Improve</h3>
      </div>
      <div className="space-y-3">
        {improvements.map((improvement, index) => (
          <FeedbackItem key={index} text={improvement} color="orange" />
        ))}
      </div>
    </div>
  );
};

export default ImprovementsCard;
