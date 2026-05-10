import { useTranslation } from "react-i18next";
import type { ProfileStatsProps } from "./profile-stats.types";
import StatItem from "./stat-item/stat-item";

const ProfileStats = ({
  interviews,
  avgScore,
  totalUploads,
}: ProfileStatsProps) => {
  const { t } = useTranslation();
  return (
    <div className="flex gap-8">
      <StatItem value={interviews} label={t("profile.stats.interviews")} />
      <StatItem
        value={avgScore}
        label={t("profile.stats.avgScore")}
        highlight
      />
      <StatItem value={totalUploads} label={t("profile.stats.totalUploads")} />
    </div>
  );
};

export default ProfileStats;
