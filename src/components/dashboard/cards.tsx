import React from "react";

type DashboardCardProps = {
  title: string;
  value: number;
  icon: JSX.Element;
  sales?: boolean;
};

export const DashboardCard = ({
  title,
  value,
  icon,
  sales,
}: DashboardCardProps) => {
  return (
    <div className="bg-muted rounded-lg flex flex-col gap-3 pr-10 pl-10 py-10 md:pl-10 md:pr-20">
      <div className="flex gap-3">
        {icon}
        <h2 className="font-bold text-xl">{title}</h2>
      </div>
      <p className="font-bold text-4xl">
        {sales && "$"}
        {value}
      </p>
    </div>
  );
};
