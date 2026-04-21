import type { FeedbackItemProps } from "./feedback-item.types";

const COLOR_MAP = {
  teal: { dot: "bg-teal-500", border: "border-teal-500/20" },
  orange: { dot: "bg-orange-500", border: "border-orange-500/20" },
};

const FeedbackItem = ({ text, color }: FeedbackItemProps) => {
  const { dot, border } = COLOR_MAP[color];

  return (
    <div
      className={`flex items-start gap-3 bg-bg-card rounded-lg p-4 border ${border}`}
    >
      <div className={`w-2 h-2 ${dot} rounded-full mt-2 flex-shrink-0`} />
      <p className="text-sm text-text-muted">{text}</p>
    </div>
  );
};

export default FeedbackItem;
