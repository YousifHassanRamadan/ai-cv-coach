import { useState, useEffect } from "react";
import ChatSidebar from "../../components/feature/ai-chat/chat-sidebar/chat-sidebar";
import { useCreateChat, useSendMessage } from "../../api/chats";
import ChatWindow from "../../components/feature/ai-chat/chat-window/chat-window";
import EmptyState from "../../components/feature/ai-chat/empty-state/empty-state";

export default function ChatPage() {
  const [activeChatId, setActiveChatId] = useState<string | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const { mutate: createChat, isPending: isCreating, data } = useCreateChat();

  const handleNewChat = () => {
    createChat(undefined, {
      onSuccess: (data) => {
        setActiveChatId(data.id);
      },
    });
  };

  return (
    <div className="flex h-screen bg-bg-primary text-text-primary overflow-hidden font-sans">
      {/* Sidebar */}
      <ChatSidebar
        activeChatId={activeChatId}
        onSelectChat={setActiveChatId}
        onNewChat={handleNewChat}
        isCreating={isCreating}
        isOpen={sidebarOpen}
        onToggle={() => setSidebarOpen((p) => !p)}
      />

      {/* Main Area */}
      <main className="flex-1 flex flex-col overflow-hidden">
        {activeChatId ? (
          <ChatWindow
            chatId={activeChatId}
            onToggleSidebar={() => setSidebarOpen((p) => !p)}
          />
        ) : (
          <EmptyState
            onNewChat={handleNewChat}
            isCreating={isCreating}
            onToggleSidebar={() => setSidebarOpen((p) => !p)}
          />
        )}
      </main>
    </div>
  );
}
