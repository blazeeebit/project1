"use client";
import React from "react";
import { Section } from "../section-label";
import { DarkMode } from "../svg/darkmode";
import { SystemMode } from "../svg/systemmode";
import { LightMode } from "../svg/lightmode";
import { useThemeMode } from "@/hooks/settings/use-settings";
import { cn } from "@/lib/utils";

export const DarkModeToggle = () => {
  const { setTheme, theme } = useThemeMode();
  return (
    <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
      <div className="lg:col-span-1">
        <Section
          label="Interface Theme"
          message="Select or customize your UI theme "
        />
      </div>
      <div className="lg:col-span-4 flex lg:flex-row flex-col items-start gap-5">
        <div
          className={cn(
            "rounded-2xl overflow-hidden cursor-pointer border-4 border-transparent",
            theme == "system" && "border-orange"
          )}
          onClick={() => setTheme("system")}>
          <SystemMode />
        </div>
        <div
          className={cn(
            "rounded-2xl overflow-hidden cursor-pointer border-4 border-transparent",
            theme == "light" && "border-orange"
          )}
          onClick={() => setTheme("light")}>
          <LightMode />
        </div>
        <div
          className={cn(
            "rounded-2xl overflow-hidden cursor-pointer border-4 border-transparent",
            theme == "dark" && "border-orange"
          )}
          onClick={() => setTheme("dark")}>
          <DarkMode />
        </div>
      </div>
    </div>
  );
};
