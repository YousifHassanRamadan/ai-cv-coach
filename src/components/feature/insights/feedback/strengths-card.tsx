import FeedbackItem from "./feedback-item";

const StrengthsCard = () => {
  const strengths = [
    "Excellent use of specific examples to illustrate your points",
    "Strong technical vocabulary and clear explanations",
    "Good energy and enthusiasm throughout the interview",
  ];

  return (
    <div className="bg-[#1a1a24] rounded-lg p-6 border border-gray-800">
      <div className="flex items-center gap-2 mb-6">
        <div className="w-6 h-6 bg-teal-500/20 rounded flex items-center justify-center">
          <svg
            className="w-4 h-4 text-teal-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>
        <h3 className="font-semibold">Strengths</h3>
      </div>
      <div className="space-y-3">
        {strengths.map((strength, index) => (
          <FeedbackItem key={index} text={strength} color="teal" />
        ))}
      </div>
    </div>
  );
};

export default StrengthsCard;
