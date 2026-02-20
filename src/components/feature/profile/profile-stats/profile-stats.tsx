import type { ProfileStatsProps } from "./profile-stats.types";
import StatItem from "./stat-item/stat-item";

const ProfileStats = ({
  interviews,
  avgScore,
  dayStreak,
  badges,
}: ProfileStatsProps) => {
  return (
    <div className="flex gap-8">
      <StatItem value={interviews} label="Interviews" />
      <StatItem value={avgScore} label="Avg Score" highlight />
      <StatItem value={dayStreak} label="Day Streak" />
      <StatItem value={badges} label="Badges" />
    </div>
  );
};

export default ProfileStats;
