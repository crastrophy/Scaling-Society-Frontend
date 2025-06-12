import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../auth/useAuth';

export const ProtectedRoute: React.FC = () => {
  const { isApproved, loading } = useAuth();

  if (loading) {
    // You can add a loading spinner here
    return <div className="flex items-center justify-center min-h-screen bg-[#21222D] text-white">Loading...</div>;
  }

  if (!isApproved) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}; 