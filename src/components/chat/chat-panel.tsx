import { useRef, useState, type FormEvent, type KeyboardEvent } from "react";
import { Bot, LoaderCircle, Send, TriangleAlert, User } from "lucide-react";
import { sendChatMessage } from "@/lib/chat";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

type ChatMessage = { role: "user" | "assistant"; text: string };
export function ChatPanel() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const listRef = useRef<HTMLDivElement>(null);

  const scrollToEnd = () => {
    requestAnimationFrame(() => {
      listRef.current?.scrollTo({ top: listRef.current.scrollHeight });
    });
  };

  const send = async () => {
    const prompt = input.trim();
    if (!prompt || loading) return;
    setError("");
    setInput("");
    setMessages((prev) => [...prev, { role: "user", text: prompt }]);
    setLoading(true);
    scrollToEnd();

    const result = await sendChatMessage(prompt);
    setLoading(false);
    if (result.ok) {
      setMessages((prev) => [...prev, { role: "assistant", text: result.reply }]);
      scrollToEnd();
    } else {
      setError(result.message);
    }
  };

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    void send();
  };

  const onKeyDown = (event: KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      void send();
    }
  };

  return (
    <section aria-label="AI assistant" className="rounded-lg border border-border bg-card shadow-sm">
      <div className="border-b border-border p-5 sm:p-6">
        <h2 className="font-display text-lg font-semibold">Ask Veldepu AI</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Ask about our services, process, or your project idea.
        </p>
      </div>

      <div
        ref={listRef}
        className="flex max-h-96 min-h-48 flex-col gap-4 overflow-y-auto p-5 sm:p-6"
        aria-live="polite"
      >
        {messages.length === 0 && !loading && (
          <div className="flex flex-1 flex-col items-center justify-center py-8 text-center">
            <Bot className="size-8 text-primary" />
            <p className="mt-4 max-w-sm text-sm leading-6 text-muted-foreground">
              No messages yet. Type a question below to start the conversation.
            </p>
          </div>
        )}

        {messages.map((message, index) => (
          <div
            key={index}
            className={`flex items-start gap-3 ${message.role === "user" ? "flex-row-reverse" : ""}`}
          >
            <span
              className={`flex size-8 shrink-0 items-center justify-center rounded-full border border-border ${message.role === "user" ? "bg-primary text-primary-foreground" : "bg-accent text-primary"}`}
              aria-hidden="true"
            >
              {message.role === "user" ? <User className="size-4" /> : <Bot className="size-4" />}
            </span>
            <p
              className={`max-w-[80%] whitespace-pre-wrap rounded-lg px-4 py-3 text-sm leading-6 ${message.role === "user" ? "bg-primary text-primary-foreground" : "border border-border bg-background"}`}
            >
              {message.text}
            </p>
          </div>
        ))}

        {loading && (
          <div className="flex items-center gap-3">
            <span className="flex size-8 shrink-0 items-center justify-center rounded-full border border-border bg-accent text-primary" aria-hidden="true">
              <Bot className="size-4" />
            </span>
            <p className="flex items-center gap-2 rounded-lg border border-border bg-background px-4 py-3 text-sm text-muted-foreground">
              <LoaderCircle className="size-4 animate-spin" aria-hidden="true" />
              Thinking…
            </p>
          </div>
        )}
      </div>

      {error && (
        <p role="alert" className="mx-5 mb-4 flex items-start gap-2 rounded-md border border-destructive/40 bg-destructive/5 p-3 text-xs font-medium text-destructive sm:mx-6">
          <TriangleAlert className="size-4 shrink-0" />
          {error}
        </p>
      )}

      <form onSubmit={onSubmit} className="flex items-end gap-3 border-t border-border p-5 sm:p-6">
        <div className="flex-1">
          <label htmlFor="chat-input" className="sr-only">Your message</label>
          <Textarea
            id="chat-input"
            value={input}
            onChange={(event) => setInput(event.target.value)}
            onKeyDown={onKeyDown}
            placeholder="Type your message…"
            maxLength={2000}
            className="min-h-11 resize-none"
            disabled={loading}
          />
        </div>
        <Button type="submit" disabled={loading || !input.trim()} aria-label="Send message">
          {loading ? <LoaderCircle className="animate-spin" /> : <Send />}
          <span className="hidden sm:inline">Send</span>
        </Button>
      </form>
    </section>
  );
}
