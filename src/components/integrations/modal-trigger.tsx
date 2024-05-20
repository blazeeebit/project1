import React from "react";
import { Modal } from "../modal";
import { Card } from "../ui/card";
import { CloudIcon } from "@/icons/cloud-icon";
import { IntegrationModalBody } from "./modal-body";
import { Separator } from "../ui/separator";

type IntegrationTriggerProps = {
  name: "stripe";
  logo: string;
  title: string;
  descrioption: string;
  connections: {
    [key in "stripe"]: boolean;
  };
};

export const IntegrationTrigger = ({
  name,
  logo,
  title,
  descrioption,
  connections,
}: IntegrationTriggerProps) => {
  return (
    <Modal
      title={title}
      type="Integration"
      logo={logo}
      description={descrioption}
      trigger={
        <Card className="px-3 py-2 cursor-pointer flex gap-2">
          <CloudIcon />
          {connections[name] ? "connected" : "connect"}
        </Card>
      }>
      <Separator orientation="horizontal" />
      <IntegrationModalBody connections={connections} type={name} />
    </Modal>
  );
};
