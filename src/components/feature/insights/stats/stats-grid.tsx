import SpeechAnalysisCard from "./speech-analysis-card";
import EyeContactCard from "./eye-contact-card";
import ExpressionsCard from "./expressions-card";

const StatsGrid = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      <SpeechAnalysisCard />
      <EyeContactCard />
      <ExpressionsCard />
    </div>
  );
};

export default StatsGrid;
