"use client";

import React from "react";
import { Section } from "../../section-label";
import { UploadButton } from "../../upload-button";
import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";
import { BotIcon } from "@/icons/bot-icon";
import Image from "next/image";

type EditChatbotIconProps = {
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors<FieldValues>;
  chatBot: {
    id: string;
    icon: string | null;
    welcomeMessage: string | null;
  } | null;
};

export const EditChatbotIcon = ({
  register,
  errors,
  chatBot,
}: EditChatbotIconProps) => {
  return (
    <div className="py-5 flex flex-col gap-5 items-start">
      <Section
        label="Chatbot icon"
        message="Change the icon for the chatbot."
      />
      <UploadButton label="Edit Image" register={register} errors={errors} />
      {chatBot?.icon ? (
        <div className="rounded-full overflow-hidden">
          <Image
            src={`https://ucarecdn.com/${chatBot.icon}/`}
            alt="bot"
            width={80}
            height={80}
          />
        </div>
      ) : (
        <div className="rounded-full cursor-pointer shadow-md w-20 h-20 flex items-center justify-center bg-grandis">
          <BotIcon />
        </div>
      )}
    </div>
  );
};
