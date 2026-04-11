import { useState, useRef, useEffect } from "react";
import type { ChatWindowProps } from "./chat-window.types";
import { useChatDetails, useSendMessage } from "../../../../api/chats";
import ChatHeader from "../chat-header/chat-header";
import MessageBubble from "../message-bubble/message-bubble";
import ChatInput from "../chat-input/chat-input";
import MessagesSkeleton from "../messages-skeleton/messages-skeleton";

export default function ChatWindow({
  chatId,
  onToggleSidebar,
}: ChatWindowProps) {
  const { data: chat, isLoading } = useChatDetails(chatId);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chat?.messages]);

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
          ) : chat?.messages.length === 0 ? (
            <EmptyMessages />
          ) : (
            chat?.messages.map((msg, idx) => (
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
            ))
          )}
          <div ref={bottomRef} />
        </div>
      </div>

      <ChatInput chatId={chatId} />
    </div>
  );
}

function EmptyMessages() {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center">
      <div className="w-12 h-12 rounded-2xl bg-bg-subcard border border-border flex items-center justify-center mb-4">
        <span className="text-2xl">💬</span>
      </div>
      <p className="text-text-secondary text-sm font-medium">
        Start the conversation
      </p>
      <p className="text-text-muted text-xs mt-1">
        Type a message below to begin
      </p>
    </div>
  );
}
