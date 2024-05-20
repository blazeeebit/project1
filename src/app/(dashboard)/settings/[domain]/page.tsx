import { onGetCurrentDomainInfo } from "@/actions/settings";
import { redirect } from "next/navigation";
import React from "react";
import { SettingsForm } from "@/components/forms/settings/form";
import { NavBar } from "@/components/navbar";
import { BotTrainingForm } from "@/components/forms/settings/bot-training";
import { ProductTable } from "@/components/products";

const DomainSettingsPage = async ({
  params,
}: {
  params: { domain: string };
}) => {
  const domain = await onGetCurrentDomainInfo(params.domain);

  if (!domain) redirect("/dashboard");

  return (
    <>
      <NavBar />
      <div className="overflow-y-auto w-full chat-window flex-1 h-0">
        <SettingsForm
          plan={domain.subscription?.plan!}
          chatBot={domain.domains[0].chatBot}
          id={domain.domains[0].id}
          name={domain.domains[0].name}
        />
        <BotTrainingForm id={domain.domains[0].id} />
        <ProductTable id={domain.domains[0].id} />
      </div>
    </>
  );
};

export default DomainSettingsPage;
