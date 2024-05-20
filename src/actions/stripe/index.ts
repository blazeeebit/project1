"use server";

import { client } from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET!, {
  typescript: true,
  apiVersion: "2024-04-10",
});

const setPlanAmount = (item: "STANDARD" | "PRO" | "ULTIMATE") => {
  if (item == "PRO") {
    return 1500;
  }
  if (item == "ULTIMATE") {
    return 3500;
  }
  return 0;
};

export const onGetStripeClientSecret = async (
  item: "STANDARD" | "PRO" | "ULTIMATE"
) => {
  try {
    const amount = setPlanAmount(item);
    const paymentIntent = await stripe.paymentIntents.create({
      currency: "usd",
      amount: amount,
      automatic_payment_methods: {
        enabled: true,
      },
    });

    if (paymentIntent) {
      return { secret: paymentIntent.client_secret };
    }
  } catch (error) {
    console.log(error);
  }
};

export const onCreateCustomerPaymentIntentSecret = async (
  amount: number,
  stripeId: string
) => {
  try {
    const paymentIntent = await stripe.paymentIntents.create(
      {
        currency: "usd",
        amount: amount * 100,
        automatic_payment_methods: {
          enabled: true,
        },
      },
      { stripeAccount: stripeId }
    );

    if (paymentIntent) {
      return { secret: paymentIntent.client_secret };
    }
  } catch (error) {
    console.log(error);
  }
};

export const onUpdateSubscription = async (
  plan: "STANDARD" | "PRO" | "ULTIMATE"
) => {
  try {
    const user = await currentUser();
    if (!user) return;
    const update = await client.user.update({
      where: {
        clerkId: user.id,
      },
      data: {
        subscription: {
          update: {
            data: {
              plan,
              credits: plan == "PRO" ? 50 : plan == "ULTIMATE" ? 500 : 10,
            },
          },
        },
      },
      select: {
        subscription: {
          select: {
            plan: true,
          },
        },
      },
    });

    if (update) {
      return {
        status: 200,
        message: "subscription updated",
        plan: update.subscription?.plan,
      };
    }
  } catch (error) {
    console.log(error);
  }
};

export const getUserBalance = async () => {
  try {
    const user = await currentUser();
    if (user) {
      const connectedStripe = await client.user.findUnique({
        where: {
          clerkId: user.id,
        },
        select: {
          stripeId: true,
        },
      });

      if (connectedStripe) {
        const transactions = await stripe.balance.retrieve({
          stripeAccount: connectedStripe.stripeId!,
        });

        if (transactions) {
          const sales = transactions.pending.reduce((total, next) => {
            return total + next.amount;
          }, 0);

          return sales / 100;
        }
      }
    }
  } catch (error) {
    console.log(error);
  }
};

export const getUserTransactions = async () => {
  try {
    const user = await currentUser();
    if (user) {
      const connectedStripe = await client.user.findUnique({
        where: {
          clerkId: user.id,
        },
        select: {
          stripeId: true,
        },
      });

      if (connectedStripe) {
        const transactions = await stripe.charges.list({
          stripeAccount: connectedStripe.stripeId!,
        });
        if (transactions) {
          return transactions;
        }
      }
    }
  } catch (error) {
    console.log(error);
  }
};
