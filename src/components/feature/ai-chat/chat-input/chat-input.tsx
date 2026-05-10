import { useState, useRef, useEffect } from "react";
import { SendHorizonalIcon, PaperclipIcon } from "lucide-react";
import type { ChatInputProps } from "./chat-input.types";
import { useSendMessage } from "../../../../api/chats";
import { useTranslation } from "react-i18next";

export default function ChatInput({
  chatId,
  isSending = false,
  onSendStart,
}: ChatInputProps) {
  const { t } = useTranslation();

  const [value, setValue] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const { mutate: sendMessage, isPending } = useSendMessage(chatId);

  useEffect(() => {
    const el = textareaRef.current;
    if (!el) return;
    el.style.height = "auto";
    el.style.height = `${Math.min(el.scrollHeight, 160)}px`;
  }, [value]);

  const handleSend = () => {
    const trimmed = value.trim();
    if (!trimmed || isSending) return;
    onSendStart?.(trimmed);
    setValue("");
    sendMessage({ message: trimmed });
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const canSend = value.trim().length > 0 && !isSending;

  return (
    <div className="shrink-0 px-4 py-4 border-t border-border bg-bg-header">
      <div className="max-w-3xl mx-auto">
        <div className="flex items-end gap-2 bg-bg-input border border-border rounded-2xl px-4 py-3 focus-within:border-border-active transition-colors">
          {/* Textarea */}
          <textarea
            ref={textareaRef}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={t("placeholder")}
            rows={1}
            className="flex-1 bg-transparent text-text-primary text-sm placeholder:text-text-muted resize-none outline-none leading-relaxed min-h-[24px] max-h-[160px] overflow-y-auto"
          />

          {/* Send Button */}
          <button
            type="button"
            onClick={handleSend}
            disabled={!canSend}
            className={`shrink-0 w-8 h-8 rounded-xl flex items-center justify-center transition-all mb-0.5 ${
              canSend
                ? "bg-bg-active text-white hover:opacity-85 active:scale-95"
                : "bg-bg-tertiary text-text-muted cursor-not-allowed"
            }`}
          >
            {isSending ? (
              <span className="w-3 h-3 rounded-full border-2 border-current border-t-transparent animate-spin" />
            ) : (
              <SendHorizonalIcon size={15} />
            )}
          </button>
        </div>

        <p className="text-center text-[10px] text-text-muted mt-2">
          {t("chatInput.enterHint.part1")}{" "}
          <kbd className="kbd-style">{t("chatInput.enterHint.enterKey")}</kbd>{" "}
          {t("chatInput.enterHint.part2")}{" "}
          <kbd className="kbd-style">
            {t("chatInput.enterHint.shiftEnterKey")}
          </kbd>{" "}
          {t("chatInput.enterHint.part3")}
        </p>
      </div>
    </div>
  );
}
