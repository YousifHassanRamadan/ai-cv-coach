import { useMemo } from "react";
import {
  buildEmotionData,
  calcDuration,
  deriveImprovements,
  deriveStrengths,
  formatDate,
} from "../../utils/insights.utils";
import NoSessionState from "../../components/feature/insights/no-session-state/no-session-state";

import ScoreGrid from "../../components/feature/insights/score-grid/score-grid";
import MetaStats from "../../components/feature/insights/metastats/metastats";
import EmotionTimelineChart from "../../components/feature/insights/emotion-timeline-chart/emotion-timeline-chart";
import StrengthsCard from "../../components/feature/insights/strengths-card/strengths-card";
import ImprovementsCard from "../../components/feature/insights/improvements-card/improvements-card";
import NotableMomentsCard from "../../components/feature/insights/notable-moments-card/notable-moments-card";
import ProgressChart from "../../components/feature/insights/progress-chart/progress-chart";
import LoadingState from "../../components/feature/insights/loading-state/loading-state";
import ErrorState from "../../components/feature/insights/error-state/error-state";
import MatchedSkills from "../../components/feature/insights/matched-skills/matched-skills";
import QuestionsList from "../../components/feature/insights/questions-list/questions-list";
import { useInterviewResults } from "../../api/insights";

// Hook

// ─── helpers ─────────────────────────────────────────────────────────────────

const SESSION_ID_KEY = "session-id"; // must match the key used when saving

const getStoredSessionId = (): string | null => {
  try {
    return localStorage.getItem(SESSION_ID_KEY);
  } catch {
    return null;
  }
};

// ─── page ─────────────────────────────────────────────────────────────────────

const InsightsPage = () => {
  const sessionId = getStoredSessionId();
  const { data, isLoading, isError, refetch } = useInterviewResults();

  console.log("Fetched insights data:", data);

  // ── derived data (memoised so it's not recalculated on every render) ──
  const emotionData = useMemo(
    () => (data ? buildEmotionData(data.chunks) : []),
    [data],
  );

  const strengths = useMemo(
    // FIX: pass data.finalScores which may be null for video interviews.
    // deriveStrengths now accepts null and returns a fallback string safely.
    () => (data ? deriveStrengths(data.finalScores) : []),
    [data],
  );

  const improvements = useMemo(
    // FIX: same — deriveImprovements now accepts null safely.
    () => (data ? deriveImprovements(data.finalScores) : []),
    [data],
  );

  // ── guard states ──
  if (!sessionId) return <NoSessionState />;
  if (isLoading) return <LoadingState />;
  if (isError || !data) return <ErrorState onRetry={refetch} />;

  // ── destructure only what's needed ──
  const {
    finalScores,
    finalQuestions,
    chunks,
    matchedSkills,
    track,
    startedAt,
    endedAt,
    difficulty,
    experienceLevel,
    questionCount,
    mode,
  } = data;

  // FIX: video interviews don't have speech scores — only show MetaStats speech
  // section when at least one speech field is present and non-null.
  const hasSpeechScores =
    finalScores != null &&
    (finalScores.fluency != null ||
      finalScores.energy != null ||
      finalScores.eyeContact != null);

  return (
    <div className="min-h-full bg-bg-primary text-text-primary p-8">
      {/* Header */}
      <header className="mb-8">
        <h1 className="text-2xl font-bold mb-1">Interview Insights</h1>
        <p className="text-text-muted text-sm">
          {track.name} · {formatDate(startedAt)} ·{" "}
          {calcDuration(startedAt, endedAt)}
        </p>
      </header>

      {/* Scores */}
      <ScoreGrid finalScores={finalScores} />

      {/* Meta info — FIX: only render speech-related stats when available */}
      {hasSpeechScores && (
        <MetaStats
          data={{ difficulty, experienceLevel, mode, questionCount }}
        />
      )}

      {/* Matched skills */}
      <MatchedSkills skills={matchedSkills} />

      {/* Emotion chart */}
      {/* <EmotionTimelineChart data={emotionData} /> */}

      {/* Feedback */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <StrengthsCard strengths={strengths} />
        <ImprovementsCard improvements={improvements} />
      </div>

      {/* Notable moments */}
      {/* <NotableMomentsCard chunks={chunks} /> */}

      {/* Questions asked */}
      <QuestionsList questions={finalQuestions} />

      {/* Progress over time */}
      {/* <ProgressChart currentScore={finalScores.overall} /> */}
    </div>
  );
};

export default InsightsPage;
