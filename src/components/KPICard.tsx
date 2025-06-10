import React from 'react';
import { LucideIcon } from 'lucide-react';

interface KPICardProps {
  icon: React.ReactNode;
  value: string | number;
  label: string;
  change?: string;
  changeColor?: string;
}

export const KPICard: React.FC<KPICardProps> = ({ icon, value, label, change, changeColor }) => (
  <div className="bg-[#171821] rounded-lg shadow-sm p-6 flex items-center gap-4">
    <div className="p-2 rounded-lg bg-[#232533] flex items-center justify-center">
      {icon}
    </div>
    <div className="flex-1">
      <div className="text-2xl font-bold text-[#F3F4F6]">{value}</div>
      <div className="text-sm text-[#BDBDBD]">{label}</div>
      {change && (
        <div className={`text-xs font-medium mt-1 ${changeColor || 'text-[#22C55E]'}`}>{change}</div>
      )}
    </div>
  </div>
); 