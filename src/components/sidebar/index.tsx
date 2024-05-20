"use client";
import { cn } from "@/lib/utils";
import dynamic from "next/dynamic";
import { MinMenu } from "./minimized-menu";
import { useSideBar } from "@/hooks/side-bar/use-sidebar";

const MaxMenu = dynamic(
  () => import("./maximized-menu").then((menu) => menu.MaxMenu),
  { ssr: false }
);

type SideBarProps = {
  domains:
    | {
        id: string;
        name: string;
        icon: string;
      }[]
    | null
    | undefined;
};

export const SideBar = ({ domains }: SideBarProps) => {
  const { expand, onExpand, page, onSignOut } = useSideBar();
  return (
    <div
      className={cn(
        "bg-muted h-full w-[60px] fill-mode-forwards fixed md:relative",
        expand == undefined && "",
        expand == true
          ? "animate-open-sidebar"
          : expand == false && "animate-close-sidebar"
      )}>
      {expand ? (
        <MaxMenu
          domains={domains}
          current={page!}
          onExpand={onExpand}
          onSignOut={onSignOut}
        />
      ) : (
        <MinMenu
          domains={domains}
          onShrink={onExpand}
          current={page!}
          onSignOut={onSignOut}
        />
      )}
    </div>
  );
};
