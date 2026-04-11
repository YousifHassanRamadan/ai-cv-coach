import {
  MenuIcon,
  PlusIcon,
  BotIcon,
  SparklesIcon,
  ZapIcon,
  ShieldIcon,
} from "lucide-react";
import type { EmptyStateProps } from "./empty-state.types";

const SUGGESTIONS = [
  {
    icon: <SparklesIcon size={14} />,
    label: "Summarize a document",
    prompt: "Can you help me summarize a document?",
  },
  {
    icon: <ZapIcon size={14} />,
    label: "Write some code",
    prompt: "Help me write a function in TypeScript.",
  },
  {
    icon: <ShieldIcon size={14} />,
    label: "Answer a question",
    prompt: "I have a question about…",
  },
];

export default function EmptyState({
  onNewChat,
  isCreating,
  onToggleSidebar,
}: EmptyStateProps) {
  return (
    <div className="flex flex-col h-full">
      {/* Header bar */}
      <header className="flex items-center px-4 py-3 border-b border-border bg-bg-header shrink-0">
        <button
          onClick={onToggleSidebar}
          className="p-1.5 rounded-md text-text-muted hover:text-text-primary hover:bg-bg-tertiary transition-colors"
        >
          <MenuIcon size={18} />
        </button>
      </header>

      {/* Center Content */}
      <div className="flex-1 flex flex-col items-center justify-center px-4 py-12">
        {/* Icon */}
        <div className="w-16 h-16 rounded-2xl bg-bg-subcard border border-border flex items-center justify-center mb-6 shadow-lg shadow-black/30">
          <BotIcon size={28} className="text-text-active" />
        </div>

        <h1 className="text-xl font-bold text-text-primary mb-2">
          How can I help you?
        </h1>
        <p className="text-text-secondary text-sm text-center max-w-xs mb-8">
          Start a new chat and I'll assist you with anything — writing, coding,
          analysis, and more.
        </p>

        {/* Suggestion Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 w-full max-w-xl mb-8">
          {SUGGESTIONS.map((s) => (
            <button
              key={s.label}
              onClick={onNewChat}
              disabled={isCreating}
              className="flex flex-col items-start gap-2 p-4 rounded-xl bg-bg-card border border-border hover:border-border-active hover:bg-bg-subcard transition-all text-left group disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <span className="text-text-active group-hover:text-text-active">
                {s.icon}
              </span>
              <span className="text-text-secondary text-xs font-medium">
                {s.label}
              </span>
            </button>
          ))}
        </div>

        <button
          onClick={onNewChat}
          disabled={isCreating}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-bg-active hover:opacity-90 text-white text-sm font-medium transition-all disabled:opacity-60 disabled:cursor-not-allowed"
        >
          <PlusIcon size={16} />
          {isCreating ? "Starting chat…" : "New Chat"}
        </button>
      </div>
    </div>
  );
}
