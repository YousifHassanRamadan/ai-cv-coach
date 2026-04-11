import type { ChatMessageItem } from "../../../../api/chats";

export interface MessageBubbleProps {
  message: ChatMessageItem;
  isFirst: boolean;
  isLast: boolean;
}
