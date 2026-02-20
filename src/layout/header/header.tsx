import { Search, Bell } from "lucide-react";
import userImg from "../../assets/user.png";

const Header = () => {
  return (
    <header className="w-full border-b-2 text-border px-6 py-[13px]  bg-bg-header">
      <div className="flex items-center justify-between">
        {/* Search Bar */}
        <div className="relative flex-1 max-w-xl">
          <Search
            className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500"
            size={20}
          />
          <input
            type="text"
            placeholder="Search interviews, insights..."
            className="w-full bg-bg-tertiary text-gray-300 placeholder-gray-500 pl-12 pr-4 py-3 rounded-lg border border-gray-800 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all"
          />
        </div>

        {/* Right Section - Notification & Profile */}
        <div className="flex items-center gap-4 ml-6">
          {/* Notification Bell */}
          <button className="relative p-2 hover:hover:bg-bg-active/35 rounded-lg transition-all">
            <Bell className="text-gray-400" size={20} />
            {/* Notification Badge */}
            <span className="absolute top-1 right-1 w-2 h-2 bg-bg-active rounded-full"></span>
          </button>

          {/* Profile Picture */}
          <button className="w-10 h-10 rounded-full overflow-hidden border-2 border-border-active hover:border-indigo-500 transition-all">
            <img
              src={`${userImg}`}
              alt="Profile"
              className="w-full h-full object-cover"
            />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
