import PageHeader from "../../components/common/page-header/page-header";
import EmotionTimelineChart from "../../components/feature/insights/charts/emotion-timeline-chart";
import ProgressChart from "../../components/feature/insights/charts/progress-chart";
import FeedbackGrid from "../../components/feature/insights/feedback/feedback-grid";
import NotableMomentsCard from "../../components/feature/insights/notable-moments-card/notable-moments-card";
import ScoreGrid from "../../components/feature/insights/score-cards/score-grid";
import StatsGrid from "../../components/feature/insights/stats/stats-grid";

const InsightsPage = () => {
  return (
    <div className="min-h-full bg-[#0a0a0f] text-white p-8">
      <PageHeader
        title="Insights"
        subtitle="Review your performance and progress"
      />
      <ScoreGrid />
      <EmotionTimelineChart />
      <StatsGrid />
      <FeedbackGrid />
      <NotableMomentsCard />
      <ProgressChart />
    </div>
  );
};

export default InsightsPage;
