import { Clock, Video, CheckCircle2, Circle } from "lucide-react";
import React from "react";
import type { TSessionItem } from "./sessions.types";

const formatDate = (iso: string) => {
  const d = new Date(iso);
  return d.toLocaleDateString([], { month: "short", day: "numeric" });
};

const getDurationMinutes = (start: string, end: string) => {
  const diff = new Date(end).getTime() - new Date(start).getTime();
  return Math.round(diff / 60000);
};

const getScoreColor = (score: number) => {
  if (score >= 80) return "text-emerald-400";
  if (score >= 60) return "text-yellow-400";
  return "text-red-400";
};

const difficultyStyles: Record<string, string> = {
  easy: "text-emerald-400 bg-emerald-400/10 border-emerald-400/20",
  medium: "text-amber-400 bg-amber-400/10 border-amber-400/20",
  hard: "text-red-400 bg-red-400/10 border-red-400/20",
  custom: "text-indigo-400 bg-indigo-400/10 border-indigo-400/20",
};

const Sessions: React.FC<TSessionItem> = ({
  difficulty,
  endedAt,
  questionCount,
  startedAt,
  status,
  totalScore,
  track,
}) => {
  const score = totalScore !== null ? Math.round(totalScore * 100) : 0;
  const scoreColor = getScoreColor(score ?? 0);
  const duration = getDurationMinutes(
    startedAt,
    endedAt ?? new Date().toISOString(),
  );
  const isCompleted = status?.toLowerCase() === "completed";
  const diffStyle = difficultyStyles[difficulty] ?? difficultyStyles.custom;

  return (
    <div className="flex items-center justify-between group bg-bg-subcard hover:bg-bg-active/20 rounded-xl px-4 py-3.5 transition-colors cursor-pointer">
      {/* Left */}
      <div className="flex items-center gap-3">
        <div className="w-9 h-9 bg-gradient-to-br from-bg-active/10 to-bg-primary/10 border border-border-light rounded-lg flex items-center justify-center shrink-0">
          <Video size={15} className="text-text-active" />
        </div>
        <div>
          <p className="font-medium text-sm text-text-primary group-hover:text-text-active leading-tight">
            {track.name}
          </p>
          <div className="flex items-center gap-1.5 mt-0.5">
            <span
              className={`text-[10px] font-medium px-1.5 py-0.5 rounded border capitalize ${diffStyle}`}
            >
              {difficulty}
            </span>
            <span className="text-text-muted text-[10px]">
              {questionCount} questions
            </span>
          </div>
        </div>
      </div>

      {/* Right */}
      <div className="flex items-center gap-4">
        {/* Status */}
        <div className="hidden sm:flex items-center gap-1 text-xs">
          <Circle size={12} className="text-gray-600" />
          <span className={isCompleted ? "text-emerald-400" : "text-gray-500"}>
            {status}
          </span>
        </div>

        {/* Duration */}

        {endedAt && (
          <div className="hidden sm:flex items-center gap-1 text-[11px] text-gray-600">
            <Clock size={11} />
            {duration}m
          </div>
        )}

        {/* Score + Date */}
        <div className="text-right">
          <p className={`font-bold text-base leading-tight ${scoreColor}`}>
            {score !== null ? `${score}%` : "—"}
          </p>
          <p className="text-gray-600 text-[10px]">{formatDate(startedAt)}</p>
        </div>
      </div>
    </div>
  );
};

export default Sessions;
