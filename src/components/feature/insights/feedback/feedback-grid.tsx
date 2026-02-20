import StrengthsCard from "./strengths-card";
import ImprovementsCard from "./improvements-card";

const FeedbackGrid = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
      <StrengthsCard />
      <ImprovementsCard />
    </div>
  );
};

export default FeedbackGrid;
