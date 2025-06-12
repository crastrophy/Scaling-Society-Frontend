import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../auth/useAuth';

export const AdminProtectedRoute: React.FC = () => {
  const { isApproved, isAdmin, loading } = useAuth();

  if (loading) {
    return <div className="flex items-center justify-center min-h-screen bg-[#21222D] text-white">Loading...</div>;
  }

  if (!isApproved || !isAdmin) {
    return <Navigate to="/dashboard" replace />;
  }

  return <Outlet />;
}; 