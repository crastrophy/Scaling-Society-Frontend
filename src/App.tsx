import { BrowserRouter, Routes, Route, Navigate, Outlet } from "react-router-dom";
import { Dashboard } from "./screens/Dashboard/Dashboard";
import SDRSales from "./screens/SDRSales";
import CloserSales from "./screens/CloserSales";
import { Sidebar } from "./components/Sidebar";

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
      <Routes>
        <Route element={<AppLayout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/sdr-sales" element={<SDRSales />} />
          <Route path="/closer-sales" element={<CloserSales />} />
          <Route path="*" element={<Navigate to="/dashboard" />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
} 