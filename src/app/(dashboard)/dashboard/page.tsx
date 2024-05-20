import { getUserAppointments } from "@/actions/appointment";
import {
  getUserClients,
  getUserPlanInfo,
  getUserTotalProductPrices,
} from "@/actions/dashboard";
import { getUserBalance, getUserTransactions } from "@/actions/stripe";
import { DashboardCard } from "@/components/dashboard/cards";
import { PlanUsage } from "@/components/dashboard/plan-usage";
import { NavBar } from "@/components/navbar";
import { Separator } from "@/components/ui/separator";
import { DollarIcon } from "@/icons/dollar-icon";
import { MessageIcon } from "@/icons/message-icon";
import { ProfileIcon } from "@/icons/profile-icon";
import { TransactionsIcon } from "@/icons/transactions-icon";
import React from "react";

const DashboardPage = async () => {
  const clients = await getUserClients();
  const sales = await getUserBalance();
  const bookings = await getUserAppointments();
  const plan = await getUserPlanInfo();
  const transactions = await getUserTransactions();
  const products = await getUserTotalProductPrices();

  return (
    <>
      <NavBar />
      <div className="overflow-y-auto w-full chat-window flex-1 h-0">
        <div className="flex gap-5 flex-wrap">
          <DashboardCard
            value={clients || 0}
            title="Potential Clients"
            icon={<ProfileIcon />}
          />
          <DashboardCard
            value={products! * clients! || 0}
            sales
            title="Pipline Value"
            icon={<DollarIcon />}
          />
          <DashboardCard
            value={bookings || 0}
            title="Appointments"
            icon={<MessageIcon />}
          />
          <DashboardCard
            value={sales || 0}
            sales
            title="Total Sales"
            icon={<DollarIcon />}
          />
        </div>
        <div className="w-full grid grid-cols-1 lg:grid-cols-2 py-10">
          <div>
            <div>
              <h2 className="font-bold text-2xl">Plan Usage</h2>
              <p className="text-sm font-light">
                A detailed overview of your metrics, usage, customers and more
              </p>
            </div>
            <PlanUsage
              plan={plan?.plan!}
              credits={plan?.credits || 0}
              domains={plan?.domains || 0}
              clients={clients || 0}
            />
          </div>
          <div className="flex flex-col">
            <div className="w-full flex justify-between items-start mb-5">
              <div className="flex gap-3 items-center">
                <TransactionsIcon />
                <p className="font-bold">Recent Transactions</p>
              </div>
              <p className="text-sm">See more</p>
            </div>
            <Separator orientation="horizontal" />
            {transactions &&
              transactions.data.map((transaction) => (
                <div
                  className="flex gap-3 w-full justify-between items-center border-b-2 py-5"
                  key={transaction.id}>
                  <p className="font-bold">
                    {transaction.calculated_statement_descriptor}
                  </p>
                  <p className="font-bold text-xl">
                    ${transaction.amount / 100}
                  </p>
                </div>
              ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default DashboardPage;
