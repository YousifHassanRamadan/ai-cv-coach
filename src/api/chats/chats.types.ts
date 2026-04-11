export interface CreateChatPayload {
  sessionId?: string;
}

export interface StartChat {
  id: string;
  sessionId: string | null;
  createdAt: string;
}

export type ChatSender = "assistant" | "user";

export interface ChatMessage {
  sender: ChatSender;
  message: string;
  createdAt: string;
}

export interface Chat {
  id: string;
  sessionId: string | null;
  createdAt: string;
  messages: ChatMessage[];
}

export interface ChatsResponse {
  chats: Chat[];
  total: number;
  page: number;
  limit: number;
}

export interface ChatMessageItem {
  id: string;
  sender: ChatSender;
  message: string;
  createdAt: string;
}

export interface ChatDetailsResponse {
  id: string;
  sessionId: string | null;
  createdAt: string;
  messages: ChatMessageItem[];
}

export interface SendMessagePayload {
  message: string;
}

// ✅ Success (AI responded)
export interface SendMessageSuccessResponse {
  userMessage: ChatMessageItem;
  aiMessage: ChatMessageItem;
}

// ✅ AI unavailable (503)
export interface SendMessageFailResponse {
  userMessage: ChatMessageItem;
  aiMessage: null;
  message: string;
  message_ar: string;
}
// ✅ Union type
export type SendMessageResponse =
  | SendMessageSuccessResponse
  | SendMessageFailResponse;
