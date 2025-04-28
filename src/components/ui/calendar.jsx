"use client";

import * as React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { cn } from "@/lib/utils";

function Calendar({
  className,
  selected,
  onSelect,
  showOutsideDays = true,
  ...props
}) {
  return (
    <DatePicker
      selected={selected}
      onChange={onSelect}
      inline
      className={cn("p-3", className)}
      calendarClassName="react-datepicker"
      wrapperClassName={cn("w-full", className)}
      showOutsideDays={showOutsideDays}
      fixedHeight
      {...props}
    />
  );
}

export { Calendar };
