import { api } from "../../utils/axios";
import type {
  ChatDetailsResponse,
  ChatsResponse,
  SendMessagePayload,
  SendMessageResponse,
  StartChat,
} from "./chats.types";

export const createChat = async (): Promise<StartChat> => {
  const sessionId = localStorage.getItem("session-id");

  const res = await api.post<StartChat>("/chats", {
    sessionId: sessionId || undefined,
  });

  return res.data;
};

export const getChats = async (
  page = 1,
  limit = 10,
): Promise<ChatsResponse> => {
  const res = await api.get<ChatsResponse>("/chats", {
    params: { page, limit },
  });

  return res.data;
};

export const getChatById = async (
  chatId: string,
): Promise<ChatDetailsResponse> => {
  const res = await api.get<ChatDetailsResponse>(`/chats/${chatId}`);
  return res.data;
};

export const sendMessage = async (
  chatId: string,
  payload: SendMessagePayload,
): Promise<SendMessageResponse> => {
  const res = await api.post<SendMessageResponse>(
    `/chats/${chatId}/messages`,
    payload,
  );

  return res.data;
};
