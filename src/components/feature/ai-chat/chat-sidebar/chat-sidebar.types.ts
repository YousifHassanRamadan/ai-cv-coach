export interface ChatSidebarProps {
  activeChatId: string | null;
  onSelectChat: (id: string) => void;
  onNewChat: () => void;
  isCreating: boolean;
  isOpen: boolean;
  onToggle: () => void;
}
