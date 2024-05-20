import { onGetPaymentConnected } from "@/actions/settings";
import { IntegrationsList } from "@/components/integrations";
import { NavBar } from "@/components/navbar";
import React from "react";

const IntegrationsPage = async () => {
  const payment = await onGetPaymentConnected();

  //create an object of connections
  const connections = {
    stripe: payment ? true : false,
  };

  return (
    <>
      <NavBar />
      <IntegrationsList connections={connections} />
    </>
  );
};

export default IntegrationsPage;
