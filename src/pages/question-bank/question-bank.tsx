import { useState, useMemo } from "react";
import {
  useQuestion,
  useQuestions,
  useTrackQuestions,
  type QuestionDifficulty,
  type QuestionTrack,
} from "../../api/questions";
import { FilterBar } from "../../components/feature/question-bank/filter-bar/filter-bar";
import {
  EmptyState,
  ErrorState,
  LoadingState,
} from "../../components/feature/question-bank/states";
import { QuestionCard } from "../../components/feature/question-bank/question-card";
import { Pagination } from "../../components/feature/question-bank/pagination";
import { QuestionDetailPanel } from "../../components/feature/question-bank/question-detail-panel";
import { useTranslation } from "react-i18next";

export const QuestionsBankPage = () => {
  const { t } = useTranslation();

  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [difficulty, setDifficulty] = useState<QuestionDifficulty | "all">(
    "all",
  );
  const [selectedTrack, setSelectedTrack] = useState<string | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  // Always fetch base questions to build the track list + support pagination
  const {
    data,
    isLoading: baseLoading,
    isError: baseError,
  } = useQuestions(page, 10);

  // Only active when a track slug is selected
  const {
    data: trackData,
    isLoading: trackLoading,
    isError: trackError,
  } = useTrackQuestions(selectedTrack ?? "");

  const { data: detail, isLoading: detailLoading } = useQuestion(
    selectedId ?? "",
  );

  const isLoading = selectedTrack ? trackLoading : baseLoading;
  const isError = selectedTrack ? trackError : baseError;

  // Derive unique tracks from the base question list for the dropdown
  const tracks = useMemo<QuestionTrack[]>(() => {
    if (!data?.questions) return [];
    const seen = new Map<string, QuestionTrack>();
    data.questions.forEach((q) => {
      if (!seen.has(q.trackId)) {
        seen.set(q.trackId, {
          id: q.trackId,
          name: q.trackId,
          slug: q.trackId,
        });
      }
    });
    return Array.from(seen.values());
  }, [data?.questions]);

  // Use track endpoint results when filtered, otherwise use paginated base results
  const sourceQuestions = selectedTrack
    ? (trackData?.questions ?? [])
    : (data?.questions ?? []);

  const filtered = useMemo(() => {
    return sourceQuestions.filter((q) => {
      const matchesDiff = difficulty === "all" || q.difficulty === difficulty;
      const matchesSearch =
        !search ||
        q.text.toLowerCase().includes(search.toLowerCase()) ||
        q.category.toLowerCase().includes(search.toLowerCase()) ||
        q.keywords.some((k) => k.toLowerCase().includes(search.toLowerCase()));
      return matchesDiff && matchesSearch;
    });
  }, [sourceQuestions, difficulty, search]);

  const handleTrackChange = (slug: string | null) => {
    setSelectedTrack(slug);
    setPage(1);
    setSelectedId(null);
  };

  const totalCount = selectedTrack
    ? (trackData?.questions.length ?? 0)
    : (data?.total ?? 0);

  return (
    <div className="min-h-screen font-sans bg-bg-primary">
      {/* Body */}
      <div className="max-w-7xl mx-auto px-4 lg:px-6 py-4 lg:py-6 flex flex-col lg:flex-row gap-4 lg:gap-6 lg:h-[calc(100vh-3.5rem)]">
        {/* Left: list */}
        <div className="flex flex-col gap-4 w-full lg:max-w-xl lg:flex-shrink-0">
          <FilterBar
            search={search}
            difficulty={difficulty}
            selectedTrack={selectedTrack}
            onSearchChange={(v) => {
              setSearch(v);
              setPage(1);
            }}
            onDifficultyChange={(v) => {
              setDifficulty(v);
              setPage(1);
            }}
            onTrackChange={handleTrackChange}
          />

          <div className="flex-1 overflow-y-auto flex flex-col gap-3 pr-1 max-h-[60vh] lg:max-h-none">
            {isLoading && <LoadingState />}
            {isError && <ErrorState />}
            {!isLoading && !isError && filtered.length === 0 && (
              <EmptyState
                message={
                  search
                    ? t("questions2.empty.search")
                    : selectedTrack
                      ? t("questions2.empty.track")
                      : t("questions2.empty.default")
                }
              />
            )}
            {filtered.map((q) => (
              <QuestionCard
                key={q.id}
                question={q}
                onClick={setSelectedId}
                isSelected={selectedId === q.id}
              />
            ))}
          </div>

          {/* Pagination hidden in track view — track endpoint returns all at once */}
          {!selectedTrack && data && (
            <Pagination
              page={page}
              total={data.total}
              limit={data.limit}
              onPageChange={setPage}
            />
          )}
        </div>

        {/* Right: detail */}
        <div className="flex-1 rounded-2xl bg-bg-subcard border border-border-light p-5 min-h-[400px] lg:overflow-hidden">
          {!selectedId && (
            <div className="flex flex-col items-center justify-center h-full text-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-bg-card border border-border-light flex items-center justify-center">
                <svg
                  className="w-7 h-7 text-text-primary"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5"
                  />
                </svg>
              </div>
              <div>
                <p className="text-sm font-medium text-text-muted">
                  {t("questions2.detail.selectTitle")}
                </p>
                <p className="text-xs text-text-muted mt-1">
                  {t("questions2.detail.selectSubtitle")}
                </p>
              </div>
            </div>
          )}

          {selectedId && detailLoading && (
            <div className="flex flex-col gap-4 animate-pulse">
              <div className="h-24 rounded-xl bg-bg-subcard" />
              <div className="h-16 rounded-xl bg-bg-subcard" />
              <div className="h-20 rounded-xl bg-bg-subcard" />
            </div>
          )}

          {selectedId && detail && !detailLoading && (
            <QuestionDetailPanel question={detail} />
          )}
        </div>
      </div>
    </div>
  );
};
