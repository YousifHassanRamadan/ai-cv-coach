import type { Chat } from "../../../../../api/chats";

export interface ChatListItemProps {
  chat: Chat;
  isActive: boolean;
  onClick: () => void;
}
