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
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

const DashboardPage = () => {
  const navigation = useNavigate();

  const [greeting, setGreeting] = useState("");

  const { t } = useTranslation();

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

  useEffect(() => {
    const updateGreeting = () => {
      const now = new Date();
      const hour = now.getHours();
      if (hour >= 5 && hour < 12) {
        setGreeting(t("greeting.morning"));
      } else if (hour >= 12 && hour < 18) {
        setGreeting(t("greeting.afternoon"));
      } else if (hour >= 18 && hour < 24) {
        setGreeting(t("greeting.evening"));
      } else {
        setGreeting(t("greeting.night"));
      }
    };

    updateGreeting();

    const interval = setInterval(updateGreeting, 60 * 1000);

    return () => clearInterval(interval);
  }, []);

  // console.log("Interview History:", interviewHistory);

  console.log(import.meta.env.VITE_ELEVENLABS_API_KEY);

  return (
    <div className="min-h-screen bg-bg-primary text-text-primary px-4 sm:px-6 md:px-8 py-4 sm:py-6 space-y-4 sm:space-y-6">
      {/* Greeting + Buttons */}
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
        <div className="flex-1">
          <h1 className="text-2xl sm:text-3xl font-bold">
            {greeting},{" "}
            <span className="text-text-active">
              {isUserLoading
                ? t("loading")
                : userData
                  ? userData.fName + " " + userData.lName
                  : t("user")}
            </span>
            👋
            <h2 className="text-2xl font-bold mb-2">{t("welcome")}</h2>
          </h1>
          <p className="text-text-muted mt-1 text-sm sm:text-base">
            {t("readyMessage")}
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 w-full sm:w-auto">
          <Button
            text={t("startInterview")}
            icon={<Video size={18} />}
            onClick={handleStartInterview}
          />
          <OutlinedButton text={t("uploadCV")} onClick={handleResume} />
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
      <div className=" w-full">
        {/* Recent Sessions */}
        <div className="lg:col-span-2 bg-bg-card border border-border-light rounded-2xl p-4 sm:p-6">
          <div className="flex items-center justify-between mb-4 sm:mb-5">
            <h2 className="text-base sm:text-lg font-semibold text-text-primary">
              {t("recentSessions")}
            </h2>
            <Link
              to="/history"
              className="text-text-active text-xs sm:text-sm hover:text-text-active/30 flex items-center gap-1 transition-colors"
            >
              {t("viewAll")} <ChevronRight size={16} />
            </Link>
          </div>
          <div className="space-y-2 overflow-y-auto max-h-[400px]">
            {isInterviewHistoryLoading ? (
              <>
                <p className="text-text-muted text-sm">{t("loadingHistory")}</p>
              </>
            ) : (
              <>
                {interviewHistory?.slice(0, 5)?.map((session, i) => (
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
                    index={i}
                  />
                ))}
              </>
            )}
          </div>
        </div>

        {/* Achievements */}
        {/* <div className="bg-[#12121A] border border-gray-800 rounded-2xl p-4 sm:p-6">
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
        </div> */}
      </div>
    </div>
  );
};

export default DashboardPage;
