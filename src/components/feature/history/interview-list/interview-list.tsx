import React from "react";
import type { InterviewListProps } from "./interview-list.types";
import InterviewCard from "../interview-card/interview-card";

const InterviewList: React.FC<InterviewListProps> = ({
  interviews,
  onInterviewClick,
}) => {
  if (interviews.length === 0) {
    return (
      <div className="text-center py-12 text-gray-500 text-sm">
        No interviews found.
      </div>
    );
  }

  return (
    <div className="space-y-2 sm:space-y-3">
      {interviews.map((interview) => (
        <InterviewCard
          key={interview.id}
          interview={interview}
          onClick={onInterviewClick}
        />
      ))}
    </div>
  );
};

export default InterviewList;
