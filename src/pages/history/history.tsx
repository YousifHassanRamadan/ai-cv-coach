import React, { useState, useMemo } from "react";
import PageHeader from "../../components/common/page-header/page-header";
import Button from "../../components/common/button/button";
import {
  PlusIcon,
  CalendarIcon,
  CheckCircleIcon,
  ClockIcon,
  StarIcon,
} from "lucide-react";
import type { ChartDataPoint } from "../../components/feature/history/score-trend-chart";
import type { Interview } from "../../components/feature/history/interview-card";
import StatCard from "../../components/feature/history/state-card/state-card";
import ScoreTrendChart from "../../components/feature/history/score-trend-chart/score-trend-chart";
import SearchFilterBar from "../../components/feature/history/search-filter-bar/search-filter-bar";
import InterviewList from "../../components/feature/history/interview-list/interview-list";

// ─── Static data (could be fetched from an API) ──────────────────────────────

const CHART_DATA: ChartDataPoint[] = [
  { date: "Dec 15", score: 65 },
  { date: "Dec 20", score: 70 },
  { date: "Jan 05", score: 75 },
  { date: "Jan 15", score: 78 },
  { date: "Jan 22", score: 82 },
  { date: "Feb 01", score: 85 },
  { date: "Feb 10", score: 88 },
  { date: "Feb 20", score: 87 },
  { date: "Feb 25", score: 90 },
  { date: "Mar 01", score: 91 },
];

const INTERVIEWS: Interview[] = [
  {
    id: "1",
    role: "Frontend Developer",
    company: "TechCorp",
    difficulty: "Medium",
    date: "1/08/2024",
    duration: "32 min",
    score: 85,
  },
  {
    id: "2",
    role: "Full Stack Engineer",
    company: "StartupXYZ",
    difficulty: "Hard",
    date: "1/07/2024",
    duration: "28 min",
    score: 72,
  },
  {
    id: "3",
    role: "React Developer",
    company: "DigitalCo",
    difficulty: "Medium",
    date: "1/05/2024",
    duration: "30 min",
    score: 88,
  },
  {
    id: "4",
    role: "Senior Frontend",
    company: "EnterpriseCo",
    difficulty: "Expert",
    date: "1/03/2024",
    duration: "35 min",
    score: 91,
  },
  {
    id: "5",
    role: "UI Engineer",
    company: "DesignHub",
    difficulty: "Easy",
    date: "1/02/2024",
    duration: "25 min",
    score: 78,
  },
  {
    id: "6",
    role: "Frontend Developer",
    company: "WebSolutions",
    difficulty: "Medium",
    date: "12/28/2023",
    duration: "27 min",
    score: 82,
  },
];

// ─── Page ─────────────────────────────────────────────────────────────────────

const HistoryPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterBy] = useState("Date");

  const filteredInterviews = useMemo(() => {
    const q = searchTerm.toLowerCase();
    return INTERVIEWS.filter(
      (i) =>
        i.role.toLowerCase().includes(q) || i.company.toLowerCase().includes(q),
    );
  }, [searchTerm]);

  const averageScore = useMemo(() => {
    const total = INTERVIEWS.reduce((sum, i) => sum + i.score, 0);
    return Math.round(total / INTERVIEWS.length);
  }, []);

  const topScore = useMemo(
    () => Math.max(...INTERVIEWS.map((i) => i.score)),
    [],
  );

  return (
    <div className="flex-1 overflow-auto p-4 sm:p-6 bg-[#0A0A0F]">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4 sm:mb-6">
        <PageHeader
          title="Interview History"
          subtitle="Track your progress and review past interviews"
        />
        <Button text="New Interview" icon={<PlusIcon size={15} />} />
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-4 sm:mb-6">
        <StatCard
          icon={
            <CalendarIcon className="w-4 h-4 sm:w-5 sm:h-5 text-purple-400" />
          }
          value={String(INTERVIEWS.length)}
          label="Total Interviews"
        />
        <StatCard
          icon={
            <CheckCircleIcon className="w-4 h-4 sm:w-5 sm:h-5 text-green-400" />
          }
          value={`${averageScore}%`}
          label="Average Score"
        />
        <StatCard
          icon={<ClockIcon className="w-4 h-4 sm:w-5 sm:h-5 text-blue-400" />}
          value="26m"
          label="Avg Duration"
        />
        <StatCard
          icon={<StarIcon className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-400" />}
          value={`${topScore}%`}
          label="Top Score"
        />
      </div>

      {/* Chart */}
      <div className="mb-4 sm:mb-6">
        <ScoreTrendChart data={CHART_DATA} trendLabel="+15% this month" />
      </div>

      {/* Search & Filter */}
      <div className="mb-4">
        <SearchFilterBar
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          filterLabel={filterBy}
        />
      </div>

      {/* Interview List */}
      <InterviewList interviews={filteredInterviews} />
    </div>
  );
};

export default HistoryPage;
