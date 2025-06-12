"use client";

import React, { useEffect, useRef } from "react";
import { useChat } from "@ai-sdk/react";
import { documentsTable, messagesTable } from "@/db/schema";
import { Input } from "./ui/input";
import { Bot, Loader2, Send, User } from "lucide-react";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";
import { MessageContent } from "./ui/message-content";

const Chat = ({
  document,
}: {
  document: typeof documentsTable.$inferSelect & {
    messages: (typeof messagesTable.$inferSelect)[];
  };
}) => {
  const {
    messages: chatMessages,
    input,
    status,
    handleInputChange,
    handleSubmit,
  } = useChat({
    body: {
      documentId: document.id,
      fileKey: document.fileKey,
    },
    initialMessages: document.messages?.map((msg) => ({
      id: String(msg.id),
      role: msg.role,
      content: msg.content,
    })),
  });
  const isLoading = status === "submitted" || status === "streaming";

  const messageEndRef = useRef<HTMLDivElement | null>(null);

  // Auto-scroll on new messages
  useEffect(() => {
    messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatMessages]);

  console.log({ chatMessages });
  return (
    <div className="basis-1/2 h-[calc(100dvh)] flex flex-col">
      {/* Message list */}
      <div className="flex-1 overflow-auto bg-white">
        <div className="flex flex-col">
          {chatMessages.map((message, index) => (
            <div
              key={index}
              className={cn(
                "p-6 w-full flex items-start gap-x-8",
                message.role === "user" ? "bg-white" : "bg-[#faf9f6]"
              )}
            >
              <div className="w-4">
                {message.role === "user" ? (
                  <User className="rounded-sm p-1" />
                ) : (
                  <Bot className="rounded-sm p-1" />
                )}
              </div>
              <div className="text-sm font-light leading-7 break-words">
                <MessageContent content={message.content} />
              </div>
            </div>
          ))}
        </div>
        <div ref={messageEndRef} />
      </div>

      {/* Chat input */}
      <div className="bg-[#faf9f6]">
        <form
          onSubmit={handleSubmit}
          className="m-4 p-2 flex items-center justify-between rounded-md border-[#e5e3da] border bg-white"
        >
          <Input
            value={input}
            onChange={handleInputChange}
            placeholder="Enter your question"
            className="border-none outline-none focus-visible:ring-0 focus-visible:ring-transparent"
            disabled={isLoading}
          />
          {isLoading ? (
            <Loader2 className="h-5 w-5 text-[#ff612f]/70 animate-spin" />
          ) : (
            <Button type="submit" disabled={!input.trim()}>
              <Send className="w-4 h-4" />
            </Button>
          )}
        </form>
      </div>
    </div>
  );
};

export default Chat;
