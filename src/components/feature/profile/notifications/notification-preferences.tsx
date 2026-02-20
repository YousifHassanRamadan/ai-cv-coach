import NotificationItem from "./notification-item";

interface NotificationPreferences {
  emailNotifications: boolean;
  practiceReminders: boolean;
  weeklyInsights: boolean;
  interviewTips: boolean;
}

interface NotificationPreferencesProps {
  notifications: NotificationPreferences;
  onToggle: (key: keyof NotificationPreferences) => void;
}

const NotificationPreferencesSection = ({
  notifications,
  onToggle,
}: NotificationPreferencesProps) => {
  return (
    <div className="bg-[#1a1a24] rounded-xl border border-gray-800 p-6">
      <h3 className="text-lg font-semibold mb-6">Notification Preferences</h3>

      <div className="space-y-0">
        <NotificationItem
          title="Email notifications"
          description="Get updates via email"
          enabled={notifications.emailNotifications}
          onToggle={() => onToggle("emailNotifications")}
        />
        <NotificationItem
          title="Practice reminders"
          description="Daily practice notifications"
          enabled={notifications.practiceReminders}
          onToggle={() => onToggle("practiceReminders")}
        />
        <NotificationItem
          title="Weekly insights"
          description="Performance summary reports"
          enabled={notifications.weeklyInsights}
          onToggle={() => onToggle("weeklyInsights")}
        />
        <NotificationItem
          title="Interview tips"
          description="Helpful tips and articles"
          enabled={notifications.interviewTips}
          onToggle={() => onToggle("interviewTips")}
          showBorder={false}
        />
      </div>
    </div>
  );
};

export default NotificationPreferencesSection;
