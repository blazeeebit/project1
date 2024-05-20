import { onGetAllCampaigns, onGetAllCustomers } from "@/actions/mailer/mailer";
import { EmailMarketing } from "@/components/marketing";
import { NavBar } from "@/components/navbar";
import { currentUser } from "@clerk/nextjs";
import React from "react";

const EmailMarketingPage = async () => {
  const user = await currentUser();

  if (!user) return null;

  const customers = await onGetAllCustomers(user.id);
  //get all campaigns
  const campaigns = await onGetAllCampaigns(user.id);
  return (
    <>
      <NavBar />
      <EmailMarketing
        campaign={campaigns?.campaign!}
        subscription={customers?.subscription!}
        domains={customers?.domains!}
      />
    </>
  );
};

export default EmailMarketingPage;
