import {
  PlusIcon,
  MessageSquareIcon,
  ChevronLeftIcon,
  BotIcon,
} from "lucide-react";
import type { ChatSidebarProps } from "./chat-sidebar.types";
import { useChats } from "../../../../api/chats";
import ChatListItem from "./chat-list-item/chat-list-item";

export default function ChatSidebar({
  activeChatId,
  onSelectChat,
  onNewChat,
  isCreating,
  isOpen,
  onToggle,
}: ChatSidebarProps) {
  const { data, isLoading } = useChats();

  return (
    <>
      {" "}
      <aside
        className={`
fixed top-0 left-0 h-full w-64 z-50
bg-sidebar-bg border-r border-border
transform transition-transform duration-300 ease-in-out
${isOpen ? "translate-x-0" : "-translate-x-full"}
flex flex-col
`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-4 border-b border-border bg-bg-header shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-bg-subcard flex items-center justify-center">
              <BotIcon size={15} className="text-text-primary" />
            </div>
            <span className="text-sm font-semibold tracking-wide text-text-primary">
              AI Assistant
            </span>
          </div>
          <button
            onClick={onToggle}
            className="p-1 rounded-md text-text-primary hover:text-text-primary hover:bg-sidebar-hover transition-colors"
          >
            <ChevronLeftIcon size={16} />
          </button>
        </div>

        {/* New Chat Button */}
        <div className="px-3 pt-3 pb-2 shrink-0">
          <button
            onClick={onNewChat}
            disabled={isCreating}
            className="w-full flex items-center gap-2 px-3 py-2.5 rounded-lg bg-bg-active hover:opacity-90 text-white text-sm font-medium transition-all disabled:opacity-60 disabled:cursor-not-allowed"
          >
            <PlusIcon size={15} />
            {isCreating ? "Starting..." : "New Chat"}
          </button>
        </div>

        {/* Chat List */}
        <div className="flex-1 overflow-y-auto px-2 pb-4 space-y-0.5">
          {isLoading ? (
            <ChatListSkeleton />
          ) : data?.chats.length === 0 ? (
            <p className="text-center text-text-muted text-xs mt-8 px-4">
              No chats yet. Start a new one!
            </p>
          ) : (
            <>
              <p className="text-text-muted text-[10px] uppercase tracking-widest px-2 py-2 font-semibold">
                Recent
              </p>
              {data?.chats.map((chat) => (
                <ChatListItem
                  key={chat.id}
                  chat={chat}
                  isActive={chat.id === activeChatId}
                  onClick={() => onSelectChat(chat.id)}
                />
              ))}
            </>
          )}
        </div>
      </aside>
      {isOpen && (
        <div
          onClick={onToggle}
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40"
        />
      )}
    </>
  );
}

// ─── Skeleton ──────────────────────────────────────────────────────────────
function ChatListSkeleton() {
  return (
    <div className="space-y-1 px-1 mt-2">
      {Array.from({ length: 5 }).map((_, i) => (
        <div
          key={i}
          className="h-12 rounded-lg bg-bg-tertiary animate-pulse"
          style={{ opacity: 1 - i * 0.15 }}
        />
      ))}
    </div>
  );
}
