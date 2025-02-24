import { PortalBanner } from "@/components/portal/banner";
import React from "react";

const PortalLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-col h-screen">
      <PortalBanner />
      <div className="container flex justify-center flex-1 h-0">{children}</div>
    </div>
  );
};

export default PortalLayout;
