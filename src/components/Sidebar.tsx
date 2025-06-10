import { NavLink } from "react-router-dom";
import { SidebarNavItem } from "./SidebarNavItem";
import { Home, BarChart, Users } from "lucide-react";
import { useQuery } from "react-query";
import axios from "axios";
import { Button } from "./ui/button";
import { Calendar } from "lucide-react";
import React, { useState, useRef } from "react";
import { format } from "date-fns";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";

const navItems = [
  { to: "/dashboard", label: "Dashboard", icon: Home },
  { to: "/closer-sales", label: "Closer Sales", icon: BarChart },
  { to: "/sdr-sales", label: "SDR Sales", icon: Users },
];

export function Sidebar() {
  return (
    <aside className="bg-[#232533] min-h-screen w-[260px] flex flex-col px-8 py-10">
      <div className="mb-12">
        <div className="text-3xl font-bold text-white leading-tight">
          Welcome back,<br />
          Daniel
        </div>
      </div>
      <nav className="flex flex-col gap-2">
        {navItems.map(({ to, label, icon }) => (
          <NavLink key={to} to={to} end>
            {({ isActive }) => (
              <SidebarNavItem icon={icon} label={label} to={to} isActive={isActive} />
            )}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}

export function useGoogleSheetsData() {
  return useQuery("dashboardData", async () => {
    const { data } = await axios.get("/api/dashboard-metrics");
    // Optionally: transform data here
    return data;
  });
}

interface MetricCardProps {
  icon: React.ReactNode;
  value: string | number;
  label: string;
  delta?: string;
  loading?: boolean;
  error?: boolean;
}

interface DashboardSectionProps {
  title: string;
  children: React.ReactNode;
}

interface MetricGridProps {
  children: React.ReactNode;
}

export function DashboardSection({ title, children }: DashboardSectionProps) {
  return (
    <div className="mb-4">
      <h2 className="text-2xl font-bold mb-2">{title}</h2>
      {children}
    </div>
  );
}

export function MetricGrid({ children }: MetricGridProps) {
  return (
    <div className="grid gap-4">{children}</div>
  );
}

interface DashboardMetrics {
  revenue: number;
  showRate: number;
  // Add other fields as needed
}

function mapSheetRowsToMetrics(rows: any[]): DashboardMetrics {
  // TODO: Implement mapping logic
  return {
    revenue: 0,
    showRate: 0,
    // Add other fields as needed
  };
}

export function DateRangePickerButton() {
  const [open, setOpen] = useState(false);
  const [dateRange, setDateRange] = useState<{ from?: Date; to?: Date }>({});
  const ref = useRef<HTMLDivElement>(null);

  // Format the range for display
  const display =
    dateRange.from && dateRange.to
      ? `${format(dateRange.from, "MMM d")} – ${format(dateRange.to, "MMM d, yyyy")}`
      : "Select date range";

  return (
    <div className="relative" ref={ref}>
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
        <div className="absolute left-0 mt-2 z-50 bg-white border border-gray-200 rounded-lg shadow-lg p-4">
          <DayPicker
            mode="range"
            selected={dateRange}
            onSelect={(selected) => {
              setDateRange(selected || {});
              if (selected?.from && selected?.to) setOpen(false);
            }}
            numberOfMonths={2}
          />
        </div>
      )}
    </div>
  );
} 