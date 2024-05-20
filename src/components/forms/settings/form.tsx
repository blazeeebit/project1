"use client";
import { Loader } from "@/components/loader";
import { Button } from "@/components/ui/button";
import { Crown } from "lucide-react";
import React from "react";
import { CodeSnippet } from "./code-snippet";
import { DomainUpdate } from "./domain-update";
import { EditChatbotIcon } from "./edit-chatbot-icon";
import { Separator } from "@/components/ui/separator";
import { useSettings } from "@/hooks/settings/use-settings";
import Image from "next/image";
import dynamic from "next/dynamic";

const WelcomeMessage = dynamic(
  () => import("./greetings-message").then((props) => props.GreetingsMessage),
  {
    ssr: false,
  }
);

const BotTrainingForm = dynamic(
  () => import("./bot-training").then((props) => props.BotTrainingForm),
  { ssr: false }
);

type SettingsFormProviderProps = {
  id: string;
  name: string;
  plan: "STANDARD" | "PRO" | "ULTIMATE";
  chatBot: {
    id: string;
    icon: string | null;
    welcomeMessage: string | null;
  } | null;
};

export const SettingsForm = ({
  id,
  name,
  chatBot,
  plan,
}: SettingsFormProviderProps) => {
  const {
    register,
    onUpdateSettings,
    errors,
    onDeleteDomain,
    deleting,
    loading,
  } = useSettings(id);

  return (
    <form className="flex flex-col gap-8 pb-10" onSubmit={onUpdateSettings}>
      <div className="flex flex-col gap-3">
        <h2 className="font-bold text-2xl">Domain Settings</h2>
        <Separator orientation="horizontal" />
        <DomainUpdate name={name} register={register} errors={errors} />
        <CodeSnippet id={id} />
      </div>
      {plan == "PRO" || plan == "ULTIMATE" ? (
        <div className="flex flex-col gap-3 mt-5">
          <div className="flex gap-4 items-center">
            <h2 className="font-bold text-2xl">Chatbot Settings</h2>
            <div className="flex gap-1 bg-muted rounded-full px-3 py-1 text-xs items-center font-bold">
              <Crown className="text-orange" size={14} />
              Premium
            </div>
          </div>
          <Separator orientation="horizontal" />
          <div className="grid grid-cols-2">
            <div className="col-span-1 flex flex-col gap-5">
              <EditChatbotIcon
                chatBot={chatBot}
                register={register}
                errors={errors}
              />
              <WelcomeMessage
                message={chatBot?.welcomeMessage!}
                register={register}
                errors={errors}
              />
            </div>
            <div className="col-span-1 relative">
              <Image
                src="/images/bot-ui.png"
                className="sticky top-0"
                alt="bot-ui"
                width={530}
                height={769}
              />
            </div>
          </div>
        </div>
      ) : (
        <></>
      )}
      <div className="flex gap-5 justify-end">
        <Button
          onClick={onDeleteDomain}
          variant="destructive"
          type="button"
          className="px-10 h-[50px]">
          <Loader loading={deleting}>Delete Domain</Loader>
        </Button>
        <Button type="submit" className="w-[100px] h-[50px]">
          <Loader loading={loading}>Save</Loader>
        </Button>
      </div>
    </form>
  );
};
