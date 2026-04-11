import { AlertTriangle } from "lucide-react";
import type { ErrorStateProps } from "./error-state.types";

const ErrorState = ({ onRetry }: ErrorStateProps) => (
  <div className="min-h-full bg-[#0a0a0f] text-white flex items-center justify-center p-8">
    <div className="text-center max-w-sm">
      <div className="w-16 h-16 bg-orange-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
        <AlertTriangle className="w-8 h-8 text-orange-500" />
      </div>
      <h2 className="text-lg font-semibold mb-2">Failed to Load Results</h2>
      <p className="text-gray-400 text-sm mb-6">
        Something went wrong while fetching your interview results. Please try
        again.
      </p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="px-5 py-2 bg-purple-600 hover:bg-purple-700 text-white text-sm rounded-lg transition"
        >
          Retry
        </button>
      )}
    </div>
  </div>
);

export default ErrorState;
