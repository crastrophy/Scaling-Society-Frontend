import { useState, useRef } from "react";
import { Button } from "./ui/button";
import { Calendar } from "lucide-react";
import { format } from "date-fns";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import type { DateRange } from "react-day-picker";
import { Diff } from "lucide-react";

export function DateRangePickerButton({
  value,
  onChange,
  className = "",
}: {
  value?: DateRange;
  onChange?: (range: DateRange) => void;
  className?: string;
}) {
  const [open, setOpen] = useState(false);
  const [range, setRange] = useState<DateRange>(value || { from: undefined, to: undefined });
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
          <thead className="bg-[#232533]">
            <tr>
              <th className="px-6 py-3 text-xs font-medium uppercase tracking-wide text-secondaryText text-left">Date</th>
              <th className="text-secondaryText">From</th>
              <th className="text-secondaryText">To</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-800">
            <tr className="even:bg-[#232533] hover:bg-[#232533]/80 transition">
              <td className="px-6 py-4 text-sm text-primaryText">
                {range.from ? format(range.from, "MMM d, yyyy") : "Select date"}
              </td>
              <td className="px-6 py-4 text-sm text-primaryText">
                {range.to ? format(range.to, "MMM d, yyyy") : "Select date"}
              </td>
            </tr>
          </tbody>
          <DayPicker
            mode="range"
            selected={range}
            onSelect={(selected: DateRange | undefined) => {
              setRange(selected || { from: undefined, to: undefined });
              if (onChange) onChange(selected || { from: undefined, to: undefined });
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