import React from 'react';
import { BrowserRouter, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import { AuthProvider } from './auth/AuthProvider';
import { ProtectedRoute } from './components/ProtectedRoute';
import { AdminProtectedRoute } from './components/AdminProtectedRoute';
import { Login } from './screens/Login/Login';
import Invite from './screens/Admin/Invite';
import { Dashboard } from './screens/Dashboard/Dashboard';
import { CloserSales } from './screens/CloserSales';
import { SDRSales } from './screens/SDRSales';
import { Sidebar } from './components/Sidebar';

function AppLayout() {
  return (
    <div className="flex bg-[#232533] min-h-screen">
      <Sidebar />
      <main className="flex-1 px-12 py-10 overflow-x-auto">
        <Outlet />
      </main>
    </div>
  );
}

export function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route element={<ProtectedRoute />}>
            <Route element={<AppLayout />}>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/sdr-sales" element={<SDRSales />} />
              <Route path="/closer-sales" element={<CloserSales />} />
              <Route path="*" element={<Navigate to="/dashboard" />} />
            </Route>
            <Route element={<AdminProtectedRoute />}>
              <Route path="/admin/invite" element={<Invite />} />
            </Route>
          </Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
} 