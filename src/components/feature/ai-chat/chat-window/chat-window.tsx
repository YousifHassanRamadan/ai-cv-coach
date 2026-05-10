import { useState, useRef, useEffect } from "react";
import type { ChatWindowProps } from "./chat-window.types";
import { useChatDetails, useSendMessage } from "../../../../api/chats";
import ChatHeader from "../chat-header/chat-header";
import MessageBubble from "../message-bubble/message-bubble";
import ChatInput from "../chat-input/chat-input";
import MessagesSkeleton from "../messages-skeleton/messages-skeleton";
import { useTranslation } from "react-i18next";

export default function ChatWindow({
  chatId,
  onToggleSidebar,
}: ChatWindowProps) {
  const { t } = useTranslation();

  const { data: chat, isLoading } = useChatDetails(chatId);
  const bottomRef = useRef<HTMLDivElement>(null);

  const [pendingMessage, setPendingMessage] = useState<string | null>(null);

  const scrollToBottom = () => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (!chat?.messages) return;

    scrollToBottom(); // لما الرد ييجي
    setPendingMessage(null); // شيل الـ pending
  }, [chat?.messages]);

  console.log("chat?.messages", chat?.messages);

  return (
    <div className="flex flex-col h-full">
      <ChatHeader
        chatId={chatId}
        messageCount={chat?.messages.length ?? 0}
        onToggleSidebar={onToggleSidebar}
      />

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-3xl mx-auto px-4 py-6 space-y-1">
          {isLoading ? (
            <MessagesSkeleton />
          ) : chat?.messages.length === 0 && !pendingMessage ? (
            <EmptyMessages />
          ) : (
            <>
              {chat?.messages.map((msg, idx) => (
                <MessageBubble
                  key={msg.id}
                  message={msg}
                  isFirst={
                    idx === 0 || chat.messages[idx - 1]?.sender !== msg.sender
                  }
                  isLast={
                    idx === chat.messages.length - 1 ||
                    chat.messages[idx + 1]?.sender !== msg.sender
                  }
                />
              ))}

              {/* 🟢 رسالة اليوزر المؤقتة */}
              {pendingMessage && (
                <MessageBubble
                  key="pending-user"
                  message={{
                    id: "pending-user",
                    sender: "user",
                    message: { en: pendingMessage, ar: "" },
                    createdAt: new Date().toISOString(),
                  }}
                  isFirst
                  isLast
                />
              )}

              {/* 🤖 AI typing */}
              {pendingMessage && (
                <MessageBubble
                  key="pending-ai"
                  message={{
                    id: "pending-ai",
                    sender: "assistant",
                    message: { en: "...", ar: "" },
                    createdAt: new Date().toISOString(),
                  }}
                  isFirst
                  isLast
                  isTyping
                />
              )}
            </>
          )}
          <div ref={bottomRef} />
        </div>
      </div>

      <ChatInput
        chatId={chatId}
        onSendStart={(msg) => {
          setPendingMessage(msg);
          requestAnimationFrame(() => {
            scrollToBottom();
          });
        }}
      />
    </div>
  );
}

function EmptyMessages() {
  const { t } = useTranslation();
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center">
      <div className="w-12 h-12 rounded-2xl bg-bg-subcard border border-border flex items-center justify-center mb-4">
        <span className="text-2xl">💬</span>
      </div>
      <p className="text-text-secondary text-sm font-medium">
        {t("chat.empty.title")}
      </p>
      <p className="text-text-muted text-xs mt-1">{t("chat.empty.subtitle")}</p>
    </div>
  );
}
