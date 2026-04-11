import type { SendMessagePayload } from "../../../../api/chats";

export interface ChatInputProps {
  chatId: string;
  onSend?: (chatId: string, message: string) => void;
  isSending?: boolean;
}
