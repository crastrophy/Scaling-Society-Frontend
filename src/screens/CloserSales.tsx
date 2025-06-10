import React, { useState } from 'react';
import { format } from 'date-fns';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, LineChart, Line, Legend } from 'recharts';
import { Calendar } from 'lucide-react';
import { Button } from "../components/ui/button";

const mockCloserData = [
  { name: 'Alex Brown', calls: 35, closes: 10, closeRate: 28.6, revenue: 5000, commission: 500 },
  { name: 'Sam Green', calls: 40, closes: 12, closeRate: 30, revenue: 6000, commission: 600 },
];

const barChartData = [
  { closer: 'Alex', revenue: 5000 },
  { closer: 'Sam', revenue: 6000 },
  { closer: 'Jamie', revenue: 4000 },
  { closer: 'Taylor', revenue: 7000 },
];

const pieChartData = [
  { source: 'Closed', value: 60 },
  { source: 'Lost', value: 25 },
  { source: 'Pending', value: 15 },
];

const PIE_COLORS = ['#22C55E', '#EF4444', '#F2C94C'];

const lineChartData = [
  { date: 'Week 1', closeRate: 30 },
  { date: 'Week 2', closeRate: 35 },
  { date: 'Week 3', closeRate: 32 },
  { date: 'Week 4', closeRate: 38 },
];

export const CloserSales: React.FC = () => {
  const [dateRange, setDateRange] = useState({
    start: format(new Date(), 'yyyy-MM-01'),
    end: format(new Date(), 'yyyy-MM-dd'),
  });

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setDateRange((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="min-h-screen bg-[#232533] px-0 py-4">
      <div className="space-y-10">
        {/* Date Picker */}
        <div className="flex justify-start items-center ml-0 mb-4">
          <Button variant="secondary" size="sm" className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-[#BDBDBD] mr-2" />
            May 1 – May 31, 2025
            <span className="text-[#BDBDBD]">⌄</span>
          </Button>
        </div>

        {/* KPIs Section */}
        <h2 className="text-[#F3F4F6] text-lg font-semibold mb-2">Key Metrics</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockCloserData.map((closer, idx) => (
            <div key={idx} className="bg-[#171821] rounded-lg shadow-sm p-6 flex flex-col gap-2">
              <div className="text-[#F3F4F6] text-lg font-bold">{closer.name}</div>
              <div className="text-[#F3F4F6]">Calls: <span className="font-semibold">{closer.calls}</span></div>
              <div className="text-[#F3F4F6]">Closes: <span className="font-semibold">{closer.closes}</span></div>
              <div className="text-[#F3F4F6]">Close Rate: <span className="font-semibold">{closer.closeRate}%</span></div>
              <div className="text-[#F3F4F6]">Revenue: <span className="font-semibold">${closer.revenue}</span></div>
              <div className="text-green-400 font-semibold">Commission: ${closer.commission}</div>
            </div>
          ))}
        </div>

        {/* Charts Section */}
        <h2 className="text-[#F3F4F6] text-lg font-semibold mb-2">Charts</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Bar Chart Card */}
          <div className="bg-[#171821] rounded-lg shadow-sm p-6 flex flex-col">
            <h3 className="text-[#F3F4F6] font-medium mb-2">Revenue by Closer</h3>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={barChartData}>
                <CartesianGrid stroke="#232533" vertical={false} />
                <XAxis dataKey="closer" stroke="#BDBDBD" tick={{ fill: '#F3F4F6', fontSize: 14 }} axisLine={{ stroke: '#232533' }} />
                <YAxis stroke="#BDBDBD" tick={{ fill: '#F3F4F6', fontSize: 14 }} axisLine={{ stroke: '#232533' }} />
                <Tooltip contentStyle={{ background: '#171821', border: '1px solid #232533', color: '#F3F4F6', fontSize: 14 }} />
                <Bar dataKey="revenue" fill="#2F80ED" radius={[8, 8, 0, 0]} barSize={32} />
              </BarChart>
            </ResponsiveContainer>
          </div>
          {/* Pie Chart Card */}
          <div className="bg-[#171821] rounded-lg shadow-sm p-6 flex flex-col">
            <h3 className="text-[#F3F4F6] font-medium mb-2">Deal Status Breakdown</h3>
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie data={pieChartData} dataKey="value" nameKey="source" cx="50%" cy="50%" outerRadius={70} labelLine={false}>
                  {pieChartData.map((entry, i) => (
                    <Cell key={`cell-${i}`} fill={PIE_COLORS[i % PIE_COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ background: '#171821', border: '1px solid #232533', color: '#F3F4F6', fontSize: 14 }} />
                <Legend iconType="circle" formatter={(value) => <span style={{ color: '#F3F4F6', fontSize: 14 }}>{value}</span>} />
              </PieChart>
            </ResponsiveContainer>
          </div>
          {/* Line Chart Card */}
          <div className="bg-[#171821] rounded-lg shadow-sm p-6 flex flex-col">
            <h3 className="text-[#F3F4F6] font-medium mb-2">Close Rate Trend</h3>
            <ResponsiveContainer width="100%" height={200}>
              <LineChart data={lineChartData}>
                <CartesianGrid stroke="#232533" vertical={false} />
                <XAxis dataKey="date" stroke="#BDBDBD" tick={{ fill: '#F3F4F6', fontSize: 14 }} axisLine={{ stroke: '#232533' }} />
                <YAxis stroke="#BDBDBD" tick={{ fill: '#F3F4F6', fontSize: 14 }} axisLine={{ stroke: '#232533' }} />
                <Tooltip contentStyle={{ background: '#171821', border: '1px solid #232533', color: '#F3F4F6', fontSize: 14 }} />
                <Line type="monotone" dataKey="closeRate" stroke="#22C55E" strokeWidth={3} dot={{ r: 4, fill: '#22C55E' }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Table Section */}
        <h2 className="text-[#F3F4F6] text-lg font-semibold mb-2">Detailed Breakdown</h2>
        <div className="bg-[#171821] rounded-lg shadow-lg overflow-auto">
          <table className="min-w-full text-xs">
            <thead className="bg-[#23283b] text-[#F3F4F6] font-bold text-sm tracking-wide">
              <tr className="border-b border-[#232533]">
                <th className="text-left px-4 py-4">Name</th>
                <th className="text-left px-4 py-4">Calls</th>
                <th className="text-left px-4 py-4">Closes</th>
                <th className="text-left px-4 py-4">Close Rate</th>
                <th className="text-left px-4 py-4">Revenue</th>
                <th className="text-left px-4 py-4">Commission</th>
              </tr>
            </thead>
            <tbody className="text-[#F3F4F6]">
              {mockCloserData.map((closer, idx) => (
                <tr key={idx} className="border-b border-[#232533] last:border-b-0">
                  <td className="px-4 py-4 whitespace-nowrap">{closer.name}</td>
                  <td className="px-4 py-4 whitespace-nowrap">{closer.calls}</td>
                  <td className="px-4 py-4 whitespace-nowrap">{closer.closes}</td>
                  <td className="px-4 py-4 whitespace-nowrap">{closer.closeRate}%</td>
                  <td className="px-4 py-4 whitespace-nowrap">${closer.revenue}</td>
                  <td className="px-4 py-4 whitespace-nowrap text-green-400 font-semibold">${closer.commission}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default CloserSales; 