import { NavLink } from "react-router-dom";
import { SidebarNavItem } from "./SidebarNavItem";
import { Home, BarChart, Users } from "lucide-react";
import { useQuery } from "react-query";
import axios from "axios";

const navItems = [
  { to: "/dashboard", label: "Dashboard", icon: Home },
  { to: "/closer-sales", label: "Closer Sales", icon: BarChart },
  { to: "/sdr-sales", label: "SDR Sales", icon: Users },
];

export function Sidebar() {
  return (
    <aside className="bg-[#232533] min-h-screen w-[260px] flex flex-col px-8 py-10">
      <div className="mb-12">
        <div className="text-3xl font-bold text-white leading-tight">Welcome back,</div>
        <div className="text-3xl font-bold text-white mt-2">Daniel</div>
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

function mapSheetRowsToMetrics(rows: any[]): DashboardMetrics {
  // Transform rows into { revenue, showRate, ... }
  return { ... };
} 