import React, { useState } from "react";
import ProfileCard from "../../components/feature/profile/profile-card/profile-card";
import PersonalInfoSection from "../../components/feature/profile/personal-info/personal-info-section";
import NotificationPreferencesSection from "../../components/feature/profile/notifications/notification-preferences";
import PageHeader from "../../components/common/page-header/page-header";
import type { NotificationPreferences, ProfileData } from "./profile.type";
import { useMe } from "../../api/profile";

const ProfilePage: React.FC = () => {
  const { data, isLoading, isError } = useMe();

  console.log("User data:", data, "Loading:", isLoading, "Error:", isError);

  const [notifications, setNotifications] = useState<NotificationPreferences>({
    emailNotifications: true,
    practiceReminders: true,
    weeklyInsights: false,
    interviewTips: true,
  });

  const toggleNotification = (key: keyof NotificationPreferences) => {
    setNotifications((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="min-h-screen bg-bg-primary text-white p-8">
      <div className="max-w-5xl mx-auto">
        <PageHeader
          title="Profile"
          subtitle="Manage your profile information and preferences"
        />

        <ProfileCard
          fullName={
            data?.fName && data.lName
              ? `${data.fName} ${data.lName}`
              : "John Doe"
          }
          email={data?.email || "john.doe@example.com"}
          interviews={data?.userStats?.totalInterviews || 0}
          avgScore={data?.userStats?.avgScore || 0}
          totalUploads={data?.userStats?.totalUploads || 0}
          currentRole={data?.role || "user"}
        />

        <PersonalInfoSection
          profile={{
            fName: data?.fName || "",
            lName: data?.lName || "",
            email: data?.email || "",
          }}
        />

        {/* <NotificationPreferencesSection
          notifications={notifications}
          onToggle={toggleNotification}
        /> */}
      </div>
    </div>
  );
};

export default ProfilePage;
