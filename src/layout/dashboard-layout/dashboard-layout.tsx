import { Outlet } from "react-router-dom";
import { useState, useEffect } from "react";
import Sidebar from "../sidebar/sidebar";
import Header from "../header/header";
import BottomTabs from "../bottom-tabs/bottom-nav";

const DashboardLayout = () => {
  const [collapsed, setCollapsed] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setCollapsed(false);
      } else if (window.innerWidth >= 768) {
        setCollapsed(true);
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const navItems = [
    { path: "/", icon: "🏠", label: "Dashboard" },
    { path: "/resume", icon: "📄", label: "Resume" },
    { path: "/cover-letter", icon: "✉️", label: "Cover Letter" },
    { path: "/interview", icon: "🎥", label: "Interview" },
    { path: "/insights", icon: "📊", label: "Insights" },
    { path: "/profile", icon: "👤", label: "Profile" },
    { path: "/feedback", icon: "💬", label: "Feedback" },
    { path: "/question-bank", icon: "❓", label: "Questions" },
    { path: "/ai-chat", icon: "🤖", label: "AI Chat" },
    { path: "/history", icon: "🕘", label: "History" },
  ];

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar wrapper — clamps width, kills any overflow */}
      <div
        className={`
          hidden md:flex flex-shrink-0 overflow-x-hidden
          transition-all duration-300 ease-in-out
          ${collapsed ? "w-16" : "w-[220px]"}
        `}
      >
        <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} />
      </div>

      {/* Main content */}
      <div className="flex flex-col flex-1 min-w-0 overflow-hidden">
        <div className="flex-shrink-0">
          <Header />
        </div>
        <div className="flex-1 overflow-y-auto pb-16 md:pb-0">
          <Outlet />
        </div>
      </div>

      <BottomTabs navItems={navItems} />
    </div>
  );
};

export default DashboardLayout;
