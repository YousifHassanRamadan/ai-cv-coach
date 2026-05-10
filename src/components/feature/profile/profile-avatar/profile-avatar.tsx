import { useTranslation } from "react-i18next";

const ProfileAvatar = () => {
  const { t } = useTranslation();
  return (
    <div className="relative">
      <div className="w-24 h-24 rounded-full overflow-hidden bg-gray-700">
        <img
          src="https://api.dicebear.com/7.x/avataaars/svg?seed=John"
          alt="Profile"
          className="w-full h-full object-cover"
        />
      </div>
      <div className="absolute -bottom-1 -right-1 bg-bg-active text-white text-xs px-2 py-0.5 rounded font-medium">
        {t("profile.badge")}
      </div>
    </div>
  );
};

export default ProfileAvatar;
