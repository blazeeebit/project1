"use client";
import { Loader } from "@/components/loader";
import { SubscriptionCard } from "@/components/settings/subscription-cards";
import { useSubscriptions } from "@/hooks/billings/use-billings";
import React from "react";
import { Button } from "@/components/ui/button";
import { StripeElements } from "@/components/settings/stripe-elements";

type SubscriptionFormProps = {
  plan: "STANDARD" | "PRO" | "ULTIMATE";
};

export const SubscriptionForm = ({ plan }: SubscriptionFormProps) => {
  const { loading, onSetPayment, payment, onUpdatetToFreTier } =
    useSubscriptions(plan);

  return (
    <Loader loading={loading}>
      <div className="flex flex-col gap-5">
        <div className="flex flex-col gap-3">
          <SubscriptionCard
            title="STANDARD"
            description="Perfect if you’re just getting started with Corinna AI"
            price="0"
            payment={payment}
            onPayment={onSetPayment}
            id="STANDARD"
          />

          <SubscriptionCard
            title="PRO"
            description="Perfect if you’re just getting started with Corinna AI"
            price="15"
            payment={payment}
            onPayment={onSetPayment}
            id="PRO"
          />

          <SubscriptionCard
            title="ULTIMATE"
            description="Perfect if you’re just getting started with Corinna AI"
            price="35"
            payment={payment}
            onPayment={onSetPayment}
            id="ULTIMATE"
          />
        </div>
        <StripeElements payment={payment} />
        {payment === "STANDARD" && (
          <Button onClick={onUpdatetToFreTier}>
            <Loader loading={loading}>Confirm</Loader>
          </Button>
        )}
      </div>
    </Loader>
  );
};
