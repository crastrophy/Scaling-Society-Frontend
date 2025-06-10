import React, { useState, useRef } from "react";
import { Button } from "./ui/button";
import { Calendar } from "lucide-react";
import { format } from "date-fns";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";

export function DateRangePickerButton({
  value,
  onChange,
  className = "",
}: {
  value?: { from?: Date; to?: Date };
  onChange?: (range: { from?: Date; to?: Date }) => void;
  className?: string;
}) {
  const [open, setOpen] = useState(false);
  const [range, setRange] = useState<{ from?: Date; to?: Date }>(value || {});
  const ref = useRef<HTMLDivElement>(null);

  // Format the range for display
  const display =
    range.from && range.to
      ? `${format(range.from, "MMM d")} – ${format(range.to, "MMM d, yyyy")}`
      : "Select date range";

  return (
    <div className={`relative ${className}`} ref={ref}>
      <Button
        variant="white"
        size="sm"
        className="flex items-center gap-2"
        onClick={() => setOpen((v) => !v)}
      >
        <Calendar className="w-4 h-4 text-[#BDBDBD] mr-2" />
        {display}
        <span className="text-[#BDBDBD]">⌄</span>
      </Button>
      {open && (
        <div className="absolute left-0 mt-2 z-50 bg-white border border-gray-200 rounded-lg shadow-lg p-4 min-w-[320px]">
          <DayPicker
            mode="range"
            selected={range}
            onSelect={(selected: { from?: Date; to?: Date } | undefined) => {
              setRange(selected || {});
              if (onChange) onChange(selected || {});
              if (selected?.from && selected?.to) setOpen(false);
            }}
            numberOfMonths={1}
            className="!bg-white"
            styles={{
              caption: { color: '#232533', fontWeight: 600 },
              head_cell: { color: '#BDBDBD' },
              cell: { color: '#232533' },
              day_selected: { background: '#2F80ED', color: '#fff' },
              day_range_middle: { background: '#E0E0E0', color: '#232533' },
            }}
          />
        </div>
      )}
    </div>
  );
} 