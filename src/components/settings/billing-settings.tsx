import React from "react";
import { Section } from "../section-label";
import { Card, CardContent, CardDescription } from "../ui/card";
import { Plus } from "lucide-react";
import { Modal } from "../modal";
import { SubscriptionForm } from "../forms/settings/subscription-form";
import { onGetSubscriptionPlan } from "@/actions/settings";

export const BillingSettings = async () => {
  const plan = await onGetSubscriptionPlan();
  return (
    <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
      <div className="lg:col-span-1">
        <Section
          label="Billing settings"
          message="Add payment information, upgrade and modify your plan."
        />
      </div>
      <div className="lg:col-span-2 flex justify-start lg:justify-center">
        <Modal
          title="Choose A Plan"
          description="Tell us about yourself! What do you do? Let’s tailor your experience so it best suits you."
          trigger={
            <Card className="border-dashed bg-muted border-gray-400 w-full cursor-pointer h-[270px] flex justify-center items-center">
              <CardContent className="flex gap-2 items-center">
                <div className="rounded-full border-2 p-1">
                  <Plus className="text-gray-400" />
                </div>
                <CardDescription className="font-semibold">
                  Upgrade Plan
                </CardDescription>
              </CardContent>
            </Card>
          }>
          <SubscriptionForm plan={plan!} />
        </Modal>
      </div>
      <div className="lg:col-span-2">
        <h3 className="text-xl font-semibold mb-2">Current Plan</h3>
        <p className="text-sm font-semibold">{plan}</p>
        <p className="text-sm font-light">
          {plan == "PRO"
            ? "Start growing your business today"
            : plan == "ULTIMATE"
            ? "The ultimate growth plan that sets you up for success"
            : "Perfect if you’re just getting started with Corinna AI"}
        </p>
      </div>
    </div>
  );
};
