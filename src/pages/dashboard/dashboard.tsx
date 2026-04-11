import { Video, ChevronRight } from "lucide-react";

import {
  achievements,
  sessions,
  stats,
} from "../../constants/dashboard/dashboard";
import OutlinedButton from "../../components/common/outlined-button/outlined-button";
import Button from "../../components/common/button/button";
import StatusCard from "../../components/feature/dashboard/status-card/status-card";
import Sessions from "../../components/feature/dashboard/sessions/sessions";
import Achievements from "../../components/feature/dashboard/achievements/achievements";
import { Link, useNavigate } from "react-router-dom";
import { useAuthStore } from "../../store/auth";
import { useDashboardStats } from "../../api/dashboard";
import { useMe } from "../../api/profile";
import { useInterviewHistory } from "../../api/interviews";
import DashboardStats from "../../components/feature/dashboard/dashboard-stats/dashboard-stats";

const DashboardPage = () => {
  const navigation = useNavigate();

  const {
    data: dashboardStats,
    isLoading: isDashboardStatsLoading,
    error,
  } = useDashboardStats();

  const {
    data: userData,
    isLoading: isUserLoading,
    isError: isUserError,
  } = useMe();

  const { data: interviewHistory, isLoading: isInterviewHistoryLoading } =
    useInterviewHistory();

  const { token, refreshToken } = useAuthStore();

  const handleStartInterview = () => {
    navigation("/interview");
  };

  const handleResume = () => {
    navigation("/resume");
  };

  // console.log("Token in Dashboard:", token);
  // console.log("Refresh Token in Dashboard:", refreshToken);

  console.log("dashboardStats:", dashboardStats);

  return (
    <div className="min-h-screen bg-[#0A0A0F] text-white px-4 sm:px-6 md:px-8 py-4 sm:py-6 space-y-4 sm:space-y-6">
      {/* Greeting + Buttons */}
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
        <div className="flex-1">
          <h1 className="text-2xl sm:text-3xl font-bold">
            Good afternoon,{" "}
            <span className="text-indigo-400">
              {isUserLoading
                ? "Loading..."
                : userData
                  ? userData.fName + " " + userData.lName
                  : "User"}
            </span>
            👋
          </h1>
          <p className="text-gray-500 mt-1 text-sm sm:text-base">
            Ready to ace your next interview? Let's practice!
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 w-full sm:w-auto">
          <Button
            text="Start Interview"
            icon={<Video size={18} />}
            onClick={handleStartInterview}
          />
          <OutlinedButton text="Upload CV" onClick={handleResume} />
        </div>
      </div>

      {/* Stats Row */}
      <div className="w-full">
        <DashboardStats
          data={dashboardStats}
          isLoading={isDashboardStatsLoading}
        />
      </div>

      {/* Bottom Section: Sessions + Achievements */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
        {/* Recent Sessions */}
        <div className="lg:col-span-2 bg-bg-card border border-gray-800 rounded-2xl p-4 sm:p-6">
          <div className="flex items-center justify-between mb-4 sm:mb-5">
            <h2 className="text-base sm:text-lg font-semibold">
              Recent Sessions
            </h2>
            <Link
              to="/history"
              className="text-text-active text-xs sm:text-sm hover:text-indigo-300 flex items-center gap-1 transition-colors"
            >
              View all <ChevronRight size={16} />
            </Link>
          </div>
          <div className="space-y-2 overflow-y-auto max-h-[400px]">
            {isInterviewHistoryLoading ? (
              <>
                <p className="text-gray-500 text-sm">
                  Loading interview history...
                </p>
              </>
            ) : (
              <>
                {interviewHistory?.map((session, i) => (
                  <Sessions
                    key={i}
                    id={session.id}
                    track={session.track}
                    questionCount={session.questionCount}
                    status={session.status}
                    totalScore={session.totalScore}
                    startedAt={session.startedAt}
                    endedAt={session.endedAt} // placeholder if endedAt isn't available
                    difficulty={session.difficulty ?? "medium"}
                    weightProfile={session.weightProfile ?? ""}
                  />
                ))}
              </>
            )}
          </div>
        </div>

        {/* Achievements */}
        <div className="bg-[#12121A] border border-gray-800 rounded-2xl p-4 sm:p-6">
          <h2 className="text-base sm:text-lg font-semibold mb-4 sm:mb-5">
            Achievements
          </h2>
          <div className="grid grid-cols-3 gap-2 sm:gap-3">
            {achievements.map((a, i) => (
              <Achievements key={i} {...a} />
            ))}
          </div>
          <button className="w-full mt-4 sm:mt-5 text-xs sm:text-sm text-white font-semibold hover:text-text-active transition-colors">
            View All Badges
          </button>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
