import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { cn, extractUUIDFromString, getMonthName } from "@/lib/utils";
import Link from "next/link";
import Image from "next/image";

type BubbleProps = {
  message: {
    role: "assistant" | "user";
    content: string;
    link?: string;
  };
  createdAt?: Date;
};

export const Bubble = ({ message, createdAt }: BubbleProps) => {
  console.log(message);
  let d = new Date();
  const image = extractUUIDFromString(message.content);
  return (
    <div
      className={cn(
        "flex gap-2 items-end",
        message.role == "assistant" ? "self-start" : "self-end flex-row-reverse"
      )}>
      <Avatar className="w-5 h-5">
        <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
      <div
        className={cn(
          "flex flex-col gap-3 min-w-[200px] max-w-[300px] p-4 rounded-t-md",
          message.role == "assistant"
            ? "bg-muted rounded-r-md"
            : "bg-grandis da rounded-l-md"
        )}>
        {createdAt ? (
          <div className="flex gap-2 text-xs text-gray-600">
            <p>
              {createdAt.getDate()} {getMonthName(createdAt.getMonth())}
            </p>
            <p>
              {createdAt.getHours()}:{createdAt.getMinutes()}
              {createdAt.getHours() > 12 ? "PM" : "AM"}
            </p>
          </div>
        ) : (
          <p className="text-xs">
            {`${d.getHours()}:${d.getMinutes()} ${
              d.getHours() > 12 ? "pm" : "am"
            }`}
          </p>
        )}
        {image ? (
          <div className="relative aspect-square">
            <Image src={`https://ucarecdn.com/${image[0]}/`} fill alt="image" />
          </div>
        ) : (
          <p className="text-sm">
            {message.content.replace("(complete)", " ")}
            {message.link && (
              <Link
                className="underline font-bold pl-2"
                href={message.link}
                target="_blank">
                Your Link
              </Link>
            )}
          </p>
        )}
      </div>
    </div>
  );
};
