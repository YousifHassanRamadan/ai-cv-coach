import React, { useState, useMemo } from "react";
import PageHeader from "../../components/common/page-header/page-header";
import Button from "../../components/common/button/button";
import { PlusIcon } from "lucide-react";
import SearchFilterBar from "../../components/feature/history/search-filter-bar/search-filter-bar";
import InterviewList from "../../components/feature/history/interview-list/interview-list";
import { useInterviewHistory } from "../../api/interviews";
import { Link } from "react-router-dom";

const HistoryPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterBy] = useState("Date");

  const { data: interviewHistory, isLoading: isInterviewHistoryLoading } =
    useInterviewHistory();

  const filteredInterviews = useMemo(() => {
    if (!interviewHistory) return [];

    return interviewHistory.filter((interview) => {
      const term = searchTerm.toLowerCase();

      return (
        interview.track.name.toLowerCase().includes(term) ||
        interview.status.toLowerCase().includes(term) ||
        interview.difficulty.toLowerCase().includes(term)
      );
    });
  }, [interviewHistory, searchTerm]);

  return (
    <div className="flex-1 h-full p-4 sm:p-6 bg-[#0A0A0F]">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4 sm:mb-6">
        <PageHeader
          title="Interview History"
          subtitle="Track your progress and review past interviews"
        />
        <Link to="/interview">
          <Button text="New Interview" icon={<PlusIcon size={15} />} />
        </Link>
      </div>

      {/* Stats */}
      {/* <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-4 sm:mb-6">
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
      </div> */}

      {/* Chart */}
      {/* <div className="mb-4 sm:mb-6">
        <ScoreTrendChart data={CHART_DATA} trendLabel="+15% this month" />
      </div> */}

      {/* Search & Filter */}
      <div className="mb-4">
        <SearchFilterBar
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          filterLabel={filterBy}
        />
      </div>

      {/* Interview List */}

      {isInterviewHistoryLoading ? (
        <>
          <p> Loading interview history...</p>
        </>
      ) : (
        <>
          <InterviewList interviews={filteredInterviews ?? []} />
        </>
      )}
    </div>
  );
};

export default HistoryPage;
