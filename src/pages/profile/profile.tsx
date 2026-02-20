import React, { useState } from "react";
import ProfileCard from "../../components/feature/profile/profile-card/profile-card";
import PersonalInfoSection from "../../components/feature/profile/personal-info/personal-info-section";
import NotificationPreferencesSection from "../../components/feature/profile/notifications/notification-preferences";
import PageHeader from "../../components/common/page-header/page-header";
import type { NotificationPreferences, ProfileData } from "./profile.type";

const ProfilePage: React.FC = () => {
  const [profile, setProfile] = useState<ProfileData>({
    fullName: "John Doe",
    email: "john.doe@example.com",
    phone: "+1 (555) 123-4567",
    location: "San Francisco, CA",
    currentRole: "Frontend Developer",
    interviews: 12,
    avgScore: 82,
    dayStreak: 5,
    badges: 8,
  });

  const [notifications, setNotifications] = useState<NotificationPreferences>({
    emailNotifications: true,
    practiceReminders: true,
    weeklyInsights: false,
    interviewTips: true,
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProfile((prev) => ({ ...prev, [name]: value }));
  };

  const toggleNotification = (key: keyof NotificationPreferences) => {
    setNotifications((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white p-8">
      <div className="max-w-5xl mx-auto">
        <PageHeader
          title="Profile"
          subtitle="Manage your profile information and preferences"
        />

        <ProfileCard
          fullName={profile.fullName}
          email={profile.email}
          location={profile.location}
          currentRole={profile.currentRole}
          interviews={profile.interviews}
          avgScore={profile.avgScore}
          dayStreak={profile.dayStreak}
          badges={profile.badges}
        />

        <PersonalInfoSection
          profile={{
            fullName: profile.fullName,
            email: profile.email,
            phone: profile.phone,
            location: profile.location,
            currentRole: profile.currentRole,
          }}
          onInputChange={handleInputChange}
        />

        <NotificationPreferencesSection
          notifications={notifications}
          onToggle={toggleNotification}
        />
      </div>
    </div>
  );
};

export default ProfilePage;
