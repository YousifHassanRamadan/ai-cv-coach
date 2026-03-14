import { createBrowserRouter } from "react-router-dom";
import "./App.css";
import DashboardLayout from "./layout/dashboard-layout/dashboard-layout";
import DashboardPage from "./pages/dashboard/dashboard";
import SettingsPage from "./pages/settings/settings";
import ProfilePage from "./pages/profile/profile";
import CoverLetterPage from "./pages/cover-letter/cover-letter";
import InsightsPage from "./pages/insights/insights";
import InterviewPage from "./pages/interview/interview";
import ResumePage from "./pages/resume/resume";
import HistoryPage from "./pages/history/history";
import InterviewSession from "./pages/session/session";
import ProcessingScreen from "./pages/processing/processing";
import AuthForm from "./pages/form/form";
import FeedbackPage from "./pages/feedback/feedback";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <DashboardLayout />,
    children: [
      { index: true, element: <DashboardPage /> },
      { path: "cover-letter", element: <CoverLetterPage /> },
      { path: "profile", element: <ProfilePage /> },
      { path: "settings", element: <SettingsPage /> },
      { path: "insights", element: <InsightsPage /> },
      { path: "interview", element: <InterviewPage /> },
      { path: "resume", element: <ResumePage /> },
      { path: "history", element: <HistoryPage /> },
      {
        path: "/feedback",
        element: <FeedbackPage />,
      },
    ],
  },
  {
    path: "/session",
    element: <InterviewSession />,
  },
  {
    path: "/processing",
    element: <ProcessingScreen />,
  },
  {
    path: "/auth",
    element: <AuthForm />,
  },
]);

const App = () => {
  return null;
};

export default App;
