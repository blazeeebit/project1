"use client";
import { useChatBot } from "@/hooks/chatbot/use-chatbot";
import React from "react";
import { BotIcon } from "@/icons/bot-icon";
import { BotWindow } from "./window";
import Image from "next/image";
import { cn } from "@/lib/utils";

export const AiChatBot = () => {
  const {
    onOpenChatBot,
    botOpened,
    onChats,
    register,
    onStartChatting,
    onAiTyping,
    messageWindowRef,
    currentBot,
    loading,
    onRealTime,
    setOnChats,
  } = useChatBot();
  return (
    <div className="h-screen flex flex-col justify-end items-end gap-4">
      {botOpened && (
        <BotWindow
          setChat={setOnChats}
          realtimeMode={onRealTime}
          helpdesk={currentBot?.helpdesk!}
          domainName={currentBot?.name!}
          ref={messageWindowRef}
          chats={onChats}
          register={register}
          onChat={onStartChatting}
          onResponding={onAiTyping}
        />
      )}
      <div
        className={cn(
          "rounded-full relative cursor-pointer shadow-md w-20 h-20 flex items-center justify-center bg-grandis",
          loading ? "invisible" : "visible"
        )}
        onClick={onOpenChatBot}>
        {currentBot?.chatBot?.icon ? (
          <Image
            src={`https://ucarecdn.com/${currentBot.chatBot.icon}/`}
            alt="bot"
            fill
          />
        ) : (
          <BotIcon />
        )}
      </div>
    </div>
  );
};
