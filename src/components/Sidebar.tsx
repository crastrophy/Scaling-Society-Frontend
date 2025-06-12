import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Users, UserPlus, BarChart3, LogOut } from 'lucide-react';
import { useAuth } from '../auth/useAuth';

export function Sidebar() {
  const { logout, isAdmin } = useAuth();

  const handleLogout = () => {
    logout();
  };

  return (
    <aside className="w-64 bg-[#2A2D3E] text-white flex flex-col p-6">
      <div className="text-2xl font-bold mb-12">SOCIETY</div>
      <nav className="flex flex-col space-y-2">
        <NavLink to="/dashboard" className={({ isActive }) => `flex items-center p-3 rounded-lg transition-colors ${isActive ? 'bg-[#3A3F58]' : 'hover:bg-[#3A3F58]'}`}>
          <LayoutDashboard className="mr-4" />
          Dashboard
        </NavLink>
        <NavLink to="/sdr-sales" className={({ isActive }) => `flex items-center p-3 rounded-lg transition-colors ${isActive ? 'bg-[#3A3F58]' : 'hover:bg-[#3A3F58]'}`}>
          <Users className="mr-4" />
          SDR Sales
        </NavLink>
        <NavLink to="/closer-sales" className={({ isActive }) => `flex items-center p-3 rounded-lg transition-colors ${isActive ? 'bg-[#3A3F58]' : 'hover:bg-[#3A3F58]'}`}>
          <BarChart3 className="mr-4" />
          Closer Sales
        </NavLink>
        {isAdmin && (
          <NavLink to="/admin/invite" className={({ isActive }) => `flex items-center p-3 rounded-lg transition-colors ${isActive ? 'bg-[#3A3F58]' : 'hover:bg-[#3A3F58]'}`}>
            <UserPlus className="mr-4" />
            Invite User
          </NavLink>
        )}
      </nav>
      <div className="mt-auto">
        <button onClick={handleLogout} className="flex items-center p-3 rounded-lg transition-colors hover:bg-[#3A3F58] w-full">
          <LogOut className="mr-4" />
          Logout
        </button>
      </div>
    </aside>
  );
} 