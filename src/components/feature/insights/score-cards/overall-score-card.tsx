import CircularProgress from "../../../common/circular-progress/circular-progress";

const OverallScoreCard = () => {
  return (
    <div className="bg-[#1a1a24] rounded-lg p-6 border border-gray-800">
      <div className="text-sm text-gray-400 mb-4 uppercase tracking-wider">
        Overall Score
      </div>
      <div className="flex items-center justify-center py-6">
        <CircularProgress percentage={82} color="#10b981" size="medium" />
      </div>
      <div className="text-center text-sm text-teal-400">
        +5% from last interview
      </div>
    </div>
  );
};

export default OverallScoreCard;
