import { BotIcon, UserIcon } from "lucide-react";
import type { MessageBubbleProps } from "./message-bubble.types";

/** Safely extract displayable text from string | {en, ar} */
function getMessage(message: string | { en: string; ar: string }): string {
  if (typeof message === "string") return message;
  return message.en;
}

export default function MessageBubble({
  message,
  isFirst,
  isLast,
  isTyping = false,
}: MessageBubbleProps) {
  const isAssistant = message.sender === "assistant";
  const formattedTime = new Date(message.createdAt).toLocaleTimeString(
    "en-US",
    {
      hour: "2-digit",
      minute: "2-digit",
    },
  );

  return (
    <div
      className={`flex gap-3 w-full ${isAssistant ? "justify-start" : "justify-end"} ${isFirst ? "mt-4" : "mt-0.5"}`}
    >
      {/* Avatar — assistant only, first message in group */}
      {isAssistant && (
        <div className="flex flex-col items-center gap-1 shrink-0">
          {isFirst ? (
            <div className="w-7 h-7 rounded-xl bg-bg-active flex items-center justify-center mt-1">
              <BotIcon size={14} className="text-white" />
            </div>
          ) : (
            <div className="w-7" />
          )}
        </div>
      )}

      {/* Bubble */}
      <div
        className={`max-w-[75%] sm:max-w-[65%] ${!isAssistant ? "flex flex-col items-end" : ""}`}
      >
        {isFirst && (
          <p className="text-[10px] font-medium mb-1 px-1 text-text-muted">
            {isAssistant ? "Assistant" : "You"}
          </p>
        )}

        <div
          className={`px-4 py-2.5 text-sm leading-relaxed break-words ${
            isAssistant
              ? `bg-bg-subcard text-text-primary border border-border ${isFirst ? "rounded-2xl rounded-tl-sm" : "rounded-2xl"} ${!isLast ? "rounded-bl-sm" : ""}`
              : `bg-bg-active text-white ${isFirst ? "rounded-2xl rounded-tr-sm" : "rounded-2xl"} ${!isLast ? "rounded-br-sm" : ""}`
          }`}
        >
          {isTyping ? (
            <span className="flex gap-1 items-center py-1">
              <span className="w-1.5 h-1.5 bg-current rounded-full animate-bounce" />
              <span className="w-1.5 h-1.5 bg-current rounded-full animate-bounce [animation-delay:.15s]" />
              <span className="w-1.5 h-1.5 bg-current rounded-full animate-bounce [animation-delay:.3s]" />
            </span>
          ) : (
            getMessage(message.message)
          )}
        </div>

        {isLast && (
          <p className="text-[10px] text-text-muted mt-1 px-1">
            {formattedTime}
          </p>
        )}
      </div>

      {/* Avatar — user only */}
      {!isAssistant && (
        <div className="flex flex-col items-center shrink-0">
          {isFirst ? (
            <div className="w-7 h-7 rounded-xl bg-bg-tertiary border border-border flex items-center justify-center mt-1">
              <UserIcon size={13} className="text-text-secondary" />
            </div>
          ) : (
            <div className="w-7" />
          )}
        </div>
      )}
    </div>
  );
}
