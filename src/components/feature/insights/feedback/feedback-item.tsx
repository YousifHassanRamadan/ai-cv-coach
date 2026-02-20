import type { FeedbackItemProps } from "./feedback.types";

const FeedbackItem = ({ text, color }: FeedbackItemProps) => {
  const colorClasses = {
    teal: "border-teal-500/20 bg-teal-500",
    orange: "border-orange-500/20 bg-orange-500",
  };

  return (
    <div
      className={`flex items-start gap-3 bg-[#0f1419] rounded-lg p-4 border ${colorClasses[color].split(" ")[0]}`}
    >
      <div
        className={`w-2 h-2 ${colorClasses[color].split(" ")[1]} rounded-full mt-2 flex-shrink-0`}
      ></div>
      <p className="text-sm text-gray-300">{text}</p>
    </div>
  );
};

export default FeedbackItem;
