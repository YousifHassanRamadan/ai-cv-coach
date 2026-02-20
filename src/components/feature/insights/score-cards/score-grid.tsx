import BreakdownScoreCard from "./breakdown-score-card";
import OverallScoreCard from "./overall-score-card";

const ScoreGrid = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
      <OverallScoreCard />
      <BreakdownScoreCard
        title="Communication"
        subtitle="Clarity & Structure"
        percentage={85}
        color="#8b5cf6"
        showHeader={true}
      />
      <BreakdownScoreCard
        title="Technical"
        subtitle="Knowledge & Accuracy"
        percentage={78}
        color="#06b6d4"
      />
      <BreakdownScoreCard
        title="Confidence"
        subtitle="Delivery & Presence"
        percentage={88}
        color="#10b981"
      />
    </div>
  );
};

export default ScoreGrid;
