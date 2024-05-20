import React, { forwardRef } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import Image from "next/image";
import { Separator } from "../ui/separator";
import { Input } from "../ui/input";
import { Bubble } from "./bubble";
import { AttachmentIcon } from "@/icons/attachment-icon";
import { Send } from "lucide-react";
import { Button } from "../ui/button";
import { UseFormRegister } from "react-hook-form";
import { ChatBotMessageProps } from "@/schemas/conversation.schema";
import { Responding } from "./responding";
import { TabsMenu } from "../tabs";
import { BOT_TABS_MENU } from "@/constants/menu";
import { TabsContent } from "../ui/tabs";
import { Accordion } from "../accordion";
import { CardDescription, CardTitle } from "../ui/card";
import { RealTimeMode } from "./real-time";
import { Label } from "../ui/label";

type BotWindowProps = {
  register: UseFormRegister<ChatBotMessageProps>;
  chats: { role: "assistant" | "user"; content: string; link?: string }[];
  onChat(): void;
  onResponding: boolean;
  domainName: string;
  realtimeMode:
    | {
        chatroom: string;
        mode: boolean;
      }
    | undefined;
  helpdesk: {
    id: string;
    question: string;
    answer: string;
    domainId: string | null;
  }[];
  setChat: React.Dispatch<
    React.SetStateAction<
      {
        role: "user" | "assistant";
        content: string;
        link?: string | undefined;
      }[]
    >
  >;
};

export const BotWindow = forwardRef<HTMLDivElement, BotWindowProps>(
  (
    {
      register,
      chats,
      onChat,
      onResponding,
      domainName,
      helpdesk,
      realtimeMode,
      setChat,
    },
    ref
  ) => {
    return (
      <div className="h-[670px] w-[450px] flex flex-col bg-white rounded-xl mr-[80px] border-[1px] overflow-hidden">
        <div className="flex justify-between px-4 pt-4">
          <div className="flex gap-2">
            <Avatar className="w-20 h-20">
              <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <div className="flex items-start flex-col">
              <h3 className="text-lg font-bold leading-none">
                Sales Rep - Damian A
              </h3>
              <p className="text-sm">{domainName.split(".com")[0]}</p>
              {realtimeMode?.mode && (
                <RealTimeMode
                  setChats={setChat}
                  chatRoomId={realtimeMode.chatroom}
                />
              )}
            </div>
          </div>
          <div className="relative w-16 h-16">
            <Image
              src="/images/prop-user.png"
              fill
              alt="users"
              objectFit="contain"
            />
          </div>
        </div>
        <TabsMenu triggers={BOT_TABS_MENU} className="w-full">
          <TabsContent value="chat">
            <Separator orientation="horizontal" />
            <div className="flex flex-col h-full">
              <div
                className="px-3 flex h-[400px] flex-col py-5 gap-3 chat-window overflow-y-auto"
                ref={ref}>
                {chats.map((chat, key) => (
                  <Bubble key={key} message={chat} />
                ))}
                {onResponding && <Responding />}
              </div>
              <form
                onSubmit={onChat}
                className="flex px-3 py-1 flex-col flex-1 bg-porcelain">
                <div className="flex justify-between">
                  <Input
                    {...register("content")}
                    placeholder="Type your message..."
                    className="focus-visible:ring-0 flex-1 p-0 focus-visible:ring-offset-0 bg-porcelain rounded-none outline-none border-none"
                  />
                  <Button type="submit" className="mt-3">
                    <Send />
                  </Button>
                </div>
                <Label htmlFor="bot-image">
                  <AttachmentIcon />
                  <Input
                    type="file"
                    id="bot-image"
                    {...register("image")}
                    className="hidden"
                  />
                </Label>
              </form>
            </div>
          </TabsContent>
          <TabsContent value="helpdesk">
            <div className="h-[485px] overflow-y-auto overflow-x-hidden p-4 flex flex-col">
              <div>
                <CardTitle>Help Desk</CardTitle>
                <CardDescription>
                  Browse from a list of questions people usually ask.
                </CardDescription>
              </div>
              {helpdesk.map((desk) => (
                <Accordion
                  key={desk.id}
                  trigger={desk.question}
                  content={desk.answer}
                />
              ))}
            </div>
          </TabsContent>
        </TabsMenu>
        <div className="flex justify-center py-2">
          <p className="text-gray-400 text-sm">Powered By Corinna</p>
        </div>
      </div>
    );
  }
);

BotWindow.displayName = "BotWindow";
