import { MessageSquareIcon } from "lucide-react";
import type { ChatListItemProps } from "./chat-list-item.types";
import { useTranslation } from "react-i18next";

function getMessage(message: string | { en: string; ar: string }): string {
  if (typeof message === "string") return message;
  return message.en || message.ar || "";
}

export default function ChatListItem({
  chat,
  isActive,
  onClick,
}: ChatListItemProps) {
  const { t } = useTranslation();

  const lastMessage = chat.messages?.[chat.messages.length - 1];
  const preview = lastMessage?.message
    ? getMessage(lastMessage.message) // ✅ was: lastMessage?.message (raw object)
    : t("chat.list.emptyMessages");

  const formattedDate = new Date(chat.createdAt).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });

  return (
    <button
      onClick={onClick}
      className={`w-full text-left px-3 py-2.5 rounded-lg group transition-colors ${
        isActive
          ? "bg-sidebar-active text-white"
          : "text-text-secondary hover:bg-sidebar-hover hover:text-text-primary"
      }`}
    >
      <div className="flex items-start gap-2.5">
        <MessageSquareIcon
          size={14}
          className={`mt-0.5 shrink-0 ${isActive ? "text-white" : "text-text-muted group-hover:text-text-secondary"}`}
        />
        <div className="min-w-0 flex-1">
          <div className="flex items-center justify-between gap-2">
            {t("chat.list.title", {
              id: chat.id.slice(0, 6),
            })}
            <span
              className={`text-[10px] shrink-0 ${isActive ? "text-white/60" : "text-text-muted"}`}
            >
              {formattedDate}
            </span>
          </div>
          <p className="text-[11px] truncate mt-0.5 opacity-70">{preview}</p>
        </div>
      </div>
    </button>
  );
}
