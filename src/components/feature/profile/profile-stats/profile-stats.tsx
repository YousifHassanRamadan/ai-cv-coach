import type { ProfileStatsProps } from "./profile-stats.types";
import StatItem from "./stat-item/stat-item";

const ProfileStats = ({
  interviews,
  avgScore,
  totalUploads,
}: ProfileStatsProps) => {
  return (
    <div className="flex gap-8">
      <StatItem value={interviews} label="Interviews" />
      <StatItem value={avgScore} label="Avg Score" highlight />
      <StatItem value={totalUploads} label="Total Uploads" />
    </div>
  );
};

export default ProfileStats;
