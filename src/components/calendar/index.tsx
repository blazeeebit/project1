import * as React from "react";

import { Calendar } from "@/components/ui/calendar";

type DatePickerProps = {
  date: Date | undefined;
  setDate: React.Dispatch<React.SetStateAction<Date | undefined>>;
};

export const DatePicker = ({ date, setDate }: DatePickerProps) => {
  return (
    <Calendar
      mode="single"
      selected={date}
      onSelect={setDate}
      className="rounded-md border"
    />
  );
};
