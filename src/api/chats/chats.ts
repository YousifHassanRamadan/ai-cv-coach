import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import type {
  ChatDetailsResponse,
  ChatsResponse,
  SendMessagePayload,
  SendMessageResponse,
  StartChat,
} from "./chats.types";
import { createChat, getChatById, getChats, sendMessage } from "./chats.api";

export const useCreateChat = () => {
  return useMutation<StartChat, Error>({
    mutationFn: createChat,

    onSuccess: () => {
      toast.success("Chat session created");
    },

    onError: (error) => {
      toast.error(`Failed to create chat: ${error.message}`);
    },
  });
};

export const useChats = (page = 1, limit = 10) => {
  return useQuery<ChatsResponse>({
    queryKey: ["chats", page, limit],
    queryFn: () => getChats(page, limit),
  });
};

export const useChatDetails = (chatId: string) => {
  return useQuery<ChatDetailsResponse>({
    queryKey: ["chat-details", chatId],
    queryFn: () => getChatById(chatId),
    enabled: !!chatId,
  });
};

export const useSendMessage = (chatId: string) => {
  const queryClient = useQueryClient();

  return useMutation<SendMessageResponse, Error, SendMessagePayload>({
    mutationFn: (payload) => sendMessage(chatId, payload),

    onSuccess: (data) => {
      queryClient.setQueryData<ChatDetailsResponse>(
        ["chat-details", chatId],
        (old) => {
          if (!old) return old;

          const updatedMessages = [...old.messages, data.userMessage];

          // ✅ if AI responded, add it
          if (data.aiMessage) {
            updatedMessages.push(data.aiMessage);
          }

          return {
            ...old,
            messages: updatedMessages,
          };
        },
      );
    },
  });
};
