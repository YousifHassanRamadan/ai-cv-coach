import { MenuIcon, BotIcon, CircleDotIcon } from "lucide-react";
import type { ChatHeaderProps } from "./chat-header.types";

export default function ChatHeader({
  chatId,
  messageCount,
  onToggleSidebar,
}: ChatHeaderProps) {
  return (
    <header className="flex items-center justify-between px-4 py-3 border-b border-border bg-bg-header shrink-0">
      <div className="flex items-center gap-3">
        <button
          onClick={onToggleSidebar}
          className="p-1.5 rounded-md text-text-muted hover:text-text-primary hover:bg-bg-tertiary transition-colors"
        >
          <MenuIcon size={18} />
        </button>

        <div className="flex items-center gap-2.5">
          <div className="relative">
            <div className="w-8 h-8 rounded-xl bg-bg-active flex items-center justify-center">
              <BotIcon size={16} className="text-white" />
            </div>
            <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-success border-2 border-bg-header" />
          </div>

          <div>
            <p className="text-sm font-semibold text-text-primary leading-tight">
              AI Assistant
            </p>
            <p className="text-[10px] text-success leading-tight flex items-center gap-1">
              <CircleDotIcon size={8} />
              Online · {messageCount} messages
            </p>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-1">
        <span className="text-[10px] text-text-muted bg-bg-subcard px-2 py-1 rounded-md border border-border font-mono">
          #{chatId.slice(0, 8)}
        </span>
      </div>
    </header>
  );
}
