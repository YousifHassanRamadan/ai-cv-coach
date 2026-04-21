import ProfileAvatar from "../profile-avatar/profile-avatar";
import ProfileInfo from "../profile-info/profile-info";
import ProfileStats from "../profile-stats/profile-stats";
import type { ProfileCardProps } from "./profile-card.types";

const ProfileCard = ({
  fullName,
  email,
  interviews,
  avgScore,
  totalUploads,
  currentRole,
}: ProfileCardProps) => {
  return (
    <div className="bg-bg-card rounded-xl border border-border-light p-4 sm:p-6 lg:p-8 mb-6">
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-6">
        {/* Avatar + Info */}
        <div className="flex items-start gap-4 sm:gap-6 min-w-0">
          <ProfileAvatar />
          <ProfileInfo name={fullName} email={email} role={currentRole} />
        </div>

        {/* Stats — full width on mobile, auto width on sm+ */}
        <div className="w-full sm:w-auto shrink-0">
          <ProfileStats
            interviews={interviews}
            avgScore={avgScore}
            totalUploads={totalUploads}
          />
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
