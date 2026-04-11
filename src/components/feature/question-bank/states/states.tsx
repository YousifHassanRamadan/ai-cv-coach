export const LoadingState = () => (
  <div className="flex flex-col gap-3">
    {Array.from({ length: 5 }).map((_, i) => (
      <div
        key={i}
        className="rounded-xl border border-[#14141c] bg-[#0e0e15] p-4 animate-pulse"
      >
        <div className="h-4 bg-[#1f1f27] rounded w-3/4 mb-3" />
        <div className="h-3 bg-[#1f1f27] rounded w-1/2 mb-3" />
        <div className="flex gap-2">
          <div className="h-5 bg-[#1f1f27] rounded-full w-16" />
          <div className="h-5 bg-[#1f1f27] rounded-full w-20" />
        </div>
      </div>
    ))}
  </div>
);

export const EmptyState = ({
  message = "No questions found.",
}: {
  message?: string;
}) => (
  <div className="flex flex-col items-center justify-center py-16 text-center">
    <div className="w-12 h-12 rounded-2xl bg-[#211339] flex items-center justify-center mb-4">
      <svg
        className="w-6 h-6 text-[#7c3bed]"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z"
        />
      </svg>
    </div>
    <p className="text-sm text-[#6b7280]">{message}</p>
  </div>
);

export const ErrorState = ({
  message = "Failed to load questions.",
}: {
  message?: string;
}) => (
  <div className="flex flex-col items-center justify-center py-16 text-center">
    <div className="w-12 h-12 rounded-2xl bg-[#ef4444]/10 flex items-center justify-center mb-4">
      <svg
        className="w-6 h-6 text-[#ef4444]"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z"
        />
      </svg>
    </div>
    <p className="text-sm text-[#ef4444]">{message}</p>
  </div>
);
