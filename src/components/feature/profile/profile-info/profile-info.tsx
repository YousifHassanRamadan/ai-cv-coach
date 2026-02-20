import { Mail, MapPin } from "lucide-react";
import type { ProfileInfoProps } from "./profile-info.types";

const ProfileInfo = ({ name, role, email, location }: ProfileInfoProps) => {
  return (
    <div className="min-w-0">
      <h2 className="text-lg sm:text-xl font-semibold flex items-center gap-2 flex-wrap">
        <span className="truncate">{name}</span>
        <span className="bg-purple-600 text-white text-xs px-2 py-0.5 rounded font-medium shrink-0">
          Pro
        </span>
      </h2>
      <p className="text-gray-400 text-sm mt-1 truncate">{role}</p>
      <div className="flex flex-col sm:flex-row sm:items-center gap-1.5 sm:gap-4 mt-3 text-sm text-gray-400">
        <span className="flex items-center gap-1.5 truncate">
          <Mail className="w-4 h-4 shrink-0" />
          <span className="truncate">{email}</span>
        </span>
        <span className="flex items-center gap-1.5 truncate">
          <MapPin className="w-4 h-4 shrink-0" />
          <span className="truncate">{location}</span>
        </span>
      </div>
    </div>
  );
};

export default ProfileInfo;
