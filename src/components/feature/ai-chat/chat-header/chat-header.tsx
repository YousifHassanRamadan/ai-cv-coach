import { MenuIcon, BotIcon, CircleDotIcon } from "lucide-react";
import type { ChatHeaderProps } from "./chat-header.types";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

export default function ChatHeader({
  chatId,
  messageCount,
  onToggleSidebar,
}: ChatHeaderProps) {
  const { t } = useTranslation();
  return (
    <header className="flex items-center justify-between px-4 py-3 border-b border-l-0 border-border-light bg-bg-header shrink-0  border-r-0 h-[61px]">
      <div className="flex items-center gap-3">
        <button
          onClick={onToggleSidebar}
          className="p-1.5 rounded-md text-white hover:text-text-primary hover:bg-bg-tertiary transition-colors"
        >
          <MenuIcon size={18} className="text-white hover:text-text-primary" />
        </button>

        <div className="flex items-center gap-2.5">
          <div className="relative">
            <div className="w-8 h-8 rounded-xl bg-bg-subcard flex items-center justify-center">
              <BotIcon size={16} className="text-text-primary" />
            </div>
            <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-success border-2 border-bg-header" />
          </div>

          <div>
            <p className="text-sm font-semibold text-text-primary leading-tight">
              {t("chat.header.title")}
            </p>
            <p className="text-[10px] text-success leading-tight flex items-center gap-1">
              <CircleDotIcon size={8} />
              {t("chat.header.status")} ·{" "}
              {t("chat.header.messages", { count: messageCount })}
            </p>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-1">
        <Link
          to="/"
          className="px-4 py-1 text-xs bg-bg-subcard text-text-primary rounded-lg hover:bg-bg-active/15 transition"
        >
          {t("chat.header.goHome")}
        </Link>
        <span className="text-[10px] text-text-muted bg-bg-subcard px-2 py-1 rounded-md border border-border font-mono">
          #{chatId.slice(0, 8)}
        </span>
      </div>
    </header>
  );
}
