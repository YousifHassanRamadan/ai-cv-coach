import {
  MenuIcon,
  PlusIcon,
  BotIcon,
  SparklesIcon,
  ZapIcon,
  ShieldIcon,
} from "lucide-react";
import type { EmptyStateProps } from "./empty-state.types";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

export default function EmptyState({
  onNewChat,
  isCreating,
  onToggleSidebar,
}: EmptyStateProps) {
  const { t } = useTranslation();

  const SUGGESTIONS = [
    {
      icon: <SparklesIcon size={14} />,
      label: t("emptyState2.suggestions.summarize.label"),
      prompt: t("emptyState2.suggestions.summarize.prompt"),
    },
    {
      icon: <ZapIcon size={14} />,
      label: t("emptyState2.suggestions.code.label"),
      prompt: t("emptyState2.suggestions.code.prompt"),
    },
    {
      icon: <ShieldIcon size={14} />,
      label: t("emptyState2.suggestions.question.label"),
      prompt: t("emptyState2.suggestions.question.prompt"),
    },
  ];

  return (
    <div className="flex flex-col h-full ">
      {/* Header bar */}
      <header className="flex justify-between items-center gap-2 px-4 py-3 border-b border-border bg-bg-header shrink-0  h-[61px]">
        <button
          onClick={onToggleSidebar}
          className="p-1.5 rounded-md text-text-primary  hover:text-text-primary hover:bg-bg-tertiary transition-colors"
        >
          <MenuIcon size={18} />
        </button>
        <Link
          to="/"
          className="px-4 py-2 bg-bg-subcard text-text-primary rounded-lg hover:bg-bg-active/15 transition"
        >
          {t("emptyState2.header.goHome")}
        </Link>
      </header>

      {/* Center Content */}
      <div className="flex-1 flex flex-col items-center justify-center px-4 py-12">
        {/* Icon */}
        <div className="w-16 h-16 rounded-2xl bg-bg-subcard border border-border flex items-center justify-center mb-6 shadow-lg shadow-black/30">
          <BotIcon size={28} className="text-text-active" />
        </div>

        <h1 className="text-xl font-bold text-text-primary mb-2">
          {t("emptyState2.title")}
        </h1>
        <p className="text-text-secondary text-sm text-center max-w-xs mb-8">
          {t("emptyState2.description")}
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
          {isCreating
            ? t("emptyState2.buttons.starting")
            : t("emptyState2.buttons.newChat")}
        </button>
      </div>
    </div>
  );
}
