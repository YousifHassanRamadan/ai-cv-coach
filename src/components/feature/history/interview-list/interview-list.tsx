import React from "react";
import type { InterviewListProps } from "./interview-list.types";
import Sessions from "../../dashboard/sessions/sessions";

const InterviewList: React.FC<InterviewListProps> = ({ interviews }) => {
  if (interviews.length === 0) {
    return (
      <div className="text-center py-12 text-gray-500 text-sm">
        No interviews found.
      </div>
    );
  }

  return (
    <div className="space-y-2 sm:space-y-3">
      {interviews.map((interview, i) => (
        <Sessions
          key={interview.id}
          {...interview}
          index={interviews.length - 1 - i}
        />
      ))}
    </div>
  );
};

export default InterviewList;
