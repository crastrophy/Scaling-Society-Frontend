import React from 'react';
import { LucideIcon } from 'lucide-react';

interface SidebarNavItemProps {
  icon: LucideIcon;
  label: string;
  to: string;
  isActive: boolean;
  onClick?: () => void;
}

export const SidebarNavItem: React.FC<SidebarNavItemProps> = ({ icon: Icon, label, to, isActive, onClick }) => (
  <div
    className={`flex items-center px-4 py-3 rounded-lg font-semibold text-lg transition cursor-pointer select-none gap-2
      ${isActive ? 'bg-[#A9DFD8] text-[#232533]' : 'text-white hover:bg-[#35374a]'}`}
    onClick={onClick}
  >
    <Icon className={`w-5 h-5 ${isActive ? 'text-[#232533]' : 'text-[#BDBDBD] group-hover:text-[#F9FAFB]'} mr-2`} />
    <span>{label}</span>
  </div>
); 